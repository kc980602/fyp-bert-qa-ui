<template>
    <v-container class="py-6">

        <v-overlay id="create-loading" :value="isLoading" absolute="absolute" color="rgba(255, 255, 255, 0.8)">
            <v-progress-circular
                    :size="80"
                    :width="3"
                    color="red"
                    indeterminate>
            </v-progress-circular>
        </v-overlay>

        <v-stepper v-model="currStep">
            <v-stepper-header class="mb-8">
                <v-stepper-step
                        :complete="currStep > 1"
                        editable
                        step="1">
                    1. Upload Document
                </v-stepper-step>

                <v-icon class="mb-3" color="secondary">mdi-chevron-right</v-icon>

                <v-stepper-step
                        :complete="currStep > 2"
                        :editable="step2Enable"
                        step="2">
                    2. Fine-tune Document Context
                </v-stepper-step>

                <v-icon class="mb-3" color="secondary">mdi-chevron-right</v-icon>

                <v-stepper-step
                        :complete="currStep > 3"
                        :editable="step3Enable"
                        step="3">
                    3. Test Your Bot
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>

                <v-stepper-content step="1">
                    <h3 class="font-size-24 font-size-md-32 mb-7">Upload your documents</h3>
                    <v-layout class="mb-7" justify-end>

                        <file-upload
                                :accept="accept"
                                :extensions="extensions"
                                :maximum="5"
                                :multiple="true"
                                :post-action="postUrl"
                                :thread="5"
                                @input-file="inputFile"
                                ref="upload"
                                v-model="files"
                                v-ripple="{ class: 'white--text' }">
                            <v-btn color="primary" rounded x-large>
                                <v-icon left>mdi-plus</v-icon>
                                Select Files
                            </v-btn>
                        </file-upload>
                    </v-layout>


                    <v-layout class="mb-7">
                        <v-data-table
                                :disable-pagination="true"
                                :headers="headers"
                                :items="files"
                                hide-default-footer>

                            <template v-slot:item.size="{item}">
                                {{formatBytes(item.size)}}
                            </template>

                            <template v-slot:item.actions="{ item }">
                                <v-btn @click="$refs.upload.remove(item)" color="accent" rounded small>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>

                            <template v-slot:no-data>
                                No documents selected
                            </template>
                        </v-data-table>

                    </v-layout>

                    <v-layout class="mb-7" justify-end>
                        <v-btn :disabled="!step2Enable" @click="startUploadAndGetUrls" color="primary" rounded x-large>Continue to Fine-tune</v-btn>
                    </v-layout>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <h3 class="font-size-24 font-size-md-32 mb-7">Review extracted paragraph</h3>

                    <v-layout class="mb-7" justify-end>
                        <v-btn :disabled="!step3Enable" @click="createQABot" color="primary" rounded x-large>Save</v-btn>
                    </v-layout>

                    <v-layout class="mb-7">
                        <v-select
                                :items="fileOptions"
                                label="Files"
                                v-model="currFile">
                        </v-select>
                    </v-layout>

                    <v-layout class="mb-12">

                        <v-data-table
                                :disable-pagination="true"
                                :headers="headers2"
                                :items="docParagraph"
                                hide-default-footer
                                item-key="id"
                                show-select
                                v-model="selectedRow">

                            <template v-slot:top>
                                <v-toolbar color="white" flat>
                                    <v-toolbar-title>{{currFile}}</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="openDialog" class="mb-2" color="success" dark rounded>
                                        <v-icon>mdi-plus</v-icon>
                                        Add
                                    </v-btn>
                                    <v-dialog max-width="500px" v-model="dialog">
                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">{{ isEditMode ? 'Edit Paragraph' : 'Add Paragraph' }}</span>
                                            </v-card-title>

                                            <v-card-text class="pb-0">
                                                <v-textarea label="Text" v-model="dialogPara"></v-textarea>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="dialogClose" text>Cancel</v-btn>
                                                <v-btn @click="dialogSave" color="primary" text>Save</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>

                        </v-data-table>

                    </v-layout>

                    <v-layout class="mb-7" justify-end>
                        <v-btn :disabled="!step3Enable" @click="createQABot" color="primary" rounded x-large>Save</v-btn>
                    </v-layout>

                </v-stepper-content>

                <v-stepper-content step="3">
                    <h3 class="font-size-24 font-size-md-32 mb-7">Ask some question</h3>
                    <v-layout align-center class="ask-control mb-7" justify-center>
                        <v-col cols="12" sm="8">
                            <v-text-field @keyup.enter="askQuestion" label="Your question?" outlined rounded single-line v-model="question">
                                <template v-slot:append>
                                    <v-btn @click="askQuestion" color="primary" rounded text x-large>
                                        <v-icon>mdi-magnify</v-icon>
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-layout>

                    <div class="mb-7 text-center answer-wrapper" v-if="ans !== null">
                        <h3 class="font-size-32 mb-1 class">Answer</h3>
                        <div class="divider mb-7"></div>

                        <div v-if="ans.ans">
                            <v-card :flat="true" class="mx-auto mb-7" color="red lighten-5" max-width="700">
                                <v-card-text class="headline font-weight-bold">
                                    {{ans.ans}}
                                </v-card-text>
                            </v-card>

                            <div class="text-left mx-auto font-size-18" style="max-width: 700px">
                                <p><span class="font-weight-medium">Document: </span>{{ans.doc.filename}}</p>

                                <p><span class="font-weight-medium">Paragraph: </span><br>{{ans.text}}</p>
                            </div>
                        </div>

                        <div class="headline font-weight-bold" v-else>
                            Sorry, can't find an answer!
                        </div>

                    </div>

                    <v-layout class="mb-7" justify-center>
                        <v-btn color="primary" dark class="mb-2" @click="dialogShareSave = true" rounded x-large>Save</v-btn>
                    </v-layout>

                    <v-dialog v-model="dialogShareSave" max-width="500px">
                        <v-card>
                            <v-card-title class="mb-5">
                                <span class="headline">Save your QA Bot</span>
                            </v-card-title>

                            <v-card-text>
                                <p class="font-weight-medium mb-2">Method 1: With link</p>
                                <v-card :flat="true" class="mx-auto mb-7" color="red lighten-5" max-width="700">
                                    <v-card-text style="padding: 8px!important;">
                                        <a :href="qaIdLink" target="_blank">{{qaIdLink}}</a>
                                    </v-card-text>
                                </v-card>

                                <p class="font-weight-medium mb-2">Method 2: With API</p>
                                <v-card :flat="true" class="mx-auto mb-7" color="red lighten-5" max-width="700">
                                    <v-card-text style="padding: 8px!important;">
                                        <a :href="qaIdAPILink" target="_blank">{{qaIdAPILink}}</a>
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-stepper-content>

            </v-stepper-items>

        </v-stepper>

        <v-container class="float-control" v-if="currStep === 2">
            <v-row>
                <v-card class="elevation-6">
                    <v-card-actions>
                        <v-btn @click="openDialog" color="success" large rounded>
                            <v-icon>mdi-plus</v-icon>
                            Add
                        </v-btn>
                        <v-btn @click="paraMerge" color="warning" large rounded v-if="selectedRow.length">
                            <v-icon>mdi-call-merge</v-icon>
                            Merge
                        </v-btn>
                        <v-btn @click="paraDelete" color="error" large rounded v-if="selectedRow.length">
                            <v-icon>mdi-delete</v-icon>
                            Delete
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
        </v-container>

    </v-container>
</template>
<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator'
    import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
    import 'vue-upload-component/dist/vue-upload-component.part.css'
    import {createRequest} from '~/utils/NetworkRequest'
    import {Doc} from '~/data/DataClass'
    import _ from 'lodash'

    @Component({
        components: {
            FileUpload
        }
    })
    export default class index extends Vue {

        //   META DATA
        postUrl: string = process.env.API_DOMAIN + '/file/upload'

        headers: {}[] = [
            {
                text: 'File Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {
                text: 'Size',
                align: 'end',
                sortable: false,
                value: 'size',
            },
            {text: 'Actions', value: 'actions', align: 'right', sortable: false},
        ]
        headers2: {}[] = [
            {
                text: 'Paragraph',
                align: 'start',
                sortable: false,
                value: 'text'
            }
        ]
        //  UI DATA
        currStep: number = 1
        step2Enable: boolean = false
        step3Enable: boolean = false
        isLoading: boolean = false

        //  Step 1
        accept: string = 'text/plain,application/pdf'
        extensions: string = 'txt,pdf'
        files: {}[] = []
        docIds: number[] = []
        //  Step 2
        fileOptions: {}[] = []
        currFile: string = ''
        selectedRow: {}[] = []
        dialog: boolean = false
        isEditMode: boolean = false
        dialogPara: string = ''
        //  Step 3
        qaId: number = 0
        question: string = ''
        ans: {} | null = null
        dialogShareSave: boolean = false
        //  DATA
        docList: Doc[] = []


        head() {
            return {
                title: 'Create - Bert QA Bot Generator'
            }
        }

        get docParagraph() {
            if (this.currFile !== '') {
                const para = this.docList.find(item => {
                    return this.currFile === item.filename
                })
                if (para) {
                    const paraList: {}[] = []
                    para.paragraph.forEach((item, index) => {
                        paraList.push({id: index, text: item})
                    })

                    return paraList
                }
            }
            return []
        }

        get qaIdLink() {
            return `${process.env.BASE_URL}/ask?${this.qaId}`
        }

        get qaIdAPILink() {
            return `${process.env.API_DOMAIN}/ask/${this.qaId}?question=what+is+bert`
        }

        created() {
            // if (this.$route.query.id) {
            //     try {
            //         this.qaId = parseInt(this.$route.query.id.toString())
            //     } catch (e) {
            //         console.log(e)
            //     }
            // }
        }

        //  Step 1
        startUploadAndGetUrls() {
            try {
                if (this.files.length) {
                    const upload: any = this.$refs.upload
                    upload.active = true
                    this.isLoading = this.docIds.length !== this.files.length
                }
                this.changeTo2()
            } catch (e) {
                this.$store.dispatch('setSnackMessage', 'Server Error')
            }
        }

        inputFile(newFile, oldFile) {
            if (newFile && oldFile && newFile.success && !oldFile.success) {
                const res = newFile.response
                if (res.success) {
                    this.docIds.push(res.id)
                } else {
                    this.$store.dispatch('setSnackMessage', res.data.message || 'Server Error')
                }
            }
            this.step2Enable = this.files.length > 0
            this.changeTo2()
        }

        formatBytes(bytes, decimals) {
            if (bytes == 0) return '0 Bytes'
            const k = 1024,
                dm = decimals <= 0 ? 0 : decimals || 2,
                sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k))
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        }

        //  Step 2
        async changeTo2() {
            if (this.docIds.length === this.files.length) {
                const res = await createRequest('/qa', 'get', {doc_ids: this.docIds.join(',')}).send()
                this.docList = res.data.doc_list
                this.docList.forEach(item => {
                    this.fileOptions.push(item.filename)
                })
                this.currFile = this.docList[0].filename
                this.currStep = 2
                this.step3Enable = true
                this.isLoading = false
            }
        }

        openDialog(edit = false) {
            this.isEditMode = edit
            this.dialog = true
        }


        dialogClose() {
            this.isEditMode = false
            this.dialog = false
            this.dialogPara = ''
        }

        dialogSave() {
            if (this.dialogPara !== '' && this.currFile !== '') {
                this.docList.find(item => {
                    if (this.currFile === item.filename) {
                        item.paragraph.push(this.dialogPara.replace(/(\r\n|\n|\r)/gm, ' '))
                        return
                    }
                })
            }
            this.dialogClose()
        }

        paraMerge() {
            this.selectedRow = _.sortBy(this.selectedRow, ['id'])
            const first = this.selectedRow.shift()
            if (this.selectedRow.length && this.currFile !== '' && first) {
                const docIndex = _.findIndex(this.docList, item => item.filename === this.currFile)
                const paraList: string[] = _.map(this.selectedRow, value => value['text'])

                const newPara = [...this.docList[docIndex].paragraph]
                const removed = _.remove(newPara, item => paraList.includes(item))
                newPara[first['id']] = newPara[first['id']] + ' ' + removed.join(' ')
                this.$set(this.docList[docIndex], 'paragraph', newPara)

                this.selectedRow = []
            }
        }

        paraDelete() {
            if (this.selectedRow.length && this.currFile !== '') {
                const paraList: string[] = _.map(this.selectedRow, value => value['text'])
                const docIndex = _.findIndex(this.docList, item => item.filename === this.currFile)
                const edited = _.filter(this.docList[docIndex].paragraph, item => !paraList.includes(item))
                this.$set(this.docList[docIndex], 'paragraph', edited)
                this.selectedRow = []
            }
        }

        async createQABot() {
            this.isLoading = true
            const res = await createRequest('/qa', 'post', {}, {doc_list: this.docList}).send()
            if (res.data.success) {
                this.qaId = res.data.id
                this.currStep = 3
                // this.$router.push(`/create?id=${this.qaId}`)
            } else {
                this.$store.dispatch('setSnackMessage', res.data.message || 'Server Error')
            }
            this.isLoading = false
        }

        async askQuestion() {
            if (!!this.question) {
                this.isLoading = true
                const res = await createRequest(`/ask/${this.qaId}`, 'get', {question: this.question}).send()
                if (res.data.success) {
                    this.ans = res.data.answer
                } else {
                    this.$store.dispatch('setSnackMessage', res.data.message || 'Server Error')
                }
                this.isLoading = false
            }
        }
    }
</script>
<style lang="scss">
    .v-overlay#create-loading {
        height: calc(100vh - 64px);
        position: fixed !important;
        top: 64px !important;
    }

    .v-stepper {
        box-shadow: none !important;
        border-radius: 0 !important;

        &__header {
            height: unset !important;
            justify-content: left !important;
            box-shadow: none !important;
        }

        &__step {
            padding: 12px 4px !important;
            border-bottom: 3px solid transparent;
            margin-bottom: 8px;

            &__step {
                display: none !important;
            }

            &--active {
                border-bottom: 3px solid #ff470f;
            }
        }

        &__content {
            padding: 0 !important;
        }

        @media only screen and (max-width: 959px) {
            &:not(.v-stepper--vertical) .v-stepper__label {
                display: flex !important;
            }
        }
    }

    .file-uploads {
        overflow: visible !important;
    }

    .v-data-table {
        width: 100%;
    }

    .float-control {
        padding: 0 !important;
        position: fixed !important;
        bottom: 0;


        .v-card {
            width: 100% !important;
        }

        @media(min-width: 960px) {
            .v-card {
                width: unset !important;
            }
        }
    }

    .ask-control {
        .v-input__slot {
            padding: 0 13px 0 24px !important;
        }

        .v-input__append-inner {
            margin: auto 0 !important;
        }

        .v-btn {
            padding: 0 !important;
            min-height: 56px !important;
            min-width: 56px !important;
        }
    }

    .answer-wrapper {
        .divider {
            margin: auto;
            border-bottom: 3px solid #ff470f;
            width: 117px;
        }
    }

</style>

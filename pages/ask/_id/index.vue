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
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator'
    import {createRequest} from '~/utils/NetworkRequest'

    @Component({})
    export default class index extends Vue {

        isLoading:boolean = false

        qaId: number = 0
        question: string = ''
        ans: {} | null = null

        asyncData({params}) {
            return {
                qaId: params.id
            }
        }

        created() {
            console.log(this.qaId)
        }

        get qaIdLink() {
            return `${process.env.BASE_URL}/bot/${this.qaId}`
        }

        get qaIdAPILink() {
            return `${process.env.API_DOMAIN}/bot/${this.qaId}?question=what+is+bert`
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

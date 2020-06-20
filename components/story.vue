<template>
    <v-row class="story" no-guttersss>
        <v-col class="mb-4" cols="12">
            <h6 class="title">{{storyId}}</h6>
        </v-col>
        <v-col class="mb-4" cols="12" md="6">
            <div :id="storyId" class="story__text-wrap">
                <p class="story__text" v-html="text"/>
            </div>
        </v-col>
        <v-col cols="12" md="6">
            <v-card :class="`correct-${q.correct}`" :key="index" class="question" v-for="(q, index) in story.questions">
                <div class="font-size-16 font-weight-medium">{{q.question}}</div>
                <v-card-text>
                    <div>
                        <span class="subheading">Answer</span>
                        <div class="mb-2">
                            <v-chip :key="ans" @click="clickChip(ans)" small v-for="(ans, a_idx) in q.answers">{{ans}}</v-chip>
                        </div>
                    </div>
                    <div>
                        <span class="subheading">Prediction</span>
                        <div class="mb-2">
                            <v-chip @click="clickChip(q.pred_ans, true)" small>{{q.pred_ans}}</v-chip>
                        </div>
                    </div>
                </v-card-text>

            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'nuxt-property-decorator'

    @Component({})
    export default class story extends Vue {
        @Prop() story: any

        ans: string | null = ''
        isPred: boolean = false

        get storyId() {
            return this.story.story_id.replace('./cnn/stories/', '')
        }

        get text() {
            let displayText = this.story.story_text.replace(/\n/g, '<br>')
            if (this.ans) {
                if (this.isPred) {
                    const re = new RegExp(this.ans, 'i')
                    const result = displayText.match(re)
                    this.ans = result ? result[0] : this.ans
                }
                displayText = displayText.replace(this.ans, `<em class="highlight">${this.ans}</em>`)
                setTimeout(() => {
                    const textWrap = document.getElementById(this.storyId)
                    if (textWrap) {
                        const textWrapP = textWrap.querySelector('p')
                        const highlight = textWrap.querySelector('.highlight')
                        if (highlight && textWrapP) {
                            const tSP = textWrapP.getBoundingClientRect()
                            const hiSP = highlight.getBoundingClientRect()
                            textWrap.scrollTop = hiSP.y - tSP.y
                            textWrap.scrollIntoView()
                            textWrap.scrollTop -= 64
                        }
                    }
                }, 200)
            }
            return displayText
        }

        clickChip(ans, pred = false) {
            this.ans = ans.trim()
            this.isPred = pred
        }
    }
</script>
<style lang="scss">
    .story {

        &__text {
            font-size: 14px;

            &-wrap {
                padding: 12px;
                max-height: 600px;
                overflow-y: auto;
                border: 2px solid #ff470f;
                border-radius: 4px;
            }

        }

        .highlight {
            font-style: normal;
            background-color: rgba(#48c774, .6);
        }
    }

    .question {
        margin-bottom: 8px;
        padding: 12px 16px !important;

        &.correct-0 {
            border-left: 4px solid #ff470f;
        }

        &.correct-1 {
            border-left: 4px solid #48c774;
        }

        .v-card__text {
            padding: 0 !important;
        }

        .v-chip {
            margin: 0 8px 4px 0;
        }

    }
</style>

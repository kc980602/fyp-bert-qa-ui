<template>
    <v-container class="py-6">

        <h3 class="font-size-24 font-size-md-32 mb-7">News QA Dataset Demo</h3>

        <v-row :key="item.story_id" class="story" no-guttersss v-for="item in demoData">
            <v-col class="mb-4" cols="12">
                <h6 class="title">{{item.story_id.replace('./cnn/stories/', '')}}</h6>
            </v-col>
            <v-col class="mb-4" cols="12" md="6">
                <div class="story__text-wrap">
                    <p class="story__text" v-html="formatNewLine(item.story_text)"/>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <v-card :key="index" class="question" v-for="(q, index) in item.questions" :class="`correct-${q.correct}`">
                    <div class="font-size-16 font-weight-medium">{{q.question}}</div>
                    <div>
                        <span>Answer: </span>
                        <v-chip-group active-class="primary--text" column>
                            <v-chip :key="a_idx" v-for="(ans, a_idx) in q.answers" small>{{ans}}</v-chip>
                        </v-chip-group>
                    </div>
                    <div>
                        <span>Prediction: </span>
                        <v-chip-group active-class="primary--text" column>
                            <v-chip small>{{q.pred_ans}}</v-chip >
                        </v-chip-group>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator'
    import newsQADemo from '~/data/newsqa_pred_demo.json'

    @Component({})
    export default class demo extends Vue {

        demoData: {}[] = newsQADemo


        formatNewLine(text) {
            return text.replace(/\n/g, '<br>')
        }

    }
</script>
<style lang="scss">
    .story {

        &__text {
            font-size: 14px;

            &-wrap {
                padding: 12px;
                max-height: 400px;
                overflow-y: auto;
                border: 2px solid #ff470f;
                border-radius: 4px;
            }

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
    }
</style>

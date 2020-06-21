<template>
    <div>
        <div class="intro">
            <v-layout class="py-11 py-lg-16" column>
                <v-flex>
                    <div class="text-center">
                        <h1 class="font-size-28 font-size-md-40 mb-7">Create your QA bot</h1>
                        <h2 class="font-size-20 font-weight-medium mb-7">Upload document and generate QA bot. <br>Ask any question you like.</h2>
                        <div class="mt-2">
                            <nuxt-link to="/create">
                                <v-btn color="primary" rounded x-large>Create</v-btn>
                            </nuxt-link>
                        </div>
                    </div>
                </v-flex>
            </v-layout>
        </div>

        <v-container>
            <a id="newsqa"></a>
            <v-layout class="py-10" column>
                <v-flex>
                    <div class="text-center">
                        <h5 class="font-size-28 font-size-md-40 text-center text-primary mb-4">
                            NewsQA Prediction
                        </h5>
                        <p class="subtitle-1">
                            Model prediction result with
                            <a class="ref-link" href="https://github.com/Maluuba/newsqa" target="_blank">Maluuba NewsQA</a> dataset
                        </p>

                        <table class="mx-auto text-left mb-4">
                            <tr><td>Accuracy</td><td class="text-right">35.92</td></tr>
                            <tr><td>Correct</td><td class="text-right">5029</td></tr>
                            <tr><td>Error</td><td class="text-right">8971</td></tr>
                            <tr><td>Empty Answer </td><td class="text-right">748</td></tr>
                        </table>
                        <nuxt-link to="/demo">
                            <v-btn color="primary" rounded x-large>Explore Result</v-btn>
                        </nuxt-link>
                    </div>
                </v-flex>
            </v-layout>

            <a id="demo"></a>
            <v-layout class="py-10" column>
                <v-flex>
                    <div class="text-center">
                        <h5 class="font-size-28 font-size-md-40 text-center text-primary mb-4">
                            Try it now
                        </h5>
                        <p class="subtitle-1">A demo QA Bot created with
                            <a class="ref-link" href="https://www.labour.gov.hk/eng/public/wcp/ConciseGuide/EO_guide_full.pdf" target="_blank">Hong
                                Kong Employment Ordinance</a><br>
                            The full text is 67 pages split into 50 paragraph
                        </p>
                        <ask :qa-id="5643550469390336"></ask>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator'
    import ask from '~/components/ask.vue'

    @Component({
        components: {
            ask
        }
    })
    export default class index extends Vue {
        test() {

        }
    }
</script>
<style lang="scss">
    .intro {
        background-image: url("/background.jpg");
        background-position: center 36%;
        background-size: cover;
        color: white;

        .layout {
            background: rgba(0, 0, 0, .5);
        }

    }

    .ref-link {
        text-decoration: none;
    }
</style>

<template>
    <div>
        <div class="container-outer">
            <v-container class="intro px-16 px-sm-3">
                <v-row class="py-11 py-lg-16">
                    <v-col class="text-center text-md-left pr-sm-5" cols="12" md="6">
                        <h1 class="font-size-24 font-size-md-36 font-size-lg-48 mb-7 font-weight-thin">Make Your
                            <span class="font-weight-medium">Question Answering Bot</span> with
                            <span class="font-weight-medium">BERT QA</span></h1>

                        <div class="mt-2">
                            <nuxt-link tag="div" to="/create">
                                <v-btn color="white" rounded style="color: #89216B" x-large>Create Now</v-btn>
                            </nuxt-link>
                        </div>
                    </v-col>
                    <v-col class="d-none d-md-block" md="6">
                        <img class="elevation-10 rounded-xl" src="/ask-ui.png" width="100%">
                    </v-col>

                </v-row>
            </v-container>
        </div>

        <v-container>
            <v-layout class="pb-10" column>
                <h2 class="font-size-24 font-size-md-36 font-weight-light text-center mb-16">Upload document and generate QA bot. <br>Ask any question you like.</h2>
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-list-item two-line>
                            <div class="red lighten-5 rounded-circle p-6 mr-5">
                                <v-icon large color="primary">mdi-speedometer</v-icon>
                            </div>
                            <v-list-item-content>
                                <v-list-item-title class="text-h5 mb-4">Fast</v-list-item-title>
                                <v-list-item-subtitle class="font-size-16">Get prediction instantly.</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-list-item two-line>
                            <div class="red lighten-5 rounded-circle p-6 mr-5">
                                <v-icon large color="primary">mdi-currency-usd</v-icon>
                            </div>
                            <v-list-item-content>
                                <v-list-item-title class="text-h5 mb-4">Low Cost</v-list-item-title>
                                <v-list-item-subtitle class="font-size-16">No training required.</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-list-item two-line>
                            <div class="red lighten-5 rounded-circle p-6 mr-5">
                                <v-icon large color="primary">mdi-brain</v-icon>
                            </div>
                            <v-list-item-content>
                                <v-list-item-title class="text-h5 mb-4">Smart Model</v-list-item-title>
                                <v-list-item-subtitle class="text-subtitle-1 font-size-16">Using BERT as QA model.</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                </v-row>
            </v-layout>

            <a id="newsqa"></a>
            <v-layout class="py-10" column>
                <v-flex>
                    <div class="text-center">
                        <h5 class="font-size-28 font-size-md-40 text-center text-primary mb-4 font-weight-light">
                            NewsQA Prediction
                        </h5>
                        <p class="subtitle-1">
                            Model prediction result with
                            <a class="ref-link" href="https://github.com/Maluuba/newsqa" target="_blank">Maluuba NewsQA</a> dataset
                        </p>

                        <table class="mx-auto text-left mb-4">
                            <tr>
                                <td>Accuracy</td>
                                <td class="text-right">35.92</td>
                            </tr>
                            <tr>
                                <td>Correct</td>
                                <td class="text-right">5029</td>
                            </tr>
                            <tr>
                                <td>Error</td>
                                <td class="text-right">8971</td>
                            </tr>
                            <tr>
                                <td>Empty Answer</td>
                                <td class="text-right">748</td>
                            </tr>
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
                        <h5 class="font-size-28 font-size-md-40 text-center text-primary mb-4 font-weight-light">
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
        color: white;
    }

    .container-outer {
        padding-bottom: 72px;
        -webkit-mask: radial-gradient(110% 25% at bottom, transparent 50.5%, white 51%) top center;
        mask: radial-gradient(110% 25% at bottom, transparent 50.5%, white 51%) top center;
        -webkit-mask-size: 100% 150%;
        -webkit-mask-repeat: no-repeat;
        mask-size: 100%% 150%;
        mask-repeat: no-repeat;
        background: rgb(218, 68, 80) !important;
        background: linear-gradient(270deg, rgba(218, 68, 80, 1) 0%, rgba(137, 33, 107, 1) 100%) !important;
    }

    .ref-link {
        text-decoration: none;
    }

    .v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle {
        line-height: 1.4!important;
    }

    .v-list-item__content {
        padding: 0!important;
    }
</style>

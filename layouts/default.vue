<template>
    <v-app>
        <v-app-bar :flat="true" app class="qa-menu" color="white" elevate-on-scroll fixed>
            <div class="container">
                <nuxt-link style="cursor: pointer" tag="div" to="/" class="d-flex align-center">
                    <img src="~assets/icon.svg" width="auto" height="25">
                    <v-toolbar-title class="font-weight-bold" v-text="title"/>
                </nuxt-link>
            </div>

            <v-spacer/>

            <v-list rounded>
                <v-list-item-group color="primary">
                    <nuxt-link class="text-decoration-none" to="/#demo">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title v-text="'Demo'"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </nuxt-link>
                    <nuxt-link class="text-decoration-none" to="/demo">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title v-text="'NewsQA'"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </nuxt-link>
                    <div class="d-flex align-center">
                        <nuxt-link to="/create">
                            <v-btn color="primary" elevation="0" large rounded>Create</v-btn>
                        </nuxt-link>
                    </div>
                </v-list-item-group>
            </v-list>
        </v-app-bar>

        <v-main>
            <nuxt/>
        </v-main>

<!--        <v-footer app>-->
<!--            <span>BERT QA &copy; {{ new Date().getFullYear() }}</span>-->
<!--        </v-footer>-->

        <v-snackbar v-model="snackbar">
            {{ snackMessage }}
            <v-btn @click="snackbar = false" color="primary" text>
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'nuxt-property-decorator'
    import {mapGetters} from 'vuex'

    @Component({
        computed: {
            ...mapGetters({
                snackMessage: 'snackMessage'
            }),
        }
    })
    export default class extends Vue {
        // UI DATA
        title: string = 'Bert QA'
        snackbar: boolean = false
        snackMessage: string
        items = [
            {text: 'Real-Time', icon: 'mdi-clock'},
            {text: 'Audience', icon: 'mdi-account'},
            {text: 'Conversions', icon: 'mdi-flag'},
        ]

        @Watch('snackMessage')
        watchMessage(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.snackbar = true
            }
        }

    }
</script>
<style lang="scss">
    .v-toolbar__content {
        border-bottom: 1px solid #dee2e6;
    }

    @media (min-width: 1904px) {
        .container {
            max-width: 1185px !important;
        }
    }

    .qa-menu {
        .v-list {
            background: transparent !important;
        }

        .v-item-group {
            display: inline-flex;
        }

        .v-list-item {
            margin-right: 6px;
            margin-bottom: 0 !important;
        }

        .v-list-item--link:before {
            background-color: transparent !important;
        }

        .v-list-item-group .v-list-item--active {
            color: initial !important;
        }

    }


</style>

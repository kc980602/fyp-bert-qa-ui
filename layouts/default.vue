<template>
    <v-app>
        <v-app-bar :flat="true" color="white" app elevate-on-scroll fixed>
            <div class="container">
                <nuxt-link to="/" tag="div" style="cursor: pointer">
                    <v-toolbar-title class="font-weight-bold" v-text="title"/>
                </nuxt-link>
            </div>

<!--            <v-spacer/>-->
        </v-app-bar>

        <v-content>
            <nuxt/>
        </v-content>
<!--        <v-footer app>-->
<!--            <span>&copy; {{ new Date().getFullYear() }}</span>-->
<!--        </v-footer>-->

        <v-snackbar v-model="snackbar">
            {{ snackMessage }}
            <v-btn color="primary" text @click="snackbar = false">
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

        @Watch('snackMessage')
        watchMessage(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.snackbar = true
            }
        }

    }
</script>
<style>
    .v-toolbar__content {
        border-bottom: 1px solid #dee2e6;
    }

    @media (min-width: 1904px) {
        .container {
            max-width: 1185px!important;
        }
    }
</style>

<template>
    <v-app>
        <v-app-bar :flat="true" color="white" app elevate-on-scroll fixed>
            <v-toolbar-title class="font-weight-medium" v-text="title"/>
            <v-spacer/>
            <nuxt-link to="/create">Create</nuxt-link>
        </v-app-bar>

        <v-content>
            <nuxt/>
        </v-content>
<!--        <v-footer app>-->
<!--            <span>&copy; {{ new Date().getFullYear() }}</span>-->
<!--        </v-footer>-->
    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator'

    @Component({})
    export default class extends Vue {
        title: string = 'Bert QA'
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

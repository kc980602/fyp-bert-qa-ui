<template>
    <v-container>
        <v-layout class="py-11 py-lg-14" column>
            <v-flex>
                <div class="text-center">
                    <img src="./icon.svg" width="150px" height="150px">
                    <h1 class="font-size-28 font-size-md-40 mb-7">Create your QA bot</h1>
                    <h2 class="font-size-20 font-weight-medium mb-7">Upload document and generate QA bot. <br>Ask any question you like.</h2>
                    <div class="my-2">
                        <nuxt-link to="/create">
                            <v-btn color="primary" rounded x-large>Generate</v-btn>
                        </nuxt-link>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator'

    @Component({})
    export default class index extends Vue {
        test() {

        }
    }
</script>

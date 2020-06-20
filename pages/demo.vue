<template>
    <v-container class="py-6">

        <h3 class="font-size-24 font-size-md-32 mb-7">News QA Dataset Demo</h3>

        <story :key="item.story_id" v-for="item in demoData" :story="item"/>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator'
    import newsQADemo from '~/data/newsqa_pred_demo.json'
    import story from '~/components/story.vue'

    @Component({
        components: {
            story
        }
    })
    export default class demo extends Vue {

        demoData: {}[] = newsQADemo


    }
</script>
<style lang="scss">

</style>

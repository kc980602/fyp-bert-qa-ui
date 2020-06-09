<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator'

    @Component({})
    export default class index extends Vue {
        asyncData({redirect}) {
            redirect('/')
        }
    }
</script>

import colors from 'vuetify/es5/util/colors'
import webpack from 'webpack'

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
        base: '/fyp-bert-qa-ui/'
    }
} : {}

export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: 'Bert QA Bot Generator',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'A Bert powered question answering ask allowing user import context.'},
            {'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/icon.png'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@400;500;700&display=swap'},
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '~/plugins/lodash.ts', ssr: false},
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        treeShake: true,
        theme: {
            themes: {
                light: {
                    primary: '#ff470f',
                    accent: colors.grey.darken3,
                    secondary: '#dee2e6',
                    info: '#3298dc',
                    warning: '#ffdd57',
                    error: '#ff470f',
                    success: '#48c774'
                }
            }
        },
        defaultAssets: {
            font: {
                family: 'Noto Sans HK'
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, {isDev, isClient}) {
            config.node = {
                fs: 'empty'
            }
        },
        typescript: {
            typeCheck: false
        },
        babel: {
            presets({isServer}) {
                return [
                    [
                        '@nuxt/babel-preset-app', {loose: true}
                    ]
                ]
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                '_': 'lodash'
            })
        ]
    },
    ...routerBase
}

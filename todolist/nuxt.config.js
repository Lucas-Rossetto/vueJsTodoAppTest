export default {
    mode: 'spa',
    build: {
        extend(config, { isDev, isClient }) {
            config.node = {
                fs: 'empty'
            }
            config.resolve.alias['vue'] = 'vue/dist/vue.common'
        }
    },
    buildModules: [
        // Simple usage
        '@nuxtjs/vuetify',
    ]
}
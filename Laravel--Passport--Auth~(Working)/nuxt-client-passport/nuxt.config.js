export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'nuxt-jwt-auth-client',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    /*components: {
        dirs: [
            "~/components",
            /!*{
                path: "~/components/Cart",
                prefix: "Cart" /// Usage <CartComponentName/>
            },*!/
        ]
    },*/

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth-next',
        '@nuxtjs/toast'
    ],
    // https://github.com/nuxt-community/modules/tree/master/packages/toast
    toast: {
        position: 'top-right',
        duration: 5000,
        keepOnHover: true,
        theme: 'outline',
    },

    // runtime config
    publicRuntimeConfig: {
        apiURL: process.env.API_URL,
    },
    privateRuntimeConfig: {
        apiId: process.env.PASSPORT_CLIENT_ID,
        apiSecret: process.env.PASSPORT_CLIENT_SECRET,
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // proxy: true,
        baseURL: process.env.API_URL,
        credentials: true
    },
    auth: {
        strategies: {
            'laravelPassport': {
                provider: 'laravel/passport',
                url: process.env.API_URL,
                endpoints: {
                    login: {
                        url: '/oauth/token',
                        method: 'post',
                        propertyName: 'access_token'
                    },
                    logout: '/api/logout',
                    user: {
                        url: '/api/user',
                    },
                },
                clientId: process.env.PASSPORT_PASSWORD_GRANT_ID,
                clientSecret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
                grantType: 'password',
            },
        },
        redirect: {
            login: "/auth/login",
            logout: "/",
            callback: "/auth/login",
            home: "/"
        }
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    router: {
        linkActiveClass: "active",
        linkExactActiveClass: "active"
        // middleware: "guest",
    },
}

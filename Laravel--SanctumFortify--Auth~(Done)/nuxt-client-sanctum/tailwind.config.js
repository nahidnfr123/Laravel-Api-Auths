/* prettier-ignore */
module.exports = {
    purge: [],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: { // Usage ...  text-success , text-primary-blue
                "success": "#03e500",
                "primary": {
                    "blue": "#02a0fa",
                    "light-blue": "#6dc9ff",
                },
                "orange": {
                    "light": "#ea7d34",
                    "default": "#FF5733",
                    "dark": "#BA4A00",
                },
            },
        },
    },
    variants: {
        extend: {
            opacity: ["disabled"],
        },
    },
    plugins: [],
};

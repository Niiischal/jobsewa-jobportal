/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        'primary': '#7a63f1',
      }
    },
  },
  plugins: [],

  //To avoid problem due to use of tailwind with antd library
  corePlugins: { preflight: false },
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
    },
  },
  plugins: [],

  //To avoid problem due to use of tailwind with antd library
  corePlugins: { preflight: false },
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'blueColor': '#2a68ff',
        'greyishColor': '#f1f4f8',
        'textColor': '#252b36',
      }
    },
  },
  plugins: [],

  //To avoid problem due to use of tailwind with antd library
  corePlugins: { preflight: false },
}


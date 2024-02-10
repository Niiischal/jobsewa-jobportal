/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        'primary': '#2a68ff',
      },
      fontFamily: {
        'proxima': ['Proxima Nova', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],

  //To avoid problem due to use of tailwind with antd library
  corePlugins: { preflight: false },
}


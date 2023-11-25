/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      dark: {
        colors: {
          textPrimary: "#fff",
          primary: '#121214',
          secondary: '#393939',
          third: "#26262a"
        },
      },
      light: {
        colors: {
          textPrimary: "#000",
          primary: '#fff',
          secondary: '#dbdbdb',
          third: "#dbdbdb"
        }
      }
    },
  },
})

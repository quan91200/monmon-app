import i18next from "i18next"
import { EN, VN, CN } from './index'

i18next.init({
  interpolation: {
    escapeValue: false
  },
  lng: "vn",
  resources: {
    en: {
      global: EN,
    },
    vn: {
      global: VN,
    },
    cn: {
      global: CN,
    }
  }
})

export default i18next

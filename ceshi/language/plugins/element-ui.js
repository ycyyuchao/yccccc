import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import locale from 'element-ui/lib/locale/lang/en'
import i18n from './i18n/i18n';
export default () => {
  Vue.use(Element, { locale })
  Vue.use(i18n)
}

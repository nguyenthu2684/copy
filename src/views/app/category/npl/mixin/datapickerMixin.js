import { en, vi } from "vuejs-datepicker/dist/locale";
export default {
  data() {
    return {
      locale: this.$t('language') == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
    }
  },
}
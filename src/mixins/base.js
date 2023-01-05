import { oneOf } from '@/utils/assist'
export default {
  props: {
    size: {
      validator (value) {
        return oneOf(value, ['small', 'middle', 'large'])
      },
      default: 'middle'
    },
    prefix: {
      type: String,
      default: 'sh-'
      // default: () => {
      //   return !this?.$shui || (this.$shui?.prefix ?? '')
      //     ? 'sh-'
      //     : this.$shui.prefix
      // }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    sizes () {
      return this.size || (this.$shui && this.$shui.size)
    },
    prefixs () {
      return this.prefix || (this.$prefix && this.$shui.prefix)
    }
  },
  watch: {
    size (val) {
      this.sizes = val
    },
    '$shui.size': (val) => {
      this.sizes = val.size
    }
  }
}

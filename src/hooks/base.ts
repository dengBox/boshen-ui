import { oneOf } from '@/utils/assist'
export default {
  props: {
    size: {
      validator (value: string) {
        return oneOf(value, ['small', 'middle', 'large'])
      },
      default: 'middle'
    },
    prefix: {
      type: String,
      default: 'bs-'
      // default: () => {
      //   return !this?.$bsui || (this.$bsui?.prefix ?? '')
      //     ? 'bs-'
      //     : this.$bsui.prefix
      // }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    sizes () {
      return this.size || (this.$bsui && this.$bsui.size)
    },
    prefixs () {
      return this.prefix || (this.$prefix && this.$bsui.prefix)
    }
  },
  watch: {
    size (val) {
      this.sizes = val
    },
    '$bsui.size': (val) => {
      this.sizes = val.size
    }
  }
}

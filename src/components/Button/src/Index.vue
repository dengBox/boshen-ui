<script lang="jsx">
import BaseMixins from '@/mixins/base'

export default {
  name: 'Button',
  mixins: [BaseMixins],
  components: {

  },
  data () {
    return {

    }
  },
  computed: {
    countClass () {
      return `${this.prefixs}Button`
    }
  },
  render () {
    return <div>
      {this.prefixs}
    </div>
  },
  methods: {
    clickBtn (event) {
      this.$emit('on-click', event)
    }
  }
}
</script>

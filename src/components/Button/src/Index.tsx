import { defineComponent, computed } from 'vue'
import BaseMixins from '@/hooks/base'

export default defineComponent({
  name: 'Button',
  mixins: [BaseMixins],
  setup (props, { slots }) {
    const countClass = computed(() => `${this.prefixs}Button`)
    const clickBtn = (event:MouseEvent) => {
      this.$emit('on-click', event)
    }
    return () => {
      return <div>
        {this.prefixs}
      </div>
    }
  }
})

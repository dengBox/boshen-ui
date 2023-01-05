## Button

### 基本用法

<Button @on-click="clickBtn">123</Button>

<script>
export default {
  methods: {
    clickBtn (event) {
      console.log('clickBtn', event)
    }
  }
}
</script>

### Code

```vue{3}
<template>
  <Button @on-click="clickBtn">123</Button>
</template>
<script>
export default {
  methods: {
    clickBtn (event) {
      console.log('clickBtn', event)
    }
  }
}
</script>
```

### Api

| 属性        | 描述           | 默认值  | 类型  |
| ------------- |:-------------:| -----:|-----:|
| value      | <div style="width: 400px">1</div> | $1600 | `string`  |

### Event

### Slot

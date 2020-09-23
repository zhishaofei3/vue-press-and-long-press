# vue Press and longPress
*在vue中区分点击和长按事件的自定义指令插件*

* 支持PC、移动端
* 区分点击和长按事件
* 使用方便

# Example
main.js:
```javascript
import './touch.js'
```

sample.vue:
```vue
<template>
    ...
    <button v-longpress="incrementPlusTen" v-press="incrementPlusOne">{{value}}</button>
    ...
</template>
<script>
export default Vue.extend({
    name: 'Home',
    data() {
        return {
          value: 10,
        }
    },
    methods: {
        incrementPlusOne(e) {
            console.log('点击增加1')
            this.value++
        },
        incrementPlusTen(e) {
            console.log('长按增加10')
            this.value += 10
        }
    }
}
</script>
```

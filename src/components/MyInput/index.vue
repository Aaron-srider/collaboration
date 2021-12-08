<template>
  <input @input="handleInput" v-model="value" :style="cus" class="my-input-style"/>
</template>

<script>
export default {
  name: 'index',
  computed: {
    cus() {
      return `width: ${this.width};
     height: ${this.height};`
    }
  },
  props: {
    width: {
      required: false,
      default: '220px'
    },
    height: {
      required: false,
      default: '40px'
    },
    value: {}
  },
  methods: {
    handleInput() {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped>

.my-input-style {
  border: 1px solid #dcdfe6;
  width: 220px;
  height: 40px
}

</style>

<template>
  <div>
    <template v-for="(operation, index) in textArr">
      <span :key="index" class="link" @click="handleClick(index)">{{ operation }}</span>
      <span v-if="index < textArr.length -1" :key="index" class="split-line">|</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    textArr: {
      required: true
    },
    centerHandler: {
      required: true
    },
    handlerArgs: {
      required: false
    }
  },
  methods: {
    handleClick(btnIndex) {
      this.centerHandler(btnIndex, this.handlerArgs[btnIndex])
    }
  }
}
</script>

<style scoped>

</style>

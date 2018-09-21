<template>
  <a class="daily-item">
    <div class="daily-img" v-if="data.images">
      <img :src="data.images[0]" alt="" class="imgs">
    </div>
    <div class="daily-title"
        :class="{ noImg: !data.images }">{{ data.title }}</div>
  </a>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}

</script>
<style lang='scss' scoped>

</style>

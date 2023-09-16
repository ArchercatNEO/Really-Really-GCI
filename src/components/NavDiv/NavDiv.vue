<script lang="ts">
import ArrowButtons from './ArrowButtons.vue'

export default {
  name: 'NavDiv',
  components: {
    ArrowButtons
  }
}
</script>

<template>
  <div class="navDiv">
    <ArrowButtons />
  </div>
</template>

<style scoped>
.navDiv {
  position: fixed;
  display: inline;
  left: 0%;
  bottom: 0%;
  background-color: rgb(2, 45, 145);
  width: 100%;
  height: 100px;
}
</style>

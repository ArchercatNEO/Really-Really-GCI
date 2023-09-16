<script lang="ts">
export default {
  name: 'UpgradeButtonDiv'
}
</script>

<template>
  <div>
    <button @click="$emit('clicked')" class="CloseBtn">Close</button>
    <button class="BuyBtn">Buy 1</button>
    <button class="BuyBtn">Buy 25</button>
    <button class="BuyBtn">Buy Max</button>
  </div>
</template>

<style scoped>
.CloseBtn {
  display: inline-flex;
  background-color: red;
  bottom: 0;
}

.BuyBtn {
  display: inline-flex;
  background-color: greenyellow;
  bottom: 0;
}
</style>

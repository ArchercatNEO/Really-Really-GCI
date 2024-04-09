<script setup lang="ts">
import GrassCanvas from "@/grass/GrassCanvas.vue";
import { NormalGrassField } from "@/grass/grass";

const field = new NormalGrassField();
</script>

<template>
    <div class="window">
        <GrassCanvas :grassField="field" />
        <GrassCanvas :grassField="field" />
        <GrassCanvas :grassField="field" />
        <GrassCanvas :grassField="field" />
    </div>
</template>

<style scoped>
.window {
    background-color: rgb(0, 255, 213);
}
</style>

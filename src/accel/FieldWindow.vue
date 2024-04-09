<script setup lang="ts">
import { NormalGrassField } from "@/grass/grass";

import UpgradeGrid from "@/common/Upgrade/UpgradeGrid.vue";
import GrassCanvas from "@/grass/GrassCanvas.vue";

const field = new NormalGrassField();
</script>

<template>
    <div class="window">
        <UpgradeGrid />
        <GrassCanvas :grassField="field" />
    </div>
</template>

<style scoped>
.window {
    background-color: rgb(0, 255, 213);
}
</style>

<script setup lang="ts">
import player from "@/player";
import { map } from "./map";

function getPositionIllegal(x: number, y: number): boolean {
    const dX = player.position[0] + x;
    const dY = player.position[1] + y;
    return map[dY]?.[dX] === undefined;
}

function setPosition(x: number, y: number) {
    player.position[0] += x;
    player.position[1] += y;
}
</script>

<template>
    <div class="arrow">
        <button class="arrow" :key="1" :disabled="getPositionIllegal(-1, 0)" @click="setPosition(-1, 0)">
            ←
        </button>
        <button class="arrow" :key="2" :disabled="getPositionIllegal(0, -1)" @click="setPosition(0, -1)">
            ↑
        </button>
        <button class="arrow" :key="3" :disabled="getPositionIllegal(0, 1)" @click="setPosition(0, 1)">
            ↓
        </button>
        <button class="arrow" :key="4" :disabled="getPositionIllegal(1, 0)" @click="setPosition(1, 0)">
            →
        </button>
    </div>
</template>

<style scoped>
div.arrow {
    position: absolute;
    bottom: 0px;
    left: 35%;
}

button.arrow {
    height: 30px;
    width: 30px;
    padding: 0px;
    margin: 30px;
}
</style>

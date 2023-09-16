<script lang="ts">
import { player } from '@/main'
import { map } from '@/scripts/map'

export default {
    name: 'ArrowDiv',
    methods: {
        SwitchWindow(x: number, y: number) {
            const dX = player.position[0] + x
            const dY = player.position[1] - y
            player.position = [dX, dY]
        },

        isIlegal(x: number, y: number): boolean {
            const dX = player.position[0] + x
            const dY = player.position[1] - y
            return map[dY]?.[dX] === undefined
        }
    }
}
</script>

<template>
    <div class="arrowDiv">
        <button class="arrow" :key="1" :disabled="isIlegal(-1, 0)" @click="SwitchWindow(-1, 0)">
            ←
        </button>
        <button class="arrow" :key="2" :disabled="isIlegal(0, -1)" @click="SwitchWindow(0, -1)">
            ↑
        </button>
        <button class="arrow" :key="3" :disabled="isIlegal(0, 1)" @click="SwitchWindow(0, 1)">
            ↓
        </button>
        <button class="arrow" :key="4" :disabled="isIlegal(1, 0)" @click="SwitchWindow(1, 0)">
            →
        </button>
    </div>
</template>

<style scoped>
.arrowDiv {
    position: absolute;
    bottom: 0px;
    left: 35%;
}

.arrow {
    height: 30px;
    width: 30px;
    padding: 0px;
    margin: 30px;
}
</style>

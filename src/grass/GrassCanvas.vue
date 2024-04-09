<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { GrassCube, GrassField } from "@/grass/GrassField";
import { Cursor } from "./Cursor";

const { grassField } = defineProps<{
    grassField: GrassField;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);

const cutter = ref<Cursor>(new Cursor());
const grass: GrassCube[] = [];
let cap = 0;

onMounted(() => {
    if (canvas.value === null) {
        throw new Error("Grass Field could not find a canvas");
    }

    setInterval(update, 1000 / 60, 1000 / 60);
});

/** Grow grass until either grass cap or grow speed limit is reached */
function update(delta: number) {
    if (canvas.value === null) {
        return;
    }

    const context = canvas.value.getContext("2d");
    if (context === null) {
        return;
    }

    const speedCap = grassField.growSpeed() * delta;
    const grassCap = grassField.grassCap() - grass.length;

    for (cap += Math.min(speedCap, grassCap); cap > 0; cap--) {
        const cube = grassField.spawnGrass(canvas.value);

        //If the cutter and cube are colliding
        if (cutter.value.isColliding(grassField.cutterLength(), cube)) {
            cube.collectGrass();
        } else {
            grass.push(cube);
            context.fillStyle = "green";
            context.fillRect(cube.position.x, cube.position.y, 20, 20);
        }
    }
}

function moveCutter(event: MouseEvent) {
    if (cutter.value === null) { return; }
    if (canvas.value === null) { return; }

    const context = canvas.value.getContext("2d");
    if (context === null) {
        return;
    }

    // Get mouse coordinates
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    cutter.value.position.x = mouseX;
    cutter.value.position.y = mouseY;

    // Check if mouse is over a visible grass cube
    for (const cube of grass) {
        if (cutter.value.isColliding(grassField.cutterLength(), cube)) {
            const cutGrassIdx = grass.indexOf(cube);
            grass[cutGrassIdx].collectGrass();
            grass.splice(cutGrassIdx, 1);
        }
    }

    // Clear the canvas
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);

    for (const cube of grass) {
        context.fillStyle = "green";
        context.fillRect(cube.position.x, cube.position.y, 20, 20);
    }

    if (cutter.value?.active) {
        context.fillStyle = "cyan";
        context.fillRect(
            mouseX - grassField.cutterLength() / 2,
            mouseY - grassField.cutterLength() / 2,
            grassField.cutterLength(),
            grassField.cutterLength()
        );
    }
}
</script>

<template>
    <canvas
        ref="canvas"
        class="grass-field"
        @mousemove="moveCutter"
        @mouseenter="
            () => {
                cutter.active = true;
            }
        "
        @mouseleave="
            () => {
                cutter.active = false;
            }
        "
    >
    </canvas>
</template>

<style scoped>
.grass-field {
    position: absolute;
    left: 5%;
    top: 40%;
    background-color: rgb(150, 255, 40);
    border-color: black;
    border-width: 1px;
    border-style: solid;
    width: 300px;
    height: 150px;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { GrassCube, GrassField } from "@/grass/GrassField";

const props = defineProps<{
    grassField: GrassField;
}>();

const { grassField } = props;

let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

let cap = 0;
const grass: GrassCube[] = [];
const cutter = ref<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false
});

onMounted(() => {
    canvas = document.querySelector("canvas")!;
    context = canvas?.getContext("2d");

    setInterval(update, 1000 / 60, 1000 / 60);
});

/** Grow grass until either grass cap or grow speed limit is reached */
function update(delta: number) {
    //Guard clauses
    //TODO do nullability better
    if (canvas === null) {
        return;
    }
    if (context === null) {
        return;
    }

    const { x: cutterX, y: cutterY } = cutter.value;

    const speedCap = grassField.growSpeed() * delta;
    const grassCap = grassField.grassCap() - grass.length;

    for (cap += Math.min(speedCap, grassCap); cap > 0; cap--) {
        const cube = grassField.spawnGrass(canvas);

        //If the cutter and cube are colliding
        if (
            cutterX + grassField.cutterLength() / 2 <= cube.posX ||
            cutterX - grassField.cutterLength() / 2 >= cube.posY + 20 ||
            cutterY + grassField.cutterLength() / 2 <= cube.posX ||
            cutterY - grassField.cutterLength() / 2 >= cube.posY + 20
        ) {
            grass.push(cube);
            context.fillStyle = "green";
            context.fillRect(cube.posX, cube.posY, 20, 20);
        } else {
            cube.collectGrass();
        }
    }
}

function moveCutter(event: MouseEvent) {
    if (!canvas) return;
    if (!context) return;
    if (!cutter.value) return;

    // Get mouse coordinates
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    cutter.value.x = mouseX;
    cutter.value.y = mouseY;

    // Check if mouse is over a visible grass cube
    for (const cube of grass) {
        if (
            !(
                mouseX + grassField.cutterLength() / 2 <= cube.posX ||
                mouseX - grassField.cutterLength() / 2 >= cube.posX + 20 ||
                mouseY + grassField.cutterLength() / 2 <= cube.posY ||
                mouseY - grassField.cutterLength() / 2 >= cube.posY + 20
            )
        ) {
            const cutGrassIdx = grass.indexOf(cube);
            grass[cutGrassIdx].collectGrass();
            grass.splice(cutGrassIdx, 1);
        }
    }

    // Clear the canvas
    context.clearRect(0, 0, canvas!.width, canvas!.height);

    for (const cube of grass) {
        context.fillStyle = "green";
        context.fillRect(cube.posX, cube.posY, 20, 20);
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

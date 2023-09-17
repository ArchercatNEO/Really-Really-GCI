<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fieldStats } from '@/scripts/engine/grassFieldStats'
import { GainGrass } from '@/scripts/layers/grass'

const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const grass = ref<{ x: number; y: number }[]>([])
const cutter = ref<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false
})

const growSpeed = computed(fieldStats.growSpeed)
const grassCap = computed(fieldStats.grassCap)
const cutterLength = computed(fieldStats.cutterLength)
let cap = 0

onMounted(() => {
    canvas.value = document.querySelector('canvas')!
    context.value = canvas.value?.getContext('2d')

    context.value!.fillStyle = 'brown'

    // Initialize moles and start spawning
    setInterval(update, 1000 / 60)
})

function refreshGrass() {
    if (!context.value) return

    // Clear the canvas
    context.value.clearRect(0, 0, canvas.value!.width, canvas.value!.height)

    // Draw visible moles
    for (const cube of grass.value) context.value.fillRect(cube.x, cube.y, 20, 20) // Adjust mole size as needed

    const { x: cutterX, y: cutterY } = cutter.value

    if (cutter.value?.active) {
        context.value.fillStyle = 'cyan'
        context.value.fillRect(
            cutterX - cutterLength.value / 2,
            cutterY - cutterLength.value / 2,
            cutterLength.value,
            cutterLength.value
        )
        context.value.fillStyle = 'brown'
    }
}

function update() {
    const cut = cutter.value
    const cutterX = cut.x
    const cutterY = cut.y

    const grassCap2 = grassCap.value - grass.value.length
    const speedCap = (growSpeed.value * 60) / 1000
    cap += Math.min(speedCap, grassCap2)

    while (cap > 1) {
        growOneGrass(cutterX, cutterY)
        cap--
    }
}

function growOneGrass(cutterX: number, cutterY: number) {
    if (!context.value) return
    if (!canvas.value) return
    // Grow one grass
    const cube = { x: 0, y: 0 }

    // Set grass position and make it visible
    cube.x = Math.random() * canvas.value.width
    cube.y = Math.random() * canvas.value.height

    if (
        cutterX + length / 2 <= cube.x ||
        cutterX - length / 2 >= cube.x + 20 ||
        cutterY + length / 2 <= cube.y ||
        cutterY - length / 2 >= cube.y + 20
    ) {
        // Draw it
        grass.value.push(cube)
        context.value.fillRect(cube.x, cube.y, 20, 20) // Adjust mole size as needed
        return
    }

    GainGrass()
}

function cutGrass() {
    if (!context.value) return

    const { x: cutterX, y: cutterY } = cutter.value

    // Check if mouse is over a visible mole
    for (const cube of grass.value) {
        if (
            !(
                cutterX + cutterLength.value / 2 <= cube.x ||
                cutterX - cutterLength.value / 2 >= cube.x + 20 ||
                cutterY + cutterLength.value / 2 <= cube.y ||
                cutterY - cutterLength.value / 2 >= cube.y + 20
            )
        ) {
            grass.value.splice(grass.value.indexOf(cube), 1)
            GainGrass()
        }
    }
}

function moveCutter(event: MouseEvent) {
    if (!cutter.value) return
    if (!canvas.value) return
    // Get mouse coordinates
    const mouseX = event.offsetX
    const mouseY = event.offsetY

    cutter.value.x = mouseX
    cutter.value.y = mouseY

    cutGrass()
    refreshGrass()
}

function OnMouseBorder(active: boolean) {
    cutter.value.active = active
    refreshGrass()
}
</script>

<template>
    <div>
        <canvas
            ref="canvas"
            class="GrassField"
            @mousemove="moveCutter"
            @mouseenter="() => OnMouseBorder(true)"
            @mouseleave="() => OnMouseBorder(false)"
        >
        </canvas>
    </div>
</template>

<style scoped>
.GrassField {
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

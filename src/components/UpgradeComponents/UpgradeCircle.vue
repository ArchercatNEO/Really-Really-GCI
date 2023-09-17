<script setup lang="ts">
import type { Upgrade } from '@/scripts/engine/upgrade'
import { computed, onMounted, ref, reactive } from 'vue'

const props = defineProps<{ upgrade: Upgrade }>()
const upgrade = reactive(props.upgrade)

const icon = ref<HTMLImageElement | null>(null)
const base = ref<HTMLImageElement | null>(null)

const computedClass = computed(() => {
    return {
        cheap: upgrade.isAffordable,
        expensive: !upgrade.isAffordable
    }
})

onMounted(() => {
    icon.value!.src = upgrade.icon
    base.value!.src = upgrade.bg
})
</script>

<template>
    <div class="upgrade" :refresh="0">
        <div class="upgradeImage">
            <img ref="icon" class="icon" @click="$emit('clicked', upgrade.description)" />
            <img ref="base" class="base" />
        </div>
        <p :class="computedClass">Cost: {{ upgrade.cost(78) }}</p>
    </div>
</template>

<style scoped>
.base {
    z-index: 0;
}

.icon {
    z-index: 10;
}
.upgradeImage {
    width: 100px; /* Set the width of the container div */
    height: 100px;
}

.upgradeImage img {
    position: absolute;
    display: block; /* Remove any extra space below the image */
    max-width: 100%; /* Ensure the image doesn't exceed the container's width */
    height: auto; /* Allow the height to adjust proportionally */
    padding: 5px;
}

/* We need to stack images but can't consistently hover over both */
.upgradeImage:hover img {
    cursor: pointer;
    padding: 0px;
}

.upgrade {
    position: relative;
    display: block;
    text-align: center;
}

.cheap {
    color: green; /* Define styles for the "cheap" class */
}

.expensive {
    color: red; /* Define styles for the "expensive" class */
}
</style>

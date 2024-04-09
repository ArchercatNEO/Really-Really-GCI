<script setup lang="ts">
import { computed, onMounted, ref, reactive } from "vue";

import { format } from "@/common/notations";
import type { Upgrade } from "./Upgrade";

const props = defineProps<{ upgrade: Upgrade }>();
const upgrade = reactive(props.upgrade);

defineEmits<{
    clicked: [upgrade: Upgrade];
}>();

const icon = ref<HTMLImageElement>();
const base = ref<HTMLImageElement>();

const computedClass = computed(() => {
    return {
        cheap: upgrade.nextCost() <= upgrade.currency.amount,
        expensive: upgrade.nextCost() > upgrade.currency.amount
    };
});

onMounted(() => {
    icon.value!.src = upgrade.icon();
    base.value!.src = upgrade.background();
});
</script>

<template>
    <div class="upgrade" :refresh="0">
        <div class="upgradeImage">
            <img ref="icon" class="icon" @click="$emit('clicked', upgrade)" />
            <img ref="base" class="base" />
        </div>
        <p :class="computedClass">Cost: {{ format(upgrade.nextCost(), 2, 0) }}</p>
    </div>
</template>

<style scoped>
.icon {
    z-index: 10;
}

.base {
    z-index: 0;
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

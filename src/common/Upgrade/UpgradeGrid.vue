<script setup lang="ts">
import { ref } from "vue";

import type { Upgrade } from "./Upgrade";
import { grassUpgrades } from "@/grass/grassUpgrades";

import UpgradeCircle from "./UpgradeCircle.vue";

const selectedUpgrade = ref<Upgrade>(grassUpgrades[0]);
const descriptionOpen = ref(false);

function OpenUpgrade(newUpgrade: Upgrade) {
    selectedUpgrade.value = newUpgrade;
    descriptionOpen.value = true;
}
</script>

<template>
    <div class="UpgradeHeader">
        <p class="UpgradeTitle">Grass Upgrades</p>
        <div v-if="!descriptionOpen" class="UpgradeSpace red">
            <UpgradeCircle
                v-for="grassUpgrade of grassUpgrades"
                :key="grassUpgrade.description"
                :upgrade="grassUpgrade"
                @clicked="OpenUpgrade"
            />
        </div>
        <div v-if="descriptionOpen">
            <p>{{ selectedUpgrade.description }}</p>
            <div>
                <button @click="descriptionOpen = false" class="CloseBtn">Close</button>
                <button @click="selectedUpgrade.buyOne" class="BuyBtn">Buy 1</button>
                <button @click="selectedUpgrade.buyNext" class="BuyBtn">Buy Next</button>
                <button @click="selectedUpgrade.buyMax" class="BuyBtn">Buy Max</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.UpgradeSpace {
    display: flex;
    height: auto;
    width: auto;
}

.red {
    background-color: greenyellow;
}

.UpgradeHeader {
    border-width: 5px;
    border-style: outset;
    border-color: rgb(0, 0, 0);
    background-color: rgb(85, 85, 85);
    text-align: center;
    width: auto;
    height: auto;
}

.UpgradeTitle {
    color: rgb(0, 255, 0);
    padding-top: 3px;
    padding-bottom: 3px;
}

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

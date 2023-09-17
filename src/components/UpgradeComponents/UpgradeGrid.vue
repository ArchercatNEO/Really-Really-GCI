<script setup lang="ts">
import { GrassUpgrades } from '@/scripts/layers/test'
import { ref } from 'vue'
import UpgradeCircle from './UpgradeCircle.vue'
import UpgradeButtonDiv from './UpgradeBtns.vue'

const descriptionOpen = ref(false)
const upgradeDescription = ref('')

function OpenUpgrade(description: string) {
    upgradeDescription.value = description
    descriptionOpen.value = true
}

function CloseUpgrade() {
    descriptionOpen.value = false
}
</script>

<template>
    <div class="UpgradeHeader">
        <p class="UpgradeTitle">Grass Upgrades</p>
        <div v-if="!descriptionOpen" class="UpgradeSpace red">
            <UpgradeCircle
                @clicked="OpenUpgrade"
                v-for="i in 5"
                :key="i"
                :upgrade="GrassUpgrades[i - 1]"
            />
        </div>
        <div v-if="descriptionOpen">
            <p>{{ upgradeDescription }}</p>
            <UpgradeButtonDiv @clicked="CloseUpgrade" />
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
</style>

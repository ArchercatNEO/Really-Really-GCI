<script setup lang="ts">
import { computed } from "vue";

import player from "@/player";
import { format } from "@/common/notations";
import { map } from "@/map/map";

import ArrowButtons from "@/map/ArrowButtons.vue";

const x = computed(() => player.position[0]);
const y = computed(() => player.position[1]);
</script>

<template>
    <header></header>
    <main>
        <!--Game header (for grass)-->
        <div class="header">
            <div class="grass">
                {{ format(player.grass, 2, 0) }}
            </div>
        </div>
        <!--Main game window-->
        <component :is="map[y][x]" />
        <!--Game footer (arrows)-->
        <div class="footer">
            <ArrowButtons />
        </div>
    </main>
</template>

<style scoped>
.header {
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100vw;
    padding: 10px;
    background-color: red;
    margin: auto;
}

div.grass {
    margin: auto;
    border: 3px solid green;
    background-color: greenyellow;
    width: 50%;
    text-align: right;
    font-size: 32px;
    text-emphasis-color: white;
}

div.footer {
    position: fixed;
    display: inline;
    left: 0%;
    bottom: 0%;
    width: 100%;
    height: 100px;
}
</style>

<script setup lang="ts">
import player from '@/player'
import { format } from '@/scripts/engine/notations'
</script>

<template>
    <div class="header">
        <div class="grass">
            {{ format(player.grass, 2, 0) }}
        </div>
    </div>
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
</style>

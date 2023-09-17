import { Upgrade } from '../engine/upgrade'
import type { UpgradeData } from '../engine/upgrade'
import player from '@/player'

const GrassUpgradeData: UpgradeData[] = [
    {
        description: 'WEeeee',
        cost() {
            return 0
        },
        bg: 'images/Bases/AutoBase.png',
        icon: 'images/Curr/Astrolabe.png',
        currency: () => player.grass
    },
    {
        description: 'WEewooe',
        cost(level) {
            return 10
        },
        bg: 'images/Bases/AstroBase.png',
        icon: 'images/Curr/Charge.png',
        currency: () => player.grass
    },
    {
        description: 'hi',
        cost(level) {
            return 20
        },
        bg: 'images/Bases/AstroBase.png',
        icon: 'images/Curr/Cloud.png',
        currency: () => player.grass
    },
    {
        description: 'tftft',
        cost(level) {
            return 30
        },
        bg: 'images/Bases/AstroBase.png',
        icon: 'images/Curr/Fun.png',
        currency: () => player.grass
    },
    {
        description: 'gddhgt',
        cost(level) {
            return 40
        },
        bg: 'images/Bases/AstroBase.png',
        icon: 'images/Curr/Astrolabe.png',
        currency: () => player.grass
    }
]

export const GrassUpgrades = GrassUpgradeData.map((e) => new Upgrade(e))

import type { Upgrade } from "../engine/upgrade";

export const GrassUpgrades: Upgrade[] =
[
    {
        description: "WEeeee", 
        cost(level) {
            return 0
        },
        bg: "images/Bases/AutoBase.png",
        icon: "images/Curr/Astrolabe.png"
    },
    {
        description: "WEewooe", 
        cost(level) {
            return 10
        },
        bg: "images/Bases/AstroBase.png",
        icon: "images/Curr/Charge.png"
    },
    {
        description: "hi", 
        cost(level) {
            return 20
        },
        bg: "images/Bases/AstroBase.png",
        icon: "images/Curr/Cloud.png"
    },
    {
        description: "tftft", 
        cost(level) {
            return 30
        },
        bg: "images/Bases/AstroBase.png",
        icon: "images/Curr/Fun.png"
    },
    {
        description: "gddhgt", 
        cost(level) {
            return 40
        },
        bg: "images/Bases/AstroBase.png",
        icon: "images/Curr/Astrolabe.png"
    }
];
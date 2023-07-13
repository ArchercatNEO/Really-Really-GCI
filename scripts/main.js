"use strict";
function init() {
    windows = [
        [$("#Achievements"), $("#Settings")],
        [$("#City"), $("#GrassField")],
        [$("#Time"), $("#Automation")],
    ];
    for (let array of windows)
        for (let field of array)
            field.hide();
    for (let i = 0; i < player.field.gridSize; i++) {
        for (let j = 0; j < player.field.gridSize; j++) {
            player.field.emptySpace.push({ x: j, y: i });
        }
    }
    SwitchWindow("none");
    SwitchGrassField();
    InitGrass();
    return;
}
const deltaTime = 1 / 60;
function tick() {
    //called every 1/60th of a second
    drawEveryGrass(player.growSpeed * deltaTime);
    return;
}
let windows;
const player = {
    field: {
        grassLength: 3,
        grassBorder: 5,
        grassCount: 0,
        grassCap: 5000,
        canvas: null,
        colour: "#0F0",
        emptySpace: [],
        grassSpace: [],
        gridSize: 71
    },
    realm: "accel",
    range: 10,
    growSpeed: 1,
    position: [1, 1]
};

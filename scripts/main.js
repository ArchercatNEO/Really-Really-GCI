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
        grassLength: 5,
        grassBorder: 7,
        grassCount: 0,
        grassCap: 300,
        canvas: null,
        colour: "#0F0",
        emptySpace: [],
        gridSize: 20
    },
    realm: "accel",
    range: 10,
    growSpeed: 1,
    position: [1, 1]
};

"use strict";
function SwitchGrassField(realm) {
    //get which field we need to deal with
    let field, colour;
    switch (realm) {
        case "planetoid": {
            field = "planetField";
            colour = "#000";
            break;
        }
        case "reccel": {
            field = "reccelField";
            colour = "FFFF00";
            break;
        }
        case "deccel": {
            field = "deccelField";
            colour = "0045FF";
            break;
        }
        case "accel": {
            field = "accelField";
            colour = "#A0FF00";
            break;
        }
        default: throw new Error("Tried to move into the wack zone");
    }
    //get the realm's grass field and context
    const step = document.getElementById(field);
    player.field.canvas = step.getContext("2d");
    //set grass colour
    player.field.canvas.fillStyle = colour;
    player.field.canvas.strokeStyle = "black";
}
function drawEveryGrass(amount) {
    //draw amount blocks of grass unless we hit the cap 
    for (let i = 0; i < amount && player.field.grassCount < player.field.grassCap; i++)
        drawSingleGrass();
}
function drawSingleGrass() {
    // Calculate the size of the square
    const randomIndex = Math.floor(Math.random() * player.field.emptySpace.length);
    const { x: gridX, y: gridY } = player.field.emptySpace[randomIndex];
    const x = gridX * player.field.grassBorder;
    const y = gridY * player.field.grassBorder;
    // Draw the square
    player.field.canvas.strokeRect(x, y, player.field.grassBorder, player.field.grassBorder);
    player.field.canvas.fillRect(x, y, player.field.grassLength, player.field.grassLength);
    // Mark the occupied grid cells
    player.field.emptySpace.splice(randomIndex, 1);
    player.field.grassSpace.push({ x: gridX, y: gridY });
    player.field.grassCount++;
}

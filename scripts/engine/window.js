"use strict";
function SwitchWindow(direction) {
    const StringToPos = {
        "up": [0, -1],
        "down": [0, 1],
        "left": [-1, 0],
        "right": [1, 0],
        "none": [0, 0]
    };
    //hide current window
    windows[player.position[1]][player.position[0]].hide();
    //move position
    player.position[0] += StringToPos[direction][0];
    player.position[1] += StringToPos[direction][1];
    //show desired window
    windows[player.position[1]][player.position[0]].show();
    //disable and make the arrows transparent
    for (const jquery of $(".arrow")) {
        const btn = $("#" + jquery.id);
        //clone the position
        let [x, y] = Array.from(player.position);
        x += StringToPos[jquery.id][0];
        y += StringToPos[jquery.id][1];
        const illegalTravel = x < 0 || y < 0 || y >= windows.length || x >= windows[y].length;
        //figure out which arrows should be enabled
        illegalTravel ? btn.prop("disabled", true) : btn.prop("disabled", false);
    }
}

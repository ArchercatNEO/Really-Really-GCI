const player = {};

function init(){
    windows = [
        [$("#Achievements"), $("#Settings")],
        [$("#City"), $("#GrassField")],
        [$("#Time"), $("#Automation")],
    ]

    for (let array of windows)
        for (let field of array)
            field.hide()
    
    player.position = [1, 1];
    SwitchWindow("none");
    
    return;
}

function tick(){
    return;
}


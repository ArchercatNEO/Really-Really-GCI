let windows;

function SwitchWindow(direction){  

    const StringToPos = {
        up:  [0, -1],
        down:  [0, 1],
        left:  [-1, 0],
        right:  [1, 0],
        none: [0, 0]
    }
    
    //hide current window
    windows[player.position[1]][player.position[0]].hide();
    
    //move position
    player.position[0] += StringToPos[direction][0];
    player.position[1] += StringToPos[direction][1];

    //show desired window
    windows[player.position[1]][player.position[0]].show();

    
    //disable and make the arrows transparent
    for (const jquery of $(".arrow")){
        const btn = $("#"+jquery.id);
        
        //clone the position
        let fake = Array.from(player.position);
        fake[0] += StringToPos[jquery.id][0];
        fake[1] += StringToPos[jquery.id][1];
        
        //figure out which arrows should be enabled
        try{
            if (windows[fake[1]][fake[0]] != null){
                btn.prop("disabled", false);
                btn.fadeTo(0, 1);
            }
            else{
                btn.prop("disabled", true);
                btn.fadeTo(0, 0.7);
            }    
        }
        catch{
            btn.prop("disabled", true);
            btn.fadeTo(0, 0.7);
        }
    }
}



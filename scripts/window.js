function SwitchWindow(direction){
    console.log($(".arrow"));
    console.log(player.position.join(","));
    
    //hide current window
    document.getElementById(player.position.join(",")).style.display = "none";
    
    //move position
    switch(direction){
        
        case "up":
            player.position[1] -= 1;
            break;
        
        case "down":
            player.position[1] += 1;
            break;

        case "left":
            player.position[0] -= 1;
            break;
            
        case "right":
            player.position[0] += 1;
            break;
    }

    //show desired window
    document.getElementById(player.position.join(",")).style.display = "block";
    
    //disable and make the arrows transparent
    for (let jquery of $(".arrow")){
        //figure out which arrows should be enabled
        const availible = !windows[player.position[1]][player.position[0]].arrows.includes(jquery.id);
        console.log(availible);
        console.log(jquery);
        
        jquery.prop("disabled", availible);
        if (availible) jquery.fadeTo(0, 0.8);
    }
}
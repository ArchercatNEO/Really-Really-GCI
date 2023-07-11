function SwitchGrassField(): void{
    
    //get which field we need to deal with
    let field: string, colour: string;
    switch(player.realm){
        case "planetoid": {field = "planetField"; colour = "#000"}
        case "reccel": field = "reccelField";
        case "deccel": field = "deccelField";
        default : {field = "accelField"; colour = "#456"}
    }

    //do I need to explain?
    const step: HTMLCanvasElement = document.getElementById(field)! as HTMLCanvasElement;
    player.field.canvas = step.getContext("2d");
    player.field.colour = colour;
}

function drawEveryGrass(amount: number){
    //draw amount blocks of grass unless we hit the cap 
    for(let i = 0; i < amount && player.field.grassCount < player.field.grassCap; i++)
        drawSingleGrass();
}

function drawSingleGrass() {
        
    // Calculate the size of the square
    const randomIndex = Math.floor(Math.random() * player.field.emptySpace.length);
    
    const gridX = player.field.emptySpace[randomIndex].x;
    const gridY = player.field.emptySpace[randomIndex].y;
    
    const x = gridX * player.field.grassBorder;
    const y = gridY * player.field.grassBorder;

    // Draw the square
    player.field.canvas!.fillStyle = "#000";
    player.field.canvas!.fillRect(x, y, player.field.grassBorder, player.field.grassBorder);

    player.field.canvas!.fillStyle = player.field.colour;
    player.field.canvas!.fillRect(x, y, player.field.grassLength, player.field.grassLength);

    // Mark the occupied grid cells
    player.field.emptySpace.splice(randomIndex, 1);
    player.field.grassCount++;
  }

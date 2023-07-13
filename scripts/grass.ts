function SwitchGrassField(): void{
    
    //get which field we need to deal with
    let field: string, colour: string;
    switch(player.realm){
        case "planetoid": {field = "planetField"; colour = "#000"}
        case "reccel": field = "reccelField";
        case "deccel": field = "deccelField";
        default : {field = "accelField"; colour = "#50F000"}
    }

    //do I need to explain?
    const step: HTMLCanvasElement = document.getElementById(field)! as HTMLCanvasElement;
    player.field.canvas = step.getContext("2d");
    player.field.canvas!.fillStyle = colour;
    player.field.canvas!.strokeStyle = "black";
}

function drawEveryGrass(amount: number){
    //draw amount blocks of grass unless we hit the cap 
    for(let i = 0; i < amount && player.field.grassCount < player.field.grassCap; i++)
        drawSingleGrass();
}

function drawSingleGrass() {
        
    // Calculate the size of the square
    const randomIndex = Math.floor(Math.random() * player.field.emptySpace.length);
    
    const {x : gridX, y: gridY} = player.field.emptySpace[randomIndex]

    const x = gridX * player.field.grassBorder;
    const y = gridY * player.field.grassBorder;

    // Draw the square
    player.field.canvas!.strokeRect(x, y, player.field.grassBorder, player.field.grassBorder);
    player.field.canvas!.fillRect(x, y, player.field.grassLength, player.field.grassLength);

    // Mark the occupied grid cells
    player.field.emptySpace.splice(randomIndex, 1);
    player.field.grassSpace.push({x: gridX, y: gridY});
    player.field.grassCount++;
  }

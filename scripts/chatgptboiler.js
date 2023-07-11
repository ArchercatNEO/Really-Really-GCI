
      // Get the canvas element
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grassLength = 20;
      const gridSize = grassLength * range;

      const grid = Array(grassLength)
        .fill(null)
        .map(() => Array(grassLength).fill(false));

      function drawSquare() {
        
        // Calculate the size of the square

        let x, y, gridX, gridY;
        do {
          // Generate random grid coordinates
          gridX = Math.floor(Math.random() * grassLength);
          gridY = Math.floor(Math.random() * grassLength);

          // Convert grid coordinates to pixel coordinates
          x = gridX * gridSize;
          y = gridY * gridSize;

        } while (grid[gridY][gridX]);

        // Draw the square
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, grassLength, grassLength);

        // Mark the occupied grid cells
        grid[gridY][gridX] = true;
      }


      // Call the drawSquare function every 1000 / 60 milliseconds (approximately 60 cps)
      setInterval(drawSquare, 1000 / 60);

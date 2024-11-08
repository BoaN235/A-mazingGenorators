let clicked = false;
let grid = [];

function gid(e) {
    return document.getElementById(e);
}

function createCell(className) {
    const cell = document.createElement("td");
    if (className) {
        cell.className = className;
    }
    return cell;
}

function generateClass(typeofgeneration) {
    // Placeholder function for future generation logic
}

function generateStructure(tableBody, typeofgeneration) {
    const rows = 50;
    const cols = 50;

    // Initialize grid as a 2D array
    grid = Array.from({ length: rows }, () => Array(cols));

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const className = "na";  // Default unvisited cells are "na" (not visited)
            const cell = createCell(className);

            // Add cell to grid
            grid[i][j] = cell;

            // Add click event listener to toggle class
            cell.addEventListener("click", () => toggleCellClass(cell));

            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }

    // Start maze generation based on selected type
    if (typeofgeneration === 'random') {
        generateMazeDFS(0, 0);
    } else {
        generateMaze(grid, typeofgeneration);
    }
}

// Get adjacent cells based on row and column indices
function getAdjacentCells(row, col) {
    const adjacentCells = [];
    const directions = [
        [-1, 0], [1, 0], // Up, Down
        [0, -1], [0, 1]  // Left, Right
    ];

    directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
            newRow >= 0 && newRow < grid.length &&
            newCol >= 0 && newCol < grid[0].length
        ) {
            adjacentCells.push([newRow, newCol]);
        }
    });

    return adjacentCells;
}

// Generate maze using Depth-First Search (DFS) algorithm
function generateMazeDFS(row, col) {
    const stack = [[row, col]];
    grid[row][col].className = "n"; // Start cell as path

    while (stack.length > 0) {
        const [currentRow, currentCol] = stack[stack.length - 1];
        const neighbors = getAdjacentCells(currentRow, currentCol)
            .filter(([r, c]) => grid[r][c].className === "na"); // Only unvisited cells

        if (neighbors.length === 0) {
            stack.pop(); // Backtrack if no unvisited neighbors
        } else {
            const [nextRow, nextCol] = neighbors[Math.floor(Math.random() * neighbors.length)];

            // Create passage
            grid[nextRow][nextCol].className = "n";

            // Randomly decide which direction to place the wall
            const direction = Math.floor(Math.random() * 4); // Random direction for the wall
            switch (direction) {
                case 0: grid[currentRow][currentCol].className = "n"; break; // North wall
                case 1: grid[currentRow][currentCol].className = "s"; break; // South wall
                case 2: grid[currentRow][currentCol].className = "e"; break; // East wall
                case 3: grid[currentRow][currentCol].className = "w"; break; // West wall
            }

            stack.push([nextRow, nextCol]);
        }
    }
}

// Placeholder for other maze generation types (random, wavefunction)
function generateMaze(grid, typeofgeneration) {
    if (typeofgeneration === 'random') {
        // Placeholder for random generation logic
    } else if (typeofgeneration === 'wavefunction') {
        // Placeholder for wavefunction-based generation logic
    }
}

function toggleCellClass(cell) {
    const classes = ["n", "w-n", "w-s", "w-e", "w-w", "so", "em"];
    let currentClass = cell.className;
    let currentIndex = classes.indexOf(currentClass);

    // Cycle to the next class in the array
    if (currentIndex === -1 || currentIndex === classes.length - 1) {
        cell.className = classes[0]; // Reset to the first class
    } else {
        cell.className = classes[currentIndex + 1]; // Move to the next class
    }
}

function createTable(typeofgeneration) {
    const table = gid("maze");
    const tableBody = document.createElement("tbody");

    // Clear the table if it was previously generated
    if (clicked) {
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
    }

    // Generate structure based on the selected type of generation
    generateStructure(tableBody, typeofgeneration);

    // Append the table body to the table and set border
    table.appendChild(tableBody);
    table.setAttribute("border", "3");

    clicked = true;
}

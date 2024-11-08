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
    let state = 0;

    if (typeofgeneration === 'random') {
        state = Math.floor(Math.random() * 6);
    } else if (typeofgeneration === 'wavefunction') {
        state = 0; // Placeholder for wavefunction-based generation logic
    } else if (typeofgeneration === 'other') {
        state = 0; // Placeholder for other generation logic
    }

    switch (state) {
        case 0: return "n"; // Open path
        case 1: return "w"; // Wall
        case 2: return "e"; // Entrance
        case 3: return "s"; // Exit
        case 4: return "so"; // Special object
        case 5: return "em"; // Empty cell
        default: return "na";
    }
}

function generateStructure(tableBody, typeofgeneration) {
    const rows = 50;
    const cols = 50;

    // Initialize grid as 2D array
    grid = Array.from({ length: rows }, () => Array(cols));

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const className = "na";
            const cell = createCell(className);

            // Add cell to grid
            grid[i][j] = cell;

            // Add click event listener to toggle class
            cell.addEventListener("click", () => toggleCellClass(cell));

            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }

    generateMaze(grid);
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

        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            adjacentCells.push(grid[newRow][newCol]);
        }
    });

    return adjacentCells;
}

function generateMaze(grid) {
    adjacentCells = getAdjacentCells
    

}

function toggleCellClass(cell) {
    const classes = ["n", "w", "e", "s", "so", "em"];
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

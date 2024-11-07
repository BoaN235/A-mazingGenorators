let clicked = false;

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
        case 3: return "s"; // Exits
        case 4: return "so"; // Special object
        case 5: return "em"; // Empty cell
        default: return "";
    }
}

function generateStructure(tableBody, typeofgeneration) {

    const startRow = 0; // Define start row for the maze
    const startCol = 0; // Define start column for the maze

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const isStart = (i === startRow && j === startCol);
            const className = generateClass(typeofgeneration, isStart);
            const cell = createCell(className)
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

function createTable(typeofgeneration) {
    const table = gid("maze");
    const tableBody = document.createElement("tbody");

    const rows = 50;
    const cols = 50;
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            cell.className = ""
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
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
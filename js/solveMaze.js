"use strict";

function resetAlgo() {
    nodeList = [];
	nodeListIndex = 0;
	pathList = [];
	pathListIndex = 0;
	found = false;
	path = false;
}

function solver_interval() {
    interval = window.setInterval(function() {
        if (!path) {
            get_cell_from_x_y(nodeList[nodeListIndex][0], nodeList[nodeListIndex][1]).classList.add("cell_path");
            nodeListIndex++;

            if (nodeListIndex === nodeList.length) {
                if (!found) {
                    clearInterval(interval);
                } else {
                    path = true;
                    get_cell_from_x_y(start_pos[0], start_pos[1]).classList.add("shortest_path");
                }
            }
        } else {
            if (pathListIndex === pathList.length) {
                //get_cell_from_x_y(target_pos[0], target_pos[1]).classList.remove("cell_path");
                get_cell_from_x_y(target_pos[0], target_pos[1]).classList.add("shortest_path");
                clearInterval(interval);

                return;
            }

            get_cell_from_x_y(pathList[pathListIndex][0], pathList[pathListIndex][1]).classList.remove("cell_path");;
            get_cell_from_x_y(pathList[pathListIndex][0], pathList[pathListIndex][1]).classList.add("shortest_path");
            pathListIndex++;
        }
    }, 10);
}

function astar() {
    resetAlgo();

    let frontier = [start_pos];
    let costGrid = new Array(array.length).fill(0).map(() => new Array(array[0].length).fill(0));
    array[start_pos[0]][start_pos[1]] = 1;

    do {
        frontier.sort(function(a, b) {
            let aValue = costGrid[a[0]][a[1]] + distance(a, target_pos) * Math.sqrt(2);
            let bValue = costGrid[b[0]][b[1]] + distance(b, target_pos) * Math.sqrt(2);
            return aValue - bValue;
        });

        let currentCell = frontier[0];
        let neighbours = getNeighbours(currentCell[0], currentCell[1], 1);
        frontier.splice(0, 1);

        for (let i = 0; i < neighbours.length; i++)
            if (getCellValue(neighbours[i][0], neighbours[i][1]) === 0) {
                frontier.push(neighbours[i]);
                array[neighbours[i][0]][neighbours[i][1]] = i + 1;
                costGrid[neighbours[i][0]][neighbours[i][1]] = costGrid[currentCell[0]][currentCell[1]] + 1;

                if (neighbours[i][0] === target_pos[0] && neighbours[i][1] === target_pos[1])
                {
                    found = true;
                    break;
                }

                nodeList.push(neighbours[i]);
            }
    }
    while (frontier.length > 0 && !found)

    if (found)
    {
        let currentNode = target_pos;

        while (currentNode[0] !== start_pos[0] || currentNode[1] !== start_pos[1])
        {
            switch (array[currentNode[0]][currentNode[1]])  {
                case 1: currentNode = [currentNode[0], currentNode[1] + 1]; break;
                case 2: currentNode = [currentNode[0] - 1, currentNode[1]]; break;
                case 3: currentNode = [currentNode[0], currentNode[1] - 1]; break;
                case 4: currentNode = [currentNode[0] + 1, currentNode[1]]; break;
                default: break;
            }

            pathList.push(currentNode);
        }

        pathList.pop();
        pathList.reverse();
    }

    solver_interval();
}

function bidirectional_dijkstra() {
    resetAlgo();

    let currentCell;
    let startEnd;
    let targetEnd;
    let frontier = [start_pos, target_pos];
    array[target_pos[0]][target_pos[1]] = 1;
    array[start_pos[0]][start_pos[1]] = 11;

    do
    {
        currentCell = frontier[0];
        let list = getNeighbours(currentCell[0], currentCell[1], 1);
        frontier.splice(0, 1);

        for (let i = 0; i < list.length; i++) {
            if (getCellValue(list[i][0], list[i][1]) === 0) {
                frontier.push(list[i]);

                if (array[currentCell[0]][currentCell[1]] < 10) {
                    array[list[i][0]][list[i][1]] = i + 1;
                } else {
                    array[list[i][0]][list[i][1]] = 11 + i;
                }

                nodeList.push(list[i]);
            } else if (getCellValue(list[i][0], list[i][1]) > 0) {
                if (array[currentCell[0]][currentCell[1]] < 10 && getCellValue(list[i][0], list[i][1]) > 10)
                {
                    startEnd = currentCell;
                    targetEnd = list[i];
                    found = true;
                    break;
                } else if (array[currentCell[0]][currentCell[1]] > 10 && getCellValue(list[i][0], list[i][1]) < 10) {
                    startEnd = list[i];
                    targetEnd = currentCell;
                    found = true;
                    break;
                }
            }
        }
    } while (frontier.length > 0 && !found);

    if (found) {
        let targets = [target_pos, start_pos];
        let starts = [startEnd, targetEnd];

        for (let i = 0; i < starts.length; i++) {
            let current_node = starts[i];

            while (current_node[0] !== targets[i][0] || current_node[1] !== targets[i][1]) {
                pathList.push(current_node);

                switch (array[current_node[0]][current_node[1]] - (i * 10)) {
                    case 1: current_node = [current_node[0], current_node[1] + 1]; break;
                    case 2: current_node = [current_node[0] - 1, current_node[1]]; break;
                    case 3: current_node = [current_node[0], current_node[1] - 1]; break;
                    case 4: current_node = [current_node[0] + 1, current_node[1]]; break;
                    default: break;
                }
            }

            if (i === 0) {
                pathList.reverse();
            }
        }

        pathList.reverse();
    }

    solver_interval();
}

function dijkstra() {
    resetAlgo();

    let frontier = [start_pos];
    array[start_pos[0]][start_pos[1]] = 1;

    do {

        let neighbours = getNeighbours(frontier[0][0],frontier[0][1],1);
        frontier.splice(0,1);

        for (let i = 0 ; i < neighbours.length; i++) {
            if (getCellValue(neighbours[i][0], neighbours[i][1]) === 0) {
                frontier.push(neighbours[i]);
                array[neighbours[i][0]][neighbours[i][1]] = i + 1;

                if (neighbours[i][0] === target_pos[0] && neighbours[i][1] === target_pos[1]) {
                    found = true;
                    break;
                }

                nodeList.push(neighbours[i]);
            }
        }
    } while (frontier.length > 0 && !found);

    /*
    // debug function
    for (let i = 0; i < array.length ; i++) {
        for (let y = 0; y < array[0].length ; y++) {
            switch (array[i][y]) {
                case 1: current_node = get_cell_from_x_y(i,y).style.backgroundColor = "Red"; break;
                case 2: current_node = get_cell_from_x_y(i,y).style.backgroundColor = "Blue"; break;
                case 3: current_node = get_cell_from_x_y(i,y).style.backgroundColor = "Green"; break;
                case 4: current_node = get_cell_from_x_y(i,y).style.backgroundColor = "Yellow";break;
                default: get_cell_from_x_y(i,y).style.backgroundColor = "Black"
            }
        }
    }

  */

    if (found) {
        let currentNode = target_pos;
        while (currentNode[0] !== start_pos[0] || currentNode[1] !== start_pos[1]) {
            switch (array[currentNode[0]][currentNode[1]]) {
                case 1: currentNode = [currentNode[0]    , currentNode[1] + 1]; break; // Red
                case 2: currentNode = [currentNode[0] - 1, currentNode[1]    ]; break; // Blue
                case 3: currentNode = [currentNode[0]    , currentNode[1] - 1]; break; // Green
                case 4: currentNode = [currentNode[0] + 1, currentNode[1]    ]; break; // Yellow
                default: break;
            }

            pathList.push(currentNode);
        }

        console.log(pathList.pop());
        pathList.reverse();
    } else {
        // popup?
        console.log("Pas de chemin dispo")
    }


    solver_interval();
}

function solve_maze() {
    clearpaths();
    updateArray();
    grid_clean = true;

    const selected_value = selectSolve.value;

    if (selected_value === "1") {
        astar();
    } else if (selected_value === "2") {
        dijkstra();
    } else if (selected_value === "3") {
        bidirectional_dijkstra();
    }
}
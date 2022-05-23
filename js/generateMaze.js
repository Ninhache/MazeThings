"use strict";

function Kruskal() {
	fill_walls();
	let nbAreas = 0;
	let wallsList = [];

	for (let i = 1; i < array.length - 1; i++)
		for (let j = 1; j < array[0].length - 1; j++) {
			if (i % 2 == 1 && j % 2 == 1) {
				nbAreas++;
				array[i][j] = nbAreas;
				get_cell_from_x_y(i, j).classList.add("visited");
			}

			if ((i + j) % 2 == 1) {
                wallsList.push([i, j]);
            }
		}

	interval = window.setInterval(function() {
		while (true) {
			if (nbAreas == 1) {
				clearInterval(interval);
				clearVisited();
				generating = false;
				return;
			}

			let index = randomInt(0, wallsList.length -1);
			let wall = wallsList[index];
			wallsList.splice(index, 1);
			let cell_pair;

			if (array[wall[0] - 1][wall[1]] > 1) {
                cell_pair = [array[wall[0] - 1][wall[1]], array[wall[0] + 1][wall[1]]];
            }
			else {
                cell_pair = [array[wall[0]][wall[1] - 1], array[wall[0]][wall[1] + 1]];
            }

			if (cell_pair[0] != cell_pair[1]) {
				for (let i = 1; i < array.length - 1; i += 2) {
                    for (let j = 1; j < array[0].length - 1; j += 2) {
                        if (array[i][j] == cell_pair[0]) {
                            array[i][j] = cell_pair[1];
                        }
                    }
                }

				removeWall(wall[0], wall[1]);
				get_cell_from_x_y(wall[0], wall[1]).classList.add("visited");
				nbAreas--;
				return;
			}
		}
	}, 16);
}

function BinaryTree() {

    fill_walls();

    let cells = [];
    
    for (let y = 1; y < array[0].length - 0; y = y + 2) {
        for (let x = 1; x < array.length - 0; x = x + 2) {
            
            //let neighbours = getAvailailbeNeighbours(x,y,2);
            let neighbours = [];

            if (y - 1 > 0) {
                neighbours.push([x, y - 1]);
            }

            if (x - 1 > 0) {
                neighbours.push([x - 1, y]);
            }

            if (neighbours.length == 0) {
                continue;
            }
            cells.push([[x, y], neighbours]);
        }
    }

    interval = window.setInterval(function() {
        if (cells.length === 0) {
            clearInterval(interval);
            generating = false;
            clearVisited();
            return;
        } else {
            let cell = cells.shift();
            
            let currentCell = cell[0];
            let neighbours = cell[1];
            
            let random = randomInt(0, neighbours.length - 1);
            let neighbour = neighbours[random];

            connectCellsAir(currentCell, neighbour);
        }
    }, 16)
    
}

function DepthFirstSearch() {
    fill_walls();
    const stack = [[1,1]];
    removeWall(1,1);

    interval = window.setInterval(function() {
        if (stack.length == 0) {
            clearInterval(interval);
            clearVisited();
            generating = false;
            return;
        } else {
            const cell = stack.pop();
            const neighbours = getNeighboursNotVisited(cell[0], cell[1], 2);

            const randomIdx = randomInt(0, neighbours.length - 1);

            if (neighbours.length > 0) {
                for (let i = 0; i < neighbours.length; ++i) {
                    const neighbour = neighbours[i];
                    
                    putVisit(neighbour[0], neighbour[1]);
                    connectCellsAir(cell, neighbour);

                    if (i != randomIdx) {
                        stack.push(neighbour);
                    }
                }

                stack.push(neighbours[randomIdx]);
            }

        }
    }, 16);

    
}

function generate_maze() {
    
    clear_event(null);
    generating = true;

    clearInterval(interval);


    let { start_temp, target_temp } = fix_start_and_target();

    if (target_temp[0] === start_temp[0] && target_temp[1] === start_temp[1]) {
        target_temp[0] += 2;
    }

    get_cell_from_x_y(start_pos[0], start_pos[1]).classList.remove("start");
    get_cell_from_x_y(start_temp[0], start_temp[1]).classList.add("start");

    get_cell_from_x_y(target_pos[0], target_pos[1]).classList.remove("target");
    get_cell_from_x_y(target_temp[0], target_temp[1]).classList.add("target");

    start_pos = start_temp;
    target_pos = target_temp;

    grid_clean = false;
    
    const selected_value = selectGenerate.value;

    if (selected_value == "0") {
        clearInterval(interval);
    } if (selected_value === "1") {
        DepthFirstSearch();
    } else if (selected_value === "2") {
        BinaryTree();
    } else if (selected_value === "3") {
        Kruskal();
    }

}
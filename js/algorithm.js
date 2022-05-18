"use strict";

function cleararray() {
    clear_event(null);
}

function fill() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            putWall(i, j);
        }
    }
}


function fill_walls() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            if (i%2 == 0 | j%2 ==0) {
                putWall(i, j);
            }
        }
    }
}



function getNeighboursNotVisited(x,y, distance) {
    const neighbour = [];

    if ((y - distance) >= 0 && table.querySelector(`.x_${x}.y_${y - distance}.visited`) == null) {
        neighbour.push([x, y - distance]);
    }

    if ((y + distance) < array[0].length && table.querySelector(`.x_${x}.y_${y + distance}.visited`) == null) {
        neighbour.push([x, y + distance]);
    }

    if ((x - distance) >= 0 && table.querySelector(`.x_${x - distance}.y_${y}.visited`) == null) {
        neighbour.push([x - distance, y]);
    }

    if ((x + distance) < array.length && table.querySelector(`.x_${x + distance}.y_${y}.visited`) == null) {
        neighbour.push([x + distance, y]);
    }

    return neighbour;
}
/*
function getNeighboursNotVisited(x,y, distance) {
    const neighbour = [];

    if ((y - distance) >= 0 && get_visited_cell_from_x_y(x, y - distance) == null) {
        neighbour.push([x, y - distance]);
    }

    if ((y + distance) < array[0].length && get_visited_cell_from_x_y(x, y + distance) == null) {
        neighbour.push([x, y + distance]);
    }

    if ((x - distance) >= 0 && get_visited_cell_from_x_y(x - distance, y) == null) {
        neighbour.push([x - distance, y]);
    }

    if ((x + distance) < array.length && get_visited_cell_from_x_y(x + distance, y) == null) {
        neighbour.push([x + distance, y]);
    }

    return neighbour;
}*/

function getNeighbours(x,y, distance) {

    const neighbour = [];

    if ((y - distance) >= 0) {
        neighbour.push([x, y - distance]);
    }

    if ((y + distance) < array[0].length) {
        neighbour.push([x, y + distance]);
    }

    if ((x - distance) >= 0) {
        neighbour.push([x - distance, y]);
    }

    if ((x + distance) < array.length) {
        neighbour.push([x + distance, y]);
    }

    return neighbour;
}

function getAvailailbeNeighbours(x,y, distance) {
    let neighbours = getNeighbours(x,y,distance);
    let availableNeighbours = [];

    for (let i = 0; i < neighbours.length; i++) {
        let neighbour = neighbours[i];
        if (neighbour[0] > 0 && neighbour[0] < array.length && neighbour[1] > 0 && neighbour[1] < array[0].length) {
            if (array[neighbour[0]][neighbour[1]] == 0) {
                availableNeighbours.push(neighbour);
            }
        }
    }
    return availableNeighbours;
}

function enclose() {
    
    for (let i = 0; i < array.length; i++) {
        putWall(i, 0);
        putWall(i, array[0].length - 1);
    }

    for (let i = 0; i < array[0].length; i++) {
        putWall(0, i);
        putWall(array.length - 1, i);
    }

}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function connectCellsAir(cell1, cell2) {
    let x1 = cell1[0];
    let y1 = cell1[1];
    let x2 = cell2[0];
    let y2 = cell2[1];

    if (x1 == x2) {
        if (y1 < y2) {
            for (let i = y1; i <= y2; i++) {
                removeWall(x1, i);
            }
        } else {
            for (let i = y2; i <= y1; i++) {
                removeWall(x1, i);
            }
        }
    } else if (y1 == y2) {
        if (x1 < x2) {
            for (let i = x1; i <= x2; i++) {
                removeWall(i, y1);
            }
        } else {
            for (let i = x2; i <= x1; i++) {
                removeWall(i, y1);
            }
        }
    }
}


function connectCellsWall(cell1, cell2) {
    let x1 = cell1[0];
    let y1 = cell1[1];
    let x2 = cell2[0];
    let y2 = cell2[1];

    if (x1 == x2) {
        if (y1 < y2) {
            for (let i = y1; i <= y2; i++) {
                putWall(x1, i);
            }
        } else {
            for (let i = y2; i <= y1; i++) {
                putWall(x1, i);
            }
        }
    } else if (y1 == y2) {
        if (x1 < x2) {
            for (let i = x1; i <= x2; i++) {
                putWall(i, y1);
            }
        } else {
            for (let i = x2; i <= x1; i++) {
                putWall(i, y1);
            }
        }
    }
}   

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

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

			if (array[wall[0] - 1][wall[1]] > 1)
				cell_pair = [array[wall[0] - 1][wall[1]], array[wall[0] + 1][wall[1]]];
			else
				cell_pair = [array[wall[0]][wall[1] - 1], array[wall[0]][wall[1] + 1]];

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

function fix_start_and_target() {
    let start_temp = [...start_pos];
    let target_temp = [...target_pos];

    if (start_temp[0] % 2 === 0) {
        if (start_temp[0] == array[0].length - 1) {
            start_temp[0] -= 1;
        } else {
            start_temp[0] += 1;
        }
    }

    if (start_temp[1] % 2 === 0) {
        if (start_temp[1] === 0) {
            start_temp[1] += 1;
        } else {
            start_temp[1] -= 1;
        }
    }

    if (target_temp[0] % 2 === 0) {
		if (target_temp[0] === array.length - 1) {
            target_temp[0] -= 1;
        } else {
            target_temp[0] += 1;
        }
	}

	if (target_temp[1] % 2 === 0) {
		if (target_temp[1] === 0) {
            target_temp[1] += 1;
        } else {
			target_temp[1] -= 1;
        }
	}

    return { start_temp, target_temp };
}

function clearVisited() {
    table.querySelectorAll(".visited").forEach(element => element.classList.remove("visited"));
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

    const selected_value = document.querySelector("#algorithm").value;

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
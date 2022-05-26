"use strict";

function cleararray() {
    clear_event(null);
}

function fill() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            if (!get_cell_from_x_y(i, j).classList.contains("start") && !get_cell_from_x_y(i, j).classList.contains("target")) {
                putWall(i, j);
            }
        }
    }
}

function fillWalls() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            if (i % 2 === 0 || j % 2 === 0) {
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

function getNeighbours(x,y, distance) {

    const neighbour = [];

    // top
    if ((y - distance) >= 0) {
        neighbour.push([x, y - distance]);
    }

    // right
    if ((x + distance) < array.length) {
        neighbour.push([x + distance, y]);
    }

    // bot
    if ((y + distance) < array[0].length) {
        neighbour.push([x, y + distance]);
    }

    // left
    if ((x - distance) >= 0) {
        neighbour.push([x - distance, y]);
    }

    return neighbour;
}

function getAvailailbeNeighbours(x,y, distance) {
    let neighbours = getNeighbours(x,y,distance);
    let availableNeighbours = [];

    for (let i = 0; i < neighbours.length; i++) {
        let neighbour = neighbours[i];
        if (neighbour[0] > 0 && neighbour[0] < array.length && neighbour[1] > 0 && neighbour[1] < array[0].length) {
            if (array[neighbour[0]][neighbour[1]] === 0) {
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
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

function connectCellsAir(cell1, cell2) {
    let x1 = cell1[0];
    let y1 = cell1[1];
    let x2 = cell2[0];
    let y2 = cell2[1];

    if (x1 === x2) {
        if (y1 < y2) {
            for (let i = y1; i <= y2; i++) {
                removeWall(x1, i);
            }
        } else {
            for (let i = y2; i <= y1; i++) {
                removeWall(x1, i);
            }
        }
    } else if (y1 === y2) {
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

    if (x1 === x2) {
        if (y1 < y2) {
            for (let i = y1; i <= y2; i++) {
                putWall(x1, i);
            }
        } else {
            for (let i = y2; i <= y1; i++) {
                putWall(x1, i);
            }
        }
    } else if (y1 === y2) {
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

function fix_start_and_target() {
    let start_temp = [...start_pos];
    let target_temp = [...target_pos];

    if (start_temp[0] % 2 === 0) {
        if (start_temp[0] === array[0].length - 1) {
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

function clearpaths() {
    table.querySelectorAll(".shortest_path, .cell_path").forEach(element => {
        element.classList.remove("cell_path", "shortest_path");
    });    
}

function getNonColoredNeighbours(x, y, distance = 1, color = "Red") {
    let neighbours = getNeighbours(x,y,distance);

    let result = [];
    for (let i = 0 ; i < neighbours.length ; i++) {
        let htmlCell = get_cell_from_x_y(neighbours[i][0],neighbours[i][1]);
        if (!htmlCell.classList.contains("wall") && !htmlCell.classList.contains("colored")) {
            result.push(neighbours[i]);
        }
    }

    return result;
}

function updateArray() {
    for (let i = 0 ; i < array.length ; i++) {
        for (let j = 0 ; j < array[0].length ; j++) {
            if (array[i][j] > -1) {
                array[i][j] = 0;
            }
        }
    }
}

/*
function fillFrom(x,y) {
    let list = getAvailailbeNeighbours(x,y,1)

    for (let i = 0; i < list.length ; i++) {
        let htmlCell = get_cell_from_x_y(list[i][0], list[i][1]);
        htmlCell.classList.add("colored");
        htmlCell.style.backgroundColor = "Red";
    }
    if (list[0]) {
        fillFrom(list[0][0],list[0][1]);
    }
}*/


function fillFrom(x, y, color = "Red") {

    let toColor = getNonColoredNeighbours(x, y, 1);

    do {
        let cell = toColor.pop();
        if (cell !== undefined) {
            let htmlCell = get_cell_from_x_y(cell[0], cell[1]);

            htmlCell.style.backgroundColor = color;
            htmlCell.classList.add("colored");

            toColor.push(...getNonColoredNeighbours(cell[0], cell[1], 1, color));
        } else {
            break;
        }

    } while (toColor.length !== 0);
    table.querySelectorAll(".colored").forEach(item => item.classList.remove("colored"));
}


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function distance(cell1, cell2) {
    return Math.sqrt(Math.pow(cell2[0] - cell1[0], 2) + Math.pow(cell2[1] - cell1[1], 2));
}
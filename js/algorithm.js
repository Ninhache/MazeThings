function clearGrid() {
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

function connectCells(cell1, cell2) {
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

function DepthFirstSearch() {
    const stack = [[1,1]];
    removeWall(1,1);

    interval = window.setInterval(function() {
        if (stack.length == 0) {
            clearInterval(interval);
            generating = false;
            return;
        } else {
            const cell = stack.pop();
            const neighbours = getNeighboursNotVisited(cell[0], cell[1], 2);

            const randomIdx = randomInt(0, neighbours.length - 1);

            if (neighbours.length > 0) {
                for (let i = 0; i < neighbours.length; ++i) {
                    const neighbour = neighbours[i];
                    
                    visitXY(neighbour[0], neighbour[1]);
                    connectCells(cell, neighbour);

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

    generating = true;
    
    let start_temp = start_pos;
	let target_temp = target_pos;

}
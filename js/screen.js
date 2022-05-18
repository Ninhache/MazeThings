"use strict";

function update_css() {
    grid.style.width = `${(cell_size * grid_size_x)}px`;
    grid.style.height = `${(cell_size * grid_size_y)}px`;
}

function define_grid_properties() {

    let ratio = screen.clientWidth / screen.clientHeight;
    console.log("ratio :" + ratio)

    if (ratio < 1) {
        grid_size_x = initial_max_grid_size;
        grid_size_y = Math.floor(initial_max_grid_size / ratio);

        if (grid_size_y %2 ==0) {
            grid_size_y++;
        }

        cell_size = Math.floor((window.innerWidth - menu.clientWidth) / initial_max_grid_size);
    } else {
        grid_size_y = initial_max_grid_size;
        grid_size_x = Math.floor(initial_max_grid_size * ratio);

        if (grid_size_x %2 ==0) {
            grid_size_x++;
        }

        cell_size = Math.floor(window.innerHeight / initial_max_grid_size);
    }

}

function generate_grid() {
    define_grid_properties();

    table = document.createElement("table");
    table.id = "my_table";

    for (let i = 0 ; i < grid_size_y ; i++) {
        let row = document.createElement("tr");

        for (let j = 0 ; j < grid_size_x ; j++) {
            let cell = document.createElement("td");
            let className = "";
            
            if((i + j)%2 == 0) {
                className = "cell cell_1";
            } else {
                className = "cell cell_2";
            }

            className += ` x_${j} y_${i}`;
            cell.className = className;
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    grid.appendChild(table);

    array = new Array(grid_size_x).fill(0).map(() => new Array(grid_size_y).fill(0));

    start_pos = [Math.floor(grid_size_x / 8), Math.floor(grid_size_y / 8)];
    target_pos = [Math.floor((7 * grid_size_x) / 8), Math.floor((7 * grid_size_y) / 8)];

    if (start_pos[0] % 2 == 0) {
        start_pos[0] += 1;
    }

	if (start_pos[1] % 2 == 0) {
        start_pos[1] -= 1;
    }

	if (target_pos[0] % 2 == 0) {
        target_pos[0] += 1;
    }

	if (target_pos[1] % 2 == 0) {
        target_pos[1] -= 1;
    }

    get_cell_from_x_y(start_pos[0], start_pos[1]).classList.add("start");
    get_cell_from_x_y(target_pos[0], target_pos[1]).classList.add("target");

    update_css();
}


function get_x_y_from_event(event) {
    let x = Math.floor(event.layerX / cell_size);
    let y = Math.floor(event.layerY / cell_size);

    return {x:x, y:y};
}

function get_x_y_from_cell(cell) {

    let x = cell.classList.item(2).split("_")[1];
    let y = cell.classList.item(3).split("_")[1];

    return {x:parseInt(x), y:parseInt(y)};
}

function get_cell_from_x_y(x, y) {
    return table.querySelector(`.x_${x}.y_${y}`);
}

function putWall(x, y) {
    get_cell_from_x_y(x, y).classList.add("wall");
    array[x][y] = 1;
}

function putVisit(x, y) {
    get_cell_from_x_y(x, y).classList.add("visited")
}

function get_visited_cell_from_x_y(x, y, distance) {
    return table.querySelector(`.x_${x}.y_${y - distance}.visited`);	
}

function removeWall(x, y) {
    get_cell_from_x_y(x, y).classList.remove("wall");
    array[x][y] = 0;
}

function removeVisit(x, y) {
    get_cell_from_x_y(x, y).classList.remove("visited");
}

function click_event(event) {
    event.preventDefault();
    
    const cell = event.target;

    if (clicking && cell.classList.contains("cell")) {
        clearInterval(interval);
    
        const {x, y} = get_x_y_from_cell(cell);
        console.log(`x: ${x}, y: ${y}`);
        
        if (movingStart && !cell.classList.contains("target")) {
            start_pos = [x, y];
            
            if (array[x][y] != 1) {
                table.querySelector(".start").classList.remove("start");
                cell.classList.add("start");
            }

            
        } else if (movingTarget && !cell.classList.contains("start")) {
            target_pos = [x, y];
            
            if (array[x][y] != 1) {
                table.querySelector(".target").classList.remove("target");
                cell.classList.add("target");
            }

            
        } else {
            
            if (array[x][y] == 1 && !cell.classList.contains("target") && !cell.classList.contains("start")) {
                removeWall(x, y);
            } else if (array[x][y] == 0 && !cell.classList.contains("target") && !cell.classList.contains("start")) {
                putWall(x, y);
            }
        }


        if (generating) {
            select.value = "0";
        }

        generating = false;
        
    }

}

function cancel_click_event(event) {
    event.preventDefault();

    clicking = false;
    movingStart = false;
    movingTarget = false;
}



function setupListeners() {

    screen.addEventListener('mousedown', event => {
        event.preventDefault();
        
        const cellClassList = event.target.classList;

        if (cellClassList.contains("start")) {
            movingStart = true;
        } else if (cellClassList.contains("target")) {
            movingTarget = true;
        }

        clicking = true;

        click_event(event);
    });
    screen.addEventListener('mouseover', event => {
        click_event(event);
    });

    screen.addEventListener('mouseleave', event => {
        cancel_click_event(event);
    });
    screen.addEventListener('mouseup', event => {
        cancel_click_event(event);
    });
}

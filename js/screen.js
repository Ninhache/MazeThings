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

        cell_size = Math.floor((window.innerWidth - menu.clientWidth) / initial_max_grid_size);
    } else {
        grid_size_y = initial_max_grid_size;
        grid_size_x = Math.floor(initial_max_grid_size * ratio);

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

    update_css();
}


function get_x_y_from_event(event) {
    let x = Math.floor(event.layerX / cell_size);
    let y = Math.floor(event.layerY / cell_size);

    return {x, y};
}

function get_x_y_from_cell(cell) {

    let x = cell.classList.item(2).split("_")[1];
    let y = cell.classList.item(3).split("_")[1];

    return {x, y};
}

function get_cell_from_x_y(x, y) {
    return document.querySelector(`.x_${x}.y_${y}`);
}

function putWall(x, y) {
    const cell = document.querySelector(`.x_${x}.y_${y}`);
    array[x][y] = 1;
    cell.classList.add("wall");
}

function visitXY(x, y) {
    const cell = document.querySelector(`.x_${x}.y_${y}`);
    cell.classList.add("visited");
}

function removeWall(x, y) {
    const cell = document.querySelector(`.x_${x}.y_${y}`);
    array[x][y] = 0;
    cell.classList.remove("wall");
}

function removeVisit(x, y) {
    const cell = document.querySelector(`.x_${x}.y_${y}`);
    cell.classList.remove("visited");
}

function click_event(event) {
    event.preventDefault();
    
    const cell = event.target;

    if (clicking && cell.classList.contains("cell")) {
    
        const {x, y} = get_x_y_from_cell(cell);
        console.log(`x: ${x}, y: ${y}`);
        
        if (array[x][y] == 0) {
            array[x][y] = 1;
            cell.classList.add("wall");
        } else {
            array[x][y] = 0;
            cell.classList.remove("wall");
        }
    }

}

function cancel_click_event(event) {
    event.preventDefault();

    clicking = false;
}



function setupListeners() {

    screen.addEventListener('mousedown', event => {
        event.preventDefault();

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

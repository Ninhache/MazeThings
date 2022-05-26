"use strict";



function clear_event(event) {
    event?.preventDefault();
    clearInterval(interval);
    resetAlgo();
    grid_clean = false;
    if (!grid_clean) {
        
        for (let i = 0 ; i < array.length ; i++) {
            for (let j = 0 ; j < array[0].length ; j++) {
                
                if (array[i][j] >= -1) {
                    removeWall(i, j);
                    const htmlElement = get_cell_from_x_y(i, j);
                    htmlElement.classList.remove("cell_path");
                    htmlElement.classList.remove("shortest_path");
                    htmlElement.style.backgroundColor = "";

                }

                removeVisit(i,j);

            }
        }

        grid_clean = true;
    }
}

function submit_event(event) {
    event.preventDefault();

    solve_maze();
}

function change_event(event) {
    event.preventDefault();
    generate_maze();
}

function setupMenu() {
    
    menu.querySelector(".clear").addEventListener("click", clear_event);

    selectGenerate.addEventListener("change", change_event);

    submit.addEventListener("click", submit_event);
}
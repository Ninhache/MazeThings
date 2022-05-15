

function clear_event(event) {
    grid_clean = false;
    if (!grid_clean) {
        
        for (let i = 0 ; i < array.length ; i++) {
            for (let j = 0 ; j < array[0].length ; j++) {
                
                if (array[i][j] == 1) {
                    removeWall(i, j);
                }

                removeVisit(i,j);

            }
        }

        grid_clean = true;
    }
}

function setupMenu() {
    menu.querySelector(".clear").addEventListener("click", clear_event);
}
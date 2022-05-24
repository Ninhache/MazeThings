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
            if (nodeListIndex == nodeList.length) {
                if (found) {
                    path = true;
                    get_cell_from_x_y(start_pos[0], start_pos[1]).classList.add("shortest_path");
                } else {
                    clearInterval(interval);
                }
            }
        } else {
            if (pathList === PathListIndex) {
                get_cell_from_x_y(target_pos[0], target_pos[1]).classList.add("shortest_path");
                clearInterval(interval);
                return;
            }

            get_cell_from_x_y(pathList[pathListIndex][0], pathList[pathListIndex][1]).classList.remove("cell_path");
            get_cell_from_x_y(pathList[pathListIndex][0], pathList[pathListIndex][1]).classList.add("shortest_path");
            pathListIndex++;
        }
    }, 10);
}

function astar() {
    resetAlgo();
    

    solver_interval();
}

function dijkstra() {
    resetAlgo();

    solver_interval();
}

function solve_maze() {
    clearpaths();
    grid_clean = true;

    const selected_value = selectSolve.value;

    if (selected_value === "1") {
        astar();
    } else if (selected_value === "2") {
        dijkstra();
    }
}
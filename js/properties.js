"use strict";

let initial_max_grid_size = 15;
const max_grid_size = 51;
const min_grid_size = 7;

let menu;
let screen;
let grid;
let table;
let selectGenerate, selectSolve;
let submit;

// grid
let cell_size;
let grid_size_x, grid_size_y;
let start_pos, target_pos;
let array;

// solve 
let nodeListIndex;
let nodeList;
let pathList;
let pathListIndex;
let found = false;
let path = false;

let grid_clean = true;
let clicking = false;
let generating = false;
let movingStart = false;
let movingTarget = false;

let interval;

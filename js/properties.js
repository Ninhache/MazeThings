"use strict";

const initial_max_grid_size = 33;

let menu;
let screen;
let grid;
let table;
let select;

let cell_size;
let grid_size_x, grid_size_y;
let start_pos, target_pos;
let array;

let grid_clean = true;
let clicking = false;
let generating = false;
let movingStart = false;
let movingTarget = false;

let interval;
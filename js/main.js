"use strict";


function define_html_elements() {
    menu = document.querySelector(".menu");
    screen = document.querySelector(".screen");
    grid = document.querySelector(".grid");
    selectGenerate = menu.querySelector("#algorithmGenerate")
    selectSolve = menu.querySelector("#algorithmSolve")
    submit = menu.querySelector(".submit");
}

window.onload = () => {
    define_html_elements();

    screen.style.width = `${document.documentElement.clientWidth - menu.clientWidth}px`;
    setupListeners();
    generate_grid();
    setupMenu();
    setupSelect();
}
"use strict"

function setupModal() {

    const modal = document.querySelector(".modal-container");
    modal.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("modal-container")) {
            modal.hidden = true;
        }
    });

    modal.querySelector(".closeButton").addEventListener("click", (e) => {
        e.preventDefault();
        modal.hidden = true;
    })

    const settingsButton = document.querySelector(".menu .settings .gear");
    settingsButton.addEventListener("click", (e) => {
        e.preventDefault();
        modal.hidden = false;
    });

    //initial_max_grid_size
    const inputGridSize = document.querySelector("#initial_max_grid_size");
    inputGridSize.value = initial_max_grid_size;
    console.log(inputGridSize);
    // make inputGridSize can't take letters and negative numbers
    inputGridSize.addEventListener("keydown", (e) => {
        e.preventDefault();
        // check if the key is a number
        if (e.key.match(/[0-9]/)) {
            inputGridSize.value += e.key;
        }

        // check if the key is a backspace
        if (e.key === "Backspace") {
            inputGridSize.value = inputGridSize.value.slice(0, -1);
        }

        // check if the key is a delete
        if (e.key === "Delete") {
            inputGridSize.value = inputGridSize.value.slice(1);
        }

        if (inputGridSize.value.length === 0) {
            inputGridSize.value = min_grid_size;
        }

        inputGridSize.value = Math.min(Math.max(inputGridSize.value, min_grid_size), max_grid_size);

    });
    

    inputGridSize.addEventListener("change", (e) => {
        console.log(e);
    });

}
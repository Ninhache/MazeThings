"use strict"

function setupModal() {
    const modal = document.querySelector(".modal-container");
    modal.addEventListener("click", (e) => {
        event.preventDefault();
        modal.hidden = true;
    });
    modal.querySelector(".closeButton").addEventListener("click", (event) => {
        event.preventDefault();
        modal.hidden = true;
    })

    const settingsButton = document.querySelector(".menu .settings .gear");
    settingsButton.addEventListener("click", (event) => {
        event.preventDefault();
        modal.hidden = false;
    });


}
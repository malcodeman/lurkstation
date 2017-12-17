"use strict"
const axios = require("axios");
const {
    remote
} = require('electron')

function addImage(source) {
    let image = document.createElement("div");
    image.style.backgroundImage = "url(" + source + ")";
    image.classList.add("image");
    document.getElementById("main").appendChild(image);
}

function clearMain() {
    document.getElementById("main").innerHTML = "";
}

function getPosts(choice) {
    clearMain();
    axios.get("https://www.reddit.com/r/art+food/" + choice + ".json?limit=25")
        .then(response => {
            for (let i = 0; i < response.data.data.children.length; ++i) {
                let url = response.data.data.children[i].data.url;
                console.log(i + "  -  " + url);
                addImage(url);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function main() {
    document.getElementById("hot").addEventListener("click", () => {
        getPosts("hot");
    });
    document.getElementById("new").addEventListener("click", () => {
        getPosts("new");
    });
    document.getElementById("top").addEventListener("click", () => {
        getPosts("top");
    });
    document.getElementById("minimize").addEventListener("click", minimizeWindow);
    document.getElementById("maximize").addEventListener("click", maximizeWindow);
    document.getElementById("close").addEventListener("click", closeWindow);
}

function minimizeWindow() {
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximizeWindow() {
    remote.BrowserWindow.getFocusedWindow().maximize();
}

function closeWindow() {
    remote.BrowserWindow.getFocusedWindow().close();
}

main();
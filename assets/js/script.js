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
    return axios.get("https://www.reddit.com/r/art/" + choice + ".json?limit=10")
        .then(response => {
            return response.data.data;
        })
}

function main() {
    document.getElementById("hot").addEventListener("click", () => {
        renderPosts(getPosts("hot"));
    });
    document.getElementById("new").addEventListener("click", () => {
        renderPosts(getPosts("new"));
    });
    document.getElementById("top").addEventListener("click", () => {
        renderPosts(getPosts("top"));
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

function renderPosts(promise) {
    clearMain();
    promise.then(response => {
        for (let i = 0; i < response.children.length; ++i) {
            let url = response.children[i].data.url;
            if (response.children[i].data.domain === "imgur.com") {
                url += ".jpg";
            }
            if (response.children[i].data.thumbnail !== "self") {
                addImage(url);
            }
        }
    })
}

main();
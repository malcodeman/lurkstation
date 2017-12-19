"use strict"
const axios = require("axios");
const {
    remote
} = require('electron')

function renderImage(source) {
    let post = document.createElement("div");
    post.classList.add("post");
    let image = document.createElement("img");
    image.src = source;
    image.classList.add("image");
    post.appendChild(image);
    document.getElementById("main").appendChild(post);
}

function renderVideo(source) {
    let post = document.createElement("div");
    post.classList.add("post");
    let video = document.createElement("video");
    video.src = source;
    video.loop = "loop";
    video.classList.add("video");
    video.addEventListener("canplay", onCanPlay);
    post.appendChild(video);
    document.getElementById("main").appendChild(post);
}

function playVideo() {
    this.play();
}

function pauseVideo() {
    this.pause();
}

function onCanPlay() {
    this.addEventListener("mouseover", playVideo);
    this.addEventListener("mouseout", pauseVideo);
}

function clearMain() {
    document.getElementById("main").innerHTML = "";
}

function getPosts(choice) {
    return axios.get("https://www.reddit.com/r/pics/" + choice + ".json?limit=20")
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

function getExtension(filename) {
    return filename.split('.').pop();
}

function renderPosts(promise) {
    clearMain();
    promise.then(response => {
        for (let i = 0; i < response.children.length; ++i) {
            let render = true;
            let url = response.children[i].data.url;
            if (response.children[i].data.domain === "imgur.com") {
                url += ".jpg";
            }
            let extension = getExtension(url);
            if (extension !== "png" && extension !== "jpg") {
                render = false;
            }
            if (response.children[i].data.domain === "flickr.com") {
                render = false;
            }
            if (response.children[i].data.domain === "gfycat.com") {
                // Adds 'giant' before and '.webm' after link
                let temp = url;
                temp = temp.substr(0, 8) + "giant." + temp.substr(8) + ".webm";
                renderVideo(temp);
                render = false;
            }
            if (response.children[i].data.is_video === true) {
                render = false;
            }
            if (response.children[i].data.thumbnail === "self") {
                render = false;
            }
            if (render) {
                renderImage(url);
            } else {
                console.log("Error - " + url);
            }
        }
    })
}

main();
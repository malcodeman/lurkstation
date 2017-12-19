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

// Render checkers


function checkIfDirectLink(url) {
    let extension = getExtension(url);
    if (extension === "png" || extension === "jpg") {
        return true;
    }
    return false;
}

function checkIfIndirectImgurLink(domain) {
    if (domain === "imgur.com") {
        return true;
    }
    return false;
}

function checkIfGfycat(domain) {
    if (domain === "gfycat.com") {
        return true;
    }
    return false;
}

function checkIfGifv(url) {
    let extension = getExtension(url);
    if (extension === "gifv") {
        return true;
    }
    return false;
}

function checkIfDirectArtstationLink(domain) {
    if (domain === "cdnb.artstation.com") {
        return true;
    }
    return false;
}

// Render formats

function formatForImgur(url) {
    return url += ".jpg";
}

function formatForGfycat(url) {
    // Adds 'giant' before and '.webm' after link
    return url = url.substr(0, 8) + "giant." + url.substr(8) + ".webm";
}

function formatForGifv(url) {
    // Replaces '.gifv' extension with '.mp4'
    url = url.substr(0, url.lastIndexOf('.'));
    return url += ".mp4";
}

function renderPosts(promise) {
    clearMain();
    promise.then(response => {
            for (let i = 0; i < response.children.length; ++i) {
                let url = response.children[i].data.url;
                let domain = response.children[i].data.domain;
                if (checkIfDirectLink(url)) {
                    renderImage(url);
                } else if (checkIfIndirectImgurLink(domain)) {
                    renderImage(formatForImgur(url));
                } else if (checkIfGfycat(domain)) {
                    renderVideo(formatForGfycat(url));
                } else if (checkIfGifv(url)) {
                    renderVideo(formatForGifv(url));
                } else if (checkIfDirectArtstationLink(domain)) {
                    renderImage(url);
                } else {
                    console.log("Error - " + url);
                }
            }
        })
        .catch(error => {
            console.log(error.message);
        })
}

main();
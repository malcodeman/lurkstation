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

function changeTitle(newTitle) {
    document.getElementById("title").textContent = newTitle;
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
        changeTitle("hot");
    });
    document.getElementById("new").addEventListener("click", () => {
        renderPosts(getPosts("new"));
        changeTitle("new");
    });
    document.getElementById("top").addEventListener("click", () => {
        renderPosts(getPosts("top"));
        changeTitle("top");
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

// Getters

function getExtension(url) {
    return url.split('.').pop();
}

function getGfycatId(url) {
    return url.split("/").pop();
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
    if (domain === "gfycat.com" || domain === "giant.gfycat.com") {
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
    let id = getGfycatId(url);
    return axios.get("https://gfycat.com/cajax/get/" + id)
        .then(response => {
            return response.data.gfyItem.mp4Url;
        })
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
                let isVideo = response.children[i].data.is_video;
                if (checkIfDirectLink(url)) {
                    renderImage(url);
                } else if (checkIfIndirectImgurLink(domain)) {
                    renderImage(formatForImgur(url));
                } else if (checkIfGfycat(domain)) {
                    let gfycatPromise = formatForGfycat(url);
                    gfycatPromise.then(response => {
                        renderVideo(response);
                    })
                } else if (checkIfGifv(url)) {
                    renderVideo(formatForGifv(url));
                } else if (checkIfDirectArtstationLink(domain)) {
                    renderImage(url);
                } else if (isVideo) {
                    renderVideo(response.children[i].data.media.reddit_video.fallback_url);
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
"use strict"
const axios = require("axios");

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
    return axios.get("https://www.reddit.com/r/pics/" + choice + ".json?limit=25")
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
    document.getElementById("settings").addEventListener("click", () => {
        renderSettings();
        changeTitle("settings");
    });
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
    if (extension === "png" || extension === "jpg" || extension === "jpeg") {
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
    if (domain === "cdna.artstation.com" || domain === "cdnb.artstation.com") {
        return true;
    }
    return false;
}

function checkIfImgurAlbum(url) {
    // Get string before slash
    let beforeSlash = url.substr(url.lastIndexOf("/") - 1);
    // If first character before slash equals letter 'a' then imgur link is album
    if (beforeSlash.charAt(0) === "a" || beforeSlash.charAt(0) === "y") {
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

function checkIfGif(url) {
    let extension = getExtension(url);
    if (extension === "gif") {
        return true;
    }
    return false;
}

function renderPosts(promise) {
    clearMain();
    promise.then(response => {
            for (let i = 0; i < response.children.length; ++i) {
                let url = response.children[i].data.url;
                let domain = response.children[i].data.domain;
                let isVideo = response.children[i].data.is_video;
                if (isVideo) {
                    console.log(i + " Reddit video - " + url);
                    renderVideo(response.children[i].data.media.reddit_video.fallback_url);
                } else if (checkIfDirectLink(url)) {
                    console.log(i + " Direct link - " + url);
                    renderImage(url);
                } else if (checkIfIndirectImgurLink(domain) && !checkIfGif(url) && !checkIfImgurAlbum(url)) {
                    console.log(i + " Indirect imgur link - " + url);
                    renderImage(formatForImgur(url));
                } else if (checkIfGfycat(domain)) {
                    let gfycatPromise = formatForGfycat(url);
                    gfycatPromise.then(response => {
                        console.log(i + " Gfycat link - " + url);
                        renderVideo(response);
                    })
                } else if (checkIfGifv(url)) {
                    console.log(i + " Gifv video - " + url);
                    renderVideo(formatForGifv(url));
                } else if (checkIfDirectArtstationLink(domain)) {
                    console.log(i + " Artstation link - " + url);
                    renderImage(url);
                } else {
                    console.log(i + " Error - " + url)
                }
            }
        })
        .catch(error => {
            console.log(error.message);
        })
}

main();
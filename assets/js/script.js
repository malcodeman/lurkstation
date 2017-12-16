"use strict"
const axios = require("axios");

function addImage(source) {
    let image = document.createElement("div");
    image.style.backgroundImage = "url(" + source + ")";
    image.classList.add("image");
    document.getElementById("main").appendChild(image);
}

function getPosts() {
    axios.get("https://www.reddit.com/r/art/new.json?limit=25")
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

getPosts();
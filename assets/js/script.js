const axios = require("axios");

function getPosts() {
    axios.get("https://www.reddit.com/r/cats/top.json?limit=100")
        .then(response => {
            for (let i = 0; i < response.data.data.children.length; ++i) {
                console.log(i + "  -  " + response.data.data.children[i].data.title);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

getPosts();
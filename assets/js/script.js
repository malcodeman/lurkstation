const axios = require("axios");

axios.get("https://www.reddit.com/r/Cyberpunk.json")
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
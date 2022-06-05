import axios from "./instance";

async function getSubs() {
  return await axios.get("/subs/art/hot");
}

const queries = {
  getSubs,
};

export default queries;

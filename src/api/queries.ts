import axios from "./instance";

async function getSubs(data: { sub: string; sort: string }) {
  const { sub, sort } = data;
  return await axios.get(`/subs/${sub}/${sort}`);
}

const queries = {
  getSubs,
};

export default queries;

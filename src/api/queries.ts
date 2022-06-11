import axios from "./instance";

async function getSubs(data: { sub: string; sort: string; time: string }) {
  const { sub, sort, time } = data;
  return await axios.get(`/subs/${sub}/${sort}`, { params: { time } });
}

const queries = {
  getSubs,
};

export default queries;

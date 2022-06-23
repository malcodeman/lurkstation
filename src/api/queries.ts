import axios from "./instance";

async function getSubs(data: {
  pageParam?: {
    sub: string;
    sort: string;
    time: string | null;
    after: string | null;
  };
}) {
  const { pageParam = { sub: "art", sort: "hot", time: null, after: null } } =
    data;
  return await axios.get(`/subs/${pageParam.sub}/${pageParam.sort}`, {
    params: { time: pageParam.time, after: pageParam.after },
  });
}

async function getPost(id: string) {
  return await axios.get(`/posts/${id}`);
}

const queries = {
  getSubs,
  getPost,
};

export default queries;

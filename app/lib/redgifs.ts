import { REDGIFS_API } from "./constants";

export const getTemporaryToken = async () => {
  try {
    const response = await fetch(`${REDGIFS_API}/v2/auth/temporary`);
    const data: { token: string; addr: string; agent: string; rtfm: string } =
      await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

export const getInfo = async () => {
  try {
    const response = await fetch(`${REDGIFS_API}/info`);
    const data: {
      "remote-addr": string;
      "user-agent": string;
      env: string;
      stage: string;
    } = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

export const getGif = async (id: string) => {
  try {
    const token = await getTemporaryToken();
    const response = await fetch(`${REDGIFS_API}/v2/gifs/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });
    const data: {
      gif: {
        urls: { hd: string };
      };
    } = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

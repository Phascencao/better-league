import axios from "axios";

const API_URL = "http://localhost:3333";

export async function searchSummoner(riotId) {
  const [name, tag] = riotId.split("#");

  const { data } = await axios.get(`${API_URL}/summoners/echo`, {
    params: { name, tag },
  });

  return data;
}

import { ADMIN_URL } from "./config";

export const getDatas = async (data, query) => {
  const url = `${ADMIN_URL}/${data}?${new URLSearchParams(query)}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json();
}
import { MEMBER_URL, TOKEN } from "./config";

export const getDatas = async (data, query) => {
  let url;
  if (query.search === '') {
    url = `${MEMBER_URL}/${data}`;
  } else {
    url = `${MEMBER_URL}/${data}?${new URLSearchParams(query)}`;
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}

export const getDatasUser = async (data, query) => {
  let url;
  if (query.search === '') {
    url = `${MEMBER_URL}/user/${data}`;
  } else {
    url = `${MEMBER_URL}/user/${data}?${new URLSearchParams(query)}`;
  }
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}
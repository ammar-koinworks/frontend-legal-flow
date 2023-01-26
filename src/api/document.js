import { MEMBER_URL, TOKEN } from "./config";

export const documentStore = async (data) => {
  const response = await fetch(`${MEMBER_URL}/document-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}

export const documents = async (query) => {
  const response = await fetch(`${MEMBER_URL}/document-request?${new URLSearchParams(query)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    }
  })

  return await response.json();
}

export const document = async (id) => {
  const response = await fetch(`${MEMBER_URL}/document-request/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    }
  })

  return await response.json();
}
import { MEMBER_URL, TOKEN } from "./config";

export const opinionStore = async (data) => {
  const response = await fetch(`${MEMBER_URL}/opinion-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}

export const opinions = async (query) => {
  const response = await fetch(`${MEMBER_URL}/opinion-request?${new URLSearchParams(query)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    }
  })

  return await response.json();
}

export const opinion = async (id) => {
  const response = await fetch(`${MEMBER_URL}/opinion-request/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    }
  })

  return await response.json();
}

export const opinionUpdate = async (id, data) => {
  const response = await fetch(`${MEMBER_URL}/opinion-request/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}

export const opinionFinish = async (id) => {
  const response = await fetch(`${MEMBER_URL}/opinion-request/finish/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}

export const opinionDelete = async (id) => {
  const response = await fetch(`${MEMBER_URL}/opinion-request/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}
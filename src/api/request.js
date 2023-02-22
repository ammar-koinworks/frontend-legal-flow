import { MEMBER_URL, TOKEN } from "./config";

export const requestStore = async (data) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}

export const requests = async (query) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request?${new URLSearchParams(query)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}

export const requestsAdmin = async (query) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request/admin-approval?${new URLSearchParams(query)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}

export const requestsManager = async (query) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request/legal-manager-approval?${new URLSearchParams(query)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}

export const requestsDirectLine = async (query) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request/dl-approval?${new URLSearchParams(query)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}

export const requestsCLO = async (query) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request/clo-approval?${new URLSearchParams(query)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}

export const requestsPIC = async (query) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request/related-pic-approval?${new URLSearchParams(query)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}

export const request = async (id) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    }
  })

  return await response.json();
}

export const requestUpdate = async (id, data) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}

export const requestApprovePIC = async (id, data) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request/related-pic-approval/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}

export const requestDelete = async (id) => {
  const response = await fetch(`${MEMBER_URL}/agreement-request/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  })

  return await response.json();
}


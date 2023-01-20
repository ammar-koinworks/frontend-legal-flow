import { ADMIN_URL, BASE_URL, TOKEN } from "./config";

export const login = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}

export const getUser = async () => {
  const response = await fetch(`${ADMIN_URL}/admin/get-info`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN,
    },
  })

  return await response.json();
}

export const register = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}

export const forgotPassword = async (data) => {
  const response = await fetch(`${ADMIN_URL}/admin/request-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}

export const newPassword = async (data) => {
  const response = await fetch(`${ADMIN_URL}/admin/new-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json();
}
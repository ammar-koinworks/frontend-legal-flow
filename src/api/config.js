export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const ADMIN_URL = BASE_URL + process.env.NEXT_PUBLIC_API_ADMIN_URL
export const MEMBER_URL = BASE_URL + process.env.NEXT_PUBLIC_API_MEMBER_URL
export const TOKEN = () => 'Bearer ' + globalThis.sessionStorage?.getItem('token');
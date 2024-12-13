const baseUrl: string = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000/api'
  : 'https://programming-quotes-api.azurewebsites.net/api';

const getHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;

  return headers
}

const GET = (route: string, options?: object) => fetch(`${baseUrl}/${route}`, options)

const POST = (route: string, body: object) => fetch(`${baseUrl}/${route}`, {
  method: 'POST',
  headers: getHeaders(),
  body: JSON.stringify(body),
})

const PUT = (route: string, body: object) => fetch(`${baseUrl}/${route}`, {
  method: 'PUT',
  headers: getHeaders(),
  body: JSON.stringify(body),
})

const DELETE = (route: string) => fetch(`${baseUrl}/${route}`, {
  method: 'DELETE',
  headers: getHeaders(),
})

export default {
  GET,
  POST,
  PUT,
  DELETE,
}
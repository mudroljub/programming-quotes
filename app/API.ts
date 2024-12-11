const baseUrl: string = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000/api'
  : 'https://programming-quotes-api.azurewebsites.net/api';

const GET = (route: string, options?: object) => fetch(`${baseUrl}/${route}`, options)

const POST = (route: string, body: object) => fetch(`${baseUrl}/${route}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

export default {
  GET,
  POST,
}
const baseUrl: string = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000/api'
  : 'https://programming-quotes-api.azurewebsites.net/api';

console.log(process.env.NODE_ENV);

const GET = (route: string, options?: object) => fetch(`${baseUrl}/${route}`, options);

export default {
  GET,
};
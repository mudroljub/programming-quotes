const baseUrl: string = 'https://programming-quotes-api.azurewebsites.net/api';

const GET = (route: string, options?: object) => fetch(`${baseUrl}/${route}`, options);

export default {
  GET,
};
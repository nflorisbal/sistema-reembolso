import axios from 'axios';

export default axios.create({
  baseURL: 'https://refund-sistem-dbc-api.herokuapp.com/',
})
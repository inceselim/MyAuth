import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.5.250:5200/api',
  headers: {
    'Content-type': 'application/json',
  },
});

import axios from '../axios';

const getAll = () => {
  return axios.get('/tutorials');
};

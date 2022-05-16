import Axios from 'axios';
import env from 'react-dotenv';

export const getAllProducts = async () => {
  await Axios.get(`${env.API_URL}/product/getAllProducts`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const getAProduct = async (id) => {
  await Axios.get(`${env.API_URL}/product/getAProduct/${id}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

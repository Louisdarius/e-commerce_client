import Axios from 'axios';
import env from 'react-dotenv';
import { storeUser } from './LocalStorageActions';

export const Register = async (user) => {
  await Axios.post(`${env.API_URL}/user/register`, user)
    .then((res) => storeUser(res.data))
    .catch((e) => console.log(e));
};
export const Login = async (email, password) => {
  await Axios.post(`${env.API_URL}/user/login`, { email, password })
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
};

export const DeleteAccount = async () => {
  // await Axios.patch(`${env.API_URL}/user/updateUser`, user, { headers: headers })
  await Axios.delete(`${env.API_URL}/user/deleteUser`)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
};

export const EditUserInfo = async (user) => {
  await Axios.patch(`${env.API_URL}/user/updateUser`, user)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
};

export const SignUserOut = async () => {
  await Axios.post(`${env.API_URL}/user/logout`)
    .then((res) => {
      console.log(res.data);
      window.location.reload();
    })
    .catch((e) => console.log(e));
};

import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.2.101:3333'
  //baseURL: 'http://localhost:3333'
});
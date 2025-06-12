import axios from "axios";

const url = "https://mini-erp-y8nj.onrender.com/transacao";

export const getTransacao = () => axios.get(url);
export const criarTransacao = (data) => axios.post(url, data);
export const atualizarTransacao = (id, data) => axios.put(`${url}/${id}`, data);
export const deletarTransacao = (id) => axios.delete(`${url}/${id}`);
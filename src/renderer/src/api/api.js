/* eslint-disable prettier/prettier */
import axios from "axios";

const createTree = async () => {
  return axios.get("http://localhost:5000/api/tree");
};

const iterateTree = async () => {
  return axios.get("http://localhost:5000/api/tree/iterate");
};

export default { createTree, iterateTree };

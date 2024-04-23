import axios from "axios";

const createTree = async () => {
  return axios.get("http://localhost:5000/api/tree");
};

const iterateTree = async (iterations) => {
  return axios.post("http://localhost:5000/api/tree/iterate", { data: iterations });
};

export default { createTree, iterateTree };

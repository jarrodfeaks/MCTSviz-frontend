import axios from "axios";

const createTree = async (seed) => {
  return axios.post("http://localhost:5000/api/tree", { seed: seed });
};

const iterateTree = async (iterations, constant) => {
  return axios.post("http://localhost:5000/api/tree/iterate", { iterations: iterations, constant: constant });
};

export default { createTree, iterateTree };

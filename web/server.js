import axios from "axios";

export const server = axios.create({
    baseURL: "http://localhost:3333", // Mudar de acordo com o local q ele esta rodando
});
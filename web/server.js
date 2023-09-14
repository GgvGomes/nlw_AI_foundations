import axios from "axios";

const baseURL = window.location.href.replace(window.location.port, "3333");

export const server = axios.create({
    baseURL, // Mudar de acordo com o local q ele esta rodando
    // baseURL: "http://localhost:3333", 
});
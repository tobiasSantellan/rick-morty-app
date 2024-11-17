import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character";

export const getCharacters = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results; // Retorna los personajes de la respuesta
  } catch (error) {
    console.error("Error fetching characters:", error);
    return []; // En caso de error, retornamos un arreglo vacío
  }
};

export const getCharacterDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Retorna los detalles del personaje
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw new Error("No se pudieron cargar los detalles del personaje.");
  }
};

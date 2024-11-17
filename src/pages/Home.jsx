import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCharacters } from "../services/api"; // Función para obtener datos desde la API

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  // Función para sincronizar datos de la API y localStorage
  const syncCharacters = async () => {
    try {
      const apiCharacters = await getCharacters(); // Llamar a la API
      const localCharacters =
        JSON.parse(localStorage.getItem("characters")) || [];

      // Añadir el campo 'fromApi' a los personajes de la API
      const apiCharactersWithSource = apiCharacters.map((character) => ({
        ...character,
        fromApi: true, // Campo que indica que el personaje proviene de la API
      }));

      // Combinar y evitar duplicados
      const combinedCharacters = [
        ...localCharacters,
        ...apiCharactersWithSource,
      ];
      const uniqueCharacters = Array.from(
        new Map(combinedCharacters.map((char) => [char.id, char])).values()
      );

      setCharacters(uniqueCharacters);
      setFilteredCharacters(uniqueCharacters);
    } catch (error) {
      console.error("Error al sincronizar personajes:", error);
    }
  };

  // Obtengo datos al cargar el componente
  useEffect(() => {
    syncCharacters();
  }, []);

  // Actualizo lista filtrada según el término de búsqueda
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCharacters(characters);
    } else {
      setFilteredCharacters(
        characters.filter((character) =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, characters]);

  // Eliminar personaje solo si está en localStorage
  const handleDelete = (id) => {
    const localCharacters =
      JSON.parse(localStorage.getItem("characters")) || [];
    // Solo eliminar si el personaje está en localStorage
    const updatedCharacters = localCharacters.filter(
      (character) => character.id !== id
    );
    // Actualizar en localStorage
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));

    // Actualizar el estado
    const updatedFilteredCharacters = filteredCharacters.filter(
      (character) => character.id !== id
    );
    setFilteredCharacters(updatedFilteredCharacters);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Personajes de Rick and Morty
      </h1>

      {/* Botón para crear personaje */}
      <div className="text-center mb-6">
        <Link
          to="/create"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition ease-in-out duration-300"
        >
          Crear Nuevo Personaje
        </Link>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Lista de personajes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <img
              src={character.image || "https://via.placeholder.com/150"}
              alt={character.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              {character.name}
            </h2>
            <p className="text-sm text-gray-500">
              {character.species || "Desconocido"}
            </p>
            <div className="mt-4 flex justify-between items-center">
              {/* Mostrar 'Ver más detalles' solo si el personaje proviene de la API */}
              {character.fromApi && (
                <Link
                  to={`/character/${character.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  Ver más detalles
                </Link>
              )}
              {/* Editar solo personajes locales */}
              {localStorage.getItem("characters") &&
              JSON.parse(localStorage.getItem("characters")).some(
                (char) => char.id === character.id
              ) ? (
                <Link
                  to={`/edit/${character.id}`}
                  className="text-green-500 hover:underline"
                >
                  Editar
                </Link>
              ) : null}
              {/* Eliminar solo personajes locales */}
              {localStorage.getItem("characters") &&
              JSON.parse(localStorage.getItem("characters")).some(
                (char) => char.id === character.id
              ) ? (
                <button
                  onClick={() => handleDelete(character.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterDetails } from "../services/api"; // Importo la funcion de la API

const CharacterDetail = () => {
  const { id } = useParams(); // Obtengo el ID del personaje desde la URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const characterData = await getCharacterDetails(id); // Obtengo los detalles del personaje usando el servicio
        setCharacter(characterData);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center p-6 bg-gray-50 min-h-screen">
      {character && (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {character.name}
            </h2>
            <img
              src={character.image}
              alt={character.name}
              className="w-64 h-64 rounded-full object-cover shadow-lg mb-6"
            />
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong className="text-blue-500">Especie:</strong>{" "}
                {character.species}
              </p>
              <p>
                <strong className="text-blue-500">Género:</strong>{" "}
                {character.gender}
              </p>
              <p>
                <strong className="text-blue-500">Estado:</strong>{" "}
                {character.status}
              </p>
              <p>
                <strong className="text-blue-500">Ubicación:</strong>{" "}
                {character.location.name}
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="mt-8 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Regresar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;

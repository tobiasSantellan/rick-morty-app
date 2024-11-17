import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [image, setImage] = useState(null); // Estado para almacenar la imagen
  const navigate = useNavigate();

  // Función para manejar la carga de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crea un URL para mostrar la imagen localmente
      setImage(imageUrl);
    }
  };

  // Función para manejar el formulario de creación
  const handleSubmit = (e) => {
    e.preventDefault();

    const newCharacter = {
      id: Date.now(), // Genera un ID único para cada personaje
      name,
      species,
      image, // Se guarda la imagen en el nuevo personaje
    };

    // Guardar en localStorage
    const existingCharacters =
      JSON.parse(localStorage.getItem("characters")) || [];
    existingCharacters.push(newCharacter);
    localStorage.setItem("characters", JSON.stringify(existingCharacters));

    // Redirigir al home después de crear el personaje
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Crear Nuevo Personaje
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium">
            Nombre del Personaje
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium">
            Especie del Personaje
          </label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Input para cargar la imagen */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium">
            Cargar Imagen
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
        </div>

        {/* Mostrar la imagen seleccionada (si hay) */}
        {image && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Vista Previa:
            </h2>
            <img
              src={image}
              alt="Imagen del personaje"
              className="w-full h-64 object-cover rounded-md mt-2"
            />
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Crear Personaje
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;

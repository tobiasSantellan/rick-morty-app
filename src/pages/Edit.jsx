import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    image: "",
  });

  // Cargo los datos del personaje a editar desde localStorage
  useEffect(() => {
    const existingCharacters =
      JSON.parse(localStorage.getItem("characters")) || [];
    const characterToEdit = existingCharacters.find(
      (character) => character.id === Number(id) // Me aseguro que el personaje a editar tenga el mismo ID
    );

    if (characterToEdit) {
      setFormData(characterToEdit);
    } else {
      console.error("Personaje no encontrado");
      navigate("/"); // Redirijo a la página principal si no se encuentra el personaje
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crear una URL para la imagen seleccionada
      setFormData((prevData) => ({ ...prevData, image: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingCharacters =
      JSON.parse(localStorage.getItem("characters")) || [];

    // Actualizo el personaje en el array
    const updatedCharacters = existingCharacters.map((character) =>
      character.id === Number(id) ? { ...character, ...formData } : character
    );

    // Guardo los cambios en localStorage
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));

    // Redirijo a la página principal
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Editar Personaje
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              placeholder="Especie"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              accept="image/*"
            />
          </div>

          {/* Mostrar la imagen seleccionada o la imagen original */}
          {formData.image && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Vista Previa:
              </h3>
              <img
                src={formData.image}
                alt="Vista previa de la imagen"
                className="w-full h-40 object-cover rounded-md mt-2"
              />
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;

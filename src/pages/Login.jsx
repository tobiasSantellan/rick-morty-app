import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rick-and-morty.jpg";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  // Manejo de cambios en los campos con validaciones dinámicas
  const handleInputChange = (e, field) => {
    // Obtengo el valor actual del input
    const value = e.target.value;

    // Validación y actualización para el campo "email"
    if (field === "email") {
      setEmail(value);
      if (!/\S+@\S+\.\S+/.test(value)) {
        // Si el formato del email es inválido, actualizo el estado de errores
        setErrors((prev) => ({
          ...prev,
          email: "El email no tiene un formato válido.",
        }));
      } else {
        // Si el formato es válido, elimina el mensaje de error de este campo
        setErrors((prev) => {
          const { email, ...rest } = prev; // Desestructuro para eliminar el error del email
          return rest;
        });
      }
    }

    // Validación y actualización para el campo "password"
    if (field === "password") {
      setPassword(value);
      if (value.length < 6) {
        // Si la contraseña es demasiado corta, actualizo el estado de errores
        setErrors((prev) => ({
          ...prev,
          password: "La contraseña debe tener al menos 6 caracteres.",
        }));
      } else {
        // Si la contraseña cumple con los requisitos, elimina el mensaje de error de este campo
        setErrors((prev) => {
          const { password, ...rest } = prev;
          return rest; // Retorno el nuevo objeto de errores sin el error de password
        });
      }
    }

    // Validación y actualización para el campo "name"
    if (field === "name") {
      setName(value);
      if (!value.trim()) {
        // Si el nombre está vacío, actualizo el estado de errores
        setErrors((prev) => ({ ...prev, name: "El nombre es obligatorio." }));
      } else {
        setErrors((prev) => {
          // Si el nombre es válido (no vacío), elimina el mensaje de error de este campo
          const { name, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return; // Si hay errores, no continuar

    // Verifico si el email ingresado ya está registrado en el localStorage.
    // Si el email ya existe, establezco un mensaje de error en el estado.
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === email)) {
      setErrors({ email: "El email ya está registrado." });
      return;
    }

    // Agrego un nuevo usuario con los datos de nombre, email y contraseña al array de usuarios en el localStorage. Luego, actualizo el localStorage con el nuevo array de usuarios.
    // Muestro un mensaje de éxito, limpio los campos del formulario y cambio el estado para mostrar el formulario de inicio de sesión.
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("¡Registro exitoso!");
    setIsRegister(false);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return; // Si hay errores, no continuar

    // Obtengo la lista de usuarios almacenada en el localStorage. Si no existen usuarios, se inicializa como un arreglo vacío. Luego busco un usuario que coincida con el
    // email y la contraseña proporcionados. Si no se encuentra un usuario que coincida,  muestro un mensaje de error indicando que las credenciales son incorrectas.
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      setErrors({ email: "Credenciales incorrectas." });
      return;
    }

    // Guardar autenticación en localStorage
    localStorage.setItem("auth", JSON.stringify(user));
    alert(`¡Bienvenido, ${user.name}!`);
    login(); // Marcar como autenticado
    navigate("/"); // Redirigir al Home
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 via-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 mb-6 pb-2">
          {isRegister ? "Registro" : "Inicio de Sesión"}
        </h1>
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Rick and Morty Logo"
            className="w-32 border rounded-md"
          />
        </div>
        <form
          onSubmit={isRegister ? handleRegister : handleLogin}
          className="space-y-6"
        >
          {isRegister && (
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleInputChange(e, "name")}
                placeholder="Tu nombre"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.name ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          )}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              placeholder="Tu email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e, "password")}
              placeholder="Tu contraseña"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.password ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 transition"
          >
            {isRegister ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 hover:underline"
          >
            {isRegister ? "Inicia Sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

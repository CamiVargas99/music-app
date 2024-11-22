import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm();

  const loginSubmit = async (formData) => {
    console.log("FORM DATA", formData);

   
    try {
      const response = await axios.post('/api/login', formData);
      console.log('Inicio de sesión exitoso:', response.data);
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      
    }
  };

  return (
    <div className="flex align-items-center justify-content-center h-screen">
      <form autoComplete="off" onSubmit={handleSubmit(loginSubmit)}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-4">
            <h2> Aprendiendo React Hook Forms</h2>
          </div>
          <div className="p-field p-col-12 p-md-12">
            <span className="p-float-label">
              <InputText
                id="new-email"
                type="text"
                placeholder="introduzca su Email"
                autoComplete="new-email"
                className={errors?.email ? "p-invalid" : ""}
                {...register("email", {
                  required: {
                    value: true,
                    message: "El campo email es obligatorio",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message:
                      "El formato del email es incorrecto, por favor revíselo",
                  },
                })}
              />
              <label htmlFor="email">Email</label>
            </span>
            {errors?.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
          </div>
          <div className="p-4"></div>
          <div className="p-field p-col-12 p-md-12">
            <span className="p-float-label">
              <InputText
                id="new-password"
                autoComplete="new-password"
                type="password"
                placeholder="introduzca su contrasena"
                className={errors?.password ? "p-invalid" : ""}
                {...register("password", {
                  required: {
                    value: true,
                    message: "El campo contraseña es obligatorio",
                  },
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              <label htmlFor="password">Contraseña</label>
            </span>
            {errors?.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>
          <div className="p-field p-col-12 p-md-12 p-2">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
            />
            <label htmlFor="rememberMe" className="p-checkbox-label p-2">
              Recuerdame
            </label>
          </div>
          <div className="p-field p-col-12 p-md-12">
            <Button
              type="submit"
              label="Ingresar"
              disabled={!isValid || !isDirty}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

//Exportar a landingPage

export const validate = (user, password = []) => {
    let errors = {};
    //trim son los caracteres sin contenido; espacios en blanco.
    if (!user.name.trim()) {errors.name = "Campo obligatorio";
    } else if(!/^[a-z0-9_-]{3,16}$/(user.name)) {
      errors.name = "El nombre del usuario debe ir en minúscula, y debe incluir un guión y ser de 3 a 16 carácteres ";
    }
    if (!password.name.trim()) { errors.name = "Campo obligatorio";
      } else if (!/(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/(user.password)) {
        errors.name = "El password debe tener una letra minúscula, una mayúscula, un carácter especial y un número de 8 dígitos";
    
    return errors;
  };
}
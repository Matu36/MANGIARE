import React from "react";
import style from "./LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  let handleSubmit = (e) => {
    e.preventDefault();
    setInput({ Usuario: "", Contraseña: "" });
  };

  let [input, setInput] = React.useState({
    Usuario: "",
    Contraseña: "",
  });

  let letHandleOnChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={style.container}>
      <div className={style.brandLogo}>
        <div className={style.brandtittle}>
          <span> Your Ingredients, Our Recipes </span>
        </div>
        <div className={style.inputs}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label className={style.label}> EMAIL </label>
            <input
              className={style.input}
              type={"text"}
              name={"Usuario"}
              value={input.Usuario}
              onChange={(e) => letHandleOnChange(e)}
            />
            <br />
            <label className={style.label}> PASSWORD </label>
            <input
              className={style.input}
              type={"password"}
              name={"Contraseña"}
              value={input.Contraseña}
              onChange={(e) => letHandleOnChange(e)}
            />
          </form>
        </div>
      </div>
      <div className={style.button}>
        <Link to={"/formUser"}>
          <button className={style.button}>REGISTER</button>
        </Link>
        <Link to={"/home"}>
          <button className={style.button}>GUEST USER</button>
        </Link>

        <br />
      </div>
    </div>
  );
};

export default LoginForm;

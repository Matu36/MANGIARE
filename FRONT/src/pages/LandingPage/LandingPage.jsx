import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import style from "../LandingPage/LandingPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useAuth0 } from "@auth0/auth0-react";
//import { useState } from "react";
//import { validate } from "../../utils/validations";

export default function LandingPage() {
  //const [errors, setErrors] = useState({});
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isauthenticated } = useAuth0();

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "250px",
  };

  const slideImages = [
    {
      url: "https://www.lasaltena.com.ar/wp-content/uploads/2020/02/recetaSlider2-1349x675.jpg.webp",
      caption: "Slide 1",
    },
    {
      url: "https://www.annarecetasfaciles.com/files/pollo-asado-cava-1536x862.jpg",
      caption: "Slide 2",
    },
    {
      url: "https://www.paulinacocina.net/wp-content/uploads/2014/08/P1100479.jpg",
      caption: "Slide 3",
    },
  ];

  //setErrors (
  //validate ({
  //Usuario: input.Usuario,
  //Contraseña: input.Contraseña,
  //})

  //)

  return (
    <div className={style.container}>
      <div className={style.divTitle}>
        <h1 className={style.tittle}>MANGIAR-E</h1>
        <button
          className={style.iniciosesionmasbotones}
          onClick={() => loginWithRedirect()}
        >
          LOGIN
        </button>
        <button
          className={style.iniciosesionmasbotones}
          onClick={() => logout()}
        >
          LOGOUT
        </button>
      </div>
      <div className={style.containerslydeYregistro}>
        <div className={style.iniciosesionmasbotones}>
          <LoginForm />
        </div>
        <div className={style.slide}>
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div key={index}>
                <div
                  className={style.image}
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage.url})`,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>
      </div>
      <div className={style.colaborators}></div>
    </div>
  );
}

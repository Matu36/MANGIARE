import axios from "axios";

const onExecutePostEmail = async (user) => {
  try {
    const apiEmail = "/users";
    const response = await axios({
      method: "post",
      url: "/users",
      data: {
        email: user.email,
      },
    }).then((res) => res);
<<<<<<< HEAD

    localStorage.setItem("MANGIARE_user", JSON.stringify(response.data));
=======
    localStorage.setItem("MANGIARE_userInfo", JSON.stringify(response.data));
>>>>>>> 462f59a765d0a605661ca04e2ecdacd2bfd73781
  } catch (error) {
    console.error(error);
  }
};
export default onExecutePostEmail;

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

    localStorage.setItem("MANGIARE_user", JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
};
export default onExecutePostEmail;

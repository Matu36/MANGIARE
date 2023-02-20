import axios from "axios";

const onExecutePostEmail = async (email) => {
  try {
    const apiEmail = "/users";
    const response = await axios({
      method: "post",
      url: "/users",
      data: {
        email: email,
      },
    }).then((res) => res);
  } catch (error) {
    console.error(error);
  }
};
export default onExecutePostEmail;

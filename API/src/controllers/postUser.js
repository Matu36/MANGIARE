const { Users } = require("../db.js");
const sendEmailWithTemplate = require("../mailer/sendEmailWithTemplate");

module.exports = async (req, res) => {
  try {
    if (!req.body?.email) throw "No body params";

    const [instance, created] = await Users.findOrCreate({
      where: { email: req.body.email.toLowerCase() },
    });

    if (created) {
      console.log("User created successfully");
      sendEmailWithTemplate(instance.email, "newUser");
    }

    res.send(instance);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const newUser = (props) => {
  return `
  <head>
  <title>Welcome to Mangiare</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.5;
      padding: 4rem;
      box-sizing: border-box;
    }
    img {
      max-width: 50%;
    }
    h1, h2, h3 {
      font-weight: bold;
    }
    h1 {
      font-size: 2.5em;
      color: #F77F00;
      margin-bottom: 0.5em;
    }
    p {
      margin-bottom: 1.5em;
    }
    a {
      color: #F77F00;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
    <img src="https://mangiare.vercel.app/static/media/LandingTitle.e92b7fdb33ac266bc895.png" alt="mangiare logo"/>
    <h1>Welcome to Mangiare - Bring your ingredients to life!</h1>
    <p><b>Hello ${props.email},</b></p>
    <p>Welcome to Mangiare! We're thrilled to have you in our community of food lovers. We know that cooking can be a daunting task, especially when you lack inspiration or don't know what to make with the ingredients you have at home. That's why we created Mangiare, to help you cook delicious recipes with the ingredients you already have in your kitchen.</p>
    <p>Have you ever had the feeling that you have a bunch of ingredients in your pantry and don't know how to combine them to create something tasty? Mangiare is here to solve that problem. Simply enter the ingredients you have at home, and our app will show you a list of delicious recipes you can make with them. It's that easy!</p>
    <p>In addition, we make sure that our recipes are simple and easy to follow, even if you're a beginner cook. And if you're looking for something specific, you can use our advanced search tools to find the perfect recipe.</p>
    <p>We want you to enjoy cooking, so we've made Mangiare as easy as possible. Plus, we're constantly working to improve our app and add new features. And the best part is, Mangiare is completely free.</p>
    <p>Are you ready to get started? Log in now and start cooking with your ingredients today!</p>
    <p>Best regards,</p>
    <p>The Mangiare Team</p>
    <p>P.S. Be sure to follow us on our <a href="#">social media</a> for cooking tips, recipes, and much more. We love sharing our creations with the Mangiare community!</p>
  </body>
</html>`;
};

module.exports = newUser;

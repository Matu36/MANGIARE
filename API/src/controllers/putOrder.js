const {Orders, Users} = require('../db.js');

module.exports = async (req, res) => {
  try{
    if ((!req.body.userId) || (!req.body.orderId) || (!req.body.status)) throw "No body params";
    
    let user = await Users.findOne({where: {id: req.body.userId}});
    if (!user) return res.status(404).send('No User Found');
    if ((user.role === null) && (orderId != user.id)) return res.status(403).send('Forbidden');
    
    let orderInstance = await Orders.findByPk(req.body.orderId);
    if (!orderInstance) return res.status(404).send('No Order Found')

    // Prohibiciones user Basic
    if (user.role === null)
      if ((orderInstance.status > 0)
        || (![1, 5].includes(parseInt(req.body.status))))
          return res.status(403).send('New state invalid');
    // Prohibiciones user Admin
    else
      if ((orderInstance.status > 2)
        || (![3, 4].includes(parseInt(req.body.status)))
        || ((req.body.status == 4) && (orderInstance.status > 1))
        || ((req.body.status == 3) && (orderInstance.status !== 2)))
          return res.status(403).send('New state invalid');
  
    orderInstance.update({status: req.body.status});

    res.send(orderInstance);
  }
  catch(error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
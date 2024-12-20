const models = require("../models");
const { Products } = require("../models");
exports.productsReview = async (req, res) => {
  //   const id = req.params;
  //   const product = await Products.find({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   const { name, price, convini, tags, imageUrl } = product;
  // { name, price, convini, tags, imageUrl }
  res.render("menuReview");
};

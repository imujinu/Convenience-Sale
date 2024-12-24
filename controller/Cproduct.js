const models = require("../models");
const { Products } = require("../models");
const { Op } = require("sequelize");

exports.search = async (req, res) => {
  try {
    const pName = req.query.productName;
    const searchProducts = await Products.findAll({
      where: {
        pName: {
          [Op.like]: `%${pName}%`,
        },
      },
    });
    if (searchProducts && searchProducts > 0) {
      res.send({ searchProducts, pName, isSearch: true });
    } else {
      res.send({ isSearch: false });
    }
  } catch (err) {
    console.error("err", err);
  }
};

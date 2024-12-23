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
    res.send({ searchProducts, pName });
  } catch (err) {
    console.error("err", err);
  }
};

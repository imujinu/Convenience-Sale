const models = require("../models");
const { Products } = require("../models");
const { Op } = require("sequelize");

exports.search = async (req, res) => {
  try {
    const pName = req.body.product;
    const product = await Products.findAll({
      where: {
        pName: {
          [Op.like]: `%${pName}`,
        },
      },
    });
    res.send({ product });
  } catch (err) {
    console.error("err", err);
  }
};

// productController.js
const {
  crawlCUProducts,
  fetchDosirakData,
  fetchGS25Data,
} = require("../crawlers");
const db = require("../models"); // 모델 로드

// 제품 데이터 저장할 배열
let productsData = [];
// 이미 전송된 제품 ID를 저장할 배열
let sentProductIds = [];
// DB에서 가져온 제품 정보를 저장할 배열
let dbProducts = [];

// 크롤링 및 렌더링 기능
const crawlProducts = async (req, res) => {
  try {
    console.log("크롤링 작업 시작...");

    const [cuProducts, sevenElevenProducts, gs25Products] = await Promise.all([
      crawlCUProducts(),
      fetchDosirakData(),
      fetchGS25Data(),
    ]);

    // DB에서 제품 정보 가져오기
    dbProducts = await db.Products.findAll();

    productsData = [...cuProducts, ...sevenElevenProducts, ...gs25Products].map(
      (product) => {
        const dbProduct = dbProducts.find((p) => p.id === product.id);

        if (dbProduct) {
          return {
            ...product,
            tags: dbProduct.tags,
            sent: true,
            isDuplicate: true,
          };
        } else {
          return {
            ...product,
            tags: [],
            sent: false,
            isDuplicate: false,
          };
        }
      },
    );

    sentProductIds = dbProducts.map((product) => product.id);

    console.log(`\n총 수집된 제품 수: ${productsData.length}`);
    res.render("index", { products: productsData });
  } catch (error) {
    console.error("크롤링 작업 중 오류 발생:", error);
    res.status(500).json({ error: "크롤링 작업 중 오류가 발생했습니다." });
  }
};

// 태그 업데이트 기능
const updateProductTags = async (req, res) => {
  const productId = req.params.productId;
  const { tags } = req.body;

  try {
    const product = await db.Products.findByPk(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "해당 ID의 제품을 찾을 수 없습니다." });
    }

    product.tags = tags;
    await product.save();

    console.log("DB 태그 업데이트 성공:", product);
    res.json({ success: true });
  } catch (error) {
    console.error("DB 태그 업데이트 오류:", error);
    res.status(500).json({
      success: false,
      error: "태그 업데이트 중 오류가 발생했습니다.",
    });
  }
};

// DB 전송 기능
const sendProductToDB = async (req, res) => {
  const productId = req.params.productId;
  const product = req.body;

  if (!product) {
    return res
      .status(400)
      .json({ success: false, error: "제품 정보를 찾을 수 없습니다." });
  }

  try {
    const existingProduct = await db.Products.findOne({
      where: {
        id: productId,
      },
    });

    if (existingProduct) {
      // 기존 제품 업데이트
      existingProduct.imageUrl = product.imageUrl;
      existingProduct.tags = product.tags;
      await existingProduct.save();

      console.log("DB 업데이트 성공:", existingProduct);

      // productsData 배열 업데이트
      const updatedProductIndex = productsData.findIndex(
        (p) => p.id === productId,
      );
      if (updatedProductIndex !== -1) {
        productsData[updatedProductIndex].imageUrl = product.imageUrl;
        productsData[updatedProductIndex].tags = product.tags;
        productsData[updatedProductIndex].sent = true;
        productsData[updatedProductIndex].isDuplicate = true;
      }

      res.json({ success: true });
    } else {
      // 새로운 제품 삽입
      const newProduct = await db.Products.create({
        id: product.id, // 크롤링된 ID 사용
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        convini: product.convini,
        tags: product.tags,
      });

      console.log("DB 삽입 성공:", newProduct);

      sentProductIds.push(newProduct.id);

      // productsData 배열 업데이트
      const updatedProductIndex = productsData.findIndex(
        (p) => p.id === productId,
      );
      if (updatedProductIndex !== -1) {
        productsData[updatedProductIndex].sent = true;
        productsData[updatedProductIndex].isDuplicate = true;
      }

      res.json({ success: true });
    }
  } catch (error) {
    console.error("DB 전송 중 오류 발생:", error);
    res.status(500).json({
      success: false,
      error: "DB 전송 중 오류가 발생했습니다.",
    });
  }
};

// DB 삭제 기능
const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    // 로컬 productsData 배열에서 제거
    const productIndex = productsData.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      productsData.splice(productIndex, 1);
    }

    const product = await db.Products.findByPk(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "해당 ID의 제품을 찾을 수 없습니다." });
    }

    await product.destroy();

    console.log("DB 삭제 성공:", product);

    // sentProductIds 배열에서 제거
    const sentIdIndex = sentProductIds.indexOf(productId);
    if (sentIdIndex !== -1) {
      sentProductIds.splice(sentIdIndex, 1);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("DB 삭제 오류:", error);
    res.status(500).json({
      success: false,
      error: "DB 삭제 중 오류가 발생했습니다.",
    });
  }
};

// 모든 제품 조회 기능
const getAllProducts = async (req, res) => {
  try {
    const products = await db.Products.findAll();
    res.json({ success: true, products });
  } catch (error) {
    console.error("DB 전체 제품 조회 오류:", error);
    res.status(500).json({
      success: false,
      error: "DB 조회 중 오류가 발생했습니다.",
    });
  }
};

module.exports = {
  crawlProducts,
  updateProductTags,
  sendProductToDB,
  deleteProduct,
  getAllProducts,
};

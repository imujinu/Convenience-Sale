function parsePrice(priceText) {
  const priceNumber = parseInt(priceText.replace(/[^0-9]/g, ""), 10);
  return isNaN(priceNumber) ? 0 : priceNumber;
}

module.exports = {
  parsePrice,
};

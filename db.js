const mysql = require("mysql2");
const config = require("./config");

const connection = mysql.createConnection(config.db);

// DB 초기화 함수
function initDb(callback) {
  connection.connect((err) => {
    callback(err);
  });
}

module.exports = {
  connection,
  initDb,
};

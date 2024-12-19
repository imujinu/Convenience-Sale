const express = require("express");
const app = express();
const db = require("./models");
const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/views", express.static(__dirname + "views"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const indexRouter = require("./routes");
app.use("/", indexRouter);

app.get("*", (req, res) => {
  res.render("404");
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("DB 연결 성공");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

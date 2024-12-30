const express = require("express");
const creteError = require("http-errors");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const { connectDB } = require("./config/db");
const session = require("express-session");
const nocache = require("nocache");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const homeRoutes = require("./routes/homeRoutes");
const errorHandler = require("./middleware/errorHandler")

const app = express();
connectDB();
const port = process.env.PORT || 3000;

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views/layout"),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use(nocache());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/", homeRoutes);
app.use("/api", userRoutes);
app.use("/api", adminRoutes);

app.use((_req, _res, next) => {
  next(creteError(404));
});

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

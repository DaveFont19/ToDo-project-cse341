const express = require("express");
const cors = require("cors");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const MongoStore = require("connect-mongo");
const swaggerDocument = require("./swagger/swagger.json");
const { initDb } = require("./config/database");
const passport = require("./config/passport");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: process.env.MONGODB_URI
      ? MongoStore.create({
          mongoUrl: process.env.MONGODB_URI,
          dbName: process.env.DB_NAME || "todo_manager",
        })
      : undefined,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes'));
app.use(errorHandler);

if (require.main === module) {
  initDb()
    .then(() => {
      app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error.message);
      process.exit(1);
    });
}

module.exports = app;
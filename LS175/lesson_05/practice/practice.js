const express = require("express");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const store = require("connect-loki");
const flash = require("express-flash");

const app = express();
const LokiStore = store(session);

const clone = object => {
  return JSON.parse(JSON.stringify(object));
};

app.set('views', './views');
app.set('view engine', 'pug');

let data = [
  { name: 'Teddy' },
  { name: 'Terrance' },
];

app.use(express.urlencoded({ extended: false }));
app.use(session({
  cookie: {
    httpOnly: true,
    maxAge: 31 * 24 * 60 * 60 * 1000,
    path: "/",
    secure: false,
  },
  name: "practice-session-id",
  resave: false,
  saveUninitialized: true,
  secret: "not very secure way but for practice",
  store: new LokiStore({}),
}));

app.use((req, res, next) => {
  if (!(data in req.session)) {
    req.session.data = clone(data);
  }
  next();
});

app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

app.use(flash());

/*
app.use((req, res, next) => {
  console.log(req.session);
  next();
})
*/

app.get("/", (req, res) => {
  res.render('practice', {
    dogs: req.session.data,
  });
});

app.get("/redirected", (req, res) => {
  res.render('redirect-practice');
});

app.post("/",
  [
    body("name")
      .isLength({ min: 1 })
      .withMessage("Name is required.")
  ],
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", "testing");
      console.log(req.flash());
      res.render("practice", {
        flash: req.flash(),
        dogs: data,
      });
    } else {
      next()
    }
  },
  (req, res) => {
    data.push({ name: req.body.name });
    res.redirect("/");
  },
);

app.listen(3000, () => {
  console.log("Listening to port 3000.");
});



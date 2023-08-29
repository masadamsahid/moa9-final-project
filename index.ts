import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public'))); // static file
app.use("/bootstrap", express.static(path.join(__dirname, '../node_modules/bootstrap')));

console.log(path.join(__dirname, '../node_modules/bootstrap'));//

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
  return res.redirect('/books');
});

app.get('/register', (req, res) => {
  return res.render("register");
});

app.get('/login', (req, res) => {
  return res.render("login");
});

app.get('/books', (req, res) => {
  return res.render("books");
});



app.listen(3000, () => {
  console.log(`App is running on port 3000`);
});






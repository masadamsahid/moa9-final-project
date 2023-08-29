import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  return res.send("Hello World");
});

app.get('/page', (req, res) => {
  return res.render("index");
});



app.listen(3000, () => {
  console.log(`App is running on port 3000`);
});






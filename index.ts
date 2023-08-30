import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import moment from "moment";
import dotenv from "dotenv";
import booksRoutes from "./routes/booksRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public'))); // static file
app.use("/bootstrap", express.static(path.join(__dirname, '../node_modules/bootstrap')));
app.use("/moment", express.static(path.join(__dirname, '../node_modules/moment')));

console.log(path.join(__dirname, '../node_modules/bootstrap'));//

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.moment = moment;
app.locals.DEFAULT_BOOK_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK3nKjzHS9kqCAsWrF8UrA6Jjcn9tjP6XGjw&usqp=CAU";


// Routes
app.use("/", authRoutes);
app.use("/books", booksRoutes);


app.get('/', (req, res) => {
  return res.redirect('/books');
});


app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});






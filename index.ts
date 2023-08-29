import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import moment from "moment";

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


app.get('/', (req, res) => {
  return res.redirect('/books');
});

app.get('/register', (req, res) => {
  return res.render("register");
});

app.get('/login', (req, res) => {
  return res.render("login");
});

type Book = {
  id: number;
  name?: string;
  author: string;
  desc: string;
  img_url: string;
  price: number;
  publisher: string;
  published_at: Date;
}

const BOOKS: Book[] = [
  {
    id: 1,
    name: "Book 1",
    author: "John",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, placeat.",
    img_url: "https://marketplace.canva.com/EAFT42ozuLI/1/0/1003w/canva-sampul-buku-anak-penuh-warna-pintar-membaca-ceria-Gv3dp7UGOK8.jpg",
    price: 23.1,
    publisher: "Gramedoi",
    published_at: new Date("2018-01-03"),
  },
  {
    id: 2,
    name: "Book 2",
    author: "Mamet",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum enim inventore ipsum iste magnam nam neque sequi sunt velit voluptatibus? A eius eligendi eos ipsa, magnam minus nisi quaerat voluptates?",
    img_url: "https://berita.99.co/wp-content/uploads/2022/08/Contoh-Cover-Buku-Noverl-Simple-yang-Populer.jpg",
    price: 42,
    publisher: "Tiga Setangkai",
    published_at: new Date("2023-06-17"),
  },
  {
    id: 3,
    name: "Book 3",
    author: "Doe",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur delectus ex, iusto libero magnam minima minus neque nobis praesentium quod!",
    img_url: "https://www.bukukita.com/babacms/displaybuku/106055_f.jpg",
    price: 89.9,
    publisher: "Mijon",
    published_at: new Date("2021-12-23"),
  }
];

app.get('/books', (req, res) => {
  return res.render("books", { books: BOOKS });
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = BOOKS.find((book) => book.id === id);
  
  if (!book) return res.status(404).send("Not Found!");
  
  return res.render("book-details", { book });
});



app.listen(3000, () => {
  console.log(`App is running on port 3000`);
});






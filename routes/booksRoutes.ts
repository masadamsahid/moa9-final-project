import { Router } from "express";
import prisma from "../db/prisma";
import { bodyEmptyStrToNull } from "../middlewares/requestMiddlewares";
import BookControllers from "../controllers/booksControllers";


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

// const BOOKS: Book[] = [
//   {
//     id: 1,
//     name: "Book 1",
//     author: "John",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, placeat.",
//     img_url: "https://marketplace.canva.com/EAFT42ozuLI/1/0/1003w/canva-sampul-buku-anak-penuh-warna-pintar-membaca-ceria-Gv3dp7UGOK8.jpg",
//     price: 23.1,
//     publisher: "Gramedoi",
//     published_at: new Date("2018-01-03"),
//   },
//   {
//     id: 2,
//     name: "Book 2",
//     author: "Mamet",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum enim inventore ipsum iste magnam nam neque sequi sunt velit voluptatibus? A eius eligendi eos ipsa, magnam minus nisi quaerat voluptates?",
//     img_url: "https://berita.99.co/wp-content/uploads/2022/08/Contoh-Cover-Buku-Noverl-Simple-yang-Populer.jpg",
//     price: 42,
//     publisher: "Tiga Setangkai",
//     published_at: new Date("2023-06-17"),
//   },
//   {
//     id: 3,
//     name: "Book 3",
//     author: "Doe",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur delectus ex, iusto libero magnam minima minus neque nobis praesentium quod!",
//     img_url: "https://www.bukukita.com/babacms/displaybuku/106055_f.jpg",
//     price: 89.9,
//     publisher: "Mijon",
//     published_at: new Date("2021-12-23"),
//   }
// ];


const booksRoutes = Router();

const booksControllers =  new BookControllers();

// API
booksRoutes.post('/', bodyEmptyStrToNull, booksControllers.createNewBook);
booksRoutes.post('/:id/update', bodyEmptyStrToNull, booksControllers.updateBook);
booksRoutes.post('/:id/delete', booksControllers.deleteBook);

// PAGES
booksRoutes.get('/', booksControllers.getBooksListPage);
booksRoutes.get('/add', booksControllers.getCreateNewBookPage);
booksRoutes.get('/:id', booksControllers.getBookDetailsPage);
booksRoutes.get('/:id/update', booksControllers.getBookUpdatePage);
booksRoutes.get('/:id/delete', booksControllers.getBookDeletePage);


export default booksRoutes;





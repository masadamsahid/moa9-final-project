import { Router } from "express";
import prisma from "../db/prisma";
import { bodyEmptyStrToNull } from "../middlewares/requestMiddlewares";


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

booksRoutes.post('/', bodyEmptyStrToNull, async (req, res) => {
  const body = req.body;
  
  console.log({ body });
  
  if (!body.title) return res.status(400).send("Name must be provided");
  if (body.price !== null) {
    body.price = Number(body.price);
    if (isNaN(body.price)) return res.status(400).send("Price must be a number");
  }
  if (body.author !== null) {
    body.author = Number(body.author);
    if (isNaN(body.author)) return res.status(400).send("Invalid author");
    const author = await prisma.user.findFirst({
      where: { id: body.author },
    });
    if (!author) return res.status(400).send("Invalid author");
  }
  
  if (body?.published_at === null) delete body.published_at;
  else body.published_at = new Date(body.published_at);
  
  const newBook = await prisma.book.create({
    data: {
      name: body.title,
      desc: body.desc,
      price: body.price,
      publisher: body.publisher,
      author_id: body.author,
      img_url: body['img-url'],
      published_at: body?.published_at,
    },
  });

  if (!newBook) return res.status(500).send("Failed creating new book");

  return res.redirect(`/books/${newBook.id}`);
});

booksRoutes.post('/:id/update', bodyEmptyStrToNull, async (req, res) => {
  const id= Number(req.params.id);
  
  const book = await prisma.book.findFirst({
    where: { id },
  });
  
  if (!book) return res.status(404).send("Target book not found");
  
  const body = req.body;
  
  console.log({ body });
  
  if (!body.title) return res.status(400).send("Name must be provided");
  if (body.price !== null) {
    body.price = Number(body.price);
    if (isNaN(body.price)) return res.status(400).send("New Price must be a number");
  }
  if (body.author !== null) {
    body.author = Number(body.author);
    if (isNaN(body.author)) return res.status(400).send("Invalid new author");
    const author = await prisma.user.findFirst({
      where: { id: body.author },
    });
    if (!author) return res.status(400).send("Invalid new author");
  }
  
  if (body?.published_at === null) delete body.published_at;
  else body.published_at = new Date(body.published_at);
  
  const updatedBook = await prisma.book.update({
    where: { id },
    data: {
      name: body.title,
      desc: body.desc,
      price: body.price,
      publisher: body.publisher,
      author_id: body.author,
      img_url: body['img-url'],
      published_at: body?.published_at,
    },
  });

  if (!updatedBook) return res.status(500).send("Failed updating book");

  return res.redirect(`/books/${updatedBook.id}`);
});

booksRoutes.get('/', async (req, res) => {
  const books = await prisma.book.findMany({
    include: {
      author: {
        select: { id: true, full_name: true },
      },
    },
  });
  return res.render("books", { books });
});


booksRoutes.get('/add', async (req, res) => {
  const authors = await prisma.user.findMany();
  
  return res.render("add-book", { authors });
});

booksRoutes.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const book = await prisma.book.findFirst({
    where: { id },
    include: {
      author: {
        select: { id: true, full_name: true },
      },
    }
  });
  
  console.log({ book })
  
  if (!book) return res.status(404).send("Not Found!");
  
  return res.render("book-details", { book });
});

booksRoutes.get('/:id/update', async (req, res) => {
  const id = Number(req.params.id);
  const book = await prisma.book.findFirst({
    where: { id },
    include: {
      author: {
        select: { id: true, full_name: true },
      },
    }
  });
  
  console.log({ book })
  
  if (!book) return res.status(404).send("Not Found!");
  
  const authors = await prisma.user.findMany();
  
  return res.render("update-book", { book, authors });
});


export default booksRoutes;





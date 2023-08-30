import prisma from "../db/prisma";
import { Handler } from "express";


class BookControllers {
  
  createNewBook: Handler = async (req, res) => {
    const body = req.body;
    const selfUser: any = req.user;
    
    console.log({ body });
    
    if (!body.title) return res.status(400).send("Name must be provided");
    if (body.price !== null) {
      body.price = Number(body.price);
      if (isNaN(body.price)) return res.status(400).send("Price must be a number");
    }
    // if (body.author !== null) {
    //   body.author = Number(body.author);
    //   if (isNaN(body.author)) return res.status(400).send("Invalid author");
    //   const author = await prisma.user.findFirst({
    //     where: { id: body.author },
    //   });
    //   if (!author) return res.status(400).send("Invalid author");
    // }
    
    if (body?.published_at === null) delete body.published_at;
    else body.published_at = new Date(body.published_at);
    
    const newBook = await prisma.book.create({
      data: {
        name: body.title,
        desc: body.desc,
        price: body.price,
        publisher: body.publisher,
        author_id: selfUser.id,
        img_url: body['img-url'],
        published_at: body?.published_at,
      },
    });
    
    if (!newBook) return res.status(500).send("Failed creating new book");
    
    return res.redirect(`/books/${newBook.id}`);
  }
  
  updateBook: Handler = async (req, res) => {
    const selfUser: any = req.user;
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
    
    if (body?.published_at === null) delete body.published_at;
    else body.published_at = new Date(body.published_at);
    
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        name: body.title,
        desc: body.desc,
        price: body.price,
        publisher: body.publisher,
        author_id: selfUser.id,
        img_url: body['img-url'],
        published_at: body?.published_at,
      },
    });
    
    if (!updatedBook) return res.status(500).send("Failed updating book");
    
    return res.redirect(`/books/${updatedBook.id}`);
  }
  
  deleteBook: Handler = async (req, res) => {
    const id = Number(req.params.id);
    const deletedBook = await prisma.book.delete({
      where: { id },
    });
    
    return res.redirect("/books");
  }
  
  
  // Pages
  getBooksListPage: Handler = async (req, res) => {
    
    const query = req.query;
    const page: number = Number(query.page || 1);
    const limit: number = Number(query.limit || 5);
    
    const books = await prisma.book.findMany({
      include: {
        author: {
          select: { id: true, full_name: true },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    
    const bookCount = await prisma.book.count();
    
    const selfUser = req.user;
    
    console.log({ selfUser, books, bookCount });
    
    return res.render("books", { bookCount, books, selfUser, currentPage: page, limit });
  }
  
  getCreateNewBookPage: Handler = async (req, res) => {
    const selfUser = req.user;
    
    return res.render("add-book", { selfUser });
  }
  
  getBookDetailsPage: Handler =  async (req, res) => {
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
    
    const selfUser = req.user;
    
    console.log({ selfUser });
    
    return res.render("book-details", { book, selfUser });
  }
  
  getBookUpdatePage: Handler = async (req, res) => {
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
    
    const selfUser = req.user;
    
    console.log({ selfUser });
    
    return res.render("update-book", { book, authors, selfUser });
  }
  
  getBookDeletePage: Handler = async (req, res) => {
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
    
    const selfUser = req.user;
    
    console.log({ selfUser });
    
    return res.render("delete-book", { book, selfUser });
  }
  
}

export default BookControllers;
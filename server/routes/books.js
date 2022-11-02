const express = require('express');
const booksRouter = express.Router();
const db = require('../models');

// @GET All Books
booksRouter.get('/', async (req, res) => {
  try {
    let response;
    if (req.query.genre) {
      response = await db.Books.findAll({ where: { genre: req.query.genre } });
    } else {
      response = await db.Books.findAll();
    }
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ msg: 'Something broke while getting all books.' });
  }
});

// @GET Single Book
booksRouter.get('/:id', async (req, res) => {
  try {
    const response = await db.Books.findAll({ where: { id: req.params.id } });
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ msg: 'Something broke while getting this book.' });
  }
});

// @POST Create New book
booksRouter.post('/', async (req, res) => {
  try {
    const response = await db.Books.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      checkedOut: req.body.checkedOut,
    });
    return res.status(201).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: err });
  }
});

// @PUT Update New book
booksRouter.put('/:id', async (req, res) => {
  try {
    const response = await db.Books.update(
      {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        checkedOut: req.body.checkedOut,
      },
      { where: { id: req.params.id } }
    );
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: 'Something broke while updating book' });
  }
});

// @DELETE Single Book
booksRouter.delete('/:id', async (req, res) => {
  try {
    const response = await db.Books.destroy({ where: { id: req.params.id } });
    return res.status(200).send('Book Delete Successfully');
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ msg: 'Something broke while deleting book.' });
  }
});

module.exports = booksRouter;

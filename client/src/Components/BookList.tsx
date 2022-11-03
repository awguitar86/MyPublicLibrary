import React, { useState } from 'react';
import { useGetBooksQuery } from '../redux/booksApiSlice';
import { Book } from '../BookModels';
import { BookItem } from './BookItem';
import { DeleteModal } from '../Components/DeleteModal';
import { CreateOrEditBookModal } from '../Components/CreateOrEditBookModal';
import { GenreSelect } from './GenreSelect';
import '../App.css';

export function BookList() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const { data, isLoading, error, refetch } = useGetBooksQuery(selectedGenre);
  const [selectedBook, setSelectedBook] = useState({} as Book);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateOrEditModalOpen, setIsCreateOrEditModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSelectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGenre(value);
  };

  const onOpenDeleteModal = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
    setIsDeleteModalOpen(true);
  }

  const onOpenCreateOrEditModal = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
    setIsCreateOrEditModalOpen(true);
  }

  const onCloseModal = () => {
    if (isDeleteModalOpen) {
      setSelectedBook({} as Book);
      setIsDeleteModalOpen(false)
      setIsSuccess(false);
      refetch()
    }
    if (isCreateOrEditModalOpen) {
      setSelectedBook({} as Book);
      setIsCreateOrEditModalOpen(false);
      setIsSuccess(false);
      refetch()
    }
  }

  if (isLoading) {
    return (
      <div className='loading'>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className='book-list-wrap'>
      <header className='book-list-header'>
        <GenreSelect
          onChange={onSelectGenre}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          defaultText='Filter by Genre'
          iconClassName='select-icon'
        />
        <button
          className='add-new-book-btn'
          onClick={() => {
            window.scrollTo(0, 0);
            setIsCreateOrEditModalOpen(true);
          }}
        >
          Add New Book
        </button>
      </header>
      <div className='book-list-table-wrap'>
        <table>
          <thead>
            <tr>
              <th className='book-title'>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Availability</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((book) => {
              return (
                <BookItem
                  key={book.id}
                  book={book}
                  openDeleteModal={onOpenDeleteModal}
                  openCreateOrEditModal={onOpenCreateOrEditModal}
                />
              )
            })}
          </tbody>
        </table>
      </div>
      <DeleteModal
        book={selectedBook}
        open={isDeleteModalOpen}
        onClose={onCloseModal}
      />
      <CreateOrEditBookModal
        book={selectedBook}
        open={isCreateOrEditModalOpen}
        onClose={onCloseModal}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />
    </div>
  )
}
import React, { useState, useEffect } from 'react';
import { useGetBooksQuery } from '../redux/booksApiSlice';
import { Book } from '../BookModels';
import { BookItem } from './BookItem';
import { DeleteModal } from '../Components/DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

export function BookList() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const { data, isLoading, error } = useGetBooksQuery(selectedGenre);
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onSelectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGenre(value);
  };

  const onOpenDeleteModal = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
    setIsDeleteModalOpen(true);
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
        <div style={{position: 'relative'}}>
          <select onChange={onSelectGenre} className='book-list-select' value={selectedGenre}>
            <option value='' disabled>
              Filter by Genre
            </option>
            <option value="Adventure">Adventure</option>
            <option value="Biography">Biography</option>
            <option value="Children">Children</option>
            <option value="Classic">Classic</option>
            <option value="Cooking">Cooking</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Hobbies">Hobbies</option>
            <option value="History">History</option>
          </select>
          <button
            onClick={() => setSelectedGenre('')}
            className='select-icon'
            disabled={!selectedGenre}
          >
            {selectedGenre ? (
              <FontAwesomeIcon icon={faClose}/>
              ) : (
                <FontAwesomeIcon icon={faCaretDown}/>
              )
            }
          </button>
        </div>
        <button className='add-new-book-btn'>Add New Book</button>
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
                />
              )
            })}
          </tbody>
        </table>
      </div>
      <DeleteModal
        book={selectedBook}
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}
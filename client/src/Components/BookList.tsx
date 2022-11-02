import { useState, useEffect } from 'react';
import { Book } from '../BookModels';
import { BookItem } from './BookItem';
import '../App.css';

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<String>();

  const getBooks = async () => {
    const result = await fetch('http://localhost:8080/books');
    const books = await result.json();
    setBooks(books);
  }

  useEffect(() => {
    getBooks();
  }, []);

  const onSelectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGenre(value);
  };

  return (
    <div className='book-list-wrap'>
      <header className='book-list-header'>
        <div>
          <select onChange={onSelectGenre} className='book-list-select'>
            <option selected disabled>
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
        </div>
      </header>
      <div className='book-list-table-wrap'>
        <table>
          <thead>
            <tr>
              <th className='book-title'>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => {
              return <BookItem book={book} key={book.id}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react';
import { Book } from './BookModels';

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = async () => {
    const result = await fetch('http://localhost:8080/books');
    const books = await result.json();
    setBooks(books);
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="App">
      <h2>Public Library</h2>
      <h3>Books</h3>
      <div>
        {books?.map((book) => {
          return (
            <div>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.genre}</p>
              <p>{book.checkedOut}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;

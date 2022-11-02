import '../App.css';
import { Book } from '../BookModels';

interface BookItemProps {
  book: Book;
}

export function BookItem({book}: BookItemProps) {
  return (
    <tr>
      <td className='book-title'>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td>{book.checkedOut ? 'Checked Out' : 'Available'}</td>
    </tr>
  )
}
import '../App.css';
import { Book } from '../BookModels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface BookItemProps {
  book: Book;
  openDeleteModal: (book: Book) => void
  openCreateOrEditModal: (book: Book) => void
}

export function BookItem({book, openDeleteModal, openCreateOrEditModal}: BookItemProps) {
  return (
    <tr>
      <td className='book-title'>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td>{book.checkedOut ? 'Checked Out' : 'Available'}</td>
      <td className='book-actions'>
        <button className='icon-button' onClick={() => openCreateOrEditModal(book)}>
          <FontAwesomeIcon icon={faPen} size='lg'/>
        </button>
        <button className='icon-button' onClick={() => openDeleteModal(book)}>
          <FontAwesomeIcon icon={faTrash} size='lg'/>
        </button>
      </td>
    </tr>
  )
}
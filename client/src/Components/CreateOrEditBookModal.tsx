import { Book } from "../BookModels";
import '../App.css';

interface CreateOrEditBookModalProps {
  book?: Book | undefined;
  open: boolean;
  onClose: () => void;
}

export function CreateOrEditBookModal({book, open, onClose}: CreateOrEditBookModalProps) {
  return (
    <div className='modal-wrap' style={open ? {display: 'flex'} : {display: 'none'}}>
      <div className='modal-body'>
        <h4>{book ? `Edit ${book.title}` : 'Add New Book'}</h4>
        <div className='modal-btn-wrap'>
          <button onClick={onClose} className='modal-cancel-btn'>Cancel</button>
          <button className='add-modal-btn'>Add</button>
        </div>
      </div>
    </div>
  )
}
import { Book } from "../BookModels";
import '../App.css';

interface DeleteModalProps {
  book: Book | undefined;
  open: boolean;
  onClose: () => void;
}

export function DeleteModal({book, open, onClose}: DeleteModalProps) {

  return (
    <div className='modal-wrap' style={open ? {display: 'flex'} : {display: 'none'}}>
      <div className='modal-body'>
        <h4>Are you sure you want to delete "{book?.title}"?</h4>
        <div className='modal-btn-wrap'>
          <button onClick={onClose} className='modal-cancel-btn'>Cancel</button>
          <button className='delete-modal-delete-btn'>Delete</button>
        </div>
      </div>
    </div>
  )
}
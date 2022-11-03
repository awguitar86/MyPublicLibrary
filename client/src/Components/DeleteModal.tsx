import { Book } from "../BookModels";
import '../App.css';

interface DeleteModalProps {
  book: Book | undefined;
  open: boolean;
  onClose: () => void;
}

export function DeleteModal({book, open, onClose}: DeleteModalProps) {

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8080/books/${book?.id}`, {
        method: 'DELETE'
      })
      if (res) {
        onClose()
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='modal-wrap' style={open ? {display: 'flex'} : {display: 'none'}}>
      <div className='modal-body'>
        <h4>Are you sure you want to delete "{book?.title}"?</h4>
        <div className='modal-btn-wrap'>
          <button onClick={onClose} className='modal-cancel-btn'>Cancel</button>
          <button className='delete-modal-delete-btn' onClick={handleSubmit}>Delete</button>
        </div>
      </div>
    </div>
  )
}
import  { useState, useEffect } from 'react';
import { Book } from "../BookModels";
import Switch from "react-switch";
import '../App.css';
import { GenreSelect } from './GenreSelect';

interface CreateOrEditBookModalProps {
  book?: Book | undefined;
  open: boolean;
  onClose: () => void;
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateOrEditBookModal({book, open, onClose, isSuccess, setIsSuccess}: CreateOrEditBookModalProps) {
  const [bookData, setBookData] = useState({checkedOut: false} as Book);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    if (book) {
      setBookData(book);
      setSelectedGenre(book.genre);
    }
  }, [book])

  const onSelectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGenre(value);
  };

  const handleSubmit = async () => {
    try {
      if (book?.id) {
        const res = await fetch(`http://localhost:8080/books/${book.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...bookData, genre: selectedGenre})
        })
        if (res) {
          setIsSuccess(true)
          setSelectedGenre('')
        }
      }
      if (!book?.id) {
        const res = await fetch(`http://localhost:8080/books`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...bookData, genre: selectedGenre})
        })
        if (res) {
          setIsSuccess(true)
          setSelectedGenre('')
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='modal-wrap' style={open ? {display: 'flex'} : {display: 'none'}}>
      {!isSuccess ? (
        <div className='modal-body'>
          <h3 style={{margin: '0px 0px 20px 0px'}}>{book?.id ? `Edit "${book.title}"` : 'Add New Book'}</h3>
          <div className='modal-inputs-wrap'>
            <div className='modal-input-wrap'>
              <label>Title</label>
              <input
                value={bookData.title || ''}
                onChange={(e) => setBookData((prev) => ({...prev, title: e.target.value}))}/>
            </div>
            <div className='modal-input-wrap'>
              <label>Author</label>
              <input
                value={bookData.author || ''}
                onChange={(e) => setBookData((prev) => ({...prev, author: e.target.value}))}
                />
            </div>
            <div className='modal-input-wrap' style={{margin: '10px 0px'}}>
              <GenreSelect
                onChange={onSelectGenre}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                defaultText='Select Genre'
                iconClassName='create-edit-genre-select-icon'
              />
            </div>
            <div className='modal-switch-wrap'>
              <label>Available</label>
              <Switch
                onChange={() => setBookData((prev) => ({
                  ...prev,
                  checkedOut: !prev.checkedOut
                }))}
                checked={bookData?.checkedOut ? false : true}
                height={20}
                width={46}
                handleDiameter={16}
              />
            </div>
          </div>
          <div className='create-edit-modal-btn-wrap'>
            <button
              onClick={() => {
                onClose();
                setSelectedGenre('');
              }}
              className='modal-cancel-btn'
            >
              Cancel
            </button>
            <button className='add-modal-btn' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      ) : (
        <div className='modal-body'>
          <h4 style={{color: '#1C9C9C'}}>Success!</h4>
          <div className='modal-btn-wrap'>
            <button onClick={onClose} className='modal-cancel-btn'>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
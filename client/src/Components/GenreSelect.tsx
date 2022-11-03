import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface GenreSelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
  defaultText: string;
  iconClassName: string;
}

export function GenreSelect({
  onChange,
  selectedGenre,
  setSelectedGenre,
  defaultText,
  iconClassName
}: GenreSelectProps) {
  return (
    <div style={{position: 'relative'}}>
      <select onChange={onChange} className='book-list-select' value={selectedGenre}>
        <option value='' disabled>{defaultText}</option>
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
        id={iconClassName}
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
  )
}
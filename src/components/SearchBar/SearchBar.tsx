import './styles.css';

interface SearchBarProps {
  setSearchMovie: (value: ((prevState: string) => string) | string) => void;
}

function SearchBar({ setSearchMovie }: Readonly<SearchBarProps>) {
  return (
    <div className="searchbar">
      <input placeholder="Rechercher un film..." onChange={(e) => setSearchMovie(e.target.value)} />
    </div>
  );
}

export default SearchBar;

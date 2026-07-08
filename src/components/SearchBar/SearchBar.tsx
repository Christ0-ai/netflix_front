import { Input } from '@heroui/react';

interface SearchBarProps {
  setSearchMovie: (value: ((prevState: string) => string) | string) => void;
}

function SearchBar({ setSearchMovie }: Readonly<SearchBarProps>) {
  return (
    <div className="flex justify-center">
      <Input
        aria-label="Name"
        className="w-1/6"
        placeholder="Rechercher un film..."
        onChange={(e) => setSearchMovie(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;

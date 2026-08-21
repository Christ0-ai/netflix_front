import netflixLogo from '@/assets/images/logo-netflix.svg';
import { AddMovieDrawer } from '@/components/AddMovie/AddMovieDrawer';
import React from 'react';
import { useNavigate } from 'react-router';

function Header() {
  const [isOpen, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <div className="flex justify-between gap-4">
          <img src={netflixLogo} width={100} alt="Logo" onClick={() => navigate(`/`)} />
          <AddMovieDrawer isOpen={isOpen} onOpenChange={setOpen} />
        </div>
      </nav>
    </>
  );
}

export default Header;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';

interface HeaderProps {
  favoriteCount: number;
  onShowFavorites?: () => void;
  showingFavorites?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  favoriteCount,
  onShowFavorites,
  showingFavorites
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-foreground border-b border-foreground/80 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">WG-Zimmerbörse</h1>
              <p className="text-xs text-muted font-medium">Finde dein perfektes WG-Zimmer</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            {isHomePage && onShowFavorites && (
              <button
                onClick={onShowFavorites}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  showingFavorites
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-lg shadow-rose-500/10'
                    : 'bg-primary/30 text-muted border border-primary/40 hover:bg-primary/50 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${showingFavorites ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Favoriten</span>
                {favoriteCount > 0 && (
                  <span className="bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {favoriteCount}
                  </span>
                )}
              </button>
            )}
            {!isHomePage && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/30 text-muted border border-primary/40">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Favoriten</span>
                {favoriteCount > 0 && (
                  <span className="bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {favoriteCount}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

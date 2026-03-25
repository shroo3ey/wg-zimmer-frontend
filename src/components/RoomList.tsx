import { Home } from 'lucide-react';
import React from 'react';
import { RoomCard } from './RoomCard';
import { Room } from '../types/Room';

interface RoomListProps {
  rooms: Room[];
  onToggleFavorite: (roomId: string) => void;
  favorites: Set<string>;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showingFavorites: boolean;
  onShowFavorites: () => void;
}

export const RoomList: React.FC<RoomListProps> = ({
  rooms,
  onToggleFavorite,
  favorites,
  sortBy,
  onSortChange,
  showingFavorites,
  onShowFavorites
}) => {
  return (
    <div className="flex-1">
      {/* Sort Controls */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">
            <span className="text-primary">{rooms.length}</span> {rooms.length === 1 ? 'Zimmer gefunden' : 'Zimmer gefunden'}
          </h2>
          <button
            onClick={onShowFavorites}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              showingFavorites
                ? 'bg-rose-500/10 text-rose-600 border border-rose-200 shadow-sm'
                : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-800'
            }`}
          >
            {showingFavorites ? 'Alle anzeigen' : 'Nur Favoriten'}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted font-medium">Sortieren:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-primary focus:border-primary text-foreground font-medium"
          >
            <option value="rent-asc">Miete (niedrig → hoch)</option>
            <option value="rent-desc">Miete (hoch → niedrig)</option>
            <option value="size-desc">Größe (groß → klein)</option>
            <option value="size-asc">Größe (klein → groß)</option>
            <option value="date-desc">Verfügbar ab (neueste)</option>
            <option value="date-asc">Verfügbar ab (älteste)</option>
          </select>
        </div>
      </div>

      {/* Room Grid */}
      {rooms.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Home className="w-10 h-10 text-muted" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Keine Zimmer gefunden</h3>
          <p className="text-muted max-w-md mx-auto">
            Versuchen Sie, Ihre Filter anzupassen oder den Suchbegriff zu ändern.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.has(room.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

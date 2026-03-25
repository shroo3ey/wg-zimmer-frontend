import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Wifi, Car, Dog, ChevronLeft, ChevronRight, Home, Bath, Heart } from 'lucide-react';
import { Room } from '../types/Room';

interface RoomCardProps {
  room: Room;
  onToggleFavorite: (roomId: string) => void;
  isFavorite: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onToggleFavorite,
  isFavorite
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden group card-stagger animate-fade-in-up">
      {/* Image Gallery */}
      <div className="relative h-56 overflow-hidden">
        <Link to={`/room/${room.id}`} className="absolute inset-0">
          <img
            src={room.images[currentImageIndex]}
            alt={room.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </Link>

        {/* Image Navigation */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-foreground rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-foreground rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {room.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(room.id)}
          className={`absolute top-3 right-3 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 shadow-lg ${
            isFavorite
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/90 backdrop-blur-sm text-slate-400 hover:text-rose-500 hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-foreground text-white px-3 py-1.5 rounded-xl font-bold text-sm shadow-lg shadow-foreground/30">
          {room.rent} €/Monat
        </div>
      </div>

      {/* Content */}
      <Link to={`/room/${room.id}`} className="block p-5">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {room.title}
        </h3>

        <div className="flex items-center text-muted mb-4">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" />
          <span className="text-sm font-medium">{room.district}, {room.city}</span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-foreground bg-background rounded-lg px-3 py-2">
            <Home className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">{room.size} m²</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground bg-background rounded-lg px-3 py-2">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">{room.roommates}/{room.totalRoommates} WG</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground bg-background rounded-lg px-3 py-2">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">{formatDate(room.availableFrom)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground bg-background rounded-lg px-3 py-2">
            <Bath className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">+{room.utilities} € NK</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {room.features.furnished && (
            <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-lg font-medium border border-emerald-200">
              Möbliert
            </span>
          )}
          {room.features.balcony && (
            <span className="bg-background text-primary text-xs px-2.5 py-1 rounded-lg font-medium border border-primary/25">
              Balkon
            </span>
          )}
          {room.features.garden && (
            <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-lg font-medium border border-emerald-200">
              Garten
            </span>
          )}
          {room.features.parking && (
            <span className="bg-background text-foreground text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 border border-muted/30">
              <Car className="w-3 h-3" />
              Parkplatz
            </span>
          )}
          {room.features.pets && (
            <span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 border border-amber-200">
              <Dog className="w-3 h-3" />
              Haustiere
            </span>
          )}
          {room.features.wlan && (
            <span className="bg-background text-primary text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 border border-primary/25">
              <Wifi className="w-3 h-3" />
              WLAN
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

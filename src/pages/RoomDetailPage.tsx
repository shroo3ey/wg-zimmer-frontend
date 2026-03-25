import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Calendar, ChevronRight, Home, Bath, Wifi, Car, Dog, Cigarette, Utensils, WashingMachine as Washing, TreePine, BanIcon as Balcony, Heart, Mail, Phone, User, ChevronLeft } from 'lucide-react';
import { useRoom } from '../hooks/useRooms';
import { useFavorites } from '../hooks/useFavorites';
import { ContactModal } from '../components/ContactModal';
import { MapComponent } from '../components/MapComponent';
import { Room } from '../types/Room';

export const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Fetch room from API
  const { room, loading, error } = useRoom(id || '');

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted font-medium">Zimmer wird geladen...</p>
        </div>
      </div>
    );
  }

  // Show error or not found state
  if (error || !room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-10 border border-slate-200 shadow-lg max-w-md mx-4 animate-fade-in">
          <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            {error ? 'Fehler beim Laden' : 'Zimmer nicht gefunden'}
          </h1>
          <p className="text-muted mb-6">
            {error || 'Das gesuchte Zimmer existiert nicht oder wurde entfernt.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-foreground text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-primary/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.has(room.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const handleContact = (room: Room) => {
    setSelectedRoom(room);
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedRoom(null);
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'wlan': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'pets': return <Dog className="w-4 h-4" />;
      case 'smoking': return <Cigarette className="w-4 h-4" />;
      case 'dishwasher': return <Utensils className="w-4 h-4" />;
      case 'washingMachine': return <Washing className="w-4 h-4" />;
      case 'garden': return <TreePine className="w-4 h-4" />;
      case 'balcony': return <Balcony className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const getFeatureLabel = (feature: string) => {
    switch (feature) {
      case 'furnished': return 'Möbliert';
      case 'balcony': return 'Balkon';
      case 'garden': return 'Garten';
      case 'parking': return 'Parkplatz';
      case 'pets': return 'Haustiere erlaubt';
      case 'smoking': return 'Rauchen erlaubt';
      case 'wlan': return 'WLAN';
      case 'dishwasher': return 'Spülmaschine';
      case 'washingMachine': return 'Waschmaschine';
      default: return feature;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl hover:bg-background transition-all duration-200 group"
              >
                <ArrowLeft className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-foreground truncate">{room.title}</h1>
                <p className="text-sm text-muted flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {room.district}, {room.city}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleFavorite(room.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                  isFavorite
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 hover:bg-background text-muted'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="text-sm font-semibold">
                  {isFavorite ? 'Gespeichert' : 'Speichern'}
                </span>
              </button>
              <button
                onClick={() => handleContact(room)}
                className="bg-primary hover:bg-foreground text-white px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30"
              >
                Kontaktieren
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative h-[420px] bg-slate-200 rounded-2xl overflow-hidden mb-8 group">
              <img
                src={room.images[currentImageIndex]}
                alt={room.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Image Navigation */}
              {room.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-foreground rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-foreground rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {room.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Price Badge */}
              <div className="absolute top-4 left-4 bg-foreground text-white px-5 py-2.5 rounded-xl font-bold text-xl shadow-lg shadow-foreground/30">
                {room.rent} €/Monat
              </div>
            </div>

            {/* Basic Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <Home className="w-7 h-7" />, value: `${room.size} m²`, label: 'Zimmergröße', color: 'text-primary' },
                { icon: <Users className="w-7 h-7" />, value: `${room.roommates}/${room.totalRoommates}`, label: 'Mitbewohner', color: 'text-emerald-500' },
                { icon: <Calendar className="w-7 h-7" />, value: formatDate(room.availableFrom).split(' ')[0], label: 'Verfügbar ab', color: 'text-primary' },
                { icon: <Bath className="w-7 h-7" />, value: `€${room.utilities}`, label: 'Nebenkosten', color: 'text-muted' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 text-center hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <div className={`${item.color} mx-auto mb-3 flex justify-center`}>{item.icon}</div>
                  <div className="font-bold text-xl text-foreground">{item.value}</div>
                  <div className="text-sm text-muted font-medium">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Beschreibung</h2>
              <p className="text-foreground/80 leading-relaxed">{room.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Ausstattung</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(room.features).map(([feature, available]) => (
                  <div
                    key={feature}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                      available
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-background border-slate-200 text-muted'
                    }`}
                  >
                    {getFeatureIcon(feature)}
                    <span className="font-medium">{getFeatureLabel(feature)}</span>
                    {available ? (
                      <span className="ml-auto text-emerald-500 font-bold text-lg">&#10003;</span>
                    ) : (
                      <span className="ml-auto text-slate-300 text-lg">&#10007;</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {room.amenities.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Besonderheiten</h2>
                <div className="flex flex-wrap gap-3">
                  {room.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-background text-primary px-4 py-2 rounded-xl font-semibold text-sm border border-primary/25"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Lage</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">{room.address}</div>
                  <div className="text-muted text-sm">{room.district}, {room.city}</div>
                </div>
              </div>

              {/* Mini Map */}
              <div className="h-48 w-full rounded-xl overflow-hidden border border-slate-200">
                <MapComponent
                  address={room.address}
                  city={room.city}
                  district={room.district}
                  title={room.title}
                  lat={room.lat}
                  lng={room.lng}
                  compact={true}
                />
              </div>
            </div>

            {/* Financial Details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Kosten & Konditionen</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted">Kaltmiete</span>
                  <span className="font-semibold text-foreground">€{room.rent}/Monat</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted">Nebenkosten</span>
                  <span className="font-semibold text-foreground">€{room.utilities}/Monat</span>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Gesamtmiete</span>
                    <span className="font-bold text-primary text-xl">€{room.rent + room.utilities}/Mo.</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted">Kaution</span>
                  <span className="font-semibold text-foreground">€{room.deposit}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted">Mindestmietdauer</span>
                  <span className="font-semibold text-foreground">{room.minStay} Monate</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted">Verfügbar ab</span>
                  <span className="font-semibold text-foreground">{formatDate(room.availableFrom)}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Anbieter</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">{room.contact.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted" />
                  <span className="text-foreground/80">{room.contact.email}</span>
                </div>
                {room.contact.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted" />
                    <span className="text-foreground/80">{room.contact.phone}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleContact(room)}
                className="w-full bg-primary hover:bg-foreground text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30"
              >
                Nachricht senden
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        room={selectedRoom}
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
      />
    </div>
  );
};

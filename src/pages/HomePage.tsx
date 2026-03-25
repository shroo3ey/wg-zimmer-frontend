import React, { useState } from 'react';
import { FilterSidebar } from '../components/FilterSidebar';
import { RoomList } from '../components/RoomList';
import { ContactModal } from '../components/ContactModal';
import { useRoomFilters } from '../hooks/useRoomFilters';
import { useFavorites } from '../hooks/useFavorites';
import { useRooms } from '../hooks/useRooms';
import { Room } from '../types/Room';
import { Search, MapPin, Users, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showingFavorites, setShowingFavorites] = useState(false);

  // Fetch rooms from API
  const { rooms: apiRooms, loading, error } = useRooms();

  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filters,
    setFilters,
    filteredAndSortedRooms
  } = useRoomFilters(apiRooms);

  const { favorites, toggleFavorite } = useFavorites();

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedRoom(null);
  };

  const handleShowFavorites = () => {
    setShowingFavorites(!showingFavorites);
  };

  // Get rooms to display based on whether we're showing favorites
  const roomsToDisplay = showingFavorites
    ? filteredAndSortedRooms.filter(room => favorites.has(room.id))
    : filteredAndSortedRooms;

  // Show loading state
  if (loading) {
    return (
      <>
        <div className="bg-gradient-to-br from-foreground via-primary to-foreground py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-12 h-12 border-4 border-muted border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted font-medium">Zimmer werden geladen...</p>
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center bg-white rounded-2xl p-10 border border-red-200 shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">!</span>
            </div>
            <div className="text-lg font-bold text-red-600 mb-2">Fehler beim Laden der Zimmer</div>
            <div className="text-slate-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-foreground via-primary to-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-muted/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-muted" />
              <span className="text-sm font-medium text-muted">Dein neues Zuhause wartet</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Finde dein perfektes WG-Zimmer
            </h1>

            <p className="text-lg text-muted mb-8 max-w-xl mx-auto leading-relaxed">
              Durchsuche Angebote in den beliebtesten Städten Deutschlands und finde die WG, die zu dir passt.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-muted">
                <Search className="w-4 h-4 text-muted" />
                <span><strong className="text-white">{apiRooms.length}</strong> Zimmer</span>
              </div>
              <div className="flex items-center gap-2 text-muted">
                <MapPin className="w-4 h-4 text-muted" />
                <span><strong className="text-white">{new Set(apiRooms.map(r => r.city)).size}</strong> Städte</span>
              </div>
              <div className="flex items-center gap-2 text-muted">
                <Users className="w-4 h-4 text-muted" />
                <span><strong className="text-white">100%</strong> verifiziert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 translate-y-1 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-auto fill-background">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {/* Main Content */}
          <RoomList
            rooms={roomsToDisplay}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showingFavorites={showingFavorites}
            onShowFavorites={handleShowFavorites}
          />
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        room={selectedRoom}
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
      />
    </>
  );
};

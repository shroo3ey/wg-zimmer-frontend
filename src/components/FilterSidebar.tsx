import React from 'react';
import { FilterOptions } from '../types/Room';
import { Search, SlidersHorizontal, Home, MapPin, Euro, Wifi, Car, Dog } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle,
  searchTerm,
  onSearchChange
}) => {
  const cities = ['München', 'Berlin', 'Hamburg', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig'];

  const handleCityToggle = (city: string) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter(c => c !== city)
      : [...filters.cities, city];

    onFiltersChange({ ...filters, cities: newCities });
  };

  const handleBooleanFilter = (key: keyof FilterOptions, value: boolean | null) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 hover:bg-background transition-all duration-300 font-medium text-foreground shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          Filter
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className={`${
        isOpen ? 'block' : 'hidden'
      } lg:block fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-full bg-white border-r lg:border-r-0 lg:border border-slate-200 rounded-2xl p-6 z-40 overflow-y-auto shadow-sm animate-fade-in`}>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-foreground mb-2">
            Suche
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Titel, Stadt, Stadtteil..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background placeholder-muted text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Euro className="w-4 h-4 text-muted" />
            Miete (€/Monat)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minRent || ''}
              onChange={(e) => onFiltersChange({
                ...filters,
                minRent: Number(e.target.value) || 0
              })}
              className="px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxRent || ''}
              onChange={(e) => onFiltersChange({
                ...filters,
                maxRent: Number(e.target.value) || 2000
              })}
              className="px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background text-sm"
            />
          </div>
        </div>

        {/* Room Size */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Home className="w-4 h-4 text-primary" />
            Zimmergröße (m²)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minSize || ''}
              onChange={(e) => onFiltersChange({
                ...filters,
                minSize: Number(e.target.value) || 0
              })}
              className="px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxSize || ''}
              onChange={(e) => onFiltersChange({
                ...filters,
                maxSize: Number(e.target.value) || 100
              })}
              className="px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background text-sm"
            />
          </div>
        </div>

        {/* Cities */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Städte
          </label>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {cities.map(city => (
              <label key={city} className="flex items-center cursor-pointer px-2 py-1.5 rounded-lg hover:bg-background transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={filters.cities.includes(city)}
                  onChange={() => handleCityToggle(city)}
                  className="rounded border-slate-300 text-primary focus:ring-primary mr-2.5"
                />
                <span className="text-sm text-foreground font-medium">{city}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-foreground mb-3">
            Ausstattung
          </label>
          <div className="space-y-2.5">
            {[
              { key: 'furnished' as const, label: 'Möbliert', icon: null },
              { key: 'balcony' as const, label: 'Balkon', icon: null },
              { key: 'parking' as const, label: 'Parkplatz', icon: <Car className="w-3.5 h-3.5 text-muted" /> },
              { key: 'pets' as const, label: 'Haustiere', icon: <Dog className="w-3.5 h-3.5 text-muted" /> },
            ].map(({ key, label, icon }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-foreground font-medium flex items-center gap-1.5">
                  {icon}
                  {label}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleBooleanFilter(key, null)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-200 ${
                      filters[key] === null
                        ? 'bg-slate-200 text-foreground'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    Alle
                  </button>
                  <button
                    onClick={() => handleBooleanFilter(key, true)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-200 ${
                      filters[key] === true
                        ? 'bg-primary text-white shadow-sm shadow-primary/30'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    Ja
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => {
            onFiltersChange({
              minRent: 0,
              maxRent: 2000,
              cities: [],
              minSize: 0,
              maxSize: 100,
              furnished: null,
              balcony: null,
              pets: null,
              parking: null
            });
            onSearchChange('');
          }}
          className="w-full bg-background hover:bg-muted/20 text-foreground border border-slate-200 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
        >
          Filter zurücksetzen
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

import { useState, useMemo } from 'react';
import { Room, FilterOptions } from '../types/Room';

export const useRoomFilters = (rooms: Room[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rent-asc');
  const [filters, setFilters] = useState<FilterOptions>({
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

  const filteredAndSortedRooms = useMemo(() => {
    let filtered = rooms.filter(room => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          room.title.toLowerCase().includes(searchLower) ||
          room.city.toLowerCase().includes(searchLower) ||
          room.district.toLowerCase().includes(searchLower) ||
          room.description.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Price filter
      if (room.rent < filters.minRent || room.rent > filters.maxRent) {
        return false;
      }

      // Size filter
      if (room.size < filters.minSize || room.size > filters.maxSize) {
        return false;
      }

      // Cities filter
      if (filters.cities.length > 0 && !filters.cities.includes(room.city)) {
        return false;
      }

      // Boolean feature filters
      if (filters.furnished !== null && room.features.furnished !== filters.furnished) {
        return false;
      }

      if (filters.balcony !== null && room.features.balcony !== filters.balcony) {
        return false;
      }

      if (filters.pets !== null && room.features.pets !== filters.pets) {
        return false;
      }

      if (filters.parking !== null && room.features.parking !== filters.parking) {
        return false;
      }

      return true;
    });

    // Sort rooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rent-asc':
          return a.rent - b.rent;
        case 'rent-desc':
          return b.rent - a.rent;
        case 'size-asc':
          return a.size - b.size;
        case 'size-desc':
          return b.size - a.size;
        case 'date-asc':
          return new Date(a.availableFrom).getTime() - new Date(b.availableFrom).getTime();
        case 'date-desc':
          return new Date(b.availableFrom).getTime() - new Date(a.availableFrom).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [rooms, searchTerm, filters, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filters,
    setFilters,
    filteredAndSortedRooms
  };
};
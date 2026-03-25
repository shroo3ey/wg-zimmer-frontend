import { useState, useEffect } from 'react';
import type { Room } from '../types/Room';
import { mockRooms } from '../data/mockRooms';

export interface UseRoomsReturn {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseRoomReturn {
  room: Room | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Hook to fetch all rooms (using mock data)
export const useRooms = (): UseRoomsReturn => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    // Simulate a brief loading delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    setRooms(mockRooms);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    refetch: fetchRooms,
  };
};

// Hook to fetch a single room by ID (using mock data)
export const useRoom = (id: string): UseRoomReturn => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoom = async () => {
    if (!id) {
      setRoom(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    // Simulate a brief loading delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    const found = mockRooms.find((r) => r.id === id) || null;
    if (!found) {
      setError('Zimmer nicht gefunden.');
    }
    setRoom(found);
    setLoading(false);
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  return {
    room,
    loading,
    error,
    refetch: fetchRoom,
  };
};
import { Room } from '../types/Room';

export const mockRooms: Room[] = [
  {
    id: '1',
    title: 'Helles WG-Zimmer in Schwabing',
    city: 'München',
    district: 'Schwabing',
    address: 'Leopoldstraße 25',
    rent: 650,
    size: 18,
    availableFrom: '2025-02-01',
    roommates: 2,
    totalRoommates: 3,
    description: 'Schönes, helles Zimmer in einer 4-Zimmer-WG in bester Lage von Schwabing. Die Wohnung verfügt über eine voll ausgestattete Küche, ein großes Bad und einen gemütlichen Wohnbereich.',
    amenities: ['Küche voll ausgestattet', 'Schnelles WLAN', 'Waschmaschine', 'Balkon'],
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg'
    ],
    contact: {
      name: 'Anna Müller',
      email: 'anna.mueller@email.com',
      phone: '+49 151 12345678'
    },
    features: {
      furnished: true,
      balcony: true,
      garden: false,
      parking: false,
      pets: false,
      smoking: false,
      wlan: true,
      dishwasher: true,
      washingMachine: true
    },
    utilities: 80,
    deposit: 1300,
    minStay: 6
  },
  {
    id: '2',
    title: 'Gemütliches Zimmer in Kreuzberg',
    city: 'Berlin',
    district: 'Kreuzberg',
    address: 'Oranienstraße 42',
    rent: 480,
    size: 15,
    availableFrom: '2025-01-15',
    roommates: 1,
    totalRoommates: 2,
    description: 'Zentral gelegenes Zimmer in einer entspannten 3er-WG. Nur 5 Minuten zur U-Bahn und mitten im lebendigen Kreuzberg mit vielen Bars und Restaurants.',
    amenities: ['Zentrale Lage', 'U-Bahn Nähe', 'Lebendiges Viertel', 'Entspannte WG'],
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
      'https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg'
    ],
    contact: {
      name: 'Max Schmidt',
      email: 'max.schmidt@email.com'
    },
    features: {
      furnished: false,
      balcony: false,
      garden: true,
      parking: true,
      pets: true,
      smoking: false,
      wlan: true,
      dishwasher: false,
      washingMachine: true
    },
    utilities: 60,
    deposit: 960,
    minStay: 12
  },
  {
    id: '3',
    title: 'Studentenzimmer in Uni-Nähe',
    city: 'Hamburg',
    district: 'Eimsbüttel',
    address: 'Grindelallee 15',
    rent: 390,
    size: 12,
    availableFrom: '2025-03-01',
    roommates: 3,
    totalRoommates: 4,
    description: 'Perfekt für Studenten! Nur 10 Minuten zur Universität Hamburg. Große Küche, zwei Bäder und sehr nette Mitbewohner aus verschiedenen Studiengängen.',
    amenities: ['Uni-Nähe', 'Studenten-WG', 'Große Küche', 'Zwei Bäder'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'
    ],
    contact: {
      name: 'Lisa Weber',
      email: 'lisa.weber@student.uni-hamburg.de'
    },
    features: {
      furnished: true,
      balcony: false,
      garden: false,
      parking: false,
      pets: false,
      smoking: false,
      wlan: true,
      dishwasher: true,
      washingMachine: true
    },
    utilities: 45,
    deposit: 780,
    minStay: 6
  },
  {
    id: '4',
    title: 'Modernes Zimmer mit Balkon',
    city: 'Köln',
    district: 'Ehrenfeld',
    address: 'Venloer Straße 88',
    rent: 520,
    size: 20,
    availableFrom: '2025-02-15',
    roommates: 1,
    totalRoommates: 2,
    description: 'Neu renoviertes Zimmer in moderner 3-Zimmer-Wohnung. Großer Balkon mit Südausrichtung, hochwertige Ausstattung und sehr ruhige Lage trotz zentraler Anbindung.',
    amenities: ['Neu renoviert', 'Südbalkon', 'Ruhige Lage', 'Moderne Ausstattung'],
    images: [
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
    ],
    contact: {
      name: 'Tom Fischer',
      email: 'tom.fischer@email.com',
      phone: '+49 177 98765432'
    },
    features: {
      furnished: true,
      balcony: true,
      garden: false,
      parking: true,
      pets: false,
      smoking: false,
      wlan: true,
      dishwasher: true,
      washingMachine: true
    },
    utilities: 70,
    deposit: 1040,
    minStay: 12
  },
  {
    id: '5',
    title: 'Zimmer in alter Villa',
    city: 'Frankfurt',
    district: 'Westend',
    address: 'Beethovenstraße 12',
    rent: 580,
    size: 22,
    availableFrom: '2025-01-20',
    roommates: 2,
    totalRoommates: 3,
    description: 'Charmantes Zimmer in historischer Villa mit hohen Decken und Stuck. Großer Garten und sehr ruhige Wohnlage im begehrten Westend.',
    amenities: ['Historisches Gebäude', 'Hohe Decken', 'Großer Garten', 'Ruhige Lage'],
    images: [
      'https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    contact: {
      name: 'Sarah Klein',
      email: 'sarah.klein@email.com'
    },
    features: {
      furnished: false,
      balcony: false,
      garden: true,
      parking: true,
      pets: true,
      smoking: false,
      wlan: true,
      dishwasher: true,
      washingMachine: true
    },
    utilities: 85,
    deposit: 1160,
    minStay: 6
  },
  {
    id: '6',
    title: 'Stylisches Loft-Zimmer',
    city: 'Stuttgart',
    district: 'Mitte',
    address: 'Königstraße 55',
    rent: 620,
    size: 25,
    availableFrom: '2025-02-10',
    roommates: 1,
    totalRoommates: 2,
    description: 'Großzügiges Zimmer in stylischer Loft-Wohnung im Zentrum von Stuttgart. Industrieller Charme trifft auf moderne Ausstattung. Perfekt für junge Berufstätige.',
    amenities: ['Loft-Charakter', 'Zentrale Lage', 'Modern ausgestattet', 'Große Fenster'],
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg'
    ],
    contact: {
      name: 'David Bauer',
      email: 'david.bauer@email.com',
      phone: '+49 162 87654321'
    },
    features: {
      furnished: true,
      balcony: true,
      garden: false,
      parking: false,
      pets: false,
      smoking: false,
      wlan: true,
      dishwasher: true,
      washingMachine: true
    },
    utilities: 75,
    deposit: 1240,
    minStay: 12
  }
];
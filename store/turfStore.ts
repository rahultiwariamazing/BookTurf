/**
 * Turf catalog store.
 *
 * The current implementation relies on mock seed data to keep
 * the booking flow testable during UI and feature development.
 */
import { create } from 'zustand';
import { Turf, TurfSettings } from '../types/schema';

interface TurfStore {
    turfs: Turf[];
    getTurfById: (id: string) => Turf | undefined;
}

const MOCK_SETTINGS: TurfSettings = {
    id: 'set-1',
    turfId: 't-1',
    maxPlayers: 22,
    minPricePerHour: 1200, // Box Cricket standard
    perPersonMin: 60,
    perPersonMax: 200,
    cancelWindowHrs: 8,
    refundPercent: 80,
    scoreRetentionHrs: 48,
    footagePickupHrs: 48,
    scoreboardRateHr: 100,
    cameraRateHr: 300,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    updatedBy: null,
    isDeleted: false,
};

const MOCK_TURFS: Turf[] = [
    {
        id: 't-1',
        ownerUserId: 'u-1',
        name: 'Eden Gardens Box Cricket',
        city: 'Bangalore',
        address: '12, 80ft Road, Koramangala 4th Block',
        lat: 12.9352,
        lng: 77.6245,
        indoor: true,
        active: true,
        amenities: [
            { id: 'a-1', turfId: 't-1', name: 'Parking', createdAt: '', updatedAt: '', updatedBy: null, isDeleted: false },
            { id: 'a-2', turfId: 't-1', name: 'Change Room', createdAt: '', updatedAt: '', updatedBy: null, isDeleted: false },
            { id: 'a-3', turfId: 't-1', name: 'Water Cooler', createdAt: '', updatedAt: '', updatedBy: null, isDeleted: false },
            { id: 'a-4', turfId: 't-1', name: 'Floodlights', createdAt: '', updatedAt: '', updatedBy: null, isDeleted: false },
        ],
        photos: [
            { id: 'p-1', turfId: 't-1', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80', sortOrder: 1, createdAt: '', updatedAt: '', updatedBy: null, isDeleted: false },
            { id: 'p-2', turfId: 't-1', url: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&q=80', sortOrder: 2, createdAt: '', updatedAt: '', updatedBy: null, isDeleted: false },
        ],
        settings: MOCK_SETTINGS,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: null,
        isDeleted: false,
    },
    {
        id: 't-2',
        ownerUserId: 'u-2',
        name: 'Lords Turf Arena',
        city: 'Bangalore',
        address: 'Near Metro Station, Indiranagar',
        lat: 12.9784,
        lng: 77.6408,
        indoor: false,
        active: true,
        amenities: [
            { id: 'a-5', turfId: 't-2', name: 'Parking', createdAt: '', updatedAt: '', updatedBy: null, isDeleted: false },
            { id: 'a-6', turfId: 't-2', name: 'Washroom', createdAt: '', updatedAt: '', updatedBy: null, isDeleted: false },
        ],
        settings: { ...MOCK_SETTINGS, id: 'set-2', turfId: 't-2', minPricePerHour: 1400 },
        photos: [
            { id: 'p-3', turfId: 't-2', url: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&q=80', sortOrder: 1, createdAt: '', updatedAt: '', updatedBy: null, isDeleted: false },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: null,
        isDeleted: false,
    }
];

export const useTurfStore = create<TurfStore>((set, get) => ({
    turfs: MOCK_TURFS,
    // Helper selector used by detail and booking flows.
    getTurfById: (id) => get().turfs.find((t) => t.id === id),
}));

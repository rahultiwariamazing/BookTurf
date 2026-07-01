/**
 * Domain schema for the Turf booking and scoring application.
 *
 * These interfaces define the contract used by screens and stores.
 * All timestamps are serialized as ISO 8601 strings.
 */
export type UUID = string;
export type DateTime = string; // ISO 8601

export interface BaseEntity {
    id: UUID;
    createdAt: DateTime;
    updatedAt: DateTime;
    updatedBy: UUID | null;
    isDeleted: boolean;
}

// 1) Users & Access
export interface User extends BaseEntity {
    phone: string;
    email: string | null;
    name: string | null;
    photoUrl: string | null;
    city: string | null;
    status: 'active' | 'suspended' | 'pending';
}

export interface Role extends BaseEntity {
    name: 'admin' | 'owner' | 'player' | 'scorer';
}

// 2) Turf & Configuration
export interface Turf extends BaseEntity {
    ownerUserId: UUID;
    name: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
    indoor: boolean;
    active: boolean;
    // Relations
    amenities?: TurfAmenity[];
    photos?: TurfPhoto[];
    settings?: TurfSettings;
}

export interface TurfAmenity extends BaseEntity {
    turfId: UUID;
    name: string;
}

export interface TurfPhoto extends BaseEntity {
    turfId: UUID;
    url: string;
    sortOrder: number;
}

export interface TurfSettings extends BaseEntity {
    turfId: UUID;
    maxPlayers: number;
    minPricePerHour: number;
    perPersonMin: number;
    perPersonMax: number;
    cancelWindowHrs: number;
    refundPercent: number;
    scoreRetentionHrs: number;
    footagePickupHrs: number;
    scoreboardRateHr: number;
    cameraRateHr: number;
}

// 4) Booking & Payments
export interface Booking extends BaseEntity {
    turfId: UUID;
    leaderUserId: UUID;
    date: string; // YYYY-MM-DD
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    playersCount: number;
    perPersonPriceApplied: number;
    minSlotPriceApplied: number;
    baseAmount: number;
    hours: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface BookingPlayer extends BaseEntity {
    bookingId: UUID;
    userId: UUID;
    role: 'leader' | 'player' | 'guest';
    canScore: boolean;
}

// 6) Scoring (Cricket)
export interface Match extends BaseEntity {
    bookingId: UUID;
    matchNo: number;
    oversLimit: number;
    ballsPerOver: number; // usually 6
    tossWinner: 'team_a' | 'team_b';
    electedTo: 'bat' | 'bowl';
    status: 'scheduled' | 'live' | 'completed' | 'abandoned';
    startedAt: DateTime | null;
    endedAt: DateTime | null;
}

export interface Ball extends BaseEntity {
    matchId: UUID;
    inningsNo: 1 | 2;
    overNo: number;
    ballNoLegal: number;
    ballSeq: number; // Absolute sequence for audit
    strikerId: UUID;
    nonStrikerId: UUID;
    bowlerId: UUID;
    runsBat: number;
    runsExtra: number;
    extraType: 'wide' | 'no_ball' | 'bye' | 'leg_bye' | 'penalty' | null;
    isLegal: boolean;
    isFreeHit: boolean;
    wicket: boolean;
    wicketType: 'bowled' | 'caught' | 'lbw' | 'run_out' | 'stumped' | 'hit_wicket' | null;
    playerOutId: UUID | null;
    totalAfterBall: number;
    scorerId: UUID;
}

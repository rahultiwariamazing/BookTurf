/**
 * In-memory live scoring store.
 *
 * It manages innings state, player strike, and over-by-over updates for
 * the scoring screens. Data is mock-backed for now and can be persisted later.
 */
import { create } from 'zustand';
import { Ball, Match } from '../types/schema';

// Mock Rosters
const TEAM_A_ROSTER = [
    { id: 'p1', name: 'Rahul T', isOut: false },
    { id: 'p2', name: 'Rohit S', isOut: false },
    { id: 'p3', name: 'Virat K', isOut: false },
];

const TEAM_B_ROSTER = [
    { id: 'p4', name: 'Brahma', isOut: false },
    { id: 'p5', name: 'Hardik', isOut: false },
];

interface TeamScore {
    runs: number;
    wickets: number;
    overs: number;
    balls: number; // total legal balls
}

interface MatchState {
    match: Match | null;
    battingTeam: 'team_a' | 'team_b';

    score: {
        team_a: TeamScore;
        team_b: TeamScore;
    };

    currentOver: Ball[];

    // Players on crease
    strikerId: string | null;
    nonStrikerId: string | null;
    bowlerId: string | null;

    // Rosters
    team_a_players: any[];
    team_b_players: any[];

    // Actions
    initMatch: (config: any) => void;
    recordBall: (runs: number, extras?: any, wicket?: any) => void;
    selectNewBatsman: (playerId: string) => void;
    swapStrike: () => void;
}

export const useMatchStore = create<MatchState>((set, get) => ({
    match: null,
    battingTeam: 'team_a',

    score: {
        team_a: { runs: 0, wickets: 0, overs: 0, balls: 0 },
        team_b: { runs: 0, wickets: 0, overs: 0, balls: 0 },
    },

    currentOver: [],
    strikerId: 'p1',
    nonStrikerId: 'p2',
    bowlerId: 'p4',

    team_a_players: TEAM_A_ROSTER,
    team_b_players: TEAM_B_ROSTER,

    // Initializes a match and derives first batting side from toss decision.
    initMatch: (config) => {
        set({
            match: { ...config, status: 'live' },
            battingTeam: config.tossWinner === 'team_a' ? (config.electedTo === 'bat' ? 'team_a' : 'team_b') : (config.electedTo === 'bat' ? 'team_b' : 'team_a'),
        });
    },

    // Swaps striker and non-striker, used on odd runs and over changes.
    swapStrike: () => {
        const { strikerId, nonStrikerId } = get();
        set({ strikerId: nonStrikerId, nonStrikerId: strikerId });
    },

    // Promotes a selected player as the incoming striker after a wicket.
    selectNewBatsman: (playerId) => {
        set({ strikerId: playerId });
    },

    recordBall: (runs, extras, wicket) => {
        const state = get();
        const battingTeam = state.battingTeam;
        const isLegal = !extras?.wide && !extras?.no_ball;
        const isRunOut = wicket?.type === 'run_out';

        // Calculate total run contribution including basic extra run rules.
        let runValue = runs;
        if (extras?.wide || extras?.no_ball) runValue += 1;

        // Update aggregate scoreboard counters.
        const currentScore = state.score[battingTeam];
        const newScore = {
            ...currentScore,
            runs: currentScore.runs + runValue,
            balls: isLegal ? currentScore.balls + 1 : currentScore.balls,
            wickets: wicket ? currentScore.wickets + 1 : currentScore.wickets
        };

        // Represent overs in common cricket format (e.g. 3.2 overs).
        newScore.overs = Math.floor(newScore.balls / 6) + (newScore.balls % 6) / 10;

        // Record ball event for current over timeline.
        const newBall: Ball = {
            id: Math.random().toString(),
            matchId: 'm-1',
            runsBat: runs,
            isLegal,
            ...extras,
            wicket: !!wicket
        } as any;

        const newOver = [...state.currentOver, newBall];

        set({
            score: { ...state.score, [battingTeam]: newScore },
            currentOver: newOver
        });

        // --- CORE LOGIC ---

        // 1. Wicket Handling
        if (wicket) {
            // Mark player out
            const roster = battingTeam === 'team_a' ? state.team_a_players : state.team_b_players;
            // Logic to update roster status would go here

            // If not runout (or runout striker), clear striker
            if (!isRunOut) { // Simply logic for V1
                set({ strikerId: null });
            }
            return; // Wait for new batsman selection
        }

        // 2. Strike Rotation (Odd Runs)
        if (runs % 2 !== 0) {
            state.swapStrike();
        }

        // 3. Over End
        if (isLegal && newScore.balls % 6 === 0) {
            state.swapStrike(); // Switch ends
            set({ currentOver: [] }); // Reset over view
            // Logic to rotate bowler would go here
        }
    },
}));

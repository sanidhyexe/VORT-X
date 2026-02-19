
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCommunities } from './community-context';

/**
 * @interface Announcement
 * @description Represents an official announcement made by a tournament host.
 * @property {number} id - Unique identifier for the announcement.
 * @property {string} content - The text of the announcement.
 * @property {string} timestamp - The ISO date string of when the announcement was made.
 */
export interface Announcement {
    id: number;
    content: string;
    timestamp: string;
}

/**
 * @interface Feedback
 * @description Represents feedback submitted by a participant for a finished tournament.
 * @property {string} participantName - The name of the participant who submitted the feedback.
 * @property {number} rating - The star rating given (1-5).
 * @property {string} comment - The textual comment.
 */
export interface Feedback {
    participantName: string;
    rating: number;
    comment: string;
}

/**
 * @interface KickRequest
 * @description Represents a request from one participant to kick another from a tournament.
 * @property {number} id - Unique identifier for the request.
 * @property {string} requestingPlayer - The player who made the request.
 * @property {string} playerToKick - The player who is the subject of the request.
 * @property {string} reason - The reason provided for the kick request.
 * @property {'pending' | 'approved' | 'rejected'} status - The current status of the request.
 */
export interface KickRequest {
    id: number;
    requestingPlayer: string;
    playerToKick: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
}

/**
 * @interface TeamMember
 * @description Represents a single member of a team.
 * @property {string} name - The in-game name of the team member.
 */
export interface TeamMember {
    name: string;
}

/**
 * @interface Registration
 * @description Represents a team's registration for a tournament.
 * @property {number} id - Unique identifier for the registration.
 * @property {string} teamName - The name of the registered team.
 * @property {string} contactEmail - A contact email for the team.
 * @property {TeamMember[]} members - An array of team members on the roster.
 * @property {string} date - The ISO date string of when the registration occurred.
 * @property {boolean} [feedbackSubmitted] - Flag indicating if feedback has been submitted for this registration.
 * @property {string} [rank] - The final rank of the team in the tournament.
 */
export interface Registration {
    id: number;
    teamName: string;
    contactEmail: string;
    members: TeamMember[];
    date: string;
    feedbackSubmitted?: boolean;
    rank?: string;
}

/**
 * @interface Tournament
 * @description Represents a single tournament event.
 * @property {number} id - Unique identifier for the tournament.
 * @property {string} name - The name of the tournament.
 * @property {string} game - The game the tournament is for.
 * @property {string} date - The ISO date string for the tournament's start time.
 * @property {number} prize - The prize pool amount.
 * @property {number} participants - The maximum number of participants/teams.
 * @property {'Open' | 'In Progress' | 'Finished'} status - The current status of the tournament.
 * @property {string} rules - The rules for the tournament.
 * @property {string} host - The name of the tournament host/organizer.
 * @property {Registration[]} registrations - An array of all team registrations.
 * @property {Feedback[]} feedback - An array of all feedback submitted for the tournament.
 * @property {KickRequest[]} kickRequests - An array of all player kick requests.
 * @property {Announcement[]} announcements - An array of all official announcements from the host.
 * @property {string | null} [bannerImage] - Optional URL for the tournament's banner image.
 * @property {string} [bannerImageHint] - Optional AI hint for the banner image.
 * @property {string | null} [logoImage] - Optional URL for the tournament's logo image.
 * @property {string} [logoImageHint] - Optional AI hint for the logo image.
 * @property {string} [gameId] - Optional ID for the game lobby.
 * @property {string} [gamePassword] - Optional password for the game lobby.
 * @property {boolean} [requireFullTeam] - Whether a full team roster is required for registration.
 */
export interface Tournament {
    id: number;
    name: string;
    game: string;
    date: string;
    prize: number;
    participants: number;
    status: 'Open' | 'In Progress' | 'Finished';
    rules: string;
    host: string;
    registrations: Registration[];
    feedback: Feedback[];
    kickRequests: KickRequest[];
    announcements: Announcement[];
    bannerImage?: string | null;
    bannerImageHint?: string;
    logoImage?: string | null;
    logoImageHint?: string;
    gameId?: string;
    gamePassword?: string;
    requireFullTeam?: boolean;
}

const initialTournaments: Tournament[] = [
    { 
        id: 1, 
        name: "Valorant Champions Tour: EMEA", 
        game: "Valorant",
        date: "2024-08-15T18:00", 
        prize: 5000, 
        participants: 16, 
        status: "Open",
        rules: "Standard VCT rules apply. All matches are best-of-3 until the finals (best-of-5).",
        host: "YUV-X",
        registrations: [
             { id: 3, teamName: "The Warlocks", contactEmail: "pro@gamer.com", members: [{name: "YUV-X"}], date: "2024-07-22T10:00:00Z" }
        ],
        feedback: [],
        kickRequests: [
            { id: 1, requestingPlayer: 'YUV-X', playerToKick: 'ToxicPlayer123', reason: 'Using abusive language in chat.', status: 'pending' }
        ],
        announcements: [
            { id: 1, content: 'Welcome to the tournament! Brackets will be finalized 1 hour before the start time.', timestamp: '2024-07-28T10:00:00Z' }
        ],
        bannerImage: "https://placehold.co/1200x300.png",
        bannerImageHint: "valorant tournament banner",
        logoImage: "https://placehold.co/128x128.png",
        logoImageHint: "valorant tournament logo",
        requireFullTeam: true,
    },
    { 
        id: 2, 
        name: "Spike Rush Weekly #23", 
        game: "Valorant",
        date: "2024-07-30T20:00", 
        prize: 500, 
        participants: 32, 
        status: "In Progress",
        rules: "Single elimination bracket. Fun first!",
        host: "Community",
        registrations: [
             { id: 2, teamName: "The Brawlers", contactEmail: "pro@gamer.com", members: [{name: "YUV-X"}, {name: "Teammate1"}], date: "2024-07-21T10:00:00Z" }
        ],
        feedback: [],
        kickRequests: [],
        announcements: [],
        bannerImage: "https://placehold.co/1200x300.png",
        bannerImageHint: "valorant tournament banner",
        logoImage: "https://placehold.co/128x128.png",
        logoImageHint: "valorant tournament logo",
        requireFullTeam: true,
    },
    { 
        id: 3, 
        name: "Community Clash: Valorant", 
        game: "Valorant",
        date: "2024-08-05T19:00", 
        prize: 1000, 
        participants: 64, 
        status: "Finished",
        rules: "Standard rules.",
        host: "YUV-X",
        registrations: [
            { id: 1, teamName: "The Champs", contactEmail: "pro@gamer.com", members: [{name: "YUV-X"}], date: "2024-07-20T10:00:00Z", rank: "3rd" }
        ],
        feedback: [
            { participantName: 'PlayerOne', rating: 5, comment: 'Great tournament, well organized!' },
            { participantName: 'PlayerTwo', rating: 4, comment: 'Was fun, but some matches started late.' },
        ],
        kickRequests: [],
        announcements: [],
        bannerImage: "https://placehold.co/1200x300.png",
        bannerImageHint: "valorant tournament banner",
        logoImage: "https://placehold.co/128x128.png",
        logoImageHint: "valorant tournament logo",
        requireFullTeam: true,
    },
    { 
        id: 4, 
        name: "LCS Summer Split", 
        game: "League of Legends",
        date: "2024-08-20T17:00", 
        prize: 200000, 
        participants: 8, 
        status: "Open",
        rules: "Official LCS rules.",
        host: "Riot Games",
        registrations: [],
        feedback: [],
        kickRequests: [],
        announcements: [],
        bannerImage: "https://placehold.co/1200x300.png",
        bannerImageHint: "league of legends tournament banner",
        logoImage: "https://placehold.co/128x128.png",
        logoImageHint: "league of legends tournament logo",
        requireFullTeam: true,
    },
    { 
        id: 5, 
        name: "Clash of Summoners", 
        game: "League of Legends",
        date: "2024-08-01T12:00", 
        prize: 1000, 
        participants: 128, 
        status: "Open",
        rules: "Community tournament rules.",
        host: "YUV-X",
        registrations: [],
        feedback: [],
        kickRequests: [],
        announcements: [],
        bannerImage: "https://placehold.co/1200x300.png",
        bannerImageHint: "league of legends tournament banner",
        logoImage: "https://placehold.co/128x128.png",
        logoImageHint: "league of legends tournament logo",
        requireFullTeam: false,
    },
];

/**
 * @interface TournamentContextType
 * @description Defines the shape of the context provided by TournamentProvider.
 */
interface TournamentContextType {
    tournaments: Tournament[];
    getTournamentById: (id: number) => Tournament | undefined;
    getTournamentsByGame: (gameTitle: string) => Tournament[];
    addTournament: (tournament: Omit<Tournament, 'id' | 'registrations' | 'feedback' | 'kickRequests' | 'announcements'>) => void;
    removeTournament: (id: number) => void;
    registerForTournament: (tournamentId: number, registration: Omit<Registration, 'id' | 'date'>) => void;
    addNotice: (tournamentId: number, notice: string) => void;
    addFeedback: (tournamentId: number, feedback: Feedback) => void;
    addKickRequest: (tournamentId: number, request: Omit<KickRequest, 'id' | 'status'>) => void;
    updateKickRequestStatus: (tournamentId: number, requestId: number, status: 'approved' | 'rejected') => void;
    updateTournamentMedia: (tournamentId: number, media: { logo: string | null; banner: string | null }) => void;
    addAnnouncement: (tournamentId: number, content: string) => void;
    sendTournamentCredentials: (tournamentId: number, gameId: string, gamePassword: string) => void;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

/**
 * Provides tournament-related state and actions to its children.
 * This manages creating, registering for, and managing tournaments, feedback, and more.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components that will consume the context.
 * @returns {JSX.Element} The provider component.
 */
export const TournamentProvider = ({ children }: { children: ReactNode }) => {
    const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments);
    const { toast } = useToast();
    const { addCommunity, postBotMessage } = useCommunities();


    /**
     * Retrieves a single tournament by its unique ID.
     * @param {number} id - The ID of the tournament to find.
     * @returns {Tournament | undefined} The found tournament or undefined if not found.
     */
    const getTournamentById = (id: number) => {
        return tournaments.find(t => t.id === id);
    };

    /**
     * Retrieves all tournaments for a specific game.
     * @param {string} gameTitle - The title of the game to filter by.
     * @returns {Tournament[]} An array of tournaments for the specified game.
     */
    const getTournamentsByGame = (gameTitle: string) => {
        return tournaments.filter(t => t.game === gameTitle);
    };

    /**
     * Adds a new tournament to the state and creates a corresponding community hub.
     * @param {Omit<Tournament, 'id' | 'registrations' | 'feedback' | 'kickRequests'>} tournament - The tournament data to add.
     */
    const addTournament = (tournament: Omit<Tournament, 'id' | 'registrations' | 'feedback' | 'kickRequests' | 'announcements'>) => {
        const newTournament: Tournament = { 
            ...tournament, 
            id: Date.now(), 
            registrations: [], 
            feedback: [],
            kickRequests: [],
            announcements: [],
        };
        setTournaments(prev => [newTournament, ...prev]);

        // Create a temporary community for the tournament when it's hosted
        addCommunity({
            name: tournament.name,
            description: `A temporary hub for the ${tournament.name} tournament.`,
            image: tournament.logoImage || "https://placehold.co/300x150.png",
            imageHint: tournament.logoImageHint || `${tournament.game} tournament`,
            type: 'tournament',
        });
    };
    
    /**
     * Removes a tournament from the state.
     * @param {number} id - The ID of the tournament to remove.
     */
    const removeTournament = (id: number) => {
        setTournaments(prev => prev.filter(t => t.id !== id));
    };

    /**
     * Registers a team for a tournament.
     * @param {number} tournamentId - The ID of the tournament to register for.
     * @param {Omit<Registration, 'id' | 'date'>} registration - The registration details.
     */
    const registerForTournament = (tournamentId: number, registration: Omit<Registration, 'id' | 'date'>) => {
        setTournaments(prev => prev.map(t => {
            if (t.id === tournamentId) {
                const newRegistration: Registration = {
                    ...registration,
                    id: Date.now(),
                    date: new Date().toISOString(),
                    members: registration.members || [],
                };
                const updatedRegistrations = [...t.registrations, newRegistration];
                
                toast({
                    title: `Successfully registered for ${t.name}!`,
                    description: `Your team "${registration.teamName}" is now in.`,
                });
                
                return { ...t, registrations: updatedRegistrations };
            }
            return t;
        }));
    };
    
    /**
     * Sends a notice to all tournament participants (mock implementation).
     * @param {number} tournamentId - The ID of the tournament.
     * @param {string} notice - The notice message.
     */
    const addNotice = (tournamentId: number, notice: string) => {
        const tournament = getTournamentById(tournamentId);
        if (tournament) {
            // In a real app, this would trigger push notifications to all participants.
            console.log(`Sending notice for tournament ${tournament.name}: "${notice}"`);
            // Here, we'll just show a toast to the host as a confirmation.
             toast({
                title: 'Notice Sent!',
                description: 'All registered participants have been notified.',
            });
        }
    }

    /**
     * Adds feedback to a finished tournament.
     * @param {number} tournamentId - The ID of the tournament.
     * @param {Feedback} feedback - The feedback object to add.
     */
    const addFeedback = (tournamentId: number, feedback: Feedback) => {
        setTournaments(prev => prev.map(t => {
            if (t.id === tournamentId) {
                 const updatedFeedback = [...t.feedback, feedback];
                 const updatedRegistrations = t.registrations.map(reg => 
                    reg.members.some(m => m.name === feedback.participantName) ? { ...reg, feedbackSubmitted: true } : reg
                 );
                 return { ...t, feedback: updatedFeedback, registrations: updatedRegistrations };
            }
            return t;
        }))
    }

    /**
     * Adds a player kick request to a tournament.
     * @param {number} tournamentId - The ID of the tournament.
     * @param {Omit<KickRequest, 'id' | 'status'>} request - The kick request details.
     */
    const addKickRequest = (tournamentId: number, request: Omit<KickRequest, 'id' | 'status'>) => {
        setTournaments(prev => prev.map(t => {
            if (t.id === tournamentId) {
                const newRequest: KickRequest = {
                    ...request,
                    id: Date.now(),
                    status: 'pending',
                };
                const updatedRequests = [...t.kickRequests, newRequest];
                return { ...t, kickRequests: updatedRequests };
            }
            return t;
        }));
    };
    
    /**
     * Updates the status of a player kick request.
     * @param {number} tournamentId - The ID of the tournament.
     * @param {number} requestId - The ID of the kick request to update.
     * @param {'approved' | 'rejected'} status - The new status.
     */
    const updateKickRequestStatus = (tournamentId: number, requestId: number, status: 'approved' | 'rejected') => {
        setTournaments(prev => prev.map(t => {
            if (t.id === tournamentId) {
                const updatedRequests = t.kickRequests.filter(req => req.id !== requestId);
                return { ...t, kickRequests: updatedRequests };
            }
            return t;
        }));
    };

    /**
     * Updates the banner and logo for a tournament.
     * @param {number} tournamentId - The ID of the tournament to update.
     * @param {{ logo: string | null; banner: string | null }} media - The new media URLs.
     */
    const updateTournamentMedia = (tournamentId: number, media: { logo: string | null; banner: string | null }) => {
        setTournaments(prev => prev.map(t => {
            if (t.id === tournamentId) {
                return {
                    ...t,
                    logoImage: media.logo,
                    bannerImage: media.banner,
                };
            }
            return t;
        }));
    };

    /**
     * Adds an announcement to a tournament.
     * @param {number} tournamentId - The ID of the tournament.
     * @param {string} content - The announcement message.
     */
    const addAnnouncement = (tournamentId: number, content: string) => {
        let tournamentName = '';
        const updatedTournaments = tournaments.map(t => {
            if (t.id === tournamentId) {
                tournamentName = t.name;
                const newAnnouncement: Announcement = {
                    id: Date.now(),
                    content,
                    timestamp: new Date().toISOString(),
                };
                // Add new announcements to the top of the list
                const updatedAnnouncements = [newAnnouncement, ...t.announcements];
                return { ...t, announcements: updatedAnnouncements };
            }
            return t;
        });
        setTournaments(updatedTournaments);

        if (tournamentName) {
            const botMessage = `**ANNOUNCEMENT:** ${content}. [View Tournament](/tournaments/${tournamentId})`;
            postBotMessage(tournamentName, botMessage);
        }

        toast({
            title: "Announcement Posted!",
            description: "Your announcement is now visible to all participants.",
        });
    };

    /**
     * Sends game credentials to a tournament's participants.
     * @param {number} tournamentId - The ID of the tournament.
     * @param {string} gameId - The ID of the game lobby.
     * @param {string} gamePassword - The password for the game lobby.
     */
    const sendTournamentCredentials = (tournamentId: number, gameId: string, gamePassword: string) => {
        let tournamentName = '';
        const updatedTournaments = tournaments.map(t => {
            if (t.id === tournamentId) {
                tournamentName = t.name;
                return { ...t, gameId, gamePassword };
            }
            return t;
        });
        setTournaments(updatedTournaments);

        if (tournamentName) {
            const botMessage = `**GAME CREDENTIALS SENT:**\nLobby details for the tournament have been sent out. Please check your dashboard for the ID and password.`;
            postBotMessage(tournamentName, botMessage);
        }

        toast({
            title: "Credentials Sent!",
            description: "All participants have been notified.",
        });
    }


    return (
        <TournamentContext.Provider value={{ tournaments, getTournamentById, getTournamentsByGame, addTournament, removeTournament, registerForTournament, addNotice, addFeedback, addKickRequest, updateKickRequestStatus, updateTournamentMedia, addAnnouncement, sendTournamentCredentials }}>
            {children}
        </TournamentContext.Provider>
    );
};

/**
 * A custom hook to easily access the TournamentContext.
 * @throws {Error} If used outside of a TournamentProvider.
 * @returns {TournamentContextType} The tournament context.
 */
export const useTournaments = () => {
    const context = useContext(TournamentContext);
    if (context === undefined) {
        throw new Error('useTournaments must be used within a TournamentProvider');
    }
    return context;
};

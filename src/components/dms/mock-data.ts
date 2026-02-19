
/**
 * @interface User
 * @description Represents a user profile in the application.
 * @property {string} id - Unique identifier for the user.
 * @property {string} name - The display name of the user.
 * @property {string} avatar - URL to the user's avatar image.
 * @property {boolean} online - The online status of the user.
 */
export interface User {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
}

/**
 * @constant mockUsers
 * @description An array of mock user data for demonstration purposes.
 */
export const mockUsers: User[] = [
    { id: 'user1', name: 'YUV-X', avatar: 'https://placehold.co/128x128.png', online: true },
    { id: 'user2', name: 'PixelPioneer', avatar: 'https://placehold.co/40x40.png', online: true },
    { id: 'user3', name: 'GlitchHunter', avatar: 'https://placehold.co/40x40.png', online: false },
    { id: 'user4', name: 'ValorantViper', avatar: 'https://placehold.co/40x40.png', online: true },
    { id: 'riot', name: 'Riot Games', avatar: 'https://placehold.co/40x40.png', online: true },
    { id: 'community', name: 'Community', avatar: 'https://placehold.co/40x40.png', online: true },
];

/**
 * @constant mockConversations
 * @description An array of mock conversation data for the Direct Messages page.
 */
export const mockConversations = [
    {
        id: 'convo1',
        participant: mockUsers.find(u => u.id === 'user2')!,
        messages: [
            { id: 1, sender: mockUsers.find(u => u.id === 'user2')!, content: 'Hey! Saw your platinum trophy for Cosmic Odyssey, that\'s awesome!', timestamp: '10:30 AM' },
            { id: 2, sender: mockUsers.find(u => u.id === 'user1')!, content: 'Thanks! It was a real grind but totally worth it. You should give it a try.', timestamp: '10:31 AM' },
            { id: 3, sender: mockUsers.find(u => u.id === 'user2')!, content: 'Definitely on my list. Need to finish up Neon Racer first. Found a bug that sends your car to space haha.', timestamp: '10:32 AM' },
        ],
        lastMessage: 'Definitely on my list. Need to finish up Neon Racer first. Found a bug that sends your car to space haha.',
        lastMessageTime: '10:32 AM',
        unreadCount: 2,
    },
    {
        id: 'convo2',
        participant: mockUsers.find(u => u.id === 'user3')!,
        messages: [
             { id: 1, sender: mockUsers.find(u => u.id === 'user3')!, content: 'Are you online for some Valorant later?', timestamp: 'Yesterday' },
             { id: 2, sender: mockUsers.find(u => u.id === 'user1')!, content: 'For sure, I\'ll be on around 8 PM. Let\'s get some ranks!', timestamp: 'Yesterday' },
        ],
        lastMessage: 'For sure, I\'ll be on around 8 PM. Let\'s get some ranks!',
        lastMessageTime: 'Yesterday',
        unreadCount: 0,
    },
    {
        id: 'convo3',
        participant: mockUsers.find(u => u.id === 'user4')!,
        messages: [
             { id: 1, sender: mockUsers.find(u => u.id === 'user4')!, content: 'That 1v5 clutch was insane!', timestamp: '2d ago' },
        ],
        lastMessage: 'That 1v5 clutch was insane!',
        lastMessageTime: '2d ago',
        unreadCount: 0,
    },
];

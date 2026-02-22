import type { Match } from '../types';

export const mockMatches: Match[] = [
    {
        id: 'm1',
        founderId: '1',
        matchedAt: '2024-01-15T10:30:00Z',
        messages: [
            {
                id: 'msg1',
                senderId: '1',
                receiverId: 'current',
                text: 'Hey! Loved your profile. Your vision for fintech aligns perfectly with my background. Would love to explore how we could complement each other!',
                timestamp: '2024-01-15T10:32:00Z',
                read: true,
            },
            {
                id: 'msg2',
                senderId: 'current',
                receiverId: '1',
                text: 'Hi Priya! Thanks for reaching out. I\'ve been building in the fintech space for 3 years now and your technical chops look amazing. When can we chat?',
                timestamp: '2024-01-15T11:00:00Z',
                read: true,
            },
            {
                id: 'msg3',
                senderId: '1',
                receiverId: 'current',
                text: 'How about a 30 min call this week? I can share my prototype and we can discuss the vision further.',
                timestamp: '2024-01-15T11:15:00Z',
                read: false,
            },
        ],
    },
    {
        id: 'm2',
        founderId: '3',
        matchedAt: '2024-01-14T15:00:00Z',
        messages: [
            {
                id: 'msg4',
                senderId: '3',
                receiverId: 'current',
                text: 'Hi! Your background in operations + business is exactly what my design-led startup needs. Let\'s build something meaningful!',
                timestamp: '2024-01-14T15:05:00Z',
                read: true,
            },
            {
                id: 'msg5',
                senderId: 'current',
                receiverId: '3',
                text: 'Sneha, your work on mental health UX is incredible. I\'ve been passionate about this space. Let\'s definitely talk!',
                timestamp: '2024-01-14T16:00:00Z',
                read: true,
            },
        ],
    },
    {
        id: 'm3',
        founderId: '5',
        matchedAt: '2024-01-13T09:00:00Z',
        messages: [
            {
                id: 'msg6',
                senderId: '5',
                receiverId: 'current',
                text: 'Hello! I see we\'re both interested in logistics. My operations background + your business skills could be a lethal combo!',
                timestamp: '2024-01-13T09:05:00Z',
                read: true,
            },
        ],
    },
];

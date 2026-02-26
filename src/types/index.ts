export type UserRole = 'Tech' | 'Business' | 'Design' | 'Operations';

export interface Founder {
    id: string;
    name: string;
    role: UserRole;
    location: string;
    education: string;
    yearsOfExperience: number;
    skills: string[];
    industries: string[];
    bio: string;
    startupVision: string;
    lookingFor: UserRole[];
    commitment: string;
    photoUrl?: string;
    age?: number;
    lastActive?: string;
}

export interface Match {
    id: string;
    founderId: string;
    matchedAt: string;
    messages: Message[];
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: string;
    read: boolean;
}

export type Role = 'Tech' | 'Business' | 'Design' | 'Operations' | 'Other';
export type Commitment = 'Full-time' | 'Part-time';
export type StartupStage = 'Idea' | 'MVP' | 'Early Revenue' | 'Growth' | 'Scale';

export interface Founder {
  id: string;
  name: string;
  age?: number;
  location: string;
  role: Role;
  education: string;
  yearsOfExperience: number;
  industries: string[];
  skills: string[];
  lookingFor: Role[];
  commitment: Commitment;
  startupVision: string;
  bio: string;
  photoUrl?: string;
  startupStage?: StartupStage;
  lastActive?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Match {
  id: string;
  founderId: string;
  matchedAt: string;
  messages: Message[];
}

export interface FilterOptions {
  location?: string;
  minExperience?: number;
  maxExperience?: number;
  education?: string;
  skills?: string[];
  industries?: string[];
  commitment?: Commitment;
  role?: Role;
  startupStage?: StartupStage;
}

export interface UserProfile extends Founder {
  email?: string;
  phone?: string;
  matchPreferences?: FilterOptions;
  visibility: boolean;
}

import type { Founder } from '../types';

export const mockFounders: Founder[] = [
    {
        id: '1',
        name: 'Arjun Nair',
        role: 'Tech',
        location: 'Bangalore, IN',
        education: 'IIT Madras',
        yearsOfExperience: 8,
        skills: ['Solidity', 'Rust', 'Distributed Systems'],
        industries: ['Web3', 'Supply Chain', 'FinTech'],
        bio: 'Ex-Stripe engineer building the next layer of trust in global supply chains. Looking for a growth-minded business partner.',
        startupVision: 'To decentralize the logistics backbone of emerging markets.',
        lookingFor: ['Business', 'Operations'],
        commitment: 'Full-time',
        age: 29
    },
    {
        id: '2',
        name: 'Sara Khan',
        role: 'Business',
        location: 'Mumbai, IN',
        education: 'IIM Ahmedabad',
        yearsOfExperience: 6,
        skills: ['GTM Strategy', 'Fundraising', 'B2B Sales'],
        industries: ['SaaS', 'EdTech'],
        bio: 'Scaled two SaaS startups from 0 to $10M ARR. Passionate about AI-driven productivity tools.',
        startupVision: 'Empowering small businesses with enterprise-grade AI.',
        lookingFor: ['Tech'],
        commitment: 'Full-time',
        age: 31
    },
    {
        id: '3',
        name: 'Vikram Seth',
        role: 'Design',
        location: 'Remote',
        education: 'NID Ahmedabad',
        yearsOfExperience: 5,
        skills: ['UI/UX', 'Product Design', 'Visual Branding'],
        industries: ['Consumer Tech', 'HealthTech'],
        bio: 'Award-winning designer with a focus on human-centric health interfaces. I believe design is the moat.',
        startupVision: 'Making preventive healthcare accessible through intuitive design.',
        lookingFor: ['Tech', 'Business'],
        commitment: 'Part-time',
        age: 27
    }
];

export const mockCurrentUser: Founder = {
    id: 'current',
    name: 'Kabir Dev',
    role: 'Operations',
    location: 'Delhi, IN',
    education: 'Stanford GSB',
    yearsOfExperience: 10,
    skills: ['Operations', 'Scaling', 'Supply Chain'],
    industries: ['Logistics', 'Retail'],
    bio: 'Operational leader with a track record in high-growth retail environments.',
    startupVision: 'Revolutionizing the last-mile delivery experience.',
    lookingFor: ['Tech', 'Design'],
    commitment: 'Full-time',
    age: 34
};

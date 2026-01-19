const mongoose = require('mongoose');
require('dotenv').config();

const Mood = require('../models/Mood.model');
const Persona = require('../models/Persona.model');
const ScentNote = require('../models/ScentNote.model');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Seeding database...');

        // Clear existing
        await Mood.deleteMany();
        await Persona.deleteMany();
        await ScentNote.deleteMany();

        // Moods
        const moods = await Mood.insertMany([
            {
                name: 'Calm',
                description: 'Peaceful and centered',
                color: '#A8D5E2',
                icon: 'leaf',
            },
            {
                name: 'Romantic',
                description: 'Soft, emotional and intimate',
                color: '#FFB6C1',
                icon: 'heart',
            },
            {
                name: 'Energetic',
                description: 'Vibrant and full of life',
                color: '#00CED1',
                icon: 'zap',
            },
            {
                name: 'Bold',
                description: 'Confident and powerful',
                color: '#FFA500',
                icon: 'fire',
            },
            {
                name: 'Mysterious',
                description: 'Deep, dark and intriguing',
                color: '#8B4789',
                icon: 'moon',
            },
            {
                name: 'Fresh',
                description: 'Clean and refreshing',
                color: '#E0FFFF',
                icon: 'wind',
            },
        ]);

        // Personas
        await Persona.insertMany([
            {
                name: 'The Minimalist',
                description: 'Clean, subtle and modern',
                characteristics: ['Clean', 'Subtle', 'Modern'],
            },
            {
                name: 'The Romantic',
                description: 'Emotional and expressive',
                characteristics: ['Soft', 'Passionate', 'Expressive'],
            },
            {
                name: 'The Free Spirit',
                description: 'Energetic and adventurous',
                characteristics: ['Energetic', 'Playful', 'Adventurous'],
            },
            {
                name: 'The Sophisticated',
                description: 'Elegant and mysterious',
                characteristics: ['Elegant', 'Deep', 'Refined'],
            },
            {
                name: 'The Adventurer', 
                description: 'Bold, curious, and thrill-seeking',
                characteristics: ['Bold', 'Curious', 'Fearless'],
            },
            {
                name: 'The Bold Visionary',
                description: 'Confident and powerful',
                characteristics: ['Confident', 'Fearless', 'Strong'],
            },
        ]);


        // Scent Notes
        // Scent Notes (aligned with Supabase schema)
        await ScentNote.insertMany([
            { name: 'Citrus', category: 'top', description: 'Bright, zesty citrus notes' },
            { name: 'Fruity', category: 'top', description: 'Sweet and juicy fruit notes' },
            { name: 'Green', category: 'top', description: 'Fresh green and herbal notes' },
            { name: 'Spicy', category: 'top', description: 'Warm and exotic spices' },

            { name: 'Floral', category: 'middle', description: 'Romantic floral heart notes' },
            { name: 'Woody', category: 'middle', description: 'Earthy and elegant woods' },
            { name: 'Aquatic', category: 'middle', description: 'Fresh water and marine notes' },
            { name: 'Gourmand', category: 'middle', description: 'Sweet edible notes like vanilla' },

            { name: 'Amber', category: 'base', description: 'Warm resinous amber notes' },
            { name: 'Musk', category: 'base', description: 'Soft sensual musk notes' },
            { name: 'Oriental', category: 'base', description: 'Rich oriental spice blends' },
            { name: 'Leather', category: 'base', description: 'Bold leather and smoky notes' },
        ]);


        console.log('Seeding completed');
        process.exit();
    } catch (error) {
        console.error('Seeding failed', error);
        process.exit(1);
    }
};

seedData();

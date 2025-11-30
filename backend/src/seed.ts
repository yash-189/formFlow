import mongoose from 'mongoose';
import { config } from './config';
import { connectDatabase } from './shared/database/connection';
import { FormModel } from './features/forms/models/form.model';
import { logger } from './shared/utils/logger';

const employeeOnboardingSchema = {
    title: 'Employee Onboarding',
    description: 'Please complete this form to begin your onboarding process',
    isActive: true,
    fields: [
        {
            id: 'fullName',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true,
            validation: {
                required: true,
                minLength: 2,
                maxLength: 100,
            },
        },
        {
            id: 'email',
            type: 'text',
            label: 'Email Address',
            placeholder: 'your.email@company.com',
            required: true,
            validation: {
                required: true,
                pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            },
        },
        {
            id: 'dateOfBirth',
            type: 'date',
            label: 'Date of Birth',
            placeholder: 'Select your date of birth',
            required: true,
            validation: {
                required: true,
                minDate: '1950-01-01',
            },
        },
        {
            id: 'department',
            type: 'select',
            label: 'Department',
            placeholder: 'Select your department',
            required: true,
            options: [
                { label: 'Engineering', value: 'engineering' },
                { label: 'Marketing', value: 'marketing' },
                { label: 'Sales', value: 'sales' },
                { label: 'Human Resources', value: 'hr' },
                { label: 'Finance', value: 'finance' },
            ],
            validation: {
                required: true,
            },
        },
        {
            id: 'yearsOfExperience',
            type: 'number',
            label: 'Years of Experience',
            placeholder: 'Enter years of experience',
            required: true,
            validation: {
                required: true,
                min: 0,
                max: 50,
            },
        },
        {
            id: 'skills',
            type: 'multi-select',
            label: 'Skills',
            placeholder: 'Select your skills',
            required: true,
            options: [
                { label: 'JavaScript', value: 'javascript' },
                { label: 'Python', value: 'python' },
                { label: 'Java', value: 'java' },
                { label: 'React', value: 'react' },
                { label: 'Node.js', value: 'nodejs' },
                { label: 'SQL', value: 'sql' },
                { label: 'DevOps', value: 'devops' },
                { label: 'UI/UX Design', value: 'design' },
            ],
            validation: {
                required: true,
                minSelected: 1,
                maxSelected: 5,
            },
        },
        {
            id: 'bio',
            type: 'textarea',
            label: 'Professional Bio',
            placeholder: 'Tell us about your professional background',
            required: false,
            validation: {
                maxLength: 500,
            },
        },
        {
            id: 'agreeToTerms',
            type: 'switch',
            label: 'I agree to the terms and conditions',
            required: true,
            validation: {
                required: true,
            },
        },
    ],
};

const seedDatabase = async () => {
    try {
        await connectDatabase(config.MONGODB_URI);

        // Clear existing forms
        await FormModel.deleteMany({});
        logger.info('Cleared existing forms');

        // Create Employee Onboarding form
        const form = await FormModel.create(employeeOnboardingSchema);
        logger.info(`Created Employee Onboarding form with ID: ${form._id}`);

        logger.info('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        logger.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();

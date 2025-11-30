# FormFlow Backend

A robust Node.js/Express backend for the FormFlow application.

## Overview

The backend provides a RESTful API for handling form submissions, validation, and retrieval. It uses a file-based storage system (JSON) for simplicity and portability, making it easy to deploy and manage without complex database dependencies.

## Architecture

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Storage**: JSON file storage (`data/submissions.json`)
- **Validation**: Zod schema validation

## API Endpoints

### GET /api/form-schema
Returns the dynamic form schema definition.

### POST /api/submit
Accepts form submissions.
- Validates input against schema
- Generates unique ID
- Stores submission with timestamp

### GET /api/submissions
Retrieves paginated submissions.
- Query params: `page`, `limit`

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript definitions
│   └── utils/          # Helper functions
├── data/               # Data storage
└── dist/               # Compiled output
```

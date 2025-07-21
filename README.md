# VanLife

A React-based web application for van rental services, allowing users to browse available vans, view details, and host their own vans.

## Features

- **User Authentication**: Login and registration system using Firebase Authentication
- **Van Browsing**: View all available vans with filtering options
- **Detailed Van Information**: Access detailed information about each van including pricing and photos
- **Host Dashboard**: For van owners to manage their vans and view analytics
- **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack

- **Frontend**: React, React Router
- **Backend**: Firebase (Authentication, Firestore)
- **Build Tool**: Vite
- **Styling**: CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/VanLifeOwn.git
   cd VanLifeOwn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
VanLifeOwn/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images and other assets
│   ├── pages/        # React components for pages
│   │   ├── Host/     # Host-related pages
│   │   │   └── VanDetails/  # Host van detail pages
│   │   └── Vans/     # Van-related pages
│   ├── utils/        # Utility functions and components
│   ├── App.jsx       # Main App component
│   ├── index.css     # Global styles
│   └── main.jsx      # Entry point
├── .env              # Environment variables (not tracked by git)
├── .gitignore        # Git ignore file
├── index.html        # HTML entry
├── package.json      # Project dependencies
├── vite.config.js    # Vite configuration
└── README.md         # Project documentation
```

## Usage

### Browsing Vans

- Navigate to the home page to see featured vans
- Click on "Find your van" to browse all available vans
- Use filters to narrow down your search

### User Authentication

- Register with email and password
- Login with existing credentials

### Hosting Vans

- Navigate to the Host section
- Add, edit, and manage your vans
- View your dashboard with income and review information

## Firebase Setup

This project uses Firebase for authentication and data storage. To set up Firebase:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
2. Set up Firebase Authentication with email/password provider
3. Create a Firestore database with the following collections:
   - `vans`: Stores information about available vans
4. Add your Firebase configuration to the `.env` file (see Installation section)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License.

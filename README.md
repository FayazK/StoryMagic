# StoryMagic

StoryMagic is an interactive desktop application for creating personalized children's bedtime stories with AI-generated text and illustrations. The app provides an intuitive interface for parents, teachers, and caregivers to create, customize, manage, and share beautiful stories tailored to their children's interests and developmental needs.

![StoryMagic App Logo](assets/images/logo.png)

## Features

### Story Creation
- **Guided Story Builder**: Step-by-step wizard interface
- **Smart Templates**: Preset story themes (space adventure, animal friends, fantasy kingdom)
- **Character Customization**: Personalize with names, appearance, and traits
- **Setting Selection**: Choose from various environments (forest, space, underwater, etc.)
- **Plot Elements**: Select themes like adventure, friendship, learning
- **Reading Level Adjustment**: Tailor vocabulary to your child's abilities
- **Story Length Options**: Short, medium, or long stories

### Story Generation & Customization
- **Real-time Preview**: See your story develop as you make choices
- **Interactive Editor**: Edit generated text with AI assistance
- **Custom Image Styles**: Choose from watercolor, cartoon, realistic, and more
- **Voice Narration**: Optional AI voice reading for accessibility

### Story Management
- **Library View**: Browse your stories with thumbnail previews
- **Organization Tools**: Favorites, tags, and search functionality
- **Reading History**: Track which stories have been read and when
- **Cloud Backup**: Optional synchronization between devices (premium)

### Export & Sharing
- **Multiple Formats**: Export as PDF, ePub, or printable pages
- **Social Sharing**: Share preview links with family members
- **Print-Ready Layout**: Optimized for home printing
- **Read-Along Mode**: Special viewing mode for tablets and mobile devices

## Tech Stack

- **Electron**: Cross-platform desktop framework
- **Vite**: Fast development and building
- **React + React Router**: UI components and navigation
- **Tailwind CSS**: Styling and responsive design
- **SQLite**: Local database storage
- **Google Gemini API**: AI text generation
- **Replicate API**: AI image generation

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- API keys for Google Gemini and Replicate

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/storymagic.git
   cd storymagic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the project root
   - Add your API keys:
     ```
     VITE_GEMINI_API_KEY=your_gemini_api_key
     VITE_REPLICATE_API_KEY=your_replicate_api_key
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Package the application:
   ```bash
   npm run package
   ```

## Usage

### Getting Started
1. Launch StoryMagic
2. Click on "Create New Story" from the dashboard
3. Follow the guided story builder to set up your story parameters
4. Preview and customize the generated story and illustrations
5. Save your story to your library

### Managing Your Stories
- Access your story library from the dashboard
- Use tags and favorites to organize your collection
- Track reading history and popular stories

### Exporting and Sharing
- Select a story from your library
- Click the "Export" button and choose your preferred format
- Use the "Share" option to create shareable links

## Configuration

### API Setup
- Navigate to Settings > API Configuration
- Enter your Google Gemini and Replicate API keys
- Test the connection to ensure proper setup

### Preferences
- Customize UI themes (light/dark/system)
- Set default story parameters
- Configure storage locations and backup options

## Subscription Plans

### Free Tier
- Limited stories per month
- Basic templates
- Standard AI models

### Premium Subscription
- Unlimited stories
- All templates and art styles
- Cloud backup and synchronization
- Advanced AI models for higher quality content

### Story Packs
- Themed template bundles with specialized illustrations

## Privacy and Security

StoryMagic is designed with privacy in mind:
- All processing and storage happens locally by default
- API keys are encrypted and stored securely
- Cloud features are optional and can be disabled
- No data is collected without explicit permission

## Development

### Project Structure
```
storymagic/
├── electron/         # Electron-specific code
├── src/
│   ├── api/          # API integrations
│   ├── assets/       # Static assets
│   ├── components/   # React components
│   ├── contexts/     # React contexts
│   ├── db/           # Database setup and operations
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Main application pages
│   ├── styles/       # Global styles
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main component
│   └── main.jsx      # Entry point
├── public/           # Public assets
└── vite.config.js    # Vite configuration
```

### Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

Built with ❤️ for bedtime storytellers everywhere.
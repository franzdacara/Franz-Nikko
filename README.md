# Nikko - Modern Portfolio Website

A futuristic, highly technical personal portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth parallax scrolling, glassmorphism effects, and neon accent colors.

## Features

- 🎨 Modern dark mode design with neon blue/purple accents
- ✨ Smooth parallax scrolling effects
- 🔮 Glassmorphism cards and UI elements
- 🎭 3D tilt effects and micro-interactions
- 📱 Fully responsive design
- ⚡ Built with Vite for fast development

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling via CDN
- **Vite** - Build tool
- **Lucide React** - Icon library

## Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
Franz-Nikko/
├── components/          # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Preloader.tsx
├── public/
│   └── images/         # Static images
├── App.tsx             # Main app component
├── constants.ts        # Site content and configuration
├── index.tsx           # Entry point
└── index.html          # HTML template
```

## Customization

Edit `constants.ts` to update:
- Personal information
- Project details
- Skills and technologies
- Social media links
- Contact information

## License

MIT License - feel free to use this for your own portfolio!

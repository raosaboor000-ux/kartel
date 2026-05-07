# Birthday Memory Universe

Interactive birthday website built with React, Tailwind CSS, and Framer Motion.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open the local Vite URL in your browser.

## Tech

- React functional components
- Tailwind CSS for styling
- Framer Motion for transitions and micro-interactions

## Project Structure

```text
src/
  components/
    Landing.jsx
    Galaxy.jsx
    Timeline.jsx
    GameModal.jsx
    AudioPlayer.jsx
    FinalSection.jsx
public/
  assets/
    images/
    videos/
    music.mp3
    voice.mp3
```

## Replace Placeholder Assets

Current code uses `/assets/images/placeholder.svg` for all timeline and ending visuals so the app runs immediately.

To personalize:

- Add real photos in `public/assets/images`
- Add videos in `public/assets/videos` and set `isVideo: true` in `src/App.jsx` memory data
- Add `music.mp3` and `voice.mp3` in `public/assets/`

Once those files exist, the floating music button and voice note button will play them.

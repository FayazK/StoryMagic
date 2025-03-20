import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowUturnLeftIcon,
  StarIcon as StarIconOutline,
  BookmarkIcon,
  Cog6ToothIcon,
  XMarkIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

// Mock story data
const storyData = {
  id: 1,
  title: 'Space Adventure with Luna',
  pages: [
    {
      id: 1,
      text: 'Once upon a time, there was a young girl named Luna who dreamed of exploring the stars. She would spend hours gazing at the night sky from her bedroom window, imagining all the wonderful places she might visit.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Luna+Stargazing'
    },
    {
      id: 2,
      text: 'One night, as Luna was about to fall asleep, a twinkling light appeared in her room. It grew brighter and brighter until—whoosh! A small, friendly alien named Zip stood before her, smiling warmly.',
      image: 'https://placehold.co/800x600/8b5cf6/ffffff?text=Zip+Appears'
    },
    {
      id: 3,
      text: '"Hello, Luna!" said Zip. "I\'ve come to take you on an adventure through space. Would you like to join me?" Luna couldn\'t believe her ears. "Yes, please!" she replied excitedly.',
      image: 'https://placehold.co/800x600/ec4899/ffffff?text=Luna+and+Zip'
    },
    {
      id: 4,
      text: "Zip pressed a button on his wrist, and a magical bubble formed around them. Slowly, they began to float up, up, up—straight through Luna's ceiling and into the night sky!",
      image: 'https://placehold.co/800x600/10b981/ffffff?text=Floating+Bubble'
    },
    {
      id: 5,
      text: 'Their first stop was the Moon. Luna bounced around on its dusty surface, making footprints next to the ones left by astronauts long ago. "I\'m walking on the Moon!" she cried joyfully.',
      image: 'https://placehold.co/800x600/f59e0b/ffffff?text=Luna+on+Moon'
    },
    {
      id: 6,
      text: 'Next, they zoomed to Mars, the red planet. Luna and Zip built a sandcastle with the rusty Martian soil and raced around the largest volcano in the solar system.',
      image: 'https://placehold.co/800x600/ef4444/ffffff?text=Mars+Adventures'
    },
    {
      id: 7,
      text: 'After Mars, they visited the rings of Saturn, sliding along the icy particles like they were on a cosmic playground. Luna had never had so much fun!',
      image: 'https://placehold.co/800x600/6366f1/ffffff?text=Saturn+Rings'
    },
    {
      id: 8,
      text: 'As they traveled farther into space, they came across a group of stars forming a beautiful pattern. "That\'s your constellation, Luna," Zip explained. "Every person has one. It\'s where your dreams are kept."',
      image: 'https://placehold.co/800x600/0ea5e9/ffffff?text=Luna+Constellation'
    },
    {
      id: 9,
      text: 'Finally, it was time to return home. Luna was sad to leave, but Zip promised to visit again. "Remember, Luna," he said, "the universe is full of wonders, and you can explore them all."',
      image: 'https://placehold.co/800x600/8b5cf6/ffffff?text=Saying+Goodbye'
    },
    {
      id: 10,
      text: 'When Luna woke up the next morning, she found a small, glowing star on her bedside table—a gift from Zip. Whenever she held it, she remembered her magical journey and smiled, knowing that someday, she would explore the stars again.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Magic+Star'
    }
  ],
  favorite: true,
  author: 'AI & You',
  dateCreated: '2025-01-10',
  lastRead: '2 days ago',
  readCount: 5
}

const StoryReader = () => {
  const { id } = useParams()
  const [story, setStory] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isNarrating, setIsNarrating] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [fontSize, setFontSize] = useState(1) // 1 is normal size

  // Get story data based on ID
  useEffect(() => {
    // In a real app, this would fetch from the database
    setStory(storyData)
  }, [id])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentPage < story?.pages.length - 1) {
        setCurrentPage((prev) => prev + 1)
      } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        setCurrentPage((prev) => prev - 1)
      } else if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, story, isFullscreen])

  // Toggle favorite status
  const toggleFavorite = () => {
    setStory((prev) => (prev ? { ...prev, favorite: !prev.favorite } : null))
  }

  // Toggle narration
  const toggleNarration = () => {
    setIsNarrating(!isNarrating)
    // In a real app, this would trigger text-to-speech
  }

  // Enter fullscreen mode
  const enterFullscreen = () => {
    const element = document.documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
    setIsFullscreen(true)
    setShowControls(false)
  }

  // Exit fullscreen mode
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    setIsFullscreen(false)
    setShowControls(true)
  }

  // Adjust font size
  const changeFontSize = (delta) => {
    setFontSize((prev) => {
      const newSize = prev + delta
      return Math.min(Math.max(newSize, 0.8), 1.5) // Limit between 0.8 and 1.5
    })
  }

  // If story hasn't loaded yet
  if (!story) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-lg bg-gray-200 dark:bg-gray-700 h-32 w-32 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2.5"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative min-h-screen ${isFullscreen ? 'bg-gray-900 text-white' : ''}`}>
      {/* Reader header with controls - shows only if not in fullscreen or if controls are shown */}
      {(showControls || !isFullscreen) && (
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/library"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowUturnLeftIcon className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{story.title}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage + 1} of {story.pages.length}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={story.favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {story.favorite ? (
                <StarIcon className="w-6 h-6 text-tertiary-400" />
              ) : (
                <StarIconOutline className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              )}
            </button>

            <button
              onClick={toggleNarration}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={isNarrating ? 'Stop narration' : 'Start narration'}
            >
              {isNarrating ? (
                <SpeakerXMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              ) : (
                <SpeakerWaveIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              )}
            </button>

            <button
              onClick={() => changeFontSize(-0.1)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Decrease font size"
              disabled={fontSize <= 0.8}
            >
              <MinusIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>

            <button
              onClick={() => changeFontSize(0.1)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Increase font size"
              disabled={fontSize >= 1.5}
            >
              <PlusIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>

            <button
              onClick={isFullscreen ? exitFullscreen : enterFullscreen}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isFullscreen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"
                  />
                )}
              </svg>
            </button>

            <Link
              to="/settings"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Cog6ToothIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </Link>
          </div>
        </div>
      )}

      {/* Reading progress bar */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full bg-primary-500 transition-all duration-300"
          style={{ width: `${((currentPage + 1) / story.pages.length) * 100}%` }}
        ></div>
      </div>

      {/* Story content */}
      <div
        className={`px-4 py-8 md:px-8 lg:px-16 max-w-5xl mx-auto ${isFullscreen ? 'pt-8' : ''}`}
        onClick={() => isFullscreen && setShowControls(!showControls)}
      >
        <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8 animate-fade-in">
          {/* Story illustration */}
          <div className="w-full lg:w-1/2">
            <img
              src={story.pages[currentPage].image}
              alt={`Illustration for page ${currentPage + 1}`}
              className="w-full h-auto rounded-xl shadow-xl object-cover aspect-[4/3]"
            />
          </div>

          {/* Story text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p
              className="text-gray-800 dark:text-gray-200 leading-relaxed"
              style={{ fontSize: `${fontSize * 1.25}rem` }}
            >
              {story.pages[currentPage].text}
            </p>
          </div>
        </div>
      </div>

      {/* Page navigation */}
      <div
        className={`fixed bottom-8 left-0 right-0 flex justify-center space-x-6 ${!showControls && isFullscreen ? 'opacity-0' : 'opacity-100'} transition-opacity`}
      >
        <button
          onClick={() => currentPage > 0 && setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
          className={`p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg ${
            currentPage === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label="Previous page"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <button
          onClick={() => currentPage < story.pages.length - 1 && setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === story.pages.length - 1}
          className={`p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg ${
            currentPage === story.pages.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label="Next page"
        >
          <ArrowRightIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Fullscreen toggle button in corner */}
      {isFullscreen && !showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-800/60 text-white backdrop-blur-sm hover:bg-gray-700/80 transition-all"
          aria-label="Show controls"
        >
          <Cog6ToothIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

export default StoryReader

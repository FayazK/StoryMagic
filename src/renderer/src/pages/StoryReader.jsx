import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  StarIcon as StarOutline,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

// Placeholder story data
const storyData = {
  id: 1,
  title: 'Space Adventure',
  isFavorite: true,
  pages: [
    {
      id: 1,
      text: "Once upon a time, there was a young astronaut named Alex who dreamed of exploring the stars. Every night, Alex would look up at the twinkling sky and wonder what adventures awaited beyond Earth's atmosphere.",
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+1'
    },
    {
      id: 2,
      text: 'One day, Alex built a special rocket ship in the backyard. It was painted red and blue, with shiny silver wings. "This will take me to the stars," Alex said with excitement.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+2'
    },
    {
      id: 3,
      text: "That night, when everyone was asleep, the rocket ship began to glow. Alex climbed inside and pressed the big green button labeled 'LAUNCH'. Whoosh! The rocket soared into the night sky.",
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+3'
    },
    {
      id: 4,
      text: 'Up, up, up went the rocket, past the clouds, past the moon, and into the stars. Alex gasped at the beautiful colors of space - purples, blues, and pinks swirled all around.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+4'
    },
    {
      id: 5,
      text: 'Suddenly, Alex spotted a small green planet. It looked friendly, so the rocket landed gently on its surface. The door opened with a hiss, and Alex stepped out to explore.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+5'
    },
    {
      id: 6,
      text: 'The green planet was filled with strange plants and friendly alien creatures. They welcomed Alex with glowing smiles. "Hello, Earth friend!" they said, offering sparkly space fruits.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+6'
    },
    {
      id: 7,
      text: 'Alex spent the day playing with the alien children, learning their games and teaching them Earth games too. They jumped higher than on Earth because the planet had special bouncy gravity.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+7'
    },
    {
      id: 8,
      text: 'When it was time to go home, the alien friends gave Alex a special glowing star to remember them by. "Come back soon!" they called as the rocket took off for Earth.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+8'
    },
    {
      id: 9,
      text: 'As the rocket approached Earth, Alex could see the blue oceans and green lands. "Home is beautiful too," Alex thought with a smile, clutching the glowing star gift.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+9'
    },
    {
      id: 10,
      text: 'The rocket landed softly in the backyard just as the sun was rising. Alex climbed into bed, tired but happy. That night, looking at the stars from the bedroom window, Alex whispered, "I\'ll visit again soon, my space friends." The end.',
      image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Space+Page+10'
    }
  ]
}

const StoryReader = () => {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isNightMode, setIsNightMode] = useState(false)
  const [isReadingAloud, setIsReadingAloud] = useState(false)
  const [isFavorite, setIsFavorite] = useState(storyData.isFavorite)

  // In a real implementation, we would fetch the story based on the ID
  // For now, we'll use our placeholder data
  const story = storyData
  const page = story.pages[currentPage]

  const goToNextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const toggleReadingAloud = () => {
    // In a real implementation, this would use the Web Speech API
    setIsReadingAloud(!isReadingAloud)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${isNightMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      {/* Header */}
      <header
        className={`py-3 px-4 flex items-center justify-between border-b ${isNightMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className="flex items-center">
          <Link to="/library" className="mr-4">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">{story.title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleFavorite} className="focus:outline-none">
            {isFavorite ? (
              <StarIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <StarOutline className="w-6 h-6" />
            )}
          </button>

          <button onClick={toggleReadingAloud} className="focus:outline-none">
            {isReadingAloud ? (
              <SpeakerWaveIcon className="w-6 h-6 text-primary-600" />
            ) : (
              <SpeakerXMarkIcon className="w-6 h-6" />
            )}
          </button>

          <button onClick={() => setIsNightMode(!isNightMode)} className="focus:outline-none">
            {isNightMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>

          <button onClick={toggleFullscreen} className="focus:outline-none">
            {isFullscreen ? (
              <ArrowsPointingInIcon className="w-6 h-6" />
            ) : (
              <ArrowsPointingOutIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Story Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div
          className={`max-w-4xl w-full rounded-lg overflow-hidden shadow-lg ${isNightMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          {/* Story Image */}
          <div className="relative">
            <img
              src={page.image}
              alt={`Illustration for page ${currentPage + 1}`}
              className="w-full h-auto"
            />
          </div>

          {/* Story Text */}
          <div className="p-6">
            <p
              className={`text-lg md:text-xl leading-relaxed ${isNightMode ? 'text-gray-100' : 'text-gray-800'}`}
            >
              {page.text}
            </p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between w-full max-w-4xl mt-6">
          <button
            onClick={goToPrevPage}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              currentPage === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="text-center">
            <span className={`font-medium ${isNightMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Page {currentPage + 1} of {story.pages.length}
            </span>
          </div>

          <button
            onClick={goToNextPage}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              currentPage === story.pages.length - 1
                ? 'opacity-50 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            disabled={currentPage === story.pages.length - 1}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Page Thumbnails */}
        <div className="w-full max-w-4xl mt-6 hidden md:block">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {story.pages.map((p, index) => (
              <button
                key={p.id}
                onClick={() => setCurrentPage(index)}
                className={`flex-shrink-0 w-16 h-20 border-2 rounded overflow-hidden focus:outline-none ${
                  currentPage === index
                    ? `border-primary-600 ${isNightMode ? 'ring-2 ring-primary-500' : 'ring-2 ring-primary-300'}`
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <img
                  src={p.image}
                  alt={`Thumbnail for page ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoryReader

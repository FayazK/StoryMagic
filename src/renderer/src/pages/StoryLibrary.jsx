import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ClockIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  BookOpenIcon,
  PencilIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

// Mock data for stories
const allStories = [
  {
    id: 1,
    title: 'Space Adventure with Luna',
    cover: 'https://placehold.co/160x200/3b82f6/ffffff?text=Space',
    lastRead: '2 days ago',
    dateCreated: '2025-01-10',
    tags: ['space', 'adventure', 'science'],
    favorite: true,
    pages: 12
  },
  {
    id: 2,
    title: 'Forest Friends Find a Home',
    cover: 'https://placehold.co/160x200/10b981/ffffff?text=Forest',
    lastRead: '1 week ago',
    dateCreated: '2025-02-15',
    tags: ['animals', 'friendship', 'nature'],
    favorite: true,
    pages: 8
  },
  {
    id: 3,
    title: 'Ocean Explorer: Deep Sea Discoveries',
    cover: 'https://placehold.co/160x200/0ea5e9/ffffff?text=Ocean',
    lastRead: 'Yesterday',
    dateCreated: '2025-02-28',
    tags: ['ocean', 'adventure', 'science'],
    favorite: false,
    pages: 15
  },
  {
    id: 4,
    title: 'The Magical Kingdom of Luminara',
    cover: 'https://placehold.co/160x200/8b5cf6/ffffff?text=Magic',
    lastRead: '3 days ago',
    dateCreated: '2025-03-05',
    tags: ['fantasy', 'magic', 'adventure'],
    favorite: false,
    pages: 10
  },
  {
    id: 5,
    title: 'Dinosaur Days',
    cover: 'https://placehold.co/160x200/ef4444/ffffff?text=Dinos',
    lastRead: '2 weeks ago',
    dateCreated: '2025-01-20',
    tags: ['dinosaurs', 'history', 'science'],
    favorite: true,
    pages: 9
  },
  {
    id: 6,
    title: 'The Little Robot',
    cover: 'https://placehold.co/160x200/6366f1/ffffff?text=Robot',
    lastRead: '1 month ago',
    dateCreated: '2025-01-05',
    tags: ['robots', 'technology', 'friendship'],
    favorite: false,
    pages: 11
  },
  {
    id: 7,
    title: 'Weather Wonders',
    cover: 'https://placehold.co/160x200/f59e0b/ffffff?text=Weather',
    lastRead: 'Never',
    dateCreated: '2025-03-12',
    tags: ['weather', 'science', 'learning'],
    favorite: false,
    pages: 7
  },
  {
    id: 8,
    title: "Lucy's First Day of School",
    cover: 'https://placehold.co/160x200/ec4899/ffffff?text=School',
    lastRead: '5 days ago',
    dateCreated: '2025-02-20',
    tags: ['school', 'friendship', 'emotions'],
    favorite: true,
    pages: 10
  }
]

// Tags extracted from story data
const allTags = [
  'space',
  'adventure',
  'science',
  'animals',
  'friendship',
  'nature',
  'ocean',
  'fantasy',
  'magic',
  'dinosaurs',
  'history',
  'robots',
  'technology',
  'weather',
  'learning',
  'school',
  'emotions'
]

const StoryLibrary = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [sortBy, setSortBy] = useState('dateCreated')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter and sort stories
  const filteredStories = allStories
    .filter((story) => {
      // Filter by search term
      const matchesSearch =
        searchTerm === '' ||
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      // Filter by tags
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => story.tags.includes(tag))

      // Filter by favorites
      const matchesFavorites = !showOnlyFavorites || story.favorite

      return matchesSearch && matchesTags && matchesFavorites
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === 'title') {
        return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      } else if (sortBy === 'dateCreated') {
        return sortOrder === 'asc'
          ? new Date(a.dateCreated) - new Date(b.dateCreated)
          : new Date(b.dateCreated) - new Date(a.dateCreated)
      } else if (sortBy === 'pages') {
        return sortOrder === 'asc' ? a.pages - b.pages : b.pages - a.pages
      }
      return 0
    })

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const toggleFavorite = (storyId) => {
    // In a real app, this would update the database
    console.log(`Toggle favorite for story ${storyId}`)
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Story Library</h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 py-2.5 w-full"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter button */}
          <button
            className={`btn ${filterOpen ? 'btn-primary' : 'btn-outline'} whitespace-nowrap`}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
            Filters
          </button>

          {/* View mode toggle */}
          <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <button
              className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter panel */}
      {filterOpen && (
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tag filters */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorites filter */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Options</h3>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyFavorites}
                    onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                  <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show only favorites
                  </span>
                </label>
              </div>
            </div>

            {/* Sort options */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Sort By</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input py-2"
                  >
                    <option value="dateCreated">Date Created</option>
                    <option value="title">Title</option>
                    <option value="pages">Pages</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="ml-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    aria-label={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Story grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <div key={story.id} className="story-card group relative">
              <div className="absolute top-2 right-2 z-10 flex space-x-1">
                <button
                  onClick={() => toggleFavorite(story.id)}
                  className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
                  aria-label={story.favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <StarIcon
                    className={`w-5 h-5 ${story.favorite ? 'text-tertiary-400' : 'text-gray-400'}`}
                  />
                </button>
              </div>

              <Link to={`/reader/${story.id}`} className="block">
                <div className="relative">
                  <img
                    src={story.cover}
                    alt={story.title}
                    className="w-full h-auto aspect-[4/5] object-cover rounded-t-lg"
                  />

                  {/* Add a gradient overlay at the bottom for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-lg text-white drop-shadow-md line-clamp-2">
                      {story.title}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-100 flex items-center drop-shadow-md">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {story.lastRead === 'Never' ? 'New' : `Read ${story.lastRead}`}
                      </p>
                      <p className="text-xs text-gray-100 drop-shadow-md">{story.pages} pages</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Quick action menu that appears on hover */}
              <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-3 left-0 right-0">
                <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-full shadow-lg p-1">
                  <Link
                    to={`/reader/${story.id}`}
                    className="p-1.5 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 dark:bg-primary-900/40 dark:text-primary-400 dark:hover:bg-primary-800/60"
                  >
                    <BookOpenIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/create/${story.id}`}
                    className="p-1.5 rounded-full bg-tertiary-100 text-tertiary-600 hover:bg-tertiary-200 dark:bg-tertiary-900/40 dark:text-tertiary-400 dark:hover:bg-tertiary-800/60"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Link>
                  <button className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400 dark:hover:bg-green-800/60">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Story list view */}
      {viewMode === 'list' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Story
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Tags
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Pages
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Last Read
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Created
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {filteredStories.map((story) => (
                <tr
                  key={story.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 relative">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={story.cover}
                          alt=""
                        />
                        {story.favorite && (
                          <StarIcon className="absolute -top-1 -right-1 w-4 h-4 text-tertiary-400" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {story.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {story.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {story.tags.length > 2 && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          +{story.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{story.pages}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      {story.lastRead === 'Never' ? (
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <CheckCircleIcon className="w-4 h-4 mr-1" /> New
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" /> {story.lastRead}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(story.dateCreated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <Link
                        to={`/reader/${story.id}`}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                        aria-label="Read"
                      >
                        <BookOpenIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/create/${story.id}`}
                        className="text-tertiary-600 hover:text-tertiary-900 dark:text-tertiary-400 dark:hover:text-tertiary-300"
                        aria-label="Edit"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Link>
                      <button
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                        aria-label="Download"
                      >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="inline-flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No stories found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            We couldn't find any stories matching your filters. Try adjusting your search or
            filters, or create a new story.
          </p>
          <Link to="/create" className="btn btn-primary inline-flex items-center">
            Create New Story
          </Link>
        </div>
      )}
    </div>
  )
}

export default StoryLibrary

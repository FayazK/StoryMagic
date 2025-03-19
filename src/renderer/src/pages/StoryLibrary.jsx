import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ListBulletIcon,
  Squares2X2Icon,
  ClockIcon,
  StarIcon as StarOutline
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

// Placeholder data for stories
const storiesData = [
  {
    id: 1,
    title: 'Space Adventure',
    cover: 'https://placehold.co/160x200/3b82f6/ffffff?text=Space',
    createdAt: '2025-02-10',
    lastRead: '2 days ago',
    isFavorite: true,
    tags: ['adventure', 'space', 'friendship']
  },
  {
    id: 2,
    title: 'Forest Friends',
    cover: 'https://placehold.co/160x200/10b981/ffffff?text=Forest',
    createdAt: '2025-01-15',
    lastRead: '1 week ago',
    isFavorite: false,
    tags: ['animals', 'friendship', 'nature']
  },
  {
    id: 3,
    title: 'Ocean Explorer',
    cover: 'https://placehold.co/160x200/0ea5e9/ffffff?text=Ocean',
    createdAt: '2025-03-01',
    lastRead: 'Yesterday',
    isFavorite: true,
    tags: ['adventure', 'ocean', 'discovery']
  },
  {
    id: 4,
    title: 'Magical Kingdom',
    cover: 'https://placehold.co/160x200/8b5cf6/ffffff?text=Magic',
    createdAt: '2025-02-20',
    lastRead: '3 days ago',
    isFavorite: false,
    tags: ['fantasy', 'magic', 'adventure']
  },
  {
    id: 5,
    title: 'Dinoland Adventure',
    cover: 'https://placehold.co/160x200/ef4444/ffffff?text=Dino',
    createdAt: '2025-01-25',
    lastRead: '2 weeks ago',
    isFavorite: false,
    tags: ['dinosaurs', 'adventure', 'prehistoric']
  },
  {
    id: 6,
    title: 'Superhero Day',
    cover: 'https://placehold.co/160x200/f59e0b/ffffff?text=Hero',
    createdAt: '2025-02-05',
    lastRead: '5 days ago',
    isFavorite: true,
    tags: ['superhero', 'action', 'courage']
  },
  {
    id: 7,
    title: 'The Lost Teddy',
    cover: 'https://placehold.co/160x200/6366f1/ffffff?text=Teddy',
    createdAt: '2025-03-05',
    lastRead: '4 days ago',
    isFavorite: false,
    tags: ['toys', 'adventure', 'friendship']
  },
  {
    id: 8,
    title: 'Moon Journey',
    cover: 'https://placehold.co/160x200/64748b/ffffff?text=Moon',
    createdAt: '2025-03-10',
    lastRead: 'Today',
    isFavorite: true,
    tags: ['space', 'science', 'adventure']
  }
]

const StoryLibrary = () => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Get all unique tags
  const allTags = [...new Set(storiesData.flatMap((story) => story.tags))]

  // Filter stories based on search term, tags, and favorites
  const filteredStories = storiesData.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((tag) => story.tags.includes(tag))
    const matchesFavorites = !showFavoritesOnly || story.isFavorite

    return matchesSearch && matchesTags && matchesFavorites
  })

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Story Library</h1>
        <Link to="/create" className="btn btn-base btn-primary">
          Create New Story
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search stories..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            className="btn btn-base btn-outline flex items-center"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FunnelIcon className="w-5 h-5 mr-2" />
            Filter
          </button>

          <div className="border-r border-gray-300 dark:border-gray-600 mx-1"></div>

          <button
            className={`p-2 rounded-md border ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <Squares2X2Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            className={`p-2 rounded-md border ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <ListBulletIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {filterOpen && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
          <div>
            <h3 className="text-lg font-medium mb-2">Filter Options</h3>

            <div className="mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
                <span>Show favorites only</span>
              </label>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stories Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredStories.map((story) => (
            <div key={story.id} className="card relative animate-slide-up">
              <Link to={`/reader/${story.id}`}>
                <img
                  src={story.cover}
                  alt={story.title}
                  className="w-full h-auto aspect-[4/5] object-cover"
                />
                <div className="absolute top-2 right-2">
                  {story.isFavorite ? (
                    <StarIcon className="w-6 h-6 text-yellow-400 drop-shadow-md" />
                  ) : (
                    <StarOutline className="w-6 h-6 text-white drop-shadow-md" />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {story.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {story.lastRead}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredStories.map((story) => (
            <div key={story.id} className="card p-3 flex animate-slide-up">
              <Link to={`/reader/${story.id}`} className="flex flex-grow">
                <img src={story.cover} alt={story.title} className="w-16 h-20 object-cover" />
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 dark:text-white">{story.title}</h3>
                    {story.isFavorite && <StarIcon className="w-5 h-5 text-yellow-400" />}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {story.lastRead}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            No stories found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || selectedTags.length > 0 || showFavoritesOnly
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first story'}
          </p>
          {!(searchTerm || selectedTags.length > 0 || showFavoritesOnly) && (
            <Link to="/create" className="btn btn-base btn-primary mt-4 inline-block">
              Create New Story
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default StoryLibrary

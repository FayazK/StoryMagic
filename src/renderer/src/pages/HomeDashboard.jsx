import { Link } from 'react-router-dom'
import {
  PlusCircleIcon,
  ClockIcon,
  BookmarkIcon,
  ArrowRightIcon, 
  BookOpenIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { StarIcon } from '@heroicons/react/24/solid'

// Placeholder data for recent stories
const recentStories = [
  {
    id: 1,
    title: 'Space Adventure',
    cover: 'https://placehold.co/160x200/3b82f6/ffffff?text=Space',
    lastRead: '2 days ago'
  },
  {
    id: 2,
    title: 'Forest Friends',
    cover: 'https://placehold.co/160x200/10b981/ffffff?text=Forest',
    lastRead: '1 week ago'
  },
  {
    id: 3,
    title: 'Ocean Explorer',
    cover: 'https://placehold.co/160x200/0ea5e9/ffffff?text=Ocean',
    lastRead: 'Yesterday'
  },
  {
    id: 4,
    title: 'Magical Kingdom',
    cover: 'https://placehold.co/160x200/8b5cf6/ffffff?text=Magic',
    lastRead: '3 days ago'
  }
]

// Placeholder data for templates with enhanced icons and descriptions
const templates = [
  {
    id: 1,
    title: 'Adventure',
    description: 'An exciting journey filled with challenges and discovery',
    icon: '🚀',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 2,
    title: 'Fantasy',
    description: 'Magical worlds with fantastical creatures and wonder',
    icon: '🧙‍♂️',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    title: 'Animals',
    description: 'Stories featuring friendly animals and their adventures',
    icon: '🦊',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 4,
    title: 'Learning',
    description: 'Educational stories that teach important concepts',
    icon: '📚',
    color: 'from-green-500 to-emerald-600'
  }
]

// Placeholder data for usage statistics
const usageStats = {
  storiesCreated: 12,
  storiesRead: 28,
  totalReadingTime: '4h 35m',
  favoriteTopic: 'Space Adventure'
}

const HomeDashboard = () => {
  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center">
            Welcome to StoryMagic 
            <SparklesIcon className="w-8 h-8 ml-2 text-tertiary-400 animate-pulse-gentle" />
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Create magical stories for your little ones</p>
        </div>
        <Link 
          to="/create" 
          className="btn btn-primary flex items-center shadow-lg dark:shadow-primary-900/30"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Create New Story
        </Link>
      </div>

      {/* Recent Stories Section with enhanced cards */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            Recent Stories
          </h2>
          <Link
            to="/library"
            className="text-primary-600 dark:text-primary-400 flex items-center hover:underline font-medium"
          >
            View All <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recentStories.map((story) => (
            <div key={story.id} className="story-card group">
              <Link to={`/reader/${story.id}`} className="block">
                <div className="relative">
                  <img
                    src={story.cover}
                    alt={story.title}
                    className="w-full h-auto aspect-[4/5] object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 transform transition-transform group-hover:rotate-12 group-hover:scale-110">
                    <StarIcon className="w-7 h-7 text-tertiary-400 drop-shadow-lg" />
                  </div>
                  {/* Add a gradient overlay at the bottom for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/70 to-transparent rounded-b-lg"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-lg text-white drop-shadow-md">{story.title}</h3>
                    <p className="text-xs text-gray-100 flex items-center mt-1 drop-shadow-md">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      Read {story.lastRead}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Create Templates with enhanced visual styles */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Quick Create
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-card cursor-pointer group"
              onClick={() => {
                // Will be implemented later to start with a template
                console.log(`Selected template: ${template.title}`)
              }}
            >
              <div className="mb-4 relative">
                <div className={`w-16 h-16 flex items-center justify-center rounded-full text-4xl bg-gradient-to-br ${template.color} text-white shadow-lg transform transition-transform group-hover:scale-110 group-hover:animate-float`}>
                  {template.icon}
                </div>
                {/* Add decorative elements */}
                <div className="absolute w-3 h-3 rounded-full bg-tertiary-300 -top-1 -right-1 opacity-70"></div>
                <div className="absolute w-2 h-2 rounded-full bg-primary-300 top-3 -right-3 opacity-70"></div>
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {template.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {template.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Statistics with enhanced styling */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Your Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="stats-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-4 shadow-inner">
                <PlusCircleIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stories Created</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {usageStats.storiesCreated}
                </p>
              </div>
            </div>
          </div>

          <div className="stats-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full mr-4 shadow-inner">
                <BookOpenIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stories Read</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {usageStats.storiesRead}
                </p>
              </div>
            </div>
          </div>

          <div className="stats-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full mr-4 shadow-inner">
                <ClockIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reading Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {usageStats.totalReadingTime}
                </p>
              </div>
            </div>
          </div>

          <div className="stats-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full mr-4 shadow-inner">
                <BookmarkIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Favorite Topic</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {usageStats.favoriteTopic}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeDashboard
import { Link } from 'react-router-dom'
import {
  PlusCircleIcon,
  ClockIcon,
  BookmarkIcon,
  ArrowRightIcon, BookOpenIcon
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

// Placeholder data for templates
const templates = [
  {
    id: 1,
    title: 'Adventure',
    description: 'An exciting journey filled with challenges and discovery',
    icon: '🚀'
  },
  {
    id: 2,
    title: 'Fantasy',
    description: 'Magical worlds with fantastical creatures and wonder',
    icon: '🧙‍♂️'
  },
  {
    id: 3,
    title: 'Animals',
    description: 'Stories featuring friendly animals and their adventures',
    icon: '🦊'
  },
  {
    id: 4,
    title: 'Learning',
    description: 'Educational stories that teach important concepts',
    icon: '📚'
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
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to StoryMagic</h1>
        <Link to="/create" className="btn btn-primary flex items-center">
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Create New Story
        </Link>
      </div>

      {/* Recent Stories Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Recent Stories</h2>
          <Link
            to="/library"
            className="text-primary-600 dark:text-primary-400 flex items-center hover:underline"
          >
            View All <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentStories.map((story) => (
            <div key={story.id} className="card relative animate-slide-up">
              <Link to={`/reader/${story.id}`}>
                <img
                  src={story.cover}
                  alt={story.title}
                  className="w-full h-auto aspect-[4/5] object-cover"
                />
                <div className="absolute top-2 right-2">
                  <StarIcon className="w-6 h-6 text-yellow-400 drop-shadow-md" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">{story.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    Read {story.lastRead}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Create Templates */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Quick Create
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="card p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                // Will be implemented later to start with a template
                console.log(`Selected template: ${template.title}`)
              }}
            >
              <div className="text-4xl mb-2">{template.icon}</div>
              <h3 className="font-medium text-gray-900 dark:text-white">{template.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {template.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Statistics */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Your Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                <PlusCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stories Created</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {usageStats.storiesCreated}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
                <BookOpenIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stories Read</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {usageStats.storiesRead}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-3">
                <ClockIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reading Time</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {usageStats.totalReadingTime}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg mr-3">
                <BookmarkIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Favorite Topic</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
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

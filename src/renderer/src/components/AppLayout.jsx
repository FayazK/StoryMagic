import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import {
  HomeIcon,
  BookOpenIcon,
  PencilSquareIcon,
  FolderIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline'

const AppLayout = ({ children }) => {
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useTheme()

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/create', label: 'Create', icon: PencilSquareIcon },
    { path: '/library', label: 'Library', icon: FolderIcon },
    { path: '/reader', label: 'Reader', icon: BookOpenIcon },
    { path: '/settings', label: 'Settings', icon: Cog6ToothIcon }
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-4 flex items-center justify-center md:justify-start">
          <span className="hidden md:block text-xl font-bold text-primary-600 dark:text-primary-400">
            StoryMagic
          </span>
          <span className="block md:hidden text-xl font-bold text-primary-600 dark:text-primary-400">
            SM
          </span>
        </div>

        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="hidden md:block ml-3">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center md:justify-start w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <>
                <SunIcon className="w-6 h-6" />
                <span className="hidden md:block ml-3">Light Mode</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-6 h-6" />
                <span className="hidden md:block ml-3">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>
    </div>
  )
}

export default AppLayout

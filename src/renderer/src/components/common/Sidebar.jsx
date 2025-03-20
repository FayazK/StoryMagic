import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  BookOpenIcon,
  PencilSquareIcon,
  FolderIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/create', label: 'Create', icon: PencilSquareIcon },
    { path: '/library', label: 'Library', icon: FolderIcon },
    { path: '/reader', label: 'Reader', icon: BookOpenIcon },
    { path: '/settings', label: 'Settings', icon: Cog6ToothIcon }
  ]

  return (
    <aside className="sidebar-bg w-20 md:w-64 shadow-lg flex flex-col border-r border-gray-200">
      <div className="p-6 flex items-center justify-center md:justify-start">
        <span className="hidden md:block text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
          StoryMagic
        </span>
        <span className="block md:hidden text-2xl font-bold text-primary-500">
          SM
        </span>
      </div>

      <nav className="flex-1 mt-6 px-3">
        <ul className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-primary-500' : ''}`} />
                  <span className={`hidden md:block ml-3 font-medium ${isActive ? 'text-primary-700' : ''}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="hidden md:block ml-auto w-2 h-8 rounded-full bg-primary-500"></span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
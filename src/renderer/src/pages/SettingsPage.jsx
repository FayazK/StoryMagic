import { useState } from 'react'
import {
  UserIcon,
  KeyIcon,
  ComputerDesktopIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('api')
  const [formData, setFormData] = useState({
    googleGeminiKey: '****************',
    replicateKey: '****************',
    theme: 'system',
    language: 'english',
    contentFilter: 'moderate',
    autoSave: true,
    cloudBackup: false,
    cpuUsage: 'balanced',
    cacheSize: 'standard'
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Settings updated:', formData)
    // In a real implementation, we would save these settings
  }

  const tabs = [
    { id: 'api', name: 'API Configuration', icon: KeyIcon },
    { id: 'appearance', name: 'Preferences', icon: UserIcon },
    { id: 'storage', name: 'Storage Management', icon: ComputerDesktopIcon },
    { id: 'privacy', name: 'Privacy Controls', icon: ShieldCheckIcon },
    { id: 'resources', name: 'Resource Allocation', icon: CpuChipIcon },
    { id: 'language', name: 'Language Settings', icon: LanguageIcon }
  ]

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Configure StoryMagic to your preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <div className="md:w-64 flex-shrink-0">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            {/* API Configuration */}
            {activeTab === 'api' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    API Configuration
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Enter your API keys for the services StoryMagic uses. Your keys are securely
                    encrypted and stored locally.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="googleGeminiKey"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Google Gemini API Key
                      </label>
                      <input
                        type="password"
                        id="googleGeminiKey"
                        name="googleGeminiKey"
                        className="input"
                        value={formData.googleGeminiKey}
                        onChange={handleInputChange}
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Get your API key from the{' '}
                        <a href="#" className="text-primary-600 dark:text-primary-400">
                          Google AI Studio
                        </a>
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="replicateKey"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Replicate API Key
                      </label>
                      <input
                        type="password"
                        id="replicateKey"
                        name="replicateKey"
                        className="input"
                        value={formData.replicateKey}
                        onChange={handleInputChange}
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Get your API key from the{' '}
                        <a href="#" className="text-primary-600 dark:text-primary-400">
                          Replicate website
                        </a>
                      </p>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="btn btn-primary">
                        Save API Keys
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'appearance' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Preferences
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="theme"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Theme
                      </label>
                      <select
                        id="theme"
                        name="theme"
                        className="input"
                        value={formData.theme}
                        onChange={handleInputChange}
                      >
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                        <option value="system">System Default</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="language"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Default UI Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        className="input"
                        value={formData.language}
                        onChange={handleInputChange}
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="chinese">Chinese</option>
                      </select>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="btn btn-primary">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Storage Management */}
            {activeTab === 'storage' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Storage Management
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="autoSave" className="flex items-center">
                        <input
                          type="checkbox"
                          id="autoSave"
                          name="autoSave"
                          checked={formData.autoSave}
                          onChange={handleInputChange}
                          className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Enable auto-save
                        </span>
                      </label>
                      <p className="mt-1 ml-6 text-xs text-gray-500 dark:text-gray-400">
                        Automatically save story changes as you work
                      </p>
                    </div>

                    <div>
                      <label htmlFor="cloudBackup" className="flex items-center">
                        <input
                          type="checkbox"
                          id="cloudBackup"
                          name="cloudBackup"
                          checked={formData.cloudBackup}
                          onChange={handleInputChange}
                          className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Enable cloud backup
                        </span>
                      </label>
                      <p className="mt-1 ml-6 text-xs text-gray-500 dark:text-gray-400">
                        Premium feature: Automatically backup stories to the cloud
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="cacheSize"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Cache Size
                      </label>
                      <select
                        id="cacheSize"
                        name="cacheSize"
                        className="input"
                        value={formData.cacheSize}
                        onChange={handleInputChange}
                      >
                        <option value="minimal">Minimal (100MB)</option>
                        <option value="standard">Standard (500MB)</option>
                        <option value="large">Large (1GB)</option>
                      </select>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Larger cache uses more disk space but improves performance
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Storage Used
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          45.8 MB
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div
                          className="bg-primary-600 h-2.5 rounded-full"
                          style={{ width: '15%' }}
                        ></div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        15% of available local storage
                      </p>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button type="submit" className="btn btn-primary">
                        Save Storage Settings
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                      >
                        Clear Cache
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
            {(activeTab === 'privacy' || activeTab === 'resources' || activeTab === 'language') && (
              <div className="animate-fade-in py-12 text-center">
                <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {activeTab === 'privacy' && 'Privacy Controls'}
                  {activeTab === 'resources' && 'Resource Allocation'}
                  {activeTab === 'language' && 'Language Settings'}
                </h2>
                <p className="text-gray-400 dark:text-gray-500">
                  This section will be implemented in a future update
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage

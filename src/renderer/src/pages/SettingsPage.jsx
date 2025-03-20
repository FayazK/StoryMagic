import { useState } from 'react'
import { KeyIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline'
import { Button, Input } from '../components'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('appearance')
  const [saveLocation, setSaveLocation] = useState('/Users/username/Documents/StoryMagic')

  // Mock API keys for demonstration
  const [apiKeys, setApiKeys] = useState({
    gemini: 'AIza...', // Obscured API key
    replicate: 'r8_...' // Obscured API key
  })

  const tabs = [
    { id: 'apis', label: 'API Keys', icon: KeyIcon },
    { id: 'storage', label: 'Storage', icon: CloudArrowDownIcon }
  ]

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings tabs */}
        <div className="md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full py-3 px-4 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon
                className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-primary-500' : ''}`}
              />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          {/* API Keys Settings */}
          {activeTab === 'apis' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">API Keys</h2>
              <p className="text-gray-600 mb-6">
                Configure your API keys for text and image generation services. These keys are
                stored securely on your device.
              </p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="gemini" className="block text-sm font-medium text-gray-700 mb-2">
                    Google Gemini API Key
                  </label>
                  <div className="flex">
                    <Input
                      type="password"
                      id="gemini"
                      className="flex-grow"
                      value={apiKeys.gemini}
                      onChange={(e) => setApiKeys({ ...apiKeys, gemini: e.target.value })}
                    />
                    <Button variant="outline" className="ml-2">
                      Verify
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Used for generating story text content.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="replicate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Replicate API Key
                  </label>
                  <div className="flex">
                    <Input
                      type="password"
                      id="replicate"
                      className="flex-grow"
                      value={apiKeys.replicate}
                      onChange={(e) => setApiKeys({ ...apiKeys, replicate: e.target.value })}
                    />
                    <Button variant="outline" className="ml-2">
                      Verify
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Used for generating story illustrations.
                  </p>
                </div>

                <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                  <h3 className="font-medium text-primary-800 mb-2">API Usage & Quotas</h3>
                  <p className="text-sm text-primary-700">
                    You can monitor your API usage and remaining quota in the dashboard of the
                    respective services.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Storage Settings */}
          {activeTab === 'storage' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Storage</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Storage Location</h3>

                  <div className="flex items-center">
                    <Input
                      type="text"
                      className="flex-grow"
                      value={saveLocation}
                      onChange={(e) => setSaveLocation(e.target.value)}
                      placeholder="Select folder path"
                    />
                    <Button variant="outline" className="ml-2">
                      Browse
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Your stories, illustrations, and settings will be saved to this location.
                  </p>
                </div>

                <div className="border-t dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Storage Usage</h3>

                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Total Space (1.2 GB / 5 GB)
                        </span>
                        <span className="text-sm text-gray-600">24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: '24%' }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Stories Database</p>
                        <p className="font-medium text-gray-900">245 MB</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Illustrations</p>
                        <p className="font-medium text-gray-900">945 MB</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Settings & Cache</p>
                        <p className="font-medium text-gray-900">10 MB</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Free Space</p>
                        <p className="font-medium text-gray-900">3.8 GB</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Maintenance</h3>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline">Clear Cache</Button>
                    <Button variant="outline">Optimize Database</Button>
                    <Button variant="outline" className="text-red-600 hover:bg-red-50">
                      Reset All Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage

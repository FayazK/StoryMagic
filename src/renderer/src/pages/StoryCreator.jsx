import { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const StoryCreator = () => {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your Story</h1>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${i + 1 <= step ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-600'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  i + 1 === step
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : i + 1 < step
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                      : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {i + 1}
              </div>
              <span className="text-sm hidden md:block">
                {i === 0 && 'Basic Info'}
                {i === 1 && 'Characters'}
                {i === 2 && 'Setting'}
                {i === 3 && 'Story Elements'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-2 bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="card p-6">
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Let's start with some basic details about your story.
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Story Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="input"
                  placeholder="Enter a title for your story"
                />
              </div>

              <div>
                <label
                  htmlFor="age-range"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Age Range
                </label>
                <select id="age-range" className="input">
                  <option value="">Select age range</option>
                  <option value="0-3">0-3 years</option>
                  <option value="4-6">4-6 years</option>
                  <option value="7-9">7-9 years</option>
                  <option value="10-12">10-12 years</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="story-length"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Story Length
                </label>
                <select id="story-length" className="input">
                  <option value="">Select length</option>
                  <option value="short">Short (5 minutes)</option>
                  <option value="medium">Medium (10 minutes)</option>
                  <option value="long">Long (15+ minutes)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Story Theme
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Adventure', 'Fantasy', 'Animals', 'Space', 'Friendship', 'Learning'].map(
                    (theme) => (
                      <label
                        key={theme}
                        className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <input
                          type="radio"
                          name="theme"
                          value={theme.toLowerCase()}
                          className="mr-2"
                        />
                        {theme}
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Character Creation</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tell us about the main character in your story.
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="character-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Character Name
                </label>
                <input
                  type="text"
                  id="character-name"
                  className="input"
                  placeholder="Enter character name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Character Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Child', 'Animal', 'Fantasy Creature', 'Superhero', 'Robot', 'Adult'].map(
                    (type) => (
                      <label
                        key={type}
                        className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <input
                          type="radio"
                          name="character-type"
                          value={type.toLowerCase().replace(' ', '-')}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="character-traits"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Character Traits (select up to 3)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'Brave',
                    'Curious',
                    'Kind',
                    'Clever',
                    'Funny',
                    'Shy',
                    'Creative',
                    'Strong',
                    'Caring'
                  ].map((trait) => (
                    <label
                      key={trait}
                      className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                    >
                      <input
                        type="checkbox"
                        name="traits"
                        value={trait.toLowerCase()}
                        className="mr-2"
                      />
                      {trait}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="character-description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Character Description
                </label>
                <textarea
                  id="character-description"
                  className="input h-24"
                  placeholder="Describe the character's appearance and personality"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Story Setting</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Choose the world where your story takes place.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Main Setting
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Forest', icon: '🌳' },
                    { name: 'Space', icon: '🚀' },
                    { name: 'Ocean', icon: '🌊' },
                    { name: 'City', icon: '🏙️' },
                    { name: 'Magical Land', icon: '✨' },
                    { name: 'Mountains', icon: '⛰️' }
                  ].map((setting) => (
                    <label
                      key={setting.name}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center text-center"
                    >
                      <input
                        type="radio"
                        name="setting"
                        value={setting.name.toLowerCase().replace(' ', '-')}
                        className="sr-only"
                      />
                      <span className="text-4xl mb-2">{setting.icon}</span>
                      <span>{setting.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="time-period"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Time Period
                </label>
                <select id="time-period" className="input">
                  <option value="">Select time period</option>
                  <option value="present">Present Day</option>
                  <option value="past">Historical Past</option>
                  <option value="future">Future</option>
                  <option value="timeless">Timeless/Fantasy</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="setting-description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Setting Description
                </label>
                <textarea
                  id="setting-description"
                  className="input h-24"
                  placeholder="Describe the setting in more detail"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Story Elements</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Define the key elements of your story.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Story Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Adventure',
                    'Problem-Solving',
                    'Educational',
                    'Bedtime',
                    'Friendship',
                    'Discovery'
                  ].map((type) => (
                    <label
                      key={type}
                      className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <input
                        type="radio"
                        name="story-type"
                        value={type.toLowerCase().replace(' ', '-')}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="lesson"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Moral or Lesson (Optional)
                </label>
                <input
                  type="text"
                  id="lesson"
                  className="input"
                  placeholder="What should children learn from this story?"
                />
              </div>

              <div>
                <label
                  htmlFor="challenge"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Main Challenge
                </label>
                <input
                  type="text"
                  id="challenge"
                  className="input"
                  placeholder="What difficulty will the character face?"
                />
              </div>

              <div>
                <label
                  htmlFor="art-style"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Illustration Style
                </label>
                <select id="art-style" className="input">
                  <option value="">Select art style</option>
                  <option value="watercolor">Watercolor</option>
                  <option value="cartoon">Cartoon</option>
                  <option value="realistic">Realistic</option>
                  <option value="pixel">Pixel Art</option>
                  <option value="sketch">Sketch/Drawing</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className={`btn btn-base btn-outline flex items-center ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={step === 1}
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Previous
        </button>

        <button
          onClick={step === totalSteps ? () => console.log('Generate story') : nextStep}
          className="btn btn-base btn-primary flex items-center"
        >
          {step === totalSteps ? 'Generate Story' : 'Next'}
          {step !== totalSteps && <ArrowRightIcon className="w-5 h-5 ml-2" />}
        </button>
      </div>
    </div>
  )
}

export default StoryCreator

import React from 'react'

const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  orientation = 'horizontal'
}) => {
  return (
    <div className={`flex ${orientation === 'vertical' ? 'flex-col' : ''} gap-1`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center py-3 px-4 rounded-lg transition-colors
            ${activeTab === tab.id
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-600 hover:bg-gray-100'
            }
            ${orientation === 'vertical' ? 'w-full' : ''}
          `}
        >
          {tab.icon && <tab.icon className={`w-5 h-5 ${orientation === 'horizontal' ? 'mr-2' : 'mr-3'} ${activeTab === tab.id ? 'text-primary-500' : ''}`} />}
          <span className="font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default TabNavigation
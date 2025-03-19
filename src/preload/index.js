import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // Database APIs
  database: {
    // Check if the database is initialized
    isInitialized: () => ipcRenderer.invoke('db:isInitialized')
  },
  
  // Settings APIs
  settings: {
    // Get a setting value
    get: (key, defaultValue) => ipcRenderer.invoke('settings:get', key, defaultValue),
    
    // Save a setting value
    set: (key, value) => ipcRenderer.invoke('settings:set', key, value),
    
    // Get all settings
    getAll: () => ipcRenderer.invoke('settings:getAll'),
    
    // Save multiple settings at once
    saveAll: (settings) => ipcRenderer.invoke('settings:saveAll', settings)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

import { getDatabasePath } from './database'
import Database from 'better-sqlite3'

// Default settings
const DEFAULT_SETTINGS = {
  theme: 'system',
  language: 'english',
  contentFilter: 'moderate',
  autoSave: true,
  cloudBackup: false,
  cpuUsage: 'balanced',
  cacheSize: 'standard'
}

/**
 * Get a setting value from the database
 * @param {string} key The setting key
 * @param {any} defaultValue The default value if the setting doesn't exist
 * @returns {any} The setting value or the default value
 */
export function getSetting(key, defaultValue = null) {
  try {
    const db = new Database(getDatabasePath())
    const setting = db.prepare('SELECT value FROM settings WHERE key = ?').get(key)
    db.close()

    if (setting) {
      try {
        return JSON.parse(setting.value)
      } catch (e) {
        return setting.value
      }
    }

    return defaultValue
  } catch (error) {
    console.error(`Error getting setting ${key}:`, error)
    return defaultValue
  }
}

/**
 * Save a setting to the database
 * @param {string} key The setting key
 * @param {any} value The setting value
 * @returns {boolean} Whether the operation was successful
 */
export function saveSetting(key, value) {
  try {
    const db = new Database(getDatabasePath())
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)

    // Check if the setting exists
    const existing = db.prepare('SELECT key FROM settings WHERE key = ?').get(key)

    if (existing) {
      // Update existing setting
      db.prepare('UPDATE settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?').run(stringValue, key)
    } else {
      // Insert new setting
      db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(key, stringValue)
    }

    db.close()
    return true
  } catch (error) {
    console.error(`Error saving setting ${key}:`, error)
    return false
  }
}

/**
 * Get all settings from the database
 * @returns {Object} All settings as key-value pairs
 */
export function getAllSettings() {
  try {
    const db = new Database(getDatabasePath())
    const settings = db.prepare('SELECT key, value FROM settings').all()
    db.close()

    return settings.reduce((acc, setting) => {
      try {
        acc[setting.key] = JSON.parse(setting.value)
      } catch (e) {
        acc[setting.key] = setting.value
      }
      return acc
    }, {})
  } catch (error) {
    console.error('Error getting all settings:', error)
    return {}
  }
}

/**
 * Save multiple settings at once
 * @param {Object} settings Object with key-value pairs
 * @returns {boolean} Whether the operation was successful
 */
export function saveSettings(settings) {
  try {
    const db = new Database(getDatabasePath())

    // Begin transaction
    db.exec('BEGIN TRANSACTION')

    const updateQuery = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP')

    for (const [key, value] of Object.entries(settings)) {
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)
      updateQuery.run(key, stringValue, stringValue)
    }

    // Commit transaction
    db.exec('COMMIT')

    db.close()
    return true
  } catch (error) {
    console.error('Error saving settings:', error)
    return false
  }
}

/**
 * Initialize default settings if they don't exist
 * @returns {boolean} Whether the operation was successful
 */
export function initializeDefaultSettings() {
  try {
    const db = new Database(getDatabasePath())

    // Begin transaction
    db.exec('BEGIN TRANSACTION')

    // Get existing settings
    const existingSettings = db.prepare('SELECT key FROM settings').all()
    const existingKeys = new Set(existingSettings.map(s => s.key))

    // Insert default settings for any that don't exist
    const insertQuery = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)')

    for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
      if (!existingKeys.has(key)) {
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)
        insertQuery.run(key, stringValue)
      }
    }

    // Commit transaction
    db.exec('COMMIT')

    db.close()
    return true
  } catch (error) {
    console.error('Error initializing default settings:', error)
    return false
  }
}

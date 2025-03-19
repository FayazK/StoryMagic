import path from 'path'
import fs from 'fs'
import Database from 'better-sqlite3'
import { app } from 'electron'

// Database singleton
let db = null
let dbInitialized = false

/**
 * Get the database file path in the app user data directory
 * @returns {string} The database file path
 */
export function getDatabasePath() {
  const userDataPath = app.getPath('userData')
  return path.join(userDataPath, 'storymagic.db')
}

/**
 * Check if the database is initialized
 * @returns {boolean} Whether the database is initialized
 */
export function isInitialized() {
  return dbInitialized
}

/**
 * Initialize the database
 * @returns {boolean} Whether the initialization was successful
 */
export function initializeDatabase() {
  try {
    const dbPath = getDatabasePath()
    console.log(`Initializing database at: ${dbPath}`)
    
    // Check if the database directory exists, create it if not
    const dbDir = path.dirname(dbPath)
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }
    
    // Open the database (will create it if it doesn't exist)
    db = new Database(dbPath)
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON')
    
    // Create tables if they don't exist
    createTables()
    
    // Insert default templates
    insertDefaultTemplates()
    
    dbInitialized = true
    console.log('Database initialized successfully')
    
    return true
  } catch (error) {
    console.error('Failed to initialize database:', error)
    return false
  }
}

/**
 * Create the necessary tables in the database
 */
export function createTables() {
  // Create stories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      reading_level TEXT,
      theme TEXT,
      is_favorite BOOLEAN DEFAULT 0,
      tags TEXT,
      last_read_at TIMESTAMP
    )
  `)

  // Create story_pages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS story_pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      page_number INTEGER NOT NULL,
      content TEXT,
      image_path TEXT,
      image_style TEXT,
      FOREIGN KEY (story_id) REFERENCES stories (id) ON DELETE CASCADE
    )
  `)

  // Create characters table
  db.exec(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      appearance TEXT,
      FOREIGN KEY (story_id) REFERENCES stories (id) ON DELETE CASCADE
    )
  `)

  // Create settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Create templates table
  db.exec(`
    CREATE TABLE IF NOT EXISTS story_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      theme TEXT,
      structure TEXT,
      is_custom BOOLEAN DEFAULT 0
    )
  `)
}

/**
 * Insert default templates if they don't exist
 */
export function insertDefaultTemplates() {
  if (!db) return false
  
  const templatesCount = db.prepare('SELECT COUNT(*) as count FROM story_templates').get()
  
  if (templatesCount.count === 0) {
    const templates = [
      {
        name: 'Space Adventure',
        description: 'An exciting journey through the stars',
        theme: 'space',
        structure: JSON.stringify({
          setting: 'outer space',
          plotElements: ['discovery', 'adventure', 'teamwork']
        }),
        is_custom: 0
      },
      {
        name: 'Animal Friends',
        description: 'Stories about friendship between animals',
        theme: 'animals',
        structure: JSON.stringify({
          setting: 'forest',
          plotElements: ['friendship', 'kindness', 'helping others']
        }),
        is_custom: 0
      },
      {
        name: 'Fantasy Kingdom',
        description: 'Magical tales of princes, princesses, and dragons',
        theme: 'fantasy',
        structure: JSON.stringify({
          setting: 'medieval kingdom',
          plotElements: ['magic', 'quests', 'bravery']
        }),
        is_custom: 0
      }
    ]

    const insert = db.prepare(
      'INSERT INTO story_templates (name, description, theme, structure, is_custom) VALUES (?, ?, ?, ?, ?)'
    )

    for (const template of templates) {
      insert.run(
        template.name,
        template.description,
        template.theme,
        template.structure,
        template.is_custom
      )
    }
    
    return true
  }
  
  return false
}

/**
 * Close the database connection
 */
export function closeDatabase() {
  if (db) {
    db.close()
    dbInitialized = false
  }
}

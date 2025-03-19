import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';

/**
 * Database class for handling all SQLite operations
 */
class StoryMagicDatabase {
  constructor() {
    this.db = null;
    this.dbPath = '';
    this.initialized = false;
  }

  /**
   * Get the database file path in the app user data directory
   * @returns {string} The database file path
   */
  getDatabasePath() {
    const userDataPath = app.getPath('userData');
    return path.join(userDataPath, 'storymagic.db');
  }

  /**
   * Initialize the database
   * @returns {boolean} Whether the initialization was successful
   */
  initialize() {
    try {
      this.dbPath = this.getDatabasePath();
      console.log(`Initializing database at: ${this.dbPath}`);

      // Check if the database directory exists, create it if not
      const dbDir = path.dirname(this.dbPath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      // Open the database (will create it if it doesn't exist)
      this.db = new Database(this.dbPath);

      // Enable foreign keys
      this.db.pragma('foreign_keys = ON');

      // Create tables if they don't exist
      this.createTables();

      this.initialized = true;
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      return false;
    }
  }

  /**
   * Check if the database is initialized
   * @returns {boolean} Whether the database is initialized
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Create the necessary tables in the database
   */
  createTables() {
    // Create stories table
    this.db.exec(`
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
    `);

    // Create story_pages table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS story_pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        story_id INTEGER NOT NULL,
        page_number INTEGER NOT NULL,
        content TEXT,
        image_path TEXT,
        image_style TEXT,
        FOREIGN KEY (story_id) REFERENCES stories (id) ON DELETE CASCADE
      )
    `);

    // Create characters table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        story_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        age INTEGER,
        gender TEXT,
        appearance TEXT,
        FOREIGN KEY (story_id) REFERENCES stories (id) ON DELETE CASCADE
      )
    `);

    // Create settings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create templates table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS story_templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        theme TEXT,
        structure TEXT,
        is_custom BOOLEAN DEFAULT 0
      )
    `);
  }

  /**
   * Close the database connection
   */
  close() {
    if (this.db) {
      this.db.close();
      this.initialized = false;
    }
  }
}

// Create a singleton instance
const dbInstance = new StoryMagicDatabase();

export default dbInstance;

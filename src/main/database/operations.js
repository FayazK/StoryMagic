import db from './db';

/**
 * Database operations for the StoryMagic application
 */
class DatabaseOperations {
  /**
   * Check if the database has been initialized
   * @returns {boolean} Whether the database is initialized
   */
  static isInitialized() {
    return db.isInitialized();
  }

  /**
   * Initialize the database
   * @returns {boolean} Whether the initialization was successful
   */
  static initialize() {
    return db.initialize();
  }

  /**
   * Close the database connection
   */
  static close() {
    db.close();
  }

  /**
   * Insert default templates if they don't exist
   */
  static insertDefaultTemplates() {
    const templatesCount = db.db.prepare('SELECT COUNT(*) as count FROM story_templates').get();

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
      ];

      const insert = db.db.prepare(
        'INSERT INTO story_templates (name, description, theme, structure, is_custom) VALUES (?, ?, ?, ?, ?)'
      );

      for (const template of templates) {
        insert.run(
          template.name,
          template.description,
          template.theme,
          template.structure,
          template.is_custom
        );
      }
    }
  }
}

export default DatabaseOperations;

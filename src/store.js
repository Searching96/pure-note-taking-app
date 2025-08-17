/**
 * Data persistence layer for Pure note-taking app
 * Handles localStorage operations for notes
 */

const STORAGE_KEY = 'pure-note-taking-app-data';

/**
 * Load notes from localStorage
 * @return {Array} Array of note objects, empty array if none found
 */
export function loadNotes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return [];
    }
    const parsed = JSON.parse(data);
    // Ensure we return an array
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to load notes from localStorage:', error);
    return [];
  }
}

/**
 * Save notes to localStorage
 * @param {Array} notes - Array of note objects to save
 * @returns {boolean} True if successful, false if failed
 */
export function saveNotes(notes) {
  try {
    if (!Array.isArray(notes)) {
      console.warn('saveNotes: Expected array, got:', typeof notes);
      return false;
    }
    const data = JSON.stringify(notes);
    localStorage.setItem(STORAGE_KEY, data);
    return true;
  } catch (error) {
    console.error('Failed to save notes to localStorage:', error);
    return false;
  }
}

/**
 * Export notes as JSON string for backup/download
 * @return {string} JSON string of current notes
 */
export function exportNotes() {
  try {
    const notes = loadNotes();
    return JSON.stringify(notes, null, 2); // Pretty formatted
  } catch (error) {
    console.error('Failed to export notes:', error);
    return '[]';
  }
}

/**
 * Import notes from JSON string, replacing current notes
 * @param {string} jsonString - JSON string containing notes array
 * @returns {boolean} True if successful, false if failed
 */
export function importNotes(jsonString) {
  try {
    if (typeof jsonString !== 'string') {
      console.warn('importNotes: Expected string, got:', typeof jsonString);
      return false;
    }

    const parsed = JSON.parse(jsonString);

    if (!Array.isArray(parsed)) {
      console.warn('importNotes: JSON does not contain an array');
      return false;
    }

    // Validate note structure (basic check)
    const isValidNotes = parsed.every(note =>
      note &&
      typeof note === 'object' &&
      typeof note.id === 'string' &&
      typeof note.title === 'string' &&
      typeof note.content === 'string'
    );

    if (!isValidNotes) {
      console.warn('importNotes: Invalid note structure detected');
      return false;
    }

    return saveNotes(parsed);
  } catch(error) {
    console.error('Failed to import notes:', error);
    return false;
  }
}

/**
 * Clear all notes from storage (util function)
 * @returns {boolean} True if successful, false if failed
 */
export function clearNotes() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear notes from localStorage:', error);
    return false;
  }
}
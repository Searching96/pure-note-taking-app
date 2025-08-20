/**
 * Unit tests for store.js
 * Tests localStorage persistence layer
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { loadNotes, saveNotes, exportNotes, importNotes, clearNotes } from '../src/store.js'
import { json } from 'stream/consumers';

describe('Store Module', () => {
  // Test data
  const sampleNotes = [
    {
      id: 'note-1',
      title: 'First Note',
      content: 'This is my first note',
      createdAt: '2025-08-18T10:00:00.000Z',
      updatedAt: '2025-08-18T10:00:00.000Z'
    },
    {
      id: 'note-2',
      title: 'Second Note',
      content: 'This is my second note',
      createdAt: '2025-08-18T11:00:00.000Z',
      updatedAt: '2025-08-18T11:00:00.000Z'
    }
  ];

  beforeEach(() => {
    // localStorage is already cleared in setup.js
  });

  describe('loadNotes()', () => {
    it('should return empty array when no data exists', () => {
      const result = loadNotes();
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return stored notes when data exists', () => {
      localStorage.setItem('pure-note-taking-app-data', JSON.stringify(sampleNotes));
      const result = loadNotes();
      expect(result).toEqual(sampleNotes);
    });

    it('should handle corrupted localStorage data gracefully', () => {
      localStorage.setItem('pure-note-taking-app-data', 'invalid json');
      const result = loadNotes();
      expect(result).toEqual([]);
      expect(console.warn).toHaveBeenCalled();
    });

    it('should handle non-array data gracefully', () => {
      localStorage.setItem('pure-note-taking-app-data', '{"not": "array"}');
      const result = loadNotes();
      expect(result).toEqual([]);
    });
  });

  describe('saveNotes()', () => {
    it('should save valid notes array successfully', () => {
      const result = saveNotes(sampleNotes);
      expect(result).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'pure-note-taking-app-data',
        JSON.stringify(sampleNotes)
      );
    });

    it('should reject non-array input', () => {
      const result = saveNotes('not an array');
      expect(result).toBe(false);
      expect(console.warn).toHaveBeenCalled();
    });

    it('should reject undefined input', () => {
      const result = saveNotes(undefined);
      expect(result).toBe(false);
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('exportNotes()', () => {
    it('should export notes as formatted JSON string', () => {
      saveNotes(sampleNotes);
      const result = exportNotes();
      expect(typeof result).toBe('string');
      const parsed = JSON.parse(result);
      expect(parsed).toEqual(sampleNotes);
    });

    it('should export empty array when no notes exist', () => {
      const result = exportNotes();
      expect(result).toBe('[]');
    });

    it('should handle export errors gracefully', () => {
      // Mock JSON.stringify to throw error
      const originalStringify = JSON.stringify;
      JSON.stringify = () => { throw new Error('Export error'); };

      const result = exportNotes();
      expect(result).toBe('[]');
      expect(console.error).toHaveBeenCalled();

      // Restore original
      JSON.stringify = originalStringify;
    });
  });

  describe('importNotes()', () => {
    it('should import valid JSON notes successfully', () => {
      const importData = JSON.stringify(sampleNotes);
      const result = importNotes(importData);
      expect(result).toBe(true);

      const loaded = loadNotes();
      expect(loaded).toEqual(sampleNotes);
    });

    it('should reject invalid JSON', () => {
      const result = importNotes('invalid json');
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });

    it('should reject non-string input', () => {
      const result = importNotes(123);
      expect(result).toBe(false);
      expect(console.warn).toHaveBeenCalled();
    });

    it('should reject non-array JSON', () => {
      const result = importNotes('{"not": "array"}');
      expect(result).toBe(false);
      expect(console.warn).toHaveBeenCalled();
    });

    it('should validate note structure', () => {
      const invalidNotes = '[{"missing": "required fields"}]';
      const result = importNotes(invalidNotes);
      expect(result).toBe(false);
      expect(console.warn).toHaveBeenCalled();
    });

    it('should accept valid note structure', () => {
      const validNotes = [{
        id: 'test-1',
        title: 'Test Note',
        content: 'Test content'
      }];
      const result = importNotes(JSON.stringify(validNotes));
      expect(result).toBe(true);
    });
  });

  describe('clearNotes()', () => {
    it('should clear all notes from storage', () => {
      saveNotes(sampleNotes);
      const result = clearNotes();
      expect(result).toBe(true);
      expect(localStorage.removeItem).toHaveBeenCalledWith('pure-note-taking-app-data');
    });

    it('should handle clear errors gracefully', () => {
      // Mock removeItem to throw error
      localStorage.removeItem.mockImplementationOnce(() => {
        throw new Error('Clear error');
      });

      const result = clearNotes();
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Integration tests', () => {
    it('should handle complete save-load cycle', () => {
      // Save notes
      const saveResult = saveNotes(sampleNotes);
      expect(saveResult).toBe(true);

      // Load notes
      const loadedNotes = loadNotes();
      expect(loadedNotes).toEqual(sampleNotes);

      // Export notes
      const exported = exportNotes();
      const parsedExport = JSON.parse(exported);
      expect(parsedExport).toEqual(sampleNotes);

      // Clear notes
      const clearResult = clearNotes();
      expect(clearResult).toBe(true);

      // Verify cleared
      const afterClear = loadNotes();
      expect(afterClear).toEqual([]);
    });
  });
});
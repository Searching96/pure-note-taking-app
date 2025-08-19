/**
 * Accessibility Tests for Pure Notes App
 * Tests ARIA attributes, roles, and keyboard navigation
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Accessibility Features', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // Load the actual HTML file
    const html = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
    dom = new JSDOM(html, { 
      pretendToBeVisual: true,
      resources: 'usable'
    });
    document = dom.window.document;
    window = dom.window;
    
    // Set up global objects
    global.document = document;
    global.window = window;
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    };
  });

  describe('ARIA Roles', () => {
    it('should have proper semantic roles', () => {
      const header = document.querySelector('header');
      expect(header.getAttribute('role')).toBe('banner');

      const sidebar = document.querySelector('.sidebar');
      expect(sidebar.getAttribute('role')).toBe('complementary');

      const main = document.querySelector('.editor');
      expect(main.getAttribute('role')).toBe('main');

      const notesList = document.getElementById('noteList');
      expect(notesList.getAttribute('role')).toBe('list');

      const actionsGroup = document.querySelector('.form-actions');
      expect(actionsGroup.getAttribute('role')).toBe('group');
    });
  });

  describe('ARIA Labels', () => {
    it('should have descriptive aria-labels', () => {
      const searchInput = document.getElementById('searchInput');
      expect(searchInput.getAttribute('aria-label')).toBe('Search through your notes by title or content');

      const sidebar = document.querySelector('.sidebar');
      expect(sidebar.getAttribute('aria-label')).toBe('Notes navigation');

      const mainContent = document.querySelector('.editor');
      expect(mainContent.getAttribute('aria-label')).toBe('Note editor');

      const noteTitle = document.getElementById('noteTitle');
      expect(noteTitle.getAttribute('aria-label')).toBe('Note title');

      const noteBody = document.getElementById('noteBody');
      expect(noteBody.getAttribute('aria-label')).toBe('Note content');
    });
  });

  describe('ARIA Describedby', () => {
    it('should have proper help text associations', () => {
      const newNoteBtn = document.getElementById('newNote');
      expect(newNoteBtn.getAttribute('aria-describedby')).toBe('new-note-help');

      const noteTitle = document.getElementById('noteTitle');
      expect(noteTitle.getAttribute('aria-describedby')).toBe('title-help');

      const noteBody = document.getElementById('noteBody');
      expect(noteBody.getAttribute('aria-describedby')).toBe('body-help');

      const saveBtn = document.getElementById('saveBtn');
      expect(saveBtn.getAttribute('aria-describedby')).toBe('save-help');

      const deleteBtn = document.getElementById('deleteBtn');
      expect(deleteBtn.getAttribute('aria-describedby')).toBe('delete-help');
    });
  });

  describe('ARIA Live Regions', () => {
    it('should have proper live regions for dynamic content', () => {
      const notesList = document.getElementById('noteList');
      expect(notesList.getAttribute('aria-live')).toBe('polite');

      const statusArea = document.getElementById('status');
      expect(statusArea.getAttribute('aria-live')).toBe('polite');
      expect(statusArea.getAttribute('aria-atomic')).toBe('true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should have proper tabindex for focusable elements', () => {
      // All interactive elements should be keyboard accessible
      const focusableSelectors = [
        '#searchInput',
        '#newNote',
        '#noteTitle', 
        '#noteBody',
        '#saveBtn',
        '#deleteBtn'
      ];

      focusableSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        // Should either have tabindex="0" or be naturally focusable
        const tabindex = element.getAttribute('tabindex');
        const isNaturallyFocusable = ['INPUT', 'TEXTAREA', 'BUTTON'].includes(element.tagName);
        expect(tabindex === '0' || isNaturallyFocusable).toBe(true);
      });
    });
  });

  describe('Help Text Elements', () => {
    it('should have all help text elements present', () => {
      const helpIds = [
        'new-note-help',
        'editor-help', 
        'title-help',
        'body-help',
        'save-help',
        'delete-help'
      ];

      helpIds.forEach(id => {
        const helpElement = document.getElementById(id);
        expect(helpElement).toBeTruthy();
        expect(helpElement.textContent.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Dynamic ARIA Updates', () => {
    it('should properly handle aria-current and aria-selected for active notes', async () => {
      // This would test the dynamic ARIA updates in ui.js
      // For now, we verify the structure is in place
      const notesList = document.getElementById('noteList');
      expect(notesList).toBeTruthy();
      expect(notesList.getAttribute('role')).toBe('list');
      expect(notesList.getAttribute('aria-label')).toBe('Your notes');
    });
  });
});

import { loadNotes, saveNotes, clearNotes } from './store.js';
import { debounce } from './utils.js';
import {
  renderNotesList,
  renderNoteInEditor,
  filterNotes,
  showStatus,
  createNoteObject,
  updateNoteObject
} from './ui.js';

// Application state
let notes = [];
let currentNote = null;
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  console.log('App ready - Pure Notes');

  // Get DOM elements with error checking
  const elements = {
    newNoteBtn: document.getElementById('newNote'),
    noteTitle: document.getElementById('noteTitle'),
    noteBody: document.getElementById('noteBody'),
    noteList: document.getElementById('noteList'),
    editorForm: document.getElementById('editorForm'),
    saveBtn: document.getElementById('saveBtn'),
    deleteBtn: document.getElementById('deleteBtn'),
    searchInput: document.getElementById('searchInput'),
    status: document.getElementById('status'),
  }

  // Initialize app
  function init() {
    notes = loadNotes();
    renderApp();
    showStatus(elements.status, 'App ready!', 'success');
  }
  
  // Render the entire app
  function renderApp() {
    const filteredNotes = filterNotes(notes, searchQuery);
    renderNotesList(elements.noteList, filteredNotes, currentNote?.id);

    // Update button states
    elements.deleteBtn.disabled = !currentNote;
    elements.saveBtn.disabled = !hasUnsavedChanges();
  }

  function hasUnsavedChanges() {
    const title = elements.noteTitle.value.trim();
    const content = elements.noteBody.value.trim();

    if (!currentNote) {
      return title || content; // New note with content
    }

    return title !== currentNote.title || content !== currentNote.content;
  }

  // Save current note 
  function saveCurrentNote() {
    const title = elements.noteTitle.value.trim();
    const content = elements.noteBody.value.trim();

    if (!title && !content) {
      showStatus(elements.status, 'Cannot save empty note', 'error');
      return;
    }

    if (currentNote) {
      // Update existing note
      currentNote = updateNoteObject(currentNote, title, content);
      const index = notes.findIndex(n => n.id === currentNote.id);
      if (index !== -1) {
        notes[index] = currentNote; // Update existing note
      } 
    } else {
      // Create new note
      currentNote = createNoteObject(title, content);
      notes.unshift(currentNote);
    }

    saveNotes(notes);
    renderApp();
    showStatus(elements.status, 'Note saved!', 'success');
  }

  // Delete current note
  function deleteCurrentNote() {
    if (!currentNote) return;

    if (confirm('Are you sure you want to delete this note?')) {
      notes = notes.filter(n => n.id !== currentNote.id);
      saveNotes(notes);

      // Clear editor and reset current note
      currentNote = null;
      renderNoteInEditor(null, elements.noteTitle, elements.noteBody);
      renderApp();

      showStatus(elements.status, 'Note deleted!', 'success');
    }
  }

  // Create new note
  function createNewNote() {
    currentNote = null;
    renderNoteInEditor(null, elements.noteTitle, elements.noteBody);
    renderApp();
    showStatus(elements.status, 'Ready to create new note', 'info');
  }

  // Debounced auto-save
  const autoSave = debounce(() => {
    if (hasUnsavedChanges()) {
      saveCurrentNote();
    }
  }, 2000);

  elements.newNoteBtn.addEventListener('click', createNewNote);

  elements.saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    saveCurrentNote();
  });

  // Note selection from list
  elements.noteList.addEventListener('click', (e) => {
    const notePreview = e.target.closest('.note-preview');
    if (notePreview) {
      const noteId = notePreview.dataset.noteId;
      const note = notes.find(n => n.id === noteId);
      if (note) {
        currentNote = note;
        renderNoteInEditor(note, elements.noteTitle, elements.noteBody);
        renderApp();
      }
    }
  });

  // Auto-save on input
  elements.noteTitle.addEventListener('input', () => {
    renderApp(); // Update save button state
    autoSave();
  });

  elements.noteBody.addEventListener('input', () => {
    renderApp(); // Update save button state
    autoSave();
  });

  // Search functionality
  const debouncedSearch = debounce((query) => {
    searchQuery = query;
    renderApp();
  }, 300);

  elements.searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      createNewNote();
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveCurrentNote();
    }
  });

  // Initialize the app
  init();
});
document.addEventListener('DOMContentLoaded', () => {
  console.log('App ready - Pure Notes Skeleton');

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

  // Check for missing elements
  const missingElements = Object.entries(elements)
    .filter(([key, el]) => !el)
    .map(([key]) => key);

  if (missingElements.length > 0) {
    console.error('Missing DOM elements:', missingElements);
    return;
  }

  // Status message helper
  function showStatus(message, type = 'info') {
    const status = elements.status;
    status.textContent = message;
    status.className = type;

    // Clear after 3 seconds
    setTimeout(() => {
      status.textContent = '';
      status.className = '';
    }, 3000);
  }

  // New Note functionality
  elements.newNoteBtn.addEventListener('click', () => {
    console.log('New note clicked');

    // Clear form
    elements.noteTitle.value = '';
    elements.noteBody.value = '';

    // Focus on title input
    elements.noteTitle.focus();

    // Show status
    showStatus('Ready to create new note', 'success');
  })

  // Basic form interaction
  elements.noteTitle.addEventListener('input', () => {
    // Enable save button when there is content
    const hasContent = elements.noteTitle.value.trim() || elements.noteBody.value.trim();
    elements.saveBtn.disabled = !hasContent;
  });

  // Placeholder for save functionality (Phase 2)
  elements.saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = elements.noteTitle.value.trim();
    const body = elements.noteBody.value.trim();

    if (title || body) {
      console.log('Save clicked:', { title, body });
      showStatus('Implementing soon...', 'info');
    } else {
      showStatus('Please add some content first', 'error');
    }
  });

  // Placeholder for delete functionality (Phase 2)
  elements.deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Delete clicked');
    showStatus('Implementing soon...', 'info');
  })

  // Search input placeholder (Phase 2)
  elements.searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    console.log('Search: ', query);
    if (query) {
      showStatus('Implementing soon...', 'info');
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+N or Cmd+N for new note
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      elements.newNoteBtn.click();
    }

    // Ctrl+S or Cmd+S for save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      elements.saveBtn.click();
    }
  });

  // Initialize save button state
  elements.saveBtn.disabled = true;

  // Show ready status
  showStatus('App ready - Click "New Note" to begin', 'success');
});
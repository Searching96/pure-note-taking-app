# Pure Notes - Accessible Note-Taking App

A clean, accessible note-taking application built with pure HTML, CSS, and JavaScript. This app demonstrates modern web development practices including semantic HTML, CSS Grid layouts, vanilla JavaScript patterns, accessibility features, and localStorage persistence.

## Features

- ✅ **Full CRUD Operations** - Create, read, update, delete notes
- ✅ **Persistent Storage** - Notes saved to localStorage
- ✅ **Real-time Search** - Filter notes by title or content
- ✅ **Auto-save** - Changes saved automatically every 2 seconds
- ✅ **Keyboard Navigation** - Complete keyboard accessibility
- ✅ **Screen Reader Support** - Full ARIA implementation
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **No Build Tools** - Pure HTML/CSS/JS, run directly in browser

## Quick Start

1. **Open the app**: Double-click `index.html` or run `start index.html` in Windows cmd
2. **Create a note**: Click "New Note" or press `Escape`
3. **Start typing**: Changes auto-save every 2 seconds
4. **Navigate**: Use keyboard shortcuts for efficient workflow

## Keyboard-Only Usage Walkthrough

This app is fully accessible without a mouse. Here's how to use it with keyboard only:

### 🎯 **Essential Keyboard Shortcuts**

| Shortcut | Action | Context |
|----------|--------|---------|
| **Tab** | Navigate to next element | Global |
| **Shift+Tab** | Navigate to previous element | Global |
| **Ctrl+L** | Focus notes list | Global |
| **Escape** | Create new note | Global |
| **Arrow Up/Down** | Navigate between notes | Notes list |
| **Enter/Space** | Open selected note | Notes list |
| **Ctrl+S** | Save current note | Editor |

### 📝 **Step-by-Step Walkthrough**

#### **Starting the App**
1. Open `index.html` in your browser
2. **Press Tab** to navigate through elements:
   - Search field → New Note button → Note list → Editor

#### **Creating Your First Note**
1. **Press Escape** (or Tab to "New Note" button and press Enter)
2. **Type a title** in the title field
3. **Press Tab** to move to content area
4. **Start writing** - the app auto-saves every 2 seconds
5. You'll hear "Note saved successfully" when it saves

#### **Navigating Notes**
1. **Press Ctrl+L** to focus the notes list
2. **Use Arrow Up/Down** to browse through notes
3. Notice the light grey focus indicator on the current note
4. **Press Enter** to open the selected note

#### **Searching Notes**
1. **Press Tab** to reach the search field (or Shift+Tab from notes list)
2. **Type keywords** to filter notes in real-time
3. **Press Ctrl+L** to jump to filtered results

#### **Advanced Navigation**
1. **Tab order**: Search → New Note → Notes List → Title → Content → Save → Delete
2. **Focus indicators**: Light grey background shows your current position
3. **Screen reader announcements**: Status updates announced automatically

### 🔍 **Visual Focus Indicators**

The app provides clear visual feedback for keyboard users:

#### **Focus Ring Styles**
- **Blue outline**: Default focus indicator (2px solid)
- **Light grey background**: Note list navigation (#f8f9fa)
- **Blue glow**: Form inputs when focused
- **High contrast**: Buttons get prominent focus outline

#### **Interactive Elements**
All interactive elements are keyboard accessible:
- ✅ Search input
- ✅ New Note button  
- ✅ Notes list items
- ✅ Title input
- ✅ Content textarea
- ✅ Save button
- ✅ Delete button

### 🎧 **Screen Reader Experience**

For users with screen readers (NVDA, JAWS, VoiceOver, Narrator):

#### **Semantic Structure**
- **Banner**: App header with search
- **Complementary**: Notes sidebar navigation  
- **Main**: Note editor area
- **Status**: Live announcements

#### **ARIA Labels & Descriptions**
Every element has descriptive labels:
```
🔊 "Search through your notes by title or content, edit text"
🔊 "Create new note button, creates a new empty note in the editor"  
🔊 "Your notes list, 3 items"
🔊 "Note title, required edit text"
🔊 "Note content edit text, auto-saves every 2 seconds"
```

#### **Live Announcements**
Real-time feedback for actions:
- 🔊 "Note saved successfully"
- 🔊 "Note deleted"  
- 🔊 "New note created"

### ⚡ **Efficiency Tips**

#### **Power User Workflow**
1. **Ctrl+L** → **Arrow Keys** → **Enter** (browse and open notes)
2. **Escape** → **Type title** → **Tab** → **Type content** (quick note creation)
3. **Search** → **Ctrl+L** → **Enter** (find and open specific note)

#### **No-Mouse Challenge**
Try using the app without touching your mouse:
1. Create 3 different notes
2. Search for a specific note
3. Edit and save changes
4. Delete a note
5. Navigate back and forth between notes

Everything should be smooth and intuitive!

## Technical Implementation

### **Accessibility Features**

#### **ARIA Attributes**
- `role="banner"`, `role="main"`, `role="complementary"` - Semantic regions
- `aria-label` - Descriptive labels for all interactive elements
- `aria-describedby` - Links elements to help text
- `aria-live="polite"` - Announces status changes
- `aria-current="true"` - Indicates active note
- `tabindex="0"` - Makes note items keyboard focusable

#### **Focus Management**
```css
/* Global focus styles */
:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 1px;
}

/* Note list navigation */
.note-item:focus {
    background: #f8f9fa;
    outline: 1px solid #e5e7eb;
    border-left: 3px solid #d1d5db;
    transition: all 0.15s ease;
}
```

#### **Keyboard Event Handling**
```javascript
// Custom keyboard navigation for notes list
function handleNoteItemKeydown(e) {
    const noteItems = [...document.querySelectorAll('.note-item')];
    const currentIndex = noteItems.indexOf(e.currentTarget);
    
    switch(e.key) {
        case 'ArrowDown':
            e.preventDefault();
            const nextIndex = Math.min(currentIndex + 1, noteItems.length - 1);
            noteItems[nextIndex]?.focus();
            break;
        case 'ArrowUp':
            e.preventDefault();
            const prevIndex = Math.max(currentIndex - 1, 0);
            noteItems[prevIndex]?.focus();
            break;
    }
}
```

### **Testing Accessibility**

#### **Automated Testing**
Run the included accessibility tests:
```bash
npm test accessibility.test.js
```

#### **Manual Testing Methods**

1. **Console Testing** (Copy into browser DevTools):
```javascript
// Run ARIA validation
runAllARIATests();
```

2. **Screen Reader Testing**:
   - Windows: **Windows + Ctrl + Enter** (Narrator)
   - Mac: **Cmd + F5** (VoiceOver)

3. **Keyboard-Only Testing**:
   - Unplug your mouse
   - Complete all tasks using only keyboard
   - Verify all elements are reachable

#### **WCAG 2.1 Compliance**
This app meets Level AA standards:
- ✅ **1.3.1 Info and Relationships** - Semantic structure
- ✅ **2.1.1 Keyboard** - All functionality keyboard accessible  
- ✅ **2.4.3 Focus Order** - Logical tab sequence
- ✅ **2.4.7 Focus Visible** - Clear focus indicators
- ✅ **4.1.2 Name, Role, Value** - Proper ARIA implementation

## Development

### **Project Structure**
```
pure-note-taking-app/
├── index.html              # App shell and semantic markup
├── README.md               # This documentation
├── IMPLEMENTATION_PLAN.md  # Development plan
├── styles/
│   ├── variables.css       # CSS custom properties
│   └── app.css            # Layout and component styles
├── src/
│   ├── app.js             # Main application logic
│   ├── ui.js              # DOM manipulation and rendering
│   ├── store.js           # localStorage persistence
│   └── utils.js           # Utility functions
└── tests/
    ├── accessibility.test.js  # ARIA compliance tests
    ├── store.test.js         # Storage functionality tests
    └── utils.test.js         # Utility function tests
```

### **Running Tests**
```bash
npm test                    # Run all tests
npm test store.test.js      # Test storage functions  
npm test accessibility      # Test ARIA implementation
npm test utils.test.js      # Test utility functions
npm run coverage           # Generate coverage report
```

### **Manual Smoke Tests**

Before deploying, run these manual tests to ensure everything works:

#### **✅ Core Functionality Tests**
1. **Create a note, reload page, note persists**
   - Click "New Note" or press Escape
   - Type title and content
   - Refresh browser (F5)
   - ✅ Note should still be there

2. **Edit a note, autosave triggers, status message appears**  
   - Open an existing note
   - Make changes to title or content
   - Wait 2 seconds without typing
   - ✅ Should see "Note saved!" message

3. **Delete a note, list updates and localStorage changes**
   - Select a note
   - Click Delete button
   - Confirm deletion
   - ✅ Note disappears from list immediately

#### **✅ Accessibility Tests**
4. **Keyboard-only navigation works**
   - Unplug/ignore your mouse
   - Create, edit, save, delete notes using only keyboard
   - ✅ All functions should be accessible

5. **Screen reader compatibility**
   - Turn on Windows Narrator (Windows + Ctrl + Enter)
   - Navigate through the app
   - ✅ Should announce all elements clearly

#### **✅ Performance Tests**
6. **Search debouncing works**
   - Type quickly in search box
   - ✅ Results should update smoothly, not on every keystroke

7. **Auto-save debouncing works**
   - Type rapidly in note editor
   - ✅ Should not save on every keystroke, only after pause

### **Browser Support**
- ✅ Chrome/Edge 90+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Mobile browsers

## Next Steps & Learning Opportunities

### **🚀 Enhancement Ideas**
Try implementing these features to practice:

1. **Advanced Features**:
   - Dark/light theme toggle
   - Note categories or tags
   - Export notes to PDF/Markdown
   - Import/export note collections
   - Search highlighting

2. **Accessibility Improvements**:
   - Custom skip navigation
   - Better focus indicators
   - High contrast mode
   - Font size preferences

3. **Performance Optimizations**:
   - Virtual scrolling for many notes
   - Web Worker for large note processing
   - Service Worker for offline support

### **🎓 Learning Challenges**

1. **JavaScript Patterns**:
   - Add Observer pattern for state management
   - Implement Command pattern for undo/redo
   - Use Module pattern for better organization

2. **Modern Web APIs**:
   - File System Access API for local file operations
   - Web Share API for sharing notes
   - Intersection Observer for performance

3. **Testing**:
   - Add integration tests with Cypress
   - Visual regression tests
   - Performance benchmarking

### **📚 Study Topics**
This app teaches these concepts - study them further:

- **HTML**: Semantic markup, accessibility attributes
- **CSS**: Grid layout, custom properties, responsive design  
- **JavaScript**: ES6 modules, event handling, localStorage
- **Accessibility**: WCAG guidelines, ARIA patterns, keyboard navigation
- **Testing**: Unit tests, integration tests, accessibility testing
- **Architecture**: Separation of concerns, modular design

## 🎓 Learning Guide: Core Web Development Concepts

This app serves as a comprehensive teaching example for modern web development. Here's what you'll learn by studying the codebase:

---

## 📄 **HTML: Semantic Structure & Accessibility**

### **1. Semantic HTML Elements**

**What you'll learn**: Using meaningful HTML tags that convey structure and purpose.

```html
<!-- ❌ Bad: Generic divs with no meaning -->
<div class="header">
  <div class="title">Pure Notes</div>
</div>

<!-- ✅ Good: Semantic elements from our app -->
<header role="banner">
  <h1>Pure Notes</h1>
  <input type="search" aria-label="Search through your notes...">
</header>
<aside role="complementary" aria-label="Notes navigation">
  <ul role="list" aria-label="Your notes">
    <!-- Note items -->
  </ul>
</aside>
<main role="main" aria-label="Note editor">
  <!-- Editor content -->
</main>
```

**Key concepts demonstrated:**
- `<header>`, `<aside>`, `<main>` provide document structure
- `role` attributes enhance semantic meaning
- Each section has a clear, accessible purpose

### **2. Form Accessibility & ARIA**

**What you'll learn**: Making forms accessible to all users, including those using assistive technology.

```html
<!-- Example from our note editor -->
<input id="noteTitle" 
       name="title" 
       placeholder="Note title..." 
       aria-label="Note title" 
       aria-describedby="title-help"  
       required/>
<div id="title-help" class="sr-only">
  Enter a title for your note
</div>
```

**Key concepts:**
- `aria-label` provides accessible names
- `aria-describedby` links to help text
- `sr-only` class hides text visually but keeps it for screen readers
- `required` indicates mandatory fields

### **3. ARIA Live Regions**

**What you'll learn**: Announcing dynamic changes to screen reader users.

```html
<!-- Status announcements -->
<div id="status"
     class="status"
     aria-live="polite"
     aria-atomic="true"
     role="status">
  <!-- Dynamic status messages appear here -->
</div>
```

**Key concepts:**
- `aria-live="polite"` announces changes without interrupting
- `aria-atomic="true"` reads entire content when changed
- `role="status"` identifies this as a status region

---

## 🎨 **CSS: Modern Layout & Design Systems**

### **1. CSS Custom Properties (Variables)**

**What you'll learn**: Creating maintainable, theme-able CSS with custom properties.

```css
/* From styles/variables.css - Design system approach */
:root {
  /* Color system */
  --color-primary: #2563eb;
  --color-text: #1f2937;
  --color-bg: #ffffff;
  --color-border: #e5e7eb;
  --color-focus: #3b82f6;
  
  /* Spacing system */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  
  /* Typography system */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
}

/* Usage throughout the app */
.btn {
  background: var(--color-primary);
  color: var(--color-bg);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-base);
}
```

**Key concepts:**
- Centralized design tokens for consistency
- Easy theme switching by changing root values  
- Maintainable and scalable styling approach

### **2. CSS Grid Layout**

**What you'll learn**: Creating responsive layouts with CSS Grid.

```css
/* From styles/app.css - Main app layout */
.container {
  display: grid;
  grid-template-columns: 300px 1fr; /* Sidebar + main content */
  grid-template-rows: auto 1fr auto; /* Header + content + footer */
  grid-template-areas: 
    "header header"
    "sidebar main"
    "sidebar footer";
  height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main-content { grid-area: main; }

/* Responsive behavior */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr; /* Stack on mobile */
    grid-template-areas: 
      "header"
      "main"
      "sidebar";
  }
}
```

**Key concepts:**
- Grid template areas for intuitive layout
- Responsive design with media queries
- Flexible sizing with `fr` units

### **3. Focus Management & Accessibility**

**What you'll learn**: Visual feedback for keyboard users and accessibility compliance.

```css
/* Focus styles for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 1px;
}

/* Custom focus for note items */
.note-item:focus {
  background: #f8f9fa;
  outline: 1px solid #e5e7eb;
  border-left: 3px solid #d1d5db;
  transition: all 0.15s ease;
}

/* High contrast focus for buttons */
.btn:focus,
button:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

**Key concepts:**
- `:focus-visible` for keyboard-only focus styles
- Consistent focus indicators across components
- Smooth transitions for better user experience

---

## ⚙️ **JavaScript: Modern Patterns & Architecture**

### **1. ES6 Modules & Separation of Concerns**

**What you'll learn**: Organizing code into focused, reusable modules.

```javascript
// src/utils.js - Pure utility functions
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// src/store.js - Data persistence layer  
export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch (error) {
    console.error('Failed to save notes:', error);
    return false;
  }
}

// src/app.js - Application logic
import { debounce } from './utils.js';
import { saveNotes, loadNotes } from './store.js';
```

**Key concepts:**
- Each file has a single, clear responsibility
- `export`/`import` for modular code organization  
- Pure functions that are easy to test

### **2. Event Handling & Delegation**

**What you'll learn**: Efficient event management and user interaction patterns.

```javascript
// Event delegation for dynamic content
elements.noteList.addEventListener('click', (e) => {
  const notePreview = e.target.closest('.note-preview');
  if (notePreview) {
    const noteId = notePreview.dataset.noteId;
    const note = notes.find(n => n.id === noteId);
    if (note) {
      selectNote(note);
    }
  }
});

// Keyboard shortcuts with proper cleanup
document.addEventListener('keydown', (e) => {
  // Ctrl+L to focus notes list
  if ((e.ctrlKey || e.metaKey) && e.key === 'l' && !e.target.matches('input, textarea')) {
    e.preventDefault();
    focusNotesList();
  }
});
```

**Key concepts:**
- Event delegation for performance with dynamic content
- Keyboard shortcuts for power users
- Proper event prevention and cleanup

### **3. Debouncing for Performance**

**What you'll learn**: Optimizing performance by limiting function calls.

```javascript
// Auto-save with debouncing
const autoSave = debounce(() => {
  if (hasUnsavedChanges()) {
    saveCurrentNote();
  }
}, 2000); // Wait 2 seconds after user stops typing

// Search with debouncing
const debouncedSearch = debounce((query) => {
  searchQuery = query;
  renderApp();
}, 300); // Wait 300ms after user stops typing

// Usage
elements.noteTitle.addEventListener('input', autoSave);
elements.searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

**Key concepts:**
- Preventing excessive API calls or DOM updates
- Balancing responsiveness with performance
- User experience considerations (how long to wait)

### **4. localStorage & Data Persistence**

**What you'll learn**: Client-side data storage with error handling.

```javascript
// Robust localStorage operations
function loadNotes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    
    // Validate data structure
    if (!Array.isArray(parsed)) {
      console.warn('Invalid notes data, resetting');
      return [];
    }
    
    return parsed;
  } catch (error) {
    console.error('Failed to load notes:', error);
    return [];
  }
}
```

**Key concepts:**
- Error handling for storage operations
- Data validation and graceful degradation
- JSON serialization/deserialization

### **5. State Management Patterns**

**What you'll learn**: Managing application state in vanilla JavaScript.

```javascript
// Centralized state
let notes = [];
let currentNote = null;
let searchQuery = '';

// Pure functions for state updates
function createNoteObject(title = '', content = '') {
  const now = new Date().toISOString();
  return {
    id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: title.trim(),
    content: content.trim(),
    createdAt: now,
    updatedAt: now
  };
}

// State update with re-render
function saveCurrentNote() {
  // ... update logic
  notes[index] = updatedNote; // Update state
  renderApp(); // Re-render UI
  saveNotes(notes); // Persist to storage
}
```

**Key concepts:**
- Single source of truth for application state
- Immutable update patterns
- Consistent state → UI synchronization

---

## ♿ **Accessibility: Inclusive Design**

### **1. WCAG 2.1 Compliance Patterns**

**What you'll learn**: Meeting accessibility standards through code.

```javascript
// Screen reader announcements
function showStatus(statusElement, message, type = 'info') {
  statusElement.textContent = message;
  statusElement.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
  
  // Immediate announcement for errors
  if (type === 'error') {
    statusElement.setAttribute('aria-atomic', 'true');
  }
}

// Keyboard navigation
function handleNoteItemKeydown(e) {
  switch(e.key) {
    case 'ArrowDown':
      e.preventDefault();
      focusNextNote();
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      openNote();
      break;
  }
}
```

**Key concepts:**
- Programmatic focus management
- Screen reader announcements
- Keyboard navigation patterns

### **2. Progressive Enhancement**

**What you'll learn**: Building apps that work for everyone.

```html
<!-- Works without JavaScript -->
<form id="editorForm" action="#" method="post">
  <input name="title" required>
  <textarea name="content"></textarea>
  <button type="submit">Save Note</button>
</form>
```

```javascript
// JavaScript enhances the experience
document.addEventListener('DOMContentLoaded', () => {
  // Override form submission for SPA behavior
  elements.editorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveCurrentNote(); // Enhanced save with auto-save, etc.
  });
});
```

**Key concepts:**
- Functional baseline without JavaScript
- Enhancement layering
- Graceful degradation

---

## 🧪 **Testing: Quality Assurance**

### **1. Unit Testing Pure Functions**

**What you'll learn**: Testing strategies for utility functions.

```javascript
// From tests/utils.test.js
describe('debounce', () => {
  it('should delay function execution', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled(); // Not called immediately
    
    vi.advanceTimersByTime(100); // Fast-forward time
    expect(mockFn).toHaveBeenCalledTimes(1); // Now it's called
  });
});

describe('sanitizeHTML', () => {
  it('should escape HTML tags', () => {
    const input = '<script>alert("xss")</script>';
    const result = sanitizeHTML(input);
    expect(result).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
  });
});
```

**Key concepts:**
- Testing pure functions in isolation
- Mock functions and timer manipulation
- Security testing for XSS prevention

### **2. Manual Testing & Smoke Tests**

**What you'll learn**: Comprehensive testing strategies beyond unit tests.

```bash
# Automated tests
npm test                    # Unit tests
npm run test:accessibility  # ARIA compliance
npm run coverage           # Test coverage

# Manual smoke tests (from README)
1. Create a note, reload page, note persists
2. Edit a note, autosave triggers, status message appears  
3. Delete a note, list updates and localStorage changes
4. Keyboard-only navigation works
5. Screen reader compatibility
```

**Key concepts:**
- Different types of testing serve different purposes
- Manual testing catches UX issues
- Accessibility testing ensures inclusive design

---

## 🏗️ **Architecture: Project Organization**

### **File Structure & Responsibilities**

```
pure-note-taking-app/
├── index.html              # App shell and semantic markup
├── styles/
│   ├── variables.css      # Design system tokens
│   └── app.css           # Component styles and layout
├── src/
│   ├── app.js            # Business logic and state management
│   ├── ui.js             # DOM manipulation and rendering
│   ├── store.js          # Data persistence layer
│   └── utils.js          # Pure utility functions
└── tests/
    ├── utils.test.js     # Unit tests for utilities
    ├── store.test.js     # Storage functionality tests
    └── accessibility.test.js # ARIA compliance tests
```

**Key principles:**
- **Separation of concerns**: Each file has a single responsibility
- **Dependency direction**: UI depends on business logic, not vice versa
- **Pure functions**: Utilities have no side effects, easy to test
- **Progressive enhancement**: Works without JavaScript, better with it

---

## 💡 **Study Exercises**

### **Beginner Level**
1. **Modify the CSS variables** to create a dark theme
2. **Add a new keyboard shortcut** for clearing the search
3. **Create a new utility function** with tests

### **Intermediate Level**  
1. **Add note categories** with filtering
2. **Implement undo/redo functionality** 
3. **Add export to Markdown feature**

### **Advanced Level**
1. **Add offline support** with Service Workers
2. **Implement real-time collaboration** with WebSockets
3. **Add performance monitoring** and optimization

---

## 📚 **Further Reading**

### **HTML & Accessibility**
- [MDN: Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### **CSS & Layout**
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Modern CSS Reset](https://piccalil.li/blog/a-modern-css-reset/)

### **JavaScript & Architecture**
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Event Delegation](https://javascript.info/event-delegation)
- [You Don't Need jQuery](https://github.com/nefe/You-Dont-Need-jQuery)

### **Testing & Quality**
- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Web.dev Performance](https://web.dev/performance/)

---

*💡 **Pro Tip**: The best way to learn is by doing! Try implementing the study exercises above, and don't be afraid to break things - that's how you learn!*

## Contributing

To extend this app:

1. **Add new features** while maintaining accessibility
2. **Test with keyboard only** before submitting
3. **Run accessibility tests** to ensure compliance
4. **Update this README** with new keyboard shortcuts

## License

MIT License - Feel free to use this for learning and teaching!

---

**🎯 Challenge**: Can you use this entire app without ever touching your mouse? Try it!

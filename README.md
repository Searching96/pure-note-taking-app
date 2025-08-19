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
npm run coverage           # Generate coverage report
```

### **Browser Support**
- ✅ Chrome/Edge 90+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Mobile browsers

## Learning Resources

This app demonstrates these core web development concepts:

### **HTML**
- Semantic elements (`<header>`, `<main>`, `<aside>`)
- Form accessibility (`<label>`, `required`, `aria-*`)
- ARIA roles and properties

### **CSS**
- CSS Grid for layout
- CSS Custom Properties (variables)
- Focus management and visual feedback
- Responsive design principles

### **JavaScript**
- ES6 modules (`import`/`export`)
- Event handling and delegation  
- localStorage API
- Debouncing for performance
- DOM manipulation patterns

### **Accessibility**
- Screen reader compatibility
- Keyboard navigation patterns
- ARIA live regions
- Focus management
- WCAG 2.1 compliance

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

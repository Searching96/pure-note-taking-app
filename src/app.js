document.addEventListener('DOMContentLoaded', () => {
  console.log('App ready - Pure Notes Skeleton');
  const newNoteBtn = document.getElementById('newNote');
  const title = document.getElementById('noteTitle')
  if (newNoteBtn && title) {
    newNoteBtn.addEventListener('click', () => {
      title.focus();
      title.value = '';
      const body = document.getElementById('noteBody');
      if (body) body.value = '';
    });
  }
})
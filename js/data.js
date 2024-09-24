'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
// Function to transform javascript into JSON
function writeEntries() {
  const entriesJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', entriesJSON);
}
// Function to transform JSON back to javascript
function readEntries() {
  const storage = localStorage.getItem('data-storage');
  if (storage !== null) {
    const newData = JSON.parse(storage);
    return newData;
  } else {
    return data;
  }
}
data = readEntries();

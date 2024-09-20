interface Data {
  view: 'entries' | 'entry-form';
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}

let data: any = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

// Function to transform javascript into JSON
function writeEntries(): void {
  const entriesJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', entriesJSON);
}

// logging function to console as I received an error when committing due to function not being called
console.log(writeEntries);

// Function to transform JSON back to javascript
function readEntries(): Data {
  const storage = localStorage.getItem('data-storage');
  if (storage !== null) {
    const newData = JSON.parse(storage);
    return newData;
  } else {
    return data;
  }
}

data = readEntries();

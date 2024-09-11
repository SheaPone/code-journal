interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLTextAreaElement;
  entryId: number;
}

interface Entry {
  title: string;
  photo: string;
  notes: string;
}

// Input event listener//
const $photo = document.querySelector('#photo') as HTMLInputElement;
const $img = document.querySelector('img') as HTMLImageElement;
if (!$photo || !$img) throw new Error('$photo or $img query failed');

const originalSrc = $img.src;
$img.dataset.originalSrc = originalSrc;

function inputPhoto(event: Event): void {
  const eventTarget = event.target as HTMLInputElement;
  const newSrc = eventTarget.value;
  $img.src = newSrc;
  writeEntries();
}

$photo.addEventListener('input', inputPhoto);

// Submit event listener//
const formElementsValues = document.querySelector('form') as HTMLFormElement;

if (!formElementsValues) throw new Error('formElementsVales query failed');

formElementsValues.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = formElementsValues.elements as FormElements;
  const newEntry = {
    title: $formElements.title.value,
    photo: $formElements.photo.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  writeEntries();
  $img.src = originalSrc;
  formElementsValues.reset();
});

// Function to render entry//
function renderEntry(entry: Entry): void {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');

  const $div1 = document.createElement('div');
  $div1.setAttribute('class', 'column-half');
  $li.appendChild($div1);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photo);
  $div1.appendChild($img);

  const $div2 = document.createElement('div');
  $div2.setAttribute('class', 'column-half');
  $li.appendChild($div2);

  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $div2.appendChild($h2);

  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $div2.appendChild($p);

  return $li;
}

const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul query failed');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const dataEntry = data.entries[i];
    $ul.appendChild(renderEntry(dataEntry));
  }
});

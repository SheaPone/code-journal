'use strict';
// Input event listener//
const $photo = document.querySelector('#photo');
const $img = document.querySelector('img');
if (!$photo || !$img) throw new Error('$photo or $img query failed');
const originalSrc = $img.src;
$img.dataset.originalSrc = originalSrc;
function inputPhoto(event) {
  const eventTarget = event.target;
  const newSrc = eventTarget.value;
  $img.src = newSrc;
  writeEntries();
}
$photo.addEventListener('input', inputPhoto);
// Submit event listener//
const formElementsValues = document.querySelector('form');
if (!formElementsValues) throw new Error('formElementsVales query failed');
formElementsValues.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = formElementsValues.elements;
  const newEntry = {
    title: $formElements.title.value,
    photo: $formElements.photo.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  if (!data.editing) {
    data.nextEntryId++;
    data.entries.push(newEntry);
    $ul?.prepend(renderEntry(newEntry));
    viewSwap('entries');
    toggleNoEntries();
    writeEntries();
    $img.src = originalSrc;
    formElementsValues.reset();
  } else if (data.editing) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        newEntry.entryId = data.entries[i].entryId;
        data.entries[i] = newEntry;
        break;
      }
    }
    const $allLi = document.querySelectorAll('li');
    if (!$allLi) throw new Error('$allLi query failed');
    for (let i = 0; i < $allLi.length; i++) {
      if (
        Number($allLi[i].getAttribute('data-entry-id')) === data.editing.entryId
      ) {
        let $originalLi = $allLi[i];
        let $newLi = renderEntry(newEntry);
        $ul?.replaceChild($newLi, $originalLi);
        break;
      }
    }
    data.editing = null;
    viewSwap('entries');
    toggleNoEntries();
    writeEntries();
    $editEntry.className = 'edit-entry hidden';
    $entryView.className = 'entry-view';
    $img.src = originalSrc;
    formElementsValues.reset();
  }
});
// Function to render entry//
function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', `${entry.entryId}`);
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
  const $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fas fa-pencil-alt');
  $h2.appendChild($pencil);
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
  viewSwap(data.view);
  toggleNoEntries();
});
// Function to display no entries message//
const $entriesMessage = document.querySelector('.entries');
if (!$entriesMessage) throw new Error('$entriesMessage query failed');
function toggleNoEntries() {
  if (data.nextEntryId === 1) {
    $entriesMessage.className = 'entries no';
  } else {
    $entriesMessage.className = 'entries yes';
  }
}
// View Swap function//
const $view = document.querySelector('.view');
const $entries = document.querySelector('#entries');
const $entryForm = document.querySelector('#entry-form');
if (!$view || !$entries || !$entryForm)
  throw new Error('$view, $entries, or $entryForm query failed');
function viewSwap(viewName) {
  if (viewName === 'entries') {
    $entries.className = 'view';
    $entryForm.className = 'view hidden';
  } else if (viewName === 'entry-form') {
    $entryForm.className = 'view';
    $entries.className = 'view hidden';
  }
  data.view = viewName;
}
const $aEntries = document.querySelector('#entries-a');
if (!$aEntries) throw new Error('$aEntries query failed');
$aEntries.addEventListener('click', () => {
  viewSwap('entries');
});
const $aEntryForm = document.querySelector('#entry-form-a');
if (!$aEntryForm) throw new Error('$aEntry-form-a query failed');
$aEntryForm.addEventListener('click', () => {
  formElementsValues.reset();
  $img.src = originalSrc;
  viewSwap('entry-form');
});
function populateEntry(entry) {
  const $formElements = formElementsValues.elements;
  $formElements.title.value = entry.title;
  $formElements.photo.value = entry.photo;
  $formElements.notes.value = entry.notes;
  $img.src = entry.photo;
}
const $editEntry = document.querySelector('.edit-entry');
const $entryView = document.querySelector('.entry-view');
if (!$editEntry || !$entryView)
  throw new Error('$editEntry or $entryView query failed');
$ul.addEventListener('click', (event) => {
  const eventTarget = event.target;
  if (eventTarget.tagName === 'I') {
    const closestLi = eventTarget.closest('li');
    if (closestLi) {
      let editEntryId = closestLi.getAttribute('data-entry-id');
      let editableEntryId = Number(editEntryId);
      for (let i = 0; i < data.entries.length; i++) {
        if (data.entries[i].entryId === editableEntryId) {
          viewSwap('entry-form');
          const dataEntry = data.entries[i];
          data.editing = dataEntry;
          populateEntry(dataEntry);
          $editEntry.className = 'edit-entry';
          $entryView.className = 'entry-view hidden';
          break;
        }
      }
    }
  }
});

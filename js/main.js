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
  data.nextEntryId++;
  data.entries.push(newEntry);
  writeEntries();
  $img.src = originalSrc;
  formElementsValues.reset();
});

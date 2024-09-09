interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLTextAreaElement;
  entryId: number;
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
  data.entries.push(newEntry);
  console.log(newEntry);
  $img.src = originalSrc;
  formElementsValues.reset();
});

// date constructor -- Date(year, month, day, hour, minute, second, ms)
const calendar = document.getElementById('calendar');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const monthHeader = document.getElementById('month')
const currentDate = new Date().getDate();
let currentDay = new Date().getDay();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const todayMonth = new Date().getMonth();
const todayYear = new Date().getFullYear();
let lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
let firstDay = new Date(currentYear, currentMonth, 1).getDay();

const monthArray = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}

console.log(currentDate);

function loadPlants() {
  //grabs the plants object from local storage [{name:pothos, type: pothos, photo: pothos}, {}, {}] (array of objects)
  const plants = JSON.parse(localStorage.getItem('plants') || '[]');
  const selector = document.getElementById('plant-selector');
  const list = document.getElementById('plant-list');

  //sets selector to default null option
  selector.innerHTML = '<option selected>All plants</option>';
  //clears list
  list.innerHTML = '';

  //iterates through plants and creates an option in selector for each one as well as creating a plant card
  plants.forEach((plant, index) => {
    const option = document.createElement('option');
    option.value = index; //index is an argument that can be passed into the callback function that keeps index of current element
    option.textContent = plant.name;
    selector.appendChild(option);

    const plantCard = document.createElement('div');
    plantCard.innerHTML = `<strong>${plant.name}</strong> (${plant.type || 'Unknown'})<br>
      ${plant.photo ? `<img src="${plant.photo}" alt="${plant.name}" width="100">` : ''}`;
    list.appendChild(plantCard);
  });
}

//grabs info submitted from plant form and pushes it into plants object as a new plant and then calls loadPlants to refresh
document.getElementById('plant-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('plant-name').value.trim();
  const type = document.getElementById('plant-type').value.trim();
  const photo = document.getElementById('plant-photo').value.trim();

  const plants = JSON.parse(localStorage.getItem('plants') || '[]');
  plants.push({ name, type, photo });
  localStorage.setItem('plants', JSON.stringify(plants));

  this.reset(); // in this case this refers to plant-form and reset is a method which clears all input fields in the form
  loadPlants();
});

//loads entries of chosen day based on plant
function loadEntries(month, day, year) {
  const form = document.getElementById('entry-form');
  const title = document.getElementById('entry-title');
  const textarea = document.getElementById('entry-text');
  const output = document.getElementById('entry-output');
  const saveBtn = document.getElementById('save-entry');
  const plantSelector = document.getElementById('plant-selector');

  const dateKey = `${year}-${month + 1}-${day}`;
  const selectedPlantIndex = plantSelector.value;
  console.log(selectedPlantIndex, 'hello')
  const plants = JSON.parse(localStorage.getItem('plants') || '[]');

  //clears previous entries in output and text area
  output.innerHTML = '';
  textarea.value = '';
  form.style.display = 'block';

  // Show all notes on this day if all plants is selected
  if (!plants[selectedPlantIndex]) {
    //sets entry title
    title.innerText = `All plants on ${monthArray[month]} ${day}, ${year}`;

    const entries = plants.map(plant => {
      const entryKey = `${plant.name}_${dateKey}`; //`pothos_2025-05-20`
      //get data for specific plant and date using entryKey
      const data = JSON.parse(localStorage.getItem(entryKey));
      //if data is true map creates a new entry in the entries array containing the data returned
      if (data) {
        return `<strong>${plant.name}</strong><br>
                ${data.note ? `Note: ${data.note}<br>` : ''}
                ${data.watered ? 'Watered<br>' : ''}
                ${data.fertilized ? 'Fertilized<br>' : ''}<br>`;
      }
      //if data is not true map creates an empty entry in the entries array and then filter keeps only the entries which are true (the ones that arent empty)
      return '';
    }).filter(Boolean);

    //if the entries array's length is greater than zero then output.innerHTML will display entries else it will display the written message
    output.innerHTML = entries.length > 0 ? entries.join('') : 'No entries for any plant.';
    //return to exit the function
    return;
  }

  // Otherwise, show a single plant entry editor
  const plantName = plants[selectedPlantIndex].name; //plants[1].name
  console.log(plants[selectedPlantIndex]) //will console log the info of plant within plants in the position of selectedPlantIndex (in this case the 1 position)
  const entryKey = `${plantName}_${dateKey}`; //`pothos_2025-05-20`
  title.innerText = `Note for ${plantName} on ${monthArray[month]} ${day}, ${year}`;

  const watered = document.getElementById('watered');
  const fertilized = document.getElementById('fertilized');

  //fills out checkboxes and text if located in local storage else it appears empty
  const saved = JSON.parse(localStorage.getItem(entryKey) || '{}');
  textarea.value = saved.note || '';
  watered.checked = saved.watered || false;
  fertilized.checked = saved.fertilized || false;

  output.innerText = saved.note || 'No note saved.';

  //saves all info from form into an object and saves that object to entry variable
  saveBtn.onclick = () => {
    const entry = {
      note: textarea.value.trim(),
      watered: watered.checked,
      fertilized: fertilized.checked
    };

    //if any one of the entries from the entry object are true then entry is saved into local storage else entry is deleted from local storage
    if (entry.note || entry.watered || entry.fertilized) {
      localStorage.setItem(entryKey, JSON.stringify(entry));
      output.innerText = `Saved: ${entry.note || 'No text'}${entry.watered ? ', 💧 Watered' : ''}${entry.fertilized ? ', 🌿 Fertilized' : ''}`;
    } else {
      localStorage.removeItem(entryKey);
      output.innerText = 'Entry cleared.';
    }
  };
}

function generateCalendar() {
  calendar.innerHTML = '';

  const selectedPlantIndex = document.getElementById('plant-selector').value;
  const plants = JSON.parse(localStorage.getItem('plants') || '[]');

  // Recalculate firstDay and lastDay in case month changed
  firstDay = new Date(currentYear, currentMonth, 1).getDay();
  lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Blank spaces before first day
  for (let i = 0; i < firstDay; i++) {
    const blankSpace = document.createElement('div');
    blankSpace.classList.add('empty');
    calendar.append(blankSpace);
  }

  // Days of the month
  for (let day = 1; day <= lastDay; day++) {
    const dateContainer = document.createElement('div');
    dateContainer.classList.add('hover');
    const number = document.createElement('p');
    number.innerHTML = day;
    dateContainer.appendChild(number);

    //TODO learn this function properly
    const isAllPlantsSelected = !plants[selectedPlantIndex];

    let hasEntry = false;

    if (isAllPlantsSelected) {
      for (const plant of plants) {
        const dateKey = `${plant.name}_${currentYear}-${currentMonth + 1}-${day}`;
        if (localStorage.getItem(dateKey)) {
          hasEntry = true;
          break;
        }
      }
    } else {
      const selectedPlant = plants[selectedPlantIndex];
      const dateKey = `${selectedPlant.name}_${currentYear}-${currentMonth + 1}-${day}`;
      hasEntry = localStorage.getItem(dateKey);
    }

    if (hasEntry) {
      dateContainer.style.backgroundColor = 'rgba(0, 168, 107, 0.5)';
      dateContainer.style.borderRadius = '20px';

      dateContainer.addEventListener('mouseenter', () => {
        dateContainer.style.backgroundColor = 'rgba(0, 168, 107, 1)';
      });

      dateContainer.addEventListener('mouseleave', () => {
        dateContainer.style.backgroundColor = 'rgba(0, 168, 107, 0.5)';
      });
    }

    // Highlight today
    if (
      day == currentDate &&
      currentMonth === todayMonth &&
      currentYear === todayYear
    ) {
      dateContainer.style.color = 'red';
    }

    // Click to open entry
    dateContainer.addEventListener('click', () => {
      loadEntries(currentMonth, day, currentYear);
    });

    calendar.append(dateContainer);
  }

  // Update month title
  monthHeader.innerHTML = `${monthArray[currentMonth]} - ${currentYear}`;
}

function calendarTransition(number) {
  //if number is 1 then calendar shifts back
  if (number === 1) {
    currentMonth = currentMonth - 1;
    //if current month is january (0) then set to december (11), and shift year to the year before
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear = currentYear - 1;
    }
    //sets new first day and last day for the generateCalendar function to use
    firstDay = new Date(currentYear, currentMonth, 1).getDay();
    lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  //if number is not one calendar shifts forward
  } else {
    currentMonth = currentMonth + 1
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
    }
    firstDay = new Date(currentYear, currentMonth, 1).getDay();
    lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  }
  generateCalendar();
  console.log(currentMonth)
}

//reset entries function
/*function resetOnlyEntries() {
  const keysToRemove = [];

  // Loop through all keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // If the key includes an underscore and looks like a calendar entry
    if (/_\d{4}-\d{1,2}-\d{1,2}$/.test(key)) {
      keysToRemove.push(key);
    }
  }

  // Remove matching keys
  keysToRemove.forEach(key => localStorage.removeItem(key));

  alert("All calendar entries have been reset.");
  location.reload(); // Optional: Refresh the page
} */

//sets event listeners and calls generateCalendar
leftArrow.addEventListener("click", () => {
  calendarTransition(1)
});
rightArrow.addEventListener('click', () => {
  calendarTransition(2)
});

loadPlants();

generateCalendar();

document.getElementById('plant-selector').addEventListener('change', () => {
  generateCalendar(); // Refresh calendar with filtered dots
});
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
  const plants = JSON.parse(localStorage.getItem('plants') || '[]');
  const selector = document.getElementById('plant-selector');
  const list = document.getElementById('plant-list');

  selector.innerHTML = '<option disabled selected>Select a plant</option>';
  list.innerHTML = '';

  plants.forEach((plant, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = plant.name;
    selector.appendChild(option);

    const plantCard = document.createElement('div');
    plantCard.innerHTML = `<strong>${plant.name}</strong> (${plant.type || 'Unknown'})<br>
      ${plant.photo ? `<img src="${plant.photo}" alt="${plant.name}" width="100">` : ''}`;
    list.appendChild(plantCard);
  });
}

document.getElementById('plant-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('plant-name').value.trim();
  const type = document.getElementById('plant-type').value.trim();
  const photo = document.getElementById('plant-photo').value.trim();

  const plants = JSON.parse(localStorage.getItem('plants') || '[]');
  plants.push({ name, type, photo });
  localStorage.setItem('plants', JSON.stringify(plants));

  this.reset();
  loadPlants();
});

loadPlants();

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
  const plants = JSON.parse(localStorage.getItem('plants') || '[]');

  if (!plants[selectedPlantIndex]) {
    alert('Please select a plant first!');
    return;
  }

  const plantName = plants[selectedPlantIndex].name;
  const entryKey = `${plantName}_${dateKey}`; // e.g., "Monstera_2025-5-8"

  form.style.display = 'block';
  title.innerText = `Note for ${plantName} on ${monthArray[month]} ${day}, ${year}`;

  const saved = localStorage.getItem(entryKey);
  textarea.value = saved || '';
  output.innerText = saved ? `Saved note: ${saved}` : 'No note saved.';

  saveBtn.onclick = function () {
    const entry = textarea.value.trim();
    if (entry) {
      localStorage.setItem(entryKey, entry);
      output.innerText = `Saved note: ${entry}`;
    } else {
      localStorage.removeItem(entryKey);
      output.innerText = 'Note cleared.';
    }
  };
}

function generateCalendar() {

  //empties calendar
  calendar.innerHTML = '';

  //creates blank spaces on calendar by adding an empty space every time i is less than firstDay of month (sunday = 0, sat = 6)
  for(let i = 0; i < firstDay; i++) {
    const blankSpace = document.createElement('div');
    blankSpace.classList.add('empty');

    calendar.append(blankSpace);
  }

  //fills in rest of calendar as long as i is <= last day, also sets calendar header
  for(let i = 1; i <= lastDay; i++) {
    const dateContainer = document.createElement('div');
    dateContainer.classList.add('hover')
    const number = document.createElement('p');
    monthHeader.innerHTML = monthArray[currentMonth]+ ' - ' + currentYear;
    //sets background of current day to red
    if(i == currentDate && currentMonth === todayMonth && currentYear === todayYear) {
      dateContainer.style.backgroundColor = 'red'
    }
  
    number.innerHTML = i;
    dateContainer.appendChild(number);
    //adds event listener to each date on calendar and passes date to loadEntries
    dateContainer.addEventListener('click', () => {
      loadEntries(currentMonth, i, currentYear)
    });
    calendar.append(dateContainer);
  }
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

//sets event listeners and calls generateCalendar
leftArrow.addEventListener("click", () => {
  calendarTransition(1)
});
rightArrow.addEventListener('click', () => {
  calendarTransition(2)
});

generateCalendar();
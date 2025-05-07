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

function loadEntries(month, day, year) {
  const form = document.getElementById('entry-form');
  const title = document.getElementById('entry-title');
  const textarea = document.getElementById('entry-text');
  const output = document.getElementById('entry-output');
  const saveBtn = document.getElementById('save-entry');

  const key = `${year}-${month + 1}-${day}`; // e.g., "2025-5-7"

  form.style.display = 'block';
  title.innerText = `Entries for ${monthArray[month]} ${day}, ${year}`;

  // Load from localStorage
  const savedEntry = localStorage.getItem(key);
  textarea.value = savedEntry || '';
  output.innerText = savedEntry ? `Last saved: ${savedEntry}` : 'No previous entry.';

  // Save on button click
  saveBtn.onclick = function () {
    const entry = textarea.value.trim();
    if (entry) {
      localStorage.setItem(key, entry);
      output.innerText = `Last saved: ${entry}`;
    } else {
      localStorage.removeItem(key);
      output.innerText = 'Entry cleared.';
    }
  };
}

function generateCalendar() {

  calendar.innerHTML = '';

  for(let i = 0; i < firstDay; i++) {
    const blankSpace = document.createElement('div');
    blankSpace.classList.add('empty');

    calendar.append(blankSpace);
  }

  for(let i = 1; i <= lastDay; i++) {
    const dateContainer = document.createElement('div');
    dateContainer.classList.add('hover')
    const number = document.createElement('p');
    monthHeader.innerHTML = monthArray[currentMonth]+ ' - ' + currentYear;
    if(i == currentDate && currentMonth === todayMonth && currentYear === todayYear) {
      dateContainer.style.backgroundColor = 'red'
    }
  
    number.innerHTML = i;
    dateContainer.appendChild(number);
    dateContainer.addEventListener('click', () => {
      loadEntries(currentMonth, i, currentYear)
    });
    calendar.append(dateContainer);
  }
}

function calendarTransition(number) {
  if (number === 1) {
    currentMonth = currentMonth - 1;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear = currentYear - 1;
    }
    firstDay = new Date(currentYear, currentMonth, 1).getDay();
    lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
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
leftArrow.addEventListener("click", () => {
  calendarTransition(1)
});
rightArrow.addEventListener('click', () => {
  calendarTransition(2)
});

generateCalendar();
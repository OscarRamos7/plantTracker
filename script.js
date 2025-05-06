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
  console.log(month + 1, day, year)
  //TODO
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






/*

function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay(); // Day of week (0-6)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of month
  
    console.log(`\n${year} - ${month + 1}`);
    console.log("Sun Mon Tue Wed Thu Fri Sat");
  
    let day = 1;
    let output = "";
  
    // Add leading spaces for first row
    for (let i = 0; i < firstDay; i++) {
      output += "    ";
    }
  
    for (let i = firstDay; day <= daysInMonth; i++) {
      output += day.toString().padStart(3, " ") + " ";
      if (i % 7 === 6) {
        output += "\n";
      }
      day++;
    }
  
    console.log(output);
  }
  
  generateCalendar(3, 2025); // April 2025 (note: months are 0-indexed)
  */
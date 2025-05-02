// date constructor -- Date(year, month, day, hour, minute, second, ms)
const calendar = document.getElementById('calendar');
const currentDate = new Date().getDate();
const currentDay = new Date().getDay();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

console.log(lastDay);

for(let i = 1; i < lastDay; i++) {
  const dateContainer = document.createElement('div');
  const number = document.createElement('p');

  number.innerHTML = i;
  dateContainer.appendChild(number);
  calendar.append(dateContainer);
}






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
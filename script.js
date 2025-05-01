// date constructor -- Date(year, month, day, hour, minute, second, ms)
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
  
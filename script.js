// web-component export

export function initializeDatepicker(dpInput, cal, monthYear, days) {
  let today = new Date(),
      currMonth = today.getMonth(),
      currYear = today.getFullYear();

  function render (month, year){
    days.innerHTML = "";
    monthYear.textContent = new Date(year, month).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++){
      days.innerHTML += "<div></div>";
    }

    for (let d = 1; d <= totalDays; d++){
      const cell = document.createElement("div");
      cell.textContent = d;

      if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        cell.classList.add("today");
      }

      cell.addEventListener("click", () => {
        dpInput.value = `${year}-${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
        cal.style.display = "none";
      });

      days.appendChild(cell);
    }
  }

  dpInput.addEventListener("click", () => {
    cal.style.display = cal.style.display === "block" ? "none" : "block";
    render(currMonth, currYear);
  });

  cal.querySelector(".next").onclick = () => {
    currMonth = currMonth + 1 > 11 ? 0 : currMonth + 1;
    if (currMonth === 0) currYear++;
    render(currMonth, currYear);
  }

  cal.querySelector(".prev").onclick = () => {
    currMonth = currMonth - 1 < 0 ? 11 : currMonth - 1;
    if (currMonth === 11) currYear--;
    render(currMonth, currYear);
  }
}

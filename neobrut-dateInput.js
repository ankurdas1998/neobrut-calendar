const baseURL = "https://cdn.jsdelivr.net/gh/ankurdas1998/neobrut-calendar";

function initializeDatepicker(dpInput, cal, monthYear, days) {
  let today = new Date(),
    currMonth = today.getMonth(),
    currYear = today.getFullYear();

  function render(month, year) {
    days.innerHTML = "";
    monthYear.textContent = new Date(year, month).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.innerHTML += "<div></div>";
    }

    for (let d = 1; d <= totalDays; d++) {
      const cell = document.createElement("div");
      cell.textContent = d;

      if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        cell.classList.add("today");
      }

      cell.addEventListener("click", () => {
        dpInput.value = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(
          2,
          "0",
        )}`;
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
  };

  cal.querySelector(".prev").onclick = () => {
    currMonth = currMonth - 1 < 0 ? 11 : currMonth - 1;
    if (currMonth === 11) currYear--;
    render(currMonth, currYear);
  };
}

class NeoBrutDateInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const dpInput = document.createElement("input");
    dpInput.classList.add("datepicker-input");
    const cal = document.createElement("div");
    cal.classList.add("calendar");
    const monthYear = document.createElement("div");
    monthYear.classList.add("month-year");
    const days = document.createElement("div");
    days.classList.add("days");

    shadow.appendChild(dpInput);
    shadow.appendChild(cal);
    cal.appendChild(monthYear);
    cal.appendChild(days);

    fetch(`${baseURL}/index.css`)
      .then((res) => res.text())
      .then((css) => {
        const style = document.createElement("style");
        style.textContent = css;
        shadow.appendChild(style);

        initializeDatepicker(dpInput, cal, monthYear, days);
      });
  }
}

customElements.define("neobrut-dateInput", NeoBrutDateInput);

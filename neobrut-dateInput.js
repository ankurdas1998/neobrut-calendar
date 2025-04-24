import { initializeDatepicker } from "./script.js";

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

    fetch("index.css")
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

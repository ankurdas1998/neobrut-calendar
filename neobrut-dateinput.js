class NeoBrutDateInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div class="datepicker">
        <input type="text" class="datepicker-input" readonly placeholder="Select date" />
        <div class="calendar" style="display:none">
          <header>
            <button class="prev">&lt;</button>
            <div class="month-year"></div>
            <button class="next">&gt;</button>
          </header>
          <div class="weekdays">
            <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          </div>
          <div class="days"></div>
        </div>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      :host {
        --light: #e0e0e0;
        --dark: #222222;
        --accent: #f0f0f0;
        --btn: #f0f0f0;
        --border: #222222;
        --text: #222222;
        --today: #f0f0f0;

        --font-family: Helvetica;
        --width: 300px;

        display: inline-block;
        min-width: var(--width);
        font-family: var(--font-family);
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      * {
        margin: 0;
        padding: 0;
      }

      input,
      button{
        font: inherit;
        cursor: pointer;
        border: 3px solid var(--border);
        border-color: var(--border);
        box-shadow: 4px 4px 0 var(--dark);
        background-color: var(--btn);
        transition: all 0.1s ease-in;

        &:hover {
          transform: translate(4px, 4px);
          box-shadow: none;
        }
      }

      .datepicker{
        width: var(--width);
        position: relative;
        display: inline-block;
      }

      .datepicker-input{
        width: 100%;
        padding: 0.5em;
        color: var(--text);
        font-weight: 600;

        &:focus{
          outline: none;
        }
      }

      .calendar{
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 0.5em;
        padding: 0.5em;
        text-align: center;
        background-color: var(--light);
        border: 3px solid var(--border);
        box-shadow: 4px 4px 0 var(--dark);
        user-select: none;
        z-index: 10;
        display: none;
      }

      .calendar header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5em;
      }

      .calendar header button {
        display: grid;
        place-content: center;
        width: 2em;
        height: 2em;
      }

      .month-year{
        font-weight: bold;
        color: var(--text);
      }

      .weekdays,
      .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        width: 100%;
        text-align: center;
      }

      .weekdays div {
        font-weight: 800;
        color: var(--text);
        margin-bottom: 0.25em;
      }

      .days div {
        font-weight: 600;
        padding: 0.25em;
        margin: 0.1em;
        cursor: pointer;
        border: 2px solid transparent;
        color: var(--text);

        &:hover{
          border-color: var(--border);
          background-color: var(--accent);
        }
      }

      .days .today {
        background-color: var(--today);
        position: relative;

        &::after{
          content: "";
          position: absolute;
          inset: 0;
          border: 2px dotted grey;
          pointer-events: none;
        }
      }
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(wrapper);

    // Local references inside shadow DOM
    this.input = this.shadowRoot.querySelector(".datepicker-input");
    this.calendar = this.shadowRoot.querySelector(".calendar");
    this.monthYear = this.shadowRoot.querySelector(".month-year");
    this.daysContainer = this.shadowRoot.querySelector(".days");

    // Initial state
    this.currDate = new Date();
    this.currMonth = this.currDate.getMonth();
    this.currYear = this.currDate.getFullYear();

    // Event bindings
    this.input.addEventListener("click", () => {
      this.calendar.style.display = this.calendar.style.display === "block" ? "none" : "block";
      this.render(this.currMonth, this.currYear);
    });

    this.shadowRoot.querySelector(".next").addEventListener("click", () => {
      this.currMonth = this.currMonth + 1 > 11 ? 0 : this.currMonth + 1;
      if (this.currMonth === 0) this.currYear++;
      this.render(this.currMonth, this.currYear);
    });

    this.shadowRoot.querySelector(".prev").addEventListener("click", () => {
      this.currMonth = this.currMonth - 1 < 0 ? 11 : this.currMonth - 1;
      if (this.currMonth === 11) this.currYear--;
      this.render(this.currMonth, this.currYear);
    });
  }

  render(month, year) {
    const today = new Date();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    this.monthYear.textContent = `${today.toLocaleString("default", { month: "long" })} ${year}`;
    this.daysContainer.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
      this.daysContainer.innerHTML += "<div></div>";
    }

    for (let d = 1; d <= totalDays; d++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = d;

      if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayDiv.classList.add("today");
      }

      dayDiv.addEventListener("click", () => {
        this.input.value = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(
          2,
          "0",
        )}`;
        this.calendar.style.display = "none";
      });

      this.daysContainer.appendChild(dayDiv);
    }
  }
}

customElements.define("neobrut-dateinput", NeoBrutDateInput);

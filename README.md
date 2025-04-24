# NeoBrut Date Input

A lightweight and customizable date input component built as a **Web Component** that you can easily integrate into any HTML page or project.

### Features:

- Fully customizable date picker via **CSS variables**.
- Easy to integrate using just a script tag.
- No external dependencies.
- Works across different browsers.
- **Shadow DOM** encapsulation to avoid conflicts with your existing styles.

---

## Table of Contents

- [Usage](#usage)
- [Customization](#customization)
- [Layout Notes](#layout-notes)
- [Example](#example)
- [License](#license)

## Usage

#### Include the Component

You can directly import it via CDN:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/ankurdas1998/neobrut-calendar/neobrut-dateinput.js"
></script>
```

#### Use in HTML

```
<neobrut-dateinput></neobrut-dateinput>
```

### Customization

#### You can override styles globally or per element:

```
neobrut-dateinput {
  --light: #fff3e0;
  --dark: #000;
  --accent: #ffc107;
  --btn: #ffffff;
  --border: #000;
  --text: #111;
  --today: #ffe082;

  --font-family: 'Courier New', monospace;
  --width: 280px;
}
```

| Variable        | Description                   | Default   |
| --------------- | ----------------------------- | --------- |
| `--light`       | Calendar background color     | `#e0e0e0` |
| `--dark`        | Shadow color for 3D effect    | `#222222` |
| `--accent`      | Hover background for dates    | `#f0f0f0` |
| `--btn`         | Button background color       | `#f0f0f0` |
| `--border`      | Border color for all elements | `#222222` |
| `--text`        | Text color                    | `#222222` |
| `--today`       | Highlight for today           | `#f0f0f0` |
| `--font-family` | Font for all text             | Helvetica |
| `--width`       | Width of component            | `300px`   |

## Layout Notes

The component has a **minimum practical width of 250px**. Below this, the day grid may overflow.

To support smaller widths, you can reduce the font size using:

```
neobrut-dateinput {
  font-size: 0.875rem; /* or smaller */
}
```

## Example

<figure>
  <img src="./images/Example Styling.png" alt="Customised Calendar Preview" />
  <figcaption style="text-align:center; font-style: italic;">Customising Calendar component example</figcaption>
</figure>

## License

MIT © 2025 Ankur Das

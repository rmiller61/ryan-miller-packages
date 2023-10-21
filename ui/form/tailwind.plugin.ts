import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

const [baseFontSize, { lineHeight: baseLineHeight }] = defaultTheme.fontSize.base
const { spacing, borderWidth, borderRadius } = defaultTheme

function resolveColor(color: string, opacityVariableName: string) {
  return color.replace("<alpha-value>", `var(${opacityVariableName}, 1)`)
}

const DEFAULT_COLORS = {
  inputBorder: "#7c7c7c",
  placeholder: "#aaaaaa",
  selectPointer: "#7c7c7c",
  checkboxBorder: "#7c7c7c",
  inputRingColor: "#cccccc",
}

const twPlugin = plugin(function ({ addBase, addComponents, theme }) {
  addBase({
    "[type='text'], input:where(:not([type])), [type='email'], [type='url'], [type='password'],[type='number'],[type='date'],[type='datetime-local'],[type='month'],[type='search'],[type='tel'],[type='time'],[type='week'],[multiple],textarea,select":
      {
        appearance: "none",
        "background-color": "#fff",
        "border-color": resolveColor(
          theme("colors.inputBorder", DEFAULT_COLORS.inputBorder),
          "--tw-border-opacity"
        ),
        "border-width": borderWidth["DEFAULT"],
        "border-radius": borderRadius.none,
        "padding-top": spacing[2],
        "padding-right": spacing[3],
        "padding-bottom": spacing[2],
        "padding-left": spacing[3],
        "font-size": baseFontSize,
        "line-height": baseLineHeight,
        "--tw-shadow": "0 0 #0000",
      },
    "input::placeholder, textarea::placeholder": {
      color: resolveColor(
        theme("colors.placeholder", DEFAULT_COLORS.placeholder),
        "--tw-text-opacity"
      ),
      opacity: "1",
    },
    "::-webkit-datetime-edit-fields-wrapper": {
      padding: "0",
    },
    "::-webkit-date-and-time-value": {
      "min-height": "1.5em",
      "text-align": "inherit",
    },
    "::-webkit-datetime-edit": {
      display: "inline-flex",
    },
    "::-webkit-datetime-edit,::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field":
      {
        "padding-top": "0px",
        "padding-bottom": "0px",
      },
    select: {
      "background-image": `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23${
        (theme("selectPointer", DEFAULT_COLORS.selectPointer), "--tw-stroke-opacity")
      }' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
      "background-position": `right ${spacing[2]} center`,
      "background-repeat": `no-repeat`,
      "background-size": `1.5em 1.5em`,
      "padding-right": spacing[10],
      "print-color-adjust": `exact`,
    },
    '[multiple], [size]:where(select:not([size="1"]))': {
      "background-image": "initial",
      "background-position": "initial",
      "background-repeat": "unset",
      "background-size": "initial",
      "padding-right": spacing[3],
      "print-color-adjust": "unset",
    },
    "[type='checkbox'], [type='radio']": {
      appearance: "none",
      padding: "0",
      "print-color-adjust": "exact",
      display: "inline-block",
      "vertical-align": "middle",
      "background-origin": "border-box",
      "user-select": "none",
      "flex-shrink": "0",
      height: spacing[4],
      width: spacing[4],
      color: "currentColor",
      "background-color": "#fff",
      "border-color": resolveColor(
        theme("checkboxBorder", DEFAULT_COLORS.checkboxBorder),
        "--tw-border-opacity"
      ),
      "border-width": borderWidth["DEFAULT"],
      "--tw-shadow": "0 0 #0000",
    },
    "[type='checkbox']": {
      "border-radius": borderRadius["none"],
    },
    "[type='radio']": {
      "border-radius": "100%",
    },
    "[type='checkbox']:focus, [type='radio']:focus": {
      outline: "2px solid transparent",
      "outline-offset": "2px",
      "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-ring-offset-width": "2px",
      "--tw-ring-offset-color": "#fff",
      "--tw-ring-color": resolveColor(
        theme("inputRingColor", DEFAULT_COLORS.inputRingColor),
        "--tw-ring-opacity"
      ),
      "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
      "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
      "box-shadow": `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)`,
    },
    "[type='checkbox']:checked, [type='radio']:checked": {
      "border-color": `transparent`,
      "background-color": `currentColor`,
      "background-size": `100% 100%`,
      "background-position": `center`,
      "background-repeat": `no-repeat`,
    },
    "[type='checkbox']:checked": {
      "background-image": `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`,
    },
    "[type='radio']:checked": {
      backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")`,
    },
    "[type='checkbox']:checked:hover, [type='checkbox']:checked:focus,[type='radio']:checked:hover`, [type='radio']:checked:focus":
      {
        "border-color": "transparent",
        "background-color": "currentColor",
      },
    "[type='checkbox']:indeterminate": {
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e")`,
      "border-color": `transparent`,
      "background-color": `currentColor`,
      "background-size": `100% 100%`,
      "background-position": `center`,
      "background-repeat": `no-repeat`,
    },
    "[type='checkbox']:indeterminate:hover, [type='checkbox']:indeterminate:focus": {
      "border-color": "transparent",
      "background-color": "currentColor",
    },
    "[type='file']": {
      background: "unset",
      "border-color": "inherit",
      "border-width": "0",
      "border-radius": "0",
      padding: "0",
      "font-size": "unset",
      "line-height": "inherit",
    },
    "[type='file']:focus": {
      outline: [`1px solid ButtonText`, `1px auto -webkit-focus-ring-color`],
    },
  })
})

export default twPlugin

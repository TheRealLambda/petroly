export default function CustomSelectOption({ selectValue }) {
  return (
    <div className="option text-14-medium button_effect_1_dark" data-select-value={selectValue}>{selectValue}</div>
  )
}
export default function CustomSelectOption({ selectValue }) {
  return (
    <div className="option text-14-medium" data-select-value={selectValue}>{selectValue}</div>
  )
}
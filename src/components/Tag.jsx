import "./styles/tag.css"

const Tag = ({name, color}) => {

  return (
    <div className="tag bgcolor-white0">
      <div className="circle" style={{backgroundColor: color}}></div>
      <p className="text-10-regular color-accent">{name}</p>
    </div>
  )
}

export default Tag
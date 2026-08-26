
import { useAnecdoteActions } from "../store"

const Filter = () => {
    const { setFilter } = useAnecdoteActions()

    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      event.preventDefault()
      setFilter(event.target.value)
      
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} data-testid="filter"/>
      </div>
    )
  }
  
  export default Filter
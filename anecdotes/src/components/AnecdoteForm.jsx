import { useAnecdoteActions } from "../store"
import anecdoteService from '../services/anecdotes'
import { useNotificationActions } from "../store"

const AnecdoteForm = () => {
    const {add} = useAnecdoteActions()
    const {setNotification} = useNotificationActions()

    const addAnecdote = async (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      //const newAnecdote = await anecdoteService.createNew(content)
      await add(content)
      
      e.target.reset()
      await setNotification(`Added '${content}'.`)
      setTimeout(() => {setNotification(null)}, 5000)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
      </div>
    )
}

export default AnecdoteForm
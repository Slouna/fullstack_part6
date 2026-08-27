import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useAnecdotes } from "../hooks/useAnecdotes"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"
import useNotify from "../hooks/useNotify"

const AnecdoteForm = () => {
  const {addAnecdote: addAnecdoteToServer} = useAnecdotes()
  const {setMessage} = useNotify()
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    //Not sure if this is the place where error handling was meant to be done but it works
    if (content.length < 5){
      event.target.reset()
      setMessage(`too short anecdote, must have length 5 or more`)
      setTimeout(() => {setMessage(null)}, 5000)

    }
    else{
      
      event.target.reset()
      addAnecdoteToServer(content)
      setMessage(`'${content}' was created`)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
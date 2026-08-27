const baseUrl = 'http://localhost:3001/anecdotes'
import { useContext } from "react"
import NotificationContext from "./components/NotificationContext"

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('anecdote service not available due to problems in server')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
    const {message, setMessage} = useContext(NotificationContext)

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnecdote)
    }
   
    const response = await fetch(baseUrl, options)
   
    if (!response.ok) {
      throw new Error('Failed to create anecdote')
    }
   
    return await response.json()
  }


  export const updateAnecdote = async (updatedAnecdote) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAnecdote)
    }
  
    const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)
  
    if (!response.ok) {
      throw new Error('Failed to update note')
    }
  
    return await response.json()
  }
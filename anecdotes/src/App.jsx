
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import { useEffect } from "react"
import anecdoteService from './services/anecdotes'
import { useAnecdoteActions } from "./store"
import Notification from "./components/Notification"

const App = () => {
  const {initialize} = useAnecdoteActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App

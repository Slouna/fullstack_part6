import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery, useMutation, QueryClient, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests.js'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const {anecdotes, isPending, isError, vote} = useAnecdotes()
  
  if (isPending) {
    return <div>loading data...</div>
  }

  if(isError){
    return <div>anecdote service not available due to problems in server</div>
  }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
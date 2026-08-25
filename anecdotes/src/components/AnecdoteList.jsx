import { useAnecdotes, useAnecdoteActions, useFilter } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const {vote} = useAnecdoteActions()
    const filter = useFilter()

    const anecdotesToShow = anecdotes.filter(anecdote => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
      })
      

    return(
        <div>
            {anecdotesToShow.toSorted((a,b) =>  b.votes - a.votes).map((anecdote) => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList
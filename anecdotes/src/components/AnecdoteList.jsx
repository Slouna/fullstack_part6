import { useAnecdotes, useAnecdoteActions, useFilter, useNotificationActions } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const {vote} = useAnecdoteActions()
    const filter = useFilter()
    const {setNotification} = useNotificationActions()
    const {deleteAnecdote} = useAnecdoteActions()

    
    
    const giveVote = (anecdote) => {
        vote(anecdote.id)
        setNotification(`you voted '${anecdote.content}'`)
        setTimeout(() => {setNotification(null)}, 5000)
    }


    return(
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => giveVote(anecdote)}>vote</button>
                    {anecdote.votes === 0 ? <button onClick={() => deleteAnecdote(anecdote.id)}>Delete</button>: null}
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList
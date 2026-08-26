
import { create } from 'zustand'
import {useShallow} from 'zustand/react/shallow'
import anecdoteService from './services/anecdotes'
import {devtools} from 'zustand/middleware'
import anecdotes from './services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create(devtools((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({anecdotes}))
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(anecdote => anecdote.id === id)
      const updated = await anecdoteService.update(
        id, {...anecdote, votes: anecdote.votes + 1}
      )
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote =>
        anecdote.id === id ? updated : anecdote)})
    )},
    add: async (content) =>{
        const newAnecdote = await anecdoteService.createNew(content)
        set(state => ({anecdotes: [...state.anecdotes, newAnecdote]})
    )},
    deleteAnecdote: async (id) => {
      await anecdoteService.deleteAnecdote(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
    },
    setFilter: 
      value => set(() => ({ filter: value }))
  },
})))

const useNotificationStore = create((set) =>({
  notification: null,
  actions:{
    setNotification: value => set(() => ({ notification: value }))
  }
}))


export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state => state.anecdotes))
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useNotifications = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
export default useAnecdoteStore
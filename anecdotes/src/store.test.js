import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act, render } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
    default: {
      getAll: vi.fn(),
      createNew: vi.fn(),
      update: vi.fn(),
    }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, {useAnecdotes, useFilter, useAnecdoteActions} from './store'


beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
    vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
    const mockAnecdotes = [{
        "content": "Make it work, then make it fast",
        "id": "5",
        "votes": 0
      },
      {
        "content": "There are two hard things in computer science",
        "id": "4",
        "votes": 3
      },
      {
        "content": "Untested code is broken code",
        "id": "3",
        "votes": 3
      },
      {
        "content": "Simplicity is the ultimate sophistication",
        "id": "2",
        "votes": 5
      },
      {
        "content": "Real artists ship code",
        "id": "1",
        "votes": 7
      } ]

    it('initialize loads anecdotes from service', async () => {
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const {result} = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const {result: anecdotesResult} = renderHook(() => useAnecdotes())
        expect(useAnecdoteStore.getState().anecdotes).toEqual(mockAnecdotes)
        
    })


    it('anecdotes are in order of votes', async () => {
        useAnecdoteStore.setState({
            anecdotes: mockAnecdotes
        })

        const { result } = renderHook(() => useAnecdotes())


        expect(result.current[0].content).toBe('Real artists ship code')
        expect(result.current[1].content).toBe('Simplicity is the ultimate sophistication')
        expect(result.current[2].content).toBe('There are two hard things in computer science')
        expect(result.current[3].content).toBe('Untested code is broken code')
        expect(result.current[4].content).toBe('Make it work, then make it fast')
    })

    it('gets filtered list of anecdtes', () => {
        useAnecdoteStore.setState({
            anecdotes: mockAnecdotes,
            filter: 'ar'
        })

        const {result} = renderHook(() => useAnecdotes())
        console.log(result.current);
        expect(result.current).toHaveLength(2)
        expect(result.current).toEqual([mockAnecdotes[4], mockAnecdotes[1]])

    })

    it('voting increases the votes', async () => {
        const anecdote = {
        content: "Make it work, then make it fast",
        id: "5",
        votes: 0
      }
      console.log(anecdote.votes);
        useAnecdoteStore.setState({
            anecdotes: [anecdote]
        })
        anecdoteService.update.mockResolvedValue({...anecdote, votes: anecdote.votes + 1})

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.vote("5")
          })
        

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current[0].votes).toBe(1)
    })
    
})




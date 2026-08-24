import { create } from 'zustand'

export const useFeedbackStore = create(set => ({
    all: 0,
    good: 0,
    neutral: 0,
    bad: 0,
    average: 0,
    positive: 0,
    voteGood: () => set(state => ({ good: state.good + 1, all: state.all + 1 })),
    voteNeutral: () => set(state => ({ neutral: state.neutral + 1, all: state.all + 1 })),
    voteBad: () => set(state => ({ bad: state.bad + 1, all: state.all + 1 })), 
    changePositive: () => {}
  }))
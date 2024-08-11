
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
export interface modalState {
    value: boolean
}

// Define the initial state using that type
const initialState = {
    value: false
} as modalState

export const statesmodalSlice = createSlice({
    name: 'modalstate',
    initialState,
    reducers: {
        change: (state) => {
            state.value = !state.value
        },

    },
})

export const { change } = statesmodalSlice.actions

export const selectCount = (state: RootState) => state.states.value

export default statesmodalSlice.reducer
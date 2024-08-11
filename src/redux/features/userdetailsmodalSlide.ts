import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
export interface detailsmodalState {
    value: boolean
}

// Define the initial state using that type
const initialState = {
    value: false
} as detailsmodalState

export const userdetailsmodalSlice = createSlice({
    name: 'detailsmodalstate',
    initialState,
    reducers: {
        changedetailsmodal: (state) => {
            state.value = !state.value
        },

    },
})

export const { changedetailsmodal } = userdetailsmodalSlice.actions

export const selectCount = (state: RootState) => state.details.value

export default userdetailsmodalSlice.reducer
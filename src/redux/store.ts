
import { configureStore } from '@reduxjs/toolkit'
import statesmodalReducer from './features/statesmodalSlide'
import detailsmodalReducer from './features/userdetailsmodalSlide'

export const store = configureStore({
    reducer: {
        states: statesmodalReducer,
        details: detailsmodalReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
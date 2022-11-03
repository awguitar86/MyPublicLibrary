import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { booksApiSlice } from './booksApiSlice';
export const store = configureStore({
  reducer: {
    [booksApiSlice.reducerPath]: booksApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApiSlice.middleware),
})
setupListeners(store.dispatch)
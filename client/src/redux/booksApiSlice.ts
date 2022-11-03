import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from '../BookModels';

export const booksApiSlice = createApi({
  reducerPath: 'booksApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080'
  }),
  tagTypes: ['Get'],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], string>({
      query: (genre) => genre ? `/books?genre=${genre}` : '/books'
    })
  })
})

export const { useGetBooksQuery } = booksApiSlice;

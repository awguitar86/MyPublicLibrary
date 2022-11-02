export type Genres = 'Adventure' | 'Children' | 'Classic' | 'Biography' | 'Cooking' | 'Hobbies' | 'Fantasy' | 'History';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  checkedOut: boolean;
  createdAt: string;
  updatedAt: string;
}
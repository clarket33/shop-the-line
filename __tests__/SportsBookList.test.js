import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import SportsBookList from '../src/app/components/SportsBookList';
import {bookmaker_names, bookmaker_links} from '../src/app/lib/Resources.js';

describe('Sportsbook List component', () => {
  test('list should have all sportsbooks', () => {
    render(<SportsBookList />);
    const bookList = screen.getAllByRole('button');
    expect(bookList).toHaveLength(Object.keys(bookmaker_names).length);
  });

  test('books should have correct links', () => {
    render(<SportsBookList />);
    const bookList = screen.getAllByTestId('sportsbook');
    for(const book of bookList){
        const aTag = book.querySelector('a');
        const link = aTag.getAttribute('href');
        const text = aTag.textContent;
        expect(bookmaker_links[Object.keys(bookmaker_names).find(key => bookmaker_names[key] === text)]).toBe(link);
    }
  });
});
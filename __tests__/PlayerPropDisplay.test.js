import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import PlayerPropDisplay from '../src/app/components/PlayerPropDisplay';
import DataContext from '../src/app/components/DataContext';
import football_player_data from '../src/app/lib/sampledata/americanfootball_nfl_player_props.json';
import { bookmaker_names } from "../src/app/lib/Resources.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockDataContextSuccess = {
  data:  football_player_data, 
  status: 'success',
};

const mockDataContextLoading = {
    data:  football_player_data, 
    status: 'loading',
  };

const mockDataContextError = {
data:  football_player_data, 
status: 'error',
};

const queryClient = new QueryClient();

let player_prop_options = new Set();
let player_options = new Set();
let sort_options = new Set();

for(const bookmaker of football_player_data.bookmakers){
  for(const market of bookmaker.markets){
    player_prop_options.add(market.key);
    for(const outcome of market.outcomes){
      player_options.add(outcome.description);
      sort_options.add(outcome.name);
    }
  }
}




describe('Player Props Component success state', () => {

  const htmlToRender = 
    <QueryClientProvider client={queryClient}>
        <DataContext.Provider value={mockDataContextSuccess}>
            <PlayerPropDisplay key={"player-prop-" + mockDataContextSuccess.data.id}
                            game_id={mockDataContextSuccess.data.id}
                            sport={"americanfootball_nfl"}
                            bookies={new Set(Object.keys(bookmaker_names))}
                            checkedBest={false}/>
        </DataContext.Provider>
    </QueryClientProvider>
  

  test('on success should display Prop dropdown', () => {
    render(htmlToRender);
    const playerPropDisplayElement =  screen.getByText('Prop');
    const dropdown =  screen.getByRole('combobox');
    fireEvent.click(dropdown);
    expect(playerPropDisplayElement).toBeInTheDocument();
  });

  test('Prop dropdown options should appear on click', () => {
    render(htmlToRender);
    const playerPropDisplayElement =  screen.getByText('Prop');
    const dropdown =  screen.getByRole('combobox');
    fireEvent.click(dropdown);
    const options = screen.queryAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
  });

  test('Selecting Prop dropdown should trigger appearence of Player & Sort Dropdowns', () => {
    render(htmlToRender);
    const propDropdown =  screen.getByRole('combobox');
    fireEvent.click(propDropdown);
    const options = screen.getAllByRole('option');
    fireEvent.click(options[0]);
    const playerDropdown = screen.queryByText('Player');
    const sortDropdown = screen.queryByText('Sort for');
    expect(playerDropdown).not.toBe(null);
    expect(sortDropdown).not.toBe(null);
  });

  test('Should be able to change players', () => {
    render(htmlToRender);
    const dropdowns = screen.getAllByRole("combobox");
    let playerDropdown;
    for(const drop of dropdowns){
      if(player_options.has(drop.textContent)){
        playerDropdown = drop;
      }
    }
    fireEvent.click(playerDropdown);
    const newOptions = screen.getAllByRole('option', {selected:false});
    let newPlayer = newOptions[0].textContent;
    fireEvent.click(newOptions[0]);
    expect(playerDropdown.textContent).toBe(newPlayer);
  });

  test('Should be able to change sorting choice', () => {
    render(htmlToRender);
    const dropdowns = screen.getAllByRole("combobox");
    let sortDropdown;
    for(const drop of dropdowns){
      if(sort_options.has(drop.textContent)){
        sortDropdown = drop;
      }
    }
    
    fireEvent.click(sortDropdown);
    const newOptions = screen.getAllByRole('option');
    let newSorter = newOptions[0].textContent;
    fireEvent.click(newOptions[0]);
    expect(sortDropdown.textContent).toBe(newSorter);
    
  });
  
  
});


describe('Player Props Component loading & error states', () => {

    test('should display laoding ring while loading', () => {
        render(
          <QueryClientProvider client={queryClient}>
              <DataContext.Provider value={mockDataContextLoading}>
                  <PlayerPropDisplay key={"player-prop-" + mockDataContextLoading.data.id}
                                  game_id={mockDataContextLoading.data.id}
                                  sport={"americanfootball_nfl"}
                                  bookies={new Set(Object.keys(bookmaker_names))}
                                  checkedBest={false}/>
              </DataContext.Provider>
          </QueryClientProvider>
        );
          
        const playerPropDisplayLoading = screen.getByTestId('loader');
        expect(playerPropDisplayLoading).toBeInTheDocument();
    });

    test('should display error message on error', () => {
        render(
          <QueryClientProvider client={queryClient}>
              <DataContext.Provider value={mockDataContextError}>
                  <PlayerPropDisplay key={"player-prop-" + mockDataContextError.data.id}
                                  game_id={mockDataContextError.data.id}
                                  sport={"americanfootball_nfl"}
                                  bookies={new Set(Object.keys(bookmaker_names))}
                                  checkedBest={false}/>
              </DataContext.Provider>
          </QueryClientProvider>
        );
        const playerPropDisplayError = screen.getByText('An unexpected error has occurred. Please try again later');
        expect(playerPropDisplayError).toBeInTheDocument();
    });
});


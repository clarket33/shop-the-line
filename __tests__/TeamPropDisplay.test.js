import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import TeamPropDisplay from '../src/app/components/TeamPropDisplay';
import {americanfootball_nfl_team_props} from '../src/app/lib/SampleData/americanfootball_nfl_team_props.js';
import { bookmaker_names, team_prop_choices } from "../src/app/lib/Resources.js";
import DataContext from '../src/app/components/DataContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import football_extended_data from '../src/app/lib/SampleData/americanfootball_nfl_player_props.json';

const game_data = americanfootball_nfl_team_props[0];

const mockDataContextSuccess = {
  data:  football_extended_data, 
  status: 'success',
};

const mockDataContextLoading = {
    data:  football_extended_data, 
    status: 'loading',
  };

const mockDataContextError = {
data:  football_extended_data, 
status: 'error',
};

const queryClient = new QueryClient();

//let prop_options = new Set();
//let sub_prop_options = new Set();
//let sort_options = new Set();


describe('Team Props Component', () => {

  const htmlToRender = 
        <QueryClientProvider client={queryClient}>
        <DataContext.Provider value={mockDataContextSuccess}>
            <TeamPropDisplay key={"team-prop-" + game_data.id}
                            game_id={game_data.id}
                            away_team={game_data.awayTeam}
                            home_team={game_data.homeTeam}
                            bookmakers={game_data.bookmakers.filter((bk) => new Set(Object.keys(bookmaker_names)).has(bk.key))}
                            sport={"american_football"}
                            bookies={new Set(Object.keys(bookmaker_names))}
                            checkedBest={false}
                            withinRange={true}/>
        </DataContext.Provider>
        </QueryClientProvider>
  
        test('on success should display Prop dropdown with h2h defaulted', () => {
          render(htmlToRender);
          const dropDownValue =  screen.queryByText('Moneyline');
          expect(dropDownValue).not.toBe(null);
        });

    
  
});

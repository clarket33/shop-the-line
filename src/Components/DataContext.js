import { createContext, useContext } from 'react';
import { player_prop_markets } from "../Resources.js";
import { useQuery } from "@tanstack/react-query";

import football_data from './../SampleData/americanfootball_nfl_player_props.json';
import basketball_data from './../SampleData/basketball_nba_player_props.json';
import baseball_data from './../SampleData/baseball_mlb_player_props.json';
import hockey_data from './../SampleData/hockey_nhl_player_props.json';
import football_college_data from './../SampleData/americanfootball_ncaaf_player_props.json';
import basketball_college_data from './../SampleData/basketball_ncaab_player_props.json';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export const DataProvider = (event) => {
  let curr_sport = player_prop_markets.filter(sport => sport["label"] === event.sport)[0];
  const specMarketsForSport = curr_sport["team_markets"] + curr_sport["player_markets"];

  const fetchData = async () => {
    let odds;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      if(event.sport === 'americanfootball_nfl') odds = football_data;
      else if(event.sport === 'baseball_mlb') odds = baseball_data;
      else if(event.sport === 'basketball_nba') odds = basketball_data;
      else if(event.sport === 'icehockey_nhl') odds = hockey_data;
      else if(event.sport === 'americanfootball_ncaaf') odds = football_college_data;
      else if(event.sport === 'basketball_ncaab') odds = basketball_college_data;
      else odds = {};
    }
    else {
      const url = 'https://' + process.env.REACT_APP_AWS_API_ID + '.execute-api.' + process.env.REACT_APP_AWS_API_REGION + '.amazonaws.com/default/player-data-fetch?sport=' + event.sport + '&game_id=' + event.game_id + '&specMarkets=' + specMarketsForSport;
      const playerData = await fetch(url, {
        method: 'GET'
      });
      if (!playerData.ok) {
        throw new Error(playerData.status, playerData.statusText);
      }
      odds = await playerData.json();
    }

    return odds;
  };

  const { data, status } = useQuery([event.sport + ' - ' + event.game_id], fetchData,
    {
      staleTime: 60000,
      refetchOnWindowFocus: true,
      retry: 2
    }
);

  
            
  return (
    <DataContext.Provider value={{ data, status }}>
      {event.showChild && event.children}
    </DataContext.Provider>
  );
}

export default DataContext;
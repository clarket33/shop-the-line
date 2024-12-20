import React,{ useEffect, useState, useMemo, useCallback } from "react";
import GameOverview from "./GameOverview";
import PopupComponent from "./PopupComponent";
import SportsBookCustomize from "./SportsBookCustomize";
import SportSelector from "./SportSelector";
import '../Main.css';
import Footer from "./Footer";
import CookieConsent from "react-cookie-consent";
import Image from 'next/image';
import { bookmaker_names, league_titles, team_titles, usStates } from "../lib/Resources.js";
import { 
  Collapse,
  Input,
  Navbar,
  Typography,
  IconButton,
  Spinner,
  Alert,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, ArrowRightIcon, ArrowLeftIcon, Cog6ToothIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

import {americanfootball_nfl_team_props} from '../lib/sampledata/americanfootball_nfl_team_props.js';
import {icehockey_nhl_team_props} from '../lib/sampledata/hockey_nhl_team_props.js';
import {baseball_mlb_team_props} from '../lib/sampledata/baseball_mlb_team_props.js';
import {basketball_nba_team_props} from '../lib/sampledata/basketball_nba_team_props.js';
import {basketball_wnba_team_props} from '../lib/sampledata/basketball_wnba_team_props.js';
import {americanfootball_ncaaf_team_props} from '../lib/sampledata/americanfootball_ncaaf_team_props.js';
import {basketball_ncaab_team_props} from '../lib/sampledata/basketball_ncaab_team_props.js';


export default function Main() {
  const numGamesPerPage = 9;
  const [xAlertOpen, setXAlertOpen] = useState(window.sessionStorage.getItem('x_alert_dismissed') === 'true' ? false: true);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sport, setSport] = useState(window.localStorage.getItem('sport') || 'americanfootball_nfl');
  const [stateName, setStateName] = useState(window.localStorage.getItem('usState') || "ny");
  const [filterText, setFilterText] = useState(window.sessionStorage.getItem('filter_text_' + sport) ? window.sessionStorage.getItem('filter_text_' + sport) : "");
  const [bookies, setBookies] = useState(window.localStorage.getItem('my_sportsbooks') !== null ? new Set(JSON.parse(window.localStorage.getItem('my_sportsbooks'))) : new Set(Object.keys(bookmaker_names))) ;
  const [openNav, setOpenNav] = useState(false);
  const [pages, setPages] = useState(0);
  const [endIndex, setEndIndex] = useState(numGamesPerPage);

  const filterGames = useCallback(
    ({ target }) => {
      setFilterText(target.value);
      setActive(1);
      window.sessionStorage.setItem('filter_text_' + sport, target.value);
    },
    [sport],
  );

  const pull_user_books = (data) => {
    setBookies(data);
  }

  const sportChange = (sportChoice) => {
    setOpenNav(false);
    setSport(sportChoice);
  }
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  const [active, setActive] = useState(parseInt(window.sessionStorage.getItem('page_num')) || 1);

  const next = () => {
    if (active === pages) return;
    setActive(active + 1);
  };
  
  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };
 
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const fetchData = async () => {
    
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      let odds;
      if(sport === 'americanfootball_nfl'){
        odds = americanfootball_nfl_team_props;
      }else if(sport === 'baseball_mlb') {
        odds = baseball_mlb_team_props;
      }else if(sport === 'basketball_nba') {
        odds = basketball_nba_team_props;
      }else if(sport === 'icehockey_nhl') {
        odds = icehockey_nhl_team_props;
      }else if(sport === 'americanfootball_ncaaf') {
        odds = americanfootball_ncaaf_team_props;
      }else if(sport === 'basketball_ncaab') {
        odds = basketball_ncaab_team_props;
      }else if(sport === 'basketball_wnba') {
        odds = basketball_wnba_team_props;
      }
      else{
        odds = [];
      }
      let today = new Date();
      return odds.filter((game) => today < new Date(game.commence_time) );
    } else {
      let today = new Date();
      let daysInAdvance = today.getMonth()+1 === 2 && sport === 'americanfootball_nfl' ? 14 : 8;
      let getGamesUpTo = new Date(today.getFullYear(), today.getMonth(), today.getDate()+daysInAdvance).toISOString().substring(0, 19) + 'Z';
      const url = 'https://' + process.env.NEXT_PUBLIC_AWS_API_ID + '.execute-api.' + process.env.NEXT_PUBLIC_AWS_API_REGION + '.amazonaws.com/default/game-data-fetch?sport=' + sport + '&commenceTimeTo=' + getGamesUpTo;
      const gameData = await fetch(url, {
        method: 'GET'
      });
      if (!gameData.ok) {
        throw new Error(gameData.status, gameData.statusText);
      }
      const odds = await gameData.json();
      return odds.filter((game) => today < new Date(game.commence_time) );
    }
  };
  const { data: games, status } = useQuery([sport], fetchData,
      {
        staleTime: 60000,
        refetchOnWindowFocus: true,
        retry: 2
      }
  );

  useEffect(() => {
    if(sport !== window.localStorage.getItem('sport')){
      setActive(1);
      filterGames({target: {value: window.sessionStorage.getItem('filter_text_' + sport) || ""}})
    }
    window.localStorage.setItem('sport', sport);
  }, [sport, filterGames]);

    useEffect(() => {
      if(games && !games.error){
        let gamesFiltered = games.filter((game) => game.away_team.toLowerCase().includes(filterText.toLowerCase()) || game.home_team.toLowerCase().includes(filterText.toLowerCase()) || (team_titles[game.away_team] ? team_titles[game.away_team].toLowerCase().includes(filterText.toLowerCase()):false)
        || (team_titles[game.home_team] ? team_titles[game.home_team].toLowerCase().includes(filterText.toLowerCase()):false));
        setFilteredGames(gamesFiltered);
      
        let pageNumber = Math.ceil(gamesFiltered.length / numGamesPerPage);
        setPages(pageNumber);
        if(parseInt(window.sessionStorage.getItem('page_num')) > pageNumber) setActive(1);
      }
    }, [games, filterText]);

    useEffect(() => {
      window.sessionStorage.setItem('page_num', active);
      setEndIndex(active*numGamesPerPage);
    }, [active]);


  function dismissXAlert(){
    setXAlertOpen(false);
    window.sessionStorage.setItem('x_alert_dismissed', true);
  }

  function Icon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z"/></svg>
    );
  }

  function ProfileMenu(props) {
    const [openMenu, setOpenMenu] = useState(false);
   
    return (
      <Menu>
        <MenuHandler>
          
           <IconButton variant="text" color={props.color} className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
            <Cog6ToothIcon className="h-4 w-4" />
          </IconButton>
          
        </MenuHandler>
        <MenuList className="">
          <Menu
            placement="left-start"
            open={openMenu}
            handler={setOpenMenu}
            allowHover
            offset={5}
            className=""
          >
            <MenuHandler className="flex items-center justify-between">
              <MenuItem>
              <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    openMenu ? "-rotate-90" : ""
                  }`}
                />
              <span>My State: </span>
              <Image className="object-cover" src={`/Images/States/icons8-${usStates[stateName].toLowerCase().replaceAll(' ','-')}-50.png`} alt={stateName} width={20} height={20} style={{ opacity: 0.5 }} />
              </MenuItem>
            </MenuHandler>
            <MenuList className="max-h-72 ">
            {Object.keys(usStates).map((state) => (
              <MenuItem key={state} className="" onClick={() => stateSelect(state)}>
                <div className="grid grid-cols-2 gap-0">
                <div className='text-center'>{state.toUpperCase()}</div>
                <div className=''><Image className="object-cover" src={`/Images/States/icons8-${usStates[state].toLowerCase().replaceAll(' ','-')}-50.png`} alt={state} width={20} height={20} style={{ opacity: 0.5 }} /></div>
                </div>
              </MenuItem>
            ))}
            </MenuList>
          </Menu>
          </MenuList>
      </Menu>
    );
  }

  function stateSelect(aState){

    setStateName(aState);
    window.localStorage.setItem('usState', aState);
    
  }
  
  const InputInHeader = useMemo(() => {
    return (
      <div className="relative flex w-full">
        <Input
                  color="blue-gray"
                  label="Search"
                  value={filterText}
                  onChange={filterGames}
                  className="pr-20 w-full"
                  containerProps={{
                    className: "min-w-[60px]",
                  }}
                />
        {filterText && (
          <span className="absolute right-0 top-1.5 mr-2">
            <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
            onClick={() => (filterGames({target: {value:""}}))}
          >
                <XMarkIcon color="gray" className="h-5 w-5" strokeWidth={4} />
            </IconButton>
          </span>
          )}
      </div>
    );
  }, [filterText, filterGames]);

  return (
    <div>
      <CookieConsent
      location="bottom"
      buttonText="Got it."
      cookieName="CookieBanner1"
      style={{ background: "#2B373B" }}
      buttonStyle={{ background: "#319DF4", color: "#000000", fontSize: "20px" }}
      expires={150}
    >
      We use cookies to enhance your browsing experience and to deliver targeted advertising on our website. You can learn more about how we use cookies & how to opt out in our <PopupComponent type="privacy" text="text-blue-500 text-sm cursor-pointer"/>{" "}
    </CookieConsent>
      <Navbar className="sticky z-10 lg:px-8 lg:py-4 mx-auto max-w-screen-2xl">
        <div className="flex flex-wrap items-center justify-between text-blue-700">
          <Typography
            color="blue"
            variant="h6"
            className="mr-4 cursor-pointer text-inherit py-1.5"
          >
            Shop the Line
          </Typography>
          <div className="hidden lg:block">
            <SportSelector func={sportChange} sport={sport}></SportSelector>
          </div>
          <div className="hidden lg:block">
            <div className="min-w-[450px] grid grid-cols-11 gap-2">
              <div class='col-span-5'><SportsBookCustomize func={pull_user_books} bookies={bookies}></SportsBookCustomize></div>
              <div class='col-span-5'>{InputInHeader}</div>
              <div class='col-span-1'><ProfileMenu color="blue-gray"></ProfileMenu></div>
            </div>
          </div>
          {!openNav ?
          <div className="lg:hidden absolute  right-28 text-blue-700 opacity-70">
            <Typography variant="small">
                <span className="flex items-center justify-center font-semibold">{league_titles[sport]}
                <Image className="object-cover ml-1" width={16} height={16} src={`/Images/Sports/${sport}.png`} alt={league_titles[sport]} /></span>
            </Typography>
          </div>:<></>}
          <div className="grid grid-cols-2 gap-1 lg:hidden">
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent mt-2"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )} 
          </IconButton>
          <ProfileMenu color="blue"></ProfileMenu>
          </div>
        </div>
        <Collapse open={openNav}>
            <SportSelector func={sportChange} sport={sport}></SportSelector>
        </Collapse>
        <div className="relative flex w-full gap-2 pt-3 
         lg:hidden">
            <SportsBookCustomize func={pull_user_books} bookies={bookies}></SportsBookCustomize>
            {InputInHeader}
        </div>
      </Navbar>

      {status === "loading" || status === "error" ?
        <div className="flex flex-wrap justify-center items-center mt-8 mb-8">
          {status === "loading" ? <Spinner color="blue" className="h-12 w-12" />:
          status === "error" ? <span className="text-red-500 font-bold text-sm text-center">An unexpected error has occurred. Please try again later</span>:<></> }
        </div> : <div>
        
        <div className="flex items-center justify-center mt-2 max-w-screen-md mx-auto">
          <Alert open={xAlertOpen} icon={<Icon/>} color="gray" variant="ghost"  onClose={() => dismissXAlert()}>
            <div>
              <span className="text-sm">Stay updated - <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/shopthe_line/">
              <span className="text-blue-500 text-sm">Follow us on X!</span></a></span>
            </div>
          </Alert>
        </div>

      <div className="mx-auto max-w-screen-xl mb-16 mt-8">
          <div className="flex flex-wrap justify-center items-center mb-16 gap-4">
            {filteredGames.length > 0 ? filteredGames.slice(endIndex-numGamesPerPage,endIndex).map((game) => (
              game.bookmakers?
              <GameOverview
                key={game.id}
                game_id={game.id}
                bookie_list={bookies}
                homeTeam={game.home_team}
                awayTeam={game.away_team}
                bookmakers={game.bookmakers.filter((bk) => bookies.has(bk.key))}
                startTime={game.commence_time}
                sport={game.sport_key}
                usState={stateName}
              />:<></>
            )): <span className="text-gray-500 font-bold drop-shadow-lg text-5xl text-center">No Upcoming Games</span>}
          </div>

          {pages > 1 ? <div className="flex items-center justify-center gap-8">
            <IconButton
              size="sm"
              variant="outlined"
              color="blue-gray"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
              <strong className="text-blue-gray-900">{pages}</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              color="blue-gray"
              onClick={next}
              disabled={active === pages}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div> : <></>}
      </div></div>}
      <Footer></Footer>
    </div>
  );
}

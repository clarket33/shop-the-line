import React,{ useEffect, useState, useRef} from "react";
import { player_prop_markets, player_prop_choices } from "./../PlayerPropsMarkets.js";
import Select from "react-select";
import PropDisplay from "./PropDisplay.js";
import { bookmaker_links } from "../Bookmakers.js";

const PlayerPropDisplay = (event) => {

    const [individualProps, setIndividualProps] = useState(new Map());
    const [propChoices, setPropChoices] = useState([]);
    const [playerChoices, setPlayerChoices] = useState([]);
    const [player, setPlayer] = useState("");
    const [prop, setProp] = useState("");
    const specMarketsForSport = player_prop_markets.filter(sport => sport["label"] === event.sport)[0]["markets"];

    /*
    useEffect(() => {
        const urls = ['https://api.the-odds-api.com/v4/sports/' + event.sport + '/events/' + event.game_id + '/odds?regions=us&oddsFormat=american&markets=' + specMarketsForSport +'&dateFormat=iso&apiKey=' + process.env.REACT_APP_API_KEY_SPORT_ODDS];
        Promise.all(urls.map(url => fetch(url, {
        method: 'GET',
        headers: {
            'apiKey': 'aa3f46ee1d1c10e731dbd155079bc050',
        }
        })
            .then((response) => response.json())))
            .then(([odds]) => {
            setData(odds);
            })
            .catch((err) => {
            console.log(err.message);
            });
     
        }, []);
        */
         
    useEffect(() => {
        let response = {"id":"d89211a7627ee9a1da4a1202e7bade40","sport_key":"basketball_nba","sport_title":"NBA","commence_time":"2023-04-08T20:10:00Z","home_team":"Los Angeles Clippers","away_team":"Portland Trail Blazers","bookmakers":[{"key":"draftkings","title":"DraftKings","markets":[{"key":"player_assists","last_update":"2023-04-08T21:27:09Z","outcomes":[{"name":"Over","description":"Shaedon Sharpe","price":-175,"point":3.5},{"name":"Under","description":"Shaedon Sharpe","price":130,"point":3.5},{"name":"Over","description":"Skylar Mays","price":130,"point":6.5},{"name":"Under","description":"Skylar Mays","price":-175,"point":6.5}]},{"key":"player_blocks","last_update":"2023-04-08T21:25:09Z","outcomes":[{"name":"Over","description":"Ivica Zubac","price":120,"point":1.5},{"name":"Under","description":"Ivica Zubac","price":-160,"point":1.5}]},{"key":"player_points","last_update":"2023-04-08T21:27:09Z","outcomes":[{"name":"Over","description":"Jeenathan Williams","price":-140,"point":2.5},{"name":"Under","description":"Jeenathan Williams","price":105,"point":2.5},{"name":"Over","description":"Kevin Knox","price":-130,"point":19.5},{"name":"Under","description":"Kevin Knox","price":-105,"point":19.5},{"name":"Over","description":"Shaedon Sharpe","price":105,"point":32.5},{"name":"Under","description":"Shaedon Sharpe","price":-135,"point":32.5},{"name":"Over","description":"Skylar Mays","price":-105,"point":9.5},{"name":"Under","description":"Skylar Mays","price":-130,"point":9.5},{"name":"Over","description":"Trendon Watford","price":-120,"point":22.5},{"name":"Under","description":"Trendon Watford","price":-110,"point":22.5}]},{"key":"player_points_assists","last_update":"2023-04-08T21:27:09Z","outcomes":[{"name":"Over","description":"Jeenathan Williams","price":115,"point":3.5},{"name":"Under","description":"Jeenathan Williams","price":-155,"point":3.5},{"name":"Over","description":"Shaedon Sharpe","price":100,"point":36.5},{"name":"Under","description":"Shaedon Sharpe","price":-135,"point":36.5},{"name":"Over","description":"Skylar Mays","price":-120,"point":15.5},{"name":"Under","description":"Skylar Mays","price":-110,"point":15.5},{"name":"Over","description":"Trendon Watford","price":-125,"point":25.5},{"name":"Under","description":"Trendon Watford","price":-105,"point":25.5}]},{"key":"player_points_rebounds","last_update":"2023-04-08T21:27:09Z","outcomes":[{"name":"Over","description":"Jeenathan Williams","price":-135,"point":4.5},{"name":"Under","description":"Jeenathan Williams","price":100,"point":4.5},{"name":"Over","description":"Shaedon Sharpe","price":-130,"point":36.5},{"name":"Under","description":"Shaedon Sharpe","price":-105,"point":36.5},{"name":"Over","description":"Skylar Mays","price":-130,"point":10.5},{"name":"Under","description":"Skylar Mays","price":100,"point":10.5},{"name":"Over","description":"Trendon Watford","price":-130,"point":26.5},{"name":"Under","description":"Trendon Watford","price":100,"point":26.5}]},{"key":"player_points_rebounds_assists","last_update":"2023-04-08T21:27:09Z","outcomes":[{"name":"Over","description":"Jeenathan Williams","price":115,"point":5.5},{"name":"Under","description":"Jeenathan Williams","price":-150,"point":5.5},{"name":"Over","description":"Shaedon Sharpe","price":-130,"point":40.5},{"name":"Under","description":"Shaedon Sharpe","price":-105,"point":40.5},{"name":"Over","description":"Skylar Mays","price":-150,"point":16.5},{"name":"Under","description":"Skylar Mays","price":110,"point":16.5},{"name":"Over","description":"Trendon Watford","price":-140,"point":29.5},{"name":"Under","description":"Trendon Watford","price":105,"point":29.5}]},{"key":"player_rebounds","last_update":"2023-04-08T21:27:09Z","outcomes":[{"name":"Over","description":"Ivica Zubac","price":105,"point":12.5},{"name":"Under","description":"Ivica Zubac","price":-140,"point":12.5},{"name":"Over","description":"Kawhi Leonard","price":-155,"point":8.5},{"name":"Under","description":"Kawhi Leonard","price":120,"point":8.5},{"name":"Over","description":"Kevin Knox","price":-120,"point":9.5},{"name":"Under","description":"Kevin Knox","price":-110,"point":9.5},{"name":"Over","description":"Nicolas Batum","price":-125,"point":5.5},{"name":"Under","description":"Nicolas Batum","price":-105,"point":5.5},{"name":"Over","description":"Russell Westbrook","price":-165,"point":7.5},{"name":"Under","description":"Russell Westbrook","price":125,"point":7.5},{"name":"Over","description":"Shaedon Sharpe","price":-105,"point":4.5},{"name":"Under","description":"Shaedon Sharpe","price":-125,"point":4.5},{"name":"Over","description":"Skylar Mays","price":130,"point":1.5},{"name":"Under","description":"Skylar Mays","price":-170,"point":1.5},{"name":"Over","description":"Trendon Watford","price":150,"point":4.5},{"name":"Under","description":"Trendon Watford","price":-205,"point":4.5}]},{"key":"player_steals","last_update":"2023-04-08T21:27:09Z","outcomes":[{"name":"Over","description":"Kevin Knox","price":195,"point":0.5},{"name":"Under","description":"Kevin Knox","price":-270,"point":0.5},{"name":"Over","description":"Shaedon Sharpe","price":190,"point":1.5},{"name":"Under","description":"Shaedon Sharpe","price":-260,"point":1.5},{"name":"Over","description":"Skylar Mays","price":140,"point":0.5},{"name":"Under","description":"Skylar Mays","price":-190,"point":0.5},{"name":"Over","description":"Trendon Watford","price":205,"point":0.5},{"name":"Under","description":"Trendon Watford","price":-290,"point":0.5}]},{"key":"player_threes","last_update":"2023-04-08T21:27:09Z","outcomes":[{"name":"Over","description":"Kevin Knox","price":-190,"point":1.5},{"name":"Under","description":"Kevin Knox","price":140,"point":1.5},{"name":"Over","description":"Shaedon Sharpe","price":135,"point":4.5},{"name":"Under","description":"Shaedon Sharpe","price":-185,"point":4.5},{"name":"Over","description":"Skylar Mays","price":-130,"point":0.5},{"name":"Under","description":"Skylar Mays","price":100,"point":0.5},{"name":"Over","description":"Trendon Watford","price":275,"point":2.5},{"name":"Under","description":"Trendon Watford","price":-400,"point":2.5}]},{"key":"player_turnovers","last_update":"2023-04-08T21:27:09Z","outcomes":[{"name":"Over","description":"Eric Gordon","price":165,"point":1.5},{"name":"Under","description":"Eric Gordon","price":-225,"point":1.5},{"name":"Over","description":"Ivica Zubac","price":105,"point":0.5},{"name":"Under","description":"Ivica Zubac","price":-140,"point":0.5},{"name":"Over","description":"Kawhi Leonard","price":-145,"point":2.5},{"name":"Under","description":"Kawhi Leonard","price":110,"point":2.5},{"name":"Over","description":"Kevin Knox","price":-145,"point":0.5},{"name":"Under","description":"Kevin Knox","price":110,"point":0.5},{"name":"Over","description":"Nicolas Batum","price":245,"point":0.5},{"name":"Under","description":"Nicolas Batum","price":-350,"point":0.5},{"name":"Over","description":"Russell Westbrook","price":170,"point":3.5},{"name":"Under","description":"Russell Westbrook","price":-235,"point":3.5},{"name":"Over","description":"Shaedon Sharpe","price":-225,"point":3.5},{"name":"Under","description":"Shaedon Sharpe","price":165,"point":3.5},{"name":"Over","description":"Skylar Mays","price":-140,"point":0.5},{"name":"Under","description":"Skylar Mays","price":105,"point":0.5},{"name":"Over","description":"Trendon Watford","price":105,"point":0.5},{"name":"Under","description":"Trendon Watford","price":-140,"point":0.5}]}]},{"key":"fanduel","title":"FanDuel","markets":[{"key":"player_assists","last_update":"2023-04-08T21:24:47Z","outcomes":[{"name":"Over","description":"Skylar Mays","price":132,"point":6.5},{"name":"Under","description":"Skylar Mays","price":-178,"point":6.5},{"name":"Over","description":"Shaedon Sharpe","price":-192,"point":3.5},{"name":"Under","description":"Shaedon Sharpe","price":142,"point":3.5},{"name":"Over","description":"Kawhi Leonard","price":-122,"point":4.5},{"name":"Under","description":"Kawhi Leonard","price":-108,"point":4.5},{"name":"Over","description":"Russell Westbrook","price":-160,"point":6.5},{"name":"Under","description":"Russell Westbrook","price":120,"point":6.5}]},{"key":"player_points","last_update":"2023-04-08T21:24:47Z","outcomes":[{"name":"Over","description":"Skylar Mays","price":-114,"point":9.5},{"name":"Under","description":"Skylar Mays","price":-118,"point":9.5},{"name":"Over","description":"Eric Gordon","price":-152,"point":5.5},{"name":"Under","description":"Eric Gordon","price":114,"point":5.5},{"name":"Over","description":"Nicolas Batum","price":-152,"point":8.5},{"name":"Under","description":"Nicolas Batum","price":114,"point":8.5},{"name":"Over","description":"Jeenathan Williams","price":-148,"point":2.5},{"name":"Under","description":"Jeenathan Williams","price":112,"point":2.5},{"name":"Over","description":"Kawhi Leonard","price":114,"point":28.5},{"name":"Under","description":"Kawhi Leonard","price":-152,"point":28.5},{"name":"Over","description":"Russell Westbrook","price":108,"point":21.5},{"name":"Under","description":"Russell Westbrook","price":-144,"point":21.5},{"name":"Over","description":"Trendon Watford","price":-128,"point":22.5},{"name":"Under","description":"Trendon Watford","price":-104,"point":22.5},{"name":"Over","description":"Shaedon Sharpe","price":-112,"point":32.5},{"name":"Under","description":"Shaedon Sharpe","price":-118,"point":32.5},{"name":"Over","description":"Ivica Zubac","price":108,"point":15.5},{"name":"Under","description":"Ivica Zubac","price":-144,"point":15.5},{"name":"Over","description":"Kevin Knox II","price":-140,"point":19.5},{"name":"Under","description":"Kevin Knox II","price":106,"point":19.5}]},{"key":"player_points_assists","last_update":"2023-04-08T21:24:47Z","outcomes":[{"name":"Over","description":"Russell Westbrook","price":102,"point":28.5},{"name":"Under","description":"Russell Westbrook","price":-136,"point":28.5},{"name":"Over","description":"Kawhi Leonard","price":-130,"point":32.5},{"name":"Under","description":"Kawhi Leonard","price":-102,"point":32.5},{"name":"Over","description":"Skylar Mays","price":-138,"point":15.5},{"name":"Under","description":"Skylar Mays","price":104,"point":15.5},{"name":"Over","description":"Eric Gordon","price":-128,"point":8.5},{"name":"Under","description":"Eric Gordon","price":-104,"point":8.5},{"name":"Over","description":"Nicolas Batum","price":-132,"point":12.5},{"name":"Under","description":"Nicolas Batum","price":100,"point":12.5},{"name":"Over","description":"Jeenathan Williams","price":116,"point":3.5},{"name":"Under","description":"Jeenathan Williams","price":-154,"point":3.5},{"name":"Over","description":"Trendon Watford","price":-136,"point":25.5},{"name":"Under","description":"Trendon Watford","price":102,"point":25.5},{"name":"Over","description":"Ivica Zubac","price":-130,"point":15.5},{"name":"Under","description":"Ivica Zubac","price":-102,"point":15.5},{"name":"Over","description":"Shaedon Sharpe","price":-118,"point":36.5},{"name":"Under","description":"Shaedon Sharpe","price":-114,"point":36.5}]},{"key":"player_points_rebounds","last_update":"2023-04-08T21:24:47Z","outcomes":[{"name":"Over","description":"Kawhi Leonard","price":106,"point":36.5},{"name":"Under","description":"Kawhi Leonard","price":-140,"point":36.5},{"name":"Over","description":"Jeenathan Williams","price":-140,"point":4.5},{"name":"Under","description":"Jeenathan Williams","price":106,"point":4.5},{"name":"Over","description":"Russell Westbrook","price":104,"point":29.5},{"name":"Under","description":"Russell Westbrook","price":-138,"point":29.5},{"name":"Over","description":"Shaedon Sharpe","price":104,"point":37.5},{"name":"Under","description":"Shaedon Sharpe","price":-138,"point":37.5},{"name":"Over","description":"Skylar Mays","price":-152,"point":10.5},{"name":"Under","description":"Skylar Mays","price":114,"point":10.5},{"name":"Over","description":"Nicolas Batum","price":-114,"point":14.5},{"name":"Under","description":"Nicolas Batum","price":-114,"point":14.5},{"name":"Over","description":"Eric Gordon","price":-118,"point":6.5},{"name":"Under","description":"Eric Gordon","price":-112,"point":6.5},{"name":"Over","description":"Ivica Zubac","price":-132,"point":27.5},{"name":"Under","description":"Ivica Zubac","price":100,"point":27.5},{"name":"Over","description":"Trendon Watford","price":-140,"point":26.5},{"name":"Under","description":"Trendon Watford","price":106,"point":26.5}]},{"key":"player_points_rebounds_assists","last_update":"2023-04-08T21:24:47Z","outcomes":[{"name":"Over","description":"Russell Westbrook","price":102,"point":36.5},{"name":"Under","description":"Russell Westbrook","price":-136,"point":36.5},{"name":"Over","description":"Jeenathan Williams","price":112,"point":5.5},{"name":"Under","description":"Jeenathan Williams","price":-148,"point":5.5},{"name":"Over","description":"Kawhi Leonard","price":-130,"point":40.5},{"name":"Under","description":"Kawhi Leonard","price":-102,"point":40.5},{"name":"Over","description":"Trendon Watford","price":-152,"point":29.5},{"name":"Under","description":"Trendon Watford","price":114,"point":29.5},{"name":"Over","description":"Eric Gordon","price":-102,"point":9.5},{"name":"Under","description":"Eric Gordon","price":-130,"point":9.5},{"name":"Over","description":"Shaedon Sharpe","price":100,"point":41.5},{"name":"Under","description":"Shaedon Sharpe","price":-132,"point":41.5},{"name":"Over","description":"Nicolas Batum","price":-106,"point":18.5},{"name":"Under","description":"Nicolas Batum","price":-125,"point":18.5},{"name":"Over","description":"Ivica Zubac","price":104,"point":28.5},{"name":"Under","description":"Ivica Zubac","price":-138,"point":28.5},{"name":"Over","description":"Skylar Mays","price":104,"point":17.5},{"name":"Under","description":"Skylar Mays","price":-138,"point":17.5}]},{"key":"player_rebounds","last_update":"2023-04-08T21:24:47Z","outcomes":[{"name":"Over","description":"Skylar Mays","price":130,"point":1.5},{"name":"Under","description":"Skylar Mays","price":-174,"point":1.5},{"name":"Over","description":"Kawhi Leonard","price":-172,"point":7.5},{"name":"Under","description":"Kawhi Leonard","price":128,"point":7.5},{"name":"Over","description":"Russell Westbrook","price":-172,"point":7.5},{"name":"Under","description":"Russell Westbrook","price":128,"point":7.5},{"name":"Over","description":"Ivica Zubac","price":100,"point":12.5},{"name":"Under","description":"Ivica Zubac","price":-132,"point":12.5},{"name":"Over","description":"Kevin Knox II","price":-122,"point":9.5},{"name":"Under","description":"Kevin Knox II","price":-108,"point":9.5},{"name":"Over","description":"Nicolas Batum","price":-125,"point":5.5},{"name":"Under","description":"Nicolas Batum","price":-106,"point":5.5},{"name":"Over","description":"Trendon Watford","price":154,"point":4.5},{"name":"Under","description":"Trendon Watford","price":-210,"point":4.5},{"name":"Over","description":"Shaedon Sharpe","price":-112,"point":4.5},{"name":"Under","description":"Shaedon Sharpe","price":-118,"point":4.5}]},{"key":"player_rebounds_assists","last_update":"2023-04-08T21:24:47Z","outcomes":[{"name":"Over","description":"Trendon Watford","price":124,"point":7.5},{"name":"Under","description":"Trendon Watford","price":-166,"point":7.5},{"name":"Over","description":"Skylar Mays","price":-118,"point":7.5},{"name":"Under","description":"Skylar Mays","price":-112,"point":7.5},{"name":"Over","description":"Shaedon Sharpe","price":-120,"point":8.5},{"name":"Under","description":"Shaedon Sharpe","price":-110,"point":8.5},{"name":"Over","description":"Ivica Zubac","price":-140,"point":12.5},{"name":"Under","description":"Ivica Zubac","price":106,"point":12.5},{"name":"Over","description":"Nicolas Batum","price":-110,"point":9.5},{"name":"Under","description":"Nicolas Batum","price":-120,"point":9.5},{"name":"Over","description":"Kawhi Leonard","price":-125,"point":12.5},{"name":"Under","description":"Kawhi Leonard","price":-106,"point":12.5},{"name":"Over","description":"Russell Westbrook","price":-148,"point":14.5},{"name":"Under","description":"Russell Westbrook","price":112,"point":14.5},{"name":"Over","description":"Kevin Knox II","price":112,"point":10.5},{"name":"Under","description":"Kevin Knox II","price":-148,"point":10.5}]},{"key":"player_threes","last_update":"2023-04-08T21:24:47Z","outcomes":[{"name":"Over","description":"Trendon Watford","price":280,"point":2.5},{"name":"Under","description":"Trendon Watford","price":-420,"point":2.5},{"name":"Over","description":"Nicolas Batum","price":-140,"point":2.5},{"name":"Under","description":"Nicolas Batum","price":106,"point":2.5},{"name":"Over","description":"Kawhi Leonard","price":-198,"point":1.5},{"name":"Under","description":"Kawhi Leonard","price":146,"point":1.5},{"name":"Over","description":"Eric Gordon","price":-125,"point":0.5},{"name":"Under","description":"Eric Gordon","price":-106,"point":0.5},{"name":"Over","description":"Skylar Mays","price":-138,"point":0.5},{"name":"Under","description":"Skylar Mays","price":104,"point":0.5},{"name":"Over","description":"Russell Westbrook","price":132,"point":1.5},{"name":"Under","description":"Russell Westbrook","price":-178,"point":1.5},{"name":"Over","description":"Shaedon Sharpe","price":140,"point":4.5},{"name":"Under","description":"Shaedon Sharpe","price":-188,"point":4.5},{"name":"Over","description":"Kevin Knox II","price":-200,"point":1.5},{"name":"Under","description":"Kevin Knox II","price":148,"point":1.5}]}]}]};
        
        let individual_props = new Map();
        let prop_choices = [];
        for(const bookmaker of response.bookmakers){
            if(event.bookies.has(bookmaker.key)){
                for(const market of bookmaker.markets){
                    if(!individual_props.has(market.key)){
                        prop_choices.push({value:market.key,label:player_prop_choices[market.key]});
                        individual_props.set(market.key, new Map());
                    }
                    for(const player_line of market.outcomes){
                        if(!individual_props.get(market.key).has(player_line.description)){
                            individual_props.get(market.key).set(player_line.description, new Map());
                        }

                        if(!individual_props.get(market.key).get(player_line.description).has(bookmaker.key)){
                            if(player_line.name === 'Over' || player_line.name === 'Yes'){
                                individual_props.get(market.key).get(player_line.description).set(bookmaker.key, {labelA: player_line.name, labelB:'', title: bookmaker.title, pointA: player_line.point, pointB:'', priceA: player_line.price, priceB: ''});
                            }else{
                                individual_props.get(market.key).get(player_line.description).set(bookmaker.key, {labelB: player_line.name, labelA:'', title: bookmaker.title, pointA:'', pointB:player_line.point, priceA: '', priceB: player_line.price});
                            }
                        }
                        else{
                            let line = individual_props.get(market.key).get(player_line.description).get(bookmaker.key);
                            if(player_line.name === 'Over' || player_line.name === 'Yes'){
                                line.priceA = player_line.price;
                                line.labelA = player_line.name;
                                line.pointA = player_line.point;
                            }else{
                                line.priceB = player_line.price;
                                line.labelB = player_line.name;
                                line.pointB = player_line.point;
                            }
                        }
                    }
                    
                    
                }
            }
        }

        if(!individual_props.has(prop.value)){
            setProp("");
            setPlayer("");
            setPlayerChoices([]);
        }
        else{
            if(!individual_props.get(prop.value).has(player.value)) setPlayer("");
        }
        setPropChoices(prop_choices.sort(propSort));
        setIndividualProps(individual_props);
        
    }, [event.bookies]);

    return (
        <div>
            <div className="state-dropdown">
                <Select key={`prop_for_${event.bookies}`} options={propChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                                                                                        })} defaultValue={""} onChange={(values) => propSelect(values)} value={prop || ''}/>
                <Select key={`players_for_${prop}`} options={playerChoices} styles={{control: (baseStyles) => ({...baseStyles, width: '10.938rem'}),}} theme={(theme) => ({...theme,borderRadius: 0, colors: {...theme.colors, primary25: 'rgb(241, 238, 238)', primary: 'black',},
                                                                                        })} defaultValue={""} onChange={(p) => setPlayer(p)} value={player || ''}/>
            </div>
            <div>
                {individualProps.has(prop.value) && individualProps.get(prop.value).has(player.value)?<div className="bookmakers-container">
                {Array.from(individualProps.get(prop.value).get(player.value), ([bookmaker, line]) => ({ bookmaker, line })).sort(compareBookies).map((bookmaker, index) => (
                    <PropDisplay
                        key={bookmaker.bookmaker}
                        bookmaker={bookmaker.bookmaker}
                        bookmakerLink={bookmaker_links[bookmaker.bookmaker]}
                        bookmakerTitle={bookmaker.line.title}
                        descriptOfPriceALabel={bookmaker.line.labelA}
                        aPrice={bookmaker.line.priceA > 0 ? '+' + bookmaker.line.priceA : bookmaker.line.priceA}
                        aPoint={bookmaker.line.pointA}
                        descriptOfPriceBLabel={bookmaker.line.labelB}
                        bPrice={bookmaker.line.priceB > 0 ? '+' + bookmaker.line.priceB : bookmaker.line.priceB}
                        bPoint={bookmaker.line.pointB}
                    
                    />
                ))}</div>:<></>}
            </div>
        </div>
        
    )

    function propSelect(value){
        if(value !== prop){
            setPlayer("");
            setProp(value);
            let choices = [];
            for(const key of individualProps.get(value.value).keys()){
                choices.push({value:key,label:key});
            }
            setPlayerChoices(choices.sort(propSort));
        }
        
    }
    
}

function propSort(a, b){
    if(a.label < b.label) return -1;
    else return 1;
}

function compareBookies(a,b){
    let aPoint = Math.abs(a.line.pointA) + Math.abs(a.line.pointB), bPoint = Math.abs(b.line.pointA) + Math.abs(b.line.pointB);
    if(aPoint < bPoint){
        return -1;
    }
    else if(aPoint === bPoint){
        let aPrice = Math.abs(a.line.priceA - a.line.priceB), bPrice = Math.abs(b.line.priceA - b.line.priceB);
        if(aPrice < bPrice){
            return -1;
        }
        else if(aPrice === bPrice){
            let aTitle = a.line.title, bTitle = b.line.title;
            if(aTitle < bTitle) return -1;
            else return 1;
        }
        return 1;
    }  
    return 1;
}

export default PlayerPropDisplay
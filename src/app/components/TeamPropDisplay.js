import React, {useEffect, useState, useMemo, useCallback} from 'react';
import { team_prop_titles, additional_team_props, additional_team_prop_titles, team_codes } from "../lib/Resources.js";
import { useData } from './DataContext.js';
import { 
    Select,
    Option,
    Spinner
  } from "@material-tailwind/react";
  import PropContainer from './PropContainer.js';

const TeamPropDisplay = (game) => {
    const [propChoices, setPropChoices] = useState([]);
    const [subPropChoices, setSubPropChoices] = useState([]);
    const [subPropPointChoices, setSubPropPointChoices] = useState([]);
    const [data, setData] = useState(new Map());
    const [prop, setProp] = useState(window.sessionStorage.getItem('team_prop_' + game.game_id) || "h2h");
    const [subProp, setSubProp] = useState(window.sessionStorage.getItem('team_sub_prop_' + game.game_id) || "h2h");
    const [subPropPoint, setSubPropPoint] = useState(window.sessionStorage.getItem('team_sub_prop_point_' + game.game_id) || "");
    const [sortChoices, setSortChoices] = useState([]);
    const [sorter, setSorter] = useState(window.sessionStorage.getItem('team_prop_sorter_' + game.game_id) || "");
    const { data:additional_markets = {}, status = "success" } = useData() || {};
    const [additionalMarketsData, setAdditionalMarketsData] = useState(additional_markets);

    useEffect(() =>{
        if (additional_markets && additional_markets.bookmakers) {
            setAdditionalMarketsData(additional_markets);
        }
    },[additional_markets]);
    
    useEffect(() => {

        let team_props = new Map();
        let prop_choices = [];
        
        for (const bookmaker of game.bookmakers){
            let game_link = bookmaker.link;
            for (const market of bookmaker.markets){
                let market_link = market.link;
                if(!team_props.has(market.key)){
                    prop_choices.push(market.key);
                    team_props.set(market.key, new Map());
                    team_props.get(market.key).set(market.key, new Map());
                }
                
                team_props.get(market.key).get(market.key).set(bookmaker.key, {
                    labelA: market.outcomes[0].name,
                    priceA: market.outcomes[0].price,
                    pointA: market.outcomes[0].point ? market.outcomes[0].point : "",
                    labelB: market.outcomes[1].name,
                    priceB: market.outcomes[1].price,
                    pointB: market.outcomes[1].point ? market.outcomes[1].point : "",
                    linkA: market.outcomes[0].link || market_link || game_link,
                    linkB: market.outcomes[1].link || market_link || game_link});
                
            }
        }
        

        if(additionalMarketsData && additionalMarketsData.bookmakers){
            for(const bookmaker of additionalMarketsData.bookmakers){
                const i = game.bookmakers.findIndex(b => b.key === bookmaker.key);
                if (i > -1) {
                    let game_link = bookmaker.link;
                    for(const market of bookmaker.markets){
                        let market_link = market.link;
                        if(additional_team_props.has(market.key)){
                            let category = "";
                            if(market.key.includes("alternate_spreads")) category = "alternate_spreads";
                            else if(market.key.includes("alternate_totals")) category = "alternate_totals";
                            else if(market.key === "alternate_team_totals") category = "alternate_team_totals";
                            else if(market.key.includes("h2h")) category = "h2h";
                            else if(market.key.includes("spreads")) category = "spreads";
                            else if(market.key.includes("totals")) category = "totals";
                            else continue;
                            if(!team_props.has(category) && !new Set(["alternate_spreads","alternate_totals","alternate_team_totals"]).has(category))continue;
                            
                            if(market.key.includes("alternate_spreads")){
                                if(!team_props.has(category)){
                                    team_props.set(category, new Map());
                                    prop_choices.push(category);
                                }
                                if(!team_props.get(category).has(market.key)){
                                    team_props.get(category).set(market.key, new Map());
                                }
                                let j = 0;
                                while(j < market.outcomes.length){
                                    let outcome = market.outcomes[j];
                                    let outcome_link_a = outcome.link;
                                    const k = market.outcomes.findIndex(m => outcome.point <= 0 ? (Math.abs(outcome.point) === m.point && outcome.name !== m.name) : ((outcome.point * -1) === m.point && outcome.name !== m.name));
                                    if(j > k){
                                        j++;
                                        continue;
                                    }
                                    if(k > -1){
                                        let matchedSpread = market.outcomes[k];
                                        let outcome_link_b = matchedSpread.link;
                                        let curKey; 
                                        if(outcome.point === 0) curKey = "EVEN";
                                        else if(outcome.name === game.away_team){
                                            let firstName = team_codes[outcome.name] || outcome.name.substring(0,3).toUpperCase();
                                            let secondName =  team_codes[matchedSpread.name] || matchedSpread.name.substring(0,3).toUpperCase();
                                            curKey = firstName + " " + (outcome.point > 0 ? "+" + outcome.point : outcome.point) + " | " + secondName + " " + (matchedSpread.point > 0 ? "+" + matchedSpread.point : matchedSpread.point);
                                        }else{
                                            let firstName =  team_codes[matchedSpread.name] || matchedSpread.name.substring(0,3).toUpperCase();
                                            let secondName = team_codes[outcome.name] || outcome.name.substring(0,3).toUpperCase();
                                            curKey = firstName + " " + (matchedSpread.point > 0 ? "+" + matchedSpread.point : matchedSpread.point) + " | " + secondName + " " + (outcome.point > 0 ? "+" + outcome.point : outcome.point);
                                        }
                                        if(!team_props.get(category).get(market.key).has(curKey)){
                                            team_props.get(category).get(market.key).set(curKey, new Map());
                                        }
                                        if(!team_props.get(category).get(market.key).get(curKey).has(bookmaker.key)){
                                            team_props.get(category).get(market.key).get(curKey).set(bookmaker.key, {
                                                labelA: outcome.name,
                                                priceA: outcome.price,
                                                pointA: outcome.point ? outcome.point : "",
                                                labelB: matchedSpread.name,
                                                priceB: matchedSpread.price,
                                                pointB: matchedSpread.point ? matchedSpread.point : "",
                                                linkA: outcome_link_a || market_link || game_link,
                                                linkB: outcome_link_b || market_link || game_link});
                                            }
                                    }
                                    j++;
                                    
                                }
                            }
                            else if(market.key.includes("alternate_totals")){
                                if(!team_props.has(category)){
                                    team_props.set(category, new Map());
                                    prop_choices.push(category);
                                }
                                if(!team_props.get(category).has(market.key)){
                                    team_props.get(category).set(market.key, new Map());
                                }
                                for(let curr of market.outcomes){
                                    let match = market.outcomes.find((item) => item.point === curr.point && item.name !== curr.name);
                                    if(!match) continue;
                                    let outcome_link_curr = curr.link;
                                    let outcome_link_match = match.link;
                                    let curKey = match.point.toString();
                                    if(!team_props.get(category).get(market.key).has(curKey)){
                                        team_props.get(category).get(market.key).set(curKey, new Map());
                                    }
                                    if(!team_props.get(category).get(market.key).get(curKey).has(bookmaker.key)){
                                        team_props.get(category).get(market.key).get(curKey).set(bookmaker.key, 
                                            curr.name === "Over" ? {
                                            labelA: curr.name,
                                            priceA: curr.price,
                                            pointA: curr.point,
                                            labelB: match.name,
                                            priceB: match.price,
                                            pointB: match.point,
                                            linkA: outcome_link_curr || market_link || game_link,
                                            linkB: outcome_link_match || market_link || game_link}
                                            : {
                                            labelA: match.name,
                                            priceA: match.price,
                                            pointA: match.point,
                                            labelB: curr.name,
                                            priceB: curr.price,
                                            pointB: curr.point,
                                            linkA: outcome_link_match || market_link || game_link,
                                            linkB: outcome_link_curr || market_link || game_link});
                                        }
                                   
                                }
                            }
                            else if(market.key === "alternate_team_totals"){
                                if(!team_props.has(category)){
                                    team_props.set(market.key, new Map());
                                    prop_choices.push(market.key);
                                }
                                for(let curr of market.outcomes){
                                    let outcome_link = curr.link;
                                    let curKey = curr.point.toString();
                                    if(!team_props.get(category).has(curr.description)){
                                        team_props.get(category).set(curr.description, new Map());
                                    }
                                    if(!team_props.get(category).get(curr.description).has(curKey)){
                                        team_props.get(category).get(curr.description).set(curKey, new Map());
                                    }
                                    if(!team_props.get(market.key).get(curr.description).get(curKey).has(bookmaker.key)){
                                        team_props.get(market.key).get(curr.description).get(curKey).set(bookmaker.key, 
                                            curr.name === "Over" ? {
                                            labelA: curr.name,
                                            priceA: curr.price,
                                            pointA: curr.point,
                                            linkA: outcome_link || market_link || game_link}
                                            : {
                                            labelB: curr.name,
                                            priceB: curr.price,
                                            pointB: curr.point,
                                            linkB: outcome_link || market_link || game_link});
                                    }
                                    else{
                                        let existing = team_props.get(market.key).get(curr.description).get(curKey).get(bookmaker.key);
                                        team_props.get(market.key).get(curr.description).get(curKey).set(bookmaker.key, 
                                            curr.name === "Over" ? {
                                            labelA: curr.name,
                                            priceA: curr.price,
                                            pointA: curr.point,
                                            linkA: outcome_link || market_link || game_link,
                                            labelB: existing.labelB,
                                            priceB: existing.priceB,
                                            pointB: existing.point,
                                            linkB: existing.linkB
                                            }
                                            : {
                                            labelA: existing.labelA,
                                            priceA: existing.priceA,
                                            pointA: existing.pointA,
                                            linkA: existing.linkA,
                                            labelB: curr.name,
                                            priceB: curr.price,
                                            pointB: curr.point,
                                            linkB: outcome_link || market_link || game_link});
                                
                                    }
                                }
                            }
                            else{
                                if(!team_props.get(category).has(market.key)){
                                    team_props.get(category).set(market.key, new Map());
                                }

                                team_props.get(category).get(market.key).set(bookmaker.key, {
                                    labelA: market.outcomes[0].name,
                                    priceA: market.outcomes[0].price,
                                    pointA: market.outcomes[0].point ? market.outcomes[0].point : market.outcomes[0].point === 0 ? "EVEN" : "",
                                    labelB: market.outcomes[1].name,
                                    priceB: market.outcomes[1].price,
                                    pointB: market.outcomes[1].point ? market.outcomes[1].point : market.outcomes[1].point === 0 ? "EVEN" : "",
                                    linkA: market.outcomes[0].link || market_link || game_link,
                                    linkB: market.outcomes[1].link || market_link || game_link});
                            }     
                        }
                    }
                }
            }
        }
        setPropChoices(prop_choices);
        setData(team_props);
    
    }, [game, additionalMarketsData]);

    useEffect(() => {
        if(data.has(prop)){
            let subPropChoices = [];
            for(const key of data.get(prop).keys()){
                subPropChoices.push(key);
            }
            setSubPropChoices(subPropChoices.sort(partial_periods_sort));
        }
      
    }, [data, prop]);

    useEffect(() => {
        if(data.has(prop) && !prop.includes("alternate") && data.get(prop).has(subProp)){
            let sortingChoices = [];
            let aAdded = false, bAdded = false;
            let labelRetrieve = data.get(prop).get(subProp).values();
            for(const bookieVal of labelRetrieve){
                if(!aAdded && bookieVal.labelA){
                    aAdded = true;
                    sortingChoices.push(bookieVal.labelA);
                }
                if(!bAdded && bookieVal.labelB){
                    bAdded = true;
                    sortingChoices.push(bookieVal.labelB);
                }
                
            }
            setSortChoices(sortingChoices);
        }
        else if(data.has(prop) && prop.includes("alternate") && data.get(prop).has(subProp) && data.get(prop).get(subProp).has(subPropPoint)){
            let sortingChoices = [];
            let aAdded = false, bAdded = false;
            let labelRetrieve = data.get(prop).get(subProp).get(subPropPoint).values();
            for(const bookieVal of labelRetrieve){
                if(!aAdded && bookieVal.labelA){
                    aAdded = true;
                    sortingChoices.push(bookieVal.labelA);
                }
                if(!bAdded && bookieVal.labelB){
                    bAdded = true;
                    sortingChoices.push(bookieVal.labelB);
                }
                
            }
            setSortChoices(sortingChoices);
        }
      
    }, [data, prop, subProp, subPropPoint]);

    useEffect(() => {
        if(subPropChoices.length > 0){
            let foundSubProp = false;
            for(const subPrp of subPropChoices){
                if((additional_team_prop_titles[subPrp] === additional_team_prop_titles[subProp]) || (new Set(["alternate_team_totals"]).has(prop) && subPrp === subProp)){
                    foundSubProp = true;
                    setSubProp(subPrp);
                    window.sessionStorage.setItem('team_sub_prop_' + game.game_id, subPrp);
                    break;
                }
            }
            if(!foundSubProp){
                setSubProp(subPropChoices[0]);
                window.sessionStorage.setItem('team_sub_prop_' + game.game_id, subPropChoices[0]);
            }
        }
        // eslint-disable-next-line
    }, [subPropChoices, game]);

    useEffect(() => {
        if(data.has(prop) && prop.includes("alternate") && data.get(prop).has(subProp)){
            let subPrpPointChoices = [];
            for(const key of data.get(prop).get(subProp).keys()){
                subPrpPointChoices.push(key);
            }
            setSubPropPointChoices(prop === "alternate_spreads" ? subPrpPointChoices.sort(alt_spread_sort) : prop === "alternate_totals" ? subPrpPointChoices.sort(alt_tot_sort) : subPrpPointChoices.sort(partial_periods_sort));
        }
      
    }, [data, prop, subProp]);

    useEffect(() => {
        if(subPropPointChoices.length > 0){
            let foundSubPropPoint = false
            for(const subPrpPnt of subPropPointChoices){
                if(subPrpPnt === subPropPoint){
                    foundSubPropPoint = true;
                    setSubPropPoint(subPrpPnt);
                    window.sessionStorage.setItem('team_sub_prop_point_' + game.game_id, subPrpPnt);
                    break;
                }
            }
            if(!foundSubPropPoint){
                setSubPropPoint(subPropPointChoices[0]);
                window.sessionStorage.setItem('team_sub_prop_point_' + game.game_id, subPropPointChoices[0]);
            }
        }
        // eslint-disable-next-line
    }, [subPropPointChoices, game]);
    

    useEffect(() => {
        if(sortChoices.length > 0){
            if(sorter !== sortChoices[0] && sorter !== sortChoices[1]){
                setSorter(sortChoices[0]);
                window.sessionStorage.setItem('team_prop_sorter_' + game.game_id, sortChoices[0]);
            }
        }
        
    }, [sortChoices, sorter, game]);

    const propSelect = useCallback((propChoice) => {
        if(propChoice !== prop){
            setProp(propChoice);
            window.sessionStorage.setItem('team_prop_' + game.game_id, propChoice);
        }
    }, [game.game_id, prop]);

    const subPropSelect = useCallback((subPropChoice) => {
        if(subPropChoice !== subProp){
            setSubProp(subPropChoice);
            window.sessionStorage.setItem('team_sub_prop_' + game.game_id, subPropChoice);
        }
    }, [subProp, game.game_id]);

    const subPropPointSelect = useCallback((subPropPointChoice) => {
        if(subPropPointChoice !== subPropPoint){
            setSubPropPoint(subPropPointChoice);
            window.sessionStorage.setItem('team_sub_prop_point_' + game.game_id, subPropPointChoice);
        }
    }, [subPropPoint, game.game_id]);

    const sorterSelect = useCallback((sorterChoice) => {
        if(sorterChoice !== sorter){
            setSorter(sorterChoice);
            window.sessionStorage.setItem('team_prop_sorter_' + game.game_id, sorterChoice);
        }
    }, [sorter, game.game_id]);

    const propSelector = useMemo(() => {
        return (
          <Select key={"prop: " + propChoices + game.game_id} variant="outlined" label="Prop" color="blue" value={prop} onChange={(values) => propSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                    {propChoices.map((team_prop) => (
                      <Option key={team_prop} value={team_prop} className="flex items-center gap-2">
                        {team_prop_titles[team_prop]}
                      </Option>
                    ))}
                  </Select>
        );
      }, [prop, propChoices, propSelect, game.game_id]);

      const subPropSelector = useMemo(() => {
        if(game.withinRange){
            return (
                <Select key={"subProp: " + subPropChoices + game.game_id} disabled={!game.withinRange} variant="outlined" label={prop === "alternate_team_totals" ? "Team" : "Type"} color="blue" value={subProp} onChange={(values) => subPropSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                        {subPropChoices.map((sub_prop) => (
                            <Option key={sub_prop + game.game_id} value={sub_prop} className="flex items-center gap-2">
                                <span>{additional_team_prop_titles[sub_prop] || sub_prop}</span>
                            
                            </Option>
                        ))}
                        </Select>
                    );
        }else{
            return <></>
        }
        }, [subProp, subPropChoices, game, subPropSelect, prop]);

        
        const subPropPointSelector = useMemo(() => {
            if(game.withinRange){
                return (
                    <Select key={"subPropPoint: " + subPropPointChoices + game.game_id} disabled={!game.withinRange} variant="outlined" label={prop === "alternate_spreads" ? "Spread" : prop === "alternate_totals" ? "Total" : prop === "alternate_team_totals" ? "Total" : "Type"} color="blue" value={subPropPoint} onChange={(values) => subPropPointSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                            {subPropPointChoices.map((sub_prop_point) => (
                                <Option key={sub_prop_point + game.game_id} value={sub_prop_point} className="flex items-center gap-2">
                                    {prop === "alternate_spreads" ? 
                                <div className="flex w-60">
                                    <div className="w-1/2 text-left">{sub_prop_point.split("|")[0]}</div>
                                    <div className="w-1/2 text-left">{sub_prop_point.split("|")[1]}</div>
                                </div>:<span>{sub_prop_point}</span>}
                                
                                </Option>
                            ))}
                            </Select>
                        );
            }else{
                return <></>
            }
            }, [subPropPoint, subPropPointChoices, game, subPropPointSelect, prop]);

      const sortSelector = useMemo(() => {
        return (
          <Select key={"sorter: " + sortChoices + game.game_id} variant="outlined" label="Sort for" color="blue" value={sorter} onChange={(values) => sorterSelect(values)} className="z-10" containerProps={{className: "min-w-[60px]",}}>
                    {sortChoices.map((label) => (
                      <Option key={label} value={label} className="flex items-center gap-2">
                        {label}
                      </Option>
                    ))}
                  </Select>
        );
      }, [sorter, sortChoices, sorterSelect, game.game_id]);

    function alt_spread_sort(a, b){
        let arrAPoint = a.includes("EVEN") ? "0" : a.split(" ")[1];
        let arrBPoint = b.includes("EVEN") ? "0" : b.split(" ")[1];
        return parseFloat(arrAPoint) < parseFloat(arrBPoint) ? -1 : 1;  
    }

    function partial_periods_sort(a, b){
        return a < b ? -1 : 1; 
    }

    function alt_tot_sort(a, b){
        return parseFloat(a) < parseFloat(b) ? -1 : 1; 
    }

    if(status ==="success"){
        return (
            <div>
                {propChoices.length > 0 ? 
                <div>
                    {propSelector}
                    <br></br>
                    {prop && subPropChoices.length > 0 ? <div>{subPropSelector}
                    {game.withinRange && prop.includes("alternate") ? <br></br> : <></>}
                    {prop && prop.includes("alternate") && subProp && subPropPointChoices.length > 0 ? <div>{subPropPointSelector}</div>:<></>}
                    {game.withinRange ? <br></br> : <></>}
                    {subProp && sortChoices.length > 0 ? <div>{sortSelector}</div>:<></>}
                    </div>:<></>}
                </div>:<></>}

                <div className="mt-8">
                    {data.has(prop) && !prop.includes("alternate") && data.get(prop).has(subProp) && data.get(prop).get(subProp).size > 0 ?
                        <PropContainer
                            type={"team-prop-container"}
                            game_id={game.game_id}
                            bookmakerList={data.get(prop).get(subProp)}
                            sorter={sorter}
                            lastIndex={data.get(prop).get(subProp).size-1}
                            prop={prop}
                            usState={game.usState}
                        />:
                        data.has(prop) && prop.includes("alternate") && data.get(prop).has(subProp) && data.get(prop).get(subProp).has(subPropPoint) && data.get(prop).get(subProp).get(subPropPoint).size > 0 ?
                        <PropContainer
                            type={"team-prop-container"}
                            game_id={game.game_id}
                            bookmakerList={data.get(prop).get(subProp).get(subPropPoint)}
                            sorter={sorter}
                            lastIndex={data.get(prop).get(subProp).get(subPropPoint).size-1}
                            prop={prop}
                            usState={game.usState}
                        />
                        :data.size !== 0 ? <></>:<span className="text-gray-500 font-medium text-center">No odds available for selected sportsbooks</span>}
                </div>
                
                    
                
                
            </div>
        
        )
    }else{
        return (
            <div className="flex flex-wrap justify-center items-center">
                {status === "loading" ? <Spinner data-testid="loader" color="blue" className="h-8 w-8" />:
                status === "error" ? <span className="text-red-500 font-bold text-sm text-center">An unexpected error has occurred. Please try again later</span>:<></> }
            </div>
        )
    }
    
}

export default TeamPropDisplay
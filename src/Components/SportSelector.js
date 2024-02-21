import React, { useState } from "react";
import {
    ChevronDownIcon,
  } from "@heroicons/react/24/outline";

import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Typography
} from "@material-tailwind/react";
import { league_titles} from "../Resources.js";
import { importAll } from '../App.js';

const menuItems = [
    {
        "category": "Football",
        "subcategories": [
            { "name": "americanfootball_nfl" },
            { "name": "americanfootball_ncaaf" }
        ]
    },
    {
        "category": "Basketball",
        "subcategories": [
            { "name": "basketball_nba" },
            { "name": "basketball_ncaab" }
        ]
    },
    {
        "category": "Baseball",
        "subcategories": [
            { "name": "baseball_mlb" }
        ]
    },
    {
        "category": "Hockey",
        "subcategories": [
            { "name": "icehockey_nhl" }
        ]
    }
];

 
export default function SportSelector(props) {
  const [sport,setSport] = useState(props.sport);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sportImages = importAll(require.context('../Images/Sports/', true, /\.(png|jpe?g|svg)$/));


  const handleClick = (event) =>{
    let sport = event.target.id;
    setSport(sport);
    props.func(sport);
  };

  return (
    <div>
        <div className="hidden lg:block">
            <Menu open={isMenuOpen}
            handler={setIsMenuOpen}
            offset={{ mainAxis: 10 }}
            placement="bottom"
            allowHover={true}>
                <MenuHandler>
                    
                        <Button variant="text" size="lg" className="flex gap-2 items-center justify-center font-medium text-blue-gray-500 w-full">
                                {league_titles[sport]}
                                <img className="h-4 w-4 object-cover grayscale" src={sportImages[sport + ".png"]} alt={sport} />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`h-3 w-3 min-h-[12px] min-w-[12px] transition-transform ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </Button>
                    
                </MenuHandler>
                <MenuList>
                    <div className="grid grid-cols-4 gap-x-12">
                        {menuItems.map((category) => {
                            return <div className="mx-auto items-center w-24" key={category["category"]}>
                                    <Typography
                                    variant="h6"
                                    color="gray"
                                    className="flex"
                                    key={category}
                                    >
                                    <div className="mx-auto flex items-center">
                                        <span>{category["category"]}</span>
                                        <img className="h-4 w-4 object-cover ml-1 grayscale" src={sportImages[category["subcategories"][0]["name"] + ".png"]} alt={category["category"]} />
                                    </div>
                                    </Typography>
                                    <div>
                                        {category["subcategories"].map((item) => {
                                            return  <MenuItem disabled={sport === item["name"] ? true : false} className="text-center border-b-2 font-semibold text-blue-gray-500" onClick={handleClick} id={item["name"]} key={item["name"]}>
                                                     
                                                    {league_titles[item["name"]]}
                                                    
                                                </MenuItem> 
                                        
                                        })}
                                    </div>
                                </div>
                                })}
                    </div>
                </MenuList>
            </Menu>
        </div>
        <div className="lg:hidden">
                
            <div className="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-8 mt-8">
                {menuItems.map((category) => {
                    return <div className="mx-auto items-center w-24" key={category["category"]}>
                            <Typography
                            variant="h6"
                            color="gray"
                            className="flex font-bold"
                            key={category}
                            >
                            <div className="mx-auto flex items-center">
                                <span>{category["category"]}</span>
                                <img className="h-4 w-4 object-cover ml-1 grayscale" src={sportImages[category["subcategories"][0]["name"] + ".png"]} alt={category["category"]} />
                            </div>
                            </Typography>
                            <div>
                                {category["subcategories"].map((item) => {
                                    return  <Button variant="text" size="sm" color="blue-gray" disabled={sport === item["name"] ? true : false} className="text-center border-b-2 w-24" onClick={handleClick} id={item["name"]} key={item["name"]}>
                                            {league_titles[item["name"]]}
                                        </Button> 
                                
                                })}
                            </div>
                        </div>
                        })}
            </div>
                     
        </div>
    </div>
  );
}
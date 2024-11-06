import React from 'react';
import {team_codes, bookmaker_names} from '../lib/Resources.js';
import {
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Typography,
  } from "@material-tailwind/react";
  import Image from "next/image";
  import medalImage from'../../../public/Images/Misc/Medal.png';

const PropDisplay = (bookmaker) => {
    let sortedChoice;
    if(bookmaker.sorter === bookmaker.descriptOfPriceALabel) sortedChoice = bookmaker.descriptOfPriceALabel;
    else if(bookmaker.sorter === bookmaker.descriptOfPriceBLabel) sortedChoice = bookmaker.descriptOfPriceBLabel;
    let fontA;
    let fontB;

    if(bookmaker.bestOption && bookmaker.sorter === bookmaker.descriptOfPriceALabel) fontA = "font-mono font-black tracking-tight";
    else fontA = "font-mono font-thin tracking-tight";

    if(bookmaker.bestOption && bookmaker.sorter === bookmaker.descriptOfPriceBLabel) fontB = "font-mono font-black tracking-tight";
    else fontB = "font-mono font-thin tracking-tight";

    let bookie_link = bookmaker.sorter === bookmaker.descriptOfPriceALabel ? bookmaker.aBookmakerLink : bookmaker.bBookmakerLink;

    
    return (
        
            
                <a href={bookie_link} target="_blank" rel="noopener noreferrer">
                    <div className="lg:hidden">
                        <ListItem className="h-18 border-b-2 border-t-2">
                            <ListItemPrefix className="text-sm w-3/12 h-6 justify-center">
                                
                                    <Typography variant="small" color="blue">
                                        <span className="text-xs">{bookmaker_names[bookmaker.bookmaker]}</span>
                                    </Typography>
                                
                            </ListItemPrefix>
                            <div className="grid grid-rows-2 gap-2 h-14 w-8/12 border-5">
                                <div className="flex mx-auto">
                                    <Typography variant="small" color="blue-gray" className={fontA}>
                                    {bookmaker.descriptOfPriceALabel ? <span className="text-xs">{team_codes[bookmaker.descriptOfPriceALabel] || bookmaker.descriptOfPriceALabel.substring(0,3).toUpperCase()} {bookmaker.aPoint} ({bookmaker.aPrice})</span> : <span>N/A</span>}
                                    </Typography>
                                </div>
                                <div className="flex mx-auto">
                                    <Typography variant="small" color="blue-gray" className={fontB}>
                                    {bookmaker.descriptOfPriceBLabel ? <span className="text-xs">{team_codes[bookmaker.descriptOfPriceBLabel] || bookmaker.descriptOfPriceBLabel.substring(0,3).toUpperCase()} {bookmaker.bPoint} ({bookmaker.bPrice})</span> : <span>N/A</span>}
                                    </Typography>
                                </div>
                            </div>
                            
                            <ListItemSuffix className=" w-1/12">
                            {bookmaker.bestOption && sortedChoice ? <Image className="h-8 w-8 object-cover" src={medalImage} alt={"Medal"} /> : ""}
                            </ListItemSuffix>
                        </ListItem>
                    </div>
                    <div className="hidden lg:block">
                        <ListItem className="h-24 border-b-2 border-t-2">
                            <ListItemPrefix className="text-sm w-3/12 h-6 justify-center">
                                <Typography variant="small" color="blue">
                                <span className="text-xsm">{bookmaker_names[bookmaker.bookmaker]}</span>
                                </Typography>
                            </ListItemPrefix>
                            <div className="grid grid-rows-2 gap-2 h-14 w-8/12 border-5">
                                <div className="flex mx-auto">
                                    <Typography variant="small" color="blue-gray" className={fontA}>
                                    {bookmaker.descriptOfPriceALabel ? <span className="text-xsm">{team_codes[bookmaker.descriptOfPriceALabel] || bookmaker.descriptOfPriceALabel.substring(0,3).toUpperCase()} {bookmaker.aPoint} ({bookmaker.aPrice})</span> : <span className="text-xsm">N/A</span>}
                                    </Typography>
                                </div>
                                <div className="flex mx-auto">
                                    <Typography variant="small" color="blue-gray" className={fontB}>
                                    {bookmaker.descriptOfPriceBLabel ? <span className="text-xsm">{team_codes[bookmaker.descriptOfPriceBLabel] || bookmaker.descriptOfPriceBLabel.substring(0,3).toUpperCase()} {bookmaker.bPoint} ({bookmaker.bPrice})</span> : <span className="text-xsm">N/A</span>}
                                    </Typography>
                                </div>
                            </div>
                            
                            <ListItemSuffix className=" w-1/12">
                            {bookmaker.bestOption && sortedChoice ? <Image className="h-8 w-8 object-cover" src={medalImage} alt={"Medal"} /> : ""}
                            </ListItemSuffix>
                        </ListItem>
                    </div>
                </a>
        
    )
    
    
}

export default PropDisplay
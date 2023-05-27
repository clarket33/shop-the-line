import React from 'react';
import {team_codes, bookmaker_names} from '../Resources.js';

const PropDisplay = (bookmaker) => {

    return (
        <div>
            {bookmaker.firstEntry || bookmaker.endOfBucket ? <hr className="bookmaker-child-end-of-block"></hr> :<hr className="bookmaker-child-sep"></hr>}
            <div>
                
                <div className="bookmaker-child-name">
                    <a href={bookmaker.bookmakerLink} target="_blank" rel="noopener noreferrer">{bookmaker_names[bookmaker.bookmaker]}</a>
                </div>
                <div className="bookmaker-child-content">
                    {bookmaker.endOfBucket && bookmaker.sorter === bookmaker.descriptOfPriceALabel ? <p className="prop-text prop-text-best">{team_codes[bookmaker.descriptOfPriceALabel] || bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</p> :
                    bookmaker.descriptOfPriceALabel ? <p className="prop-text">{team_codes[bookmaker.descriptOfPriceALabel] || bookmaker.descriptOfPriceALabel} {bookmaker.aPoint} ({bookmaker.aPrice})</p> : <p className="prop-text">N/A</p>}<br/>
                    {bookmaker.endOfBucket && bookmaker.sorter === bookmaker.descriptOfPriceBLabel ? <p className="prop-text prop-text-best">{team_codes[bookmaker.descriptOfPriceBLabel] || bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</p> :
                    bookmaker.descriptOfPriceBLabel ? <p className="prop-text">{team_codes[bookmaker.descriptOfPriceBLabel] || bookmaker.descriptOfPriceBLabel} {bookmaker.bPoint} ({bookmaker.bPrice})</p> : <p className="prop-text">N/A</p>}
                </div>
               
            </div>
            
        </div>

    )
    
}

export default PropDisplay
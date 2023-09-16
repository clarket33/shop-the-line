import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import InstructionCarousel from './InstructionCarousel';
import SportsBookList from './SportsBookList';
import Policy from './Policy';
import FullPropList from './FullPropList';

const PopupComponent = (type) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  let title;
  if(type.type === "instructions") title = "How to Use"
  else if(type.type === "sportsbook-list") title = "Sportsbooks"
  else if(type.type === "privacy") title = "Privacy Policy"
  else if(type.type === "terms") title = "Terms of Use";
  else if(type.type === "prop-list") title = " suite of props";

  const handleClick = () => {
    setIsPopupOpen(true);
  };

    return (
      <span>
          
          <span className={type.text} onClick={handleClick}>{title}</span>
          
          <span className={isPopupOpen ? "overlay" : ""}>
              <Popup
                  open={isPopupOpen}
                  onClose={() => setIsPopupOpen(false)}
              >
                {type.type === "instructions" ?
                <div>
                  <div className="lg:hidden w-80 h-[40rem]">
                      <InstructionCarousel size="small"></InstructionCarousel>
                  </div>
                  <div className="hidden lg:block max-w-screen-md h-full">
                      <InstructionCarousel size="big"></InstructionCarousel>
                  </div>
                </div> : type.type === "sportsbook-list" ?
                <div>
                  <SportsBookList></SportsBookList>
                </div> : type.type === "terms" || type.type === "privacy" ?
                <div>
                  <Policy title={title}></Policy>
                </div> : type.type === "prop-list" ?
                  <FullPropList></FullPropList> : <></>}
              </Popup>
          </span>
          
      </span>
    );
  
};

export default PopupComponent;
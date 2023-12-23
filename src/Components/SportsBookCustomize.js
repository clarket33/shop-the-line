import {bookmaker_names} from '../Resources.js';
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
  Checkbox
} from "@material-tailwind/react";
 
export default function SportsBookCustomize(props) {
  const [mySportsbooks,setMySportsbook] = useState(new Set(props.bookies));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleClick = (event) => {
    let book = event.target.id;
    let isChecked = event.target.checked;
    let books = new Set(mySportsbooks);
    if(books.has(book)){
      if(!isChecked) books.delete(book);
    }
    else{
      if(isChecked) books.add(book);
    }
    setMySportsbook(books);
    props.func(books);
    window.localStorage.setItem("my_sportsbooks", JSON.stringify(Array.from(books)));
  };

  function handleMenu(event){
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="flex w-full min-w-[120px] h-10">
        <Menu handler={handleMenu} open={isMenuOpen}>
            <MenuHandler>
                
                    <Button variant="outlined" size="sm" color="blue" className="flex gap-2 items-center justify-center font-medium text-blue-gray-500 w-full">
                        SPORTSBOOKS
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 min-h-[12px] min-w-[12px] transition-transform ${
                                isMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                
            </MenuHandler>
            <MenuList className="max-h-96">
            {Object.keys(bookmaker_names).sort(sortBookies).map((name) => {
                    return <div data-testid="sportsbook" key={name}>
                    <MenuItem className="p-0">
                    <label
                        htmlFor={name}
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                        
                        <Checkbox
                            id={name}
                            ripple={false}
                            className="hover:before:opacity-0"
                            color="blue"
                            checked={mySportsbooks.has(name)}
                            containerProps={{
                            className: "p-0",
                            }}
                            onChange={handleClick}
                        />
                            <span className="ml-2">{bookmaker_names[name]}</span>
                    </label>
                    </MenuItem>
                    </div>;
                })}
            </MenuList>
        </Menu>
    </div>
  );
}

export function sortBookies(a, b){
  return bookmaker_names[a].toUpperCase() < bookmaker_names[b].toUpperCase() ? -1 : 1;
}
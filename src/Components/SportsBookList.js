import { List, ListItem, Card, Checkbox, ListItemPrefix, Typography} from "@material-tailwind/react";
import {bookmaker_names} from '../Resources.js';
import { useState } from "react";
 
export default function SportsBookList(props) {
  const [mySportsbooks,setMySportsbook] = useState(new Set(JSON.parse(window.localStorage.getItem('my_sportsbooks'))) || new Set(Object.keys(bookmaker_names)));

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


  return (
    <Card className="overflow-y-auto">
      <List>
        {Object.keys(bookmaker_names).map((name) => {
            return <div data-testid="sportsbook" key={name}>

            <ListItem className="p-0">
              <label
                htmlFor={name}
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
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
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  {bookmaker_names[name]}
                </Typography>
              </label>
            </ListItem>
            </div>;
        })}
      </List>
    </Card>
  );
}
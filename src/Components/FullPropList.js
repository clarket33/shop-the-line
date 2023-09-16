import { List, ListItem, Card } from "@material-tailwind/react";
import {player_prop_choices} from '../Resources.js';
 
export default function FullPropList() {
  return (
    <div>
        <Card className="hidden lg:block max-w-screen-md h-[40rem] overflow-y-auto">
            <List>
                {Object.keys(player_prop_choices).map((prop) => {
                    return <ListItem className="h-8 text-blue-500 text-sm">{player_prop_choices[prop]}</ListItem>;
                })}
            </List>
        </Card>
        <Card className="lg:hidden w-80 h-[40rem] overflow-y-auto">
            <List>
                {Object.keys(player_prop_choices).map((prop) => {
                    return <ListItem className="h-8 text-blue-500 text-sm">{player_prop_choices[prop]}</ListItem>;
                })}
            </List>
        </Card>
    </div>
  );
}
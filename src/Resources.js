export const player_prop_markets = [
    { 
      markets: "player_pass_tds,player_pass_yds,player_pass_completions,player_pass_attempts,player_pass_interceptions,player_pass_longest_completion,player_rush_yds,player_rush_attempts,player_rush_longest,player_receptions,player_reception_yds,player_reception_longest",
      label: "americanfootball_nfl"
    },
    {
      markets: "player_points,player_rebounds,player_assists,player_threes,player_double_double,player_blocks,player_steals,player_turnovers,player_points_rebounds_assists,player_points_rebounds,player_points_assists,player_rebounds_assists",
      label: "basketball_nba"
    },
    {
      markets: "batter_home_runs,batter_hits,batter_total_bases,batter_rbis,batter_runs_scored,batter_hits_runs_rbis,batter_singles,batter_doubles,batter_triples,batter_walks,batter_strikeouts,batter_stolen_bases,pitcher_strikeouts,pitcher_record_a_win,pitcher_hits_allowed,pitcher_walks,pitcher_earned_runs,pitcher_outs",
      label: "baseball_mlb"
    },
    {
      markets: "player_points,player_power_play_points,player_assists,player_blocked_shots,player_shots_on_goal",
      label: "icehockey_nhl"
    }
]

export const player_prop_choices = {
  //football
  "player_pass_tds":"Pass Touchdowns",
  "player_pass_yds":"Pass Yards",
  "player_pass_completions":"Pass Completions",
  "player_pass_attempts":"Pass Attempts",
  "player_pass_interceptions":"Pass Interceptions",
  "player_pass_longest_completion":"Pass Longest Completion",
  "player_rush_yds":"Rush Yards",
  "player_rush_attempts":"Rush Attempts",
  "player_rush_longest":"Longest Rush",
  "player_receptions":"Receptions",
  "player_reception_yds":"Reception Yards",
  "player_reception_longest":"Longest Reception",
  //basketball
  "player_points":"Points", //also covers hockey
  "player_rebounds":"Rebounds",
  "player_assists":"Assists", //also covers hockey
  "player_threes":"Threes",
  "player_double_double":"Double Double",
  "player_blocks":"Blocks",
  "player_steals":"Steals",
  "player_turnovers":"Turnovers",
  "player_points_rebounds_assists":"Points + Rebounds + Assists",
  "player_points_rebounds":"Points + Rebounds",
  "player_points_assists":"Points + Assists",
  "player_rebounds_assists":"Rebounds + Assists",
  //baseball
  "batter_home_runs":"Batter Home Runs",
  "batter_hits":"Batter Hits",
  "batter_total_bases":"Batter Total Bases",
  "batter_rbis":"Batter RBIs",
  "batter_runs_scored":"Batter Runs Scored",
  "batter_hits_runs_rbis":"Batter Hits + Runs + RBIs",
  "batter_singles":"Batter Singles",
  "batter_doubles":"Batter Doubles",
  "batter_triples":"Batter Triples",
  "batter_walks":"Batter Walks",
  "batter_strikeouts":"Batter Strikeouts",
  "batter_stolen_bases":"Batter Stolen Bases",
  "pitcher_strikeouts":"Pitcher Strikeouts",
  "pitcher_record_a_win":"Pitcher to Record a Win",
  "pitcher_hits_allowed":"Pitcher Hits Allowed",
  "pitcher_walks":"Pitcher Walks",
  "pitcher_earned_runs":"Pitcher Earned Runs",
  "pitcher_outs":"Pitcher Outs",
  //hockey
  "player_power_play_points":"Power Play Points",
  "player_blocked_shots":"Blocked Shots",
  "player_shots_on_goal":"Shots on Goal"
}

export const team_prop_choices={ 
    "totals":"Total",
    "spreads":"Spread",
    "h2h":"Moneyline"
  }

  export const state_bookmakers = [
    { 
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "superbook", "twinspires", "unibet_us", "williamhill_us", "wynnbet"]),
      value: 0,
      label: "Arizona"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "circasports", "draftkings", "fanduel", "foxbet", "pointsbetus", "superbook", "williamhill_us", "wynnbet"]),
      value: 1,
      label: "Colorado"
    },
    {
      bookmakers: new Set(["betrivers", "draftkings", "fanduel"]),
      value: 2,
      label: "Connecticut"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "williamhill_us"]),
      value: 3,
      label: "Illinois"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "unibet_us", "williamhill_us", "wynnbet"]),
      value: 4,
      label: "Indiana"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "circasports", "draftkings", "fanduel", "pointsbetus", "superbook", "unibet_us", "williamhill_us"]),
      value: 5,
      label: "Iowa"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "draftkings", "fanduel", "pointsbetus", "williamhill_us"]),
      value: 6,
      label: "Kansas"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "williamhill_us", "wynnbet"]),
      value: 7,
      label: "Lousiana"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "williamhill_us"]),
      value: 8,
      label: "Maryland"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "foxbet", "pointsbetus", "williamhill_us", "wynnbet"]),
      value: 9,
      label: "Michigan"
    },
    {
      bookmakers: new Set(["betmgm"]),
      value: 10,
      label: "Mississippi"
    },
    {
      bookmakers: new Set(["circasports", "superbook", "williamhill_us"]),
      value: 11,
      label: "Nevada"
    },
    {
      bookmakers: new Set(["draftkings"]),
      value: 12,
      label: "New Hampshire"
    },
    {
      bookmakers: new Set(["barstool", "betfair", "betmgm", "betrivers", "draftkings", "fanduel", "foxbet", "pointsbetus", "superbook", "unibet_us", "williamhill_us", "wynnbet"]),
      value: 13,
      label: "New Jersey"
    },
    {
      bookmakers: new Set(["betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "williamhill_us", "wynnbet"]),
      value: 14,
      label: "New York"
    },
    {
      bookmakers: new Set(["betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus"]),
      value: 15,
      label: "Ohio"
    },
    {
      bookmakers: new Set(["draftkings"]),
      value: 16,
      label: "Oregon"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "foxbet", "pointsbetus", "twinspires", "unibet_us", "williamhill_us"]),
      value: 17,
      label: "Pennsylvania"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "draftkings", "fanduel", "superbook", "williamhill_us", "wynnbet"]),
      value: 18,
      label: "Tennessee"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "unibet_us", "williamhill_us", "wynnbet"]),
      value: 19,
      label: "Virginia"
    },
    {
      bookmakers: new Set(["betmgm", "williamhill_us"]),
      value: 20,
      label: "Washington DC"
    },
    {
      bookmakers: new Set(["barstool", "betmgm", "betrivers", "draftkings", "fanduel", "pointsbetus", "williamhill_us"]),
      value: 21,
      label: "West Virginia"
    },
    {
      bookmakers: new Set(["betmgm", "draftkings", "fanduel", "williamhill_us"]),
      value: 22,
      label: "Wyoming"
    }
]

export const bookmaker_links={ 
  "barstool":"https://www.barstoolsportsbook.com/",
  "betonlineag":"https://www.betonline.ag/",
  "betfair":"https://www.betfair.com/",
  "betmgm":"https://sports.ny.betmgm.com/en/sports",
  "betrivers":"https://betrivers.com/?page=landing#home",
  "betus":"https://www.betus.com.pa/sportsbook/",
  "bovada":"https://www.bovada.lv/",
  "circasports":"https://co.circasports.com/sports",
  "draftkings":"https://www.draftkings.com/",
  "fanduel":"https://sportsbook.fanduel.com/",
  "foxbet":"https://www.foxbet.com/",
  "gtbets":"https://www.gtbets.ag/",
  "intertops":"https://sports.everygame.eu/",
  "lowvig":"https://sportsbook.lowvig.ag/",
  "mybookieag":"https://www.mybookie.ag/sportsbook/",
  "pointsbetus":"https://pointsbet.com/",
  "sugarhouse":"https://www.playsugarhouse.com/",
  "superbook":"https://co.superbook.com/sports",
  "twinspires":"https://www.twinspires.com/",
  "unibet_us":"https://unibet.com/",
  "williamhill_us":"https://www.williamhill.com/us/",
  "wynnbet":"https://www.wynnbet.com/"
}

export const team_codes={
    "Over":"O",
    "Under":"U",
    //mlb
    "Arizona Diamondbacks":"ARI",
    "Atlanta Braves":"ATL",
    "Baltimore Orioles":"BAL",
    "Boston Red Sox":"BOS",
    "Chicago Cubs":"CHC",
    "Chicago White Sox":"CHW",
    "Cincinnati Reds":"CIN",
    "Cleveland Guardians":"CLE",
    "Colorado Rockies":"COL",
    "Detroit Tigers":"DET",
    "Houston Astros":"HOU",
    "Kansas City Royals":"KC",
    "Los Angeles Angels":"LAA",
    "Los Angeles Dodgers":"LAD",
    "Miami Marlins":"MIA",
    "Milwaukee Brewers":"MIL",
    "Minnesota Twins":"MIN",
    "New York Mets":"NYM",
    "New York Yankees":"NYY",
    "Oakland Athletics":"OAK",
    "Philadelphia Phillies":"PHI",
    "Pittsburgh Pirates":"PIT",
    "San Diego Padres":"SD",
    "San Francisco Giants":"SF",
    "Seattle Mariners":"SEA",
    "St. Louis Cardinals":"STL",
    "Tampa Bay Rays":"TB",
    "Texas Rangers":"TEX",
    "Toronto Blue Jays":"TOR",
    "Washington Nationals":"WSH",
    //nba
    "Atlanta Hawks":"ATL",
    "Boston Celtics":"BOS",
    "Brooklyn Nets":"BKN",
    "Charlotte Hornets":"CHA",
    "Chicago Bulls":"CHI",
    "Cleveland Cavaliers":"CLE",
    "Dallas Mavericks":"DAL",
    "Denver Nuggets":"DEN",
    "Detriot Pistons":"DET",
    "Golden State Warriors":"GSW",
    "Houston Rockets":"HOU",
    "Indiana Pacers":"IND",
    "Los Angeles Clippers":"LAC",
    "Los Angeles Lakers":"LAL",
    "Memphis Grizzlies":"MEM",
    "Miami Heat":"MIA",
    "Milwaukee Bucks":"MIL",
    "Minnesota Timberwolves":"MIN",
    "New Orleans Pelicans":"NOP",
    "New York Knicks":"NYK",
    "Oklahoma City Thunder":"OKC",
    "Orlando Magic":"ORL",
    "Philadelphia 76ers":"PHI",
    "Phoenix Suns":"PHX",
    "Portland Trail Blazers":"POR",
    "Sacramento Kings":"SAC",
    "San Antonio Spurs":"SAS",
    "Toronto Raptors":"TOR",
    "Utah Jazz":"UTA",
    "Washington Wizards":"WAS",
    //nhl
    "Anaheim Ducks":"ANA",
    "Arizona Coyotes":"ARI",
    "Boston Bruins":"BOS",
    "Buffalo Sabres":"BUF",
    "Calgary Flames":"CGY",
    "Carolina Hurricanes":"CAR",
    "Chicago Blackhawks":"CHI",
    "Colorado Avalanche":"COL",
    "Columbus Blue Jackets":"CBJ",
    "Dallas Stars":"DAL",
    "Detriot Red Wings":"DET",
    "Edmonton Oilers":"EDM",
    "Florida Panthers":"FLA",
    "Los Angeles Kings":"LA",
    "Minnesota Wild":"MIN",
    "Montreal Canadiens":"MTL",
    "Nashville Predators":"NSH",
    "New Jersey Devils":"NJ",
    "New York Islanders":"NYI",
    "New York Rangers":"NYR",
    "Ottawa Senators":"OTT",
    "Philadelphia Flyers":"PHI",
    "Pittsburgh Penguins":"PIT",
    "San Jose Sharks":"SJ",
    "Seattle Kraken":"SEA",
    "St. Louis Blues":"STL",
    "Tampa Bay Lightning":"TB",
    "Toronto Maple Leafs":"TOR",
    "Vancouver Canucks":"VAN",
    "Vegas Golden Knights":"VGK",
    "Washington Capitals":"WSH",
    "Winnipeg Jets":"WPG",
    //nfl
    "Arizona Cardinals":"ARI",
    "Atlanta Falcons":"ATL",
    "Baltimore Ravens":"BAL",
    "Buffalo Bills":"BUF",
    "Carolina Panthers":"CAR",
    "Chicago Bears":"CHI",
    "Cincinnati Bengals":"CIN",
    "Cleveland Browns":"CLE",
    "Dallas Cowboys":"DAL",
    "Denver Broncos":"DEN",
    "Detroit Lions":"DET",
    "Green Bay Packers":"GB",
    "Houston Texans":"HOU",
    "Indianapolis Colts":"IND",
    "Jacksonville Jaguars":"JAX",
    "Kansas City Chiefs":"KC",
    "Las Vegas Raiders":"LV",
    "Los Angeles Chargers":"LAC",
    "Los Angeles Rams":"LAR",
    "Miami Dolphins":"MIA",
    "Minnesota Vikings":"MIN",
    "New England Patriots":"NE",
    "New Orleans Saints":"NO",
    "New York Giants":"NYG",
    "New York Jets":"NYJ",
    "Philadelphia Eagles":"PHI",
    "Pittsburgh Steelers":"PIT",
    "San Francisco 49ers":"SF",
    "Seattle Seahawks":"SEA",
    "Tampa Bay Buccaneers":"TB",
    "Tennessee Titans":"TEN",
    "Washington Commanders":"WAS"
}


# Scripts

Scripts used to fetch odds and sync them with the database

## Prerequisites/Installation

I believe there are currently some dependency/package issues with npm. Running 'npm install axios cheerio' should make the scripts work but may break other node programs in the repo. 


## Running the scripts

First, fetch data via the webscraping script. This populates files in the resources/ directory with json formatted data.
```
~/.../BetSmart/scripts: node getWeeklyOdds.js
```

Next, convert the json data to SQL statements with the script that executes php
```
~/.../BetSmart/scripts: ./jsonToSql.sh
```

Finally, run the node file that will sync this data to the database by querying AWS with the SQL statements.
```
~/.../BetSmart/scripts: node syncDB.js
```


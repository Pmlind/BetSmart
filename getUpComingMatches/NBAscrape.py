import requests
from bs4 import BeautifulSoup
from datetime import datetime

NBA_country = {
  'Atlanta' : 'ATL',
  'Brooklyn' : 'BKN',
  'Boston' : 'BOS',
  'Charlotte' : 'CHA',
  'Chicago' : 'CHI',
  'Cleveland' : 'CLE',
  'Dallas' : 'DAL',
  'Denver' : 'DEN',
  'Detroit' : 'DET',
  'Golden State' : 'GSW',
  'Houston' : 'HOU',
  'Indiana' : 'IND',
  'LA' : 'LAC',
  'Los Angeles' : 'LAL',
  'Memphis' : 'MEM',
  'Miami' : 'MIA',
  'Milwaukee' : 'MIL',
  'Minnesota' : 'MIN',
  'New Orleans' : 'NOP',
  'New York' : 'NYK',
  'Oklahoma City' : 'OKC',
  'Orlando' : 'ORL',
  'Philadelphia' : 'PHI',
  'Phoenix' : 'PHX',
  'Portland' : 'POR',
  'Sacramento' : 'SAC',
  'San Antonio' : 'SAS',
  'Toronto' : 'TOR',
  'Utah' : 'UTA',
  'Washington' : 'WAS'
}

# Define the URL to scrape
url = 'https://www.espn.com/nba/schedule/_/date/20230406'

# Send a GET request to the URL and get its HTML content
response = requests.get(url)
html_content = response.content

# Parse the HTML content using Beautiful Soup
soup = BeautifulSoup(html_content, 'html.parser')

file = open('upcomingNBA.sql', 'w')
# text="DROP TABLE IF EXISTS NBAUPCOMING;\nCREATE TABLE IF NOT EXISTS NBAUPCOMING (\ndate_ DATE,\ntime_ TIME,\nhome_team VARCHAR(3),\naway_team VARCHAR(3),\nPRIMARY KEY(date_, home_team, away_team)\n);\n"
# file.write(text)


# Find all the <div> elements with the class 'ResponsiveTable' 
game_details = soup.find_all('div', class_='ResponsiveTable')

# Loop through each game detail and extract the match time and teams
for game in game_details:
    get_week = game.find('div', class_='Table__Title').get_text()
    date = datetime.strptime(get_week[:-1], '%A, %B %d, %Y').date()
    matches = game.find_all('tr', class_ = 'Table__TR')
    
    for i in range(len(matches)):
        teams = matches[i].find_all('a', class_='AnchorLink')
        if(len(teams)>0):
            away_team = teams[1].get_text()
            home_team = teams[3].get_text()
            time = teams[4].get_text()
            que = "INSERT INTO NBAUPCOMING (date_, time_, home_team, away_team)\n"
            que+= "VALUE ('" + str(date) + "','"+ time + "','"+NBA_country[home_team]+ "','"+NBA_country[away_team] +"');\n"
            file.write(que)

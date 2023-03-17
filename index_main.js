/*
Main algorithm code.
*/

let team_logo={
  "Arizona Cardinals" : "./images\\NFL\\Cardinals_logo.svg.png",
  "Atlanta Falcons" : "./images\\NFL\\Falcons_logo.svg.png",
  "Baltimore Ravens" : "./images\\NFL\\Ravens_logo.svg.png",
  "Buffalo Bills" : "./images\\NFL\\Bills_logo.svg.png",
  "Carolina Panthers" : "./images\\NFL\\Panthers_logo.svg.png",
  "Chicago Bears" : "./images\\NFL\\Bears_logo.svg.png",
  "Cincinnati Bengals" : "./images\\NFL\\Bengals_logo.svg.png",
  "Cleveland Browns" : "./images\\NFL\\Browns_logo.svg.png",
  "Dallas Cowboys" : "./images\\NFL\\Cowboys_logo.svg.png",
  "Denver Broncos" : "./images\\NFL\\Broncos_logo.svg.png",
  "Detroit Lions" : "./images\\NFL\\Lions_logo.svg.png",
  "Green Bay Packers" : "./images\\NFL\\Packers_logo.svg.png",
  "Houston Texans" : "./images\\NFL\\Texans_logo.svg.png",
  "Indianapolis Colts" : "./images\\NFL\\Colts_logo.svg.png",
  "Jacksonville Jaguars" : "./images\\NFL\\Jaguars_logo.svg.png",
  "Kansas City Chiefs" : "./images\\NFL\\Chiefs_logo.svg.png",
  "Las Vegas Raiders" : "./images\\NFL\\Raiders_logo.svg.png",
  "Los Angeles Chargers" : "./images\\NFL\\Chargers_logo.svg.png",
  "Los Angeles Rams" : "./images\\NFL\\Rams_logo.svg.png",
  "Miami Dolphins" : "./images\\NFL\\Dolphins_logo.svg.png",
  "Minnesota Vikings" : "./images\\NFL\\Vikings_logo.svg.png",
  "New England Patriots" : "./images\\NFL\\Patriots_logo.svg.png",
  "New Orleans Saints" : "./images\\NFL\\Saints_logo.svg.png",
  "New York Giants" : "./images\\NFL\\Giants_logo.svg.png",
  "New York Jets" : "./images\\NFL\\Jets_logo.svg.png",
  "Philadelphia Eagles" : "./images\\NFL\\Eagles_logo.svg.png",
  "Pittsburgh Steelers" : "./images\\NFL\\Steelers_logo.svg.png",
  "San Francisco 49ers" : "./images\\NFL\\49ers_logo.svg.png",
  "Seattle Seahawks" : "./images\\NFL\\Seahawks_logo.svg.png",
  "Tampa Bay Buccaneers" : "./images\\NFL\\Buccaneers_logo.svg.png",
  "Tennessee Titans" : "./images\\NFL\\Titans_logo.svg.png",
  "Washington Commanders" : "./images\\NFL\\Commanders_logo.svg.png"
}

let background_color={
  "Arizona Cardinals" : "#97233F",
  "Atlanta Falcons" : "#A71930",
  "Baltimore Ravens" : "#241773",
  "Buffalo Bills" : "#00338D",
  "Carolina Panthers" : "#0085CA",
  "Chicago Bears" : "#03202F",
  "Cincinnati Bengals" : "#FB4F14",
  "Cleveland Browns" : "#311D00",
  "Dallas Cowboys" : "#003594",
  "Denver Broncos" : "#FB4F14",
  "Detroit Lions" : "#0076B6",
  "Green Bay Packers" : "#203731",
  "Houston Texans" : "#03202F",
  "Indianapolis Colts" : "#002C5F",
  "Jacksonville Jaguars" : "#006778",
  "Kansas City Chiefs" : "#E31837",
  "Las Vegas Raiders" : "#000000",
  "Los Angeles Chargers" : "#0080C6",
  "Los Angeles Rams" : "#002244",
  "Miami Dolphins" : "#008E97",
  "Minnesota Vikings" : "#4F2683",
  "New England Patriots" : "#002244",
  "New Orleans Saints" : "#D3BC8D",
  "New York Giants" : "#0B2265",
  "New York Jets" : "#003F2D",
  "Philadelphia Eagles" : "#004C54",
  "Pittsburgh Steelers" : "#FFB612",
  "San Francisco 49ers" : "#AA0000",
  "Seattle Seahawks" : "#002244",
  "Tampa Bay Buccaneers" : "#D50A0A",
  "Tennessee Titans" : "#4B92DB",
  "Washington Commanders" : "#773141"
}

function toggle(e){
  console.log(e);
  if(e.classList.contains("hidden")) e.classList.remove("hidden");
  else e.classList.add("hidden");
}

function hide_body_pages_except(e){
  Array.from(document.getElementsByClassName("body-page")).forEach(element => {
    if(!element.classList.contains("hidden")) element.classList.add("hidden");
  });
  e.classList.remove("hidden");
}

function NFL_picks_fetch(){
  var NFL_picks = document.getElementById("NFL-picks");
  hide_body_pages_except(NFL_picks);
  if(NFL_picks.children.length<1){
    
    var picks_table;
    $.ajax({
      type: "GET",
      url: "./api/user/fetchpicks.php",
    })
      .done(function( response ) {
        // Update the page content with the response from the server
        picks_table = JSON.parse(response);
      });
      $(document).ajaxStop(function() {
        //console.log(picks_table);
        var table = document.createElement('table');
        //headerrow
        var header_row= document.createElement('tr');
        var headers = ['week','picktype','team','spread','spreadby','inj'];
        for (var i=0;i<headers.length;i++){
          var header = document.createElement('th');
          header.innerHTML = headers[i];
          header_row.appendChild(header);
        }
        table.appendChild(header_row);

        //data
        for(var i=0;i<picks_table.length;i++){
          var row = document.createElement('tr'); 
          for (var j=0; j<headers.length;j++){
            var cell = document.createElement('td');
            cell.innerHTML = picks_table[i][headers[j]];
            row.appendChild(cell);
          }
          table.appendChild(row);
        }

        //display
        NFL_picks.appendChild(table);
      })
  }
}

function NBA_picks_fetch(){
  var NBA_picks = document.getElementById("NBA-picks");
  hide_body_pages_except(NBA_picks);
  //TODO: Implement this
}

function all_picks_fetch(){
  var NBA_picks = document.getElementById("NBA-picks");
  var NFL_picks = document.getElementById("NFL-picks");
  Array.from(document.getElementsByClassName("body-page")).forEach(element => {
    if(!element.classList.contains("hidden")) element.classList.add("hidden");
  });
  NBA_picks.classList.remove("hidden");
  NFL_picks.classList.remove("hidden");
  //TODO: Implement this
}

function NFL_page(){
  var NFL = document.getElementById("NFL-sport");
  hide_body_pages_except(NFL);
  //TODO: Implement this
}

function NBA_page(){
  var NBA = document.getElementById("NBA-sport");
  hide_body_pages_except(NBA);
  //TODO: Implement this
}

function show_user_info(){
  var user = document.getElementById("user-info");
  hide_body_pages_except(user);
}


//function test(team1, team2){
  //   let team1_logo = document.getElementById("team1-logo");
  //   let team2_logo = document.getElementById("team2-logo");
  //   let team1_name = document.getElementById("team1-name");
  //   let team2_name = document.getElementById("team2-name");
  
  //   let t1_background = document.getElementById("team1");
  //   let t2_background = document.getElementById("team2");
  
  //   // console.log(team1_logo);
  //   // console.log(team2_logo);
  //   team1_logo.setAttribute("src", team_logo[team1]);
  //   team1_name.textContent = team1;
  //   t1_background.style.background = background_color[team1];
  
  //   team2_logo.setAttribute("src", team_logo[team2]);
  //   team2_name.textContent = team2;
  //   t2_background.style.background = background_color[team2];
  // }

// function match_result_display(team1, t1_score, team2, t2_score){
//   const newDiv = document.createElement("div");
//   newDiv.classList.add("match-teams");
  
//   //team 1's div
//   //frame
//   const t1Div = document.createElement("div");
//   t1Div.classList.add("team");
//   t1Div.setAttribute("id","team1");
//   t1Div.style.background = background_color[team1];
//   //get logo
//   const t1Img = document.createElement("img");
//   t1Img.classList.add("logo");
//   t1Img.setAttribute("id","team1-logo");
//   t1Img.setAttribute("src",team_logo[team1]);
//   //get name
//   const t1Label = document.createElement("label");
//   t1Label.classList.add("team-name");
//   t1Label.setAttribute("id","team1-name");
//   t1Label.textContent = team1;

//   //score
//   const t1score = document.createElement("label");
//   t1score.classList.add("team-score");
//   t1score.setAttribute("id","team1-score");
//   t1score.textContent = t1_score;

//   t1Div.appendChild(t1Img);
//   t1Div.appendChild(t1Label);
//   t1Div.appendChild(t1score);

//   //team 2's div
//   //frame
//   const t2Div = document.createElement("div");
//   t2Div.classList.add("team");
//   t2Div.setAttribute("id","team2");
//   t2Div.style.background = background_color[team2];
//   //get logo
//   const t2Img = document.createElement("img");
//   t2Img.classList.add("logo");
//   t2Img.setAttribute("id","team2-logo");
//   t2Img.setAttribute("src",team_logo[team2]);
//   //get name
//   const t2Label = document.createElement("label");
//   t2Label.classList.add("team-name");
//   t2Label.setAttribute("id","team2-name");
//   t2Label.textContent = team2;

//   //score
//   const t2score = document.createElement("label");
//   t2score.classList.add("team-score");
//   t2score.setAttribute("id","team2-score");
//   t2score.textContent = t2_score;

//   t2Div.appendChild(t2score);
//   t2Div.appendChild(t2Label);
//   t2Div.appendChild(t2Img);

//   newDiv.appendChild(t1Div);
//   newDiv.appendChild(t2Div);

//   return newDiv;
// }

// function display_history(){
//   var scores_table;
//   var history_frame = document.getElementById("history-frame");
//   var tab = document.getElementById("fecthhistory");
  
//   $.ajax({
//     type: "GET",
//     url: "./api/user/fetchhistory.php",
//   })
//     .done(function( response ) {
//       // Update the page content with the response from the server
//       scores_table = JSON.parse(response);
//     });

//   $(document).ajaxStop(function() {
//     var t1name;
//     var t2name;
//     var t1score;
//     var t2score;
//     for(var week=13;week>0;week--){
//       //week label
//       const newLabel = document.createElement("label");
//       newLabel.setAttribute("class","week-label");
//       newLabel.setAttribute("onclick","toggle(this.nextElementSibling)");
//       newLabel.textContent="Week " + week;
//       //matches
//       const newDiv = document.createElement("div");
//       newDiv.classList.add("week-matches");
//       newDiv.classList.add("hidden");
//       history_frame.appendChild(newLabel);
      
      
//       for(var j=0;j<scores_table.length;j++){
//         if(scores_table[j]['week'] == String(week)){  
//           t1name = scores_table[j]["team1"];
//           t2name = scores_table[j]["team2"];
//           t1score= scores_table[j]["team1scores"];
//           t2score = scores_table[j]["team2scores"];
//           newDiv.appendChild(match_result_display(t1name,t1score,t2name,t2score));
//         }
//           history_frame.appendChild(newDiv);
//         }

//     }
//     tab.setAttribute("onclick", "toggle(this.nextElementSibling);")
//   })
// }


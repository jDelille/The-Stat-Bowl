let form = document.querySelector('form')
let btn = document.querySelector('button')
let display = document.querySelector('.display-stats')
let favBtn = document.querySelector('.fav-btn')
let favorites = document.querySelector('.favorites')
let topDisplay = document.querySelector('.top-display')



// TOP GAMEBAR DISPLAY - - - - - - - 
fetch('/display')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for(let i = 0; i < data.length; i++) {
            const {home_team_id, home_team_spread, road_team_spread,road_team_id,kickoff_display,ht_pct_su_experts,rt_pct_su_experts,ht_pct_ats_experts,home_team_odds_ats_ame, road_team_odds_ats_ame, rt_pct_ats_experts, game_state, home_team_wins, home_team_losses, road_team_wins, road_team_losses, home_team_score, road_team_score, live_home_team_score, live_road_team_score, DownAndDistance, Possession, } = data[i]
            
        
            // TOP GAME BAR
            //+= returns every value
            topDisplay.innerHTML += `
            <div class="games-display">
                <div class="teams">
                    <div class="team-logos">
                        <div class="home-logo"></div>
                        <div class="road-logo"></div>
                    </div>
                    <div class="team-initials">
                        <h1 class="home-team"> ${home_team_id} </h1>
                        <h1 class="road-team"> ${road_team_id} </h1>
                    </div>
                    <div class="team-records">
                        <h1 class="home-wins">${home_team_wins} - ${home_team_losses} </h1>
                        <h1 class="road-wins"> ${road_team_wins} - ${road_team_losses}</h1>
                    </div>
                    <div class="status">
                    <h1 class="game-status">${kickoff_display}</h1>
                    </div>
                </div>
            </div>
            ` 

            let homeWins = document.querySelectorAll('.home-wins')[i]
            let roadWins = document.querySelectorAll('.road-wins')[i]
            let gameStatus = document.querySelectorAll('.game-status')[i]
            let homeWinning = document.querySelectorAll('.home-team')[i]
            let homeWinningLogo = document.querySelectorAll('.home-logo')[i]
            let roadWinning = document.querySelectorAll('.road-team')[i]



            if(game_state === "Final") {
                homeWins.innerHTML = `${live_home_team_score}`
                roadWins.innerHTML = `${live_road_team_score}`
                gameStatus.innerHTML = `${game_state}`
                
            }

            if(game_state === "InProgress") {
                homeWins.innerHTML = `${live_home_team_score}`
                roadWins.innerHTML = `${live_road_team_score}`
                gameStatus.innerHTML = `Q${data[i].additional_data.Quarter}, ${data[i].additional_data.TimeRemaining}`
            }

            if(live_home_team_score > live_road_team_score) {
                homeWinning.classList.add('winning');
            } else if (live_road_team_score > live_home_team_score) {
                roadWinning.classList.add('winning');
            }


            let home_icon = new Image()
            let home_extension = ".svg"
            let team_initials = home_team_id
            home_icon.src = "icons/" + team_initials + home_extension
            home_icon.classList.add('svg-logo');
            let chinchilla = document.querySelectorAll('.home-logo')
            chinchilla[i].append(home_icon) 

            let away_icon = new Image()
            let away_extension = ".svg"
            let away_initials = road_team_id
            away_icon.src = "icons/" + away_initials + away_extension
            away_icon.classList.add('svg-logo');
            let monkey = document.querySelectorAll('.road-logo')
            monkey[i].append(away_icon) 
        }
    })

// SELECT QUARTERBACK CONTAINER - - - - - - - - 
btn.addEventListener('click', () => {
    let select = document.getElementById('select-team')
    fetch(`/team/${select.value}`)
    
    .then(res => res.json())
    
    .then(data => {
        const {photo, name, team_id, games_played, PlayerPassingCompletions, PlayerPassingAttempts, PlayerPassingCompletionPercentage, PlayerPassingYards, PlayerPassingLong,  PlayerPassingTouchdowns,PlayerPassingInterceptions, PlayerPassingSacks, PlayerRushingYards, FumblesLost, PlayerRushingLong, PlayerRushingTouchdowns} = data
        



        display.innerHTML = `
            <div class="player">
                <img src = ${photo} />
                <h1><span>Player:</span> <br> ${name}</h1>
                <h1><span>Team:</span> <br> ${team_id}</h1>
                <h1><span>Games Played:</span> <br> ${games_played}</h1>
            </div>
            <div class="player-stats">
                <div class="top-stats stats">
                <div class="stat-labels">  
                    <h1>Touchdowns</h1>
                    <h1>Interceptions</h1>
                    <h1>Sacks</h1>
                    <h1>Completions</h1>
                    <h1>Longest Pass</h1>
                    <h1>Total Yards</h1> 
                </div>
                    <h1>${PlayerPassingTouchdowns.value}</h1>
                    <h1>${PlayerPassingInterceptions.value}</h1>
                    <h1>${PlayerPassingSacks.value}</h1>
                    <h1>${PlayerPassingCompletions.value}</h1>
                    <h1>${PlayerPassingLong.value}</h1>
                    <h1>${PlayerPassingYards.value}</h1>
                </div>
                <div class="middle-stats stats">
                <div class="stat-labels">  
                    
                </div>
                <div class="stat-labels">
                    
                </div>
                    
                </div>
            </div>

            <div class="doughnut">
                <div class="chartBox">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
            `
            let ctx = document.getElementById('myChart')

            const chartData = []
            chartData.push(PlayerPassingTouchdowns.value)
            chartData.push(PlayerPassingInterceptions.value)
            chartData.push(PlayerPassingSacks.value)

            


            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['TD', 'INT', 'Sacks'],
                    datasets: [{
                        label: '',
                        data: chartData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                }
            });

            
    })
    
})


{/* <div class="middle-stats stats">
                <div class="stat-labels">
                    <h1>Completions</h1>
                    <h1>Longest Pass</h1>
                    <h1>Total Yards</h1> 
                </div>
                    <h1>${PlayerPassingCompletions.value}</h1>
                    <h1>${PlayerPassingLong.value}</h1>
                    <h1>${PlayerPassingYards.value}</h1>
                </div>
                <div class="bottom-stats stats">
                <div class="stat-labels">
                    
                </div>
                    <h1>${PlayerRushingYards.value}</h1>
                    <h1>${PlayerRushingTouchdowns.value}</h1>
                    <h1>${PlayerRushingLong.value}</h1>
                </div> */}





fetch('/news')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            const {team_id, name, position, headline, analysis } = data[i]
            
           

            favorites.innerHTML += `
                <div class="news">
                    <div class="player-news">
                        <div class="news-icon">
                        </div>
                        <h1 class="name">${name}, ${position}</h1>
                    </div>
                    
                    <h1 class="headline">${headline}</h1>
                </div>
            `

            let team_icon = new Image()
            let extension = ".svg"
            let team_initials = team_id
            team_icon.src = "icons/" + team_initials + extension
            team_icon.classList.add('betting-svg-logo');;
            let chinch = document.querySelectorAll('.news-icon')
            chinch[i].append(team_icon) 
        }
    })




// EXPERT PICKS CONTAINER - - - - - - - - 
let expertPicks = document.querySelector('.expert-picks')
fetch('/games')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            const {home_team_id,home_team_spread, road_team_spread,road_team_id,ht_pct_su_experts,rt_pct_su_experts,ht_pct_ats_experts,home_team_odds_ats_ame, road_team_odds_ats_ame, rt_pct_ats_experts, game_state, live_home_team_score, live_road_team_score} = data[i]

        expertPicks.innerHTML += `
            <div class="games">
                <div class="ht-picks">
                    <div class="logo-name">
                        <div class="home-logo-expert"></div>
                    </div>
                    <h1 class="home-winner">${ht_pct_su_experts}%</h1>
                    <h1 class="home-winner-ats"> ${ht_pct_ats_experts}%</h1>
                </div>
                <div class="rt-picks">
                    <div class="logo-name">
                        <div class="road-logo-expert"></div>
                        
                    </div>
                    <h1 class="road-winner"> ${rt_pct_su_experts}%</h1>
                    <h1 class="road-winner-ats"> ${rt_pct_ats_experts}%</h1>
                </div>
            </div>
        `

        let homeWinnerSU = document.querySelectorAll('.home-winner')[i]
        let homeWinnerATS = document.querySelectorAll('.home-winner-ats')[i]
        let roadWinnerSU = document.querySelectorAll('.road-winner')[i]
        let roadWinnerATS = document.querySelectorAll('.road-winner-ats')[i]

        if(ht_pct_ats_experts > rt_pct_ats_experts) {
            homeWinnerSU.classList.add('winner')
            roadWinnerSU.classList.remove('winner')
            roadWinnerSU.classList.add('loser')
        } else {
            roadWinnerSU.classList.add('winner')
            homeWinnerSU.classList.remove('winner')
            homeWinnerSU.classList.add('loser')
        }

        if(ht_pct_su_experts > rt_pct_su_experts) {
            homeWinnerATS.classList.add('winner')
            roadWinnerATS.classList.remove('winner')
            roadWinnerATS.classList.add('loser')
        } else {
            roadWinnerATS.classList.add('winner')
            homeWinnerATS.classList.remove('winner')
            homeWinnerATS.classList.add('loser')
        }

       

        // let expertWinCounter = 0;

        // // if(game_state === "Final" && homeWinnerSU.classList.contains('winner') && live_home_team_score > live_road_team_score) {
        // //     expertWinCounter++
        // // }
        // // } 



        // let expertKD = document.querySelector('.expert-kd')

        // expertKD.innerHTML = expertWinCounter

        const buttonRight = document.querySelector('.scroll-right');
        const buttonLeft = document.querySelector('.scroll-left');
    
        buttonRight.onclick = function () {
          document.querySelector('.top-display').scrollLeft += 120;
        };
        buttonLeft.onclick = function () {
          document.querySelector('.top-display').scrollLeft -= 120;
        };

        let home_icon = new Image()
            let home_extension = ".svg"
            let team_initials = home_team_id
            home_icon.src = "icons/" + team_initials + home_extension
            home_icon.classList.add('betting-svg-logo');;
            let chinchilla = document.querySelectorAll('.home-logo-expert')
            chinchilla[i].append(home_icon) 

            let away_icon = new Image()
            let away_extension = ".svg"
            let away_initials = road_team_id
            away_icon.src = "icons/" + away_initials + away_extension
            away_icon.classList.add('betting-svg-logo');;
            let monkey = document.querySelectorAll('.road-logo-expert')
            monkey[i].append(away_icon) 
        }

    })

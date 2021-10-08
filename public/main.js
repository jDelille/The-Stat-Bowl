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
                    <h1>${kickoff_display}</h1>
                    </div>
                </div>
            </div>
            ` 
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
                </div>
                    <h1>${PlayerPassingTouchdowns.value}</h1>
                    <h1>${PlayerPassingInterceptions.value}</h1>
                    <h1>${PlayerPassingSacks.value}</h1>
                </div>
                <div class="middle-stats stats">
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
                    <h1>Rushing Yards</h1>
                    <h1>Longest Rush</h1>
                    <h1>Rushing Touchdowns</h1>
                </div>
                    <h1>${PlayerRushingYards.value}</h1>
                    <h1>${PlayerRushingTouchdowns.value}</h1>
                    <h1>${PlayerRushingLong.value}</h1>
                </div>
            </div>
            `
    })
})

// FAVORITES CONTAINER - - - - - - - -
favBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let select = document.getElementById('select-team').value
    favorites.innerHTML = `
        <div class='fav-team'> 
            <h1 class="view">${select}</h1>
        </div>
    `
    let favTeamBtn = document.querySelector('.view')
    favTeamBtn.addEventListener('click', () => {
        let ya = favTeamBtn.innerText 
    fetch(`/team/${ya}`)
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
                </div>
                    <h1>${PlayerPassingTouchdowns.value}</h1>
                    <h1>${PlayerPassingInterceptions.value}</h1>
                    <h1>${PlayerPassingSacks.value}</h1>
                </div>
                <div class="middle-stats stats">
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
                    <h1>Rushing Yards</h1>
                    <h1>Longest Rush</h1>
                    <h1>Rushing Touchdowns</h1>
                </div>
                    <h1>${PlayerRushingYards.value}</h1>
                    <h1>${PlayerRushingTouchdowns.value}</h1>
                    <h1>${PlayerRushingLong.value}</h1>
                </div>
            </div>
        `

        let fav_team_icon = new Image()
        fav_team_icon.src = "icons/" + ya + ".svg"
        fav_team_icon.classList.add('svg-logo');
        let fav_icon = document.querySelectorAll('.fav-team-icon')
        fav_icon.append(fav_team_icon) 
        })
    })
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
                        <h1>${home_team_id}</h1>
                    </div>
                    <h1 class="home-winner">${ht_pct_su_experts}%</h1>
                    <h1 class="home-winner-ats">${ht_pct_ats_experts}%</h1>
                </div>
                <div class="rt-picks">
                    <div class="logo-name">
                        <div class="road-logo-expert"></div>
                        <h1>${road_team_id}</h1>
                    </div>
                    <h1 class="road-winner">${rt_pct_su_experts}%</h1>
                    <h1 class="road-winner-ats">${rt_pct_ats_experts}%</h1>
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

        // if(game_state === "Final" && homeWinnerSU.classList.contains('winner') && live_home_team_score > live_road_team_score) {
        //     expertWinCounter++
        // } else if (game_state === "Final" && roadWinnerSU.classList.contains('winner') && live_road_team_score > live_home_team_score) {
        //     expertWinCounter++
        // } 


        // console.log(expertWinCounter + " out of 16 games correct")

        let home_icon = new Image()
            let home_extension = ".svg"
            let team_initials = home_team_id
            home_icon.src = "icons/" + team_initials + home_extension
            home_icon.classList.add('svg-logo');
            let chinchilla = document.querySelectorAll('.home-logo-expert')
            chinchilla[i].append(home_icon) 

            let away_icon = new Image()
            let away_extension = ".svg"
            let away_initials = road_team_id
            away_icon.src = "icons/" + away_initials + away_extension
            away_icon.classList.add('svg-logo');
            let monkey = document.querySelectorAll('.road-logo-expert')
            monkey[i].append(away_icon) 
        }

    })

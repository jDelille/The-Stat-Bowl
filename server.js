const express = require('express')
const path = require('path')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/games', async (req, res) => {
    const response = await axios.get('https://api.nflpickwatch.com/v1/general/games/2021/5/nfl')
    const expertPicks = response.data
    res.status(200).send(expertPicks)
})

app.get('/news', async (req, res) => {
    const response = await axios.get('https://api.nflpickwatch.com/v1/nfl/news')
    const news = response.data
    res.status(200).send(news)
})

app.get('/display', async (req, res) => {
    const response = await axios.get('https://api.nflpickwatch.com/v1/general/games/2021/5/nfl')
    const display = response.data
    res.status(200).send(display)
})

let URL = 'https://api.nflpickwatch.com/v1/nfl/stats?context=player&noRank=false&toWeek=5&fromWeek=1&toSeason=2021&fromSeason=2021&limit=40&fields[]=PlayerPassingCompletions&fields[]=PlayerPassingAttempts&fields[]=PlayerPassingCompletionPercentage&fields[]=PlayerPassingYards&fields[]=PlayerPassingYardsPerAttempt&fields[]=PlayerPassingYardsPerGame&fields[]=PlayerPassingLong&fields[]=PlayerPassingTouchdowns&fields[]=PlayerPassingInterceptions&fields[]=PlayerPassingSacks&fields[]=PlayerRushingYards&fields[]=FumblesLost&fields[]=PlayerRushingLong&fields[]=PlayerRushingTouchdowns&fields[]=PassingPlayPercentage' 

app.get('/team/:team_id', async (req, res) => {
    const response = await axios.get(URL)
    const {team_id} = req.params
    const filterPlayers = response.data.data.filter((playerObj) => {
        return playerObj.team_id === team_id
    })
    res.status(200).send(filterPlayers[0])
    
})

app.get('/match/:home_team_id', async (req, res) => {
    const response = await axios.get('https://api.nflpickwatch.com/v1/general/games/2021/5/nfl')
    const {home_team_id} = req.params

    const filterTeam = response.data.filter((playerObj) => {
        return playerObj.home_team_id === home_team_id
    })
    res.status(200).send(filterTeam[0])
    
})

const port = process.env.PORT || 4000
// const port = 4000;
app.listen(port, () => console.log('listening on port 4000'))

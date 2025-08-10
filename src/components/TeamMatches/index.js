import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PieChart from '../PieChart'

import './index.css'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isLoading: true}

  componentDidMount() {
    this.getData()
  }

  convertData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const res = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await res.json()

    const newApiData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: this.convertData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachItem =>
        this.convertData(eachItem),
      ),
    }

    this.setState({teamMatchesData: newApiData, isLoading: false})
  }

  getNoOfMatches = value => {
    const {teamMatchesData} = this.state
    const {latestMatch, recentMatches} = teamMatchesData

    const normalize = status => {
      if (!status) return ''
      const s = status.toLowerCase()
      if (s.includes('won')) return 'Won'
      if (s.includes('lost')) return 'Lost'
      return 'Drawn'
    }

    const currentMatch = normalize(latestMatch.matchStatus) === value ? 1 : 0

    return (
      recentMatches.filter(match => normalize(match.matchStatus) === value)
        .length + currentMatch
    )
  }

  generatePieChartData = () => [
    {name: 'Won', value: this.getNoOfMatches('Won')},
    {name: 'Lost', value: this.getNoOfMatches('Lost')},
    {name: 'Drawn', value: this.getNoOfMatches('Drawn')},
  ]

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatch, recentMatches} = teamMatchesData

    if (!latestMatch || !recentMatches) {
      return null
    }

    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        <h1 className="heading">Team Statistics</h1>

        {recentMatches.length > 0 && (
          <PieChart data={this.generatePieChartData()} />
        )}

        {this.renderRecentMatchesList()}

        <Link to="/">
          <button type="button" className="btn btn-outline-info mb-2">
            Back
          </button>
        </Link>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  classes = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXIP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SRH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const classname = `team ${this.classes()}`
    return (
      <div className={classname}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches

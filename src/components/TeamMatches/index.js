import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {teamList: {}, isLoading: true}

  componentDidMount() {
    this.getdata()
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

  getdata = async () => {
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

    this.setState({teamList: newApiData, isLoading: false})
  }

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

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getdataFromApi = () => {
    const {teamList} = this.state
    const {recentMatches, latestMatch, teamBannerUrl} = teamList

    return (
      <div className="next-con">
        <img src={teamBannerUrl} alt="team banner" className="banner" />
        <LatestMatch latestmatchdata={latestMatch} />
        <ul className="ul-con">
          {recentMatches.map(each => (
            <MatchCard key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const classname = `team ${this.classes()}`
    return (
      <div className={classname}>
        {isLoading ? this.renderLoader() : this.getdataFromApi()}
      </div>
    )
  }
}

export default TeamMatches

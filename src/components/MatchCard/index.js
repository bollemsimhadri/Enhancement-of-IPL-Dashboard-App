import {Component} from 'react'
import './index.css'

class MatchCard extends Component {
  getMatchStatus = matchStatus => {
    if (matchStatus === 'Won') {
      return 'match-won'
    }
    return 'match-lost'
  }

  render() {
    const {matchDetails} = this.props
    const {result, matchStatus, competingTeam, competingTeamLogo} = matchDetails

    const matchStatusClassName = `match-status ${this.getMatchStatus(
      matchStatus,
    )}`

    return (
      <li className="li-con">
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          className="match-img"
        />
        <p className="para">{competingTeam}</p>
        <p className="para">{result}</p>
        <p className={matchStatusClassName}>{matchStatus}</p>
      </li>
    )
  }
}

export default MatchCard

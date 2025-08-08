import './index.css'

const LatestMatch = props => {
  const {latestmatchdata} = props
  const {
    umpires,
    date,
    result,
    venue,
    manOfTheMatch,
    firstInnings,
    secondInnings,
    competingTeam,
    competingTeamLogo,
  } = latestmatchdata

  return (
    <div className="latest-match-container">
      <h1 className="heading">Latest Matches</h1>
      <div className="main-con">
        <div className="match-details-card">
          <div className="left-section">
            <p className="teamname">{competingTeam}</p>
            <p className="date">{date}</p>
            <p className="venue">{venue}</p>
            <p className="result">{result}</p>
          </div>

          <div className="center-section">
            <img
              src={competingTeamLogo}
              alt={`latest match ${competingTeam}`}
              className="logo"
            />
          </div>

          <div className="right-section">
            <p className="para">First Innings</p>
            <p className="value">{firstInnings}</p>
            <p className="para">Second Innings</p>
            <p className="value">{secondInnings}</p>
            <p className="para">Man Of The Match</p>
            <p className="value">{manOfTheMatch}</p>
            <p className="para">Umpires</p>
            <p className="value">{umpires}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch

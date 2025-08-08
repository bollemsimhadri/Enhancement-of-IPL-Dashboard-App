import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails

  return (
    <li className="list-con">
      <Link to={`/team-matches/${id}`} className="link">
        <img src={teamImageUrl} alt={name} className="team-img" />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard

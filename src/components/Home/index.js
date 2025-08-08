import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsData: [], isLoading: true}

  componentDidMount() {
    this.getdata()
  }

  getdata = async () => {
    const res = await fetch('https://apis.ccbp.in/ipl')
    const data = await res.json()

    const newData = data.teams.map(eachitem => ({
      id: eachitem.id,
      name: eachitem.name,
      teamImageUrl: eachitem.team_image_url,
    }))

    this.setState({
      teamsData: newData,
      isLoading: false,
    })
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeamList = () => {
    const {teamsData} = this.state
    return (
      <ul className="team-list">
        {teamsData.map(team => (
          <TeamCard key={team.id} teamDetails={team} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="main-container">
        <div className="card-con">
          <div className="head-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="img"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoading() : this.renderTeamList()}
        </div>
      </div>
    )
  }
}

export default Home

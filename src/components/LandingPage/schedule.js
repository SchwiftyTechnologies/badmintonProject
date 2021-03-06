import React, { Component } from "react";
import "./styles.css";

class schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          player1: "ABC",
          player2: "XYZ",
          score: "15-13 14-15 15-7",
          image1:
            "https://img.icons8.com/ios-filled/50/000000/guest-male--v1.png",
          image2:
            "https://img.icons8.com/ios-filled/50/000000/guest-male--v1.png",
          center: "Go to Match Center",
          date: "20th July 2020",
          tournament: {
            name: "ABCXYZ",
            year: "2020",
          },
        },
        {
          player1: "ABC",
          player2: "XYZ",
          score: "15-13  14-15  15-7",
          image1:
            "https://img.icons8.com/ios-filled/50/000000/guest-male--v1.png",
          image2:
            "https://img.icons8.com/ios-filled/50/000000/guest-male--v1.png",
          center: "Go to Match Center",
          date: "20th July 2020",
          tournament: {
            name: "ABCXYZ",
            year: "2020",
          },
        },
        {
          player1: "ABC",
          player2: "XYZ",
          score: "15-13  14-15  15-7",
          image1:
            "https://img.icons8.com/ios-filled/50/000000/guest-male--v1.png",
          image2:
            "https://img.icons8.com/ios-filled/50/000000/guest-male--v1.png",
          center: "Go to Match Center",
          date: "20th July 2020",
          tournament: {
            name: "ABCXYZ",
            year: "2020",
          },
        },
        {
          player1: "ABC",
          player2: "XYZ",
          score: "15-13  14-15  15-7",
          image1:
            "https://img.icons8.com/ios-filled/50/000000/guest-male--v1.png",
          image2:
            "https://img.icons8.com/ios-filled/50/000000/guest-male--v1.png",
          center: "Go to Match Center",
          date: "20th July 2020",
          tournament: {
            name: "ABCXYZ",
            year: "2020",
          },
        },
      ],
    };
  }

  render() {
    let players = [],
      tournaments = [];
    for (let i = 0; i < this.state.data.length; i++) {
      players.push(this.state.data[i].player1);
      players.push(this.state.data[i].player2);
      tournaments.push(this.state.data[i].tournament.name);
    }

    let uniqueplayers = players.filter((x, i, a) => a.indexOf(x) === i);
    let uniquetournament = tournaments.filter((x, i, a) => a.indexOf(x) === i);
    var playerOption = [];
    var tournamentOption = [];
    for (let i = 0; i < uniqueplayers.length; i++)
      playerOption.push(
        <option value={uniqueplayers[i]}>{uniqueplayers[i]}</option>
      );

    for (let i = 0; i < uniquetournament.length; i++)
      tournamentOption.push(
        <option value={uniquetournament[i]}>{uniquetournament[i]}</option>
      );

    var schedule = [];
    for (let i = 0; i < this.state.data.length; i++) {
      schedule.push(
        <div className="schedule-item">
          <div className="schedule-thumbnail">
            <div
              className="schedule-player-image"
              style={{ backgroundImage: `url(${this.state.data[i].image1})` }}
            ></div>
            <div
              className="schedule-player-image"
              style={{ backgroundImage: `url(${this.state.data[i].image2})` }}
            ></div>
          </div>
          <div className="schedule-match schedule-common-style">
            {this.state.data[i].player1} Vs {this.state.data[i].player2}
            <br />
            <small>
              <i>
                {this.state.data[i].tournament.name},{" "}
                {this.state.data[i].tournament.year}
              </i>
            </small>
          </div>
          <a href="/macth1">
            <div className="schedule-common-style">
              {this.state.data[i].center}
            </div>
          </a>
          <div className="schedule-common-style">
            {this.state.data[i].score}
          </div>
          <div className="schedule-common-style">{this.state.data[i].date}</div>
        </div>
      );
    }
    return (
      <div id="schedule-container">
        <div className="schedule-item">
          <div id="schedule-filter">
            <form action="/schedule/filter" method="POST">
              <span>
                <label>Player Name</label>
                <select name="playerName">{playerOption}</select>
              </span>
              <span>
                <label>Tournament</label>
                <select name="tournament">{tournamentOption}</select>
              </span>
              <span>
                <label>Outcome</label>
                <select name="outcome">
                  <option value="win">Win</option>
                  <option value="lose">Loss</option>
                </select>
              </span>
              <button>Filter</button>
            </form>
          </div>
          <div id="schedule-sort">
            <span>Sort By</span>
            <form id="sort-form" action="/schedule/sort" method="POST">
              <select name="sortby">
                <option value="date">Date</option>
                <option value="score">Score</option>
              </select>
              <button>Sort</button>
            </form>
          </div>
        </div>
        <div className="schedule-item">
          <div className="schedule-thumbnail schedule-bg-secondary">
            {" "}
            Player 1 / Player 2{" "}
          </div>
          <div className="schedule-match schedule-common-style schedule-bg-secondary">
            Player 1 Vs Player 2 <br /> Tounament Name, Year
          </div>
          <div className="schedule-common-style schedule-bg-secondary">
            Match Center
          </div>
          <div className="schedule-common-style schedule-bg-secondary">
            Scoreline
          </div>
          <div className="schedule-common-style schedule-bg-secondary">
            Date
          </div>
        </div>
        {schedule}
      </div>
    );
  }
}

export default schedule;

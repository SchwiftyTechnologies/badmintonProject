import React, { Component } from "react";
import "./styles.css";
import NewWindow from "react-new-window";
import { Player } from "video-react";
import ReactPlayer from "react-player";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: "10",
      stop: "20",
      url:
        "https://firebasestorage.googleapis.com/v0/b/badmintonproject-3701e.appspot.com/o/Match16_check.mp4?alt=media&token=39a6ab57-670a-4c9b-8f60-5cbe00c4e9d5",
    };
    this.playerRef = React.createRef();
  }

  // componentDidUpdate() {
  //   console.log("htis", this.props.url);
  //   let time = parseFloat(this.props.url);
  //   // this.seek(Math.floor(time));
  //   this.seek(time);
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.url, this.props.url);
    if (nextProps.url !== this.props.url) {
      console.log("htis", this.props.url);
      let time = parseFloat(this.props.url);
      // this.seek(Math.floor(time));
      this.seek(time);
    }
  }

  seek = (seconds) => {
    this.player.seekTo(seconds, "seconds");
  };

  onSet = () => {
    let time = parseFloat(this.props.url);
    this.seek(time);
  };

  render() {
    return (
      <ReactPlayer
        ref={(player) => {
          this.player = player;
        }}
        className="react-player"
        url={this.state.url}
        width="100%"
        height="80%"
        controls={true}
        playing={true}
        style={this.props.style}
        onStart={this.onSet}
      />
      // <video width="100%" height="75%" controls autoplay="autoplay">
      //   <source src={this.props.url} type="video/mp4" id="video1" />
      // </video>
    );
  }
}

export default VideoPlayer;

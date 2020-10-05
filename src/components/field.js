import React, { Component } from "react";
import "./styles.css";
import { PERC_LOCATION_VAL } from "./constants";
import NewWindow from "react-new-window";
import { Player } from "video-react";
import ReactPlayer from "react-player";
import VideoPlayer from "./videoPlayer";
import { connect } from "react-redux";
import MultiImg from "../assets/multi.png";
import SelectImg from "../assets/select.png";
import CheckedImage from "../assets/checked.png";
import badminton_data from "../Badminton_data_14.json";

import {
  UpdateStretch,
  ResetStretch,
  UpdateDistance,
  ResetDistance,
  UpdateReac,
  AddCount,
  ResetCount,
  UpdateHeight,
  SetSelectedShot,
  setvaluesArray,
} from "../actions/stats.action";

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 810 * 0.36,
      width_factor: 0.36,
      height: 1540 * 0.36,
      height_factor: 0.36,
      current_segment: -1,
      pointSelection: false,
      popUp: false,
      startTime: 0,
      endTime: 0,
      height1_perc: this.props.height1_perc,
      height2_perc: this.props.height2_perc,
      width1_perc: this.props.width1_perc,
      width2_perc: this.props.width2_perc,
      selectedPart: [],
      sidePerc: [],
      valuesArray: [],
    };

    this.canvasRef = React.createRef();
    this.playerRef = React.createRef();
  }

  drawSegments = (player) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (player === "top") {
      ctx.beginPath();
      ctx.strokeStyle = "rgb(173, 173, 10)";
      ctx.setLineDash([4]);
      ctx.lineWidth = 2;

      //horizontal line 1
      ctx.moveTo(
        146 * this.state.width_factor,
        100 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.lineTo(
        660 * this.state.width_factor,
        100 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.stroke();

      //horizontal line 2
      ctx.moveTo(
        146 * this.state.width_factor,
        100 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.lineTo(
        660 * this.state.width_factor,
        100 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.stroke();

      //vertical line 1
      ctx.moveTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width1_perc / 100),
        100 * this.state.height_factor
      );
      ctx.lineTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width1_perc / 100),
        770 * this.state.height_factor
      );
      ctx.stroke();

      //vertical line 2
      ctx.moveTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width2_perc / 100),
        100 * this.state.height_factor
      );
      ctx.lineTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width2_perc / 100),
        770 * this.state.height_factor
      );
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.setLineDash([4]);
      //horizontal line 1
      ctx.moveTo(
        146 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.lineTo(
        660 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.stroke();

      //horizontal line 2
      ctx.moveTo(
        146 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.lineTo(
        660 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.stroke();

      //vertical line 1
      ctx.moveTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width1_perc / 100),
        770 * this.state.height_factor
      );
      ctx.lineTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width1_perc / 100),
        1440 * this.state.height_factor
      );
      ctx.stroke();

      //vertical line 2
      ctx.moveTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width2_perc / 100),
        770 * this.state.height_factor
      );
      ctx.lineTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width2_perc / 100),
        1440 * this.state.height_factor
      );
      ctx.stroke();

      // net line
      ctx.moveTo(0, 770 * this.state.height_factor);
      ctx.lineTo(this.state.width, 770 * this.state.height_factor);
      ctx.stroke();

      // end line
      ctx.moveTo(0, 1440 * this.state.height_factor);
      ctx.lineTo(this.state.width, 1440 * this.state.height_factor);
      ctx.stroke();

      // right end line
      ctx.moveTo(660 * this.state.width_factor, 770 * this.state.height_factor);
      ctx.lineTo(
        660 * this.state.width_factor,
        1440 * this.state.height_factor
      );
      ctx.stroke();

      // left end line
      ctx.moveTo(146 * this.state.width_factor, 770 * this.state.height_factor);
      ctx.lineTo(
        146 * this.state.width_factor,
        1440 * this.state.height_factor
      );
      ctx.stroke();

      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.strokeStyle = "rgb(173, 173, 10)";
      ctx.setLineDash([4]);
      ctx.lineWidth = 2;

      //horizontal line 1
      ctx.moveTo(
        146 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.lineTo(
        660 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.stroke();

      //horizontal line 2
      ctx.moveTo(
        146 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.lineTo(
        660 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.stroke();

      //vertical line 1
      ctx.moveTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width1_perc / 100),
        770 * this.state.height_factor
      );
      ctx.lineTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width1_perc / 100),
        1440 * this.state.height_factor
      );
      ctx.stroke();

      //vertical line 2
      ctx.moveTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width2_perc / 100),
        770 * this.state.height_factor
      );
      ctx.lineTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width2_perc / 100),
        1440 * this.state.height_factor
      );
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.setLineDash([4]);

      //horizontal line 1
      ctx.moveTo(
        146 * this.state.width_factor,
        100 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.lineTo(
        660 * this.state.width_factor,
        100 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.stroke();

      //horizontal line 2
      ctx.moveTo(
        146 * this.state.width_factor,
        100 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.lineTo(
        660 * this.state.width_factor,
        100 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.stroke();

      //vertical line 1
      ctx.moveTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width1_perc / 100),
        100 * this.state.height_factor
      );
      ctx.lineTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width1_perc / 100),
        770 * this.state.height_factor
      );
      ctx.stroke();

      //vertical line 2
      ctx.moveTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width2_perc / 100),
        100 * this.state.height_factor
      );
      ctx.lineTo(
        146 * this.state.width_factor +
          518 * this.state.width_factor * (this.state.width2_perc / 100),
        770 * this.state.height_factor
      );
      ctx.stroke();

      // net line
      ctx.moveTo(0, 770 * this.state.height_factor);
      ctx.lineTo(this.state.width, 770 * this.state.height_factor);
      ctx.stroke();

      // end line
      ctx.moveTo(0, 100 * this.state.height_factor);
      ctx.lineTo(this.state.width, 100 * this.state.height_factor);
      ctx.stroke();

      // right end line
      ctx.moveTo(660 * this.state.width_factor, 100 * this.state.height_factor);
      ctx.lineTo(660 * this.state.width_factor, 770 * this.state.height_factor);
      ctx.stroke();

      // left end line
      ctx.moveTo(146 * this.state.width_factor, 100 * this.state.height_factor);
      ctx.lineTo(146 * this.state.width_factor, 770 * this.state.height_factor);
      ctx.stroke();

      ctx.closePath();
    }
  };

  checkIfLine = (X, Y) => {
    let shot_count = 0;
    let i = 0;
    this.courtDrawerFunction(this.props, shot_count);
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (this.props.isRightSide) {
      for (let item of this.props.rightSideData) {
        let x1 = item.location_contact_shuttle[0] * this.state.width_factor;
        let y1 = item.location_contact_shuttle[1] * this.state.height_factor;
        let x2 = item.location_end_shuttle[0] * this.state.width_factor;
        let y2 = item.location_end_shuttle[1] * this.state.height_factor;

        ctx.beginPath();
        ctx.moveTo(x1, y1); // start of line
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "red";
        if (ctx.isPointInStroke(X, Y)) {
          this.props._SetSelectedShot([i]);
          console.log("Selected shot", item);
          ctx.stroke();
          ctx.closePath();
          this.canvas_arrow(x1, y1, x2, y2);
          let startTime = item.contact_timestamp_shuttle.toString();

          let url =
            "https://firebasestorage.googleapis.com/v0/b/badmintonproject-3701e.appspot.com/o/Match16_check.mp4?alt=media&token=39a6ab57-670a-4c9b-8f60-5cbe00c4e9d5#t=";
          let reqUrl = url + startTime;
          this.props.setVideoSettings(startTime);
          break;
        }
        i += 1;
      }
    } else {
      let ret_val = false;
      let rally_index = 0;
      if (this.props.patter_length === 1) {
        for (let rally of this.props.pattern_array) {
          if (rally.length > 0) {
            let ralCount = 0;
            for (let item of rally) {
              if (
                shot_count >= this.props.fromShot &&
                shot_count <= this.props.toShot
              ) {
                let int_item = parseInt(item);

                if (this.props.shots[rally_index].length > int_item + 1) {
                  if (this.props.firstshot) {
                    ret_val = this.leftShotChecker(
                      this.props.shots[rally_index][int_item],
                      this.props.shots[rally_index][int_item + 1],
                      "rgb(173, 173, 10)",
                      X,
                      Y
                    );
                    if (ret_val) {
                      this.props._SetSelectedShot([
                        rally_index,
                        ralCount,
                        0,
                        shot_count,
                      ]);
                      break;
                    }
                  }
                }
              }
              shot_count += 1;
              ralCount += 1;
            }
          }
          rally_index += 1;
        }
      } else if (this.props.patter_length === 2) {
        for (let rally of this.props.pattern_array) {
          if (rally.length > 0) {
            let ralCount = 0;
            for (let item of rally) {
              if (
                shot_count >= this.props.fromShot &&
                shot_count <= this.props.toShot
              ) {
                let int_item = parseInt(item);

                if (this.props.shots[rally_index].length > int_item + 1) {
                  if (this.props.firstshot) {
                    ret_val = this.leftShotChecker(
                      this.props.shots[rally_index][int_item],
                      this.props.shots[rally_index][int_item + 1],
                      "rgb(173, 173, 10)",
                      X,
                      Y
                    );
                    if (ret_val) {
                      this.props._SetSelectedShot([
                        rally_index,
                        ralCount,
                        0,
                        shot_count,
                      ]);
                      break;
                    }
                  }
                }
                if (this.props.shots[rally_index].length > int_item + 2) {
                  if (this.props.secondshot) {
                    ret_val = this.leftShotChecker(
                      this.props.shots[rally_index][int_item + 1],
                      this.props.shots[rally_index][int_item + 2],
                      "green",
                      X,
                      Y
                    );
                    if (ret_val) {
                      this.props._SetSelectedShot([
                        rally_index,
                        ralCount,
                        1,
                        shot_count,
                      ]);
                      break;
                    }
                  }
                }
              }
              shot_count += 1;
              ralCount += 1;
            }
          }
          rally_index += 1;
        }
      } else if (this.props.patter_length === 3) {
        for (let rally of this.props.pattern_array) {
          if (rally.length > 0) {
            let ralCount = 0;
            for (let item of rally) {
              if (
                shot_count >= this.props.fromShot &&
                shot_count <= this.props.toShot
              ) {
                let int_item = parseInt(item);

                if (this.props.shots[rally_index].length > int_item + 1) {
                  if (this.props.firstshot) {
                    ret_val = this.leftShotChecker(
                      this.props.shots[rally_index][int_item],
                      this.props.shots[rally_index][int_item + 1],
                      "rgb(173, 173, 10)",
                      X,
                      Y
                    );
                    if (ret_val) {
                      this.props._SetSelectedShot([
                        rally_index,
                        ralCount,
                        0,
                        shot_count,
                      ]);
                      break;
                    }
                  }
                }
                if (this.props.shots[rally_index].length > int_item + 2) {
                  if (this.props.secondshot) {
                    ret_val = this.leftShotChecker(
                      this.props.shots[rally_index][int_item + 1],
                      this.props.shots[rally_index][int_item + 2],
                      "green",
                      X,
                      Y
                    );
                    if (ret_val) {
                      this.props._SetSelectedShot([
                        rally_index,
                        ralCount,
                        1,
                        shot_count,
                      ]);
                      break;
                    }
                  }
                }
                if (this.props.shots[rally_index].length > int_item + 3) {
                  if (this.props.thirdshot) {
                    ret_val = this.leftShotChecker(
                      this.props.shots[rally_index][int_item + 2],
                      this.props.shots[rally_index][int_item + 3],
                      "violet",
                      X,
                      Y
                    );
                    if (ret_val) {
                      this.props._SetSelectedShot([
                        rally_index,
                        ralCount,
                        2,
                        shot_count,
                      ]);
                      break;
                    }
                  }
                }
              }
              shot_count += 1;
              ralCount += 1;
            }
          }
          rally_index += 1;
        }
      }
    }
  };

  leftShotChecker(shot, nextShot, color_val, X, Y) {
    if (shot.player_played === "top") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");

      //intial postion of shuttle
      let top_x = (shot.position_top[0][0] + shot.position_top[1][0]) / 2;
      let top_y = (shot.position_top[0][1] + shot.position_top[1][1]) / 2;

      //final position of shuttle
      let bot_x =
        (nextShot.position_bottom[0][0] + nextShot.position_bottom[1][0]) / 2;
      let bot_y =
        (nextShot.position_bottom[0][1] + nextShot.position_bottom[1][1]) / 2;

      ctx.beginPath();
      ctx.setLineDash([0]);
      ctx.moveTo(
        top_x * this.state.width_factor,
        top_y * this.state.height_factor
      );
      ctx.lineTo(
        bot_x * this.state.width_factor,
        bot_y * this.state.height_factor
      );
      // ctx.strokeStyle = "rgb(173, 173, 10)";

      ctx.lineWidth = 5;
      if (ctx.isPointInStroke(X, Y)) {
        console.log("shuttle contact", shot);
        console.log("shuttle end", nextShot);
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
        let startTime = shot.start_frame_shot.toString();
        let endTime = nextShot.end_frame_shot;
        // this.setState({ popUp: true, startTime, endTime });
        let url =
          "https://firebasestorage.googleapis.com/v0/b/badmintonproject-3701e.appspot.com/o/Match16_check.mp4?alt=media&token=39a6ab57-670a-4c9b-8f60-5cbe00c4e9d5#t=";
        let reqUrl = url + startTime;
        this.props.setVideoSettings(startTime);
        return true;
      } else return false;
    } else if (shot.player_played === "bottom") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");

      //intial postion of shuttle
      let bot_x = (shot.position_bottom[0][0] + shot.position_bottom[1][0]) / 2;
      let bot_y = (shot.position_bottom[0][1] + shot.position_bottom[1][1]) / 2;

      //final position of shuttle
      let top_x =
        (nextShot.position_top[0][0] + nextShot.position_top[1][0]) / 2;
      let top_y =
        (nextShot.position_top[0][1] + nextShot.position_top[1][1]) / 2;

      ctx.beginPath();
      ctx.setLineDash([0]);
      ctx.moveTo(
        top_x * this.state.width_factor,
        top_y * this.state.height_factor
      );
      ctx.lineTo(
        bot_x * this.state.width_factor,
        bot_y * this.state.height_factor
      );

      ctx.lineWidth = 5;
      if (ctx.isPointInStroke(X, Y)) {
        console.log("shuttle contact", shot);
        console.log("shuttle end", nextShot);
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
        let startTime = shot.start_frame_shot.toString();
        let endTime = nextShot.end_frame_shot;
        // this.setState({ popUp: true, startTime, endTime });
        let url =
          "https://firebasestorage.googleapis.com/v0/b/badmintonproject-3701e.appspot.com/o/Match16_check.mp4?alt=media&token=39a6ab57-670a-4c9b-8f60-5cbe00c4e9d5#t=";
        let reqUrl = url + startTime;
        this.props.setVideoSettings(startTime);
        return true;
      } else return false;
    }
  }

  drawCourt = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "rgb(214, 214, 214)";
    ctx.setLineDash([0]);
    ctx.lineWidth = 1;

    //draw long top line for doubles
    ctx.moveTo(100 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(710 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.stroke();

    //draw long service line for doubles
    ctx.moveTo(100 * this.state.width_factor, 176 * this.state.height_factor);
    ctx.lineTo(710 * this.state.width_factor, 176 * this.state.height_factor);
    ctx.stroke();

    //draw short service line
    ctx.moveTo(100 * this.state.width_factor, 568 * this.state.height_factor);
    ctx.lineTo(710 * this.state.width_factor, 568 * this.state.height_factor);
    ctx.stroke();

    //draw net line
    ctx.moveTo(100 * this.state.width_factor, 770 * this.state.height_factor);
    ctx.lineTo(710 * this.state.width_factor, 770 * this.state.height_factor);
    ctx.stroke();

    //draw short service line for bottom half
    ctx.moveTo(100 * this.state.width_factor, 968 * this.state.height_factor);
    ctx.lineTo(710 * this.state.width_factor, 968 * this.state.height_factor);
    ctx.stroke();

    //draw long service line for doubles for bottom half
    ctx.moveTo(100 * this.state.width_factor, 1360 * this.state.height_factor);
    ctx.lineTo(710 * this.state.width_factor, 1360 * this.state.height_factor);
    ctx.stroke();

    //draw long bootom line for doubles for bottom half
    ctx.moveTo(100 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.lineTo(710 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.stroke();

    //draw side line for doubles on left side
    ctx.moveTo(100 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(100 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.stroke();

    //draw side line for singles on left side
    ctx.moveTo(146 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(146 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.stroke();

    //draw side line for doubles on right side
    ctx.moveTo(710 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(710 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.stroke();

    //draw side line for singles on right side
    ctx.moveTo(660 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(660 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();

    //draw center line
    ctx.moveTo(405 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(405 * this.state.width_factor, 568 * this.state.height_factor);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();

    //draw center line
    ctx.moveTo(405 * this.state.width_factor, 968 * this.state.height_factor);
    ctx.lineTo(405 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();

    ctx.closePath();
  };

  drawShotInd(shot, nextShot, color_val) {
    if (shot.player_played === "top") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");

      //intial postion of shuttle
      let top_x = (shot.position_top[0][0] + shot.position_top[1][0]) / 2;
      let top_y = (shot.position_top[0][1] + shot.position_top[1][1]) / 2;

      //final position of shuttle
      let bot_x =
        (nextShot.position_bottom[0][0] + nextShot.position_bottom[1][0]) / 2;
      let bot_y =
        (nextShot.position_bottom[0][1] + nextShot.position_bottom[1][1]) / 2;

      ctx.beginPath();
      ctx.setLineDash([0]);
      ctx.moveTo(
        top_x * this.state.width_factor,
        top_y * this.state.height_factor
      );
      ctx.lineTo(
        bot_x * this.state.width_factor,
        bot_y * this.state.height_factor
      );
      // ctx.strokeStyle = "rgb(173, 173, 10)";
      ctx.strokeStyle = color_val;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
    } else if (shot.player_played === "bottom") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");

      //intial postion of shuttle
      let bot_x = (shot.position_bottom[0][0] + shot.position_bottom[1][0]) / 2;
      let bot_y = (shot.position_bottom[0][1] + shot.position_bottom[1][1]) / 2;

      //final position of shuttle
      let top_x =
        (nextShot.position_top[0][0] + nextShot.position_top[1][0]) / 2;
      let top_y =
        (nextShot.position_top[0][1] + nextShot.position_top[1][1]) / 2;

      ctx.beginPath();
      ctx.setLineDash([0]);
      ctx.moveTo(
        top_x * this.state.width_factor,
        top_y * this.state.height_factor
      );
      ctx.lineTo(
        bot_x * this.state.width_factor,
        bot_y * this.state.height_factor
      );
      ctx.strokeStyle = color_val;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawShotIndRightSide = (shot, nextProps) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (shot.Action_FB_init_top) {
      //intial postion of shuttle
      let top_x = shot.location_contact_shuttle[0];
      let top_y = shot.location_contact_shuttle[1];

      //final position of shuttle
      let bot_x = shot.location_end_shuttle[0];
      let bot_y = shot.location_end_shuttle[1];

      if (shot.Action_wl_init_top === "Winner") {
        ctx.beginPath();
        ctx.rect(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          7,
          7
        );
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 1;
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();

        this.drawStar(bot_x, bot_y, "#00FF00");
      } else {
        ctx.beginPath();
        ctx.moveTo(
          top_x * this.state.width_factor - 7,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor - 7
        );
        ctx.lineTo(
          top_x * this.state.width_factor + 7,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          top_x * this.state.width_factor - 7,
          top_y * this.state.height_factor
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();

        this.drawcross(bot_x, bot_y, "red");
      }
      if (nextProps.placrecTop) {
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.moveTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor
        );
        ctx.strokeStyle = "rgb(173, 173, 10)";
        // ctx.strokeStyle = color_val;
        ctx.lineWidth = 3;

        ctx.stroke();
        ctx.closePath();
        this.props._UpdateReac(
          shot.contact_timestamp_shuttle,
          shot.end_timestamp_shuttle,
          1,
          "bottom"
        );
        this.props._updateHeight(
          shot.location_contact_shuttle[2],
          shot.location_end_shuttle[2],
          "top"
        );
        this.canvas_arrow(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor
        );
      }
    } else {
      //intial postion of shuttle
      let top_x = shot.location_contact_shuttle[0];
      let top_y = shot.location_contact_shuttle[1];

      //final position of shuttle
      let bot_x = shot.location_end_shuttle[0];
      let bot_y = shot.location_end_shuttle[1];

      if (shot.Action_wl_init_bottom === "Winner") {
        ctx.beginPath();
        ctx.rect(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          7,
          7
        );
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 1;
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();

        this.drawStar(bot_x, bot_y, "#00FF00");
      } else {
        ctx.beginPath();
        ctx.moveTo(
          top_x * this.state.width_factor - 7,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor - 7
        );
        ctx.lineTo(
          top_x * this.state.width_factor + 7,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          top_x * this.state.width_factor - 7,
          top_y * this.state.height_factor
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();

        this.drawcross(bot_x, bot_y, "red");
      }

      if (nextProps.placrecBot) {
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.moveTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor
        );
        ctx.strokeStyle = "rgb(173, 173, 10)";
        // ctx.strokeStyle = color_val;
        ctx.lineWidth = 3;

        ctx.stroke();
        ctx.closePath();
        this.props._UpdateReac(
          shot.contact_timestamp_shuttle,
          shot.end_timestamp_shuttle,
          1,
          "top"
        );
        this.props._updateHeight(
          shot.location_contact_shuttle[2],
          shot.location_end_shuttle[2],
          "bottom"
        );
        this.canvas_arrow(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor
        );
      }
    }
  };

  clickCheckerFunction = (loc, ind, init_player) => {
    let x1 =
      146 * this.state.width_factor +
      518 * this.state.width_factor * (this.state.width1_perc / 100);

    let x2 =
      146 * this.state.width_factor +
      518 * this.state.width_factor * (this.state.width2_perc / 100);

    let y1 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (this.state.height1_perc / 100);

    let y2 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (this.state.height2_perc / 100);
    let loc_array = [
      [146 * this.state.width_factor, x1, 100 * this.state.height_factor, y1],
      [x1, x2, 100 * this.state.height_factor, y1],
      [x2, 660 * this.state.width_factor, 100 * this.state.height_factor, y1],
      [146 * this.state.width_factor, x1, y1, y2],
      [x1, x2, y1, y2],
      [x2, 660 * this.state.width_factor, y1, y2],
      [146 * this.state.width_factor, x1, y2, 770 * this.state.height_factor],
      [x1, x2, y2, 770 * this.state.height_factor],
      [x2, 660 * this.state.width_factor, y2, 770 * this.state.height_factor],
      [
        146 * this.state.width_factor,
        x1,
        770 * this.state.height_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
      ],
      [
        x1,
        x2,
        770 * this.state.height_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
      ],
      [
        x2,
        660 * this.state.width_factor,
        770 * this.state.height_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
      ],
      [
        146 * this.state.width_factor,
        x1,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
      ],
      [
        x1,
        x2,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
      ],
      [
        x2,
        660 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
      ],
      [
        146 * this.state.width_factor,
        x1,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
        1440 * this.state.height_factor,
      ],
      [
        x1,
        x2,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
        1440 * this.state.height_factor,
      ],
      [
        x2,
        660 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
        1440 * this.state.height_factor,
      ],
    ];
    let shot_count = 0;
    if (this.props.perc) {
      let data_array = Array(25).fill(0);
      let locArray = Array(2).fill(0);
      let total_length = 0;
      let num_shots_in_segment = 0;
      let player_played_val = "";
      let selected = this.state.selectedPart;

      if (this.props.selectAll) {
        selected = [];
        if (init_player === "top") {
          for (let i = 0; i < 9; i++) {
            selected.push(loc_array[i]);
          }
        } else {
          for (let i = 9; i < 18; i++) {
            selected.push(loc_array[i]);
          }
        }
      } else {
        let val = true;
        let index = -1;
        if (selected.length > 0) {
          for (let j = 0; j < selected.length; j++) {
            if (
              selected[j][0] === loc[0] &&
              selected[j][1] === loc[1] &&
              selected[j][2] === loc[2] &&
              selected[j][3] === loc[3]
            ) {
              val = false;
              index = j;
              break;
            }
          }
          if (val) {
            selected.push(loc);
          } else {
            if (index > -1) {
              selected.splice(index, 1);
            }
          }
        } else {
          selected.push(loc);
        }
      }
      if (this.props.isRightSide) {
        selected.map((location, locIndex) => {
          this.highlightSegment([
            location[0],
            location[1] - location[0],
            location[2],
            location[3] - location[2],
          ]);
          total_length = 0;
          this.props.rightSideData.map((item, index) => {
            total_length = 1 + total_length;
            if (item.Action_FB_init_bottom) {
              player_played_val = "bottom";
            } else {
              player_played_val = "top";
            }
            let n = this.shotSegmentCheckRight(item, location);
            if (n === 1) {
              data_array = this.segementChecker(item, data_array);
            }
            num_shots_in_segment = num_shots_in_segment + n;
          });
          if (player_played_val === init_player) {
            let x = (location[0] + location[1]) / 2;
            let y = (location[2] + location[3]) / 2;
            if (selected.length === 1) {
              locArray[0] = (locArray[0] + x) / selected.length;
              locArray[1] = (locArray[1] + y) / selected.length;
            } else {
              locArray[0] = (locArray[0] + x) / 2;
              locArray[1] = (locArray[1] + y) / 2;
            }
          }
        });

        if (player_played_val === init_player) {
          this.drawPercentage(
            total_length,
            num_shots_in_segment,
            init_player,
            locArray
          );
          if (num_shots_in_segment > 0) {
            this.drawPercentagePrecentageOpposite(
              num_shots_in_segment,
              data_array,
              init_player
            );
          }
        }
      } else {
        if (this.props.percFirstShot) {
          selected.map((location, locIndex) => {
            this.highlightSegment([
              location[0],
              location[1] - location[0],
              location[2],
              location[3] - location[2],
            ]);
            total_length = 0;
            this.props.pattern_array.map((rally, rally_index) => {
              total_length = rally.length + total_length;
              if (rally.length > 0) {
                rally.map((item, index) => {
                  let int_item = parseInt(item);
                  if (this.props.shots[rally_index].length > int_item + 1) {
                    player_played_val = this.props.shots[rally_index][int_item]
                      .player_played;
                    let n = this.shotSegmentCheck(
                      this.props.shots[rally_index][int_item],
                      this.props.shots[rally_index][int_item + 1],
                      location
                    );
                    if (n === 1) {
                      data_array = this.segementChecker(
                        this.props.shots[rally_index][int_item + 1],
                        data_array
                      );
                    }
                    num_shots_in_segment = num_shots_in_segment + n;
                  }
                });
              }
            });
            if (player_played_val === init_player) {
              let x = (location[0] + location[1]) / 2;
              let y = (location[2] + location[3]) / 2;
              if (selected.length === 1) {
                locArray[0] = (locArray[0] + x) / selected.length;
                locArray[1] = (locArray[1] + y) / selected.length;
              } else {
                locArray[0] = (locArray[0] + x) / 2;
                locArray[1] = (locArray[1] + y) / 2;
              }
            }
          });

          if (player_played_val === init_player) {
            this.drawPercentage(
              total_length,
              num_shots_in_segment,
              init_player,
              locArray
            );
            if (num_shots_in_segment > 0) {
              this.drawPercentagePrecentageOpposite(
                num_shots_in_segment,
                data_array,
                init_player
              );
            }
          }
        } else if (
          this.props.percSecondShot &&
          this.props.patter_length !== 1
        ) {
          selected.map((location, locIndex) => {
            this.highlightSegment([
              location[0],
              location[1] - location[0],
              location[2],
              location[3] - location[2],
            ]);
            total_length = 0;
            this.props.pattern_array.map((rally, rally_index) => {
              total_length = rally.length + total_length;
              if (rally.length > 0) {
                rally.map((item, index) => {
                  let int_item = parseInt(item);
                  if (this.props.shots[rally_index].length > int_item + 2) {
                    player_played_val = this.props.shots[rally_index][
                      int_item + 1
                    ].player_played;
                    let n = this.shotSegmentCheck(
                      this.props.shots[rally_index][int_item + 1],
                      this.props.shots[rally_index][int_item + 2],
                      location
                    );
                    if (n === 1) {
                      data_array = this.segementChecker(
                        this.props.shots[rally_index][int_item + 2],
                        data_array
                      );
                    }
                    num_shots_in_segment = num_shots_in_segment + n;
                  }
                });
              }
            });
            if (player_played_val === init_player) {
              let x = (location[0] + location[1]) / 2;
              let y = (location[2] + location[3]) / 2;
              if (selected.length === 1) {
                locArray[0] = (locArray[0] + x) / selected.length;
                locArray[1] = (locArray[1] + y) / selected.length;
              } else {
                locArray[0] = (locArray[0] + x) / 2;
                locArray[1] = (locArray[1] + y) / 2;
              }
            }
          });

          if (player_played_val === init_player) {
            this.drawPercentage(
              total_length,
              num_shots_in_segment,
              player_played_val,
              locArray
            );
            if (num_shots_in_segment > 0) {
              this.drawPercentagePrecentageOpposite(
                num_shots_in_segment,
                data_array,
                player_played_val
              );
            }
          }
        } else if (this.props.percThirdShot && this.props.patter_length === 3) {
          selected.map((location, locIndex) => {
            this.highlightSegment([
              location[0],
              location[1] - location[0],
              location[2],
              location[3] - location[2],
            ]);
            total_length = 0;
            this.props.pattern_array.map((rally, rally_index) => {
              total_length = rally.length + total_length;
              if (rally.length > 0) {
                rally.map((item, index) => {
                  let int_item = parseInt(item);
                  if (this.props.shots[rally_index].length > int_item + 3) {
                    player_played_val = this.props.shots[rally_index][
                      int_item + 2
                    ].player_played;
                    let n = this.shotSegmentCheck(
                      this.props.shots[rally_index][int_item + 2],
                      this.props.shots[rally_index][int_item + 3],
                      location
                    );
                    if (n === 1) {
                      data_array = this.segementChecker(
                        this.props.shots[rally_index][int_item + 3],
                        data_array
                      );
                    }
                    num_shots_in_segment = num_shots_in_segment + n;
                  }
                });
              }
            });
            if (player_played_val === init_player) {
              let x = (location[0] + location[1]) / 2;
              let y = (location[2] + location[3]) / 2;
              if (selected.length === 1) {
                locArray[0] = (locArray[0] + x) / selected.length;
                locArray[1] = (locArray[1] + y) / selected.length;
              } else {
                locArray[0] = (locArray[0] + x) / 2;
                locArray[1] = (locArray[1] + y) / 2;
              }
            }
          });

          if (player_played_val === init_player) {
            this.drawPercentage(
              total_length,
              num_shots_in_segment,
              player_played_val,
              locArray
            );
            if (num_shots_in_segment > 0) {
              this.drawPercentagePrecentageOpposite(
                num_shots_in_segment,
                data_array,
                player_played_val
              );
            }
          }
        }
      }
    } else if (this.props.arrows) {
      let total_length = 0;
      let player_played_val = "";
      if (this.props.percFirstShot) {
        this.props.pattern_array.map((rally, rally_index) => {
          total_length = rally.length + total_length;
          if (rally.length > 0) {
            rally.map((item, index) => {
              let int_item = parseInt(item);
              if (this.props.shots[rally_index].length > int_item + 1) {
                player_played_val = this.props.shots[rally_index][int_item]
                  .player_played;
                let n = this.shotSegmentCheck(
                  this.props.shots[rally_index][int_item],
                  this.props.shots[rally_index][int_item + 1],
                  loc
                );

                if (n === 1) {
                  this.drawShotInd(
                    this.props.shots[rally_index][int_item],
                    this.props.shots[rally_index][int_item + 1],
                    "rgb(173, 173, 10)"
                  );
                }
              }
            });
          }
        });
      } else if (this.props.percSecondShot && this.props.patter_length !== 1) {
        this.props.pattern_array.map((rally, rally_index) => {
          total_length = rally.length + total_length;
          if (rally.length > 0) {
            rally.map((item, index) => {
              let int_item = parseInt(item);
              if (this.props.shots[rally_index].length > int_item + 2) {
                player_played_val = this.props.shots[rally_index][int_item + 1]
                  .player_played;
                let n = this.shotSegmentCheck(
                  this.props.shots[rally_index][int_item + 1],
                  this.props.shots[rally_index][int_item + 2],
                  loc
                );

                if (n === 1) {
                  this.drawShotInd(
                    this.props.shots[rally_index][int_item + 1],
                    this.props.shots[rally_index][int_item + 2],
                    "green"
                  );
                }
              }
            });
          }
        });
      } else if (this.props.percThirdShot && this.props.patter_length === 3) {
        this.props.pattern_array.map((rally, rally_index) => {
          total_length = rally.length + total_length;
          if (rally.length > 0) {
            rally.map((item, index) => {
              let int_item = parseInt(item);
              if (this.props.shots[rally_index].length > int_item + 3) {
                player_played_val = this.props.shots[rally_index][int_item + 2]
                  .player_played;
                let n = this.shotSegmentCheck(
                  this.props.shots[rally_index][int_item + 2],
                  this.props.shots[rally_index][int_item + 3],
                  loc
                );

                if (n === 1) {
                  this.drawShotInd(
                    this.props.shots[rally_index][int_item + 2],
                    this.props.shots[rally_index][int_item + 3],
                    "violet"
                  );
                }
              }
            });
          }
        });
      }
    }
  };

  highlightSegment = (location) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#888888";
    ctx.fillRect(location[0], location[2], location[1], location[3]);
    ctx.closePath();
  };

  onClickCourt = (e) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!this.props.indShot) {
      ctx.clearRect(0, 0, this.state.width, this.state.height);
      this.drawCourt();
    }

    if (!this.props.multiSelect) {
      this.setState({ selectedPart: [] });
    }

    if (this.props.perc || this.props.arrows) {
      if (this.props.isBottom) {
        if (this.props.percFirstShot || this.props.percThirdShot) {
          this.drawSegments("bottom");
        } else {
          this.drawSegments("top");
        }
      } else {
        if (this.props.percFirstShot || this.props.percThirdShot) {
          this.drawSegments("top");
        } else {
          this.drawSegments("bottom");
        }
      }
    }
    let e_doc = document.getElementById("canvas");
    let elemLeft = e_doc.offsetLeft;
    let elemTop = e_doc.offsetTop;
    let x = e.pageX - elemLeft;
    let y = e.pageY - elemTop;
    this.setState({ pointSelection: true });

    let x1 =
      146 * this.state.width_factor +
      518 * this.state.width_factor * (this.state.width1_perc / 100);

    let x2 =
      146 * this.state.width_factor +
      518 * this.state.width_factor * (this.state.width2_perc / 100);

    let y1 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (this.state.height1_perc / 100);

    let y2 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (this.state.height2_perc / 100);

    if (this.props.indShot) {
      this.checkIfLine(x, y);
    } else {
      if (
        x >= 146 * this.state.width_factor &&
        x <= x1 &&
        y >= 100 * this.state.height_factor &&
        y <= y1
      ) {
        this.clickCheckerFunction(
          [
            146 * this.state.width_factor,
            x1,
            100 * this.state.height_factor,
            y1,
          ],
          0,
          "top"
        );
      } else if (
        x <= x2 &&
        x >= x1 &&
        y >= 100 * this.state.height_factor &&
        y <= y1
      ) {
        this.clickCheckerFunction(
          [x1, x2, 100 * this.state.height_factor, y1],
          1,
          "top"
        );
      } else if (
        x >= x2 &&
        x <= 660 * this.state.width_factor &&
        y >= 100 * this.state.height_factor &&
        y <= y1
      ) {
        this.clickCheckerFunction(
          [
            x2,
            660 * this.state.width_factor,
            100 * this.state.height_factor,
            y1,
          ],
          2,
          "top"
        );
      } else if (
        x >= 146 * this.state.width_factor &&
        x <= x1 &&
        y <= y2 &&
        y >= y1
      ) {
        this.clickCheckerFunction(
          [146 * this.state.width_factor, x1, y1, y2],
          3,
          "top"
        );
      } else if (x <= x2 && x >= x1 && y <= y2 && y >= y1) {
        this.clickCheckerFunction([x1, x2, y1, y2], 4, "top");
      } else if (
        x >= x2 &&
        x <= 660 * this.state.width_factor &&
        y <= y2 &&
        y >= y1
      ) {
        this.clickCheckerFunction(
          [x2, 660 * this.state.width_factor, y1, y2],
          5,
          "top"
        );
      } else if (
        x >= 146 * this.state.width_factor &&
        x <= x1 &&
        y >= y2 &&
        y <= 770 * this.state.height_factor
      ) {
        this.clickCheckerFunction(
          [
            146 * this.state.width_factor,
            x1,
            y2,
            770 * this.state.height_factor,
          ],
          6,
          "top"
        );
      } else if (
        x <= x2 &&
        x >= x1 &&
        y >= y2 &&
        y <= 770 * this.state.height_factor
      ) {
        this.clickCheckerFunction(
          [x1, x2, y2, 770 * this.state.height_factor],
          7,
          "top"
        );
      } else if (
        x >= x2 &&
        x <= 660 * this.state.width_factor &&
        y >= y2 &&
        y <= 770 * this.state.height_factor
      ) {
        this.clickCheckerFunction(
          [
            x2,
            660 * this.state.width_factor,
            y2,
            770 * this.state.height_factor,
          ],
          8,
          "top"
        );
      } else if (
        x >= 146 * this.state.width_factor &&
        x <= x1 &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y >= 770 * this.state.height_factor
      ) {
        this.clickCheckerFunction(
          [
            146 * this.state.width_factor,
            x1,
            770 * this.state.height_factor,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
          ],
          9,
          "bottom"
        );
      } else if (
        x <= x2 &&
        x >= x1 &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y >= 770 * this.state.height_factor
      ) {
        this.clickCheckerFunction(
          [
            x1,
            x2,
            770 * this.state.height_factor,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
          ],
          10,
          "bottom"
        );
      } else if (
        x >= x2 &&
        x <= 660 * this.state.width_factor &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y >= 770 * this.state.height_factor
      ) {
        this.clickCheckerFunction(
          [
            x2,
            660 * this.state.width_factor,
            770 * this.state.height_factor,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
          ],
          11,
          "bottom"
        );
      } else if (
        x >= 146 * this.state.width_factor &&
        x <= x1 &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.clickCheckerFunction(
          [
            146 * this.state.width_factor,
            x1,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
          ],
          12,
          "bottom"
        );
      } else if (
        x <= x2 &&
        x >= x1 &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.clickCheckerFunction(
          [
            x1,
            x2,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
          ],
          13,
          "bottom"
        );
      } else if (
        x >= x2 &&
        x <= 660 * this.state.width_factor &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.clickCheckerFunction(
          [
            x2,
            660 * this.state.width_factor,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
          ],
          14,
          "bottom"
        );
      } else if (
        x >= 146 * this.state.width_factor &&
        x <= x1 &&
        y <= 1440 * this.state.height_factor &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.clickCheckerFunction(
          [
            146 * this.state.width_factor,
            x1,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
            1440 * this.state.height_factor,
          ],
          15,
          "bottom"
        );
      } else if (
        x <= x2 &&
        x >= x1 &&
        y <= 1440 * this.state.height_factor &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.clickCheckerFunction(
          [
            x1,
            x2,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
            1440 * this.state.height_factor,
          ],
          16,
          "bottom"
        );
      } else if (
        x >= x2 &&
        x <= 660 * this.state.width_factor &&
        y <= 1440 * this.state.height_factor &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.clickCheckerFunction(
          [
            x2,
            660 * this.state.width_factor,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
            1440 * this.state.height_factor,
          ],
          17,
          "bottom"
        );
      }
    }
  };

  segementChecker = (nextShot, data_array) => {
    let x = 0;
    let y = 0;
    if (this.props.isRightSide) {
      x = nextShot.location_end_shuttle[0] * this.state.width_factor;
      y = nextShot.location_end_shuttle[1] * this.state.height_factor;
    } else {
      if (nextShot.player_played === "bottom") {
        x =
          ((nextShot.position_bottom[0][0] + nextShot.position_bottom[1][0]) /
            2) *
          this.state.width_factor;
        y =
          ((nextShot.position_bottom[0][1] + nextShot.position_bottom[1][1]) /
            2) *
          this.state.height_factor;
      }

      if (nextShot.player_played === "top") {
        x =
          ((nextShot.position_top[0][0] + nextShot.position_top[1][0]) / 2) *
          this.state.width_factor;
        y =
          ((nextShot.position_top[0][1] + nextShot.position_top[1][1]) / 2) *
          this.state.height_factor;
      }
    }
    let x1 =
      146 * this.state.width_factor +
      518 * this.state.width_factor * (this.state.width1_perc / 100);

    let x2 =
      146 * this.state.width_factor +
      518 * this.state.width_factor * (this.state.width2_perc / 100);

    let y1 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (this.state.height1_perc / 100);

    let y2 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (this.state.height2_perc / 100);

    if (
      x >= 146 * this.state.width_factor &&
      x <= x1 &&
      y >= 100 * this.state.height_factor &&
      y <= y1
    ) {
      data_array[0] = data_array[0] + 1;
      return data_array;
    } else if (
      x <= x2 &&
      x >= x1 &&
      y >= 100 * this.state.height_factor &&
      y <= y1
    ) {
      data_array[1] = data_array[1] + 1;
      return data_array;
    } else if (
      x >= x2 &&
      x <= 660 * this.state.width_factor &&
      y >= 100 * this.state.height_factor &&
      y <= y1
    ) {
      data_array[2] = data_array[2] + 1;
      return data_array;
    } else if (
      x >= 146 * this.state.width_factor &&
      x <= x1 &&
      y <= y2 &&
      y >= y1
    ) {
      data_array[3] = data_array[3] + 1;
      return data_array;
    } else if (x <= x2 && x >= x1 && y <= y2 && y >= y1) {
      data_array[4] = data_array[4] + 1;
      return data_array;
    } else if (
      x >= x2 &&
      x <= 660 * this.state.width_factor &&
      y <= y2 &&
      y >= y1
    ) {
      data_array[5] = data_array[5] + 1;
      return data_array;
    } else if (
      x >= 146 * this.state.width_factor &&
      x <= x1 &&
      y >= y2 &&
      y <= 770 * this.state.height_factor
    ) {
      data_array[6] = data_array[6] + 1;
      return data_array;
    } else if (
      x <= x2 &&
      x >= x1 &&
      y >= y2 &&
      y <= 770 * this.state.height_factor
    ) {
      data_array[7] = data_array[7] + 1;
      return data_array;
    } else if (
      x >= x2 &&
      x <= 660 * this.state.width_factor &&
      y >= y2 &&
      y <= 770 * this.state.height_factor
    ) {
      data_array[8] = data_array[8] + 1;
      return data_array;
    } else if (
      x >= 146 * this.state.width_factor &&
      x <= 660 * this.state.width_factor &&
      y >= 755 * this.state.height_factor &&
      y <= 785 * this.state.height_factor
    ) {
      data_array[24] = data_array[24] + 1;
      return data_array;
    } else if (
      x >= 146 * this.state.width_factor &&
      x <= x1 &&
      y <=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100) &&
      y >= 770 * this.state.height_factor
    ) {
      data_array[9] = data_array[9] + 1;
      return data_array;
    } else if (
      x <= x2 &&
      x >= x1 &&
      y <=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100) &&
      y >= 770 * this.state.height_factor
    ) {
      data_array[10] = data_array[10] + 1;
      return data_array;
    } else if (
      x >= x2 &&
      x <= 660 * this.state.width_factor &&
      y <=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100) &&
      y >= 770 * this.state.height_factor
    ) {
      data_array[11] = data_array[11] + 1;
      return data_array;
    } else if (
      x >= 146 * this.state.width_factor &&
      x <= x1 &&
      y >=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100) &&
      y <=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
    ) {
      data_array[12] = data_array[12] + 1;
      return data_array;
    } else if (
      x <= x2 &&
      x >= x1 &&
      y >=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100) &&
      y <=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
    ) {
      data_array[13] = data_array[13] + 1;
      return data_array;
    } else if (
      x >= x2 &&
      x <= 660 * this.state.width_factor &&
      y >=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100) &&
      y <=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
    ) {
      data_array[14] = data_array[14] + 1;
      return data_array;
    } else if (
      x >= 146 * this.state.width_factor &&
      x <= x1 &&
      y <= 1360 * this.state.height_factor &&
      y >=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
    ) {
      data_array[15] = data_array[15] + 1;
      return data_array;
    } else if (
      x <= x2 &&
      x >= x1 &&
      y <= 1360 * this.state.height_factor &&
      y >=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
    ) {
      data_array[16] = data_array[16] + 1;
      return data_array;
    } else if (
      x >= x2 &&
      x <= 660 * this.state.width_factor &&
      y <= 1360 * this.state.height_factor &&
      y >=
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
    ) {
      data_array[17] = data_array[17] + 1;
      return data_array;
    } else if (
      x <= 146 * this.state.width_factor &&
      x > 0 &&
      y >= 100 * this.state.height_factor &&
      y <= 770 * this.state.height_factor
    ) {
      data_array[18] = data_array[18] + 1;
      return data_array;
    } else if (
      x <= this.state.width &&
      x > 0 &&
      y <= 100 * this.state.height_factor &&
      y > 0
    ) {
      data_array[19] = data_array[19] + 1;
      return data_array;
    } else if (
      x <= this.state.width &&
      x >= 660 * this.state.width_factor &&
      y >= 100 * this.state.height_factor &&
      y <= 770 * this.state.height_factor
    ) {
      data_array[20] = data_array[20] + 1;
      return data_array;
    } else if (
      x <= 146 * this.state.width_factor &&
      x > 0 &&
      y >= 770 * this.state.height_factor &&
      y <= 1440 * this.state.height_factor
    ) {
      data_array[21] = data_array[21] + 1;
      return data_array;
    } else if (
      x <= this.state.width &&
      x > 0 &&
      y <= this.state.height &&
      y >= 1440 * this.state.height_factor
    ) {
      data_array[22] = data_array[22] + 1;
      return data_array;
    } else if (
      x <= this.state.width &&
      x >= 660 * this.state.width_factor &&
      y >= 770 * this.state.height_factor &&
      y <= 1440 * this.state.height_factor
    ) {
      data_array[23] = data_array[23] + 1;
      return data_array;
    } else {
      return data_array;
    }
  };

  componentDidMount() {
    this.drawCourt();
    this.setState({
      sidePerc: Array(8).fill({ total: 0, nm: 0, win: 0, err: 0 }),
    });
  }

  drawStar = (bot_x, bot_y, color_val) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor + 5,
      bot_y * this.state.height_factor
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor - 5,
      bot_y * this.state.height_factor
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor + 5
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor - 5
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor + 3,
      bot_y * this.state.height_factor + 3
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor - 3,
      bot_y * this.state.height_factor - 3
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor + 3,
      bot_y * this.state.height_factor - 3
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor - 3,
      bot_y * this.state.height_factor + 3
    );
    ctx.strokeStyle = color_val;
    ctx.lineWidth = 2;
    ctx.setLineDash([0]);
    ctx.stroke();
    ctx.closePath();
  };

  drawcross = (bot_x, bot_y, color_val) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor + 5,
      bot_y * this.state.height_factor + 5
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor - 5,
      bot_y * this.state.height_factor + 5
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor + 5,
      bot_y * this.state.height_factor - 5
    );
    ctx.moveTo(
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
    ctx.lineTo(
      bot_x * this.state.width_factor - 5,
      bot_y * this.state.height_factor - 5
    );
    ctx.strokeStyle = color_val;
    ctx.lineWidth = 2;
    ctx.setLineDash([0]);
    ctx.stroke();
    ctx.closePath();
  };

  drawShot(
    shot,
    nextShot,
    color_val,
    nextProps,
    shot_count,
    code,
    final,
    side_perc
  ) {
    let dif = nextProps.toShot - nextProps.fromShot + 1;
    if (shot.player_played === "top") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");

      //intial postion of shuttle
      let top_x = (shot.position_top[0][0] + shot.position_top[1][0]) / 2;
      let top_y = (shot.position_top[0][1] + shot.position_top[1][1]) / 2;

      //final position of shuttle
      let bot_x =
        (nextShot.position_bottom[0][0] + nextShot.position_bottom[1][0]) / 2;
      let bot_y =
        (nextShot.position_bottom[0][1] + nextShot.position_bottom[1][1]) / 2;

      let sec_val_arr = [];

      if (final) {
        sec_val_arr = this.sidePercentageChecker(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          nextShot.Shuttle_ground_contact_location[0] * this.state.width_factor,
          nextShot.Shuttle_ground_contact_location[1] *
            this.state.height_factor,
          code,
          "top"
        );
      } else {
        sec_val_arr = this.sidePercentageChecker(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor,
          code,
          "top"
        );
      }
      let seb_val = 8;
      let sec_val = 8;
      console.log(sec_val_arr);
      if (sec_val_arr.length === 2) {
        seb_val = sec_val_arr[0];
        sec_val = sec_val_arr[1];
      }

      if (code === "nomistakes") {
        side_perc[seb_val].nm = side_perc[seb_val].nm + 1;
        side_perc[sec_val].nm = side_perc[sec_val].nm + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.arc(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          2,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "#ffef00";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffef00";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor,
          2,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "#ffef00";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffef00";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
      } else if (code === "tW") {
        side_perc[seb_val].win = side_perc[seb_val].win + 1;
        side_perc[sec_val].win = side_perc[sec_val].win + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.rect(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          7,
          7
        );
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 1;
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();

        if (final) {
          this.drawStar(
            nextShot.Shuttle_ground_contact_location[0],
            nextShot.Shuttle_ground_contact_location[1],
            "#00FF00"
          );
        } else {
          ctx.beginPath();
          ctx.rect(
            bot_x * this.state.width_factor,
            bot_y * this.state.height_factor,
            7,
            7
          );
          ctx.strokeStyle = "#00FF00";
          ctx.lineWidth = 1;
          ctx.setLineDash([0]);
          ctx.stroke();
          ctx.closePath();
        }
      } else if (code === "tM") {
        side_perc[seb_val].err = side_perc[seb_val].err + 1;
        side_perc[sec_val].err = side_perc[sec_val].err + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.moveTo(
          top_x * this.state.width_factor - 7,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor - 7
        );
        ctx.lineTo(
          top_x * this.state.width_factor + 7,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          top_x * this.state.width_factor - 7,
          top_y * this.state.height_factor
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();

        if (final) {
          this.drawcross(
            nextShot.Shuttle_ground_contact_location[0],
            nextShot.Shuttle_ground_contact_location[1],
            "red"
          );
        } else {
          ctx.beginPath();
          ctx.moveTo(
            bot_x * this.state.width_factor - 7,
            bot_y * this.state.height_factor
          );
          ctx.lineTo(
            bot_x * this.state.width_factor,
            bot_y * this.state.height_factor - 7
          );
          ctx.lineTo(
            bot_x * this.state.width_factor + 7,
            bot_y * this.state.height_factor
          );
          ctx.lineTo(
            bot_x * this.state.width_factor - 7,
            bot_y * this.state.height_factor
          );
          ctx.lineWidth = 1;
          ctx.strokeStyle = "red";
          ctx.setLineDash([0]);
          ctx.stroke();
          ctx.closePath();
        }
      } else if (code === "bW") {
        side_perc[seb_val].err = side_perc[seb_val].err + 1;
        side_perc[sec_val].err = side_perc[sec_val].err + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.rect(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          7,
          7
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
        if (final) {
          this.drawcross(
            nextShot.Shuttle_ground_contact_location[0],
            nextShot.Shuttle_ground_contact_location[1],
            "red"
          );
        } else {
          ctx.beginPath();
          ctx.rect(
            bot_x * this.state.width_factor,
            bot_y * this.state.height_factor,
            7,
            7
          );
          ctx.strokeStyle = "red";
          ctx.lineWidth = 1;
          ctx.setLineDash([0]);
          ctx.stroke();
          ctx.closePath();
        }
      } else if (code === "bM") {
        side_perc[seb_val].win = side_perc[seb_val].win + 1;
        side_perc[sec_val].win = side_perc[sec_val].win + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.moveTo(
          top_x * this.state.width_factor - 7,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor - 7
        );
        ctx.lineTo(
          top_x * this.state.width_factor + 7,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          top_x * this.state.width_factor - 7,
          top_y * this.state.height_factor
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#00FF00";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
        if (final) {
          this.drawStar(
            nextShot.Shuttle_ground_contact_location[0],
            nextShot.Shuttle_ground_contact_location[1],
            "#00FF00"
          );
        } else {
          ctx.beginPath();
          ctx.moveTo(
            bot_x * this.state.width_factor - 7,
            bot_y * this.state.height_factor
          );
          ctx.lineTo(
            bot_x * this.state.width_factor,
            bot_y * this.state.height_factor - 7
          );
          ctx.lineTo(
            bot_x * this.state.width_factor + 7,
            bot_y * this.state.height_factor
          );
          ctx.lineTo(
            bot_x * this.state.width_factor - 7,
            bot_y * this.state.height_factor
          );
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#00FF00";
          ctx.setLineDash([0]);
          ctx.stroke();
          ctx.closePath();
        }
      } else {
        ctx.beginPath();
        ctx.arc(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          3,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "#ffef00";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
      }

      //intial midpoint of bottom player
      let bot_x_intial =
        (shot.position_bottom[0][0] + shot.position_bottom[1][0]) / 2;
      let bot_y_intial =
        (shot.position_bottom[0][1] + shot.position_bottom[1][1]) / 2;

      if (nextProps.placrecTop) {
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.moveTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor
        );
        // ctx.strokeStyle = "rgb(173, 173, 10)";
        ctx.strokeStyle = color_val;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
      }

      if (nextProps.distanceBot) {
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.moveTo(
          bot_x_intial * this.state.width_factor,
          bot_y_intial * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor
        );
        ctx.strokeStyle = "#00bfff";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
        this.props._UpdateDistance(
          bot_x_intial,
          bot_y_intial,
          bot_x,
          bot_y,
          "bottom",
          shot_count
        );
        this.props._UpdateReac(
          shot.start_frame_shot,
          nextShot.start_frame_shot,
          dif,
          "bottom"
        );
      }
      return side_perc;
    } else if (shot.player_played === "bottom") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");
      //intial postion of shuttle
      let bot_x = (shot.position_bottom[0][0] + shot.position_bottom[1][0]) / 2;
      let bot_y = (shot.position_bottom[0][1] + shot.position_bottom[1][1]) / 2;

      //final position of shuttle
      let top_x =
        (nextShot.position_top[0][0] + nextShot.position_top[1][0]) / 2;
      let top_y =
        (nextShot.position_top[0][1] + nextShot.position_top[1][1]) / 2;
      let sec_val_arr = [0, 0];
      if (final) {
        sec_val_arr = this.sidePercentageChecker(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor,
          nextShot.Shuttle_ground_contact_location[0] * this.state.width_factor,
          nextShot.Shuttle_ground_contact_location[1] *
            this.state.height_factor,
          code,
          "bot"
        );
      } else {
        sec_val_arr = this.sidePercentageChecker(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor,
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          code,
          "bot"
        );
      }
      let seb_val = sec_val_arr[0];
      let sec_val = sec_val_arr[1];

      if (code === "nomistakes") {
        side_perc[seb_val].nm = side_perc[seb_val].nm + 1;
        side_perc[sec_val].nm = side_perc[sec_val].nm + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.arc(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor,
          2,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "#ffef00";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffef00";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor,
          2,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "#ffef00";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffef00";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
      } else if (code === "tW") {
        side_perc[seb_val].err = side_perc[seb_val].err + 1;
        side_perc[sec_val].err = side_perc[sec_val].err + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.rect(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor,
          7,
          7
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
        if (final) {
          this.drawcross(
            nextShot.Shuttle_ground_contact_location[0],
            nextShot.Shuttle_ground_contact_location[1],
            "red"
          );
        } else {
          ctx.beginPath();
          ctx.rect(
            top_x * this.state.width_factor,
            top_y * this.state.height_factor,
            7,
            7
          );
          ctx.strokeStyle = "red";
          ctx.lineWidth = 1;
          ctx.setLineDash([0]);
          ctx.stroke();
          ctx.closePath();
        }
      } else if (code === "tM") {
        side_perc[seb_val].win = side_perc[seb_val].win + 1;
        side_perc[sec_val].win = side_perc[sec_val].win + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.moveTo(
          bot_x * this.state.width_factor - 7,
          bot_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor - 7
        );
        ctx.lineTo(
          bot_x * this.state.width_factor + 7,
          bot_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor - 7,
          bot_y * this.state.height_factor
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#00FF00";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
        if (final) {
          this.drawStar(
            nextShot.Shuttle_ground_contact_location[0],
            nextShot.Shuttle_ground_contact_location[1],
            "#00FF00"
          );
        } else {
          ctx.beginPath();
          ctx.moveTo(
            top_x * this.state.width_factor - 7,
            top_y * this.state.height_factor
          );
          ctx.lineTo(
            top_x * this.state.width_factor,
            top_y * this.state.height_factor - 7
          );
          ctx.lineTo(
            top_x * this.state.width_factor + 7,
            top_y * this.state.height_factor
          );
          ctx.lineTo(
            top_x * this.state.width_factor - 7,
            top_y * this.state.height_factor
          );
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#00FF00";
          ctx.setLineDash([0]);
          ctx.stroke();
          ctx.closePath();
        }
      } else if (code === "bW") {
        side_perc[seb_val].win = side_perc[seb_val].win + 1;
        side_perc[sec_val].win = side_perc[sec_val].win + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.rect(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor,
          7,
          7
        );
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 1;
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
        if (final) {
          this.drawStar(
            nextShot.Shuttle_ground_contact_location[0],
            nextShot.Shuttle_ground_contact_location[1],
            "#00FF00"
          );
        } else {
          ctx.beginPath();
          ctx.rect(
            top_x * this.state.width_factor,
            top_y * this.state.height_factor,
            7,
            7
          );
          ctx.strokeStyle = "#00FF00";
          ctx.lineWidth = 1;
          ctx.setLineDash([0]);
          ctx.stroke();
          ctx.closePath();
        }
      } else if (code === "bM") {
        side_perc[seb_val].err = side_perc[seb_val].err + 1;
        side_perc[sec_val].err = side_perc[sec_val].err + 1;
        side_perc[seb_val].total = side_perc[seb_val].total + 1;
        side_perc[sec_val].total = side_perc[sec_val].total + 1;
        ctx.beginPath();
        ctx.moveTo(
          bot_x * this.state.width_factor - 7,
          bot_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor - 7
        );
        ctx.lineTo(
          bot_x * this.state.width_factor + 7,
          bot_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor - 7,
          bot_y * this.state.height_factor
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
        if (final) {
          this.drawcross(
            nextShot.Shuttle_ground_contact_location[0],
            nextShot.Shuttle_ground_contact_location[1],
            "red"
          );
        } else {
          ctx.beginPath();
          ctx.moveTo(
            top_x * this.state.width_factor - 7,
            top_y * this.state.height_factor
          );
          ctx.lineTo(
            top_x * this.state.width_factor,
            top_y * this.state.height_factor - 7
          );
          ctx.lineTo(
            top_x * this.state.width_factor + 7,
            top_y * this.state.height_factor
          );
          ctx.lineTo(
            top_x * this.state.width_factor - 7,
            top_y * this.state.height_factor
          );
          ctx.lineWidth = 1;
          ctx.strokeStyle = "red";
          ctx.setLineDash([0]);
          ctx.stroke();
          ctx.closePath();
        }
      } else {
        ctx.beginPath();
        ctx.arc(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor,
          3,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "#ffef00";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.setLineDash([0]);
        ctx.stroke();
        ctx.closePath();
      }

      //intial midpoint of bottom player
      let top_x_intial =
        (shot.position_top[0][0] + shot.position_top[1][0]) / 2;
      let top_y_intial =
        (shot.position_top[0][1] + shot.position_top[1][1]) / 2;

      if (nextProps.placrecBot) {
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.moveTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor
        );
        ctx.strokeStyle = color_val;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
      }
      if (nextProps.distanceTop) {
        ctx.beginPath();
        ctx.setLineDash([0]);

        ctx.moveTo(
          top_x_intial * this.state.width_factor,
          top_y_intial * this.state.height_factor
        );
        ctx.lineTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor
        );
        ctx.strokeStyle = "#FF8019";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
        this.props._UpdateDistance(
          top_x_intial,
          top_y_intial,
          top_x,
          top_y,
          "top",
          shot_count
        );
        this.props._UpdateReac(
          shot.start_frame_shot,
          nextShot.start_frame_shot,
          dif,
          "top"
        );
      }
      return side_perc;
    }
  }

  shotSegmentCheck = (shot, nextShot, segment_limit) => {
    if (shot.player_played === "top") {
      //intial postion of shuttle
      let top_x = (shot.position_top[0][0] + shot.position_top[1][0]) / 2;
      let top_y = (shot.position_top[0][1] + shot.position_top[1][1]) / 2;

      if (
        top_x * this.state.width_factor >= segment_limit[0] &&
        top_x * this.state.width_factor <= segment_limit[1] &&
        top_y * this.state.height_factor >= segment_limit[2] &&
        top_y * this.state.height_factor <= segment_limit[3]
      ) {
        return 1;
      } else return 0;
    } else if (shot.player_played === "bottom") {
      //intial postion of shuttle
      let top_x = (shot.position_bottom[0][0] + shot.position_bottom[1][0]) / 2;
      let top_y = (shot.position_bottom[0][1] + shot.position_bottom[1][1]) / 2;

      if (
        top_x * this.state.width_factor >= segment_limit[0] &&
        top_x * this.state.width_factor <= segment_limit[1] &&
        top_y * this.state.height_factor >= segment_limit[2] &&
        top_y * this.state.height_factor <= segment_limit[3]
      ) {
        return 1;
      } else return 0;
    }
  };

  shotSegmentCheckRight = (shot, segment_limit) => {
    //intial postion of shuttle
    let top_x = shot.location_contact_shuttle[0];
    let top_y = shot.location_contact_shuttle[1];

    if (
      top_x * this.state.width_factor >= segment_limit[0] &&
      top_x * this.state.width_factor <= segment_limit[1] &&
      top_y * this.state.height_factor >= segment_limit[2] &&
      top_y * this.state.height_factor <= segment_limit[3]
    ) {
      return 1;
    } else return 0;
  };

  drawPercentage(total_length, num_shots_in_segment, player_played, location) {
    if (player_played === "top") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");
      let perc_val =
        ((num_shots_in_segment / total_length) * 100).toFixed(0).toString() +
        "%";

      ctx.beginPath();
      ctx.fillStyle = "#FF8019";
      ctx.font = "bold 16px Arial";
      ctx.fillText(perc_val, location[0], location[1]);
      ctx.closePath();
    } else if (player_played === "bottom") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");
      let perc_val =
        ((num_shots_in_segment / total_length) * 100).toFixed(0).toString() +
        "%";

      ctx.beginPath();
      ctx.fillStyle = "#00bfff";
      ctx.font = "bold 16px Arial";
      ctx.fillText(perc_val, location[0], location[1]);
      ctx.closePath();
    }
  }

  drawPercentagePrecentageOpposite = (
    total_length,
    data_array,
    player_played
  ) => {
    let x1 =
      146 * this.state.width_factor +
      518 * this.state.width_factor * (this.state.width1_perc / 100);

    let x2 =
      146 * this.state.width_factor +
      518 * this.state.width_factor * (this.state.width2_perc / 100);

    let y1 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (this.state.height1_perc / 100);

    let y2 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (this.state.height2_perc / 100);

    let loc_array = [
      [146 * this.state.width_factor, x1, 100 * this.state.height_factor, y1],
      [x2, x1, 100 * this.state.height_factor, y1],
      [x2, 660 * this.state.width_factor, 100 * this.state.height_factor, y1],
      [146 * this.state.width_factor, x1, y2, y1],
      [x2, x1, y2, y1],
      [x2, 660 * this.state.width_factor, y2, y1],
      [146 * this.state.width_factor, x1, y2, 770 * this.state.height_factor],
      [x2, x1, y2, 770 * this.state.height_factor],
      [x2, 660 * this.state.width_factor, y2, 770 * this.state.height_factor],
      [
        146 * this.state.width_factor,
        x1,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        770 * this.state.height_factor,
      ],
      [
        x2,
        x1,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        770 * this.state.height_factor,
      ],
      [
        x2,
        660 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        770 * this.state.height_factor,
      ],
      [
        146 * this.state.width_factor,
        x1,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
      ],
      [
        x2,
        x1,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
      ],
      [
        x2,
        660 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
      ],
      [
        146 * this.state.width_factor,
        x1,
        1440 * this.state.height_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
      ],
      [
        x2,
        x1,
        1440 * this.state.height_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
      ],
      [
        x2,
        660 * this.state.width_factor,
        1440 * this.state.height_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100),
      ],
      [
        146 * this.state.width_factor,
        0,
        100 * this.state.height_factor,
        770 * this.state.height_factor,
      ],
      [this.state.width, 0, 100 * this.state.height_factor, 0],
      [
        this.state.width,
        660 * this.state.width_factor,
        100 * this.state.height_factor,
        770 * this.state.height_factor,
      ],
      [
        146 * this.state.width_factor,
        0,
        770 * this.state.height_factor,
        1440 * this.state.height_factor,
      ],
      [this.state.width, 0, this.state.height, 1440 * this.state.height_factor],
      [
        this.state.width,
        660 * this.state.width_factor,
        770 * this.state.height_factor,
        1440 * this.state.height_factor,
      ],
      [
        146 * this.state.width_factor,
        660 * this.state.width_factor,
        770 * this.state.height_factor,
        770 * this.state.height_factor,
      ],
    ];
    if (player_played === "top") {
      for (let i = 9; i < 18; i++) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        let perc_val =
          ((data_array[i] / total_length) * 100).toFixed(0).toString() + "%";
        let location = loc_array[i];
        let x = (location[0] + location[1]) / 2;
        let y = (location[2] + location[3]) / 2;

        ctx.beginPath();
        ctx.fillStyle = "#00bfff";
        ctx.font = "bold 12px Arial";
        ctx.fillText(perc_val, x, y);
        ctx.closePath();
      }
      for (let i = 21; i < 24; i++) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        let perc_val =
          ((data_array[i] / total_length) * 100).toFixed(0).toString() + "%";
        let location = loc_array[i];
        let x = (location[0] + location[1]) / 2;
        let y = (location[2] + location[3]) / 2;

        ctx.beginPath();
        ctx.fillStyle = "#00bfff";
        ctx.font = "bold 12px Arial";
        ctx.fillText(perc_val, x, y);
        ctx.closePath();
      }
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");
      let perc_val =
        ((data_array[24] / total_length) * 100).toFixed(0).toString() + "%";
      let location = loc_array[24];
      let x = (location[0] + location[1]) / 2;
      let y = (location[2] + location[3]) / 2;

      ctx.beginPath();
      ctx.fillStyle = "#00bfff";
      ctx.font = "bold 12px Arial";
      ctx.fillText(perc_val, x, y);
      ctx.closePath();
    } else if (player_played === "bottom") {
      for (let i = 0; i < 9; i++) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        let perc_val =
          ((data_array[i] / total_length) * 100).toFixed(0).toString() + "%";
        let location = loc_array[i];
        let x = (location[0] + location[1]) / 2;
        let y = (location[2] + location[3]) / 2;

        ctx.beginPath();
        ctx.fillStyle = "#FF8019";
        ctx.font = "bold 12px Arial";
        ctx.fillText(perc_val, x, y);
        ctx.closePath();
      }
      for (let i = 18; i < 21; i++) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        let perc_val =
          ((data_array[i] / total_length) * 100).toFixed(0).toString() + "%";
        let location = loc_array[i];
        let x = (location[0] + location[1]) / 2;
        let y = (location[2] + location[3]) / 2;

        ctx.beginPath();
        ctx.fillStyle = "#FF8019";
        ctx.font = "bold 12px Arial";
        ctx.fillText(perc_val, x, y);
        ctx.closePath();
      }
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");
      let perc_val =
        ((data_array[24] / total_length) * 100).toFixed(0).toString() + "%";
      let location = loc_array[24];
      let x = (location[0] + location[1]) / 2;
      let y = (location[2] + location[3]) / 2;

      ctx.beginPath();
      ctx.fillStyle = "#FF8019";
      ctx.font = "bold 12px Arial";
      ctx.fillText(perc_val, x, y);
      ctx.closePath();
    }
  };

  canvas_arrow = (fromx, fromy, tox, toy) => {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");
    let headlen = 10; // length of head in pixels
    let dx = tox - fromx;
    let dy = toy - fromy;
    let angle = Math.atan2(dy, dx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 6),
      toy - headlen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(tox, toy);
    context.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 6),
      toy - headlen * Math.sin(angle + Math.PI / 6)
    );
    context.stroke();
    context.closePath();
  };

  courtDrawerFunction = (nextProps, shot_count) => {
    if (nextProps.isRightSide) {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.state.width, this.state.height);
      this.drawCourt();
      if (nextProps.perc || nextProps.arrows) {
        if (nextProps.isBottom) {
          if (nextProps.percFirstShot || nextProps.percThirdShot) {
            this.drawSegments("bottom");
          } else {
            this.drawSegments("top");
          }
        } else {
          if (nextProps.percFirstShot || nextProps.percThirdShot) {
            this.drawSegments("top");
          } else {
            this.drawSegments("bottom");
          }
        }
      }
      nextProps.rightSideData.map((item, index) => {
        if (
          shot_count >= nextProps.fromShot &&
          shot_count <= nextProps.toShot
        ) {
          this.props._AddCount();
          this.drawShotIndRightSide(item, nextProps);
          this.drawFeetInRight(item, nextProps);
          this.drawDistanceInRightSide(item, nextProps);
        }
        shot_count += 1;
      });
    } else {
      if (nextProps.patter_length !== -1) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.drawCourt();
        if (nextProps.perc || nextProps.arrows) {
          if (nextProps.isBottom) {
            if (nextProps.percFirstShot || nextProps.percThirdShot) {
              this.drawSegments("bottom");
            } else {
              this.drawSegments("top");
            }
          } else {
            if (nextProps.percFirstShot || nextProps.percThirdShot) {
              this.drawSegments("top");
            } else {
              this.drawSegments("bottom");
            }
          }
        }
        if (nextProps.patter_length === 1) {
          let side_perc = {
            0: { total: 0, nm: 0, win: 0, err: 0 },
            1: { total: 0, nm: 0, win: 0, err: 0 },
            2: { total: 0, nm: 0, win: 0, err: 0 },
            3: { total: 0, nm: 0, win: 0, err: 0 },
            4: { total: 0, nm: 0, win: 0, err: 0 },
            5: { total: 0, nm: 0, win: 0, err: 0 },
            6: { total: 0, nm: 0, win: 0, err: 0 },
            7: { total: 0, nm: 0, win: 0, err: 0 },
            8: { total: 0, nm: 0, win: 0, err: 0 },
          };
          nextProps.pattern_array.map((rally, rally_index) => {
            if (rally.length > 0) {
              rally.map((item, index) => {
                if (
                  shot_count >= nextProps.fromShot &&
                  shot_count <= nextProps.toShot
                ) {
                  this.props._AddCount();
                  let int_item = parseInt(item);
                  this.drawFeet(
                    nextProps.shots[rally_index][int_item],
                    0,
                    nextProps,
                    1
                  );
                  if (nextProps.shots[rally_index].length > int_item + 1) {
                    this.drawFeet(
                      nextProps.shots[rally_index][int_item + 1],
                      1,
                      nextProps,
                      1
                    );
                    if (nextProps.firstshot) {
                      let badminton_array = Object.values(badminton_data);
                      let code = "nomistakes";
                      let final = false;
                      let indRallyIndex =
                        nextProps.rallyIndexArray[rally_index];

                      if (
                        badminton_array[indRallyIndex] &&
                        badminton_array[indRallyIndex].start_index_sequence !==
                          null &&
                        badminton_array[indRallyIndex].start_index_sequence <=
                          int_item
                      ) {
                        code = badminton_array[indRallyIndex].Action_init;
                      }
                      if (
                        nextProps.shots[rally_index].length - 1 ===
                        int_item + 1
                      ) {
                        final = true;
                      }
                      side_perc = this.drawShot(
                        nextProps.shots[rally_index][int_item],
                        nextProps.shots[rally_index][int_item + 1],
                        "rgb(173, 173, 10)",
                        nextProps,
                        1,
                        code,
                        final,
                        side_perc
                      );
                    }
                  }
                }
                shot_count += 1;
              });
            }
          });
          if (this.props.indShot) {
            this.drawPercentageBoxes(side_perc);
          }
        } else if (nextProps.patter_length === 2) {
          nextProps.pattern_array.map((rally, rally_index) => {
            if (rally.length > 0) {
              rally.map((item, index) => {
                if (
                  shot_count >= nextProps.fromShot &&
                  shot_count <= nextProps.toShot
                ) {
                  this.props._AddCount();
                  let int_item = parseInt(item);
                  this.drawFeet(
                    nextProps.shots[rally_index][int_item],
                    0,
                    nextProps,
                    2
                  );
                  if (nextProps.shots[rally_index].length > int_item + 1) {
                    this.drawFeet(
                      nextProps.shots[rally_index][int_item + 1],
                      0,
                      nextProps,
                      1
                    );
                    if (nextProps.firstshot) {
                      this.drawShot(
                        nextProps.shots[rally_index][int_item],
                        nextProps.shots[rally_index][int_item + 1],
                        "rgb(173, 173, 10)",
                        nextProps,
                        2
                      );
                    }
                  }
                  if (nextProps.shots[rally_index].length > int_item + 2) {
                    this.drawFeet(
                      nextProps.shots[rally_index][int_item + 2],
                      1,
                      nextProps,
                      2
                    );
                    if (nextProps.secondshot) {
                      this.drawShot(
                        nextProps.shots[rally_index][int_item + 1],
                        nextProps.shots[rally_index][int_item + 2],
                        "green",
                        nextProps,
                        2
                      );
                    }
                  }
                }
                shot_count += 1;
              });
            }
          });
        } else if (nextProps.patter_length === 3) {
          nextProps.pattern_array.map((rally, rally_index) => {
            if (rally.length > 0) {
              rally.map((item, index) => {
                if (
                  shot_count >= nextProps.fromShot &&
                  shot_count <= nextProps.toShot
                ) {
                  this.props._AddCount();
                  let int_item = parseInt(item);
                  this.drawFeet(
                    nextProps.shots[rally_index][int_item],
                    0,
                    nextProps,
                    2
                  );
                  if (nextProps.shots[rally_index].length > int_item + 1) {
                    this.drawFeet(
                      nextProps.shots[rally_index][int_item + 1],
                      0,
                      nextProps,
                      2
                    );
                    if (nextProps.firstshot) {
                      this.drawShot(
                        nextProps.shots[rally_index][int_item],
                        nextProps.shots[rally_index][int_item + 1],
                        "rgb(173, 173, 10)",
                        nextProps,
                        3
                      );
                    }
                  }
                  if (nextProps.shots[rally_index].length > int_item + 2) {
                    this.drawFeet(
                      nextProps.shots[rally_index][int_item + 2],
                      0,
                      nextProps,
                      2
                    );
                    if (nextProps.secondshot) {
                      this.drawShot(
                        nextProps.shots[rally_index][int_item + 1],
                        nextProps.shots[rally_index][int_item + 2],
                        "green",
                        nextProps,
                        3
                      );
                    }
                  }
                  if (nextProps.shots[rally_index].length > int_item + 3) {
                    this.drawFeet(
                      nextProps.shots[rally_index][int_item + 3],
                      1,
                      nextProps,
                      2
                    );
                    if (nextProps.thirdshot) {
                      this.drawShot(
                        nextProps.shots[rally_index][int_item + 2],
                        nextProps.shots[rally_index][int_item + 3],
                        "violet",
                        nextProps,
                        3
                      );
                    }
                  }
                }
                shot_count += 1;
              });
            }
          });
        }
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    let shot_count = 0;
    this.props._ResetStretch();
    this.props._ResetDistance();
    this.props._ResetCount();
    this.setState({
      selectedPart: [],
    });

    if (nextProps !== this.props) {
      this.setState({
        height1_perc: nextProps.height1_perc,
        height2_perc: nextProps.height2_perc,
        width1_perc: nextProps.width1_perc,
        width2_perc: nextProps.width2_perc,
      });
      this.courtDrawerFunction(nextProps, shot_count);
    }
    if (nextProps.selectedShot.length > 1) {
      if (
        nextProps.selectedShot[0] !== this.props.selectedShot[0] ||
        nextProps.selectedShot[1] !== this.props.selectedShot[1] ||
        nextProps.selectedShot[2] !== this.props.selectedShot[2]
      ) {
        if (nextProps.selectedShot[1] !== null) {
          if (nextProps.selectedShot !== null) {
            if (
              nextProps.selectedShot[0] !== this.props.selectedShot[0] ||
              nextProps.selectedShot[1] !== this.props.selectedShot[1]
            ) {
              let rallyIndex = nextProps.selectedShot[0];
              let shotIndex = nextProps.selectedShot[1];
              let itemVal = nextProps.pattern_array[rallyIndex][shotIndex];
              let nextShotIndex = itemVal + 1;
              this.drawVideoShot(
                nextProps.shots[rallyIndex][itemVal],
                nextProps.shots[rallyIndex][nextShotIndex]
              );
            }
          }
        }
      }
    } else {
      if (
        nextProps.selectedShot !== null &&
        nextProps.selectedShot[0] !== this.props.selectedShot[0]
      ) {
        if (nextProps.isRightSide) {
          if (nextProps.rightSideData[nextProps.selectedShot[0]]) {
            this.drawVideoShotRIght(
              nextProps.rightSideData[nextProps.selectedShot[0]]
            );
          }
        }
      }
    }
  }

  drawFeet = (shot, index_val, nextProps, shot_count) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    let dif = nextProps.toShot - nextProps.fromShot + 1;
    if (shot.player_played === "top" && index_val === 0) {
      if (nextProps.stretchTop) {
        ctx.beginPath();
        ctx.setLineDash([2]);
        ctx.moveTo(
          shot.position_top[0][0] * this.state.width_factor,
          shot.position_top[0][1] * this.state.height_factor
        );
        ctx.lineTo(
          shot.position_top[1][0] * this.state.width_factor,
          shot.position_top[1][1] * this.state.height_factor
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
        this.props._UpdateStretch(
          shot.position_top[0][0],
          shot.position_top[0][1],
          shot.position_top[1][0],
          shot.position_top[1][1],
          "top",
          shot_count
        );
      }
    } else if (shot.player_played === "top" && index_val === 1) {
      if (nextProps.stretchTop) {
        ctx.beginPath();
        ctx.setLineDash([2]);
        ctx.moveTo(
          shot.position_top[0][0] * this.state.width_factor,
          shot.position_top[0][1] * this.state.height_factor
        );
        ctx.lineTo(
          shot.position_top[1][0] * this.state.width_factor,
          shot.position_top[1][1] * this.state.height_factor
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
        this.props._UpdateStretch(
          shot.position_top[0][0],
          shot.position_top[0][1],
          shot.position_top[1][0],
          shot.position_top[1][1],
          "top",
          shot_count
        );
      }
    } else if (shot.player_played === "bottom" && index_val === 0) {
      if (nextProps.stretchBot) {
        ctx.beginPath();
        ctx.setLineDash([2]);
        ctx.moveTo(
          shot.position_bottom[0][0] * this.state.width_factor,
          shot.position_bottom[0][1] * this.state.height_factor
        );
        ctx.lineTo(
          shot.position_bottom[1][0] * this.state.width_factor,
          shot.position_bottom[1][1] * this.state.height_factor
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
        this.props._UpdateStretch(
          shot.position_bottom[0][0],
          shot.position_bottom[0][1],
          shot.position_bottom[1][0],
          shot.position_bottom[1][1],
          "bottom",
          shot_count
        );
      }
    } else if (shot.player_played === "bottom" && index_val === 1) {
      if (nextProps.stretchBot) {
        ctx.beginPath();
        ctx.setLineDash([2]);
        ctx.moveTo(
          shot.position_bottom[0][0] * this.state.width_factor,
          shot.position_bottom[0][1] * this.state.height_factor
        );
        ctx.lineTo(
          shot.position_bottom[1][0] * this.state.width_factor,
          shot.position_bottom[1][1] * this.state.height_factor
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
        this.props._UpdateStretch(
          shot.position_bottom[0][0],
          shot.position_bottom[0][1],
          shot.position_bottom[1][0],
          shot.position_bottom[1][1],
          "bottom",
          shot_count
        );
      }
    }
  };

  drawFeetInRight = (shot, nextProps) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (nextProps.stretchTop) {
      if (
        Array.isArray(shot.location_Init_start_top) &&
        Array.isArray(shot.location_Init_end_top)
      ) {
        ctx.beginPath();
        ctx.setLineDash([2]);
        ctx.moveTo(
          shot.location_Init_start_top[0][0] * this.state.width_factor,
          shot.location_Init_start_top[0][1] * this.state.height_factor
        );
        ctx.lineTo(
          shot.location_Init_start_top[1][0] * this.state.width_factor,
          shot.location_Init_start_top[1][1] * this.state.height_factor
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.moveTo(
          shot.location_Init_end_top[0][0] * this.state.width_factor,
          shot.location_Init_end_top[0][1] * this.state.height_factor
        );
        ctx.lineTo(
          shot.location_Init_end_top[1][0] * this.state.width_factor,
          shot.location_Init_end_top[1][1] * this.state.height_factor
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.closePath();
        this.props._UpdateStretch(
          shot.location_Init_start_top[0][0],
          shot.location_Init_start_top[0][1],
          shot.location_Init_start_top[1][0],
          shot.location_Init_start_top[1][1],
          "top",
          2
        );
        this.props._UpdateStretch(
          shot.location_Init_end_top[0][0],
          shot.location_Init_end_top[0][1],
          shot.location_Init_end_top[1][0],
          shot.location_Init_end_top[1][1],
          "top",
          2
        );
      }
    }
    if (nextProps.stretchBot) {
      if (
        Array.isArray(shot.location_Init_start_bottom) &&
        Array.isArray(shot.location_Init_end_bottom)
      ) {
        ctx.beginPath();
        ctx.setLineDash([2]);
        ctx.moveTo(
          shot.location_Init_start_bottom[0][0] * this.state.width_factor,
          shot.location_Init_start_bottom[0][1] * this.state.height_factor
        );
        ctx.lineTo(
          shot.location_Init_start_bottom[1][0] * this.state.width_factor,
          shot.location_Init_start_bottom[1][1] * this.state.height_factor
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.moveTo(
          shot.location_Init_end_bottom[0][0] * this.state.width_factor,
          shot.location_Init_end_bottom[0][1] * this.state.height_factor
        );
        ctx.lineTo(
          shot.location_Init_end_bottom[1][0] * this.state.width_factor,
          shot.location_Init_end_bottom[1][1] * this.state.height_factor
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
        this.props._UpdateStretch(
          shot.location_Init_start_bottom[0][0],
          shot.location_Init_start_bottom[0][1],
          shot.location_Init_start_bottom[1][0],
          shot.location_Init_start_bottom[1][1],
          "bottom",
          2
        );
        this.props._UpdateStretch(
          shot.location_Init_end_bottom[0][0],
          shot.location_Init_end_bottom[0][1],
          shot.location_Init_end_bottom[1][0],
          shot.location_Init_end_bottom[1][1],
          "bottom",
          2
        );
      }
    }
  };

  drawDistanceInRightSide = (shot, nextProps) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (nextProps.distanceTop) {
      if (
        Array.isArray(shot.location_Init_start_top) &&
        Array.isArray(shot.location_Init_end_top)
      ) {
        ctx.strokeStyle = "#FF8019";
        ctx.lineWidth = 4;
        let start_x_top =
          (shot.location_Init_start_top[0][0] +
            shot.location_Init_start_top[1][0]) /
          2;
        let start_y_top =
          (shot.location_Init_start_top[0][1] +
            shot.location_Init_start_top[1][1]) /
          2;
        let end_x_top =
          (shot.location_Init_end_top[0][0] +
            shot.location_Init_end_top[1][0]) /
          2;
        let end_y_top =
          (shot.location_Init_end_top[0][1] +
            shot.location_Init_end_top[1][1]) /
          2;
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.moveTo(
          start_x_top * this.state.width_factor,
          start_y_top * this.state.height_factor
        );
        ctx.lineTo(
          end_x_top * this.state.width_factor,
          end_y_top * this.state.height_factor
        );

        ctx.stroke();
        ctx.closePath();
        this.props._UpdateDistance(
          start_x_top,
          start_y_top,
          end_x_top,
          end_y_top,
          "top",
          1
        );
      }
    }
    if (nextProps.distanceBot) {
      if (
        Array.isArray(shot.location_Init_start_bottom) &&
        Array.isArray(shot.location_Init_end_bottom)
      ) {
        let start_x_bot =
          (shot.location_Init_start_bottom[0][0] +
            shot.location_Init_start_bottom[1][0]) /
          2;
        let start_y_bot =
          (shot.location_Init_start_bottom[0][1] +
            shot.location_Init_start_bottom[1][1]) /
          2;
        let end_x_bot =
          (shot.location_Init_end_bottom[0][0] +
            shot.location_Init_end_bottom[1][0]) /
          2;
        let end_y_bot =
          (shot.location_Init_end_bottom[0][1] +
            shot.location_Init_end_bottom[1][1]) /
          2;
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.moveTo(
          start_x_bot * this.state.width_factor,
          start_y_bot * this.state.height_factor
        );
        ctx.lineTo(
          end_x_bot * this.state.width_factor,
          end_y_bot * this.state.height_factor
        );
        ctx.strokeStyle = "#00bfff";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
        this.props._UpdateDistance(
          start_x_bot,
          start_y_bot,
          end_x_bot,
          end_y_bot,
          "bottom",
          1
        );
      }
    }
  };

  drawVideoShotRIght = (item) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    let x1 = item.location_contact_shuttle[0] * this.state.width_factor;
    let y1 = item.location_contact_shuttle[1] * this.state.height_factor;
    let x2 = item.location_end_shuttle[0] * this.state.width_factor;
    let y2 = item.location_end_shuttle[1] * this.state.height_factor;

    ctx.beginPath();
    ctx.moveTo(x1, y1); // start of line
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.closePath();
    this.canvas_arrow(x1, y1, x2, y2);
    let startTime = item.contact_timestamp_shuttle.toString();

    let url =
      "https://firebasestorage.googleapis.com/v0/b/badmintonproject-3701e.appspot.com/o/Match16_check.mp4?alt=media&token=39a6ab57-670a-4c9b-8f60-5cbe00c4e9d5#t=";
    let reqUrl = url + startTime;
    this.props.setVideoSettings(startTime);
  };

  drawVideoShot = (shot, nextShot) => {
    if (nextShot && shot) {
      if (shot.player_played === "top") {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");

        //intial postion of shuttle
        let top_x = (shot.position_top[0][0] + shot.position_top[1][0]) / 2;
        let top_y = (shot.position_top[0][1] + shot.position_top[1][1]) / 2;

        //final position of shuttle
        let bot_x =
          (nextShot.position_bottom[0][0] + nextShot.position_bottom[1][0]) / 2;
        let bot_y =
          (nextShot.position_bottom[0][1] + nextShot.position_bottom[1][1]) / 2;

        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.moveTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor
        );
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
        let startTime = shot.start_frame_shot.toString();
        let endTime = nextShot.end_frame_shot;
        // this.setState({ popUp: true, startTime, endTime });
        let url =
          "https://firebasestorage.googleapis.com/v0/b/badmintonproject-3701e.appspot.com/o/Match16_check.mp4?alt=media&token=39a6ab57-670a-4c9b-8f60-5cbe00c4e9d5#t=";
        let reqUrl = url + startTime;
        this.props.setVideoSettings(startTime);

        ctx.lineWidth = 5;
      } else if (shot.player_played === "bottom") {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");

        //intial postion of shuttle
        let bot_x =
          (shot.position_bottom[0][0] + shot.position_bottom[1][0]) / 2;
        let bot_y =
          (shot.position_bottom[0][1] + shot.position_bottom[1][1]) / 2;

        //final position of shuttle
        let top_x =
          (nextShot.position_top[0][0] + nextShot.position_top[1][0]) / 2;
        let top_y =
          (nextShot.position_top[0][1] + nextShot.position_top[1][1]) / 2;

        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.moveTo(
          top_x * this.state.width_factor,
          top_y * this.state.height_factor
        );
        ctx.lineTo(
          bot_x * this.state.width_factor,
          bot_y * this.state.height_factor
        );

        ctx.lineWidth = 5;
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
        let startTime = shot.start_frame_shot.toString();
        let endTime = nextShot.end_frame_shot;
        // this.setState({ popUp: true, startTime, endTime });

        this.props.setVideoSettings(startTime);
      }
    }
  };

  drawPercentageBoxes = (side_perc) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    let valuesArray = [];
    let width_val = 50;
    let height_val = 50;
    let x1 =
      146 * this.state.width_factor +
      514 * this.state.width_factor * (width_val / 100);

    let y1 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (height_val / 100);

    let y2 =
      770 * this.state.height_factor +
      670 * this.state.height_factor * (height_val / 100);

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(x1, 100 * this.state.height_factor);
    ctx.lineTo(x1, 1440 * this.state.height_factor);
    ctx.strokeStyle = "#ffef00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(146 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.strokeStyle = "#ffef00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(660 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(660 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.strokeStyle = "#ffef00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, y1);
    ctx.lineTo(660 * this.state.width_factor, y1);
    ctx.strokeStyle = "#ffef00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(660 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.strokeStyle = "#ffef00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, 770 * this.state.height_factor);
    ctx.lineTo(660 * this.state.width_factor, 770 * this.state.height_factor);
    ctx.strokeStyle = "#ffef00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.lineTo(660 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.strokeStyle = "#ffef00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, y2);
    ctx.lineTo(660 * this.state.width_factor, y2);
    ctx.strokeStyle = "#ffef00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, y1);
    ctx.lineTo(0, 100);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, y1);
    ctx.lineTo(0, 140);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, 770 * this.state.height_factor);
    ctx.lineTo(0, 240);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, 770 * this.state.height_factor);
    ctx.lineTo(0, 320);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, y2);
    ctx.lineTo(0, 415);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, y2);
    ctx.lineTo(0, 450);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(146 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.lineTo(0, 550);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(660 * this.state.width_factor, 100 * this.state.height_factor);
    ctx.lineTo(this.state.width, 0);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(660 * this.state.width_factor, y1);
    ctx.lineTo(this.state.width, 100);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(660 * this.state.width_factor, y1);
    ctx.lineTo(this.state.width, 140);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(660 * this.state.width_factor, 770 * this.state.height_factor);
    ctx.lineTo(this.state.width, 240);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(660 * this.state.width_factor, 770 * this.state.height_factor);
    ctx.lineTo(this.state.width, 320);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(660 * this.state.width_factor, y2);
    ctx.lineTo(this.state.width, 415);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(660 * this.state.width_factor, y2);
    ctx.lineTo(this.state.width, 450);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.setLineDash([3]);

    ctx.moveTo(660 * this.state.width_factor, 1440 * this.state.height_factor);
    ctx.lineTo(this.state.width, 550);
    ctx.strokeStyle = "#ff8019";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();



    let totalTop = 0;
    let totalBot = 0;
    let sidepercarr = Object.values(side_perc);
    console.log(side_perc);
    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        totalTop += sidepercarr[i].total;
      } else {
        totalBot += sidepercarr[i].total;
      }
    }
    let val1 = (sidepercarr[0].nm / totalTop).toFixed(2) * 100;
    valuesArray.push(val1.toFixed(0));
    let val2 = (sidepercarr[0].win / totalTop).toFixed(2) * 100;
    valuesArray.push(val2.toFixed(0));
    let val3 = (sidepercarr[0].err / totalTop).toFixed(2) * 100;
    valuesArray.push(val3.toFixed(0));
    let val4 = (sidepercarr[2].nm / totalTop).toFixed(2) * 100;
    valuesArray.push(val4.toFixed(0));
    let val5 = (sidepercarr[2].win / totalTop).toFixed(2) * 100;
    valuesArray.push(val5.toFixed(0));
    let val6 = (sidepercarr[2].err / totalTop).toFixed(2) * 100;
    valuesArray.push(val6.toFixed(0));
    let val7 = (sidepercarr[1].nm / totalTop).toFixed(2) * 100;
    valuesArray.push(val7.toFixed(0));
    let val8 = (sidepercarr[1].win / totalTop).toFixed(2) * 100;
    valuesArray.push(val8.toFixed(0));
    let val9 = (sidepercarr[1].err / totalTop).toFixed(2) * 100;
    valuesArray.push(val9.toFixed(0));
    let val10 = (sidepercarr[3].nm / totalTop).toFixed(2) * 100;
    valuesArray.push(val10.toFixed(0));
    let val11 = (sidepercarr[3].win / totalTop).toFixed(2) * 100;
    valuesArray.push(val11.toFixed(0));
    let val12 = (sidepercarr[3].err / totalTop).toFixed(2) * 100;
    valuesArray.push(val12.toFixed(0));

    let val13 = (sidepercarr[4].nm / totalBot).toFixed(2) * 100;
    valuesArray.push(val13.toFixed(0));
    let val14 = (sidepercarr[4].win / totalBot).toFixed(2) * 100;
    valuesArray.push(val14.toFixed(0));
    let val15 = (sidepercarr[4].err / totalBot).toFixed(2) * 100;
    valuesArray.push(val15.toFixed(0));
    let val16 = (sidepercarr[6].nm / totalBot).toFixed(2) * 100;
    valuesArray.push(val16.toFixed(0));
    let val17 = (sidepercarr[6].win / totalBot).toFixed(2) * 100;
    valuesArray.push(val17.toFixed(0));
    let val18 = (sidepercarr[6].err / totalBot).toFixed(2) * 100;
    valuesArray.push(val18.toFixed(0));
    let val19 = (sidepercarr[5].nm / totalBot).toFixed(2) * 100;
    valuesArray.push(val19.toFixed(0));
    let val20 = (sidepercarr[5].win / totalBot).toFixed(2) * 100;
    valuesArray.push(val20.toFixed(0));
    let val21 = (sidepercarr[5].err / totalBot).toFixed(2) * 100;
    valuesArray.push(val21.toFixed(0));
    let val22 = (sidepercarr[7].nm / totalBot).toFixed(2) * 100;
    valuesArray.push(val22.toFixed(0));
    let val23 = (sidepercarr[7].win / totalBot).toFixed(2) * 100;
    valuesArray.push(val23.toFixed(0));
    let val24 = (sidepercarr[7].err / totalBot).toFixed(2) * 100;
    valuesArray.push(val24.toFixed(0));
    this.props._setvaluesArray(valuesArray);
  };

  sidePercentageChecker = (x, y, oppx, oppy, code, player) => {
    let width_val = 50;
    let height_val = 50;
    let x1 =
      146 * this.state.width_factor +
      514 * this.state.width_factor * (width_val / 100);

    let y1 =
      100 * this.state.height_factor +
      670 * this.state.height_factor * (height_val / 100);

    let y2 =
      770 * this.state.height_factor +
      670 * this.state.height_factor * (height_val / 100);

    let loc_array = [
      [146 * this.state.width_factor, x1, 100 * this.state.height_factor, y1],
      [x1, 660 * this.state.width_factor, 100 * this.state.height_factor, y1],
      [146 * this.state.width_factor, x1, y1, 770 * this.state.height_factor],
      [x1, 660 * this.state.width_factor, y1, 770 * this.state.height_factor],
      [146 * this.state.width_factor, x1, 770 * this.state.height_factor, y2],
      [x1, 660 * this.state.width_factor, 770 * this.state.height_factor, y2],
      [146 * this.state.width_factor, x1, y2, 1440 * this.state.height_factor],
      [x1, 660 * this.state.width_factor, y2, 1440 * this.state.height_factor],
    ];
    let tempArray = [];
    if (player === "top") {
      for (let i = 0; i < 4; i++) {
        if (
          x >= loc_array[i][0] &&
          x < loc_array[i][1] &&
          y >= loc_array[i][2] &&
          y < loc_array[i][3]
        ) {
          tempArray.push(i);
          for (let j = 4; j < 8; j++) {
            if (
              oppx >= loc_array[j][0] &&
              oppx < loc_array[j][1] &&
              oppy >= loc_array[j][2] &&
              oppy < loc_array[j][3]
            ) {
              tempArray.push(j);
              return tempArray;
            }
          }
        }
      }
    } else {
      for (let i = 4; i < 8; i++) {
        if (
          x >= loc_array[i][0] &&
          x < loc_array[i][1] &&
          y >= loc_array[i][2] &&
          y < loc_array[i][3]
        ) {
          tempArray.push(i);
          for (let j = 0; j < 4; j++) {
            if (
              oppx >= loc_array[j][0] &&
              oppx < loc_array[j][1] &&
              oppy >= loc_array[j][2] &&
              oppy < loc_array[j][3]
            ) {
              tempArray.push(j);
              return tempArray;
            }
          }
        }
      }
    }
    return tempArray;
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <canvas
          id="canvas"
          ref={this.canvasRef}
          width={this.state.width}
          height={this.state.height}
          style={{
            backgroundColor: "rgb(63, 63, 63)",
            border: "1px solid rgb(214, 214, 214)",
          }}
          onClick={(e) => {
            this.onClickCourt(e);
          }}
        ></canvas>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stats: state.stats,
  court: state.court,
});

const mapDispatchToProps = (dispatch) => {
  return {
    _UpdateStretch: (x1, y1, x2, y2, player, count) =>
      dispatch(UpdateStretch(x1, y1, x2, y2, player, count)),
    _ResetStretch: () => dispatch(ResetStretch()),
    _UpdateDistance: (x1, y1, x2, y2, player, count) =>
      dispatch(UpdateDistance(x1, y1, x2, y2, player, count)),
    _ResetDistance: () => dispatch(ResetDistance()),
    _UpdateReac: (t1, t2, count, player) =>
      dispatch(UpdateReac(t1, t2, count, player)),
    _AddCount: () => dispatch(AddCount()),
    _ResetCount: () => dispatch(ResetCount()),
    _updateHeight: (h1, h2, player) => dispatch(UpdateHeight(h1, h2, player)),
    _SetSelectedShot: (index) => dispatch(SetSelectedShot(index)),
    _setvaluesArray: (valuesArray) => dispatch(setvaluesArray(valuesArray)),
  };
};

export default connect(null, mapDispatchToProps)(Field);

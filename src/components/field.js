import React, { Component } from "react";
import "./styles.css";
import { PERC_LOCATION_VAL } from "./constants";
import NewWindow from "react-new-window";
import { Player } from "video-react";
import ReactPlayer from "react-player";
import VideoPlayer from "./videoPlayer";

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
        100 * this.state.width_factor,
        770 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.lineTo(
        710 * this.state.width_factor,
        770 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.stroke();

      //horizontal line 2
      ctx.moveTo(
        100 * this.state.width_factor,
        770 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.lineTo(
        710 * this.state.width_factor,
        770 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.stroke();

      //vertical line 1
      ctx.moveTo(
        810 * this.state.width_factor * (this.state.width1_perc / 100),
        100 * this.state.height_factor
      );
      ctx.lineTo(
        810 * this.state.width_factor * (this.state.width1_perc / 100),
        770 * this.state.height_factor
      );
      ctx.stroke();

      //vertical line 2
      ctx.moveTo(
        810 * this.state.width_factor * (this.state.width2_perc / 100),
        100 * this.state.height_factor
      );
      ctx.lineTo(
        810 * this.state.width_factor * (this.state.width2_perc / 100),
        770 * this.state.height_factor
      );
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.strokeStyle = "rgb(173, 173, 10)";
      ctx.setLineDash([4]);
      ctx.lineWidth = 2;

      //horizontal line 1
      ctx.moveTo(
        100 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.lineTo(
        710 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height1_perc / 100)
      );
      ctx.stroke();

      //horizontal line 2
      ctx.moveTo(
        100 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.lineTo(
        710 * this.state.width_factor,
        770 * this.state.height_factor +
          670 * this.state.height_factor * (this.state.height2_perc / 100)
      );
      ctx.stroke();

      //vertical line 1
      ctx.moveTo(
        810 * this.state.width_factor * (this.state.width1_perc / 100),
        770 * this.state.height_factor
      );
      ctx.lineTo(
        810 * this.state.width_factor * (this.state.width1_perc / 100),
        1440 * this.state.height_factor
      );
      ctx.stroke();

      //vertical line 2
      ctx.moveTo(
        810 * this.state.width_factor * (this.state.width2_perc / 100),
        770 * this.state.height_factor
      );
      ctx.lineTo(
        810 * this.state.width_factor * (this.state.width2_perc / 100),
        1440 * this.state.height_factor
      );
      ctx.stroke();
    }
  };

  checkIfLine = (X, Y) => {
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
          console.log("Selected shot", item);
          ctx.stroke();
          ctx.closePath();
          this.canvas_arrow(x1, y1, x2, y2);
          let startTime = (item.contact_timestamp_shuttle / 60).toString();

          let url =
            "https://firebasestorage.googleapis.com/v0/b/badmintonproject-3701e.appspot.com/o/Match16_check.mp4?alt=media&token=39a6ab57-670a-4c9b-8f60-5cbe00c4e9d5#t=";
          let reqUrl = url + startTime;
          this.props.setVideoSettings(startTime);
          break;
        }
      }
    } else {
      if (this.props.patter_length === 1) {
        this.props.pattern_array.map((rally, rally_index) => {
          if (rally.length > 0) {
            rally.map((item, index) => {
              let int_item = parseInt(item);

              if (this.props.shots[rally_index].length > int_item + 1) {
                if (this.props.firstshot) {
                  this.leftShotChecker(
                    this.props.shots[rally_index][int_item],
                    this.props.shots[rally_index][int_item + 1],
                    "rgb(173, 173, 10)",
                    X,
                    Y
                  );
                }
              }
            });
          }
        });
      } else if (this.props.patter_length === 2) {
        this.props.pattern_array.map((rally, rally_index) => {
          if (rally.length > 0) {
            rally.map((item, index) => {
              let int_item = parseInt(item);

              if (this.props.shots[rally_index].length > int_item + 1) {
                if (this.props.firstshot) {
                  this.leftShotChecker(
                    this.props.shots[rally_index][int_item],
                    this.props.shots[rally_index][int_item + 1],
                    "rgb(173, 173, 10)",
                    X,
                    Y
                  );
                }
              }
              if (this.props.shots[rally_index].length > int_item + 2) {
                if (this.props.secondshot) {
                  this.leftShotChecker(
                    this.props.shots[rally_index][int_item + 1],
                    this.props.shots[rally_index][int_item + 2],
                    "green",
                    X,
                    Y
                  );
                }
              }
            });
          }
        });
      } else if (this.props.patter_length === 3) {
        this.props.pattern_array.map((rally, rally_index) => {
          if (rally.length > 0) {
            rally.map((item, index) => {
              let int_item = parseInt(item);

              if (this.props.shots[rally_index].length > int_item + 1) {
                if (this.props.firstshot) {
                  this.leftShotChecker(
                    this.props.shots[rally_index][int_item],
                    this.props.shots[rally_index][int_item + 1],
                    "rgb(173, 173, 10)",
                    X,
                    Y
                  );
                }
              }
              if (this.props.shots[rally_index].length > int_item + 2) {
                if (this.props.secondshot) {
                  this.leftShotChecker(
                    this.props.shots[rally_index][int_item + 1],
                    this.props.shots[rally_index][int_item + 2],
                    "green",
                    X,
                    Y
                  );
                }
              }
              if (this.props.shots[rally_index].length > int_item + 3) {
                if (this.props.thirdshot) {
                  this.leftShotChecker(
                    this.props.shots[rally_index][int_item + 2],
                    this.props.shots[rally_index][int_item + 3],
                    "violet",
                    X,
                    Y
                  );
                }
              }
            });
          }
        });
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
      ctx.strokeStyle = "red";
      ctx.lineWidth = 5;
      if (ctx.isPointInStroke(X, Y)) {
        console.log("shuttle contact", shot);
        console.log("shuttle end", nextShot);
        ctx.stroke();
        ctx.closePath();
        let startTime = (shot.start_frame_shot / 60).toString();
        let endTime = nextShot.end_frame_shot / 60;
        // this.setState({ popUp: true, startTime, endTime });
        let url =
          "https://firebasestorage.googleapis.com/v0/b/badmintonproject-3701e.appspot.com/o/Match16_check.mp4?alt=media&token=39a6ab57-670a-4c9b-8f60-5cbe00c4e9d5#t=";
        let reqUrl = url + startTime;
        this.props.setVideoSettings(startTime);
      }
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
      ctx.strokeStyle = "red";
      ctx.lineWidth = 5;
      if (ctx.isPointInStroke(X, Y)) {
        console.log("shuttle contact", shot);
        console.log("shuttle end", nextShot);
        ctx.stroke();
        ctx.closePath();
        let startTime = (shot.start_frame_shot / 60).toString();
        let endTime = nextShot.end_frame_shot / 60;
        // this.setState({ popUp: true, startTime, endTime });
        let url =
          "https://firebasestorage.googleapis.com/v0/b/badmintonproject-3701e.appspot.com/o/Match16_check.mp4?alt=media&token=39a6ab57-670a-4c9b-8f60-5cbe00c4e9d5#t=";
        let reqUrl = url + startTime;
        this.props.setVideoSettings(startTime);
      }
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

  drawShotIndRightSide = (shot) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    //intial postion of shuttle
    let top_x = shot.location_contact_shuttle[0];
    let top_y = shot.location_contact_shuttle[1];

    //final position of shuttle
    let bot_x = shot.location_end_shuttle[0];
    let bot_y = shot.location_end_shuttle[1];
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
    this.canvas_arrow(
      top_x * this.state.width_factor,
      top_y * this.state.height_factor,
      bot_x * this.state.width_factor,
      bot_y * this.state.height_factor
    );
  };

  clickCheckerFunction = (loc, ind, init_player) => {
    if (this.props.perc) {
      let data_array = Array(18).fill(0);
      let total_length = 0;
      let num_shots_in_segment = 0;
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
                data_array = this.segementChecker(
                  this.props.shots[rally_index][int_item + 1],
                  data_array
                );
                num_shots_in_segment = num_shots_in_segment + n;
              }
            });
          }
        });
        if (player_played_val === init_player) {
          let arr = [];
          let x = (loc[0] + loc[1]) / 2.5;
          let y = (loc[2] + loc[3]) / 1.8;
          if (player_played_val === "bottom") {
            x = (loc[0] + loc[1]) / 2.5;
            y = (loc[2] + loc[3]) / 2;
          }
          arr.push(x);
          arr.push(y);
          this.drawPercentage(
            total_length,
            num_shots_in_segment,
            init_player,
            arr
          );
          if (num_shots_in_segment > 0) {
            this.drawPercentagePrecentageOpposite(
              total_length,
              data_array,
              init_player
            );
          }
        }
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
                data_array = this.segementChecker(
                  this.props.shots[rally_index][int_item + 2],
                  data_array
                );
                num_shots_in_segment = num_shots_in_segment + n;
              }
            });
          }
        });
        if (player_played_val === init_player) {
          let arr = [];
          let x = (loc[0] + loc[1]) / 2.5;
          let y = (loc[2] + loc[3]) / 1.8;
          if (player_played_val === "bottom") {
            x = (loc[0] + loc[1]) / 2.5;
            y = (loc[2] + loc[3]) / 2;
          }
          arr.push(x);
          arr.push(y);
          this.drawPercentage(
            total_length,
            num_shots_in_segment,
            player_played_val,
            arr
          );
          if (num_shots_in_segment > 0) {
            this.drawPercentagePrecentageOpposite(
              total_length,
              data_array,
              player_played_val
            );
          }
        }
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
                data_array = this.segementChecker(
                  this.props.shots[rally_index][int_item + 3],
                  data_array
                );
                num_shots_in_segment = num_shots_in_segment + n;
              }
            });
          }
        });
        if (player_played_val === init_player) {
          let arr = [];
          let x = (loc[0] + loc[1]) / 2.5;
          let y = (loc[2] + loc[3]) / 1.8;
          if (player_played_val === "bottom") {
            x = (loc[0] + loc[1]) / 2.5;
            y = (loc[2] + loc[3]) / 2;
          }
          arr.push(x);
          arr.push(y);
          this.drawPercentage(
            total_length,
            num_shots_in_segment,
            player_played_val,
            arr
          );
          if (num_shots_in_segment > 0) {
            this.drawPercentagePrecentageOpposite(
              total_length,
              data_array,
              player_played_val
            );
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
    ctx.clearRect(0, 0, this.state.width, this.state.height);
    this.drawCourt();
    if (this.props.perc || this.props.arrows) {
      if (this.props.percFirstShot || this.props.percThirdShot) {
        this.drawSegments("top");
      } else {
        this.drawSegments("bottom");
      }
    }
    let e_doc = document.getElementById("canvas");
    let elemLeft = e_doc.offsetLeft;
    let elemTop = e_doc.offsetTop;
    let x = e.pageX - elemLeft;
    let y = e.pageY - elemTop;
    this.setState({ pointSelection: true });
    if (this.props.indShot) {
      this.checkIfLine(x, y);
    } else {
      if (
        x >= 100 * this.state.width_factor &&
        x <= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y >= 100 * this.state.height_factor &&
        y <= 770 * this.state.height_factor * (this.state.height1_perc / 100)
      ) {
        this.highlightSegment([
          100 * this.state.width_factor,
          810 * this.state.width_factor * (this.state.width1_perc / 100) -
            100 * this.state.width_factor,
          100 * this.state.height_factor,
          770 * this.state.height_factor * (this.state.height1_perc / 100) -
            100 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            100 * this.state.width_factor,
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            100 * this.state.height_factor,
            770 * this.state.height_factor * (this.state.height1_perc / 100),
          ],
          0,
          "top"
        );
      } else if (
        x <= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x >= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y >= 100 * this.state.height_factor &&
        y <= 770 * this.state.height_factor * (this.state.height1_perc / 100)
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width1_perc / 100),
          810 * this.state.width_factor * (this.state.width2_perc / 100) -
            810 * this.state.width_factor * (this.state.width1_perc / 100),
          100 * this.state.height_factor,
          770 * this.state.height_factor * (this.state.height1_perc / 100) -
            100 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            100 * this.state.height_factor,
            770 * this.state.height_factor * (this.state.height1_perc / 100),
          ],
          1,
          "top"
        );
      } else if (
        x >= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x <= 710 * this.state.width_factor &&
        y >= 100 * this.state.height_factor &&
        y <= 770 * this.state.height_factor * (this.state.height1_perc / 100)
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width2_perc / 100),
          710 * this.state.width_factor -
            810 * this.state.width_factor * (this.state.width2_perc / 100),
          100 * this.state.height_factor,
          770 * this.state.height_factor * (this.state.height1_perc / 100) -
            100 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            710 * this.state.width_factor,
            100 * this.state.height_factor,
            770 * this.state.height_factor * (this.state.height1_perc / 100),
          ],
          2,
          "top"
        );
      } else if (
        x >= 100 * this.state.width_factor &&
        x <= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y <= 770 * this.state.height_factor * (this.state.height2_perc / 100) &&
        y >= 770 * this.state.height_factor * (this.state.height1_perc / 100)
      ) {
        this.highlightSegment([
          100 * this.state.width_factor,
          810 * this.state.width_factor * (this.state.width1_perc / 100) -
            100 * this.state.width_factor,
          770 * this.state.height_factor * (this.state.height1_perc / 100),
          770 * this.state.height_factor * (this.state.height2_perc / 100) -
            770 * this.state.height_factor * (this.state.height1_perc / 100),
        ]);
        this.clickCheckerFunction(
          [
            100 * this.state.width_factor,
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            770 * this.state.height_factor * (this.state.height1_perc / 100),
            770 * this.state.height_factor * (this.state.height2_perc / 100),
          ],
          3,
          "top"
        );
      } else if (
        x <= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x >= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y <= 770 * this.state.height_factor * (this.state.height2_perc / 100) &&
        y >= 770 * this.state.height_factor * (this.state.height1_perc / 100)
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width1_perc / 100),
          810 * this.state.width_factor * (this.state.width2_perc / 100) -
            810 * this.state.width_factor * (this.state.width1_perc / 100),
          770 * this.state.height_factor * (this.state.height1_perc / 100),
          770 * this.state.height_factor * (this.state.height2_perc / 100) -
            770 * this.state.height_factor * (this.state.height1_perc / 100),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            770 * this.state.height_factor * (this.state.height1_perc / 100),
            770 * this.state.height_factor * (this.state.height2_perc / 100),
          ],
          4,
          "top"
        );
      } else if (
        x >= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x <= 710 * this.state.width_factor &&
        y <= 770 * this.state.height_factor * (this.state.height2_perc / 100) &&
        y >= 770 * this.state.height_factor * (this.state.height1_perc / 100)
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width2_perc / 100),
          710 * this.state.width_factor -
            810 * this.state.width_factor * (this.state.width2_perc / 100),
          770 * this.state.height_factor * (this.state.height1_perc / 100),
          770 * this.state.height_factor * (this.state.height2_perc / 100) -
            770 * this.state.height_factor * (this.state.height1_perc / 100),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            710 * this.state.width_factor,
            770 * this.state.height_factor * (this.state.height1_perc / 100),
            770 * this.state.height_factor * (this.state.height2_perc / 100),
          ],
          5,
          "top"
        );
      } else if (
        x >= 100 * this.state.width_factor &&
        x <= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y >= 770 * this.state.height_factor * (this.state.height2_perc / 100) &&
        y <= 770 * this.state.height_factor
      ) {
        this.highlightSegment([
          100 * this.state.width_factor,
          810 * this.state.width_factor * (this.state.width1_perc / 100) -
            100 * this.state.width_factor,
          770 * this.state.height_factor * (this.state.height2_perc / 100),
          770 * this.state.height_factor -
            770 * this.state.height_factor * (this.state.height2_perc / 100),
        ]);
        this.clickCheckerFunction(
          [
            100 * this.state.width_factor,
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            770 * this.state.height_factor * (this.state.height2_perc / 100),
            770 * this.state.height_factor,
          ],
          6,
          "top"
        );
      } else if (
        x <= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x >= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y >= 770 * this.state.height_factor * (this.state.height2_perc / 100) &&
        y <= 770 * this.state.height_factor
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width1_perc / 100),
          810 * this.state.width_factor * (this.state.width2_perc / 100) -
            810 * this.state.width_factor * (this.state.width1_perc / 100),
          770 * this.state.height_factor * (this.state.height2_perc / 100),
          770 * this.state.height_factor -
            770 * this.state.height_factor * (this.state.height2_perc / 100),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            770 * this.state.height_factor * (this.state.height2_perc / 100),
            770 * this.state.height_factor,
          ],
          7,
          "top"
        );
      } else if (
        x >= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x <= 710 * this.state.width_factor &&
        y >= 770 * this.state.height_factor * (this.state.height2_perc / 100) &&
        y <= 770 * this.state.height_factor
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width2_perc / 100),
          710 * this.state.width_factor -
            810 * this.state.width_factor * (this.state.width2_perc / 100),
          770 * this.state.height_factor * (this.state.height2_perc / 100),
          770 * this.state.height_factor -
            770 * this.state.height_factor * (this.state.height2_perc / 100),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            710 * this.state.width_factor,
            770 * this.state.height_factor * (this.state.height2_perc / 100),
            770 * this.state.height_factor,
          ],
          8,
          "top"
        );
      } else if (
        x >= 100 * this.state.width_factor &&
        x <= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y >= 770 * this.state.height_factor
      ) {
        this.highlightSegment([
          100 * this.state.width_factor,
          810 * this.state.width_factor * (this.state.width1_perc / 100) -
            100 * this.state.width_factor,
          770 * this.state.height_factor,
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        ]);
        this.clickCheckerFunction(
          [
            100 * this.state.width_factor,
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            770 * this.state.height_factor,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
          ],
          9,
          "bottom"
        );
      } else if (
        x <= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x >= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y >= 770 * this.state.height_factor
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width1_perc / 100),
          810 * this.state.width_factor * (this.state.width2_perc / 100) -
            810 * this.state.width_factor * (this.state.width1_perc / 100),
          770 * this.state.height_factor,
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            770 * this.state.height_factor,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
          ],
          10,
          "bottom"
        );
      } else if (
        x >= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x <= 710 * this.state.width_factor &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y >= 770 * this.state.height_factor
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width2_perc / 100),
          710 * this.state.width_factor -
            810 * this.state.width_factor * (this.state.width2_perc / 100),
          770 * this.state.height_factor,
          670 * this.state.height_factor * (this.state.height1_perc / 100),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            710 * this.state.width_factor,
            770 * this.state.height_factor,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
          ],
          11,
          "bottom"
        );
      } else if (
        x >= 100 * this.state.width_factor &&
        x <= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.highlightSegment([
          100 * this.state.width_factor,
          810 * this.state.width_factor * (this.state.width1_perc / 100) -
            100 * this.state.width_factor,
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100),
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100) -
            (770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100)),
        ]);
        this.clickCheckerFunction(
          [
            100 * this.state.width_factor,
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
          ],
          12,
          "bottom"
        );
      } else if (
        x <= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x >= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width1_perc / 100),
          810 * this.state.width_factor * (this.state.width2_perc / 100) -
            810 * this.state.width_factor * (this.state.width1_perc / 100),
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100),
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100) -
            (770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100)),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
          ],
          13,
          "bottom"
        );
      } else if (
        x >= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x <= 710 * this.state.width_factor &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100) &&
        y <=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width2_perc / 100),
          710 * this.state.width_factor -
            810 * this.state.width_factor * (this.state.width2_perc / 100),
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height1_perc / 100),
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100) -
            (770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100)),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            710 * this.state.width_factor,
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height1_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
          ],
          14,
          "bottom"
        );
      } else if (
        x >= 100 * this.state.width_factor &&
        x <= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y <= 1440 * this.state.height_factor &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.highlightSegment([
          100 * this.state.width_factor,
          810 * this.state.width_factor * (this.state.width1_perc / 100) -
            100 * this.state.width_factor,
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100),
          1440 * this.state.height_factor -
            (770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100)),
        ]);
        this.clickCheckerFunction(
          [
            100 * this.state.width_factor,
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
            1440 * this.state.height_factor,
          ],
          15,
          "bottom"
        );
      } else if (
        x <= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x >= 810 * this.state.width_factor * (this.state.width1_perc / 100) &&
        y <= 1440 * this.state.height_factor &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width1_perc / 100),
          810 * this.state.width_factor * (this.state.width2_perc / 100) -
            810 * this.state.width_factor * (this.state.width1_perc / 100),
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100),
          1440 * this.state.height_factor -
            (770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100)),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width1_perc / 100),
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100),
            1440 * this.state.height_factor,
          ],
          16,
          "bottom"
        );
      } else if (
        x >= 810 * this.state.width_factor * (this.state.width2_perc / 100) &&
        x <= 710 * this.state.width_factor &&
        y <= 1440 * this.state.height_factor &&
        y >=
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100)
      ) {
        this.highlightSegment([
          810 * this.state.width_factor * (this.state.width2_perc / 100),
          710 * this.state.width_factor -
            810 * this.state.width_factor * (this.state.width2_perc / 100),
          770 * this.state.height_factor +
            670 * this.state.height_factor * (this.state.height2_perc / 100),
          1440 * this.state.height_factor -
            (770 * this.state.height_factor +
              670 * this.state.height_factor * (this.state.height2_perc / 100)),
        ]);
        this.clickCheckerFunction(
          [
            810 * this.state.width_factor * (this.state.width2_perc / 100),
            710 * this.state.width_factor,
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

    if (
      x >= 100 * this.state.width_factor &&
      x <= 146 * this.state.width_factor &&
      y >= 100 * this.state.height_factor &&
      y <= 176 * this.state.height_factor
    ) {
      data_array[0] = data_array[0] + 1;
    } else if (
      x <= 660 * this.state.width_factor &&
      x >= 146 * this.state.width_factor &&
      y >= 100 * this.state.height_factor &&
      y <= 176 * this.state.height_factor
    ) {
      data_array[1] = data_array[1] + 1;
    } else if (
      x >= 660 * this.state.width_factor &&
      x <= 710 * this.state.width_factor &&
      y >= 100 * this.state.height_factor &&
      y <= 176 * this.state.height_factor
    ) {
      data_array[2] = data_array[2] + 1;
    } else if (
      x >= 100 * this.state.width_factor &&
      x <= 146 * this.state.width_factor &&
      y <= 568 * this.state.height_factor &&
      y >= 176 * this.state.height_factor
    ) {
      data_array[3] = data_array[3] + 1;
    } else if (
      x <= 660 * this.state.width_factor &&
      x >= 146 * this.state.width_factor &&
      y <= 568 * this.state.height_factor &&
      y >= 176 * this.state.height_factor
    ) {
      data_array[4] = data_array[4] + 1;
    } else if (
      x >= 660 * this.state.width_factor &&
      x <= 710 * this.state.width_factor &&
      y <= 568 * this.state.height_factor &&
      y >= 176 * this.state.height_factor
    ) {
      data_array[5] = data_array[5] + 1;
    } else if (
      x >= 100 * this.state.width_factor &&
      x <= 146 * this.state.width_factor &&
      y >= 568 * this.state.height_factor &&
      y <= 770 * this.state.height_factor
    ) {
      data_array[6] = data_array[6] + 1;
    } else if (
      x <= 660 * this.state.width_factor &&
      x >= 146 * this.state.width_factor &&
      y >= 568 * this.state.height_factor &&
      y <= 770 * this.state.height_factor
    ) {
      data_array[7] = data_array[7] + 1;
    } else if (
      x >= 660 * this.state.width_factor &&
      x <= 710 * this.state.width_factor &&
      y >= 568 * this.state.height_factor &&
      y <= 770 * this.state.height_factor
    ) {
      data_array[8] = data_array[8] + 1;
    } else if (
      x >= 100 * this.state.width_factor &&
      x <= 146 * this.state.width_factor &&
      y <= 968 * this.state.height_factor &&
      y >= 770 * this.state.height_factor
    ) {
      data_array[9] = data_array[9] + 1;
    } else if (
      x <= 660 * this.state.width_factor &&
      x >= 146 * this.state.width_factor &&
      y <= 968 * this.state.height_factor &&
      y >= 770 * this.state.height_factor
    ) {
      data_array[10] = data_array[10] + 1;
    } else if (
      x >= 660 * this.state.width_factor &&
      x <= 710 * this.state.width_factor &&
      y <= 968 * this.state.height_factor &&
      y >= 770 * this.state.height_factor
    ) {
      data_array[11] = data_array[11] + 1;
    } else if (
      x >= 100 * this.state.width_factor &&
      x <= 146 * this.state.width_factor &&
      y >= 968 * this.state.height_factor &&
      y <= 1360 * this.state.height_factor
    ) {
      data_array[12] = data_array[12] + 1;
    } else if (
      x <= 660 * this.state.width_factor &&
      x >= 146 * this.state.width_factor &&
      y >= 968 * this.state.height_factor &&
      y <= 1360 * this.state.height_factor
    ) {
      data_array[13] = data_array[13] + 1;
    } else if (
      x >= 660 * this.state.width_factor &&
      x <= 710 * this.state.width_factor &&
      y >= 968 * this.state.height_factor &&
      y <= 1360 * this.state.height_factor
    ) {
      data_array[14] = data_array[14] + 1;
    } else if (
      x >= 100 * this.state.width_factor &&
      x <= 146 * this.state.width_factor &&
      y <= 1440 * this.state.height_factor &&
      y >= 1360 * this.state.height_factor
    ) {
      data_array[15] = data_array[15] + 1;
    } else if (
      x <= 660 * this.state.width_factor &&
      x >= 146 * this.state.width_factor &&
      y <= 1440 * this.state.height_factor &&
      y >= 1360 * this.state.height_factor
    ) {
      data_array[16] = data_array[16] + 1;
    } else if (
      x >= 660 * this.state.width_factor &&
      x <= 710 * this.state.width_factor &&
      y <= 1440 * this.state.height_factor &&
      y >= 1360 * this.state.height_factor
    ) {
      data_array[17] = data_array[17] + 1;
    }
    return data_array;
  };

  componentDidMount() {
    this.drawCourt();
  }

  drawShot(shot, nextShot, color_val, nextProps) {
    if (shot.player_played === "top") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");

      //intial postion of shuttle
      let top_x = (shot.position_top[0][0] + shot.position_top[1][0]) / 2;
      let top_y = (shot.position_top[0][1] + shot.position_top[1][1]) / 2;

      //intial midpoint of bottom player
      let bot_x_intial =
        (shot.position_bottom[0][0] + shot.position_bottom[1][0]) / 2;
      let bot_y_intial =
        (shot.position_bottom[0][1] + shot.position_bottom[1][1]) / 2;

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
        ctx.strokeStyle = "teal";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
      }
    } else if (shot.player_played === "bottom") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");

      //intial postion of shuttle
      let bot_x = (shot.position_bottom[0][0] + shot.position_bottom[1][0]) / 2;
      let bot_y = (shot.position_bottom[0][1] + shot.position_bottom[1][1]) / 2;

      //intial midpoint of bottom player
      let top_x_intial =
        (shot.position_top[0][0] + shot.position_top[1][0]) / 2;
      let top_y_intial =
        (shot.position_top[0][1] + shot.position_top[1][1]) / 2;

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
        ctx.strokeStyle = "rgb(255, 154, 71)";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
      }
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

  drawPercentage(total_length, num_shots_in_segment, player_played, location) {
    if (player_played === "top") {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");
      let perc_val =
        ((num_shots_in_segment / total_length) * 100).toFixed(0).toString() +
        "%";

      ctx.beginPath();
      ctx.fillStyle = "rgb(255, 154, 71)";
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
      ctx.fillStyle = "teal";
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
    if (player_played === "top") {
      for (let i = 9; i < 18; i++) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        let perc_val =
          ((data_array[i] / total_length) * 100).toFixed(0).toString() + "%";
        let location = PERC_LOCATION_VAL[i];

        ctx.beginPath();
        ctx.fillStyle = "teal";
        ctx.font = "bold 12px Arial";
        ctx.fillText(
          perc_val,
          location[0] * this.state.width_factor,
          location[1] * this.state.height_factor
        );
        ctx.closePath();
      }
    } else if (player_played === "bottom") {
      for (let i = 0; i < 9; i++) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        let perc_val =
          ((data_array[i] / total_length) * 100).toFixed(0).toString() + "%";
        let location = PERC_LOCATION_VAL[i];

        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 154, 71)";
        ctx.font = "bold 12px Arial";
        ctx.fillText(
          perc_val,
          location[0] * this.state.width_factor,
          location[1] * this.state.height_factor
        );
        ctx.closePath();
      }
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

  componentWillReceiveProps(nextProps) {
    let shot_count = 0;
    this.setState({
      height1_perc: nextProps.height1_perc,
      height2_perc: nextProps.height2_perc,
      width1_perc: nextProps.width1_perc,
      width2_perc: nextProps.width2_perc,
    });
    if (nextProps !== this.props) {
      if (nextProps.isRightSide) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.drawCourt();
        if (nextProps.perc || nextProps.arrows) {
          if (nextProps.percFirstShot || nextProps.percThirdShot) {
            this.drawSegments("top");
          } else {
            this.drawSegments("bottom");
          }
        }
        nextProps.rightSideData.map((item, index) => {
          this.drawShotIndRightSide(item);
        });
      } else {
        if (nextProps.patter_length !== -1) {
          const canvas = this.canvasRef.current;
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, this.state.width, this.state.height);
          this.drawCourt();
          if (nextProps.perc || nextProps.arrows) {
            if (nextProps.percFirstShot || nextProps.percThirdShot) {
              this.drawSegments("top");
            } else {
              this.drawSegments("bottom");
            }
          }
          if (nextProps.patter_length === 1) {
            nextProps.pattern_array.map((rally, rally_index) => {
              if (rally.length > 0) {
                rally.map((item, index) => {
                  if (
                    shot_count >= nextProps.fromShot &&
                    shot_count <= nextProps.toShot
                  ) {
                    let int_item = parseInt(item);
                    this.drawFeet(
                      nextProps.shots[rally_index][int_item],
                      0,
                      nextProps
                    );
                    if (nextProps.shots[rally_index].length > int_item + 1) {
                      this.drawFeet(
                        nextProps.shots[rally_index][int_item + 1],
                        1,
                        nextProps
                      );
                      if (nextProps.firstshot) {
                        this.drawShot(
                          nextProps.shots[rally_index][int_item],
                          nextProps.shots[rally_index][int_item + 1],
                          "rgb(173, 173, 10)",
                          nextProps
                        );
                      }
                    }
                  }
                  shot_count += 1;
                });
              }
            });
          } else if (nextProps.patter_length === 2) {
            nextProps.pattern_array.map((rally, rally_index) => {
              if (rally.length > 0) {
                rally.map((item, index) => {
                  if (
                    shot_count >= nextProps.fromShot &&
                    shot_count <= nextProps.toShot
                  ) {
                    let int_item = parseInt(item);
                    this.drawFeet(
                      nextProps.shots[rally_index][int_item],
                      0,
                      nextProps
                    );
                    if (nextProps.shots[rally_index].length > int_item + 1) {
                      this.drawFeet(
                        nextProps.shots[rally_index][int_item + 1],
                        0,
                        nextProps
                      );
                      if (nextProps.firstshot) {
                        this.drawShot(
                          nextProps.shots[rally_index][int_item],
                          nextProps.shots[rally_index][int_item + 1],
                          "rgb(173, 173, 10)",
                          nextProps
                        );
                      }
                    }
                    if (nextProps.shots[rally_index].length > int_item + 2) {
                      this.drawFeet(
                        nextProps.shots[rally_index][int_item + 2],
                        1,
                        nextProps
                      );
                      if (nextProps.secondshot) {
                        this.drawShot(
                          nextProps.shots[rally_index][int_item + 1],
                          nextProps.shots[rally_index][int_item + 2],
                          "green",
                          nextProps
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
                    let int_item = parseInt(item);
                    this.drawFeet(
                      nextProps.shots[rally_index][int_item],
                      0,
                      nextProps
                    );
                    if (nextProps.shots[rally_index].length > int_item + 1) {
                      this.drawFeet(
                        nextProps.shots[rally_index][int_item + 1],
                        0,
                        nextProps
                      );
                      if (nextProps.firstshot) {
                        this.drawShot(
                          nextProps.shots[rally_index][int_item],
                          nextProps.shots[rally_index][int_item + 1],
                          "rgb(173, 173, 10)",
                          nextProps
                        );
                      }
                    }
                    if (nextProps.shots[rally_index].length > int_item + 2) {
                      this.drawFeet(
                        nextProps.shots[rally_index][int_item + 2],
                        0,
                        nextProps
                      );
                      if (nextProps.secondshot) {
                        this.drawShot(
                          nextProps.shots[rally_index][int_item + 1],
                          nextProps.shots[rally_index][int_item + 2],
                          "green",
                          nextProps
                        );
                      }
                    }
                    if (nextProps.shots[rally_index].length > int_item + 3) {
                      this.drawFeet(
                        nextProps.shots[rally_index][int_item + 3],
                        1,
                        nextProps
                      );
                      if (nextProps.thirdshot) {
                        this.drawShot(
                          nextProps.shots[rally_index][int_item + 2],
                          nextProps.shots[rally_index][int_item + 3],
                          "violet",
                          nextProps
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
    }
  }

  drawFeet = (shot, index_val, nextProps) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
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
      }
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
      }
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
      }
    }
  };

  render() {
    return (
      <div>
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
        {this.state.popUp ? (
          <NewWindow
            onUnload={() => {
              this.setState({ popUp: false });
            }}
          >
            <VideoPlayer
              startTime={this.state.startTime}
              endTime={this.state.endTime}
            />
          </NewWindow>
        ) : null}
      </div>
    );
  }
}

export default Field;

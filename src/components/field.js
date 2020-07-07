import React, { Component } from "react";
import "./styles.css";
import { PERC_LOCATION_VAL } from "./constants";

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 610 * 0.44,
      width_factor: 0.44,
      height: 1340 * 0.44,
      height_factor: 0.44,
      current_segment: -1,
      pointSelection: false,
    };

    this.canvasRef = React.createRef();
  }

  checkIfLine = (X, Y) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (this.props.isRightSide) {
      for (let item of this.props.rightSideData) {
        let x1 = item.location_contact_shuttle[0] * this.state.width_factor;
        let y1 = item.location_contact_shuttle[1] * this.state.height_factor;
        let x2 = item.location_end_shuttle[0] * this.state.width_factor;
        let y2 = item.location_end_shuttle[1] * this.state.height_factor;
        console.log("thids", X, Y);
        console.log(x1, y1, x2, y2);
        ctx.beginPath();
        ctx.moveTo(x1, y1); // start of line
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        if (ctx.isPointInStroke(X, Y)) {
          console.log("Selected shot", item);
          ctx.stroke();
          ctx.closePath();
          this.canvas_arrow(x1, y1, x2, y2);
          break;
        }
      }
    }
  };

  drawCourt = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "rgb(214, 214, 214)";
    ctx.setLineDash([0]);
    ctx.lineWidth = 1;

    //draw long service line for doubles
    ctx.moveTo(0, 76 * this.state.height_factor);
    ctx.lineTo(this.state.width, 76 * this.state.height_factor);
    ctx.stroke();

    //draw short service line
    ctx.moveTo(0, 468 * this.state.height_factor);
    ctx.lineTo(this.state.width, 468 * this.state.height_factor);
    ctx.stroke();

    //draw net line
    ctx.moveTo(0, 670 * this.state.height_factor);
    ctx.lineTo(this.state.width, 670 * this.state.height_factor);
    ctx.stroke();

    //draw short service line for bottom half
    ctx.moveTo(0, 868 * this.state.height_factor);
    ctx.lineTo(this.state.width, 868 * this.state.height_factor);
    ctx.stroke();

    //draw long service line for doubles for bottom half
    ctx.moveTo(0, 1260 * this.state.height_factor);
    ctx.lineTo(this.state.width, 1260 * this.state.height_factor);
    ctx.stroke();

    //draw side line for singles on left side
    ctx.moveTo(46 * this.state.width_factor, 0);
    ctx.lineTo(46 * this.state.width_factor, this.state.height);
    ctx.stroke();

    //draw side line for singles on right side
    ctx.moveTo(560 * this.state.width_factor, 0);
    ctx.lineTo(560 * this.state.width_factor, this.state.height);
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
          this.drawPercentage(
            total_length,
            num_shots_in_segment,
            init_player,
            PERC_LOCATION_VAL[ind]
          );
          if (num_shots_in_segment > 0) {
            this.drawPercentagePrecentageOpposite(
              total_length,
              data_array,
              init_player
            );
          }
        }
      } else if (this.props.percSecondShot && this.props.patter_length != 1) {
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
          this.drawPercentage(
            total_length,
            num_shots_in_segment,
            player_played_val,
            PERC_LOCATION_VAL[ind]
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
          this.drawPercentage(
            total_length,
            num_shots_in_segment,
            player_played_val,
            PERC_LOCATION_VAL[ind]
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

                if (n == 1) {
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
      } else if (this.props.percSecondShot && this.props.patter_length != 1) {
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

                if (n == 1) {
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

                if (n == 1) {
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
        x >= 0 &&
        x <= 46 * this.state.width_factor &&
        y >= 0 &&
        y <= 76 * this.state.height_factor
      ) {
        this.highlightSegment([
          0 * this.state.width_factor,
          46 * this.state.width_factor,
          0 * this.state.height_factor,
          76 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            0 * this.state.width_factor,
            46 * this.state.width_factor,
            0 * this.state.height_factor,
            76 * this.state.height_factor,
          ],
          0,
          "top"
        );
      } else if (
        x <= 560 * this.state.width_factor &&
        x >= 46 * this.state.width_factor &&
        y >= 0 &&
        y <= 76 * this.state.height_factor
      ) {
        this.highlightSegment([
          46 * this.state.width_factor,
          515 * this.state.width_factor,
          0 * this.state.height_factor,
          76 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            46 * this.state.width_factor,
            560 * this.state.width_factor,
            0 * this.state.height_factor,
            76 * this.state.height_factor,
          ],
          1,
          "top"
        );
      } else if (
        x >= 560 * this.state.width_factor &&
        x <= this.state.width &&
        y >= 0 &&
        y <= 76 * this.state.height_factor
      ) {
        this.highlightSegment([
          560 * this.state.width_factor,
          this.state.width,
          0 * this.state.height_factor,
          76 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            560 * this.state.width_factor,
            this.state.width,
            0 * this.state.height_factor,
            76 * this.state.height_factor,
          ],
          2,
          "top"
        );
      } else if (
        x >= 0 &&
        x <= 46 * this.state.width_factor &&
        y <= 468 * this.state.height_factor &&
        y >= 76 * this.state.height_factor
      ) {
        this.highlightSegment([
          0 * this.state.width_factor,
          46 * this.state.width_factor,
          76 * this.state.height_factor,
          395 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            0 * this.state.width_factor,
            46 * this.state.width_factor,
            76 * this.state.height_factor,
            468 * this.state.height_factor,
          ],
          3,
          "top"
        );
      } else if (
        x <= 560 * this.state.width_factor &&
        x >= 46 * this.state.width_factor &&
        y <= 468 * this.state.height_factor &&
        y >= 76 * this.state.height_factor
      ) {
        this.highlightSegment([
          46 * this.state.width_factor,
          515 * this.state.width_factor,
          76 * this.state.height_factor,
          395 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            46 * this.state.width_factor,
            560 * this.state.width_factor,
            76 * this.state.height_factor,
            468 * this.state.height_factor,
          ],
          4,
          "top"
        );
      } else if (
        x >= 560 * this.state.width_factor &&
        x <= this.state.width &&
        y <= 468 * this.state.height_factor &&
        y >= 76 * this.state.height_factor
      ) {
        this.highlightSegment([
          560 * this.state.width_factor,
          this.state.width,
          76 * this.state.height_factor,
          395 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            560 * this.state.width_factor,
            this.state.width,
            76 * this.state.height_factor,
            468 * this.state.height_factor,
          ],
          5,
          "top"
        );
      } else if (
        x >= 0 &&
        x <= 46 * this.state.width_factor &&
        y >= 468 * this.state.height_factor &&
        y <= 670 * this.state.height_factor
      ) {
        this.highlightSegment([
          0 * this.state.width_factor,
          46 * this.state.width_factor,
          468 * this.state.height_factor,
          200 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            0 * this.state.width_factor,
            46 * this.state.width_factor,
            468 * this.state.height_factor,
            670 * this.state.height_factor,
          ],
          6,
          "top"
        );
      } else if (
        x <= 560 * this.state.width_factor &&
        x >= 46 * this.state.width_factor &&
        y >= 468 * this.state.height_factor &&
        y <= 670 * this.state.height_factor
      ) {
        this.highlightSegment([
          46 * this.state.width_factor,
          515 * this.state.width_factor,
          468 * this.state.height_factor,
          200 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            46 * this.state.width_factor,
            560 * this.state.width_factor,
            468 * this.state.height_factor,
            670 * this.state.height_factor,
          ],
          7,
          "top"
        );
      } else if (
        x >= 560 * this.state.width_factor &&
        x <= this.state.width &&
        y >= 468 * this.state.height_factor &&
        y <= 670 * this.state.height_factor
      ) {
        this.highlightSegment([
          560 * this.state.width_factor,
          this.state.width,
          468 * this.state.height_factor,
          200 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            560 * this.state.width_factor,
            this.state.width,
            468 * this.state.height_factor,
            670 * this.state.height_factor,
          ],
          8,
          "top"
        );
      } else if (
        x >= 0 &&
        x <= 46 * this.state.width_factor &&
        y <= 868 * this.state.height_factor &&
        y >= 670 * this.state.height_factor
      ) {
        this.highlightSegment([
          0 * this.state.width_factor,
          46 * this.state.width_factor,
          670 * this.state.height_factor,
          200 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            0 * this.state.width_factor,
            46 * this.state.width_factor,
            670 * this.state.height_factor,
            868 * this.state.height_factor,
          ],
          9,
          "bottom"
        );
      } else if (
        x <= 560 * this.state.width_factor &&
        x >= 46 * this.state.width_factor &&
        y <= 868 * this.state.height_factor &&
        y >= 670 * this.state.height_factor
      ) {
        this.highlightSegment([
          46 * this.state.width_factor,
          515 * this.state.width_factor,
          670 * this.state.height_factor,
          200 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            46 * this.state.width_factor,
            560 * this.state.width_factor,
            670 * this.state.height_factor,
            868 * this.state.height_factor,
          ],
          10,
          "bottom"
        );
      } else if (
        x >= 560 * this.state.width_factor &&
        x <= this.state.width &&
        y <= 868 * this.state.height_factor &&
        y >= 670 * this.state.height_factor
      ) {
        this.highlightSegment([
          560 * this.state.width_factor,
          this.state.width,
          670 * this.state.height_factor,
          200 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            560 * this.state.width_factor,
            this.state.width,
            670 * this.state.height_factor,
            868 * this.state.height_factor,
          ],
          11,
          "bottom"
        );
      } else if (
        x >= 0 &&
        x <= 46 * this.state.width_factor &&
        y >= 868 * this.state.height_factor &&
        y <= 1260 * this.state.height_factor
      ) {
        this.highlightSegment([
          0 * this.state.width_factor,
          46 * this.state.width_factor,
          868 * this.state.height_factor,
          395 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            0 * this.state.width_factor,
            46 * this.state.width_factor,
            868 * this.state.height_factor,
            1260 * this.state.height_factor,
          ],
          12,
          "bottom"
        );
      } else if (
        x <= 560 * this.state.width_factor &&
        x >= 46 * this.state.width_factor &&
        y >= 868 * this.state.height_factor &&
        y <= 1260 * this.state.height_factor
      ) {
        this.highlightSegment([
          46 * this.state.width_factor,
          515 * this.state.width_factor,
          868 * this.state.height_factor,
          395 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            46 * this.state.width_factor,
            560 * this.state.width_factor,
            868 * this.state.height_factor,
            1260 * this.state.height_factor,
          ],
          13,
          "bottom"
        );
      } else if (
        x >= 560 * this.state.width_factor &&
        x <= this.state.width &&
        y >= 868 * this.state.height_factor &&
        y <= 1260 * this.state.height_factor
      ) {
        this.highlightSegment([
          560 * this.state.width_factor,
          this.state.width,
          868 * this.state.height_factor,
          395 * this.state.height_factor,
        ]);
        this.clickCheckerFunction(
          [
            560 * this.state.width_factor,
            this.state.width,
            868 * this.state.height_factor,
            1260 * this.state.height_factor,
          ],
          14,
          "bottom"
        );
      } else if (
        x >= 0 &&
        x <= 46 * this.state.width_factor &&
        y <= this.state.height &&
        y >= 1260 * this.state.height_factor
      ) {
        this.highlightSegment([
          0 * this.state.width_factor,
          46 * this.state.width_factor,
          1260 * this.state.height_factor,
          this.state.height,
        ]);
        this.clickCheckerFunction(
          [
            0 * this.state.width_factor,
            46 * this.state.width_factor,
            1260 * this.state.height_factor,
            this.state.height,
          ],
          15,
          "bottom"
        );
      } else if (
        x <= 560 * this.state.width_factor &&
        x >= 46 * this.state.width_factor &&
        y <= this.state.height &&
        y >= 1260 * this.state.height_factor
      ) {
        this.highlightSegment([
          46 * this.state.width_factor,
          515 * this.state.width_factor,
          1260 * this.state.height_factor,
          this.state.height,
        ]);
        this.clickCheckerFunction(
          [
            46 * this.state.width_factor,
            560 * this.state.width_factor,
            1260 * this.state.height_factor,
            this.state.height,
          ],
          16,
          "bottom"
        );
      } else if (
        x >= 560 * this.state.width_factor &&
        x <= this.state.width &&
        y <= this.state.height &&
        y >= 1260 * this.state.height_factor
      ) {
        this.highlightSegment([
          560 * this.state.width_factor,
          this.state.width,
          1260 * this.state.height_factor,
          this.state.height,
        ]);
        this.clickCheckerFunction(
          [
            560 * this.state.width_factor,
            this.state.width,
            1260 * this.state.height_factor,
            this.state.height,
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
      x >= 0 &&
      x <= 46 * this.state.width_factor &&
      y >= 0 &&
      y <= 76 * this.state.height_factor
    ) {
      data_array[0] = data_array[0] + 1;
    } else if (
      x <= 560 * this.state.width_factor &&
      x >= 46 * this.state.width_factor &&
      y >= 0 &&
      y <= 76 * this.state.height_factor
    ) {
      data_array[1] = data_array[1] + 1;
    } else if (
      x >= 560 * this.state.width_factor &&
      x <= this.state.width &&
      y >= 0 &&
      y <= 76 * this.state.height_factor
    ) {
      data_array[2] = data_array[2] + 1;
    } else if (
      x >= 0 &&
      x <= 46 * this.state.width_factor &&
      y <= 468 * this.state.height_factor &&
      y >= 76 * this.state.height_factor
    ) {
      data_array[3] = data_array[3] + 1;
    } else if (
      x <= 560 * this.state.width_factor &&
      x >= 46 * this.state.width_factor &&
      y <= 468 * this.state.height_factor &&
      y >= 76 * this.state.height_factor
    ) {
      data_array[4] = data_array[4] + 1;
    } else if (
      x >= 560 * this.state.width_factor &&
      x <= this.state.width &&
      y <= 468 * this.state.height_factor &&
      y >= 76 * this.state.height_factor
    ) {
      data_array[5] = data_array[5] + 1;
    } else if (
      x >= 0 &&
      x <= 46 * this.state.width_factor &&
      y >= 468 * this.state.height_factor &&
      y <= 670 * this.state.height_factor
    ) {
      data_array[6] = data_array[6] + 1;
    } else if (
      x <= 560 * this.state.width_factor &&
      x >= 46 * this.state.width_factor &&
      y >= 468 * this.state.height_factor &&
      y <= 670 * this.state.height_factor
    ) {
      data_array[7] = data_array[7] + 1;
    } else if (
      x >= 560 * this.state.width_factor &&
      x <= this.state.width &&
      y >= 468 * this.state.height_factor &&
      y <= 670 * this.state.height_factor
    ) {
      data_array[8] = data_array[8] + 1;
    } else if (
      x >= 0 &&
      x <= 46 * this.state.width_factor &&
      y <= 868 * this.state.height_factor &&
      y >= 670 * this.state.height_factor
    ) {
      data_array[9] = data_array[9] + 1;
    } else if (
      x <= 560 * this.state.width_factor &&
      x >= 46 * this.state.width_factor &&
      y <= 868 * this.state.height_factor &&
      y >= 670 * this.state.height_factor
    ) {
      data_array[10] = data_array[10] + 1;
    } else if (
      x >= 560 * this.state.width_factor &&
      x <= this.state.width &&
      y <= 868 * this.state.height_factor &&
      y >= 670 * this.state.height_factor
    ) {
      data_array[11] = data_array[11] + 1;
    } else if (
      x >= 0 &&
      x <= 46 * this.state.width_factor &&
      y >= 868 * this.state.height_factor &&
      y <= 1260 * this.state.height_factor
    ) {
      data_array[12] = data_array[12] + 1;
    } else if (
      x <= 560 * this.state.width_factor &&
      x >= 46 * this.state.width_factor &&
      y >= 868 * this.state.height_factor &&
      y <= 1260 * this.state.height_factor
    ) {
      data_array[13] = data_array[13] + 1;
    } else if (
      x >= 560 * this.state.width_factor &&
      x <= this.state.width &&
      y >= 868 * this.state.height_factor &&
      y <= 1260 * this.state.height_factor
    ) {
      data_array[14] = data_array[14] + 1;
    } else if (
      x >= 0 &&
      x <= 46 * this.state.width_factor &&
      y <= this.state.height &&
      y >= 1260 * this.state.height_factor
    ) {
      data_array[15] = data_array[15] + 1;
    } else if (
      x <= 560 * this.state.width_factor &&
      x >= 46 * this.state.width_factor &&
      y <= this.state.height &&
      y >= 1260 * this.state.height_factor
    ) {
      data_array[16] = data_array[16] + 1;
    } else if (
      x >= 560 * this.state.width_factor &&
      x <= this.state.width &&
      y <= this.state.height &&
      y >= 1260 * this.state.height_factor
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

      //final position of shuttle
      let bot_x =
        (nextShot.position_bottom[0][0] + nextShot.position_bottom[1][0]) / 2;
      let bot_y =
        (nextShot.position_bottom[0][1] + nextShot.position_bottom[1][1]) / 2;

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
      ctx.fillText(
        perc_val,
        location[0] * this.state.width_factor,
        location[1] * this.state.height_factor
      );
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
      ctx.fillText(
        perc_val,
        location[0] * this.state.width_factor,
        location[1] * this.state.height_factor
      );
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
    if (nextProps != this.props) {
      if (nextProps.isRightSide) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.drawCourt();
        nextProps.rightSideData.map((item, index) => {
          this.drawShotIndRightSide(item);
        });
      } else {
        if (nextProps.patter_length != -1) {
          const canvas = this.canvasRef.current;
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, this.state.width, this.state.height);
          this.drawCourt();
          if (nextProps.patter_length === 1) {
            nextProps.pattern_array.map((rally, rally_index) => {
              if (rally.length > 0) {
                rally.map((item, index) => {
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
                });
              }
            });
          } else if (nextProps.patter_length === 2) {
            nextProps.pattern_array.map((rally, rally_index) => {
              if (rally.length > 0) {
                rally.map((item, index) => {
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
                });
              }
            });
          } else if (nextProps.patter_length === 3) {
            nextProps.pattern_array.map((rally, rally_index) => {
              if (rally.length > 0) {
                rally.map((item, index) => {
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
      </div>
    );
  }
}

export default Field;

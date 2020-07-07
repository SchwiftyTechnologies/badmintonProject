import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";
import Field from "./field";
import UpArrowImg from "../assets/up_arrow.png";
import DownArrowImg from "../assets/down_arrow.png";
import RightArrowImage from "../assets/right-arrow.png";
import LeftArrowImage from "../assets/left-arrow.png";
import CheckedImage from "../assets/checked.png";
import badminton_data from "../Badminton_data_14.json";
import Dropdown from "./dropdown";
import Timeline from "./timeline";
import badminton_rally_data from "../Badminton_data_rally_string.json";
import badminton_points_data from "../Badminton_points_data_14.json";

class Badminton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rally_number: 1,
      shot_type: ["Smash", "Lob", "Drive", "Toss", "Serve", "Nill"],
      shot_hand: ["A", "F", "B"],
      shot_type_top_1: "Smash",
      shot_type_top_2: "Nill",
      shot_type_top_3: "Nill",
      shot_type_bot_1: "Smash",
      shot_type_bot_2: "Nill",
      shot_type_bot_3: "Nill",
      shot_hand_top_1: "F",
      shot_hand_top_2: "F",
      shot_hand_top_3: "F",
      shot_hand_bot_1: "F",
      shot_hand_bot_2: "F",
      shot_hand_bot_3: "F",
      final_dictionary: {},
      pattern_array: [],
      patter_length: -1,
      stretchTop: true,
      distanceTop: true,
      placrecTop: false,
      heightTop: false,
      stretchBot: true,
      distanceBot: true,
      placrecBot: false,
      heightBot: false,
      factor: 5,
      numberFactor: 5,
      leftRally: -1,
      rightRally: -1,
      leftRallyDisp: -1,
      rightRallyDisp: -1,
      firstClick: true,
      graph_data: [],
      firstshot: true,
      secondshot: true,
      thirdshot: true,
      points_table: null,
      percentage: true,
      shots: false,
      percFirstShot: true,
      percSecondShot: false,
      percThirdShot: false,
      top_smash_count_B: 0,
      top_smash_count_F: 0,
      top_drive_count_B: 0,
      top_drive_count_F: 0,
      top_lob_count_B: 0,
      top_lob_count_F: 0,
      top_toss_count_B: 0,
      top_toss_count_F: 0,
      bot_smash_count_B: 0,
      bot_smash_count_F: 0,
      bot_drive_count_B: 0,
      bot_drive_count_F: 0,
      bot_toss_count_B: 0,
      bot_toss_count_F: 0,
      bot_lob_count_B: 0,
      bot_lob_count_F: 0,
      top_forehand: false,
      top_backhand: false,
      top_winners: false,
      top_win_smash: false,
      top_win_plac: false,
      top_losers: false,
      top_losers_smash: false,
      top_losers_plac: false,
      top_losers_net: false,
      bot_forehand: false,
      bot_backhand: false,
      bot_winners: false,
      bot_win_smash: false,
      bot_win_plac: false,
      bot_losers: false,
      bot_losers_smash: false,
      bot_losers_plac: false,
      bot_losers_net: false,
      isRightSide: false,
      rightSideData: [],
      info_dictionary: {},
      totalStretchTop: 0,
      avgStretchTop: 0,
      totalStretchBot: 0,
      avgStretchBot: 0,
      totalDistanceTop: 0,
      avgDistanceTop: 0,
      totalDistanceBot: 0,
      avgDistanceBot: 0,
      setArray: [],
      setLeft: 1,
      setRight: 1,
      left_top_score_set1: 0,
      right_top_score_set1: 0,
      left_top_score_set2: 0,
      right_top_score_set2: 0,
      left_top_score_set3: 0,
      right_top_score_set3: 0,
      left_bot_score_set1: 0,
      right_bot_score_set1: 0,
      left_bot_score_set2: 0,
      right_bot_score_set2: 0,
      left_bot_score_set3: 0,
      right_bot_score_set3: 0,
      indShot: true,
    };
  }

  componentDidMount() {
    let badminton_array = Object.values(badminton_data);
    this.setState({
      badminton_data: badminton_data,
      badminton_array: badminton_array,
    });
    this.setTotalShots();
    this.setPoints();
    this.setTotalShotsPerPlayer();
  }

  setPoints = () => {
    let badminton_points_array = Object.values(badminton_points_data);
    let final_array = [];
    let temparray = [];
    badminton_points_array.map((item, index) => {
      if (badminton_points_array[index + 1]) {
        if (item.current_set != badminton_points_array[index + 1].current_set) {
          final_array.push(item);

          temparray.push(index);
        }
      } else {
        final_array.push(item);
      }
    });
    this.setState({ points_table: final_array, setArray: temparray });
  };

  onClickRally = (val) => {
    if (this.state.firstClick) {
      let rally_number_disp = -1;
      let rally_number = val;
      let leftSet = 0;
      let left_score_set1 = 0;
      let right_score_set1 = 0;
      let left_score_set2 = 0;
      let right_score_set2 = 0;
      let left_score_set3 = 0;
      let right_score_set3 = 0;
      if (rally_number <= this.state.setArray[0]) {
        rally_number_disp = rally_number;
        leftSet = 1;
        let rall_info = badminton_points_data[(rally_number + 1).toString()];
        left_score_set1 = rall_info.current_set_top_init_score;
        right_score_set1 = rall_info.current_set_bottom_init_score;
      } else if (this.state.setArray[1]) {
        if (
          rally_number <= this.state.setArray[1] &&
          rally_number > this.state.setArray[0]
        ) {
          rally_number_disp = rally_number - this.state.setArray[0] - 1;
          leftSet = 2;
          let rall_info = badminton_points_data[(rally_number + 1).toString()];

          left_score_set2 = rall_info.current_set_top_init_score;
          right_score_set2 = rall_info.current_set_bottom_init_score;
          left_score_set1 = this.state.points_table[0]
            .current_set_top_init_score;
          right_score_set1 = this.state.points_table[0]
            .current_set_bottom_init_score;
        } else if (rally_number > this.state.setArray[1]) {
          rally_number_disp = rally_number - this.state.setArray[1] - 1;
          leftSet = 3;
          let rall_info = badminton_points_data[(rally_number + 1).toString()];

          left_score_set2 = this.state.points_table[1]
            .current_set_top_init_score;
          right_score_set2 = this.state.points_table[1]
            .current_set_bottom_init_score;
          left_score_set1 = this.state.points_table[0]
            .current_set_top_init_score;
          right_score_set1 = this.state.points_table[0]
            .current_set_bottom_init_score;
          left_score_set3 = rall_info.current_set_top_init_score;
          right_score_set3 = rall_info.current_set_bottom_init_score;
        }
      } else if (rally_number > this.state.setArray[0]) {
        rally_number_disp = rally_number - this.state.setArray[0] - 1;
        leftSet = 2;
        let rall_info = badminton_points_data[(rally_number + 1).toString()];

        left_score_set2 = rall_info.current_set_top_init_score;
        right_score_set2 = rall_info.current_set_bottom_init_score;
        left_score_set1 = this.state.points_table[0].current_set_top_init_score;
        right_score_set1 = this.state.points_table[0]
          .current_set_bottom_init_score;
      }
      this.setState({
        leftRally: rally_number,
        leftRallyDisp: rally_number_disp,
        setLeft: leftSet,
        firstClick: false,
        left_top_score_set1: left_score_set1,
        left_bot_score_set1: right_score_set1,
        left_top_score_set2: left_score_set2,
        left_bot_score_set2: right_score_set2,
        left_top_score_set3: left_score_set3,
        left_bot_score_set3: right_score_set3,
      });
    } else {
      let rally_number_disp = -1;
      let rally_number = val;
      let leftSet = 0;
      let left_score_set1 = 0;
      let right_score_set1 = 0;
      let left_score_set2 = 0;
      let right_score_set2 = 0;
      let left_score_set3 = 0;
      let right_score_set3 = 0;
      if (rally_number <= this.state.setArray[0]) {
        rally_number_disp = rally_number;
        leftSet = 1;
        let rall_info = badminton_points_data[(rally_number + 1).toString()];
        left_score_set1 = rall_info.current_set_top_init_score;
        right_score_set1 = rall_info.current_set_bottom_init_score;
      } else if (this.state.setArray[1]) {
        if (
          rally_number <= this.state.setArray[1] &&
          rally_number > this.state.setArray[0]
        ) {
          rally_number_disp = rally_number - this.state.setArray[0] - 1;
          leftSet = 2;
          let rall_info = badminton_points_data[(rally_number + 1).toString()];

          left_score_set2 = rall_info.current_set_top_init_score;
          right_score_set2 = rall_info.current_set_bottom_init_score;
          left_score_set1 = this.state.points_table[0]
            .current_set_top_init_score;
          right_score_set1 = this.state.points_table[0]
            .current_set_bottom_init_score;
        } else if (rally_number > this.state.setArray[1]) {
          rally_number_disp = rally_number - this.state.setArray[1] - 1;
          leftSet = 3;
          let rall_info = badminton_points_data[(rally_number + 1).toString()];

          left_score_set2 = this.state.points_table[1]
            .current_set_top_init_score;
          right_score_set2 = this.state.points_table[1]
            .current_set_bottom_init_score;
          left_score_set1 = this.state.points_table[0]
            .current_set_top_init_score;
          right_score_set1 = this.state.points_table[0]
            .current_set_bottom_init_score;
          left_score_set3 = rall_info.current_set_top_init_score;
          right_score_set3 = rall_info.current_set_bottom_init_score;
        }
      } else if (rally_number > this.state.setArray[0]) {
        rally_number_disp = rally_number - this.state.setArray[0] - 1;
        leftSet = 2;
        let rall_info = badminton_points_data[(rally_number + 1).toString()];

        left_score_set2 = rall_info.current_set_top_init_score;
        right_score_set2 = rall_info.current_set_bottom_init_score;
        left_score_set1 = this.state.points_table[0].current_set_top_init_score;
        right_score_set1 = this.state.points_table[0]
          .current_set_bottom_init_score;
      }
      this.setState({
        rightRally: rally_number,
        rightRallyDisp: rally_number_disp,
        setRight: leftSet,
        firstClick: true,
        right_top_score_set1: left_score_set1,
        right_bot_score_set1: right_score_set1,
        right_top_score_set2: left_score_set2,
        right_bot_score_set2: right_score_set2,
        right_top_score_set3: left_score_set3,
        right_bot_score_set3: right_score_set3,
      });
    }
  };

  OnChangeTimeLineSize = (index) => {
    if (index === 0 && this.state.factor) {
      this.setState({
        numberFactor: this.state.numberFactor + 0.5,
        factor: this.state.factor + 1,
      });
    } else if (index === 1 && this.state.factor > 1) {
      this.setState({
        numberFactor: this.state.numberFactor - 0.5,
        factor: this.state.factor - 1,
      });
    }
  };

  onScrollLeft = () => {
    document.getElementById("timeline").scrollBy(-50, 0);
  };

  onScrollRight = () => {
    document.getElementById("timeline").scrollBy(50, 0);
  };

  endInterval = () => {
    clearInterval(this.state.intervalId);
  };

  shotTypeToLetter = (type, hand) => {
    if (type === "Serve" && hand === "F") {
      return "A";
    } else if (type === "Serve" && hand === "B") {
      return "B";
    } else if (type === "Lob" && hand === "F") {
      return "C";
    } else if (type === "Lob" && hand === "B") {
      return "D";
    } else if (type === "Toss" && hand === "F") {
      return "E";
    } else if (type === "Toss" && hand === "B") {
      return "F";
    } else if (type === "Drive" && hand === "F") {
      return "G";
    } else if (type === "Drive" && hand === "B") {
      return "H";
    } else if (type === "Smash" && hand === "F") {
      return "I";
    } else if (type === "Smash" && hand === "B") {
      return "J";
    }
  };

  findAllShots = (
    shot_hand_1,
    shot_hand_2,
    shot_hand_3,
    final_resp,
    final_shots,
    final_array
  ) => {
    final_array = [];
    let shot_type_2_val = null;
    let shot_type_3_val = null;
    let shot_type_1_val = this.shotTypeToLetter(
      this.state.shot_type_top_1,
      shot_hand_1 === null ? this.state.shot_hand_top_1 : shot_hand_1
    );
    final_array.push(shot_type_1_val);
    if (
      this.state.shot_type_top_2 === "Nill" &&
      this.state.shot_type_top_3 != "Nill"
    ) {
      // alert("You need to input the other players shot");
    } else if (this.state.shot_type_top_2 != "Nill") {
      shot_type_2_val = this.shotTypeToLetter(
        this.state.shot_type_top_2,
        shot_hand_2 === null ? this.state.shot_hand_top_2 : shot_hand_2
      );
      final_array.push(shot_type_2_val);
      if (this.state.shot_type_top_3 != "Nill") {
        shot_type_3_val = this.shotTypeToLetter(
          this.state.shot_type_top_3,
          shot_hand_3 === null ? this.state.shot_hand_top_3 : shot_hand_3
        );
        final_array.push(shot_type_3_val);
      }
    }

    let rally_data_array = [];
    let shots = [];
    if (
      this.state.leftRally === this.state.rightRally ||
      this.state.rightRally === -1
    ) {
      let initialPlayer =
        badminton_data[(this.state.leftRally + 1).toString()].shots["1"]
          .player_played;
      let intialValue = 0;
      if (initialPlayer === "bottom") {
        intialValue = 1;
      }
      rally_data_array = Object.values(badminton_rally_data)[
        this.state.leftRally
      ];
      let shots = Object.values(
        this.state.badminton_array[this.state.leftRally].shots
      );
      final_shots.push(shots);

      let response_array = this.findIndShotsInRally(
        final_array,
        rally_data_array,
        final_array.length,
        intialValue
      );
      final_resp.push(response_array);
    } else if (this.state.rightRally < this.state.leftRally) {
      // alert("The right rally number should be greater than the left");
    } else {
      for (let i = this.state.leftRally; i <= this.state.rightRally; i++) {
        let initialPlayer =
          badminton_data[(i + 1).toString()].shots["1"].player_played;
        let intialValue = 0;
        if (initialPlayer === "bottom") {
          intialValue = 1;
        }
        rally_data_array = Object.values(badminton_rally_data)[i];

        let response_array = this.findIndShotsInRally(
          final_array,
          rally_data_array,
          final_array.length,
          intialValue
        );
        final_resp.push(response_array);

        final_shots.push(Object.values(this.state.badminton_array[i].shots));
      }
    }
    return [final_resp, final_shots, final_array];
  };

  findAllShotsBottom = (
    shot_hand_1,
    shot_hand_2,
    shot_hand_3,
    final_resp,
    final_shots,
    final_array
  ) => {
    final_array = [];
    let shot_type_2_val = null;
    let shot_type_3_val = null;
    let shot_type_1_val = this.shotTypeToLetter(
      this.state.shot_type_bot_1,
      shot_hand_1 === null ? this.state.shot_hand_bot_1 : shot_hand_1
    );
    final_array.push(shot_type_1_val);
    if (
      this.state.shot_type_bot_2 === "Nill" &&
      this.state.shot_type_bot_3 != "Nill"
    ) {
      // alert("You need to input the other players shot");
    } else if (this.state.shot_type_bot_2 != "Nill") {
      shot_type_2_val = this.shotTypeToLetter(
        this.state.shot_type_bot_2,
        shot_hand_2 === null ? this.state.shot_hand_bot_2 : shot_hand_2
      );
      final_array.push(shot_type_2_val);
      if (this.state.shot_type_bot_3 != "Nill") {
        shot_type_3_val = this.shotTypeToLetter(
          this.state.shot_type_bot_3,
          shot_hand_3 === null ? this.state.shot_hand_bot_3 : shot_hand_3
        );
        final_array.push(shot_type_3_val);
      }
    }

    let rally_data_array = [];
    let shots = [];
    if (
      this.state.leftRally === this.state.rightRally ||
      this.state.rightRally === -1
    ) {
      let initialPlayer =
        badminton_data[(this.state.leftRally + 1).toString()].shots["1"]
          .player_played;
      let intialValue = 0;
      if (initialPlayer === "top") {
        intialValue = 1;
      }
      rally_data_array = Object.values(badminton_rally_data)[
        this.state.leftRally
      ];
      let shots = Object.values(
        this.state.badminton_array[this.state.leftRally].shots
      );
      final_shots.push(shots);

      let response_array = this.findIndShotsInRally(
        final_array,
        rally_data_array,
        final_array.length,
        intialValue
      );
      final_resp.push(response_array);
    } else if (this.state.rightRally < this.state.leftRally) {
      // alert("The right rally number should be greater than the left");
    } else {
      for (let i = this.state.leftRally; i <= this.state.rightRally; i++) {
        let initialPlayer =
          badminton_data[(i + 1).toString()].shots["1"].player_played;
        let intialValue = 0;
        if (initialPlayer === "top") {
          intialValue = 1;
        }
        rally_data_array = Object.values(badminton_rally_data)[i];

        let response_array = this.findIndShotsInRally(
          final_array,
          rally_data_array,
          final_array.length,
          intialValue
        );
        final_resp.push(response_array);

        final_shots.push(Object.values(this.state.badminton_array[i].shots));
      }
    }
    return [final_resp, final_shots, final_array];
  };

  onClickPoints = (index) => {
    let badminton_points_data_array = Object.values(badminton_points_data);
    let final_array = [];
    if (index === 0) {
      if (
        this.state.top_forehand === true &&
        this.state.top_backhand === false
      ) {
        badminton_points_data_array.map((item, index) => {
          if (index >= this.state.leftRally && index <= this.state.rightRally) {
            if (this.state.top_winners) {
              if (this.state.top_win_smash) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Winner" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.top_win_plac) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Winner" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else if (this.state.top_losers) {
              if (this.state.top_losers_smash) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.top_losers_plac) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.top_losers_net) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Net Shot"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else {
            }
          }
        });
      } else if (
        this.state.top_forehand === false &&
        this.state.top_backhand === true
      ) {
        badminton_points_data_array.map((item, index) => {
          if (index >= this.state.leftRally && index <= this.state.rightRally) {
            if (this.state.top_winners) {
              if (this.state.top_win_smash) {
                if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Winner" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.top_win_plac) {
                if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Winner" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else if (this.state.top_losers) {
              if (this.state.top_losers_smash) {
                if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.top_losers_plac) {
                if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.top_losers_net) {
                if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Net Shot"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else {
            }
          }
        });
      } else if (
        this.state.top_forehand === true &&
        this.state.top_backhand === true
      ) {
        badminton_points_data_array.map((item, index) => {
          if (index >= this.state.leftRally && index <= this.state.rightRally) {
            if (this.state.top_winners) {
              if (this.state.top_win_smash) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Winner" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Winner" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.top_win_plac) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Winner" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Winner" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else if (this.state.top_losers) {
              if (this.state.top_losers_smash) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.top_losers_plac) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.top_losers_net) {
                if (
                  item.Action_FB_init_top === "Forehand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Net Shot"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_top === "Backhand" &&
                  item.Action_wl_init_top === "Mistake" &&
                  item.shot === "Net Shot"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else {
            }
          }
        });
      }
      this.setState({ isRightSide: true, rightSideData: final_array });
    } else if (index === 1) {
      if (
        this.state.bot_forehand === true &&
        this.state.bot_backhand === false
      ) {
        badminton_points_data_array.map((item, index) => {
          if (index >= this.state.leftRally && index <= this.state.rightRally) {
            if (this.state.bot_winners) {
              if (this.state.bot_win_smash) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Winner" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.bot_win_plac) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Winner" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else if (this.state.bot_losers) {
              if (this.state.bot_losers_smash) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.bot_losers_plac) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.bot_losers_net) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Net Shot"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else {
            }
          }
        });
      } else if (
        this.state.bot_forehand === false &&
        this.state.bot_backhand === true
      ) {
        badminton_points_data_array.map((item, index) => {
          if (index >= this.state.leftRally && index <= this.state.rightRally) {
            if (this.state.bot_winners) {
              if (this.state.bot_win_smash) {
                if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Winner" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.bot_win_plac) {
                if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Winner" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else if (this.state.bot_losers) {
              if (this.state.bot_losers_smash) {
                if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.bot_losers_plac) {
                if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.bot_losers_net) {
                if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Net Shot"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else {
            }
          }
        });
      } else if (
        this.state.bot_forehand === true &&
        this.state.bot_backhand === true
      ) {
        badminton_points_data_array.map((item, index) => {
          if (index >= this.state.leftRally && index <= this.state.rightRally) {
            if (this.state.bot_winners) {
              if (this.state.bot_win_smash) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Winner" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Winner" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.bot_win_plac) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Winner" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Winner" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else if (this.state.bot_losers) {
              if (this.state.bot_losers_smash) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Smash"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.bot_losers_plac) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Placement"
                ) {
                  final_array.push(item);
                }
              } else if (this.state.bot_losers_net) {
                if (
                  item.Action_FB_init_bottom === "Forehand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Net Shot"
                ) {
                  final_array.push(item);
                } else if (
                  item.Action_FB_init_bottom === "Backhand" &&
                  item.Action_wl_init_bottom === "Mistake" &&
                  item.shot === "Net Shot"
                ) {
                  final_array.push(item);
                }
              } else {
              }
            } else {
            }
          }
        });
      }
      this.setState({ isRightSide: true, rightSideData: final_array });
    }
  };

  onClickGo = (index) => {
    this.setState({ isRightSide: false });
    if (this.state.leftRally != -1) {
      if (index === 1) {
        if (this.state.shot_type_top_1 === "Nill") {
          // alert("You can't keep the first shot as Nill");
        } else if (
          this.state.shot_hand_top_1 === "A" ||
          this.state.shot_hand_top_2 === "A" ||
          this.state.shot_hand_top_3 === "A"
        ) {
          if (
            this.state.shot_hand_top_1 === "A" &&
            this.state.shot_hand_top_2 != "A" &&
            this.state.shot_hand_top_3 != "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];
            for (let shot_hand_1 of shot_hand_types) {
              temparray = this.findAllShots(
                shot_hand_1,
                null,
                null,
                temparray[0],
                temparray[1],
                temparray[2]
              );
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_top_1 === "A" &&
            this.state.shot_hand_top_2 === "A" &&
            this.state.shot_hand_top_3 != "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];
            for (let shot_hand_1 of shot_hand_types) {
              for (let shot_hand_2 of shot_hand_types) {
                temparray = this.findAllShots(
                  shot_hand_1,
                  shot_hand_2,
                  null,
                  temparray[0],
                  temparray[1],
                  temparray[2]
                );
              }
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_top_1 === "A" &&
            this.state.shot_hand_top_2 === "A" &&
            this.state.shot_hand_top_3 === "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];
            for (let shot_hand_1 of shot_hand_types) {
              for (let shot_hand_2 of shot_hand_types) {
                for (let shot_hand_3 of shot_hand_types) {
                  temparray = this.findAllShots(
                    shot_hand_1,
                    shot_hand_2,
                    shot_hand_3,
                    temparray[0],
                    temparray[1],
                    temparray[2]
                  );
                }
              }
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_top_1 === "A" &&
            this.state.shot_hand_top_2 != "A" &&
            this.state.shot_hand_top_3 === "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];
            for (let shot_hand_1 of shot_hand_types) {
              for (let shot_hand_3 of shot_hand_types) {
                temparray = this.findAllShots(
                  shot_hand_1,
                  null,
                  shot_hand_3,
                  temparray[0],
                  temparray[1],
                  temparray[2]
                );
              }
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_top_1 != "A" &&
            this.state.shot_hand_top_2 === "A" &&
            this.state.shot_hand_top_3 != "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];

            for (let shot_hand_2 of shot_hand_types) {
              temparray = this.findAllShots(
                null,
                shot_hand_2,
                null,
                temparray[0],
                temparray[1],
                temparray[2]
              );
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_top_1 != "A" &&
            this.state.shot_hand_top_2 === "A" &&
            this.state.shot_hand_top_3 === "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];

            for (let shot_hand_2 of shot_hand_types) {
              for (let shot_hand_3 of shot_hand_types) {
                temparray = this.findAllShots(
                  null,
                  shot_hand_2,
                  shot_hand_3,
                  temparray[0],
                  temparray[1],
                  temparray[2]
                );
              }
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_top_1 != "A" &&
            this.state.shot_hand_top_2 != "A" &&
            this.state.shot_hand_top_3 === "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];

            for (let shot_hand_3 of shot_hand_types) {
              temparray = this.findAllShots(
                null,
                null,
                shot_hand_3,
                temparray[0],
                temparray[1],
                temparray[2]
              );
            }

            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          }
        } else {
          let final_array = [];
          let shot_type_2_val = null;
          let shot_type_3_val = null;
          let shot_type_1_val = this.shotTypeToLetter(
            this.state.shot_type_top_1,
            this.state.shot_hand_top_1
          );
          final_array.push(shot_type_1_val);
          if (
            this.state.shot_type_top_2 === "Nill" &&
            this.state.shot_type_top_3 != "Nill"
          ) {
            // alert("You need to input the other players shot");
          } else if (this.state.shot_type_top_2 != "Nill") {
            shot_type_2_val = this.shotTypeToLetter(
              this.state.shot_type_top_2,
              this.state.shot_hand_top_2
            );
            final_array.push(shot_type_2_val);
            if (this.state.shot_type_top_3 != "Nill") {
              shot_type_3_val = this.shotTypeToLetter(
                this.state.shot_type_top_3,
                this.state.shot_hand_top_3
              );
              final_array.push(shot_type_3_val);
            }
          }

          let rally_data_array = [];
          let shots = [];
          if (
            this.state.leftRally === this.state.rightRally ||
            this.state.rightRally === -1
          ) {
            let final_resp = [];
            let final_shots = [];
            let initialPlayer =
              badminton_data[(this.state.leftRally + 1).toString()].shots["1"]
                .player_played;
            let intialValue = 0;
            if (initialPlayer === "bottom") {
              intialValue = 1;
            }
            rally_data_array = Object.values(badminton_rally_data)[
              this.state.leftRally
            ];
            let shots = Object.values(
              this.state.badminton_array[this.state.leftRally].shots
            );
            final_shots.push(shots);
            this.setState({ graph_data: final_shots });
            let response_array = this.findIndShotsInRally(
              final_array,
              rally_data_array,
              final_array.length,
              intialValue
            );
            final_resp.push(response_array);
            this.setState({
              pattern_array: final_resp,
              patter_length: final_array.length,
            });
          } else if (this.state.rightRally < this.state.leftRally) {
            // alert("The right rally number should be greater than the left");
          } else {
            let final_resp = [];
            let final_shots = [];
            for (
              let i = this.state.leftRally;
              i <= this.state.rightRally;
              i++
            ) {
              let initialPlayer =
                badminton_data[(i + 1).toString()].shots["1"].player_played;
              let intialValue = 0;
              if (initialPlayer === "bottom") {
                intialValue = 1;
              }
              rally_data_array = Object.values(badminton_rally_data)[i];

              let response_array = this.findIndShotsInRally(
                final_array,
                rally_data_array,
                final_array.length,
                intialValue
              );
              final_resp.push(response_array);

              final_shots.push(
                Object.values(this.state.badminton_array[i].shots)
              );
            }

            this.setState({ graph_data: final_shots });

            this.setState({
              pattern_array: final_resp,
              patter_length: final_array.length,
            });
          }
        }
      } else if (index === 2) {
        if (this.state.shot_type_bot_1 === "Nill") {
          // alert("You can't keep the first shot as Nill");
        } else if (
          this.state.shot_hand_bot_1 === "A" ||
          this.state.shot_hand_bot_2 === "A" ||
          this.state.shot_hand_bot_3 === "A"
        ) {
          if (
            this.state.shot_hand_bot_1 === "A" &&
            this.state.shot_hand_bot_2 != "A" &&
            this.state.shot_hand_bot_3 != "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];
            for (let shot_hand_1 of shot_hand_types) {
              temparray = this.findAllShotsBottom(
                shot_hand_1,
                null,
                null,
                temparray[0],
                temparray[1],
                temparray[2]
              );
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_bot_1 === "A" &&
            this.state.shot_hand_bot_2 === "A" &&
            this.state.shot_hand_bot_3 != "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];
            for (let shot_hand_1 of shot_hand_types) {
              for (let shot_hand_2 of shot_hand_types) {
                temparray = this.findAllShotsBottom(
                  shot_hand_1,
                  shot_hand_2,
                  null,
                  temparray[0],
                  temparray[1],
                  temparray[2]
                );
              }
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_bot_1 === "A" &&
            this.state.shot_hand_bot_2 === "A" &&
            this.state.shot_hand_bot_3 === "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];
            for (let shot_hand_1 of shot_hand_types) {
              for (let shot_hand_2 of shot_hand_types) {
                for (let shot_hand_3 of shot_hand_types) {
                  temparray = this.findAllShotsBottom(
                    shot_hand_1,
                    shot_hand_2,
                    shot_hand_3,
                    temparray[0],
                    temparray[1],
                    temparray[2]
                  );
                }
              }
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_bot_1 === "A" &&
            this.state.shot_hand_bot_2 != "A" &&
            this.state.shot_hand_bot_3 === "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];
            for (let shot_hand_1 of shot_hand_types) {
              for (let shot_hand_3 of shot_hand_types) {
                temparray = this.findAllShotsBottom(
                  shot_hand_1,
                  null,
                  shot_hand_3,
                  temparray[0],
                  temparray[1],
                  temparray[2]
                );
              }
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_bot_1 != "A" &&
            this.state.shot_hand_bot_2 === "A" &&
            this.state.shot_hand_bot_3 != "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];

            for (let shot_hand_2 of shot_hand_types) {
              temparray = this.findAllShotsBottom(
                null,
                shot_hand_2,
                null,
                temparray[0],
                temparray[1],
                temparray[2]
              );
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_bot_1 != "A" &&
            this.state.shot_hand_bot_2 === "A" &&
            this.state.shot_hand_bot_3 === "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];

            for (let shot_hand_2 of shot_hand_types) {
              for (let shot_hand_3 of shot_hand_types) {
                temparray = this.findAllShotsBottom(
                  null,
                  shot_hand_2,
                  shot_hand_3,
                  temparray[0],
                  temparray[1],
                  temparray[2]
                );
              }
            }
            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          } else if (
            this.state.shot_hand_bot_1 != "A" &&
            this.state.shot_hand_bot_2 != "A" &&
            this.state.shot_hand_bot_3 === "A"
          ) {
            let shot_hand_types = ["F", "B"];
            let final_array = [];
            let final_resp = [];
            let final_shots = [];
            let temparray = [final_resp, final_shots, final_array];

            for (let shot_hand_3 of shot_hand_types) {
              temparray = this.findAllShotsBottom(
                null,
                null,
                shot_hand_3,
                temparray[0],
                temparray[1],
                temparray[2]
              );
            }

            this.setState({ graph_data: temparray[1] });
            this.setState({
              pattern_array: temparray[0],
              patter_length: temparray[2].length,
            });
          }
        } else {
          let final_array = [];
          let shot_type_2_val = null;
          let shot_type_3_val = null;
          let shot_type_1_val = this.shotTypeToLetter(
            this.state.shot_type_bot_1,
            this.state.shot_hand_bot_1
          );
          final_array.push(shot_type_1_val);
          if (
            this.state.shot_type_bot_2 === "Nill" &&
            this.state.shot_type_bot_3 != "Nill"
          ) {
            // alert("You need to input the other players shot");
          } else if (this.state.shot_type_bot_2 != "Nill") {
            shot_type_2_val = this.shotTypeToLetter(
              this.state.shot_type_bot_2,
              this.state.shot_hand_bot_2
            );
            final_array.push(shot_type_2_val);
            if (this.state.shot_type_bot_3 != "Nill") {
              shot_type_3_val = this.shotTypeToLetter(
                this.state.shot_type_bot_3,
                this.state.shot_hand_bot_3
              );
              final_array.push(shot_type_3_val);
            }
          }
          let rally_data_array = [];
          let shots = [];
          if (
            this.state.leftRally === this.state.rightRally ||
            this.state.rightRally === -1
          ) {
            let final_resp = [];
            let final_shots = [];
            let initialPlayer =
              badminton_data[(this.state.leftRally + 1).toString()].shots["1"]
                .player_played;
            let intialValue = 0;
            if (initialPlayer === "top") {
              intialValue = 1;
            }
            rally_data_array = Object.values(badminton_rally_data)[
              this.state.leftRally
            ];
            let shots = Object.values(
              this.state.badminton_array[this.state.leftRally].shots
            );
            final_shots.push(shots);
            this.setState({ graph_data: final_shots });
            let response_array = this.findIndShotsInRally(
              final_array,
              rally_data_array,
              final_array.length,
              intialValue
            );
            final_resp.push(response_array);
            this.setState({
              pattern_array: final_resp,
              patter_length: final_array.length,
            });
          } else if (this.state.rightRally < this.state.leftRally) {
            // alert("The right rally number should be greater than the left");
          } else {
            let final_resp = [];
            let final_shots = [];
            for (
              let i = this.state.leftRally;
              i <= this.state.rightRally;
              i++
            ) {
              let initialPlayer =
                badminton_data[(i + 1).toString()].shots["1"].player_played;
              let intialValue = 0;
              if (initialPlayer === "top") {
                intialValue = 1;
              }
              rally_data_array = Object.values(badminton_rally_data)[i];

              let response_array = this.findIndShotsInRally(
                final_array,
                rally_data_array,
                final_array.length,
                intialValue
              );
              final_resp.push(response_array);

              final_shots.push(
                Object.values(this.state.badminton_array[i].shots)
              );
            }

            this.setState({ graph_data: final_shots });

            this.setState({
              pattern_array: final_resp,
              patter_length: final_array.length,
            });
          }
        }
      }
      let top_smash_count_F = 0;
      let top_drive_count_F = 0;
      let top_lob_count_F = 0;
      let top_toss_count_F = 0;
      let top_smash_count_B = 0;
      let top_drive_count_B = 0;
      let top_lob_count_B = 0;
      let top_toss_count_B = 0;
      let bot_smash_count_F = 0;
      let bot_drive_count_F = 0;
      let bot_lob_count_F = 0;
      let bot_toss_count_F = 0;
      let bot_smash_count_B = 0;
      let bot_drive_count_B = 0;
      let bot_lob_count_B = 0;
      let bot_toss_count_B = 0;
      let stretchTop = 0;
      let stretchBot = 0;
      let distanceTop = 0;
      let distanceBot = 0;
      let total_number_rally = this.state.rightRally - this.state.leftRally + 1;
      for (let x = this.state.leftRally; x <= this.state.rightRally; x++) {
        let rally_count = this.state.shotCountDic[x + 1];
        let info_dic = this.state.info_dictionary[x + 1];
        stretchTop = parseFloat(stretchTop) + parseFloat(info_dic.stretchTop);
        stretchBot = parseFloat(stretchBot) + parseFloat(info_dic.stretchbot);
        distanceTop = parseFloat(distanceTop) + parseFloat(info_dic.disttop);
        distanceBot = parseFloat(distanceBot) + parseFloat(info_dic.distbot);
        top_smash_count_F = top_smash_count_F + rally_count.top_smash_count_F;
        top_drive_count_F = top_drive_count_F + rally_count.top_drive_count_F;
        top_lob_count_F = top_lob_count_F + rally_count.top_lob_count_F;
        top_toss_count_F = top_toss_count_F + rally_count.top_toss_count_F;
        top_smash_count_B = top_smash_count_B + rally_count.top_smash_count_B;
        top_drive_count_B = top_drive_count_B + rally_count.top_drive_count_B;
        top_lob_count_B = top_lob_count_B + rally_count.top_lob_count_B;
        top_toss_count_B = top_toss_count_B + rally_count.top_toss_count_B;
        bot_smash_count_F = bot_smash_count_F + rally_count.bot_smash_count_F;
        bot_drive_count_F = bot_drive_count_F + rally_count.bot_drive_count_F;
        bot_lob_count_F = bot_lob_count_F + rally_count.bot_lob_count_F;
        bot_toss_count_F = bot_toss_count_F + rally_count.bot_toss_count_F;
        bot_smash_count_B = bot_smash_count_B + rally_count.bot_smash_count_B;
        bot_drive_count_B = bot_drive_count_B + rally_count.bot_drive_count_B;
        bot_lob_count_B = bot_lob_count_B + rally_count.bot_lob_count_B;
        bot_toss_count_B = bot_toss_count_B + rally_count.bot_toss_count_B;
      }
      this.setState({
        top_smash_count_B,
        top_smash_count_F,
        top_drive_count_B,
        top_drive_count_F,
        top_lob_count_B,
        top_lob_count_F,
        top_toss_count_B,
        top_toss_count_F,
        bot_smash_count_B,
        bot_smash_count_F,
        bot_drive_count_B,
        bot_drive_count_F,
        bot_toss_count_B,
        bot_toss_count_F,
        bot_lob_count_B,
        bot_lob_count_F,
        totalStretchTop: (stretchTop / 100).toFixed(1),
        avgStretchTop: (stretchTop / total_number_rally / 100).toFixed(1),
        totalStretchBot: (stretchBot / 100).toFixed(1),
        avgStretchBot: (stretchBot / total_number_rally / 100).toFixed(1),
        totalDistanceTop: (distanceTop / 100).toFixed(1),
        avgDistanceTop: (distanceTop / total_number_rally / 100).toFixed(1),
        totalDistanceBot: (distanceBot / 100).toFixed(1),
        avgDistanceBot: (distanceBot / total_number_rally / 100).toFixed(1),
      });
    }
  };

  findIndShotsInRally = (
    array_to_find,
    rally_data_array,
    length_val,
    intialValue
  ) => {
    if (length_val === 1) {
      let response_array = [];
      for (let i = intialValue; i < rally_data_array.length; i = i + 2) {
        if (array_to_find[0] === rally_data_array[i]) {
          response_array.push(i);
        }
      }
      return response_array;
    } else if (length_val == 2) {
      let response_array = [];
      for (let i = intialValue; i < rally_data_array.length - 1; i = i + 2) {
        if (
          array_to_find[0] === rally_data_array[i] &&
          array_to_find[1] === rally_data_array[i + 1]
        ) {
          response_array.push(i);
        }
      }
      return response_array;
    } else if (length_val === 3) {
      let response_array = [];
      for (let i = intialValue; i < rally_data_array.length - 2; i = i + 2) {
        if (
          array_to_find[0] === rally_data_array[i] &&
          array_to_find[1] === rally_data_array[i + 1] &&
          array_to_find[2] === rally_data_array[i + 2]
        ) {
          response_array.push(i);
        }
      }
      return response_array;
    }
  };

  setTotalShots = () => {
    let rally_data_array = Object.values(badminton_rally_data);
    let final_dictionary = {};
    rally_data_array.map((item, index) => {
      let item_array = item.split("");
      let count_dictionary = {};
      count_dictionary.smash_count_forehand = 0;
      count_dictionary.lob_count_forehand = 0;
      count_dictionary.drive_count_forehand = 0;
      count_dictionary.toss_count_forehand = 0;
      count_dictionary.serve_count_forehand = 0;
      count_dictionary.smash_count_backhand = 0;
      count_dictionary.lob_count_backhand = 0;
      count_dictionary.drive_count_backhand = 0;
      count_dictionary.toss_count_backhand = 0;
      count_dictionary.serve_count_backhand = 0;
      item_array.map((subitem, subIndex) => {
        if (subitem === "A") {
          count_dictionary.serve_count_forehand =
            count_dictionary.serve_count_forehand + 1;
        } else if (subitem === "B") {
          count_dictionary.serve_count_backhand =
            count_dictionary.serve_count_backhand + 1;
        } else if (subitem === "C") {
          count_dictionary.lob_count_forehand =
            count_dictionary.lob_count_forehand + 1;
        } else if (subitem === "D") {
          count_dictionary.lob_count_backhand =
            count_dictionary.lob_count_backhand + 1;
        } else if (subitem === "E") {
          count_dictionary.toss_count_forehand =
            count_dictionary.toss_count_forehand + 1;
        } else if (subitem === "F") {
          count_dictionary.toss_count_backhand =
            count_dictionary.toss_count_backhand + 1;
        } else if (subitem === "G") {
          count_dictionary.drive_count_forehand =
            count_dictionary.drive_count_forehand + 1;
        } else if (subitem === "H") {
          count_dictionary.drive_count_backhand =
            count_dictionary.drive_count_backhand + 1;
        } else if (subitem === "I") {
          count_dictionary.smash_count_forehand =
            count_dictionary.smash_count_forehand + 1;
        } else if (subitem === "J") {
          count_dictionary.smash_count_backhand =
            count_dictionary.smash_count_backhand + 1;
        }
      });
      final_dictionary[index + 1] = count_dictionary;
    });
    this.setState({ final_dictionary: final_dictionary });
  };

  onSelect = (opt, index) => {
    if (index === 1) {
      this.setState({ shot_type_top_1: opt });
    } else if (index === 2) {
      this.setState({ shot_type_top_2: opt });
    } else if (index === 3) {
      this.setState({ shot_type_top_3: opt });
    } else if (index === 4) {
      this.setState({ shot_type_bot_1: opt });
    } else if (index === 5) {
      this.setState({ shot_type_bot_2: opt });
    } else if (index === 6) {
      this.setState({ shot_type_bot_3: opt });
    } else if (index === 7) {
      this.setState({ shot_hand_top_1: opt });
    } else if (index === 8) {
      this.setState({ shot_hand_top_2: opt });
    } else if (index === 9) {
      this.setState({ shot_hand_top_3: opt });
    } else if (index === 10) {
      this.setState({ shot_hand_bot_1: opt });
    } else if (index === 11) {
      this.setState({ shot_hand_bot_2: opt });
    } else if (index === 12) {
      this.setState({ shot_hand_bot_3: opt });
    }
  };

  setTotalShotsPerPlayer = () => {
    let rally_data_array = Object.values(badminton_data);
    let final_dictionary = {};
    let info_dictionary = {};
    rally_data_array.map((item, index) => {
      let temp_obj = {};
      temp_obj.stretchbot = 0;
      temp_obj.stretchTop = 0;
      temp_obj.disttop = 0;
      temp_obj.distbot = 0;
      let temp_dictionary = {};
      let shots = Object.values(item.shots);
      temp_dictionary.top_smash_count_F = 0;
      temp_dictionary.top_drive_count_F = 0;
      temp_dictionary.top_lob_count_F = 0;
      temp_dictionary.top_toss_count_F = 0;
      temp_dictionary.top_smash_count_B = 0;
      temp_dictionary.top_drive_count_B = 0;
      temp_dictionary.top_lob_count_B = 0;
      temp_dictionary.top_toss_count_B = 0;
      temp_dictionary.bot_smash_count_F = 0;
      temp_dictionary.bot_lob_count_F = 0;
      temp_dictionary.bot_drive_count_F = 0;
      temp_dictionary.bot_toss_count_F = 0;
      temp_dictionary.bot_smash_count_B = 0;
      temp_dictionary.bot_lob_count_B = 0;
      temp_dictionary.bot_drive_count_B = 0;
      temp_dictionary.bot_toss_count_B = 0;
      shots.map((subitem, subIndex) => {
        temp_obj.stretchTop =
          parseFloat(temp_obj.stretchTop) +
          parseFloat(
            Math.sqrt(
              Math.pow(
                subitem.position_top[0][0] - subitem.position_top[1][0],
                2
              ) +
                Math.pow(
                  subitem.position_top[0][1] - subitem.position_top[1][1],
                  2
                )
            )
          );
        temp_obj.stretchbot =
          parseFloat(temp_obj.stretchbot) +
          parseFloat(
            Math.sqrt(
              Math.pow(
                subitem.position_bottom[0][0] - subitem.position_bottom[1][0],
                2
              ) +
                Math.pow(
                  subitem.position_bottom[0][1] - subitem.position_bottom[1][1],
                  2
                )
            )
          );
        if (shots[index + 1]) {
          let init_top_x =
            (subitem.position_top[0][1] + subitem.position_top[1][1]) / 2;
          let init_top_y =
            (subitem.position_top[0][1] + subitem.position_top[1][1]) / 2;

          let fin_top_x =
            (shots[index + 1].position_top[0][1] +
              shots[index + 1].position_top[1][1]) /
            2;
          let fin_top_y =
            (shots[index + 1].position_top[0][1] +
              shots[index + 1].position_top[1][1]) /
            2;

          let init_bot_x =
            (subitem.position_bottom[0][1] + subitem.position_bottom[1][1]) / 2;
          let init_bot_y =
            (subitem.position_bottom[0][1] + subitem.position_bottom[1][1]) / 2;

          let fin_bot_x =
            (shots[index + 1].position_bottom[0][1] +
              shots[index + 1].position_bottom[1][1]) /
            2;
          let fin_bot_y =
            (shots[index + 1].position_bottom[0][1] +
              shots[index + 1].position_bottom[1][1]) /
            2;

          temp_obj.disttop =
            parseFloat(temp_obj.disttop) +
            parseFloat(
              Math.sqrt(
                Math.pow(init_top_x - fin_top_x, 2) +
                  Math.pow(init_top_y - fin_top_y, 2)
              )
            );

          temp_obj.distbot =
            parseFloat(temp_obj.distbot) +
            parseFloat(
              Math.sqrt(
                Math.pow(init_bot_x - fin_bot_x, 2) +
                  Math.pow(init_bot_y - fin_bot_y, 2)
              )
            );
        }
        if (subitem.player_played === "top") {
          if (subitem.shot_played === "L" && subitem.B_or_F === "F") {
            temp_dictionary.top_lob_count_F += 1;
          } else if (subitem.shot_played === "D" && subitem.B_or_F === "F") {
            temp_dictionary.top_drive_count_F += 1;
          } else if (subitem.shot_played === "T" && subitem.B_or_F === "F") {
            temp_dictionary.top_toss_count_F += 1;
          } else if (subitem.shot_played === "SM" && subitem.B_or_F === "F") {
            temp_dictionary.top_smash_count_F += 1;
          } else if (subitem.shot_played === "L" && subitem.B_or_F === "B") {
            temp_dictionary.top_lob_count_B += 1;
          } else if (subitem.shot_played === "D" && subitem.B_or_F === "B") {
            temp_dictionary.top_drive_count_B += 1;
          } else if (subitem.shot_played === "T" && subitem.B_or_F === "B") {
            temp_dictionary.top_toss_count_B += 1;
          } else if (subitem.shot_played === "SM" && subitem.B_or_F === "B") {
            temp_dictionary.top_smash_count_B += 1;
          }
        } else if (subitem.player_played === "bottom") {
          if (subitem.shot_played === "L" && subitem.B_or_F === "F") {
            temp_dictionary.bot_lob_count_F += 1;
          } else if (subitem.shot_played === "D" && subitem.B_or_F === "F") {
            temp_dictionary.bot_drive_count_F += 1;
          } else if (subitem.shot_played === "T" && subitem.B_or_F === "F") {
            temp_dictionary.bot_toss_count_F += 1;
          } else if (subitem.shot_played === "SM" && subitem.B_or_F === "F") {
            temp_dictionary.bot_smash_count_F += 1;
          } else if (subitem.shot_played === "L" && subitem.B_or_F === "B") {
            temp_dictionary.bot_lob_count_B += 1;
          } else if (subitem.shot_played === "D" && subitem.B_or_F === "B") {
            temp_dictionary.bot_drive_count_B += 1;
          } else if (subitem.shot_played === "T" && subitem.B_or_F === "B") {
            temp_dictionary.bot_toss_count_B += 1;
          } else if (subitem.shot_played === "SM" && subitem.B_or_F === "B") {
            temp_dictionary.bot_smash_count_B += 1;
          }
        }
      });
      final_dictionary[index + 1] = temp_dictionary;
      info_dictionary[index + 1] = temp_obj;
    });
    this.setState({
      shotCountDic: final_dictionary,
      info_dictionary: info_dictionary,
    });
  };

  render() {
    return (
      <div className="main">
        <div className="section_1">
          <div className="column_1">
            <div className="column_1_1">
              <div className="pattern_text">Pattern</div>
              <div className="pattern_input">
                <div className="dropdown_container">
                  <Dropdown
                    options={this.state.shot_type}
                    onChange={(e) => {
                      this.onSelect(e.value, 1);
                    }}
                    value={this.state.shot_type_top_1}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={true}
                    width={"80px"}
                  />
                </div>
                <div className="dropdown_container">
                  <Dropdown
                    options={this.state.shot_hand}
                    onChange={(e) => {
                      this.onSelect(e.value, 7);
                    }}
                    value={this.state.shot_hand_top_1}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={true}
                    width={"55px"}
                  />
                </div>
                <div className="dropdown_container_padding">
                  <Dropdown
                    options={this.state.shot_type}
                    onChange={(e) => {
                      this.onSelect(e.value, 2);
                    }}
                    value={this.state.shot_type_top_2}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={false}
                    width={"80px"}
                  />
                </div>
                <div className="dropdown_container">
                  <Dropdown
                    options={this.state.shot_hand}
                    onChange={(e) => {
                      this.onSelect(e.value, 8);
                    }}
                    value={this.state.shot_hand_top_2}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={false}
                    width={"55px"}
                  />
                </div>
                <div className="dropdown_container_padding">
                  <Dropdown
                    options={this.state.shot_type}
                    onChange={(e) => {
                      this.onSelect(e.value, 3);
                    }}
                    value={this.state.shot_type_top_3}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={true}
                    width={"80px"}
                  />
                </div>
                <div className="dropdown_container">
                  <Dropdown
                    options={this.state.shot_hand}
                    onChange={(e) => {
                      this.onSelect(e.value, 9);
                    }}
                    value={this.state.shot_hand_top_3}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={true}
                    width={"55px"}
                  />
                </div>
                <div className="go_button_container">
                  <button
                    className="btn_small_orange"
                    onClick={() => {
                      this.onClickGo(1);
                    }}
                  >
                    Go
                  </button>
                </div>
              </div>
              <div className="info_row">
                <button
                  className="btn_small_orange"
                  disabled
                  style={{
                    cursor: "default",
                    paddingLeft: "36px",
                    paddingRight: "36px",
                  }}
                >
                  Stretch
                </button>
                <div className="info_box">{this.state.totalStretchTop}</div>
                <div className="info_box">{this.state.avgStretchTop}</div>
                {this.state.stretchTop ? (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ stretchTop: !this.state.stretchTop });
                    }}
                  >
                    <img src={CheckedImage} style={{ height: 26, width: 26 }} />
                  </div>
                ) : (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ stretchTop: !this.state.stretchTop });
                    }}
                  ></div>
                )}
              </div>
              <div className="info_row">
                <button
                  className="btn_small_orange"
                  disabled
                  style={{
                    cursor: "default",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                  }}
                >
                  Distance
                </button>
                <div className="info_box">{this.state.totalDistanceTop}</div>
                <div className="info_box">{this.state.avgDistanceTop}</div>
                {this.state.distanceTop ? (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ distanceTop: !this.state.distanceTop });
                    }}
                  >
                    <img src={CheckedImage} style={{ height: 26, width: 26 }} />
                  </div>
                ) : (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ distanceTop: !this.state.distanceTop });
                    }}
                  ></div>
                )}
              </div>
              <div className="info_row">
                <button
                  className="btn_small_orange"
                  disabled
                  style={{ cursor: "default" }}
                >
                  Placement/Rec
                </button>
                <div className="info_box"></div>
                <div className="info_box"></div>
                {this.state.placrecTop ? (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ placrecTop: !this.state.placrecTop });
                    }}
                  >
                    <img src={CheckedImage} style={{ height: 26, width: 26 }} />
                  </div>
                ) : (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ placrecTop: !this.state.placrecTop });
                    }}
                  ></div>
                )}
              </div>
              <div className="info_row">
                <button
                  className="btn_small_orange"
                  disabled
                  style={{
                    cursor: "default",
                    paddingLeft: "36px",
                    paddingRight: "36px",
                  }}
                >
                  Height
                </button>
                <div className="info_box"></div>
                <div className="info_box"></div>
                {this.state.heightTop ? (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ heightTop: !this.state.heightTop });
                    }}
                  >
                    <img src={CheckedImage} style={{ height: 26, width: 26 }} />
                  </div>
                ) : (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ heightTop: !this.state.heightTop });
                    }}
                  ></div>
                )}
              </div>
            </div>
            <div className="div_line"></div>
            <div className="column_1_2_wrapper">
              <div className="column_1_2">
                <div
                  className="shot_types"
                  style={{ color: "rgb(173, 173, 10)" }}
                >
                  Percentages
                  {this.state.percentage ? (
                    <div
                      className="shot_checkbox"
                      style={{ marginLeft: "3%" }}
                      onClick={() => {
                        this.setState({
                          percentage: !this.state.percentage,
                          shots: !this.state.shots,
                        });
                      }}
                    >
                      <img
                        src={CheckedImage}
                        style={{ height: 16, width: 16 }}
                      />
                    </div>
                  ) : (
                    <div
                      className="shot_checkbox"
                      style={{ marginLeft: "3%" }}
                      onClick={() => {
                        this.setState({
                          percentage: !this.state.percentage,
                          shots: !this.state.shots,
                        });
                      }}
                    ></div>
                  )}
                </div>
                <div className="shot_types" style={{ color: "green" }}>
                  Shots
                  {this.state.shots ? (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "3%",
                      }}
                      onClick={() => {
                        this.setState({
                          percentage: !this.state.percentage,
                          shots: !this.state.shots,
                        });
                      }}
                    >
                      <img
                        src={CheckedImage}
                        style={{ height: 16, width: 16 }}
                      />
                    </div>
                  ) : (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "3%",
                      }}
                      onClick={() => {
                        this.setState({
                          percentage: !this.state.percentage,
                          shots: !this.state.shots,
                        });
                      }}
                    ></div>
                  )}
                </div>
              </div>
              <div className="column_1_2">
                <div
                  className="shot_types"
                  style={{ color: "rgb(173, 173, 10)" }}
                >
                  First Shot
                  {this.state.percFirstShot ? (
                    <div
                      className="shot_checkbox"
                      style={{ marginLeft: "6%" }}
                      onClick={() => {
                        // this.setState({ percFirstShot: !this.state.firstshot });
                      }}
                    >
                      <img
                        src={CheckedImage}
                        style={{ height: 16, width: 16 }}
                      />
                    </div>
                  ) : (
                    <div
                      className="shot_checkbox"
                      style={{ marginLeft: "6%" }}
                      onClick={() => {
                        this.setState({
                          percFirstShot: true,
                          percSecondShot: false,
                          percThirdShot: false,
                        });
                      }}
                    ></div>
                  )}
                </div>
                <div className="shot_types" style={{ color: "green" }}>
                  Second Shot
                  {this.state.percSecondShot ? (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "2%",
                      }}
                      onClick={() => {}}
                    >
                      <img
                        src={CheckedImage}
                        style={{ height: 16, width: 16 }}
                      />
                    </div>
                  ) : (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "2%",
                      }}
                      onClick={() => {
                        this.setState({
                          percFirstShot: false,
                          percSecondShot: true,
                          percThirdShot: false,
                        });
                      }}
                    ></div>
                  )}
                </div>
                <div className="shot_types" style={{ color: "violet" }}>
                  Third Shot
                  {this.state.percThirdShot ? (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "4.5%",
                      }}
                      onClick={() => {
                        // this.setState({ thirdshot: !this.state.thirdshot });
                      }}
                    >
                      <img
                        src={CheckedImage}
                        style={{ height: 16, width: 16 }}
                      />
                    </div>
                  ) : (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "4.5%",
                      }}
                      onClick={() => {
                        this.setState({
                          percFirstShot: false,
                          percSecondShot: false,
                          percThirdShot: true,
                        });
                      }}
                    ></div>
                  )}
                </div>
              </div>
              <div className="column_1_2">
                <div
                  className="shot_types"
                  style={{ color: "rgb(173, 173, 10)" }}
                >
                  First Shot
                  {this.state.firstshot ? (
                    <div
                      className="shot_checkbox"
                      style={{ marginLeft: "6%" }}
                      onClick={() => {
                        this.setState({ firstshot: !this.state.firstshot });
                      }}
                    >
                      <img
                        src={CheckedImage}
                        style={{ height: 16, width: 16 }}
                      />
                    </div>
                  ) : (
                    <div
                      className="shot_checkbox"
                      style={{ marginLeft: "6%" }}
                      onClick={() => {
                        this.setState({ firstshot: !this.state.firstshot });
                      }}
                    ></div>
                  )}
                </div>
                <div className="shot_types" style={{ color: "green" }}>
                  Second Shot
                  {this.state.secondshot ? (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "2%",
                      }}
                      onClick={() => {
                        this.setState({ secondshot: !this.state.secondshot });
                      }}
                    >
                      <img
                        src={CheckedImage}
                        style={{ height: 16, width: 16 }}
                      />
                    </div>
                  ) : (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "2%",
                      }}
                      onClick={() => {
                        this.setState({ secondshot: !this.state.secondshot });
                      }}
                    ></div>
                  )}
                </div>
                <div className="shot_types" style={{ color: "violet" }}>
                  Third Shot
                  {this.state.thirdshot ? (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "4.5%",
                      }}
                      onClick={() => {
                        this.setState({ thirdshot: !this.state.thirdshot });
                      }}
                    >
                      <img
                        src={CheckedImage}
                        style={{ height: 16, width: 16 }}
                      />
                    </div>
                  ) : (
                    <div
                      className="shot_checkbox"
                      style={{
                        marginTop: "1%",
                        marginLeft: "4.5%",
                      }}
                      onClick={() => {
                        this.setState({ thirdshot: !this.state.thirdshot });
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
            <div className="div_line"></div>
            <div className="column_1_3">
              <div className="pattern_text">Pattern</div>
              <div className="pattern_input">
                <div className="dropdown_container">
                  <Dropdown
                    options={this.state.shot_type}
                    onChange={(e) => {
                      this.onSelect(e.value, 4);
                    }}
                    value={this.state.shot_type_bot_1}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={false}
                    width={"80px"}
                  />
                </div>
                <div className="dropdown_container">
                  <Dropdown
                    options={this.state.shot_hand}
                    onChange={(e) => {
                      this.onSelect(e.value, 10);
                    }}
                    value={this.state.shot_hand_bot_1}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={false}
                    width={"55px"}
                  />
                </div>
                <div className="dropdown_container_padding">
                  <Dropdown
                    options={this.state.shot_type}
                    onChange={(e) => {
                      this.onSelect(e.value, 5);
                    }}
                    value={this.state.shot_type_bot_2}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={true}
                    width={"80px"}
                  />
                </div>
                <div className="dropdown_container">
                  <Dropdown
                    options={this.state.shot_hand}
                    onChange={(e) => {
                      this.onSelect(e.value, 11);
                    }}
                    value={this.state.shot_hand_bot_2}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={true}
                    width={"55px"}
                  />
                </div>
                <div className="dropdown_container_padding">
                  <Dropdown
                    options={this.state.shot_type}
                    onChange={(e) => {
                      this.onSelect(e.value, 6);
                    }}
                    value={this.state.shot_type_bot_3}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={false}
                    width={"80px"}
                  />
                </div>
                <div className="dropdown_container">
                  <Dropdown
                    options={this.state.shot_hand}
                    onChange={(e) => {
                      this.onSelect(e.value, 12);
                    }}
                    value={this.state.shot_hand_bot_3}
                    placeholder="Select an option"
                    className="dropdown_custom"
                    isOrange={false}
                    width={"55px"}
                  />
                </div>
                <div className="go_button_container">
                  <button
                    className="btn_small_teal"
                    onClick={() => {
                      this.onClickGo(2);
                    }}
                  >
                    Go
                  </button>
                </div>
              </div>
              <div className="info_row">
                <button
                  className="btn_small_teal"
                  disabled
                  style={{
                    cursor: "default",
                    paddingLeft: "36px",
                    paddingRight: "36px",
                  }}
                >
                  Stretch
                </button>
                <div className="info_box">{this.state.totalStretchBot}</div>
                <div className="info_box">{this.state.avgStretchBot}</div>
                {this.state.stretchBot ? (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ stretchBot: !this.state.stretchBot });
                    }}
                  >
                    <img src={CheckedImage} style={{ height: 26, width: 26 }} />
                  </div>
                ) : (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ stretchBot: !this.state.stretchBot });
                    }}
                  ></div>
                )}
              </div>
              <div className="info_row">
                <button
                  className="btn_small_teal"
                  disabled
                  style={{
                    cursor: "default",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                  }}
                >
                  Distance
                </button>
                <div className="info_box">{this.state.totalDistanceBot}</div>
                <div className="info_box">{this.state.avgDistanceBot}</div>
                {this.state.distanceBot ? (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ distanceBot: !this.state.distanceBot });
                    }}
                  >
                    <img src={CheckedImage} style={{ height: 26, width: 26 }} />
                  </div>
                ) : (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ distanceBot: !this.state.distanceBot });
                    }}
                  ></div>
                )}
              </div>
              <div className="info_row">
                <button
                  className="btn_small_teal"
                  disabled
                  style={{ cursor: "default" }}
                >
                  Placement/Rec
                </button>
                <div className="info_box"></div>
                <div className="info_box"></div>
                {this.state.placrecBot ? (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ placrecBot: !this.state.placrecBot });
                    }}
                  >
                    <img src={CheckedImage} style={{ height: 26, width: 26 }} />
                  </div>
                ) : (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ placrecBot: !this.state.placrecBot });
                    }}
                  ></div>
                )}
              </div>
              <div className="info_row">
                <button
                  className="btn_small_teal"
                  disabled
                  style={{
                    cursor: "default",
                    paddingLeft: "36px",
                    paddingRight: "36px",
                  }}
                >
                  Height
                </button>
                <div className="info_box"></div>
                <div className="info_box"></div>
                {this.state.heightBot ? (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ heightBot: !this.state.heightBot });
                    }}
                  >
                    <img src={CheckedImage} style={{ height: 26, width: 26 }} />
                  </div>
                ) : (
                  <div
                    className="info_box_checkbox"
                    onClick={() => {
                      this.setState({ heightBot: !this.state.heightBot });
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
          <div className="column_2">
            <div className="column_2_1">
              {this.state.badminton_array ? (
                <Field
                  shots={this.state.graph_data}
                  pattern_array={this.state.pattern_array}
                  patter_length={this.state.patter_length}
                  firstshot={this.state.firstshot}
                  secondshot={this.state.secondshot}
                  thirdshot={this.state.thirdshot}
                  perc={this.state.percentage}
                  arrows={this.state.shots}
                  percFirstShot={this.state.percFirstShot}
                  percSecondShot={this.state.percSecondShot}
                  percThirdShot={this.state.percThirdShot}
                  isRightSide={this.state.isRightSide}
                  rightSideData={this.state.rightSideData}
                  stretchTop={this.state.stretchTop}
                  stretchBot={this.state.stretchBot}
                  distanceTop={this.state.distanceTop}
                  distanceBot={this.state.distanceBot}
                  indShot={this.state.indShot}
                ></Field>
              ) : null}
            </div>
            <div className="column_2_2">
              <div
                className="stats_info_row"
                style={{
                  color: "rgb(255, 154, 71)",
                }}
              >
                <div
                  className="stats_info_cont"
                  style={{
                    marginBottom: "25%",
                  }}
                >
                  <div className="stats_info_row_ind">
                    <div
                      className="stats_info_ind_comp"
                      style={{
                        color: "rgb(255, 154, 71)",
                      }}
                    >
                      Smash
                      <div
                        className="stats_info_box"
                        style={{
                          marginRight: "5px",
                          marginLeft: "5px",
                        }}
                      >
                        {this.state.top_smash_count_F}
                      </div>
                      <div className="stats_info_box">
                        {this.state.top_smash_count_B}
                      </div>
                    </div>
                    <div
                      className="stats_info_ind_comp"
                      style={{
                        color: "rgb(255, 154, 71)",
                      }}
                    >
                      Toss
                      <div
                        className="stats_info_box"
                        style={{
                          marginRight: "5px",
                          marginLeft: "13%",
                        }}
                      >
                        {this.state.top_toss_count_F}
                      </div>
                      <div className="stats_info_box">
                        {this.state.top_toss_count_B}
                      </div>
                    </div>
                  </div>

                  <div className="stats_info_row_ind">
                    <div
                      className="stats_info_ind_comp"
                      style={{
                        color: "rgb(255, 154, 71)",
                      }}
                    >
                      Lob
                      <div
                        className="stats_info_box"
                        style={{
                          marginRight: "5px",
                          marginLeft: "23%",
                        }}
                      >
                        {this.state.top_lob_count_F}
                      </div>
                      <div className="stats_info_box">
                        {this.state.top_lob_count_B}
                      </div>
                    </div>
                    <div
                      className="stats_info_ind_comp"
                      style={{
                        color: "rgb(255, 154, 71)",
                      }}
                    >
                      Drive
                      <div
                        className="stats_info_box"
                        style={{
                          marginRight: "5px",
                          marginLeft: "5px",
                        }}
                      >
                        {this.state.top_drive_count_F}
                      </div>
                      <div className="stats_info_box">
                        {this.state.top_drive_count_B}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="player_photo">player photo</div>
              </div>
              {this.state.points_table === null ? null : (
                <div className="points_table_cont">
                  <div className="points_table_column">
                    <div
                      className="points_table_box"
                      style={{
                        borderBottom: "2px solid rgb(85,85,85)",
                        color: "rgb(255, 154, 71)",
                      }}
                    >
                      {this.state.points_table[0].current_set_top_init_score}
                    </div>
                    <div className="points_table_box" style={{ color: "teal" }}>
                      {this.state.points_table[0].current_set_bottom_init_score}
                    </div>
                  </div>
                  <div className="points_table_column">
                    <div
                      className="points_table_box"
                      style={{
                        borderBottom: "2px solid rgb(85,85,85)",
                        color: "rgb(255, 154, 71)",
                      }}
                    >
                      {this.state.points_table[1].current_set_top_init_score}
                    </div>
                    <div className="points_table_box" style={{ color: "teal" }}>
                      {this.state.points_table[1].current_set_bottom_init_score}
                    </div>
                  </div>
                  <div className="points_table_column">
                    <div
                      className="points_table_box"
                      style={{
                        borderBottom: "2px solid rgb(85,85,85)",
                        color: "rgb(255, 154, 71)",
                      }}
                    >
                      {this.state.points_table[2]
                        ? this.state.points_table[2].current_set_top_init_score
                        : 0}
                    </div>
                    <div className="points_table_box" style={{ color: "teal" }}>
                      {this.state.points_table[2]
                        ? this.state.points_table[2]
                            .current_set_bottom_init_score
                        : 0}
                    </div>
                  </div>
                </div>
              )}
              <div
                className="stats_info_row"
                style={{
                  color: "teal",
                }}
              >
                <div className="player_photo">player photo</div>
                <div
                  className="stats_info_cont"
                  style={{
                    marginTop: "25%",
                  }}
                >
                  <div className="stats_info_row_ind">
                    <div
                      className="stats_info_ind_comp"
                      style={{
                        color: "teal",
                      }}
                    >
                      Smash
                      <div
                        className="stats_info_box"
                        style={{
                          marginRight: "5px",
                          marginLeft: "5px",
                        }}
                      >
                        {this.state.bot_smash_count_F}
                      </div>
                      <div className="stats_info_box">
                        {this.state.bot_smash_count_B}
                      </div>
                    </div>
                    <div
                      className="stats_info_ind_comp"
                      style={{
                        color: "teal",
                      }}
                    >
                      Toss
                      <div
                        className="stats_info_box"
                        style={{
                          marginRight: "5px",
                          marginLeft: "13%",
                        }}
                      >
                        {this.state.bot_toss_count_F}
                      </div>
                      <div className="stats_info_box">
                        {this.state.bot_toss_count_B}
                      </div>
                    </div>
                  </div>
                  <div className="stats_info_row_ind">
                    <div
                      className="stats_info_ind_comp"
                      style={{
                        color: "teal",
                      }}
                    >
                      Lob
                      <div
                        className="stats_info_box"
                        style={{
                          marginRight: "5px",
                          marginLeft: "23%",
                        }}
                      >
                        {this.state.bot_lob_count_F}
                      </div>
                      <div className="stats_info_box">
                        {this.state.bot_lob_count_B}
                      </div>
                    </div>
                    <div
                      className="stats_info_ind_comp"
                      style={{
                        color: "teal",
                      }}
                    >
                      Drive
                      <div
                        className="stats_info_box"
                        style={{
                          marginRight: "5px",
                          marginLeft: "5px",
                        }}
                      >
                        {this.state.bot_drive_count_F}
                      </div>
                      <div className="stats_info_box">
                        {this.state.bot_drive_count_B}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column_3">
            <div className="right_buttons_cont">
              <button
                className="btn_orange"
                onClick={() => {
                  this.setState({
                    top_forehand: !this.state.top_forehand,
                    bot_backhand: false,
                    bot_forehand: false,
                  });
                }}
                style={{
                  backgroundColor: this.state.top_forehand
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Forehand
              </button>
              <button
                className="btn_orange"
                onClick={() => {
                  this.setState({
                    top_backhand: !this.state.top_backhand,
                    bot_backhand: false,
                    bot_forehand: false,
                  });
                }}
                style={{
                  backgroundColor: this.state.top_backhand
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Backhand
              </button>
            </div>
            <button
              className="btn_small_orange"
              onClick={() => {
                this.setState({
                  top_winners: !this.state.top_winners,
                  top_losers: false,
                  top_losers_net: false,
                  top_losers_plac: false,
                  top_losers_smash: false,
                });
              }}
              style={{
                backgroundColor: this.state.top_winners
                  ? "rgb(33, 33, 33)"
                  : "rgb(63, 63, 63)",
              }}
            >
              Winners
            </button>
            <div className="right_buttons_cont_1">
              <button
                className="btn_orange"
                onClick={() => {
                  this.setState({
                    top_win_smash: !this.state.top_win_smash,
                    top_win_plac: false,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.top_win_smash
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Smash
              </button>
              <button
                className="btn_orange"
                onClick={() => {
                  this.setState({
                    top_win_plac: !this.state.top_win_plac,
                    top_win_smash: false,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.top_win_plac
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Placement
              </button>
            </div>
            <button
              className="btn_small_orange"
              onClick={() => {
                this.setState({
                  top_winners: false,
                  top_losers: !this.state.top_losers,
                  top_win_smash: false,
                  top_win_plac: false,
                });
              }}
              style={{
                backgroundColor: this.state.top_losers
                  ? "rgb(33, 33, 33)"
                  : "rgb(63, 63, 63)",
              }}
            >
              Losers
            </button>
            <div className="right_buttons_cont_1">
              <button
                className="btn_orange"
                onClick={() => {
                  this.setState({
                    top_losers_smash: !this.state.top_losers_smash,
                    top_losers_plac: false,
                    top_losers_net: false,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.top_losers_smash
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Smash
              </button>
              <button
                className="btn_orange"
                onClick={() => {
                  this.setState({
                    top_losers_plac: !this.state.top_losers_plac,
                    top_losers_net: false,
                    top_losers_smash: false,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.top_losers_plac
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Placement
              </button>
              <button
                className="btn_orange"
                onClick={() => {
                  this.setState({
                    top_losers_net: !this.state.top_losers_net,
                    top_losers_smash: false,
                    top_losers_plac: false,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.top_losers_net
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Net
              </button>
            </div>
            <button
              className="btn_custom"
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                padding: "14px 24px",
              }}
              onClick={() => {
                if (
                  this.state.top_backhand === true ||
                  this.state.top_forehand === true
                ) {
                  this.onClickPoints(0);
                } else {
                  this.onClickPoints(1);
                }
              }}
            >
              Points
            </button>
            <div className="right_buttons_cont">
              <button
                className="btn_teal"
                onClick={() => {
                  this.setState({
                    bot_forehand: !this.state.bot_forehand,
                    top_forehand: false,
                    top_backhand: false,
                  });
                }}
                style={{
                  backgroundColor: this.state.bot_forehand
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Forehand
              </button>
              <button
                className="btn_teal"
                onClick={() => {
                  this.setState({
                    bot_backhand: !this.state.bot_backhand,
                    top_forehand: false,
                    top_backhand: false,
                  });
                }}
                style={{
                  backgroundColor: this.state.bot_backhand
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Backhand
              </button>
            </div>
            <button
              className="btn_small_teal"
              onClick={() => {
                this.setState({
                  bot_winners: !this.state.bot_winners,
                  bot_losers: false,
                  bot_losers_net: false,
                  bot_losers_plac: false,
                  bot_losers_smash: false,
                });
              }}
              style={{
                backgroundColor: this.state.bot_winners
                  ? "rgb(33, 33, 33)"
                  : "rgb(63, 63, 63)",
              }}
            >
              Winners
            </button>
            <div className="right_buttons_cont_1">
              <button
                className="btn_teal"
                onClick={() => {
                  this.setState({
                    bot_win_smash: !this.state.bot_win_smash,
                    bot_win_plac: false,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.bot_win_smash
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Smash
              </button>
              <button
                className="btn_teal"
                onClick={() => {
                  this.setState({
                    bot_win_plac: !this.state.bot_win_plac,
                    bot_win_smash: false,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.bot_win_plac
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Placement
              </button>
            </div>
            <button
              className="btn_small_teal"
              onClick={() => {
                this.setState({
                  bot_winners: false,
                  bot_losers: !this.state.bot_losers,
                  bot_win_smash: false,
                  bot_win_plac: false,
                });
              }}
              style={{
                backgroundColor: this.state.bot_losers
                  ? "rgb(33, 33, 33)"
                  : "rgb(63, 63, 63)",
              }}
            >
              Losers
            </button>
            <div className="right_buttons_cont_1">
              <button
                className="btn_teal"
                onClick={() => {
                  this.setState({
                    bot_losers_smash: !this.state.bot_losers_smash,
                    bot_losers_plac: false,
                    bot_losers_net: false,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.bot_losers_smash
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Smash
              </button>
              <button
                className="btn_teal"
                onClick={() => {
                  this.setState({
                    bot_losers_smash: false,
                    bot_losers_plac: !this.state.bot_losers_plac,
                    bot_losers_net: false,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.bot_losers_plac
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Placement
              </button>
              <button
                className="btn_teal"
                onClick={() => {
                  this.setState({
                    bot_losers_smash: false,
                    bot_losers_plac: false,
                    bot_losers_net: !this.state.bot_losers_net,
                  });
                }}
                style={{
                  flex: 1,
                  backgroundColor: this.state.bot_losers_net
                    ? "rgb(33, 33, 33)"
                    : "rgb(63, 63, 63)",
                }}
              >
                Net
              </button>
            </div>
          </div>
        </div>
        <div className="bottom_bar">
          <div className="bottom_bar_row_1">
            <img
              src={UpArrowImg}
              style={{ height: 32, width: 32 }}
              onClick={() => {
                this.OnChangeTimeLineSize(1);
              }}
            />
            <img
              src={DownArrowImg}
              style={{ height: 32, width: 32 }}
              onClick={() => {
                this.OnChangeTimeLineSize(0);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "94%",
            }}
          >
            <div className="above_timeline">
              <div className="at_group">
                Rally:
                <input
                  type="number"
                  className="at_elements"
                  value={
                    this.state.leftRallyDisp === NaN
                      ? ""
                      : this.state.leftRallyDisp + 1
                  }
                  maxLength="3"
                  rows="1"
                  onChange={(e) => {
                    let rally_number_disp = parseInt(e.target.value) - 1;
                    let rally_number = -1;
                    let left_score_set1 = 0;
                    let right_score_set1 = 0;
                    let left_score_set2 = 0;
                    let right_score_set2 = 0;
                    let left_score_set3 = 0;
                    let right_score_set3 = 0;
                    if (e.target.value != "") {
                      if (this.state.setLeft === 1) {
                        rally_number = rally_number_disp;
                        let rall_info = badminton_points_data[e.target.value];
                        left_score_set1 = rall_info.current_set_top_init_score;
                        right_score_set1 =
                          rall_info.current_set_bottom_init_score;
                      } else if (this.state.setLeft === 2) {
                        rally_number =
                          rally_number_disp + this.state.setArray[0] + 1;
                        let rall_info =
                          badminton_points_data[(rally_number + 1).toString()];

                        left_score_set2 = rall_info.current_set_top_init_score;
                        right_score_set2 =
                          rall_info.current_set_bottom_init_score;
                        left_score_set1 = this.state.points_table[0]
                          .current_set_top_init_score;
                        right_score_set1 = this.state.points_table[0]
                          .current_set_bottom_init_score;
                      } else if (this.state.setLeft === 3) {
                        if (this.state.setArray[1]) {
                          rally_number =
                            rally_number_disp + this.state.setArray[1] + 1;
                          let rall_info =
                            badminton_points_data[
                              (rally_number + 1).toString()
                            ];

                          left_score_set2 = this.state.points_table[1]
                            .current_set_top_init_score;
                          right_score_set2 = this.state.points_table[1]
                            .current_set_bottom_init_score;
                          left_score_set1 = this.state.points_table[0]
                            .current_set_top_init_score;
                          right_score_set1 = this.state.points_table[0]
                            .current_set_bottom_init_score;
                          left_score_set3 =
                            rall_info.current_set_top_init_score;
                          right_score_set3 =
                            rall_info.current_set_bottom_init_score;
                        }
                      }
                    }

                    this.setState({
                      leftRallyDisp: parseInt(e.target.value) - 1,
                      leftRally: rally_number,
                      firstClick: false,
                      left_top_score_set1: left_score_set1,
                      left_bot_score_set1: right_score_set1,
                      left_top_score_set2: left_score_set2,
                      left_bot_score_set2: right_score_set2,
                      left_top_score_set3: left_score_set3,
                      left_bot_score_set3: right_score_set3,
                    });
                  }}
                ></input>
                Set:
                <input
                  type="number"
                  className="at_elements"
                  value={this.state.setLeft === NaN ? "" : this.state.setLeft}
                  maxLength="3"
                  rows="1"
                  onChange={(e) => {
                    this.setState({
                      setLeft: parseInt(e.target.value),
                      // firstClick: false,
                    });
                  }}
                ></input>
                <div className="at_elements_score">
                  <div className="scoreDiv">
                    {this.state.left_top_score_set1}-
                    {this.state.left_bot_score_set1}
                  </div>
                  <div className="scoreDiv">
                    {this.state.left_top_score_set2}-
                    {this.state.left_bot_score_set2}
                  </div>
                  <div className="scoreDiv">
                    {this.state.left_top_score_set3}-
                    {this.state.left_bot_score_set3}
                  </div>
                </div>
              </div>
              <div className="at_group">
                <div className="at_elements_score">
                  <div className="scoreDiv">
                    {this.state.right_top_score_set1}-
                    {this.state.right_bot_score_set1}
                  </div>
                  <div className="scoreDiv">
                    {this.state.right_top_score_set2}-
                    {this.state.right_bot_score_set2}
                  </div>
                  <div className="scoreDiv">
                    {this.state.right_top_score_set3}-
                    {this.state.right_bot_score_set3}
                  </div>
                </div>
                Set:
                <input
                  type="number"
                  className="at_elements"
                  value={this.state.setRight === NaN ? "" : this.state.setRight}
                  maxLength="3"
                  rows="1"
                  onChange={(e) => {
                    this.setState({
                      setRight: parseInt(e.target.value),
                      // firstClick: true,
                    });
                  }}
                ></input>
                Rally:
                <input
                  type="number"
                  className="at_elements"
                  value={
                    this.state.rightRallyDisp === NaN
                      ? ""
                      : this.state.rightRallyDisp + 1
                  }
                  maxLength="3"
                  rows="1"
                  onChange={(e) => {
                    let rally_number_disp = parseInt(e.target.value) - 1;
                    let rally_number = -1;
                    let left_score_set1 = 0;
                    let right_score_set1 = 0;
                    let left_score_set2 = 0;
                    let right_score_set2 = 0;
                    let left_score_set3 = 0;
                    let right_score_set3 = 0;
                    if (e.target.value != "") {
                      if (this.state.setRight === 1) {
                        rally_number = rally_number_disp;
                        let rall_info = badminton_points_data[e.target.value];
                        left_score_set1 = rall_info.current_set_top_init_score;
                        right_score_set1 =
                          rall_info.current_set_bottom_init_score;
                      } else if (this.state.setRight === 2) {
                        rally_number =
                          rally_number_disp + this.state.setArray[0];
                        let rall_info =
                          badminton_points_data[(rally_number + 1).toString()];

                        left_score_set2 = rall_info.current_set_top_init_score;
                        right_score_set2 =
                          rall_info.current_set_bottom_init_score;
                        left_score_set1 = this.state.points_table[0]
                          .current_set_top_init_score;
                        right_score_set1 = this.state.points_table[0]
                          .current_set_bottom_init_score;
                      } else if (this.state.setRight === 3) {
                        if (this.state.setArray[1]) {
                          rally_number =
                            rally_number_disp + this.state.setArray[1];
                          let rall_info =
                            badminton_points_data[
                              (rally_number + 1).toString()
                            ];

                          left_score_set2 = this.state.points_table[1]
                            .current_set_top_init_score;
                          right_score_set2 = this.state.points_table[1]
                            .current_set_bottom_init_score;
                          left_score_set1 = this.state.points_table[0]
                            .current_set_top_init_score;
                          right_score_set1 = this.state.points_table[0]
                            .current_set_bottom_init_score;
                          left_score_set3 =
                            rall_info.current_set_top_init_score;
                          right_score_set3 =
                            rall_info.current_set_bottom_init_score;
                        }
                      }
                    }

                    this.setState({
                      rightRallyDisp: parseInt(e.target.value) - 1,
                      rightRally: rally_number,
                      firstClick: true,
                      right_top_score_set1: left_score_set1,
                      right_bot_score_set1: right_score_set1,
                      right_top_score_set2: left_score_set2,
                      right_bot_score_set2: right_score_set2,
                      right_top_score_set3: left_score_set3,
                      right_bot_score_set3: right_score_set3,
                    });
                  }}
                ></input>
              </div>
            </div>
            <div className="right_buttons_cont_1">
              <img
                src={LeftArrowImage}
                style={{ height: 32, width: 32 }}
                onClick={() => {
                  this.onScrollLeft();
                }}
              />
              <Timeline
                numberFactor={this.state.numberFactor}
                factor={this.state.factor}
                onClickRally={this.onClickRally}
              />
              <img
                src={RightArrowImage}
                style={{ height: 32, width: 32 }}
                onClick={() => {
                  this.onScrollRight();
                }}
                // onMouseUp={()=>{
                //   this.endInterval()
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Badminton;

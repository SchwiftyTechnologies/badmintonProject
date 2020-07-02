import React, { Component } from "react";
import "./styles.css";
import badminton_data from "../Badminton_data_14.json";

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="timeline" id="timeline">
        {Object.values(badminton_data).map((item, index) => {
          return (
            <div
              style={{
                backgroundColor: "rgb(63, 63, 63)",
                minWidth:
                  (
                    (item.end_time - item.start_time) /
                    this.props.factor
                  ).toString() + "px",
                marginTop: "3px",
                marginBottom: "3px",
                marginLeft: Object.values(badminton_data)[index - 1]
                  ? (
                      (item.start_time -
                        Object.values(badminton_data)[index - 1].end_time) /
                      (this.props.factor * 5)
                    ).toString() + "px"
                  : "3px",
                marginRight: "3px",
                textAlign: "center",
                color: "rgb(173, 173, 10)",
                fontSize: (55 / this.props.numberFactor).toString() + "px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onClick={() => {
                this.props.onClickRally(index);
              }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Timeline;

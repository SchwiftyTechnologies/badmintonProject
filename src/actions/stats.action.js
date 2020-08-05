const getDistance = (xA, yA, xB, yB) => {
  var xDiff = xA - xB;
  var yDiff = yA - yB;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
};

export const UpdateStretch = (x1, y1, x2, y2, player, count) => {
  if (player === "top") {
    let val = getDistance(x1, y1, x2, y2);

    return {
      type: "UPDATE_STRETCH_TOP",
      payload: {
        val: val,
        count: count,
      },
    };
  } else {
    let val = getDistance(x1, y1, x2, y2);

    return {
      type: "UPDATE_STRETCH_BOT",
      payload: {
        val: val,
        count: count,
      },
    };
  }
};

export const ResetStretch = () => {
  return {
    type: "RESET_STRETCH",
    payload: {},
  };
};

export const ResetDistance = () => {
  return {
    type: "RESET_DISTANCE",
    payload: {},
  };
};

export const UpdateDistance = (x1, y1, x2, y2, player, count) => {
  if (player === "top") {
    let val = getDistance(x1, y1, x2, y2);

    return {
      type: "UPDATE_DISTANCE_TOP",
      payload: {
        val: val,
        count: count,
      },
    };
  } else {
    let val = getDistance(x1, y1, x2, y2);

    return {
      type: "UPDATE_DISTANCE_BOT",
      payload: {
        val: val,
        count: count,
      },
    };
  }
};

export const UpdateReac = (t1, t2, count, player) => {
  if (player === "top") {
    let val = parseFloat(t2) - parseFloat(t1);

    return {
      type: "UPDATE_REC_TOP",
      payload: {
        val: val,
        count: count,
      },
    };
  } else {
    let val = t2 - t1;

    return {
      type: "UPDATE_REC_BOT",
      payload: {
        val: val,
        count: count,
      },
    };
  }
};

export const UpdateHeight = (h1, h2, player) => {
  if (player === "top") {
    return {
      type: "UPDATE_HEIGHT",
      payload: {
        valForTop: h1,
        valForBot: h2
      }
    }
  }
  else {
    return {
      type: "UPDATE_HEIGHT",
      payload: {
        valForTop: h2,
        valForBot: h1
      }
    }
  }

}

export const ResetCount = () => {
  return {
    type: "RESET_COUNT",
    payload: {},
  };
};

export const AddCount = () => {
  return {
    type: "ADD_COUNT",
    payload: {},
  };
};

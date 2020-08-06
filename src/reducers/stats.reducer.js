const initialState = {
  averageStretchTop: 0,
  totalStretchTop: 0,
  averageStretchBot: 0,
  totalStretchBot: 0,
  averageDistanceTop: 0,
  totalDistanceTop: 0,
  averageDistanceBot: 0,
  totalDistanceBot: 0,
  averageRecTop: 0,
  totalRecTop: 0,
  averageRecBot: 0,
  totalRecBot: 0,
  count: 0,
  totalHeightTop: 0,
  totalHeightBot: 0,
  averageHeightBot: 0,
  averageHeightTop: 0,
};

export default function statsReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_STRETCH_TOP":
      let val = parseFloat(action.payload.val);
      let total = parseFloat(state.totalStretchTop) + val / 100;
      let avg = (
        total / parseFloat(state.count * action.payload.count)
      ).toFixed(2);

      let fin_total = total.toFixed(2);
      return { ...state, averageStretchTop: avg, totalStretchTop: fin_total };
    case "UPDATE_STRETCH_BOT":
      let val_bot = parseFloat(action.payload.val);
      let total_bot = parseFloat(state.totalStretchBot) + val_bot / 100;
      let avg_bot = (
        total_bot / parseFloat(state.count * action.payload.count)
      ).toFixed(2);

      let fin_total_bot = total_bot.toFixed(2);
      return {
        ...state,
        averageStretchBot: avg_bot,
        totalStretchBot: fin_total_bot,
      };
    case "UPDATE_DISTANCE_TOP":
      let val_dis = parseFloat(action.payload.val);
      let total_dis = parseFloat(state.totalDistanceTop) + val_dis / 100;
      let avg_dis = (
        total_dis / parseFloat(state.count * action.payload.count)
      ).toFixed(2);

      let fin_total_dis = total_dis.toFixed(2);
      return {
        ...state,
        averageDistanceTop: avg_dis,
        totalDistanceTop: fin_total_dis,
      };
    case "UPDATE_DISTANCE_BOT":
      let val_dis_bot = parseFloat(action.payload.val);
      let total_dis_bot =
        parseFloat(state.totalDistanceBot) + val_dis_bot / 100;
      let avg_dis_bot = (
        total_dis_bot / parseFloat(state.count * action.payload.count)
      ).toFixed(2);

      let fin_total_dis_bot = total_dis_bot.toFixed(2);
      return {
        ...state,
        averageDistanceBot: avg_dis_bot,
        totalDistanceBot: fin_total_dis_bot,
      };
    case "UPDATE_REC_TOP":
      let val_rec = parseFloat(action.payload.val);
      let total_rec = parseFloat(state.totalRecTop) + val_rec;
      let avg_rec = (total_rec / parseFloat(state.count)).toFixed(2);

      let fin_total_rec = total_rec.toFixed(2);
      return {
        ...state,
        averageRecTop: avg_rec,
        totalRecTop: fin_total_rec,
      };
    case "UPDATE_REC_BOT":
      let val_rec_bot = parseFloat(action.payload.val);
      let total_rec_bot = parseFloat(state.totalRecBot) + val_rec_bot;
      let avg_rec_bot = (total_rec_bot / parseFloat(state.count)).toFixed(2);

      let fin_total_rec_bot = total_rec_bot.toFixed(2);
      return {
        ...state,
        averageRecBot: avg_rec_bot,
        totalRecBot: fin_total_rec_bot,
      };
    case "RESET_STRETCH": {
      return {
        ...state,
        averageStretchTop: 0,
        totalStretchTop: 0,
        averageStretchBot: 0,
        totalStretchBot: 0,
      };
    }
    case "RESET_DISTANCE": {
      return {
        ...state,
        averageDistanceTop: 0,
        totalDistanceTop: 0,
        averageDistanceBot: 0,
        totalDistanceBot: 0,
        averageRecTop: 0,
        totalRecTop: 0,
        averageRecBot: 0,
        totalRecBot: 0,
        totalHeightTop: 0,
        totalHeightBot: 0,
        averageHeightBot: 0,
        averageHeightTop: 0,
      };
    }
    case "RESET_COUNT": {
      return {
        ...state,
        count: 0,
      };
    }
    case "ADD_COUNT": {
      let new_count = state.count + 1;
      return {
        ...state,
        count: new_count,
      };
    }
    case "UPDATE_HEIGHT": {
      let new_height_of_top = parseFloat(
        parseFloat(state.totalHeightTop) +
          parseFloat(action.payload.valForTop) / 100
      );
      let new_height_of_bot = parseFloat(
        parseFloat(state.totalHeightBot) +
          parseFloat(action.payload.valForBot) / 100
      );
      let avg_height_top = (
        new_height_of_top / parseFloat(state.count)
      ).toFixed(2);
      let avg_height_bot = (
        new_height_of_bot / parseFloat(state.count)
      ).toFixed(2);
      return {
        ...state,
        totalHeightTop: new_height_of_top.toFixed(2),
        totalHeightBot: new_height_of_bot.toFixed(2),
        averageHeightBot: avg_height_bot,
        averageHeightTop: avg_height_top,
      };
    }
    default:
      return { ...state };
  }
}

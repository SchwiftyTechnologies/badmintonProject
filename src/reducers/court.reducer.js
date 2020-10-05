const initialState = {
  selectedPart: [],
  valuesArray: [],
};

export default function courtReducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_PARTS": {
      return {
        ...state,
        selectedPart: [],
      };
    }
    case "SET_VALUES_ARRAY": {
      return {
        ...state,
        valuesArray: action.payload.valuesArray,
      };
    }
    default:
      return { ...state };
  }
}

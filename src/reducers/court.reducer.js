const initialState = {
  selectedPart: [],
};

export default function courtReducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_PARTS": {
      return {
        ...state,
        selectedPart: [],
      };
    }
    default:
      return { ...state };
  }
}

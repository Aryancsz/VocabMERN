const initialState = {
  results: [],
};

const WordReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "RESULTS":
      return { ...state, results: payload };
    default:
      return state;
  }
};

export default WordReducer;

const initialState = {
  searchWords: {},
};

const WordReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SEARCH_RESULTS":
      return { ...state, searchWords: payload };
    default:
      return state;
  }
};

export default WordReducer;

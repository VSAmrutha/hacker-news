const INITIAL_STATE = {
  data: [],
  page: 0,
  totalPages: 20,
  hiddenElements: [],
  votes: [],
  changedPage: false,
};
const saveData = (state, action) => {
  return {
    ...state,
    data: action.data.hits,
    totalPages: action.data.nbPages - 1,
  };
};
const onPaginateHandler = (state, action) => {
  let pageVal = state.page;
  if (action.data === "previous") {
    pageVal -= 1;
  } else if (action.data === "next") {
    pageVal += 1;
  }

  return {
    ...state,
    page: pageVal,
    changedPage: true,
  };
};
const onHideHandler = (state, action) => {
  let filterData = state.data.filter(
    (item) => item.objectID !== action.data.objectID
  );

  let hideVal = [...state.hiddenElements, action.data];
  return {
    ...state,
    data: [...filterData],
    hiddenElements: [...hideVal],
    changedPage: false,
  };
};
const onUpVoteHandler = (state, action) => {
  let dataVote = [...state.data];
  dataVote.forEach((item) => {
    if (item.objectID === action.data.objectID) {
      return (item.vote = true);
    }
  });

  let voteVal = [...state.votes, action.data];
  return {
    ...state,
    data: [...dataVote],
    votes: [...voteVal],
    changedPage: false,
  };
};

const onDeleteHandler = (state) => {
  return (state = INITIAL_STATE);
};
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SAVE_DATA": {
      return saveData(state, action);
    }
    case "PAGINATE": {
      return onPaginateHandler(state, action);
    }
    case "HIDE_DATA": {
      return onHideHandler(state, action);
    }
    case "UPVOTE_DATA": {
      return onUpVoteHandler(state, action);
    }

    case "DELETE_DATA": {
      return onDeleteHandler(state);
    }

    default:
      return state;
  }
}
export default reducer;

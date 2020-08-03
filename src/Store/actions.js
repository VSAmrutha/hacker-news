import axios from "axios";

export function fetchData() {
  return function (dispatch) {
    axios
      .get(`http://hn.algolia.com/api/v1/search?page=1`)
      .then((response) => {
        dispatch({ type: "FETCH_FULFILLED", payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_REJECTED", payload: err });
      });
  };
}

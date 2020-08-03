import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Table.module.css";
import upvote from "../../assets/upvote2.png";
import Button from "../Button/Button";
import classnames from "classnames";
import { connect } from "react-redux";

function Table(props) {
  const { page, data } = props;
  const [err, SetErr] = useState(false);
  useEffect(() => {
    fecthData();
  }, [page]);
  const fecthData = async () => {
    try {
      const fetchRes = await axios.get(
        `https://hn.algolia.com/api/v1/search?page=${page}`
      );
      if (
        page !== fetchRes.data.page ||
        data.length === 0 ||
        props.changedPage
      ) {
        props.saveData(fetchRes.data);
      }
      SetErr(false);
    } catch (error) {
      SetErr(true);
    }
  };

  const urlEditor = (url) => {
    let urlArr = url && url.split("/");

    return urlArr && urlArr[2];
  };
  const timeStamp = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours > 0 && hours !== 0) {
      return `${hours} hours ago`;
    } else {
      return `${minutes} minutes ago`;
    }
  };

  return (
    <div>
      {err && (
        <h2 style={{ color: "#ff6600" }}>
          Something went wrong! Try after sometime
        </h2>
      )}
      <table className={styles.tableDetail}>
        <tbody>
          <tr>
            <th>Comments</th>
            <th>Vote Counts</th>
            <th>Upvote</th>
            <th className={styles.details}>News Details</th>
          </tr>
          {props.data &&
            props.data.length > 0 &&
            props.data.map((item) => {
              return (
                <tr className={styles.trtd} key={item.objectID}>
                  <td>{item.num_comments}</td>
                  <td>{item.points}</td>
                  <td>
                    {!item.vote && (
                      <Button
                        className={styles.upvoteImageButton}
                        onClick={() => props.onUpVoteHandler(item)}
                      >
                        <img
                          src={upvote}
                          alt="upvote"
                          className={styles.upvoteImage}
                        />
                      </Button>
                    )}
                  </td>
                  <td className={styles.thStyle}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkText}
                    >
                      {" "}
                      {item.title} <span>({urlEditor(item.url)})</span> by{" "}
                      <b>{item.author}</b> {timeStamp(item.created_at_i)}
                      {item.created_at_i}
                    </a>{" "}
                    <Button
                      className={styles.hideButton}
                      onClick={() => props.onHideHandler(item)}
                    >
                      {" "}
                      [hide]
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className={styles.buttonwrapper}>
        <Button
          className={classnames(
            styles.orangeButton,
            page === 0 && styles.disableStyle
          )}
          onClick={() => props.paginateHandler("previous")}
          disabled={page <= 0}
        >
          Previous
        </Button>{" "}
        |
        <Button
          className={classnames(
            styles.orangeButton,
            page >= props.totalPages && styles.disableStyle
          )}
          disabled={page >= props.totalPages}
          onClick={() => props.paginateHandler("next")}
        >
          Next
        </Button>
      </div>

      {/* when you wish to delete data */}
      {/* <button onClick={props.onDeleteHandler}>Delete</button> */}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state.data,
    page: state.page,
    totalPages: state.totalPages,
    hiddenElements: state.hiddenElements,
    votes: state.votes,
    changedPage: state.changedPage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveData: (data) => dispatch({ type: "SAVE_DATA", data }),
    paginateHandler: (data) => dispatch({ type: "PAGINATE", data }),
    onHideHandler: (data) => dispatch({ type: "HIDE_DATA", data }),
    onUpVoteHandler: (data) => dispatch({ type: "UPVOTE_DATA", data }),
    onHideCheckonData: () => dispatch({ type: "HIDE_FILTER_FROM_DATA" }),
    onDeleteHandler: () => dispatch({ type: "DELETE_DATA" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);

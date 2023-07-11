import React from "react";
import { withRouter } from "next/router";
import Comment from "@components/Comment";
import data from "@data/data.json";
import styles from "./styles.module.css";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: data.comments,
      currentUser: this.props.user,
    };
  }

  componentDidMount() {
    console.log(this.state.comments, this.state.currentUser, data);
  }

  render() {
    return (
      <section className={styles["comments_section"]}>
        {this.state.comments.map((comment) => (
          <Comment />
        ))}
      </section>
    );
  }
}

export default withRouter(Comments);

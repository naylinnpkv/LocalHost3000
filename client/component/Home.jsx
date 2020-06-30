import React, { Component } from "react";
import Login from "./Login.jsx";
import Search from "./Search.jsx";
import { withRouter, Link } from "react-router-dom";

class Home extends Component {
  // componentDidMount() {
  //   const res = fetch("http://localhost:8080/login", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   res
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.err) console.log(data.err);
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //     });
  //   //expect back userObj.
  // // }
  // {console.log("Search: ", this.props.profilepic);

  renderPage() {
    {
      console.log("Inside HOME!: ", this.props.addCurrentUser);
    }
    const { currentUser } = this.props;

    if (currentUser.name) {
      return (
        <div>
          <Search profilepic={this.props.profilepic} />
        </div>
      );
    } else {
      return (
        <Login
          addCurrentUser={this.props.addCurrentUser}
          history={this.props.history}
        />
      );
    }
  }

  render() {
    return <div>{this.renderPage()}</div>;
  }
}

export default withRouter(Home);

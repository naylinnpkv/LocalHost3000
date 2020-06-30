import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom"; // check
import Register from "./Register.jsx";
import Profile from "./Profile.jsx";
import Home from "./Home.jsx";
import Header from "./Header.jsx";
import "../styles/app.scss";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: { profilepic: "" },
      inEditMode: false,
      signedIn: false,
    };

    this.addCurrentUser = this.addCurrentUser.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.editingProfile = this.editingProfile.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.logoutButton = this.logoutButton.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  async uploadImage(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "darwin");
    console.log("Data", data);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deriue6x7/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    console.log("ALMOST TIME!!: ", this.state.currentUser);
    console.log("data: ", data);
    const file = await res.json();
    let file_url = file.url;
    console.log("File url: ", file_url);
    // console.log("WE GOT IT!: ", file_url); //a url.

    let id = this.state.currentUser.id;
    // console.log("curr user: ", this.state.currentUser);
    fetch(`http://localhost:8080/api/profile/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        username: this.state.currentUser.username,
        password: this.state.currentUser.password,
        name: this.state.currentUser.name,
        home: this.state.currentUser.home,
        email: this.state.currentUser.email,
        type: this.state.currentUser.type,
        profilepic: file_url,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }

  addCurrentUser(user) {
    this.setState({ currentUser: user, signedIn: true }, () =>
      console.log(this.state.currentUser)
    );
  }
  //when you click edit
  editProfile() {
    this.setState({ inEditMode: true });
    // this.setState({...currentUser, user)
    // fetch('/api/profile/:id')
  }
  //when user typing in the input
  editingProfile(event) {
    this.setState(
      {
        currentUser: {
          ...this.state.currentUser,
          [event.target.name]: event.target.value,
        },
      },
      () => console.log(this.state.currentUser)
    );
  }

  //changing the type: local or traveller;
  handleSelect(e) {
    this.setState(
      {
        currentUser: {
          ...this.state.currentUser,
          type: e.target.value,
        },
      },
      () => console.log(this.state.currentUser)
    );
  }

  //after you clicked the button: making the request and updating the database with user input
  saveProfile(event) {
    event.preventDefault();
    // on click function that will send fetch request that will send put request to server with current user in body/params
    // the data we want in response will be the new user
    // we will want to set the currentUser in state to be the response
    let id = this.state.currentUser.id;
    fetch(`http://localhost:8080/api/profile/${id}`, {
      // /api/profile/12345
      method: "PUT",
      body: JSON.stringify(this.state.currentUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({ currentUser: data, inEditMode: false }, () =>
          console.log(this.state.currentUser)
        )
      )
      .catch((err) => console.log(err));
  }

  deleteProfile(event) {
    event.preventDefault();
    let id = this.state.currentUser.id;
    fetch(`http://localhost:8080/api/profile/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ currentUser: {}, signedIn: false });
        this.props.history.push("/register");
      });
  }

  //this.state.signin -> false;
  //this.state.currentUser -> {};
  logoutButton(event) {
    event.preventDefault();
    // console.log("state of current user: ", this.state.currentUser);
    // console.log("state signed in: ", this.state.signedIn);
    this.setState({ currentUser: {}, signedIn: false });
  }

  render() {
    console.log("~~~", this.state.currentUser);
    return (
      <div className="app">
        <Header
          currentUser={this.state.currentUser}
          // signedIn={this.state.signedIn}
          logoutButton={this.logoutButton}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home
                currentUser={this.state.currentUser}
                addCurrentUser={this.addCurrentUser}
                profilepic={this.state.currentUser.profilepic}
              />
            )}
          />
          <Route
            exact
            path="/register"
            component={() => <Register addCurrentUser={this.addCurrentUser} />}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <Profile
                inEditMode={this.state.inEditMode}
                currentUser={this.state.currentUser}
                editProfile={this.editProfile}
                editingProfile={this.editingProfile}
                signedIn={this.state.signedIn}
                saveProfile={this.saveProfile}
                deleteProfile={this.deleteProfile}
                history={this.props.history}
                handleSelect={this.handleSelect}
                uploadImage={this.uploadImage}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

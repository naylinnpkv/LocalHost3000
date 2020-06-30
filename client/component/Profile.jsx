import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../styles/profile.scss";

/*

import React, { useState } from "react";
// import './App.css';


import './App.css'

function App() {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'darwin')
    setLoading(true);
    console.log("Data", data);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/deriue6x7/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    // const file = res.then(data => data.json());
    const file = await res.json();
    console.log("file secure" , file);
    console.log("file secure" , file.secure_url);
    setImage(file.secure_url)
    setLoading(false)
  }

  return (
    <div className="App">
      <h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: '300px' }} />
      )}
    </div>
  )
}

export default App
*/

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }
  // this.uploadImage = this.uploadImage.bind(this);

  // function
  renderProfile() {
    if (this.props.signedIn && !this.props.inEditMode) {
      return (
        <div>
          <ul className="profileAttrContainer">
            <li className="profileAttr">
              Username: {this.props.currentUser.username}
            </li>
            <li className="profileAttr">
              Email:
              <a
                href={`mailto:${this.props.currentUser.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.currentUser.email}
              </a>
            </li>
            <li className="profileAttr">Home: {this.props.currentUser.home}</li>
            <li className="profileAttr">Type: {this.props.currentUser.type}</li>
          </ul>
          <button
            className="profileButton"
            id="edit-profile-button"
            onClick={this.props.editProfile}
          >
            Edit Profile
          </button>
          <button
            className="profileButton"
            id="delete-profile-button"
            onClick={this.props.deleteProfile}
          >
            Delete Profile
          </button>
        </div>
      );
    }
    if (this.props.signedIn && this.props.inEditMode) {
      return (
        <div>
          <form
            className="entire-profile-form"
            onSubmit={this.props.saveProfile}
          >
            Username:
            <input
              className="edit-profile-input"
              name="username"
              value={this.props.currentUser.username}
              placeholder="Username"
              onChange={this.props.editingProfile}
            ></input>
            <p>Email:</p>
            <input
              className="edit-profile-input"
              name="email"
              value={this.props.currentUser.email}
              placeholder="Email"
              onChange={this.props.editingProfile}
            ></input>
            <p>Home:</p>
            <input
              className="edit-profile-input"
              name="home"
              placeholder="Home"
              value={this.props.currentUser.home}
              onChange={this.props.editingProfile}
            ></input>
            <form action="/action_page.php">
              <label for="img">Upload Profile Picture:</label>
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={this.props.uploadImage}
              />
              <br />
              <input type="submit" />
            </form>
            <select
              defaultValue={this.props.currentUser.type}
              onChange={this.props.handleSelect}
            >
              <option value="Traveler">Traveler</option>
              <option value="Local">Local</option>
            </select>
            <button className="profileButton" type="submit">
              Save Profile
            </button>
          </form>
        </div>
      );
    }
  }

  render() {
    //(if not in edit mode)
    return <div>{this.renderProfile()}</div>;
  }
}

export default Profile;

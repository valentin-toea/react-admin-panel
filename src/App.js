import React from "react";
import "./App.css";

import UserList from "./components/UserList/UserList";
import UserAddForm from "./components/UserAddForm/UserAddForm";
import PostList from "./components/PostList/PostList";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: "",
      textColor: "",
      users: [],
      showUsers: true,
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter((user) => user.id < 4);
        data.forEach((user) => {
          user.isGold = false;
          user.salary = "1000";
        });
        this.setState({ users: data });
      });
  }

  handleBackgroundColorChange = (event) => {
    this.setState({ background: event.target.value });
  };

  handleTextColorChange = (event) => {
    this.setState({ textColor: event.target.value });
  };

  removeUser = (index) => {
    const newUsers = [...this.state.users];
    newUsers.splice(index, 1);
    this.setState({ users: newUsers });
  };

  onSubmitForm = (user) => {
    this.setState({
      users: [
        ...this.state.users,
        { ...user, id: this.getMaxId(this.state.users) + 1 },
      ],
    });
  };

  getMaxId(users) {
    let maxId = 0;

    users.forEach((user) => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  render() {
    return (
      <div
        className="App"
        style={{
          background: this.state.background,
          color: this.state.textColor,
        }}
      >
        <div className="app-bar">
          <h1 style={{ margin: "0", padding: "1.5rem", flex: 1 }}>Dashboard</h1>
          <div className="buttons">
            <button
              className="header-button"
              onClick={() => this.setState({ showUsers: true })}
            >
              Show Users
            </button>
            <button
              className="header-button"
              onClick={() => this.setState({ showUsers: false })}
            >
              Show Posts
            </button>
          </div>
        </div>
        <div className="content">
          <div className="left-content">
            <h2>Form</h2>
            {this.state.showUsers ? (
              <UserAddForm onSubmitForm={this.onSubmitForm} />
            ) : (
              "Form is only available for the Users Page!"
            )}
            <div className="colors">
              <div className="color-picker-body">
                <div className="color-picker">
                  <input
                    className="color-picker-input"
                    type="color"
                    onChange={(event) =>
                      this.handleBackgroundColorChange(event)
                    }
                  />
                </div>
                <span>Background</span>
              </div>
              <div className="color-picker-body">
                <div className="color-picker">
                  <input
                    className="color-picker-input"
                    type="color"
                    onChange={(event) => this.handleTextColorChange(event)}
                  />
                </div>
                <span>Text Color</span>
              </div>
            </div>
          </div>
          <div className="right-content">
            <h2>{this.state.showUsers ? "Users List" : "Posts List"}</h2>
            {this.state.showUsers ? (
              <UserList data={this.state.users} removeUser={this.removeUser} />
            ) : (
              <PostList />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
// import "./ResetPassword.css";
import JMAN_BG from "./JMAN_BG.mp4";
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;

    fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit request.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          // Password reset request successful
          // You can redirect the user or display a success message here
        } else {
          // Handle other response statuses here if needed
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        this.setState({ error: "Failed to submit request. Please try again." });
      });
  }

  render() {
    const { email, error } = this.state;

    return (
      <>
      <video autoPlay muted loop id="bg-video">
      <source src={JMAN_BG} type="video/mp4" />
    </video>
      <div className="reset-password-container">
        <form onSubmit={this.handleSubmit} className="reset-password-form">
          <h3>Forgot Password</h3>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p className="forgot-password-text">
            <a href="/sign-in">Sign in</a>
          </p>
        </form>
      </div>
      </>
    );
  }
}

export default ResetPassword;


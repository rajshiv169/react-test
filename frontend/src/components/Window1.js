import "./window1.css";
import React, { Component } from "react";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";

class Window1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      addresses: [],
      addAPI: 0,
      updateAPI: 0,
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/addresses").then(
      (res) => {
        this.setState({
          isLoaded: true,
          addresses: res.data.addresses,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
    axios.get("http://localhost:5000/api/tally").then(
      (res) => {
        this.setState({
          isLoaded: true,
          ...res.data,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 home-top-content">
            <div className="api-hit">
              <p>
                Add API Called: {this.state.addAPI} <br />
                Update API called: {this.state.updateAPI}
              </p>
            </div>
            <p>These are things that are changed/rename for better navbar</p>
            <ol>
              <li>
                Window 1 is now home. Can be clicked on mern task to get there
                and also add new data.
              </li>
              <li>Window 2 is now solutions.</li>
              <li>Window 3 is now pricing.</li>
            </ol>
          </div>
        </div>
        <h4>This is the list of data that is added or updated in the forms</h4>
        <br></br>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Pin Code</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.addresses.map((address) => (
              <tr key={address._id}>
                <td>{address.firstName + " " + address.lastName}</td>
                <td>{address.phoneNumber}</td>
                <td>
                  {address.streetAddress +
                    ", " +
                    address.city +
                    ", " +
                    address.state +
                    ", " +
                    address.country}
                </td>
                <td>{address.pinCode}</td>
                <td>
                  <LinkContainer to={`/window2/${address._id}`}>
                    <i className="fas fa-pen"></i>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Window1;

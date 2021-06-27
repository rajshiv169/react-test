import "./window2.css";
import { Form, Button, Col } from "react-bootstrap";
import React, { Component } from "react";
import axios from "axios";

class Window2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      addressID: this.props.match.params.id,
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      pinCode: "",
      phoneNumber: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      pinCode: this.state.pinCode,
      country: this.state.country,
      phoneNumber: this.state.phoneNumber,
    };

    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.streetAddress &&
      this.state.city &&
      this.state.state &&
      this.state.pinCode &&
      this.state.country &&
      this.state.phoneNumber &&
      !isNaN(this.state.pinCode) &&
      !isNaN(this.state.phoneNumber)
    ) {
      if (this.state.addressID === "new") {
        axios.post("http://localhost:5000/api/addresses", this.data).then(
          (res) => {
            if (res.data.success) {
              this.props.history.push("/");
            }
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      } else {
        this.data = { ...this.data, _id: this.state.addressID };
        axios
          .put(
            `http://localhost:5000/api/addresses/${this.state.addressID}`,
            this.data
          )
          .then(
            (res) => {
              if (res.data.success) {
                this.props.history.push("/");
              }
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            }
          );
      }
    } else {
      alert("Please check your details");
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    if (this.state.addressID !== "new") {
      axios
        .get(`http://localhost:5000/api/address/${this.state.addressID}`)
        .then(
          (res) => {
            this.setState({
              isLoaded: true,
              ...res.data.address,
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
  }

  render() {
    return (
      <div className="col-md-4 offset-md-4 col-sm-12 form-view">
        <div className="form-container">
          {this.state.addressID === "new" ? <h4>Create</h4> : <h4>Update</h4>}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="streetAddress"
                placeholder="Enter your street address"
                value={this.state.streetAddress}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="Enter your state"
                  value={this.state.state}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  name="country"
                  placeholder="Enter your country"
                  value={this.state.country}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  name="pinCode"
                  placeholder="Enter your pincode"
                  value={this.state.pinCode}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
              />
            </Form.Group>

            <div className="float-right-custom">
              <Button variant="primary" type="submit">
                {this.state.addressID === "new" ? "create" : "update"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Window2;

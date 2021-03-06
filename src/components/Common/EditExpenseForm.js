import React, { Component } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";
import $ from "jquery";

import Loader from "./Loader";

import * as firebase from "../../firebase/firebase";

import "react-datepicker/dist/react-datepicker.css";
import "../Home/styles/form.css";

class EditExpenseForm extends Component {
    constructor(props) {
        super(props);

        const expense = props.expense;

        this.state = {
            date: moment(expense.value.date),
            day: moment(expense.value.date).day,
            expense: expense.value.expense,
            category: expense.value.category,
            comments: expense.value.comments,
            uid: this.props.user.uid,
            dataSaved: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelDateChange = this.handelDateChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        firebase.db.ref(`expenseTable/${this.props.user.uid}/${this.props.expense.key}`).update({
            date: this.state.date.format("MM/DD/YYYY"),
            day: moment(this.state.date.format("MM/DD/YYYY")).day(),
            expense: this.state.expense,
            category: this.state.category,
            comments: this.state.comments
        });

        $("#closePopup").click();
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handelDateChange(date) {
        this.setState({
            date: date,
            day: date.day()
        });
    }

    render() {
        if (this.props.settings) {
            const inputNightMode = {
                background: "#2c2b2b",
                color: "#a9a0a0",
                border: "1px solid #9b8c8cc7"
            };

            const inputDayMode = { background: "#fff", color: "#495057" };

            const validationBox = {
                background: "rgba(0,0,0,0)",
                color: "#ffecb8",
                fontSize: "12px",
                width: "60%",
                position: "absolute",
                bottom: "15px",
                left: "15px"
            };

            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Date</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <DatePicker
                                className={
                                    "form-control date " +
                                    (this.props.settings.mode === "night" ? "inputNightMode" : "inputDayMode")
                                }
                                name="date"
                                selected={this.state.date}
                                onChange={this.handelDateChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Expense</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <input
                                className="form-control"
                                required
                                type="number"
                                name="expense"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.expense}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>category</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <select
                                className="form-control"
                                name="category"
                                value={this.state.category}
                                onChange={this.handleChange.bind(this)}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            >
                                <option value="Food">Food</option>
                                <option value="Automobile">Automobile</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Travel">Travel</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Personal Care">Personal Care</option>
                                <option value="Investment">Investment</option>
                                <option value="Gifts & Donations">Gifts & Donations</option>
                                <option value="Bills & Utilities">Bills & Utilities</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-xs-6 col-form-label">
                            <span>Comments</span>
                        </label>
                        <div className="col-sm-10 col-xs-6">
                            <textarea
                                className="form-control"
                                type="text"
                                required
                                name="comments"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.comments}
                                style={this.props.settings.mode === "night" ? inputNightMode : inputDayMode}
                            />
                        </div>
                    </div>

                    {this.state.dataSaved ? (
                        <span className="bg-success success-msg"> You did not update anything</span>
                    ) : (
                        <span />
                    )}
                    {this.state.expense > 0 && this.state.date && this.state.category ? (
                        <button className="btn btn-primary float-right" type="submit">
                            save
                        </button>
                    ) : (
                        <div>
                            <div style={validationBox}>
                                <div> Expense : should be greater than 0 </div>
                                <div> Date : should be selected </div>
                            </div>
                            <button className="btn btn-primary float-right" disabled type="submit">
                                save
                            </button>
                        </div>
                    )}
                </form>
            );
        } else {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
    }
}

export default EditExpenseForm;

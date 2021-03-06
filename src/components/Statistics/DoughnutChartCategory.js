import React from "react";
import { Doughnut } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const DoughnutChartCategory = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;

    let allCategoryTotals = null;

    if (!expenses || !currentUser) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpenses = utils.currentUsersExpenses(eachExpense, currentUser);

        allCategoryTotals = utils.calculateTotalForAllCategories(usersExpenses);

        let data = {
            labels: utils.categories,
            datasets: [
                {
                    data: Object.values(allCategoryTotals),
                    backgroundColor: utils.categoryColors,
                    hoverBackgroundColor: utils.categoryColors
                }
            ]
        };

        const options = {
            legend: {
                display: true,
                position: "left",
                fullWidth: true,
                reverse: false
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 15,
                    bottom: 0
                }
            }
        };

        const optionsMobile = {
            legend: { display: true, position: "bottom", fullWidth: true },
            layout: {
                padding: {
                    left: 15,
                    right: 15,
                    top: 15,
                    bottom: 15
                }
            }
        };

        return (
            <div>
                <Doughnut
                    data={data}
                    options={window.screen.width > 720 ? options : optionsMobile}
                    height={window.screen.width > 720 ? 140 : 450}
                    responsive={true}
                />
            </div>
        );
    }
};

export default DoughnutChartCategory;

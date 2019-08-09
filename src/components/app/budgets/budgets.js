import React, { Component } from 'react';

import Header from './header/header';
import './budgets.css';
import WindowNewBudget from './windows/window-new-budget/window-new-budget';
import ViewSettingsWindow from './windows/view-settings-window/view-settings-window';
import FiltersWindow from './windows/filters-window/filters-window';

import DivTable from './table/div-table';


class Budgets extends Component {

    state = {
        showNewBudget: false,
        showIconViewSettingsWindow: false,
        showFiltersWindow: false,
        showDeleteWindows: -1,
        columns: [
            { col1: false, id: 1 },
            { col2: false, id: 2 },
            { col3: false, id: 3 },
            { col4: false, id: 4 },
            { col5: false, id: 5 },
            { col6: false, id: 6 }
        ]
    }
    newBudgetToggled = () => {
        this.setState({
            showNewBudget: !this.state.showNewBudget,
            showIconViewSettingsWindow: false,
            showFiltersWindow: false,
            showDeleteWindows: -1
        })
    }
    iconSettingsToggled = () => {
        this.setState({
            showIconViewSettingsWindow: !this.state.showIconViewSettingsWindow,
            showFiltersWindow: false,
            showDeleteWindows: -1
        })
    }
    showHideColumnToggled = id => {
        let columns = this.state.columns;
        columns[id - 1]['col' + id] = !columns[id - 1]['col' + id]
        this.setState({
            columns: columns
        })
    }
    filtersWindowToggled = () => {
        this.setState({
            showFiltersWindow: !this.state.showFiltersWindow,
            showIconViewSettingsWindow: false,
            showDeleteWindows: -1
        })
    }
    deleteWindowsToggled = id => {
        if (id === this.state.showDeleteWindows) id = -1
        this.setState({
            showDeleteWindows: id,
            showIconViewSettingsWindow: false,
            showFiltersWindow: false
        })
    }
    
    render() {
        const { data,
            columnsNames, rowDeleted,
            createBudget, deleteBudget, budgetsSorted, budgetsSearched, budgetsFiltered
        } = this.props;
        const { showNewBudget, showIconViewSettingsWindow, columns, showFiltersWindow, showDeleteWindows } = this.state;

        return (
            <div className='budgets'>

                {showNewBudget ? <WindowNewBudget
                    newBudgetToggled = {this.newBudgetToggled}
                    createBudget = {createBudget}

                /> : null}

                {showFiltersWindow ? <FiltersWindow 
                data = {data} 
                budgetsFiltered = {budgetsFiltered}
                /> : null}

                {showIconViewSettingsWindow ?
                    <ViewSettingsWindow
                        columnsNames = { columnsNames}
                        showHideColumnToggled = {this.showHideColumnToggled}
                        columns = {columns}
                    /> : null}

                <Header
                    newBudgetToggled = {this.newBudgetToggled}
                    iconSettingsToggled = {this.iconSettingsToggled}
                    filtersWindowToggled = {this.filtersWindowToggled}

                    columnsNames = {columnsNames}
                    budgetsSorted = {budgetsSorted}
                    budgetsSearched = {budgetsSearched}
                />

                <DivTable

                    data = {data}
                    columns = {columns}
                    deleteBudget = {deleteBudget}
                    rowDeleted = {rowDeleted}
                    mainDeleteWindowToggle = {this.mainDeleteWindowToggle}

                    deleteWindowsToggled = {this.deleteWindowsToggled}
                    showDeleteWindows = {showDeleteWindows}
                />

            </div>
        )

    }
}
export default Budgets;
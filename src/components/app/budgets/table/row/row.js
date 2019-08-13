import React, { Component } from 'react';

import './row.css';
import WindowDeleteBudget from './row-windows/window-delete-budget/window-delete-budget';
import MainDeleteWindow from './row-windows/main-delete-window/main-delete-window';

export default class Row extends Component {
    state = {
        showProjets: false,
        selectId: null,
        showMainDeleteWindow: false
    }
    showProjectsTogled = () => {
        this.setState({
            showProjets: !this.state.showProjets
        })
    }
    idSelected = id => {
        this.setState({
            selectId: id
        })
    }
    mainDeleteWindowToggle = () => {
        this.setState({
            showMainDeleteWindow: !this.state.showMainDeleteWindow
        })
    }
    returnLengthLetersprojects = (projects) => {
        let length = 0;
        projects.forEach(el => {
          length += el.title.length
        })
        return length
    }
    render() {
        
        const { el, columns, deleteBudget, deleteWindowsToggled, 
            showDeleteWindows, rowDeleted,  editWindowToggled, 
            budgetIdSetted, cannotEditDeleteToggled} = this.props;
        const { showProjets,  showMainDeleteWindow, selectId } = this.state;
        let lettersLength = this.returnLengthLetersprojects(el.projects)
        
        const styleGradient = {zIndex: showProjets ? '0' : '500'}
        const styleImgage = { transform: showProjets ? 'rotate(90deg)' : 'rotate(270deg)' };
        const styleCol6 = {
            whiteSpace: showProjets ? 'normal' : 'nowrap',
            cursor: showProjets ? 'pointer' : 'default'
        }
        const styleSpan = { textDecoration: lettersLength < 40 ? 'underline' : showProjets ? 'underline' : 'none',
        cursor: lettersLength < 40 ? 'pointer' : showProjets ? 'pointer' : 'default'
     }
        return (
            <>
                {showMainDeleteWindow ? <MainDeleteWindow
                    mainDeleteWindowToggle={this.mainDeleteWindowToggle}
                    selectId={selectId}
                    deleteBudget={deleteBudget}
                    idSelected={this.idSelected}
                    rowDeleted={rowDeleted}
                    
                /> : null}
                <div
                    className='tr'
                    key={el.id}
                >
                    <div className={columns[0]['col1'] ? 'hide' : 'col1'}>
                        <div className='col-title'>Budget name</div>
                        <div className='underline'
                        onClick = {() => {
                            editWindowToggled()
                            budgetIdSetted(el.id, el.projects.length)
                            cannotEditDeleteToggled()
                        }}
                        >{el.title}</div>
                    </div>
                    <div className={columns[1]['col2'] ? 'hide' : 'col2'}>
                        <div className='col-title'>PO number</div>
                        <div>{el.po_number}</div>
                    </div>
                    <div className={columns[2]['col3'] ? 'hide' : 'col3'}>
                        <div className='col-title title3'>Amount total</div>
                        <div>$ {el.amount}</div>
                    </div>
                    <div className={columns[3]['col4'] ? 'hide' : el.amount_remaining < el.amount ? 'col4 red' :  el.amount_remaining > 0.8*el.amount ? 'col4 orange' : 'col4'}>
                        <div className='col-title'>Amount remaining</div>
                        <div>$ {el.amount_remaining}</div>
                    </div>
                    <div className={columns[4]['col5'] ? 'hide' : 'col5'}>
                        <div className='col-title'>Created date</div>
                        <div>{new Date(el.created_at).toDateString()}</div>
                    </div>

                    <div className={columns[5]['col6'] ? 'hide' : 'col6'}
                        style={styleCol6}
                    >   
                        <div 
                        className = 'col6-gradient'
                        style = {styleGradient}
                        ></div>
                        <div className='col-title'>{el.projects.length === 0 ? '' : 'Projects'}</div>
                        <div

                        >{el.projects.map(element => <span style={styleSpan} key={element.id}> {element.title} </span>)}</div>
                    </div>

                    <div className={columns.col7 ? 'hide' : 'col7'}>
                        <div className='budgets-table-projects'>
                            <div>{el.projects.length} {el.projects.length === 1 ? 'project' : 'projects'}</div>
                            <div className = 'img-container'>
                                {lettersLength  > 45 ?
                                    <img
                                        src='images/icons/shevron-left.svg'
                                        alt='shevron'
                                        style={styleImgage}
                                        onClick={this.showProjectsTogled}
                                    /> : null} </div>
                        </div>
                    </div>

                    <div className='col8'>
                        <div>
                            
                            <WindowDeleteBudget
                                showWindowDeleteToggle={this.showWindowDeleteToggle}
                                mainDeleteWindowToggle={this.mainDeleteWindowToggle}
                                idSelected={this.idSelected}
                                id={el.id}
                                showDeleteWindows={showDeleteWindows}
                                deleteWindowsToggled={deleteWindowsToggled}
                                editWindowToggled={editWindowToggled}
                            /> 
                            <img
                                src='images/icons/line-menu.svg'
                                alt='menu-secondary'
                                onClick={
                                    () => { 
                                                this.idSelected(el.id)
                                                if (el.projects.length < 1 ) {deleteWindowsToggled(el.id)}
                                                budgetIdSetted(el.id, el.projects.length)
                                                cannotEditDeleteToggled()
                                    }
                                }
                            />

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
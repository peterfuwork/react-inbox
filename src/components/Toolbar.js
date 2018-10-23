import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Toolbar = (props) => {
    return(
        <section className="toolbar-section">
            <div className="toolbar">
                <a href="#" className="btn plus"><FontAwesomeIcon icon={['fas', 'plus']} /></a>
                <a href="#" 
                    className="btn"
                    onClick={(e) => props.selectedAllOrDeselectedAll(e)}>
                    {props.selectedAll === true ? <FontAwesomeIcon icon={['fas', 'minus']} /> :<FontAwesomeIcon icon={['fas', 'plus']} />}
                </a>
                <a href="#" 
                    className="btn"
                    onClick={(e) => props.onMarkAsRead(e)}>Mark as Read</a>
                <a href="#" 
                    className="btn"
                    onClick={(e) => props.onMarkAsUnread(e)}>Mark as Unread</a>
                <div className="btn-select">
                    <a className="btn"
                        onClick={(e) => props.onClickApplyLabelHeader(e)}>
                        Apply Label {props.applyLabelClicked === true ? <FontAwesomeIcon icon={['fas', 'angle-down']} /> : <FontAwesomeIcon icon={['fas', 'angle-right']} />}
                    </a>
                    <ul className={`btn-select-ul ${props.applyLabelClicked === true ? "active": ""}`}>
                        <li className="btn-select-li">
                            <a  
                                data-info="dev"
                                className="link" 
                                href="#"
                                onClick={(e) => props.onClickApplyLabel(e)}>dev</a>
                        </li>
                        <li className="btn-select-li">
                            <a 
                                data-info="personal"
                                className="link" 
                                href="#"
                                onClick={(e) => props.onClickApplyLabel(e)}>personal</a>
                        </li>
                        <li className="btn-select-li">
                            <a  
                                data-info="gschool"
                                className="link" 
                                href="#"
                                onClick={(e) => props.onClickApplyLabel(e)}>gschool</a>
                        </li>
                    </ul>
                </div>
                <div className="btn-select">
                    <a className="btn"
                        onClick={(e) => props.onClickRemoveLabelHeader(e)}>
                        Remove Label {props.removeLabelClicked === true ? <FontAwesomeIcon icon={['fas', 'angle-down']} /> : <FontAwesomeIcon icon={['fas', 'angle-right']} />}
                    </a>
                    <ul className={`btn-select-ul ${props.removeLabelClicked === true ? "active": ""}`}>
                        <li className="btn-select-li">
                            <a  
                                data-info="dev"
                                className="link" 
                                href="#"
                                onClick={(e) => props.onClickRemoveLabel(e)}>dev</a>
                        </li>
                        <li className="btn-select-li">
                            <a 
                                data-info="personal"
                                className="link" 
                                href="#"
                                onClick={(e) => props.onClickRemoveLabel(e)}>personal</a>
                        </li>
                        <li className="btn-select-li">
                            <a  
                                data-info="gschool"
                                className="link" 
                                href="#"
                                onClick={(e) => props.onClickRemoveLabel(e)}>gschool</a>
                        </li>
                    </ul>
                </div>
                <a href="#" className="btn"><FontAwesomeIcon icon={['far', 'trash-alt']} /></a>
                <div className="box">
                    <span className="unread-message">
                        <span className="value">{props.totalUnread}</span>&nbsp;
                        unread messages
                    </span>
                </div>
            </div>
            <div className="compose-message">
                <h3>Compose Message</h3>
            </div>
        </section>
    )
}

export default Toolbar;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Message = (props) => {

    
    const messageBody = <div className="message-body" data-body-id={props.message.id}>{props.message.body}</div>;        

    return(
        <div>
            <div className={`info ${props.message.read ? "read" : ""} ${props.message.selected ? "checked" : ""}`}>
                <div className="checkbox-wrapper">
                    <input 
                        className="checkbox"
                        type="checkbox"
                        checked={props.message.selected === true ? true : false}
                        onChange={() => props.onClickChecked(props.message.id)} />
                </div>
                <div className="star" 
                    data-index={props.message.id}
                    onClick={() => props.onCheckedStar(props.message.id)}>
                    {props.message.starred === true ? <FontAwesomeIcon icon={['far', 'star']} /> : <FontAwesomeIcon icon={['fas', 'star']} />}
                </div>
                <div className="labels">
                    {props.message.labels.map((label, i) => {
                        return (
                        <span 
                            className="label"
                            key={i}>
                            {label}
                        </span>
                        )
                    })}
                </div>
                <div className="message"
                    onClick={(e) => props.onMarkAsRead(e)}>
                    {props.message.selected === true ? props.message.subject : props.message.subject}
                </div>
                <div className="show-body" onClick={(e) => props.onClickShowBody(e)}>
                    show body
                </div>
            </div>
            {messageBody}
        </div>
    )
}

export default Message;
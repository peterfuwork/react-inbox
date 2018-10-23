import React from 'react';
import Message from './Message';

const Messages = (props) => {
    const messages = props.messages.map((message) => {
        return (
            <Message 
                message={message} 
                key={message.id}
                onClickChecked={props.onClickChecked}
                onCheckedStar={props.onCheckedStar}
                onMarkAsRead={props.onMarkAsRead}
                onClickShowBody={props.onClickShowBody}
                />
        )
    });
    return(
        <div className="messages">
            { messages }
        </div>
    )
}

export default Messages;
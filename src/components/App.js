import React, { Component } from 'react';
import Messages from './Messages';
import Toolbar from './Toolbar';

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      totalUnread: 0,
      selectedAll: false,
      unSelectedAll: true,
      applyLabelClicked : false,
      removeLabelClicked : false
    }
  }

  async componentDidMount() {
    let result = await fetch("http://localhost:8082/api/messages");
    let data = await result.json();
    const unReadData = data.filter(dat => dat.read === false);
    console.log(data);
    this.setState({
      messages: data,
      totalUnread: unReadData.length
    })
  }

  patch = async (id, command, attribute, value) => {
    var patch = {
      messageIds: id,
      command: command,
      [attribute]:value
    };
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    const posted = await response.json();
    const unReadData = posted.filter(message => message.read === false);
    //console.log('posted', posted)
    this.setState({
      messages: posted,
      totalUnread: unReadData.length
    })
    //console.log('this.state.totalUnread', this.state.totalUnread);
  }

  selectedAllOrDeselectedAll = (e) => {
    e.preventDefault();

    if(this.state.selectedAll === false) {
      const allUnselectedMsgs = this.state.messages.filter(msg => msg.selected === false);
      const allUnselectedIds = allUnselectedMsgs.map(msg => msg.id);
      this.patch([...allUnselectedIds], 'select', 'selected');
      this.setState({
        selectedAll: true,
        unSelectedAll: false
      })
    } else if (this.state.unSelectedAll === false) {
      const allSelectedMsgs = this.state.messages.filter(msg => msg.selected === true);
      const allSelectedIds = allSelectedMsgs.map(msg => msg.id);
      this.patch([...allSelectedIds], 'select', 'selected');
      this.setState({
        selectedAll: false,
        unSelectedAll: true
      })
    }
  }

  onClickChecked = (id) => {
    console.log('id', id);
    let newId = id.toString();
    this.patch([newId], 'select', 'selected');
    // const id = e.target.getAttribute('data-index');
    // const data = this.state.messages;
    // let replacement;
    
    // data.map(function(msg) {
    //   const i = msg.id.toString();
    //     if(i === id) {
    //       if(msg.selected === true) {
    //         replacement = Object.assign({}, msg, {selected: false});
    //       } else if (msg.selected === false ) {
    //         replacement = Object.assign({}, msg, {selected: true});
    //       }
    //     }
    // });

    // const newMsgs = [...data.slice(0,id-1), replacement, ...data.slice(id)];
    
    // this.setState({
    //   messages: newMsgs
    // })
  }

  onCheckedStar = (id) => {
    let newId = id.toString();
    this.patch([newId], 'star', 'starred');
    // const id = e.target.getAttribute('data-index');
    // const data = this.state.messages;
    // let replacement;
    
    // data.map(function(msg) {
    //   const i = msg.id.toString();
    //     if(i === id) {
    //       if(msg.starred === true) {
    //         replacement = Object.assign({}, msg, {starred: false});
    //       } else if (msg.starred === false) {
    //         replacement = Object.assign({}, msg, {starred: true});
    //       }
    //     }
    // });

    // const newMsgs = [...data.slice(0,id-1), replacement, ...data.slice(id)];

    // this.setState({
    //     messages: newMsgs
    // })
  }

  onMarkAsRead = (e) => {
    e.preventDefault();
    const filteredMsgs = this.state.messages.filter(message => message.selected === true);
    const ids = filteredMsgs.map(msg => msg.id);
    this.patch([...ids], 'read', 'read', true);


    // console.dir(e.target);
    // const newArr = [];
    // arrayOfObjs.map((arrayOfObj) => {
    //   if(arrayOfObj.selected === true) {
    //     const newObj = {
    //       subject: arrayOfObj.subject,
    //       read: true,
    //       starred: arrayOfObj.starred,
    //       selected: arrayOfObj.selected,
    //       labels: arrayOfObj.labels,
    //       body: arrayOfObj.body,
    //       id: arrayOfObj.id
    //     }
    //     newArr.push(newObj)
    //   } else {
    //     newArr.push(arrayOfObj)
    //   }
    //   console.log(newArr);
    // })
    // const unReadData = filteredMsg.filter(filteredMsgObj => filteredMsgObj.read === true);
    // this.setState({
    //     totalUnread: unReadData
    // })
  }

  onMarkAsUnread = (e) => {
    e.preventDefault();
    const filteredMsgs = this.state.messages.filter(message => message.selected === true);
    const ids = filteredMsgs.map(msg => msg.id);
    this.patch([...ids], 'read', 'read', false);
    // console.dir(e.target);
    // const newArr = [];
    // arrayOfObjs.map((arrayOfObj) => {
    //   if(arrayOfObj.selected === true) {
    //     const newObj = {
    //       subject: arrayOfObj.subject,
    //       read: false,
    //       starred: arrayOfObj.starred,
    //       selected: arrayOfObj.selected,
    //       labels: arrayOfObj.labels,
    //       body: arrayOfObj.body,
    //       id: arrayOfObj.id
    //     }
    //     newArr.push(newObj)
    //   } else {
    //     newArr.push(arrayOfObj)
    //   }
    //   console.log(newArr);
    // })
    // const unReadData = filteredMsg.filter(filteredMsgObj => filteredMsgObj.read === false);
    // this.setState({
    //     totalUnread: unReadData
    // })
  }

  onClickApplyLabelHeader = () => {
    if(this.state.applyLabelClicked === false) {
      this.setState({
        applyLabelClicked: true
      })
    } else {
      this.setState({
        applyLabelClicked: false
      })
    }
  }

  onClickRemoveLabelHeader = () => {
    if(this.state.removeLabelClicked === false) {
      this.setState({
        removeLabelClicked: true
      })
    } else {
      this.setState({
        removeLabelClicked: false
      })
    }
  }

  onClickApplyLabel = (e) => {
    const filteredMsgs = this.state.messages.filter(message => message.selected === true);
    const ids = filteredMsgs.map(msg => msg.id);
    this.patch([...ids], 'addLabel', 'label', e.target.text);
  }

  onClickRemoveLabel = (e) => {
    const filteredMsgs = this.state.messages.filter(message => message.selected === true);
    const ids = filteredMsgs.map(msg => msg.id);
    this.patch([...ids], 'removeLabel', 'label', e.target.text);
  }

  onClickShowBody = (e) => {
    const allMsgBody = document.querySelectorAll('.message-body');
    for(let i = 0; i<allMsgBody.length; i++) {
      allMsgBody[i].classList.remove('active')
    }
    const messageBody = e.target.parentElement.parentElement.childNodes[1];
    messageBody.classList.add('active');
  }

  render() {
    return (
      <div className="custom-container">
        <Toolbar
          messages={this.state.messages}
          totalUnread={this.state.totalUnread} 
          onMarkAsRead={this.onMarkAsRead}
          onMarkAsUnread={this.onMarkAsUnread}
          selectedAllOrDeselectedAll={this.selectedAllOrDeselectedAll}
          selectedAll={this.state.selectedAll}
          unSelectedAll={this.state.unselectedAll}
          applyLabelClicked={this.state.applyLabelClicked}
          removeLabelClicked={this.state.removeLabelClicked}
          onClickApplyLabelHeader={this.onClickApplyLabelHeader}
          onClickRemoveLabelHeader={this.onClickRemoveLabelHeader}
          onClickApplyLabel={this.onClickApplyLabel}
          onClickRemoveLabel={this.onClickRemoveLabel}
          />
        <Messages 
          onMarkAsRead={this.onMarkAsRead}
          messages={this.state.messages}
          onClickChecked={this.onClickChecked}
          onCheckedStar={this.onCheckedStar}
          onClickShowBody={this.onClickShowBody}
          />
      </div>
    );
  }
}

export default App;

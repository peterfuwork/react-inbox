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
    const info = document.querySelector('.info');
    console.log(info.clientHeight)
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
    let newId = id.toString();
    this.patch([newId], 'select', 'selected');
  }

  onCheckedStar = (id) => {
    let newId = id.toString();
    this.patch([newId], 'star', 'starred');
  }

  onMarkAsRead = (e) => {
    e.preventDefault();
    const filteredMsgs = this.state.messages.filter(message => message.selected === true);
    const ids = filteredMsgs.map(msg => msg.id);
    this.patch([...ids], 'read', 'read', true);
  }

  onMarkAsUnread = (e) => {
    e.preventDefault();
    const filteredMsgs = this.state.messages.filter(message => message.selected === true);
    const ids = filteredMsgs.map(msg => msg.id);
    this.patch([...ids], 'read', 'read', false);
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
    e.preventDefault();
    const messageBody = e.target.parentElement.parentElement.childNodes[1];
    if(messageBody.classList.contains('active')) {
      messageBody.classList.remove('active');
    } else {
      const allMsgBody = document.body.querySelectorAll('.message-body');
      for(let i = 0; i<allMsgBody.length; i++) {
        allMsgBody[i].classList.remove('active');
      }
      messageBody.classList.add('active');
    }
  }

  render() {
    return (
      <section className="custom-container">
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
      </section>
    );
  }
}

export default App;

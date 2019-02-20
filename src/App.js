import React, { Component } from 'react';
import MessageList from './MessageList';
import Toolbar from './Toolbar';
import axios from 'axios';
import ComposeForm from './ComposeForm'
class App extends Component {
  state = {
    messages: [],
    showCompose: false
  }
  componentDidMount = async ()=>{
    let messages = await axios.get (`http://localhost:8000/messages`)
    this.setState({messages:messages.data})
  }
  addMessage=async(message)=>{
    let newMessage = {
      ...message,
      labels: JSON.stringify({}),
      read:false,
      selected:false,
      starred:false
    }
  let newMessages = await axios.post(`http://localhost:8000/messages`, newMessage)
  this.setState({
    messages: newMessages.data
  })
}
  toggleComposeForm=()=>{
    this.setState({
      showCompose:!this.state.showCompose
    })
  }
  toggleRead =(selectedMessage)=>{
    let otherMessages = this.state.messages.filter(message => selectedMessage.id !=message.id)
    let changedMessages = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: !selectedMessage.read,
      starred: selectedMessage.starred,
      labels: selectedMessage.labels
    }
    this.setState({messages: otherMessages.concat(changedMessages).sort((a,b)=> a.id - b.id)})
  }
  toggleStarred =(selectedMessage)=>{
    let otherMessages = this.state.messages.filter(message => selectedMessage.id !=message.id)
    let changedMessages = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: selectedMessage.read,
      starred: !selectedMessage.starred,
      labels: selectedMessage.labels,
      selected: selectedMessage.selected
    }
    this.setState({messages: otherMessages.concat(changedMessages).sort((a,b)=> a.id - b.id)})
  }
  toggleSelected =(selectedMessage)=>{
    let otherMessages = this.state.messages.filter(message => selectedMessage.id !=message.id)
    let changedMessages = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: selectedMessage.read,
      starred: selectedMessage.starred,
      labels: selectedMessage.labels,
      selected: !selectedMessage.selected || false
    }
    this.setState({messages: otherMessages.concat(changedMessages).sort((a,b)=> a.id - b.id)})
  }
  selectButtonFunc =(type)=> {
    if(type.indexOf('-minus')){
      this.setState({
        messages: this.state.messages.map(msg=>{
          msg.selected = true
          return msg
        })
      })
    } else if (type.indexOf('-check')){
      this.setState({
        messages:this.state.messages.map(msg=>{
          msg.selected=false
          return msg
        })
      })
    } else{
      this.setState({
        messages:this.state.messages.map(msg=>{
          msg.selected=true
          return msg
        })
      })
    }
  }

setUnreadFunc =() =>{
  let newState=this.state.messages.map(msg=>{
    if(msg.selected)msg.read = false
    return msg;
  })
  this.setState({
    messages:newState
  })
}
setReadFunc =() =>{
  let newState=this.state.messages.map(msg=>{
    if(msg.selected)msg.read = true
    return msg;
  })
  this.setState({
    messages:newState
  })
}
deleteMessages =() =>{
  let newState=this.state.messages.filter(msg=>!msg.selected)
  this.setState({
    messages:newState
  })
}
addLabel=(label)=>{
  let newState= this.state.messages.map(msg=>{
    if(msg.selected && !msg.labels.includes(label))msg.labels.push(label)
    return msg
  })
  this.setState({messages:newState})
}
removeLabel=(label)=>{
  let newState= this.state.messages.map(msg=>{
    if(msg.selected)msg.labels=msg.labels.filter(l=>l !==label)
  return msg
  })
  this.setState({messages:newState})
}
  render() {
    let numOfSelectedMsgs = this.state.messages.filter(msg=> msg.selected).length;
    return (
      <div className="App">
      <Toolbar 
      numOfSelectedMsgs={numOfSelectedMsgs} 
      messages={this.state.messages} 
      selectButtonFunc={this.selectButtonFunc}
      setUnreadFunc={this.setUnreadFunc}
      setReadFunc={this.setReadFunc}
      deleteMessages={this.deleteMessages}
      addLabel={this.addLabel}
      removeLabel={this.removeLabel}
      toggleComposeForm={this.toggleComposeForm}
      showCompose={this.state.showCompose}
      />
      {this.state.showCompose && <ComposeForm addMessage={this.addMessage}/>}
     
      <MessageList 
      messages={this.state.messages} 
      toggleRead={this.toggleRead} 
      toggleStarred={this.toggleStarred} 
      toggleSelected={this.toggleSelected}/>
      </div>
    );
  }
}

export default App;

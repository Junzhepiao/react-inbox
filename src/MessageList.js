import React,{Component} from 'react'
import Message from './Message'
class MessageList extends Component {
    render(){
        let theMessages = this.props.messages.map(message => {
            return (
                <Message key={message.id} message={message} toggleRead = {this.props.toggleRead} toggleStarred = {this.props.toggleStarred} toggleSelected = {this.props.toggleSelected}/>
            )
        })
        return (
            <div>{theMessages}</div>
        )
    }
}

export default MessageList
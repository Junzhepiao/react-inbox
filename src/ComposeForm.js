import React, {Component} from 'react'
class ComposeForm extends Component {
    state={
        subject:'',
        body:''
    }
    handleSubmit=()=>{
        this.props.addMessage(this.state)
    }
    render(){
        console.log('this.props',this.props)
        return (
            <form className="form-horizontal well" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                    <input  
                    type="text" 
                    className="form-control"
                    value={this.state.subject}
                    onChange={(e)=> this.setState({subject: e.target.value})} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                    <textarea id="body" className="form-control"
                    value={this.state.body}
                    onChange={(e)=> this.setState({body: e.target.value})}></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
                </form>
        )
    }
}
export default ComposeForm

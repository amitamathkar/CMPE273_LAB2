import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {setUsername,setPassword,validateUser} from "./actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'


class App extends Component {   

constructor(props) {
  super(props);
  this.state = {
    uname: this.props.Username,
        pass: this.props.Password,
        result:this.props.result
  };
} 

    componentWillMount() {
      console.log('Component WILL MOUNT!')
              this.setState({
            uname: this.props.Username,
            pass: this.props.Password,
        result:this.props.result
        });
        
   }

   componentDidMount() {
      console.log('Component DID MOUNT!')
   }

   componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!'+this.props.result)
   }

   shouldComponentUpdate(newProps, newState) {
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!'+this.props.result);
   }

   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!'+this.props.result)
      if(this.props.result==="valid Login")
        {
            console.log("called"+this.props.uname);
            //const { history } = this.props
            //history.pushState(null, '/Home');
            //this.props.history.push('/Home', { message: 'hello, im a passed message!' } );
            this.props.history.push({
  pathname: '/Home',
  state: { message: this.props.result ,Username:this.props.uame}
})
        }
   }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }

  render() {
      console.log('Component WILL Render!'+this.props.result)
    return (
      <div className="">
      <div className="col-sm-6">
      <img src="integration_1.png" className="pull-right"/>
      </div>
      <div className="col-sm-6">

      <div className="afterSignIn">

        <div className="col-sm-12 form-design">
        <div className="form-horizontal">
        <div className="form-group"> 
         <div className="col-sm-4">
        <label>Enter Username:</label></div>
         <div className="col-sm-4">
        <input className="form-control" type="text" id="uname" onChange={()=>
        {this.props.dispatch(this.props.setUsername(document.getElementById('uname').value))}}/><br/>
        </div></div>
        <div className="form-group">
        <div className="col-sm-4">
        <label>Enter Password:</label></div>
        <div className="col-sm-4">
        <input type="password" className="form-control" id="pass" onChange={()=>
        {this.props.dispatch(this.props.setPassword(document.getElementById('pass').value))}}/><br/>
        </div></div>        
        
        <div className="form-group btn-orient">
        <button className="btn btn-info btn-margin" onClick={() => {
                                this.props.validateUser(this.props.uame,this.props.pass)
                            }}>Login</button>
        <Link to="/signUp"  className="btn btn-info">Sign Up</Link>
                          </div>
                            </div>
                            </div>
        </div>
        </div>
        </div>
    );
  }
}

const mapStateToProps=(state)=> {
    return {
        uame:state.reducer.Username,
        pass:state.reducer.Password,
        result:state.reducer.result
    };
};

const mapDispatchToProps=(dispatch)=> {
    let actions={setUsername,setPassword}
    return {
        validateUser : (uname,pass) => dispatch(validateUser(uname,pass)),
        ...actions,dispatch
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);


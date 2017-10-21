import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import {setFname,setLname,setEmail,setUsername,setPassword,signUpUser} from "../actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'


class Register extends Component {

       componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!'+this.props.result)
      if(this.props.result===2)
        {
            console.log("called"+this.props.uname);
            //const { history } = this.props
            //history.pushState(null, '/Home');
            //this.props.history.push('/Home', { message: 'hello, im a passed message!' } );
            //this.props.result=0;
            this.props.history.push({
  pathname: '/'
})
        }
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
       componentWillMount() {
      console.log('Component WILL MOUNT!')

        
   }
     
    
  render() {
    
    return (
      <div className="App">
        <div className="row">
            <div className="col-sm-12 form-design">
            <div className="form-horizontal">
            <div className="form-group row">
             <div className="col-sm-4">
            <label>Enter Firstname:</label></div>
             <div className="col-sm-4">
            <input className="form-control" type="text" id="fname" onChange={()=>
            {this.props.dispatch(this.props.setFname(document.getElementById('fname').value))}}/><br/>
            </div></div>
            <div className="form-group row">
            <div className="col-sm-4">
            <label>Enter Lastname:</label></div>
            <div className="col-sm-4">
            <input type="text" className="form-control" id="lname" onChange={()=>
            {this.props.dispatch(this.props.setLname(document.getElementById('lname').value))}}/><br/>
            </div></div>
            
            <div className="form-group row">
            <div className="col-sm-4">
            <label>Enter username:</label></div>
            <div className=" col-sm-4">
            <input className="form-control" id="uname" type="text" onChange={()=>
            {this.props.dispatch(this.props.setUsername(document.getElementById('uname').value))}}/>
            </div>
            </div>

            <div className="form-group row">
            <div className="col-sm-4">
            <label>Enter email id:</label></div>
            <div className=" col-sm-4">
            <input className="form-control" id="email" type="text" onChange={()=>
            {this.props.dispatch(this.props.setEmail(document.getElementById('email').value))}}/>
            </div>
            </div>


            <div className="form-group row">
            <div className="col-sm-4">
            <label>Password:</label></div>
            <div className=" col-sm-4">
            <input type="password" className="form-control" id="pass" onChange={()=>
            {this.props.dispatch(this.props.setPassword(document.getElementById('pass').value))}}/>
            </div>
            </div>

            <div className="form-group row">
            <div className="col-sm-4">
            <label>Confirm Password:</label></div>
            <div className=" col-sm-4">
            <input type="password" className="form-control"/>
            </div>
            </div>


            <div className="form-group row btn-orient">
                <button className="btn btn-info btn-margin" onClick={() => {
                                     this.props.signUpUser(this.props.fname,this.props.lname,this.props.uname,
                                        this.props.pass,this.props.email)
                                }}>Sign Up</button>
            <Link to={'/'} className="btn btn-info">Sign In</Link>
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
        fname:state.reducer.FirstName,
        lname:state.reducer.LastName,
        email:state.reducer.email_id,
        uname:state.reducer.Username,
        pass:state.reducer.Password,
        result:state.reducer.result
    };
};

const mapDispatchToProps=(dispatch)=> {
    let actions={setFname,setLname,setEmail,setUsername,setPassword}
    return {
        signUpUser : (fname,lname,uname,pass,email) => dispatch(signUpUser(fname,lname,uname,pass,email)),
        ...actions,dispatch
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);


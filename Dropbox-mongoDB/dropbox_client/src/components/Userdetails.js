import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {getUserDetails,logOut} from "../actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'


class UserData extends Component {
  constructor(props) {
  super(props);
} 

componentWillMount() {
      console.log('Home Component WILL MOUNT!')
      this.props.getUserDetails();
      console.log("all files displayed:"+this.props.all_files);
   }

   componentDidMount() {
      console.log('Home Component DID MOUNT!')
   }

   componentWillReceiveProps(newProps) {    
      console.log('Home Component WILL RECIEVE PROPS!')

   }

   shouldComponentUpdate(newProps, newState) {
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');

   }

   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!');
      //this.props.GetFiles("amitam");
      if(this.props.isAuthenticated===false)
        {
          console.log("called logout");
          this.props.history.push("/");
        }

   }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }


  render() {


    return (
      <div className="App col-md-12">
      User Details:
      <table>
      <tr>
      <td>FirstName</td><td>{this.props.fname}</td>
      </tr>
      <tr><td>
      Lastname</td><td>{this.props.lname}</td></tr>
      <tr>
      <td>
      Email id</td><td>{this.props.email}</td>
      </tr>
      </table>
      <input type="submit" className="btn btn-info" value="sign out" onClick={() => {
                                     this.props.logOut()}} />
</div>
        
    );
  }
}

const mapStateToProps=(state)=> {
    return {
        fname:state.reducer.FirstName,
        lname:state.reducer.LastName,
        email:state.reducer.email_id,
        isAuthenticated:state.reducer.isAuthenticated
        
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        getUserDetails:()=>dispatch(getUserDetails()),
        logOut:()=>dispatch(logOut()),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserData);


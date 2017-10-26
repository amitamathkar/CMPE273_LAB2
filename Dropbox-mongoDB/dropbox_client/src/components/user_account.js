import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import {setOverview,setExperience,setEducation,setContact,setHobbies,setAchievement,insertUserAccount,getUserDetails} from "../actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import jwt from 'jsonwebtoken';


class User_Info extends Component {

        constructor(props) {
  super(props);
} 

    componentWillMount() {
      console.log('User account Component WILL MOUNT!')
      
   }

   componentDidMount() {
      console.log('account Component DID MOUNT!')
      this.props.getUserDetails();
      console.log("all details displayed:");
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
      console.log('Component DID UPDATE!')
      //this.props.GetFiles("amitam");

   }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }


    
  render() {
    
    return (
      <div className="App">

        <div className="row">
            <div className="col-sm-12 form-design">
            <div className="form-horizontal">

            <div className="form-group row">
             <div className="col-sm-4">
            <label>Firstname:</label></div>
             <div className="col-sm-4">
            <input className="form-control" type="text" id="overview" value={this.props.fname}/><br/>
            </div></div>

            <div className="form-group row">
             <div className="col-sm-4">
            <label>User Overview:</label></div>
             <div className="col-sm-4">
            <input className="form-control" type="text" id="overview" onChange={()=>
            {this.props.dispatch(this.props.setOverview(document.getElementById('overview').value))}}/><br/>
            </div></div>
            <div className="form-group row">
            <div className="col-sm-4">
            <label>Enter Work Experiance</label></div>
            <div className="col-sm-4">
            <input type="text" className="form-control" id="exp" onChange={()=>
            {this.props.dispatch(this.props.setExperience(document.getElementById('exp').value))}}/><br/>
            </div></div>
            
            <div className="form-group row">
            <div className="col-sm-4">
            <label>Enter Education history:</label></div>
            <div className=" col-sm-4">
            <textArea className="form-control" id="edu" type="text" onChange={()=>
            {this.props.dispatch(this.props.setEducation(document.getElementById('edu').value))}}></textArea>
            </div>
            </div>

            <div className="form-group row">
            <div className="col-sm-4">
            <label>Contact Number:</label></div>
            <div className=" col-sm-4">
            <input className="form-control" id="contact" type="text" onChange={()=>
            {this.props.dispatch(this.props.setContact(document.getElementById('contact').value))}}/>
            </div>
            </div>


            <div className="form-group row">
            <div className="col-sm-4">
            <label>Hobbies/Interests</label></div>
            <div className=" col-sm-4">
            <input type="text" className="form-control" id="hobby" onChange={()=>
            {this.props.dispatch(this.props.setHobbies(document.getElementById('hobby').value))}}/>
            </div>
            </div>

            <div className="form-group row">
            <div className="col-sm-4">
            <label>Achievement in life:</label></div>
            <div className=" col-sm-4">
            <input type="Achievement" id="achievement" className="form-control" onChange={()=>
            {this.props.dispatch(this.props.setAchievement(document.getElementById('achievement').value))}}/>
            </div>
            </div>


            <div className="form-group row btn-orient">
                <button className="btn btn-primary btn-margin" onClick={() => {
                                     this.props.insertUserAccount(this.props.overview,this.props.Experiance,
                                        this.props.Education,this.props.Contact,this.props.Hobbies,
                                        this.props.Achievement)
                                }}>Save</button>
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
        overview:state.reducer.overview,
        Experiance:state.reducer.Experiance,
        Education:state.reducer.Education,
        Contact:state.reducer.Contact,
        Hobbies:state.reducer.Hobbies,
        Achievement:state.reducer.Achievement,
        name:state.reducer.FirstName,
        lname:state.reducer.LastName,
        email:state.reducer.email_id  
    };
};

const mapDispatchToProps=(dispatch)=> {
    let actions={setOverview,setExperience,setEducation,setContact,setHobbies,setAchievement,getUserDetails}
    return {
        insertUserAccount : (overview,Experiance,Education,Contact,Hobbies,Achievement) => 
        dispatch(insertUserAccount(overview,Experiance,Education,Contact,Hobbies,Achievement)),
        ...actions,dispatch
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(User_Info);


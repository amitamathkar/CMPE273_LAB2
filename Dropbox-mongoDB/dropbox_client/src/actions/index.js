import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { post } from 'axios';
import jwt from 'jsonwebtoken';
export function setUsername(uname) {
    return {
        type : "USERNAME",
        payload:uname
    }
}
export function setPassword(pass) {
    return {
        type : "PASSWORD",
        payload:pass
    }
}

export function setFname(fname) {
    return {
        type : "FIRST",
        payload:fname
    }
}

export function setLname(lname) {
    return {
        type : "LAST",
        payload:lname
    }
}

export function setEmail(email) {
    return {
        type : "EMAIL",
        payload:email
    }
}

export function setOverview(overview) {
    return {
        type : "OVERVIEW",
        payload:overview
    }
}

export function setExperience(Experiance) {
    return {
        type : "EXP",
        payload:Experiance
    }
}

export function setEducation(Education) {
    return {
        type : "EDUCATION",
        payload:Education
    }
}

export function setContact(Contact) {
    return {
        type : "CONTACT",
        payload:Contact
    }
}

export function setHobbies(Hobbies) {
    return {
        type : "HOBBIES",
        payload:Hobbies
    }
}

export function setAchievement(Achievement) {
    return {
        type : "ACHIEVEMENT",
        payload:Achievement
    }
}

export function setCurrentUser(user) {
    console.log("setting");
    return {
        type : "SET_CURRENT_USER",
        payload:user
    }
}

export function validateUser(uname,pass) {
    console.log("uname"+uname);
    return function(dispatch){
        axios.post("http://localhost:5001/api/afterSignIn",{
            uname,pass
        })
        .then(function(response){
            console.log("response: "+response.data.result);
            dispatch({type : "LOGIN", payload:response.data.result})})
        .catch(function(err){
            console.log(err);
        });
    }
}

export function signUpUser(fname,lname,uname,pass,email) {
    console.log("fname:"+fname);
    console.log("lname:"+lname);
    console.log("uname:"+uname);
    console.log("email:"+email);
    console.log("pass:"+pass);

    return function(dispatch){
        axios.post("http://localhost:5001/api/signUp",{
            fname,lname,uname,pass,email
        })
        .then(function(response){
            console.log("response: "+response.data.status);
            dispatch({type : "SIGNUP", payload:response.data.status})})
        .catch(function(err){
            console.log(err);
        });
    }
}

export function uploadDocumentRequest(file, name ) {  
  console.log("name:"+name)
  console.log("file:"+file)
  var data = new FormData();
  data.append('file', file);
  data.append('name', name);

const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        const url = 'http://localhost:5001/api/upload';


  return function(dispatch) {
    axios.post('http://localhost:5001/api/upload', data)
     //post(url, data, config)
      .then(function(response){
        console.log("response: "+response);
         dispatch(uploadSuccess(response))
      })
  }
}

export function logOut(file, name ) {  
return dispatch=>{
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
}
}

export function uploadSuccess({ data }) {
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    data,
  };
}

export function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}

export function GetFiles(uname) {
    console.log("uname:"+uname);

    return function(dispatch){
        axios.post("http://localhost:5001/api/getAllFiles",{
            uname
        })
        .then(function(response){
            console.log("response: "+response.data.files);
            dispatch({type : "ALLFILES", payload:response.data.files})})
        .catch(function(err){
            console.log(err);
        });
    }
}

export function make_star(file_id,value,user_name,Filename) {
    console.log("file_id:"+file_id+"   value: "+value);

    return function(dispatch){
        axios.post("http://localhost:5001/api/make_star",{
            file_id,value,user_name,Filename
        })
        .then(function(response){
            console.log("response: "+response.data.files);
            dispatch({type : "STARRED", payload:response.data.files})})
        .catch(function(err){
            console.log(err);
        });
    }
}

export function insertUserAccount(overview,Experiance,Education,Contact,Hobbies,Achievement,username) {
        console.log("overview:"+overview);
    console.log("Experiance:"+Experiance);
    console.log("Education:"+Education);
    console.log("Contact:"+Contact);
    console.log("Hobbies:"+Hobbies);
    console.log("Achievement:"+Achievement);
    console.log("username:"+username);



    return function(dispatch){
        axios.post("http://localhost:5001/api/insertUserAccount",{
            overview,Experiance,Education,Contact,Hobbies,Achievement,username
        })
        .then(function(response){
            console.log("response: "+response.data.files);
            dispatch({type : "USER_ACCOUNT", payload:response.data.files})})
        .catch(function(err){
            console.log(err);
        });
    }
}
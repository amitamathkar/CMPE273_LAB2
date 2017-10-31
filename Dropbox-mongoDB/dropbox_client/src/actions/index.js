import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { post } from 'axios';
import jwt from 'jsonwebtoken';
var fileDownload = require('react-file-download');
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
        fetch("http://localhost:5001/api/afterSignIn",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({username:uname,password:pass})
            
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "LOGIN",
                   payload: data.result
            })

        )
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

export function uploadDocumentRequest(file, file_id,folder_name,flag ) {  
  console.log("name:"+file_id)
  console.log("file:"+folder_name)
  var data = new FormData();
  data.append('file', file);
  data.append('name', file_id);
  data.append('parent_available', flag);
  data.append('folder_name', folder_name);



   return function(dispatch) {
    fetch('http://localhost:5001/api/upload',{
        mode: 'no-cors',
     method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: data})
     .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "UPLOAD_DOCUMENT_SUCCESS",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
  }
}

export function logOut(file, name ) {  
    return function(dispatch){
        fetch("http://localhost:5001/api/logout",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include'    
        })
        //.then(res => res.json())
        .then(data => 
            dispatch({
                   type: "LOGOUT",
                   payload: data.result
            })

        )
        .catch(function(err){
            console.log(err);
        });
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
        fetch("http://localhost:5001/api/getAllFiles",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({parent_id:uname})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function make_star(file_id,value,user_name,Filename) {
    console.log("file_id:"+file_id+"   value: "+value);

    return function(dispatch){
        fetch("http://localhost:5001/api/make_star",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({file_id:file_id,value:value,user_name:user_name,Filename:Filename})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "STARRED",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function insertUserAccount(overview,Experiance,Education,Contact,Hobbies,Achievement) {
        console.log("overview:"+overview);
    console.log("Experiance:"+Experiance);
    console.log("Education:"+Education);
    console.log("Contact:"+Contact);
    console.log("Hobbies:"+Hobbies);
    console.log("Achievement:"+Achievement);

    return function(dispatch){
        fetch("http://localhost:5001/api/insertUserAccount",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({overview:overview,Experiance:Experiance,Education:Education,Contact:Contact,Hobbies:Hobbies,Achievement:Achievement})
        })
        .then(res => res.json())
        .then(data => 
            
            dispatch({
                   type: "USER_ACCOUNT",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function getUserDetails() {  
    console.log('user details called');
    return function(dispatch){
        fetch("http://localhost:5001/api/getDetails",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include'    
        })
        .then(res => res.json())
        .then(data => 
            dispatch({
                   type: "DETAILS",
                   payload: data.details
            })
        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function createDirectory(directory_name) {  
    console.log('createDirectory called');
    return function(dispatch){
        fetch("http://localhost:5001/api/createDirectory",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include' ,
        body:JSON.stringify({directory_name:directory_name})   
        })
        .then(res => res.json())
        .then(data => 
            dispatch({
                   type: "CREATE_DIR",
                   payload: data.details
            })
        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function GetFiledetails(file_id) {
    console.log("uname:"+file_id);

    return function(dispatch){
        fetch("http://localhost:5001/api/getFiledetails",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({file_id:file_id})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function delete_file(file_id,Filename) {
    console.log("file_id:"+file_id+"   value: "+Filename);

    return function(dispatch){
        fetch("http://localhost:5001/api/delete_file",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({file_id:file_id,Filename:Filename})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "DELETE",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function download_file(file_id,Filename) {
    console.log("file_id:"+file_id+"   value: "+Filename);

    return function(dispatch){
        fetch("http://localhost:5001/api/download_file",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({file_id:file_id,Filename:Filename})
        })
        .then(res => {
            fileDownload(res.data, Filename),
            res.json()})
        .then(data => 

            
            dispatch({
                   type: "DELETE",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}

export function GetFolderFiles(file_id) {
    console.log("uname:"+file_id);

    return function(dispatch){
        fetch("http://localhost:5001/api/getAllFiles",{
            method:"POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:'include',    
        body:    JSON.stringify({parent_id:file_id})
        })
        .then(res => res.json())
        .then(data => 

            
            dispatch({
                   type: "ALLFILES",
                   payload: data.files
            })

        )
        .catch(function(err){
            console.log(err);
        });
    }
}
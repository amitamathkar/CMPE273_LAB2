import {createStore , applyMiddleware } from "redux";
import {combineReducers} from 'redux'
import {createLogger as logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { BrowserRouter} from 'react-router-dom';
import { Router, Route, browserHistory ,hashHistory} from 'react-router';

const data = {FirstName:'',
				LastName:'',
				Username:'',
				Password:'',
				conf_password:'',
				email_id:'',
				isAuthenticated:'',
				user:{},
				overview:'',
				Experiance:'',
				Education:'',
				Contact:'',
				Hobbies:'',
				Achievement:''}
const files={
	filename:'',
	all_files:[]
}

const reducer = (state = data, action) => {
	switch(action.type)
	{
		case "USERNAME":
console.log("received"+action.payload);
		return Object.assign({},state,{Username:action.payload})

		case "PASSWORD":
			return Object.assign({},state,{Password:action.payload})

		case "FIRST":
			return Object.assign({},state,{FirstName:action.payload})

		case "LAST":
			return Object.assign({},state,{LastName:action.payload})

		case "EMAIL":
			return Object.assign({},state,{email_id:action.payload})

		case "LOGIN":
		console.log("Login Status:"+action.payload);
		if(action.payload==="valid Login")
		{
			return Object.assign({},state,{result:action.payload,
				isAuthenticated:true})
		}
		else
		{
			return state;
		}

		case "SET_CURRENT_USER":
			console.log("blank user test:"+action.payload.user);
			if(action.payload.user!==undefined)
			{
				console.log("undefined:ccccc");
			return Object.assign({},state,{isAuthenticated:true,user:action.payload.user,Username:action.payload.user.username})		
			}
			else
			{
				console.log("undefined:dddd");
				return Object.assign({},state,{result:"Logout",isAuthenticated:false})			
			}
			break;

		case "SIGNUP":
		console.log("Register Status:"+action.payload);
		return Object.assign({},state,{result:action.payload})

		case "OVERVIEW":
			return Object.assign({},state,{overview:action.payload})

		case "EXP":
			return Object.assign({},state,{Experiance:action.payload})

		case "EDUCATION":
			return Object.assign({},state,{Education:action.payload})

		case "CONTACT":
			return Object.assign({},state,{Contact:action.payload})

		case "HOBBIES":
			return Object.assign({},state,{Hobbies:action.payload})

		case "ACHIEVEMENT":
			return Object.assign({},state,{Achievement:action.payload})

		case "USER_ACCOUNT":
		console.log("Account details updated");
		return Object.assign({},state,{	overview:action.payload.overview,
										Username:action.payload.username,
										Experiance:action.payload.Experiance,
										Education:action.payload.Education,
										Contact:action.payload.Contact,
										Hobbies:action.payload.Hobbies,
										Achievement:action.payload.Achievement})

		case "LOGOUT":		
			return Object.assign({},state,{result:0,isAuthenticated:false})
		
		case "DETAILS":
		console.log('details action found');
		if(action.payload===403)
		{
			return Object.assign({},state,{result:0,isAuthenticated:false})
		}
		else
		{
			return Object.assign({},state,{FirstName:action.payload.firstname,LastName:action.payload.lastname,
				email_id:action.payload.email_id})
		}
			
			

		default:
		console.log("No action found");
	}
    return state;
};

const reducer2 = (state = files, action) => {
	switch(action.type)
	{
		case "UPLOAD_DOCUMENT_SUCCESS":
		console.log("Upload success");
		return Object.assign({},state,{all_files:[...action.payload]})

		case "ALLFILES":
		console.log("Files success"+action.payload);
		return Object.assign({},state,{all_files:[...action.payload]})

		case "STARRED":
		console.log("Files starred"+action.payload);
		return Object.assign({},state,{all_files:[...action.payload]})

		default:
		console.log("No action found");
	}
    return state;
};

const middleware=applyMiddleware(promise(),thunk,logger());

const combine=combineReducers({reducer,reducer2})
const store=createStore(combine,middleware);
export default store;
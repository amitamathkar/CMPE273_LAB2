import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {GetFiledetails,uploadDocumentRequest,GetFolderFiles} from "../actions/index";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'



class Folder_activities extends Component {
	constructor(props) {
  super(props);
  this.state = {
    file_id:this.props.location.state.message,
    file_name:this.props.location.state.folder_name,
    username:this.props.location.state.username

  };
} 

componentWillMount() {
      console.log('Home Component WILL MOUNT!' +this.state.file_id)
      this.props.GetFolderFiles(this.state.file_id);
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
      console.log('Component DID UPDATE!'+this.props.result)
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
    var files=
          this.props.all_files.map((item,key)=>{
            return(<div className="row App-data" key={key}>
              <div className="col-md-1">{item.filetype==="file"?<i className="fa fa-file"></i>:<i className="fa fa-folder"></i>}

              </div>
              <div className="col-md-7 pull-left">{item.filename}</div>
              <div className="col-md-1">{item.starred==="no"?<i className="fa fa-star-o" onClick={() => {
                                this.props.make_star(item._id,"yes",this.state.user_name,item.filename)
                            }}></i>:<i className="fa fa-star" onClick={() => {
                                this.props.make_star(item._id,"no",this.state.user_name,item.filename)
                            }}></i>}

              </div>
              <div className="col-md-3"><button className="btn btn-info hr_btn_height">...</button></div>
                            <div className="hr-line-dashed"></div>
              </div>)
          }
          );

    return (
      <div className="App col-md-12">
      <div className="col-md-2">
<Link to={{ pathname: '/Home', state: { Username:this.state.username},target:"_blank" }}><img src="dropbox.png" className="imgStyle"/></Link>
<div className="maestro-nav__feature-wrap">My Files</div>
<div className="maestro-nav__feature-wrap">Sharing</div>
<div className="maestro-nav__feature-wrap">Deleted Files</div>
<div className="maestro-nav__feature-wrap"><Link to="/UserInfo">User Account</Link></div>
<div className="maestro-nav__feature-wrap"><Link to="/Details">User Info</Link></div>
<div className="maestro-nav__feature-wrap">
<input type="submit" className="btn btn-info" value="sign out" onClick={() => {
                                     this.props.logOut()}} />
                                     </div>
      </div>
      <div className="col-md-10">
<div>
<h1 className="text-center">Files</h1>
</div>
<div className="pull-right col-md-6">
 <input type="file" className="inputfile" name="upload" id="upload" onChange={(event) => {
                                    this.props.uploadDocumentRequest(event.target.files[0],this.state.file_id,this.state.file_name,true)
                                    }} />
                                    <label className="btn btn-info" for="upload">Upload File</label>
  <input type="submit" value="New Folder" className="btn btn-info" name="create_dir" id="create_dir" onClick={() => {
                                    this.props.createDirectory("test folder")
                                    }}/>
</div>

<div className="col-md-8">
        <div className="row pull-left">Recent</div> <br/>
        <div className="row"></div>  

      <div className="row">
      </div>  
{files}
      </div>
            <div className="col-md-2">
      </div>
      </div>

</div>
        
    );
  }
}

const mapStateToProps=(state)=> {
    return {
        all_files:state.reducer2.all_files,
        Username:state.reducer.Username,
        isAuthenticated:state.reducer.isAuthenticated
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        uploadDocumentRequest : (file,filename,folder_name,parent_available) => dispatch(uploadDocumentRequest(file,filename,folder_name,parent_available)),
        GetFiledetails:(file_id)=>dispatch(GetFiledetails(file_id)),
        GetFolderFiles:(file_id)=>dispatch(GetFolderFiles(file_id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Folder_activities);


import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';

class ReadingList extends Component{


  constructor(props){
    super(props);
    this.state = {
      data:[]
    }
  }

  componentDidMount(){
    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    axios.get(`/api/posts/readinglist/${this.props.auth.user._id}`,config,{data:"useless"})
    .then(res => {this.setState({data:res.data}); console.log(res.data)})
    .catch(err => console.log(err))
  }

  removeList = (id)=>{
    axios.get(`/api/posts/reading?id=${id}&userid=${this.props.auth.user._id}`)
    .then(res=> this.setState({data:res.data}))
    .catch(err=> console.log(err))
  }


  render(){
    return(
      <React.Fragment>
        <div className="container mt-5 pt-5">

      {this.state.data.length !== 0? (
        <React.Fragment>

          {this.state.data.map((post, id)=> 
          (
            <React.Fragment>
               <div className="eachPost">
            <Link to={`/viewpost/${post.post_id}`} style={{textDecoration:"none",color:"white"}}>
             
           
                 
                
                    <h3>{post.post_title}</h3>
                    
                    <p>{post.post_description}</p>
                 
              
            
            
            
                
                {/* <ReactMarkdown source={Base64.decode(post.post)} escapeHtml={false} /> */}
             
            </Link>
            <div className="row">
            <div className="col-md-6">
              <span style={{color:"#747c85"}}>Created At: {post.date}</span>
            </div>
            <div className="col-md-6 text-right">
              <button onClick={e=> this.removeList(post._id)} className="btn btn-danger">Remove</button>
            </div>
          </div>
          </div>
         
            </React.Fragment>
          )                  
          
          )}

          
        </React.Fragment>
      ) : <React.Fragment>
         <h1 className="text-white">You Have Noting In Your Reading List :(</h1>
        </React.Fragment>}


  </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(ReadingList);
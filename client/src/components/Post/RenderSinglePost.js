import React, {Component} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Loader from 'react-loader-spinner'
import {Link} from "react-router-dom";
import {Base64} from "js-base64";
import ReactMarkdown from "react-markdown";
import { connect } from 'react-redux';


class Render extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      loading: true,
      comment: null
    }
  }

  componentDidMount(){
    console.log(this.props);
  
    console.log(localStorage.getItem("token"));
   

    axios.get(`/api/posts/single?id=${this.props.postid}`)
    .then(res => {this.setState({data:res.data}); console.log(res.data)})
    .catch(err => console.log(err))
  }

  //Add New Comments
  submitComment = ()=>{
   
    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };
    const data = {
      text: this.state.comment,
      post_id: this.state.data._id
    }
    if(this.state.comment !== "" && this.state.comment !== null){
      axios.post(`/api/posts/comment`,data,config)
      .then(res => {
        this.setState({data: res.data,comment:""});
      })
      .catch(err => {
        if(err){
          this.setState({error: "Please Enter All Fields"})
        }
      })
    } 
  }

  //Delete Comment
  deleteComment = (comment_id)=>{
    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    axios.delete(`/api/posts/comment/${this.state.data._id}/${comment_id}`,config)
    .then(res=> this.setState({data: res.data}))
    .catch(err => console.log(err))
  }

  //Add To Reading List
  addToReadingList = ()=>{
    console.log("added");
    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };
    const data = {
      post_id: this.state.data._id,
      post_title: this.state.data.post_title,
      date: this.state.data.post_created,
      post_description: this.state.data.post_description
    }


    axios.post(`/api/posts/reading`,data,config)
    .then(res => {
      //Noting
      console.log(res.data);
    })
    .catch(err => {
      if(err){
        this.setState({error: "Please Enter All Fields"})
      }
    })

  } 

  render(){
    return(
      <div>
        {this.state.data != null ? <React.Fragment>
            <div className="single-post">
              <div className="container">
              
              
              <h1 className=" pt-5" style={{marginTop:"30px"}}>{this.state.data.post_title}</h1>

              <p>Created At : {this.state.data.post_created}</p>
              <div className="row">
                <div className="col-md-4">
                <Link className="this-is-the-link" to={`/user/${this.state.data.post_username}`}>
                  <div className="single-post-userinfo">
                    <img src={this.state.data.user_image} height="50" width="50" style={{borderRadius:"50px",border:"2px solid white"}} />
                    <p>@{this.state.data.post_username}</p>
                    </div>
                </Link>
                </div>
                <div className="col-md-8 text-right">
                  <button onClick={this.addToReadingList} className="btn btn-primary">Add To Reading List</button>
                </div>
              </div>
               

                <div className="single-post-tags">
                    <Link >#{this.state.data.tags.firstTag}</Link>
                    <Link >#{this.state.data.tags.secondTag}</Link>
                    <Link >#{this.state.data.tags.thirdTag}</Link>
                    <Link >#{this.state.data.tags.fourthTag}</Link>
                </div>
              

              <h4>Description↙</h4>
              <p>{this.state.data.post_description}</p>
              
              <h4>Article↙</h4>
              <div className="the-article text-white">
                    <ReactMarkdown  source={Base64.decode(this.state.data.post)} escapeHtml={false} />
              </div>
 
              <h4>Comments↙</h4>
              <div>
                <input placeholder="Type Your Comment Here" onChange={e=> this.setState({comment:e.target.value})} type="text" class="form-control" value={this.state.comment}/>
                <button className="btn btn-primary mt-2" onClick={this.submitComment}>Submit Comment</button>

                <div>
                  {/* Render Comments */}
                  {this.state.data.comments.map(comment=>(
                    <React.Fragment>
                      <div className="each-comment_ mt-2">
                        <Link to={`/user/${comment.name}`}>{comment.name}</Link>
                        <p>{comment.text}  {this.props.auth? (
                          <React.Fragment>
                            {this.props.auth.user._id == comment.user ? (<React.Fragment>
                                  <button onClick={e=> this.deleteComment(comment._id)} className="btn btn-danger">X</button>
                               </React.Fragment>) :null}
                          </React.Fragment>
                        ) :null}</p>

                        

                      </div>
                      
                    </React.Fragment>
                  ))}
                </div>
              </div>

                
              </div>
            </div>
        </React.Fragment> : <div className="d-flex" style={{justifyContent:"center",alignItems:"center", height:"100vh"}}> <Loader className="text-center" type="Puff" color="#00BFFF"height={100}   width={100} timeout={50000000} //3 secs
                    /> </div> }
      </div>
    )
  }
}

function RenderSinglePost(props){
    const auth = props.auth;
    
    const {id} = useParams();
    return(
      <Render auth={auth} postid={id}/>
    )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(RenderSinglePost);

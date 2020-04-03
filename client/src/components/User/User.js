import React,{Component} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { Link } from "react-router-dom";

class TheUser extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      userPost: null
    }
  }

  componentDidMount(){
    console.log(this.props.username)

    axios.get(`/api/users?username=${this.props.username}`)
    .then(res => {
      console.log(res.data)
      this.setState({data: res.data.userData, userPost: res.data.userPosts})
    })
    .catch(err => {
      if(err){
        this.setState({error: "Please Enter All Fields"})
      }
    })
  }

  render(){
    return(
      <div className="user-info pt-5">
        {this.state.data != null?  
        <div className="container pt-5 mt5 text-white">
          <div className="user-info-header p-5">
            <div className="row ml-0 mr-0">
              <div className="col-md-8 col-lg-8">
                <div className="d-flex"> 
                <img style={{borderRadius:"50%",border:"4px solid white"}} height="225" width="225" src={this.state.data.github_profile_img}/>

                  <div className="p-5">
                    <h1 className="">{this.state.data.name}</h1>
                    {this.state.data.developer_type ? <p style={{color:"#747c85", fontStyle:"italic"}}> {this.state.data.developer_type}</p> : null}

                    {this.state.data.bio ? <p>{this.state.data.bio}</p> : null}

                    <div className="user-social-links">
                      {this.state.data.github_link ? <a href={this.state.data.github_link}>
                        <i className="fab fa-github fa-2x"></i>
                      </a> :null}
                      
                      {this.state.data.twitter_link ? <a href={this.state.data.twitter_link}>
                        <i className="fab fa-twitter fa-2x"></i>
                      </a> :null}

                      {this.state.data.youtube_link ? <a href={this.state.data.youtube_link}>
                        <i className="fab fa-youtube fa-2x"></i>
                      </a> :null}

                      {this.state.data.website_link ? <a href={this.state.data.website_link}>
                        <i class="fas fa-blog fa-2x"></i>
                      </a> :null}
                      
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                  <div className="user-info-right-side" style={{fontFamily:"consolas"}}>
                      {this.state.data.work? <div>
                        <h5>Work</h5>
                        <p>{this.state.data.work}</p>
                      </div> :null}

                      {this.state.data.location? <div>
                        <h5>Location</h5>
                        <p>{this.state.data.location}</p>
                      </div> :null}

                      {this.state.data.gender? <div>
                        <h5>Gender</h5>
                        <p>{this.state.data.gender}</p>
                      </div> :null}
                  </div>
              </div>
            </div>
          </div>
        </div> :null}
      
      {/* User Posts */}
      <div className="container pt-5">
      {this.state.userPost != null? (
        <React.Fragment>
           {this.state.userPost.map((post, id)=> 
                    (
                      <Link to={`/viewpost/${post._id}`} style={{textDecoration:"none",color:"white"}}>
                        <div className="eachPost">
                          <div className="row">
                            <div style={{paddingRight:"0px !important"}} className="col-md-1 col-lg-1" >
                              <img style={{borderRadius:"50px"}} height="65" width="65" src={post.user_image}></img>
                            </div>
                            <div className="col-md-11 col-lg-11">
                              <h3>{post.post_title}</h3>
                              <p>{post.post_description}</p>
                            </div>
                          </div>
                        
                          <div>
                            <span>
                              <a id="tags" href={`/api/tag/${post.tags.firstTag}`}>#{post.tags.firstTag}</a>
                            </span>

                            <span>
                              <a id="tags" href={`/api/tag/${post.tags.secondTag}`}>#{post.tags.secondTag}</a>
                            </span>

                            <span>
                              <a id="tags" href={`/api/tag/${post.tags.thirdTag}`}>#{post.tags.thirdTag}</a>
                            </span>

                            <span>
                              <a id="tags" href={`/api/tag/${post.tags.fourthTag}`}>#{post.tags.fourthTag}</a>
                            </span>
                          </div>
                      
                      <span style={{color:"#747c85"}}>By {post.post_username} Created At: {post.post_created}</span>
                          
                          {/* <ReactMarkdown source={Base64.decode(post.post)} escapeHtml={false} /> */}
                        </div>
                      </Link>
                    )              
                    )}
                  </React.Fragment>
                ) : null}

            </div>

      </div>
    )
  }

}

export default function User(){
  const {username} = useParams();
  return(
    <div>
      <TheUser username={username}/>
    </div>
  )
}
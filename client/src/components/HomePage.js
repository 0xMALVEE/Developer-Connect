import React, {Component} from "react";
import {Base64} from "js-base64"
import axios from "axios";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { Link } from "react-router-dom";
import KeyLinks from "./HomePage/KeyLinks";
const ReactMarkdown = require('react-markdown')



class HomePage extends Component{

  constructor(props){
    super(props);

    this.state = {
      data : null,
      count: 3
    }
  }

  componentDidMount(){

    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    axios.get(`/api/posts?count=${this.state.count}`,config)
    .then(res => this.setState({data:res.data}))
    .catch(err => console.log(err))
  }

  fetchPosts = () =>{
    this.setState({count: this.state.count + 3})


    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    axios.get(`/api/posts?count=${this.state.count}`,config)
    .then(res => this.setState({data:res.data}))
    .catch(err => console.log(err))
  }

  render(){
    return(
      <div>
        <div className="headerSection">
          <div className="container text-white">
            <h1>Connect With Developers  </h1>
            <h1>Expand Your Knowledge</h1>
            <a className="btn btn-success text-white mt-5">{
              this.props.auth.isAuthenticated? "THANKS FOR JOINING THE COMMUNITY" : "JOIN THE COMMUNITY"
            }</a>
          </div>
          
        </div>
          


          {/* Recent Posts By Developers */}
          <div className="row mr-0 ml-0 main-page-section-bottom ">
             

           

              <div className="col-md-4 col-lg-4 ">
                <div className="leftSideSectionc container">

                  {this.props.auth.user ?<div className="pt-5 ">
                      <Link style={{textDecoration:"none"}}>
                        <div className="left-profile-button">
                        <img style={{borderRadius:"50px",border:"2px solid white"}} height="60" width="60" src={this.props.auth.user ? this.props.auth.user.github_profile_img : ""} />

                        <span className="text-white p-1">
                          {this.props.auth.user ? (<React.Fragment>
                          
                          <span style={{color:"gray"}}>@{this.props.auth.user.username}</span> 
                          </React.Fragment>) : ""}
                          
                        </span>
                        </div>
                      </Link>

                    <div className="container mt-5 mb-5">

                      <div className="mb-2 special-links-left">
                        <Link className="" style={{textDecoration:"none",color:"white"}}><i class="fas fa-book"></i> Reading List</Link>
                      </div>
                      <div className="special-links-left">
                       <Link  style={{textDecoration:"none",color:"white"}}><i class="fas fa-play-circle"></i> Videos</Link>
                      </div>

                    </div>
                    <KeyLinks />

                    </div>: <div>

                      <h1 className="pt-5 text-white">PLEASE LOGIN TO ACCESS MORE STUFF</h1>
                      <KeyLinks />
                    </div> }

                </div>
              </div>



              <div className="col-md-8 col-lg-8 pr-0 mr-0">


              <div className="recentPostSection">
            <div className="container pt-5">
              <h1 className="display-4" style={{fontSize:"40px"}}>RECENT ARTICLES BY DEVELOPERS</h1>
                
              

                {this.state.data != null? (
                  <React.Fragment>
                  <InfiniteScroll hasMore={true} next={this.fetchPosts} loader={
                     <Loader className="text-center" type="Puff" color="#00BFFF"height={100}   width={100} timeout={3000} //3 secs
                    />
      } dataLength={this.state.data.length}>

                    {this.state.data.map((post, id)=> 
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

                    </InfiniteScroll>
                  </React.Fragment>
                ) :null}
             

            </div>
          </div>


                
              </div>

           </div> 


        


      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HomePage);
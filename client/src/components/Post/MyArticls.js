import React, {Component} from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { Link } from "react-router-dom";

export default class MyArticls extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount(){
    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    axios.get("/api/posts/mypost",config)
    .then(res => {
      console.log(res.data)
      if(res.data.length == 0){
        this.setState({data: null})
      }else{
        this.setState({data: res.data})
      }
      
    })
    .catch(err => {
      if(err){
        this.setState({error: "Please Enter All Fields"})
      }
    })
  }

  render(){
    return(
      <div className="my-posts">
        <div className="container">
          <h1 className="pt-5 mt-5">All Your Articles↙</h1>

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
                ) : <div style={{fontFamily:"consolas"}}>
                  <h2>You Don't Have Any Articles Yet</h2>
                  <h3>Please Create A Article</h3>
                  <Loader className="text-center" type="Puff" color="#00BFFF"height={100}   width={100} timeout={800000} //3 secs
                    />
                  </div>}
        </div>
        
      </div>
    )
  }
}
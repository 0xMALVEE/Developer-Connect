import React, {Component} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Loader from 'react-loader-spinner'
import {Link} from "react-router-dom";
import {Base64} from "js-base64";
import ReactMarkdown from "react-markdown";

class Render extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      loading: true
    }
  }

  componentDidMount(){
   

    axios.get(`/api/posts/single?id=${this.props.postid}`)
    .then(res => {this.setState({data:res.data}); console.log(res.data)})
    .catch(err => console.log(err))
  }

  render(){
    return(
      <div>
        {this.state.data != null ? <React.Fragment>
            <div className="single-post">
              <div className="container">
              <h1 className=" pt-5" style={{marginTop:"30px"}}>{this.state.data.post_title}</h1>
              <p>Created At : {this.state.data.post_created}</p>
                <Link className="this-is-the-link">
                  <div className="single-post-userinfo">
                    <img src={this.state.data.user_image} height="50" width="50" style={{borderRadius:"50px",border:"2px solid white"}} />
                    <p>@{this.state.data.post_username}</p>
                    </div>
                </Link>

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
                
              </div>
            </div>
        </React.Fragment> : <div className="d-flex" style={{justifyContent:"center",alignItems:"center", height:"100vh"}}> <Loader className="text-center" type="Puff" color="#00BFFF"height={100}   width={100} timeout={50000000} //3 secs
                    /> </div> }
      </div>
    )
  }
}

export default function RenderSinglePost(){
    const {id} = useParams();
    return(
      <Render postid={id}/>
    )
}
import React, {Component} from "react";
import { Base64 } from 'js-base64';
import axios from "axios";
const ReactMarkdown = require('react-markdown')



class CreatePost extends Component{
  constructor(props){
    super(props);

    this.state = {
      title: "",
      description:"",
      post:`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">`
    }
  }

  handleCreatePost(){
    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    const data = {
      post:Base64.encode(this.state.post),
      post_title:this.state.title,
      post_description: this.state.description
    }

    axios.post("/api/posts",data,config)
    .then(res => {
      this.setState({posts:res.data});
      console.log(this.state.posts)
    })
  }

  render(){
    return(
      <div>
       
        <div className="container">

    <h1>Create A New Post </h1>

        <div class="form-group">
          <label>Post Title</label>
          <input onChange={e => this.setState({title:e.target.value})} type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label>Short Description About This Post</label>
          <input onChange={e => this.setState({description:e.target.value})} type="text" class="form-control" />
        </div>

          <div class="form-group">
            <label for="">Write Post in Markdown or HTML,CSS (Bootstrap Pre Installed)</label>
            <textarea value={this.state.post} onChange={e => this.setState({post:e.target.value})} class="form-control" id="" rows="10"></textarea>
          </div>

        <div>
          <div>Post Preview</div>
           <ReactMarkdown source={this.state.post} escapeHtml={false} />

           <div className="" >
              <button onClick={this.handleCreatePost.bind(this)} className="btn btn-block btn-success  m-4 ">CREATE POST</button>
           </div>
        </div>

        </div>
      </div>
    )
  }
}

export default CreatePost;
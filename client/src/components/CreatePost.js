import React, {Component} from "react";
import { Base64 } from 'js-base64';
import axios from "axios";
import  { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
const ReactMarkdown = require('react-markdown')



class CreatePost extends Component{
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      success: false,
      error: "",
      firstTag: "",
      secondTag: "",
      thirdTag: "",
      fourthTag: "",
      spaces: false,
      tags: "",
      title: "",
      description:"",
      post:`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"><style>code{color:white; padding:10px; background:#2e3a48 }</style>`
    }
  }

  handleCreatePost(){
    this.setState({loading: true});

    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    const data = {
      post:Base64.encode(this.state.post),
      post_title:this.state.title,
      post_description: this.state.description,
      post_created: Date(),
      tags:{firstTag: this.state.firstTag, secondTag: this.state.secondTag,thirdTag: this.state.thirdTag, fourthTag: this.state.fourthTag}
    }

    axios.post("/api/posts",data,config)
    .then(res => {
      this.setState({posts:res.data, success: true, error: "", loading:false});
    })
    .catch(err => {
      if(err){
        this.setState({error: "Please Enter All Fields"})
      }
    })
  }

 

  render(){
    return(
      <div className="createArticleSection pb-5">
       {this.state.loading ? <div className="create-post-loading">
        <Loader className="text-center" type="Puff" color="#00BFFF"height={100}   width={100} timeout={30000} /> <p className="text-center">Loading..</p>
       </div> :null}
        <div className="container ">

      <h1 className="display-4 createArticleTitle">CREATE NEW ARTICLE </h1>
          
        <div class="form-group">
          <label>ARTICLE TITLE</label>
          <input id="createArticle" onChange={e => this.setState({title:e.target.value})} type="text" class="form-control" placeholder="Title your Article"/>
        </div>

        <div class="form-group">
          <label>Tags (Note: Spaces Will Be Removed)</label>
          
           
          <div className="d-flex">
            <input id="createArticle" onChange={e => {          
              this.setState({firstTag: e.target.value})
          }} type="text" class="form-control" placeholder="First Tag Here"/>

          <input id="createArticle" onChange={e => {          
              this.setState({secondTag:e.target.value})
          }} type="text" class="form-control" placeholder="Second Tag Here"/>

          <input id="createArticle" onChange={e => {          
              this.setState({thirdTag:e.target.value})
          }} type="text" class="form-control" placeholder="Third Tag Here"/>

          <input id="createArticle" onChange={e => {          
              this.setState({fourthTag:e.target.value})
          }} type="text" class="form-control" placeholder="Fourth Tag here"/>
          </div>
          

        </div>

        <div class="form-group">
          <label>Short Description About This Post</label>
          <input id="createArticle" onChange={e => this.setState({description:e.target.value})} type="text" class="form-control" placeholder="Write A Sort Description About This Article" autoComplete="off"/>
        </div>

          <div class="form-group">
            <label for="">Write Post in Markdown or HTML,CSS (Bootstrap Pre Installed) (Write Code in html Code Tags)</label>
            <textarea id="createArticle" value={this.state.post} onChange={e => this.setState({post:e.target.value})} class="form-control" id="" rows="10"></textarea>
          </div>

        <div>
          <div>Post Preview</div>
           <ReactMarkdown source={this.state.post} escapeHtml={false} />

        
           {this.state.error != ""? <div class="alert alert-warning" role="alert">
  {this.state.error}
</div> :null}

            {this.state.success == true? <div class="alert alert-success" role="alert">
          Successfully Created Article
        </div> :null}

              <button onClick={this.handleCreatePost.bind(this)} className="my-btn  btn-block   mt-4 ">PUBLISH ARTICLE</button>
     
        </div>

        </div>
      </div>
    )
  }
}

export default CreatePost;
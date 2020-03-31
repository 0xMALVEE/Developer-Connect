import React, {Component} from "react";
import {Base64} from "js-base64"
import axios from "axios";
const ReactMarkdown = require('react-markdown')

class HomePage extends Component{

  constructor(props){
    super(props);

    this.state = {
      data : null
    }
  }

  componentDidMount(){

    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    axios.get("/api/posts",config)
    .then(res => this.setState({data:res.data}))
    .catch(err => console.log(err))
  }

  render(){
    return(
      <div>
          <h1 className="text-center">Welcome To Developer Connect</h1>


          <div>
              {this.state.data != null? (
                <React.Fragment>
                  {this.state.data.map(post=> (
                    <div>
                      <h3>{post.post_title}</h3>
                      <p>{post.post_description}</p>
                      <ReactMarkdown source={Base64.decode(post.post)} escapeHtml={false} />
                    </div>
                  ))}
                </React.Fragment>
              ) :null}

          </div>

      </div>
    )
  }
}

export default HomePage;
import React, {Component} from "react";
import axios from "axios";
import {useParams} from  "react-router-dom";

export default function CompleteProfile(){
  const { username } = useParams();
  return(
    <div>
      <CompleteUserProfile username={username}/>
    </div>
  )
}

class CompleteUserProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      developer_type: "Font-End Developer",
      bio: '',
      location: "",
      gender: "Male",
      twitter_link: "",
      github_link: "",
      website_link:"",
      youtube_link: "",
      work: "",
      done:false
    }
  }

  componentDidMount(){
    
    axios.get(`/api/users/only?username=${this.props.username}`)
    .then(res => {
      const {developer_type,bio,location,gender,twitter_link,github_link,website_link,youtube_link,work} = res.data[0];

      this.setState({
        developer_type,bio,location,gender,twitter_link,github_link,website_link,youtube_link,work
      })
    })
    .catch(err => {
      if(err){
        this.setState({error: "Please Enter All Fields"})
      }
    })

  }

  handleCompleteProfile = () =>{
    console.log("Handle Profile ON")
    const config = {
      headers: {
        "x-auth-token":`${localStorage.getItem("token")}`
      }
    };

    axios.post("/api/users/complete", this.state ,config)
    .then(res => {
      this.setState({done: true});
      console.log(res.data);
      // this.setState({posts:res.data, success: true, error: "", loading:false});
    })
    .catch(err => {
      if(err){
        this.setState({error: "Please Enter All Fields"})
      }
    })
  }

  render(){

    return(
      <div className="pt-5 mt-5 complete-user-profile ">
        <div className="container text-white">
          <h1>Please Complete Your Profile</h1>

          <div class="form-group">
          <label>What Type Of Developer You Are?</label>

          <div class="form-group">
            <select value={this.state.developer_type} class="form-control" id="exampleFormControlSelect1" onChange={e=> this.setState({developer_type: e.target.value})}>
              <option value="Font-End Developer">Font-End Developer</option>
              <option value="Back-End Developer">Back-End Developer</option>
              <option value="DEV OPS Developer">DEV OPS Developer</option>
              <option value="Game Developer">Game Developer</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Unity Developer">Unity Developer</option>
              <option value="Software Developer">Software Developer</option>
              <option value="MERN Stack Developer">MERN Stack Developer</option>
              <option value="MEAN Stack Developer">MEAN Stack Developer</option>
            </select>
          </div>


          <div class="form-group">
            <label>Write A Short Bio</label>
            <input value={this.state.bio} id="createArticle" onChange={e => this.setState({bio:e.target.value})} type="text" class="form-control" placeholder="User Bio"/>
          </div>
          
          <div class="form-group">
            <label>Location</label>
            <input value={this.state.location} id="createArticle" onChange={e => this.setState({location:e.target.value})} type="text" class="form-control" placeholder="Your Location"/>
          </div>

          <div class="form-group">
            <label>Write About Your Current Work</label>
            <input value={this.state.work} id="createArticle" onChange={e => this.setState({work:e.target.value})} type="text" class="form-control" placeholder="Your Current Work"/>
          </div>

          <div class="form-group">
            <label>Gender</label>
            <select value={this.state.gender} class="form-control" id="exampleFormControlSelect1" onChange={e=> this.setState({gender: e.target.value})}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <h5>Social Links</h5>

          <div class="form-group">
            <label>Twitter Account Link</label>
            <input value={this.state.twitter_link} id="createArticle" onChange={e => this.setState({twitter_link:e.target.value})} type="text" class="form-control" placeholder="Twitter Link"/>
          </div>

          <div class="form-group">
            <label>Github Account Link</label>
            <input value={this.state.github_link} id="createArticle" onChange={e => this.setState({github_link:e.target.value})} type="text" class="form-control" placeholder="Github Link"/>
          </div>

          <div class="form-group">
            <label>YouTube Account Link</label>
            <input value={this.state.youtube_link} id="createArticle" onChange={e => this.setState({youtube_link:e.target.value})} type="text" class="form-control" placeholder="YouTube Link"/>
          </div>

          <div class="form-group pb-5">
            <label>Personal Website Link</label>
            <input value={this.state.website_link} id="createArticle" onChange={e => this.setState({website_link:e.target.value})} type="text" class="form-control" placeholder="Your Website Link"/>
          </div>

          <div className="pb-5">
            {this.state.done ? <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>WOW! </strong> Your Account Successfully Updated
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div> :null}

            <button onClick={this.handleCompleteProfile} className="my-btn btn-block">UPDATE PROFILE</button>
          </div>

        </div>

        </div>
        <div>

       

        </div>
      </div>
    )
  }
}




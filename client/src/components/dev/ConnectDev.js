import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from 'react-loader-spinner'

class ConnectDev extends Component{

  constructor(props){
    super(props);
    this.state = {
      users: null,
      skip: 0,
      count: 3,
      developer_type:"All Developer"
    }
  }
  
  componentDidMount(){
    axios.get(`/api/users/get_all_users?count=${this.state.count}&skip=${this.state.skip}&developer_type=${this.state.developer_type}`)
    .then(res => this.setState({users:[...res.data]}));
  }

  fetchUsers = () =>{

    this.setState({skip: this.state.skip + 3})

    axios.get(`/api/users/get_all_users?count=${this.state.count}&skip=${this.state.skip}&developer_type=${this.state.developer_type}`)
    .then(res => this.setState({users: [...this.state.users, ...res.data]}))
  }

  fetchDeveloperByType = ()=>{
    this.setState({skip: 0});
    axios.get(`/api/users/get_all_users?count=${this.state.count}&skip=${this.state.skip}&developer_type=${this.state.developer_type}`)
    .then(res => this.setState({users: [...res.data]}))
  }

  render(){
    return(
      <React.Fragment>
        <div className="container pt-5 mt-5 text-white">
          <h3>Connect With Other Developers</h3>

          <div className="row ml-0 mr-0 mt-5">
            <div className="col-md-3">
              <h4>Filter Search</h4>
              

              <div class="form-group">
                <select value={this.state.developer_type} class="form-control" id="exampleFormControlSelect1" onChange={e=>{ 
                  this.setState({developer_type: e.target.value});
                  }}>
                  <option value="All Developer">All Developer</option>
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

               <button className="btn btn-success" onClick={this.fetchDeveloperByType}>Filter</button>

               <p className="mt-4">Note: double click the button </p>

            </div>
            <div className="col-md-9">


            <InfiniteScroll hasMore={true} next={this.fetchUsers} loader={
                     <Loader className="text-center mt-5" type="Puff" color="#00BFFF"height={100}   width={100} timeout={30000} //3 secs
                    />
            } dataLength={this.state.users ? this.state.users.length : 0}>

            <div>
              {this.state.users ? this.state.users.map(user=>(
                <div className="connect_dev_user mt-2">
                  <div className="d-flex">
                    <img style={{borderRadius:"5px"}} src={user.github_profile_img} height="100" width="100" />
                    <div className="container">
                      <h4 style={{textTransform:"uppercase"}}>{user.name}</h4>
                      <p>{user.developer_type}</p>
                      <p>Location: {user.location}</p>
                    </div>
                    <div>
                        <Link to={`/user/${user.username}`} style={{padding:"10px",background:"#56daca",textDecoration:"none",color:"white"}}>CONNECT</Link>
                    </div>
                  </div>
                </div>
              )) : null}
              </div>

            </InfiniteScroll>


             
            </div>
          </div>
          
        </div>
      </React.Fragment>
    )
  }
}

export default ConnectDev;
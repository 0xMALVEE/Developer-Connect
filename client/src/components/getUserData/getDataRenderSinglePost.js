import React,{Component} from "react";
import { connect } from 'react-redux';


class ExportStuff extends Component{
  render(){
    return(
      <React.Fragment>
          
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(ExportStuff);

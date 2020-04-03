import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faAddressBook  } from '@fortawesome/free-solid-svg-icons'
import FA from "react-fontawesome";
import {Link} from "react-router-dom";

export default class KeyLinks extends Component{
  render(){
    return(
      <div className="key-links text-white">
         <h6>Key Links</h6>
         <div className="social-links pt-2">
          <a target="_blank" href="https://instagram.com/m_alvee_"> <i class="pl-0 fab fa-instagram fa-2x"></i> </a>
            <a target="_blank" href="https://facebook.com/veewebcode"> <i class="fab fa-facebook-square fa-2x"></i> </a>
            <a target="_blank" href="https://twitter.com/veewebcode"> <i class="fab fa-twitter-square fa-2x"></i> </a>
            <a target="_blank" href="https://youtube.com/veewebcode"> <i class="fab fa-youtube fa-2x"></i> </a>
            <a target="_blank" href="https://github.com/malveegithub"> <i class="fab fa-github fa-2x"></i> </a>
         </div>
         <div className="website-links pt-3">
          
            <li><Link to="/about">About</Link></li>
            <li><Link to="/about">Sponsors</Link></li>
            <li><Link to="/about">Privacy Policy</Link></li>
            <li> <Link to="/about">Contact</Link></li>
            <li><Link to="/about">FAQ</Link></li>
           
         </div>
      </div>
    )
  }
}
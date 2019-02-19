import React, {Fragment} from "react";
import {Modal} from "react-materialize";
import { NavLink } from "react-router-dom";



const User = () => {
 return (
   <Fragment>
     <Modal
       trigger={
         <button>
           <img src={require("../../images/user.png")} alt="userIcon" />
         </button>
       }
     >
       <NavLink to="/accountregister">Create Account</NavLink>
       <NavLink to="/accountlogin">Login</NavLink>
     </Modal>
   </Fragment>
 );
};

export default User;
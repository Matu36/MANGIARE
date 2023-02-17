import React from "react";
import "./userEdit.css";
import UserRichard from "../../../img/UserRichard.png";
import {MdPermIdentity, MdOutlineMailOutline, MdPhone} from "react-icons/md";
import {TbAddressBook} from "react-icons/tb";

export default function UserEdit() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
        <div className="userShowTop">
            <img src={UserRichard} alt="foto" className="userShowImg" />
            <div className="userShowTopTitle">
<span className="userShowUserName">Ricardo Lafranconi</span>
</div>
</div>
<div className="userShowButton">
<span className="userShowTitle"> Acount Details </span>
<div className="userShowInfo">
<MdPermIdentity className="userShowIcon"/>
<span className="userShowInfoTitle">RichardLan</span>
<div className="userShowInfo">
<MdOutlineMailOutline className="userShowIcon"/>
<span className="userShowInfoTitle">RichardLan@gmail.com</span>
</div>
<div className="userShowInfo">
<TbAddressBook className="userShowIcon"/>
<span className="userShowInfoTitle">12 n 322 </span>
</div>
<div className="userShowInfo">
<MdPhone className="userShowIcon"/>
<span className="userShowInfoTitle">2215704647</span>
</div>

</div>
</div>
        </div>
        <div className="userUpdate"></div>
        
      </div>
    </div>
  );
}

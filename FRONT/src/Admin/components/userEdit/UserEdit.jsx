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
        <div className="userUpdate">
<span className="userUpdateTitle">Edit </span>
<form className="updateUserForm">
<div className="userUpdateFormLeft">

</div>

<div className="userUpdateFormRight">
<div className="userUpdateItem">
<label> Username </label>
<input type="text" placeholder="RichardLan" className="userUpdateInput"/>

</div>
<div className="userUpdateItem">
<label> Email </label>
<input type="text" placeholder="RichardLan@gmail.com" className="userUpdateInput"/>

</div>
<div className="userUpdateItem">
<label> Addres </label>
<input type="text" placeholder="12 n 322" className="userUpdateInput"/>

</div>
<div className="userUpdateItem">
<label> Phone </label>
<input type="text" placeholder="2215704647" className="userUpdateInput"/>

</div>
</div>

</form>

        </div>
        
      </div>
    </div>
  );
}

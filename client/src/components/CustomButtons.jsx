import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const CustomButtons = (props) => {
  return (
    <div>
      {props.type == "delete" ? (
        <DeleteForeverIcon />
      ) : props.type == "addBox" ? (
        <AddBoxIcon />
      ) : props.type == "addCircle" ? (
        <AddCircleIcon />
      ) : props.type == "edit" ? (
        <EditIcon />
      ) : props.type == "login" ? (
        <AccountCircleIcon style={{ fontSize: "40px" }} />
      ) : props.type == "logout" ? (
        <LogoutIcon
          style={{ fontSize: "30px", color: "ffffff", textDecoration: "none" }}
        />
      ) : props.type == "home" ? (
        <HomeIcon />
      ) : props.type == "minus" ? (
        <IndeterminateCheckBoxIcon />
      ) : (
        <button>{props.word}</button>
      )}
    </div>
  );
};

export default CustomButtons;

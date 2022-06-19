import React, { useContext } from "react";
import "antd/dist/antd.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "./../Context";
import { PageHeader, Tag } from "antd";
import IconButton from "@mui/material/IconButton";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { firstName, lastName } = user;

  const logoutHandle = async () => {
    window.open("/api/logout", "_self");
  };
  return (
    <div>
      <IconButton
        onClick={logoutHandle}
        size="small"
        aria-label="quick"
        color="inherit"
      >
        <LogoutIcon />
      </IconButton>
      <PageHeader
        title="Etecube"
        className="site-page-header"
        tags={<Tag color="blue">{firstName + " " + lastName}</Tag>}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
      ></PageHeader>
    </div>
  );
};

export default Header;

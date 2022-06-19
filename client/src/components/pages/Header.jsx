import React, { useContext, useState, useEffect } from "react";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "./../Context";
import { PageHeader, Tag, Modal } from "antd";
import IconButton from "@mui/material/IconButton";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import SimpleSnackbar from "./Alert";
import Input from "@material-ui/core/Input";
import { createTeam, fetchTeams } from "./../../redux/actions/team";

const { CheckableTag } = Tag;

const Header = () => {
  const { user } = useContext(AuthContext);
  const { firstName, lastName } = user;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const { team } = useSelector((state) => state);
  const { teams } = team;
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [opens, setOpens] = useState(false);
  const handleClicks = (data) => {
    setOpens(true);
  };

  const handleCloses = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpens(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (description === "") {
      handleClicks();
      setMessage("Please fill in the blanks");
      return;
    }

    const value = { teamName: description };
    dispatch(createTeam(value));
    setDescription("");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

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
      <IconButton
        onClick={showModal}
        size="small"
        aria-label="quick"
        color="inherit"
      >
        <GroupAddIcon />
      </IconButton>
      <PageHeader
        title="Etecube"
        className="site-page-header"
        tags={<Tag color="blue">{firstName + " " + lastName}</Tag>}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
      ></PageHeader>

      <span
        style={{
          marginRight: 8,
        }}
      >
        Yours teams:
      </span>
      {teams.map((team) => (
        <CheckableTag
          key={team.id}
          onClick={() => console.log("claıstı teams etıketler")}
        >
          {team.teamName}
        </CheckableTag>
      ))}

      <Modal
        title="
        if you create a team you will be appointed as admin"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form style={{ display: "flex" }}>
          <Input
            placeholder="Team Name"
            inputProps={{
              "aria-label": "Description",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "90%" }}
          />
        </form>
      </Modal>
      <SimpleSnackbar
        opens={opens}
        handleCloses={handleCloses}
        message={message}
      />
    </div>
  );
};

export default Header;

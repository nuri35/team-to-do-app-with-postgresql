import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader, Tag, Modal } from "antd";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ListTodos from "./ListTodos";
import axios from "axios";
import {
  addUserToTeam,
  fetchAddedToUser,
  deleteUserFromTeam,
} from "./../../redux/actions/team";
import SimpleSnackbar from "./Alert";

const { CheckableTag } = Tag;
const Team = () => {
  const params = useParams();
  const { team } = useSelector((state) => state);
  const { users, addUserToTeamError, deleteUserError } = team;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dbUsers, setDbUsers] = useState([]);

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

  useEffect(() => {
    dispatch(fetchAddedToUser(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const getUsers = await axios.get("/api/users");

        setDbUsers([...getUsers.data]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addUserToTeamFn = (user) => {
    const data = {
      userId: user.id,
      teamId: params.id,
    };
    dispatch(addUserToTeam(data));
  };

  const deleteUserFromTeamFn = (user) => {
    const data = {
      userId: user.id,
      teamId: params.id,
    };
    dispatch(deleteUserFromTeam(data));
  };

  useEffect(() => {
    if (addUserToTeamError || deleteUserError) {
      handleClicks();
      setMessage("Opps Sorry wrong choice");
    }
  }, [addUserToTeamError, deleteUserError]);

  return (
    <div className="container">
      <IconButton
        onClick={showModal}
        size="small"
        aria-label="quick"
        color="inherit"
      >
        <PersonAddAltIcon />
      </IconButton>
      <PageHeader
        className="site-page-header"
        tags={<Tag color="blue">Team</Tag>}
        avatar={{
          src: "https://media-exp1.licdn.com/dms/image/C560BAQE-g31FdxhrHQ/company-logo_200_200/0/1601902210554?e=2147483647&v=beta&t=NJ81dByDUtl4pmv60oeItgLUtZx605YfgjhomhDbT_g",
        }}
      ></PageHeader>
      <span
        style={{
          marginRight: 8,
        }}
      >
        team User:
      </span>
      {users.map((user) => (
        <CheckableTag onClick={() => deleteUserFromTeamFn(user)}>
          <DeleteOutlineOutlinedIcon />
          {user.firstName}
        </CheckableTag>
      ))}

      <Modal
        title="Please add user"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {dbUsers.map((user) => (
          <CheckableTag key={user.id} onClick={() => addUserToTeamFn(user)}>
            <AddOutlinedIcon />
            {user.firstName}
          </CheckableTag>
        ))}
      </Modal>
      <SimpleSnackbar
        opens={opens}
        handleCloses={handleCloses}
        message={message}
      />
      <ListTodos teamId={params.id} />
    </div>
  );
};

export default Team;

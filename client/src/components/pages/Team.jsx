import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader, Tag, Modal } from "antd";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import axios from "axios";
const { CheckableTag } = Tag;
const Team = () => {
  //   const params = useParams();
  const { currentTeam } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dbUsers, setDbUsers] = useState([]);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     // dispatch(fetchSinglePost(params.id));
  //   }, [dispatch, params.id]);

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
        title="Etecube"
        className="site-page-header"
        tags={<Tag color="blue">Developer Team</Tag>}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8156664?s=460&v=4",
        }}
      ></PageHeader>
      <span
        style={{
          marginRight: 8,
        }}
      >
        Developer's team User:
      </span>
      <CheckableTag>
        <DeleteOutlineOutlinedIcon />
        Şermin
      </CheckableTag>
      <CheckableTag>
        <DeleteOutlineOutlinedIcon />
        hasan
      </CheckableTag>
      <CheckableTag>
        <DeleteOutlineOutlinedIcon />
        deniz
      </CheckableTag>

      <Modal
        title="Please add user"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {dbUsers.map((user) => (
          <CheckableTag key={user.id}>
            <AddOutlinedIcon />
            {user.firstName}
          </CheckableTag>
        ))}
      </Modal>
    </div>
  );
};

export default Team;

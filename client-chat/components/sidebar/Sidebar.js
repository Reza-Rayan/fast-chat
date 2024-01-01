<<<<<<< HEAD
import { useState, useContext, useEffect } from "react";
// MUI Components
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import {
  Menu,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";

// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { AppContext } from "@/context/appContext";
import { selectUser } from "@/redux/features/auth-slice";

const settings = ["Profile", "Account", "Chat", "Logout"];

=======
import { useState } from "react";
// MUI Components
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Menu, MenuItem, Typography, Avatar, IconButton } from "@mui/material";

const settings = ["Profile", "Account", "Chat", "Logout"];

const rooms = [
  { id: 1, title: "Nitrogen Co" },
  { id: 2, title: "Private Group" },
];
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
const friends = [
  { id: 1, name: "Maziar" },
  { id: 2, name: "Mohammad" },
];

const Sidebar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

<<<<<<< HEAD
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("USER", user);
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

=======
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
<<<<<<< HEAD

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notifications
    dispatch(resetNotifications(room));
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }

  if (!user) {
    return (
      <div className="text-center flex items-center h-full justify-center font-bold text-2xl text-slate-300">
        Not any user
      </div>
    );
  }

=======
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
  return (
    <aside className="relative h-full">
      <section>
        <div>
          <h2 className="px-4 py-2 font-bold text-slate-600">Groups</h2>
          <ul>
<<<<<<< HEAD
            {rooms.map((room, index) => (
              <li
                key={index}
                className="px-4 py-3 border-b flex gap-3 items-center transition-all hover:bg-slate-500 hover:text-white cursor-pointer hover:rounded-xl hover:scale-105 overflow-hidden"
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Avatar" className="w-6 h-6" />
                </IconButton>
                <div>
                  <span className=" font-semibold text-sm">
                    {room}{" "}
                    {currentRoom !== room && (
                      <Badge className="rounded-full p-2" color="primary">
                        {user.newMessages[room]}
                      </Badge>
                    )}
                  </span>
                </div>
              </li>
            ))}
            {/* {!rooms ? "" : <div>There is no group</div>} */}
=======
            {rooms.map((room) => {
              return (
                <div className="bg-slate-50">
                  <li
                    key={room.id}
                    className="px-4 py-3 border-b flex gap-3 items-center transition-all hover:bg-slate-500 hover:text-white"
                  >
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt="Avatar" className="w-6 h-6" />
                    </IconButton>
                    <span className=" font-semibold text-sm">{room.title}</span>
                  </li>
                </div>
              );
            })}
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
          </ul>
        </div>

        <div>
          <h2 className="px-4 py-2 font-bold text-slate-600">
            Talk to Friends
          </h2>
          <ul>
<<<<<<< HEAD
            {members.map((friend) => {
=======
            {friends.map((friend) => {
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
              return (
                <div className="bg-slate-50">
                  <li
                    key={friend.id}
<<<<<<< HEAD
                    className="px-4 py-3 border-b flex gap-3 items-center transition-all hover:bg-slate-500 hover:text-white cursor-pointer hover:rounded-xl"
=======
                    className="px-4 py-3 border-b flex gap-3 items-center transition-all hover:bg-slate-500 hover:text-white"
>>>>>>> 3916f12a602b6e148e7127626ca4ac4b9a4c5633
                  >
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt="Avatar" className="w-6 h-6" />
                    </IconButton>
                    <span className=" font-semibold text-sm">
                      {friend.name}
                    </span>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Navbar of Sidebar */}
      <div className="bg-slate-600 flex justify-between py-2 px-4 absolute w-full bottom-0">
        <div>
          <SearchIcon className="text-white" />
        </div>
        <div>
          <MoreVertIcon
            className="text-white cursor-pointer"
            onClick={handleOpenUserMenu}
          />
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

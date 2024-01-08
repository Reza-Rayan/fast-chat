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
import { AppContext } from "../../context/appContext";
import {
  selectUser,
  resetNotifications,
  addNotifications,
} from "../../redux/features/auth-slice";

const settings = ["Profile", "Account", "Chat", "Logout"];

const Sidebar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
      <div className="text-center flex items-center h-full justify-center font-bold text-2xl text-slate-300 bg-slate-800">
        Not any user
      </div>
    );
  }

  return (
    <aside className="relative h-full bg-white">
      <section>
        <div>
          <h2 className="px-4 py-2 font-bold text-white bg-slate-900">
            Groups
          </h2>
          <ul>
            {rooms.map((room, index) => (
              <li
                key={index}
                className="px-4 py-3 border-b flex gap-3 text-slate-600 items-center transition-all hover:bg-slate-500 hover:text-white cursor-pointer hover:rounded-xl hover:scale-105 overflow-hidden"
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Avatar" className="w-6 h-6" />
                </IconButton>
                <div>
                  <span className=" font-semibold text-sm ">
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
          </ul>
        </div>

        <div>
          <h2 className="px-4 py-2 font-bold  bg-gray-900 text-white">
            Talk to Friends
          </h2>
          <ul>
            {members.map((friend) => {
              return (
                <div className="bg-slate-50">
                  <li
                    key={friend.id}
                    className="px-4 py-3 border-b flex gap-3 items-center transition-all
                     hover:bg-slate-500 hover:text-white cursor-pointer
                     text-slate-600"
                    active={privateMemberMsg?._id == friend?._id}
                    onClick={() => handlePrivateMemberMsg(friend)}
                    disabled={friend._id === user._id}
                  >
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt="Avatar" className="w-6 h-6" />
                    </IconButton>
                    <span className=" font-semibold text-sm">
                      {friend.username}
                    </span>
                  </li>
                </div>
              );
            })}
            {!members ? <div>You Have no friends</div> : null}
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
            className=" cursor-pointer"
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

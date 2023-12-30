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
const friends = [
  { id: 1, name: "Maziar" },
  { id: 2, name: "Mohammad" },
];

const Sidebar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <aside className="relative h-full">
      <section>
        <div>
          <h2 className="px-4 py-2 font-bold text-slate-600">Groups</h2>
          <ul>
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
          </ul>
        </div>

        <div>
          <h2 className="px-4 py-2 font-bold text-slate-600">
            Talk to Friends
          </h2>
          <ul>
            {friends.map((friend) => {
              return (
                <div className="bg-slate-50">
                  <li
                    key={friend.id}
                    className="px-4 py-3 border-b flex gap-3 items-center transition-all hover:bg-slate-500 hover:text-white"
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

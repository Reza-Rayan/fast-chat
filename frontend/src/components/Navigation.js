import * as React from 'react';
import {Button,Menu ,MenuItem } from "@mui/material"
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import logo from "../assets/logo.png";
function Navigation() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();


    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        window.location.replace("/");
    }
    return (
        <header className="bg-slate-100 shadow-lg">
           <div className="container mx-auto flex justify-between items-center">
                <div>
                   <Link to={'/'}>
                    <img src={logo} width={80} />
                   </Link>

                </div>
                <div className="flex gap-6">
                    <Button variant="outlined" compoent={Link} to="/">
                      <Link to={"/chat"}>
                      Go to Chat
                      </Link>
                    </Button>

                    {!user && (
                           <Button>
                              <Link to="/login" className="no-underline">
                                Login
                            </Link>
                           </Button>
                    )}
                    {user && (
                     <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img src={user?.picture} width={40} height={40} className='rounded-full' />
                            <span className='ml-1 text-slate-500'>
                                {user.name}
                            </span>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}
                </div>
           </div>
        </header>
    );
}

export default Navigation;


{/* <nav className="mx-auto">
{!user && (

        <Link to="/login">
        Login
    </Link>

)}
<Link to="/chat">
    Chat
</Link>

{user && (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
)}
</nav> */}

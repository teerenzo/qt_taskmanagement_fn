import { Outlet, Link } from "react-router-dom";

function navbar() {
  const Role = localStorage.getItem("role");
  const Token = localStorage.getItem("token");
  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };
  return (
    <>
      <nav>
        <div className="logo text-[#015AAB]"> <a href="/"> Call Us at : (250) 780640237</a></div>
      
        <ul>
          {Token&& (
            <>
              <li>
                <a href="#">
                  <Link to="/dashboard">Dashboard</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/tasks">Tasks</Link>
                </a>
              </li>
             
              <li>
                <a href="#">
                  <Link to="/profile">Profile</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/change-password">Change password</Link>
                </a>
              </li>
            </>
          )}
        
       
          {Token ? (
            <li>
              <a href="#" class="active" onClick={handlelogout}>
                logout
              </a>
            </li>
          ) :  (<a className="text-[#015AAB]" href="/login">Login</a>)}
        </ul>
       
      </nav>
      <Outlet />
    </>
  );
}

export default navbar;

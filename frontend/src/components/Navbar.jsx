// import { Link } from "react-router-dom";

// import { logoutUser } from "../services/authService";

// import { useAuth } from "../context/AuthContext";

// function Navbar() {
//   //const token = localStorage.getItem("token");
//   const { token, logout } = useAuth();
//   return (
//     <nav className="navbar">
//       <Link to="/" className="logo">
//         NETFLIX
//       </Link>

//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <span>Movies</span>

//         {token && <Link to="/my-list">My List</Link>}
//       </div>

//       <div className="nav-right">
//         <Link to="/search">🔍</Link>

//         {/* {token ? (
//           <button>Logout</button>
//         ) : (
//           <Link to="/login">Sign In</Link>
//         )} */}
//          {token ? (
//            <button
//             onClick={() => {
//               logout();
//               window.location.href = "/";
//             }}
//           >
//             Logout
//           </button>
//           ) : (
//             <Link to="/login">Sign In</Link>
//           )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logomain">
        CINEFLIX
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        

        {token && <Link to="/my-list">My List</Link>}
      </div>

      <div className="nav-right">
        <Link to="/search" aria-label="Search movies">
          <i class="bi bi-search"></i>
        </Link>

        {/* {token ? (
          <>
            <span className="nav-username">My Account</span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Sign In</Link>
        )} */}
        {token ? (
          <>
            <Link to="/profile">My Profile</Link>

            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
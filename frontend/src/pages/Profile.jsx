import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(
          err.response?.data?.message ||
          "Unable to load your profile. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="profile-page">
        <h1>My Profile</h1>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <h1>My Profile</h1>
        <p className="error-message" role="alert">{error}</p>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <h1>My Profile</h1>
        <p>We couldn't find your account details.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <h1>My Profile</h1>

        <div className="profile-details">
          <div>
            <span>Full Name</span>
            <p>{user.name}</p>
          </div>

          <div>
            <span>Email Address</span>
            <p>{user.email}</p>
          </div>
        </div>

        <Link to="/" className="browse-movies-button">
          Browse Movies
        </Link>
      </div>
    </div>
  );
}

export default Profile;
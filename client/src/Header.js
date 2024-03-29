import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [username, setUsername] = useState(null);
    useEffect(() => {
      fetch("http://localhost:7000/profile", {
        credentials: 'include',
      }).then(response => {
        response.json().then(userInfo => {
            setUsername(userInfo.username);
        });
      });
    }, []);

    function logout(){
      
    } 

    return(
      <header>
        <Link to="/" className="logo">Khobor</Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create New Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    );
}
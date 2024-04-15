
import React from 'react'

const Header = () => {
    return (
        <div className="--pad header">
          <div className="--flex-between">
            <h3>
              <span className="--fw-thin">Welcome, </span>
              <span className="--color-danger">rim</span>
            </h3>
            <button onClick={logout} className="--btn --btn-danger">
              Logout
            </button>
          </div>
          <hr />
        </div>
      );
    };
    
    export default Header;
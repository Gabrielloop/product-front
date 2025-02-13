import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';



const FooterBar: React.FC = () => {
      const navigate = useNavigate();
    return (
        <footer>
                <p>© 2023 Your Company. All rights reserved.</p>
                <span onClick={() => navigate("/admin")}
                    style={{
                        cursor: "pointer",
                        color: "blue",
                        textDecoration: "underline",
                        margin: "10px",
                    }}>[admin]
                    </span>
                
        </footer>
    );
};

export default FooterBar;
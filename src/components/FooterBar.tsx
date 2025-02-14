import React, { use } from "react";
import { useNavigate } from "react-router-dom";

const FooterBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <p>© 2023 Your Company. All rights reserved.</p>
    </footer>
  );
};

export default FooterBar;

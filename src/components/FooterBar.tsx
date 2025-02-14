import React, { use } from "react";
import { useNavigate } from "react-router-dom";

const FooterBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <p>Projet back + front du 11/02 au 14/02</p>
    </footer>
  );
};

export default FooterBar;

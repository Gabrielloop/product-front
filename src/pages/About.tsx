import React from "react";
import { Helmet } from "react-helmet-async";

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pokémart : Accueil</title>
      </Helmet>
      <div>
        <h2>About Page</h2>
        <p>This is the about page of our application.</p>
      </div>
    </>
  );
};

export default About;

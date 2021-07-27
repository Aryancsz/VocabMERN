import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        background: "white",
        position: "fixed",
        bottom: "0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <img
          style={{ margin: "10px 0 10px 0" }}
          src='https://developer.oxforddictionaries.com/images/logo.png'
          alt='logo'
        />
      </div>
    </div>
  );
};

export default Footer;

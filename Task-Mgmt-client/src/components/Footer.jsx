import React from "react";

const Footer = () => {
  return (
  <footer
  className="text-center text-white py-3"
  style={{
    background: "#0f172a",
    position: "fixed",
    bottom: 0,
    left: "240px",
    width: "calc(100% - 240px)",
    zIndex: 1000,
  }}
>
  <p className="mb-1">
    Organize your tasks and stay productive.. 🚀
  </p>

  <small>
    © 2026 TaskMgmtApp. All rights reserved.
  </small>
</footer>
  );
};

export default Footer;
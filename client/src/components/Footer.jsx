import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-4 my-5 border-top">
        <div className="d-flex align-items-center justify-content-between w-100">
          <span className="text-body-secondary">© 2025 Company, Inc</span>
          <ul className="nav mb-0">
            <li className="ms-3">
              <a className="text-body-secondary" href="#">
                <InstagramIcon />
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="#">
                <FacebookIcon />
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="#">
                <LinkedInIcon />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container">
            <NavLink class="navbar-brand fw-bolder mx-2 px-2" to="/blogimg">
              BLOGFORM
            </NavLink>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <NavLink
                    class="nav-link mx-2 px-2"
                    aria-current="page"
                    to="/blogimg"
                  >
                    Home
                  </NavLink>
                </li>
        
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header
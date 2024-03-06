import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { MdLeaderboard } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";

function Sidebar() {

    return (
        <div>
            <nav className="sidebar">
                <ul>
                    <li>
                    <Link to="/rankings" className="sidebar-item"><MdLeaderboard />Rankings</Link>
                    </li>
                    <li>
                    <Link to="/graph" className="sidebar-item"><BsGraphUp />Graph</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
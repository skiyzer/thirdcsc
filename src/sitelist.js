import React from "react";
import SiteDetails from "./siteData.js";
import {
   BrowserRouter,
   Route,
   Routes,
   Link
} from "react-router-dom";
import './App.js';


function SiteList(props) {
    console.log(props)
    
   return (
    
      <ol>
            
            <li>
                        <Link to= {"/site/"+ props.Sites[1].SiteID}>
                           {props.Sites[0].Site}
                        </Link>
            </li>
      </ol>
   );
}


function App() {
   return <SiteList />;
}

export default SiteList;
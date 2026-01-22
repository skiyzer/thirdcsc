import React from "react";
import './App.js';
import {
   Link,
   useParams
} from "react-router-dom";

function SiteDetails(props)
{
    const { SiteID } = useParams();


    const sites = SiteDetails.find(s => s.SiteID == SiteID)
        return (
            <>
                <picture>
                     <source media="(min-width:465px)" srcset={sites.image}></source>
                     <img src = {sites.Image} alt = "Picture of the site"/>
                </picture>
                <h2>{sites.Site} </h2>
                <p>{sites.Description}</p>
            </>
        );
    
}
export default SiteDetails;
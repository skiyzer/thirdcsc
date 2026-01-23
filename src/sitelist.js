import React from "react";
import { Link } from "react-router-dom";


function SiteList(props) {
    console.log(props)
    const sites = Array.isArray(props.Sites) ? props.Sites : [];

   return (
    
      <ol>
            {sites
               .filter(site => site && site.SiteID != null && site.Site)
               .map(site => {
                  const imageSrc = site.Image
                     ? `${process.env.PUBLIC_URL}/${site.Image}`
                     : "";

                  return (
                     <li key={site.SiteID}>
                           {imageSrc && (
                              <div>
                                 <img
                                    src={imageSrc}
                                    alt={site.Site}
                                    width={240}
                                    height={160}
                                 />
                              </div>
                           )}
                           <div>
                              <Link to={`/site/${site.SiteID}`}>
                                 {site.Site}
                              </Link>
                           </div>
                     </li>
                  );
               })}
      </ol>
   );
}


function App() {
   return <SiteList />;
}

export default SiteList;

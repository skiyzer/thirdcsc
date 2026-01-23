import React from "react";
import { Link } from "react-router-dom";


function SiteList(props) {
    console.log(props)
    const sites = Array.isArray(props.Sites) ? props.Sites : [];

   return (
      <section className="page page--list">
         <div className="page-inner">
            <h2 className="page-title">Site Directory</h2>
            <ol className="site-grid">
               {sites
                  .filter(site => site && site.SiteID != null && site.Site)
                  .map(site => {
                     const imageSrc = site.Image
                        ? `${process.env.PUBLIC_URL}/${site.Image}`
                        : "";

                     return (
                        <li key={site.SiteID} className="site-card">
                           {imageSrc && (
                              <div className="site-image">
                                 <img
                                    src={imageSrc}
                                    alt={site.Site}
                                    width={240}
                                    height={160}
                                 />
                              </div>
                           )}
                           <div>
                              <Link className="site-link" to={`/site/${site.SiteID}`}>
                                 {site.Site}
                              </Link>
                           </div>
                        </li>
                     );
                  })}
            </ol>
         </div>
      </section>
   );
}


function App() {
   return <SiteList />;
}

export default SiteList;

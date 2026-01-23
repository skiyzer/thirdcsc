import React from "react";
import { useParams } from "react-router-dom";

function SiteDetails(props) {
   const { SiteID } = useParams();
   const sites = Array.isArray(props.Sites) ? props.Sites : [];
   const site = sites.find(s => String(s.SiteID) === String(SiteID));
   const hasSites = sites.some(s => s && s.SiteID != null);

   if (!hasSites) {
      return (
         <section className="page page--detail">
            <div className="page-inner">
               <p className="detail-status">Loading site details...</p>
            </div>
         </section>
      );
   }

   if (!site) {
      return (
         <section className="page page--detail">
            <div className="page-inner">
               <p className="detail-status">Site not found.</p>
            </div>
         </section>
      );
   }

   const imageSrc = site.Image
      ? `${process.env.PUBLIC_URL}/${site.Image}`
      : "";

   return (
      <section className="page page--detail">
         <div className="page-inner">
            <div className="detail-layout">
               {imageSrc && (
                  <img
                     className="detail-image"
                     src={imageSrc}
                     alt={site.Site}
                     width={640}
                     height={426}
                  />
               )}
               <div>
                  <h2 className="page-title">{site.Site}</h2>
                  <p className="detail-description">{site.Description}</p>
                  <div className="detail-meta">
                     <span>Latitude: {site.Latitude}</span>
                     <span>Longitude: {site.Longitude}</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
export default SiteDetails;

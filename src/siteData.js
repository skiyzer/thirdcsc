import React from "react";
import { useParams } from "react-router-dom";

function SiteDetails(props) {
   const { SiteID } = useParams();
   const sites = Array.isArray(props.Sites) ? props.Sites : [];
   const site = sites.find(s => String(s.SiteID) === String(SiteID));
   const hasSites = sites.some(s => s && s.SiteID != null);

   if (!hasSites) {
      return <p>Loading site details...</p>;
   }

   if (!site) {
      return <p>Site not found.</p>;
   }

   const imageSrc = site.Image
      ? `${process.env.PUBLIC_URL}/${site.Image}`
      : "";

   return (
      <>
         {imageSrc && (
            <img
               src={imageSrc}
               alt={site.Site}
               width={640}
               height={426}
            />
         )}
         <h2>{site.Site}</h2>
         <p>{site.Description}</p>
         <p>Latitude: {site.Latitude}</p>
         <p>Longitude: {site.Longitude}</p>
      </>
   );
}
export default SiteDetails;

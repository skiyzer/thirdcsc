import { Link } from "react-router-dom";

function SiteList({ sites }) {
  const list = Array.isArray(sites) ? sites : [];

  return (
    <section className="page page--list">
      <div className="page-inner">
        <h2 className="page-title">Site Directory</h2>
        <ol className="site-grid">
          {list.map(site => {
            if (!site || site.SiteID == null || !site.Site) {
              return null;
            }

            const imageSrc = site.Image ? `${process.env.PUBLIC_URL}/${site.Image}` : "";

            return (
              <li key={site.SiteID} className="site-card">
                {imageSrc ? (
                  <div className="site-image">
                    <img src={imageSrc} alt={site.Site} width={240} height={160} />
                  </div>
                ) : null}
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

export default SiteList;

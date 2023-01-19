import "./OrganizationTitle.css";
import logo from "../../../assets/img/logo_2.png";

export function OrganizationTitle() {
  return (
    <div className="organisation-title">
      <div>
        <img alt="logo" src={logo} className="organisation-title_logo" />
      </div>
      <div className="organisation-title_text">
        <div>SS. PETER &amp; PAUL, SHOMOLU </div>
        <div>CATH. YOUTH ORG. OF NIG.</div>
      </div>
    </div>
  );
}

export function JustLogo() {
  return (
    <div>
      <img alt="logo" src={logo} className="just-logo" />
    </div>
  );
}

export function OrganizationTitleSecond() {
  return (
    <div className="organisation-title_2">
      <div>
        <img alt="logo" src={logo} className="organisation-title_logo_2" />
      </div>
      <div className="organisation-title_text_2">
        <div>SS. PETER &amp; PAUL, SHOMOLU </div>
        <div>CATH. YOUTH ORG. OF NIG.</div>
      </div>
    </div>
  );
}

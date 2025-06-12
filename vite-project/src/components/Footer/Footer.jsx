import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer__text">
      <p className="footer__name">Developed by Halil Aybar</p>
      <p className="footer__year">{new Date().getFullYear()}</p>
    </div>
  );
}

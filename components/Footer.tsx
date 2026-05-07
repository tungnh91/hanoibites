export function Footer() {
  return (
    <footer className="footer" aria-label="Restaurant information">
      <div className="footer-grid">
        <section className="footer-block">
          <h4>Location</h4>
          <address>K5 – 50 Brant St<br />Toronto, ON M5V 3G9</address>
        </section>
        <section className="footer-block">
          <h4>Hours</h4>
          <dl className="hours-list">
            <dt>Sun – Mon</dt><dd>11:00 AM – 8:45 PM</dd>
            <dt>Tue – Sat</dt><dd>11:00 AM – 9:00 PM</dd>
          </dl>
        </section>
        <section className="footer-block">
          <h4>Contact</h4>
          <p>hanoibites@gmail.com<br />(416) 892-8563</p>
        </section>
      </div>
    </footer>
  )
}

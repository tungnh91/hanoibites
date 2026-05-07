import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu — Banh Mi, Bun Cha & Vermicelli Bowls | Hanoi Bites Toronto',
  description: 'Menu for Hanoi Bites in Toronto: Banh Mi, Vermicelli Bowls, Vietnamese Iced Coffee.',
}

export default function MenuPage() {
  return (
    <main className="menu-page">
      <h1 className="menu-title">Our menu.</h1>
      <div className="menu-container">

        <section className="menu-section">
          <header className="menu-section-header">
            <p className="menu-section-label">Banh Mi</p>
            <p className="menu-section-desc">Served on a toasted baguette with house-made pickled carrot, cucumber, cilantro, and traditional pâté</p>
          </header>
          <ul className="menu-items">
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">Pork Sizzlers</span>
                <span className="menu-item-price">$13.95</span>
              </div>
              <p className="menu-item-desc">Signature flame-seared Bún Chả pork patties and savory sliced pork</p>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">Chicken Sizzlers</span>
                <span className="menu-item-price">$13.95</span>
              </div>
              <p className="menu-item-desc">Signature grilled chicken thigh</p>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">Sizzlers Duo</span>
                <span className="menu-item-price">$13.95</span>
              </div>
              <p className="menu-item-desc">A combination of our signature grilled chicken thigh and flame-seared Bún Chả pork</p>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">Eggs</span>
                <span className="menu-item-price">$13.95</span>
              </div>
              <p className="menu-item-desc">A fluffy 3-egg omelette made with fresh Ontario eggs</p>
            </li>
          </ul>
        </section>

        <section className="menu-section">
          <header className="menu-section-header">
            <p className="menu-section-label">Vermicelli Bowl</p>
            <p className="menu-section-desc">Fresh boiled Vietnamese rice noodles with house-made pickled carrots, cucumbers, cilantro, and nuoc cham sauce</p>
          </header>
          <ul className="menu-items">
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">Grilled Chicken</span>
                <span className="menu-item-price">$18.95</span>
              </div>
              <p className="menu-item-desc">Tender, flame-grilled chicken thigh</p>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">Grilled Pork</span>
                <span className="menu-item-price">$18.95</span>
              </div>
              <p className="menu-item-desc">Signature flame-seared Bún Chả</p>
            </li>
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">Grilled Duo</span>
                <span className="menu-item-price">$18.95</span>
              </div>
              <p className="menu-item-desc">Tender flame-grilled chicken thigh and signature flame-seared Bún Chả pork</p>
            </li>
          </ul>
        </section>

        <section className="menu-section">
          <header className="menu-section-header">
            <p className="menu-section-label">Drinks</p>
          </header>
          <ul className="menu-items">
            <li className="menu-item">
              <div className="menu-item-row">
                <span className="menu-item-name">Vietnamese Iced Coffee</span>
                <span className="menu-item-price">$5.50</span>
              </div>
              <p className="menu-item-desc">Trung Nguyen Premium Blend Coffee</p>
            </li>
          </ul>
        </section>

      </div>
    </main>
  )
}

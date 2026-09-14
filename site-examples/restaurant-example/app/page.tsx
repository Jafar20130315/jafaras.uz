'use client'

import { useEffect, useRef, useState } from 'react'

const dishes = [
  { name: 'Plov Lider', price: '45 000 so\'m', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Qozon Kabob', price: '65 000 so\'m', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Samarqand Lag\'mon', price: '38 000 so\'m', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Manti', price: '32 000 so\'m', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Norin', price: '40 000 so\'m', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Shashlik', price: '42 000 so\'m', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Achichuk', price: '22 000 so\'m', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Choy va Non', price: '18 000 so\'m', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=85' },
]

const gallery = [
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85',
]

export default function Page() {
  const [scrolled, setScrolled] = useState(false)
  const dishScrollerRef = useRef<HTMLDivElement>(null)
  const rightDragRef = useRef({ active: false, startX: 0, startScrollLeft: 0 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      <header className={`topbar ${scrolled ? 'topbar-visible' : ''}`}>
        <a href="#top" className="brand">Lider<span>.</span></a>
        <a href="tel:+998712000000" className="call-button">Bog&apos;lanish <span aria-hidden="true">↗</span></a>
      </header>

      <section id="top" className="menu-section section-shell">
        <div className="menu-heading">
          <h2>Bugungi menyu</h2>
          <span>Surish uchun siljiting <b aria-hidden="true">→</b></span>
        </div>
        <div
          ref={dishScrollerRef}
          className="dish-scroller"
          aria-label="Taomlar menyusi"
          onContextMenu={(event) => event.preventDefault()}
          onPointerDown={(event) => {
            if ((event.button !== 0 && event.button !== 2) || !dishScrollerRef.current) return
            event.preventDefault()
            rightDragRef.current = {
              active: true,
              startX: event.clientX,
              startScrollLeft: dishScrollerRef.current.scrollLeft,
            }
            dishScrollerRef.current.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            const scroller = dishScrollerRef.current
            const drag = rightDragRef.current
            if (!scroller || !drag.active) return
            event.preventDefault()
            scroller.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX)
          }}
          onPointerUp={(event) => {
            if (rightDragRef.current.active && dishScrollerRef.current?.hasPointerCapture(event.pointerId)) {
              dishScrollerRef.current.releasePointerCapture(event.pointerId)
            }
            rightDragRef.current.active = false
          }}
          onPointerCancel={(event) => {
            if (dishScrollerRef.current?.hasPointerCapture(event.pointerId)) {
              dishScrollerRef.current.releasePointerCapture(event.pointerId)
            }
            rightDragRef.current.active = false
          }}
        >
          {dishes.map((dish, index) => (
            <article className="dish-card" key={dish.name}>
              <div className="dish-image-wrap">
                <img src={dish.image} alt={dish.name} draggable={false} />
                <span className="dish-count">{index + 1} / {dishes.length}</span>
              </div>
              <div className="dish-meta"><h3>{dish.name}</h3><strong>{dish.price}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section section-shell" aria-labelledby="gallery-title">
        <div className="section-label"><span>01</span><h2 id="gallery-title">Bizning makon</h2><span className="label-line" /></div>
        <div className="gallery-grid">{gallery.map((image, index) => <img key={image} className={`gallery-image gallery-${index + 1}`} src={image} alt={`Lider restorani interyeri ${index + 1}`} draggable={false} />)}</div>
      </section>

      <section className="about-section section-shell" aria-labelledby="about-title">
        <div className="section-label"><span>02</span><h2 id="about-title">Lider haqida</h2><span className="label-line" /></div>
        <div className="about-content"><p className="about-lead">Lider — bu shunchaki restoran emas. Bu oilaviy dasturxonning issiqligi, tandirdan chiqqan nonning hidi va unutilmas suhbatlar uchun yaratilgan makon.</p><p className="about-detail">Biz har bir taomga o&apos;zbek oshxonasining boy tarixini va bugungi kunning nozik didini singdiramiz. Har tashrifingizda o&apos;zingizni uydagidek his qilishingiz — bizning eng katta yutug&apos;imiz.</p></div>
      </section>

      <section className="contact-section section-shell" aria-labelledby="contact-title">
        <div className="contact-card"><div><p className="eyebrow">03 · Tashrif buyuring</p><h2 id="contact-title">Sizni kutamiz.</h2><p className="contact-copy">Har kuni 10:00 — 23:00<br />Toshkent shahri, Amir Temur ko&apos;chasi 108</p></div><a className="phone-link" href="tel:+998712000000"><span>+998 71 200 00 00</span><b aria-hidden="true">↗</b></a></div>
      </section>

      <footer className="footer section-shell"><a href="#top" className="brand">Lider<span>.</span></a><p>2026 — Lider</p><a href="#top" className="back-top">Yuqoriga ↑</a></footer>
    </main>
  )
}

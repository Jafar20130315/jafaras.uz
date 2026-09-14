'use client'

import { useEffect, useRef, useState } from 'react'

const dishes = [
  { name: 'Osh', price: '45 000 so\'m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOQ24zs5fKHWIW52L3L7DyV46WC4L2QBu7VJHfXA384g&s=10' },
  { name: 'Qozon Kabob', price: '65 000 so\'m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2jZrGb49K93r7VoI7U0KRRSkt0BTrjXvhpqVkbYWZ4Q&s=10' },
  { name: 'Sho\'rva', price: '38 000 so\'m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCuINZDM2xYvzXYowRP1HfhEdqFDaF7gJGawkjULdx4Q&s=10' },
  { name: 'Manti', price: '32 000 so\'m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFCAtIr5WoFs45GHtbPEtiTHlMxyw_XLvblmfIEd078A&s=10' },
  { name: 'Norin', price: '40 000 so\'m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLVlEGmRDMzZ0P6uQZ1aKhvuuMou8CRP_dYEVfhMUfDQ&s=10' },
  { name: 'Shashlik', price: '42 000 so\'m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlvWgbheyVhkAM_rVkUYSmmIfNpocoLJo0Rgo3nWDlnA&s=10' },
  { name: 'Somsa', price: '22 000 so\'m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT724rbBYKR8-qa3wU4cqf3MJRYmLIshGIjIHYgbD_6fQ&s=10' },
  { name: 'Choy va Non', price: '18 000 so\'m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1lbbaD7z2d4NgktuJ34BRCkfwSlh0ZuLu-DslHrFpnQ&s=10' },
]

const gallery = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEJNq1NdYeb7PUUvvFaKBSheotntb5I2U_H_o7MOzyg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ipZE5FmPdw4oHYRbXscD5WBzLdJRcbghJpIgn8TlGg&s=10',
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmvYJ5A5xAv8eGzd26LAmqs3Z5M6ai8LeZv1BKYM2HjFsE4FY8nLbtryEcRp2uF6ZGAkN1hL2At99HpDC_8zl65Wl5xWm0UQ7nk1pQc-8e5oOqQgcnrOCmlruEZtsOXsMfelptF=w408-h306-k-no',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkQO835mCRxHuhbkJv4cFBLMpMXsX1sHunl_hMApZ1Wg&s=10',
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
        <a href="#top" className="brand">Lider</a>
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
        <div className="about-content"><p className="about-lead">Navoiy shahridagi eng ajoyib restoran. Arzon narxlar va juda ham mazali ovqatlar.</p><p className="about-detail">Biz har bir taomga o&apos;zbek oshxonasining boy tarixini va bugungi kunning nozik didini singdiramiz. Har tashrifingizda o&apos;zingizni uydagidek his qilishingiz — bizning eng katta yutug&apos;imiz.</p></div>
      </section>

      <section className="contact-section section-shell" aria-labelledby="contact-title">
        <div className="contact-card"><div><p className="eyebrow">03 · Tashrif buyuring</p><h2 id="contact-title">Sizni kutamiz</h2><p className="contact-copy">Har kuni 10:00 — 23:00<br />Navoiy shahri, G&apos;alaba ko&apos;chasi</p></div><a className="phone-link" href="tel:+998942500999"><span>+998 94 250 09 99</span><b aria-hidden="true">↗</b></a></div>
      </section>

      <footer className="footer section-shell"><a href="#top" className="brand">Lider</a><p>2026 — Lider</p><a href="#top" className="back-top">Yuqoriga ↑</a></footer>
    </main>
  )
}

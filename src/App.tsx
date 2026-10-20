import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { DumbbellCanvas } from './components/DumbbellCanvas';
import { initialSiteData, SiteData } from './data/siteData';

export const App: React.FC = () => {
  const [site, setSite] = useState<SiteData>(initialSiteData);
  const [navOpen, setNavOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('js');

    const ctx = gsap.context(() => {
      // Staggered reveal for .rv elements
      ScrollTrigger.batch('.rv', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            onComplete: () => gsap.set(batch, { clearProps: 'transform' }),
          }),
      });

      gsap.set('.rv', { y: 36 });

      // Parallax scroll effects
      const parallaxEls = document.querySelectorAll('[data-sp]');
      parallaxEls.forEach((el) => {
        const targetSec = el.closest('section');
        if (!targetSec) return;
        const spVal = (el as HTMLElement).dataset.sp;
        gsap.to(el, {
          yPercent: Number(spVal),
          ease: 'none',
          scrollTrigger: {
            trigger: targetSec,
            scrub: true,
            start: 'top bottom',
            end: 'bottom top',
          },
        });
      });

      // Hero scale out
      gsap.to('.hero-in', {
        scale: 0.9,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          scrub: true,
          start: 'center top',
          end: 'bottom top',
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setNavOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus(
      'Prototype only: connect this form to your email or booking service.'
    );
  };

  const getImageStyle = (url?: string) =>
    url ? ({ '--img': `url(${url})` } as React.CSSProperties) : undefined;

  return (
    <>
      {/* 3D Dumbbell WebGL Canvas */}
      <DumbbellCanvas />

      {/* Navigation Header */}
      <nav>
        <a
          className="logo"
          href="#hero"
          dangerouslySetInnerHTML={{ __html: site.name }}
        />
        <button
          id="mb"
          aria-label="Menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(!navOpen)}
        >
          Menu
        </button>
        <ul id="nl" className={navOpen ? 'open' : ''}>
          <li>
            <a href="#about" onClick={handleNavClick}>
              About
            </a>
          </li>
          <li>
            <a href="#equipment" onClick={handleNavClick}>
              Equipment
            </a>
          </li>
          <li>
            <a href="#supplements" onClick={handleNavClick}>
              Supplements
            </a>
          </li>
          <li>
            <a href="#trainers" onClick={handleNavClick}>
              Trainers
            </a>
          </li>
          <li>
            <a href="#plans" onClick={handleNavClick}>
              Plans
            </a>
          </li>
          <li>
            <a href="#reviews" onClick={handleNavClick}>
              Reviews
            </a>
          </li>
          <li>
            <a className="btn" href="#contact" onClick={handleNavClick}>
              Join now
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content Sections */}
      <main ref={mainRef}>
        {/* HERO SECTION */}
        <section id="hero">
          <div
            className="bg"
            id="heroBg"
            data-sp="12"
            style={getImageStyle(site.heroImg)}
          />
          <div className="wrap hero-in">
            <h1
              className="rv"
              dangerouslySetInnerHTML={{ __html: site.headline }}
            />
            <p
              className="lead rv"
              dangerouslySetInnerHTML={{ __html: site.tagline }}
            />
            <div className="row rv">
              <a className="btn" href="#plans">
                See membership plans
              </a>
              <a className="btn ghost" href="#contact">
                Book a free tour
              </a>
            </div>
          </div>
        </section>

        {/* MARQUEE / TICKER */}
        <div className="mq" aria-hidden="true">
          <div id="mq">
            {[0, 1].map((setIndex) =>
              site.ticker.map((item, i) => (
                <span key={`${setIndex}-${i}`}>{item}</span>
              ))
            )}
          </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about">
          <div className="wrap split">
            <div>
              <h2 className="rv">About the gym</h2>
              <p
                className="lead rv"
                dangerouslySetInnerHTML={{ __html: site.about }}
              />
              <div className="stats rv" id="stats">
                {site.stats.map((st, i) => (
                  <div key={i}>
                    <b>{st[0]}</b>
                    <span>{st[1]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="ph tall rv"
              id="aboutImg"
              data-sp="-6"
              style={getImageStyle(site.aboutImg)}
            />
          </div>
        </section>

        {/* EQUIPMENT SECTION */}
        <section id="equipment">
          <div className="wrap">
            <h2 className="rv">Equipment</h2>
            <p className="lead rv">
              Short intro placeholder. Describe the training floor, brands and
              zones here.
            </p>
            <div className="grid" id="eq">
              {site.equipment.map((item) => (
                <article key={item.id} className="card rv">
                  <div className="ph" style={getImageStyle(item.img)} />
                  <div className="b">
                    <h3>{item.t}</h3>
                    <p>{item.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SUPPLEMENTS SECTION */}
        <section id="supplements">
          <div className="wrap">
            <h2 className="rv">Supplements</h2>
            <p className="lead rv">
              Short intro placeholder. Describe your supplement range or partner
              brands here.
            </p>
            <div className="grid" id="sp">
              {site.supplements.map((item) => (
                <article key={item.id} className="card rv">
                  <div className="ph" style={getImageStyle(item.img)} />
                  <div className="b">
                    <h3>{item.t}</h3>
                    <p>{item.d}</p>
                    <div className="price">{item.p}</div>
                    <a className="btn ghost" href="#contact">
                      Ask in store
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TRAINERS SECTION */}
        <section id="trainers">
          <div className="wrap">
            <h2 className="rv">Trainers</h2>
            <p className="lead rv">
              Short intro placeholder. Add real names, specialties and
              certifications once confirmed.
            </p>
            <div className="grid" id="tr">
              {site.trainers.map((item) => (
                <article key={item.id} className="card rv">
                  <div className="ph tall" style={getImageStyle(item.img)} />
                  <div className="b">
                    <h3>{item.t}</h3>
                    <p>{item.d}</p>
                    <p>{item.c}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MEMBERSHIP PLANS SECTION */}
        <section id="plans">
          <div className="wrap">
            <h2 className="rv">Membership plans</h2>
            <p className="lead rv">
              Short intro placeholder. Pricing, terms and inclusions to be
              supplied.
            </p>
            <div className="grid" id="pl">
              {site.plans.map((plan) => (
                <article
                  key={plan.id}
                  className={`card rv ${plan.hot ? 'hot' : ''}`}
                >
                  <div className="b">
                    {plan.hot && <span className="tag">Featured</span>}
                    <h3>{plan.t}</h3>
                    <div className="price">{plan.p}</div>
                    <ul>
                      {site.planFeatures.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                    <a
                      className={`btn ${plan.hot ? '' : 'ghost'}`}
                      href="#contact"
                    >
                      Choose plan
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section id="reviews">
          <div className="wrap">
            <h2 className="rv">Member reviews</h2>
            <p className="lead rv">
              Placeholder reviews only. Replace with real, permitted member
              feedback.
            </p>
            <div className="grid" id="rv">
              {site.reviews.map((rev) => (
                <article key={rev.id} className="card rv">
                  <div className="b">
                    <div className="stars" aria-label="Rating placeholder">
                      ★★★★★
                    </div>
                    <p style={{ color: 'var(--tx)', margin: '10px 0 14px' }}>
                      “{rev.q}”
                    </p>
                    <h3 style={{ fontSize: '1.15rem' }}>{rev.n}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT & BOOKING SECTION */}
        <section id="contact">
          <div className="wrap split">
            <div>
              <h2 className="rv">Visit us</h2>
              <p
                className="lead rv"
                id="ci"
                dangerouslySetInnerHTML={{ __html: site.contact }}
              />
              <div
                className="ph rv"
                style={{ marginTop: '28px', aspectRatio: '16/10' }}
                id="map"
              >
                Map embed placeholder
              </div>
            </div>
            <form
              id="f"
              className="card rv"
              style={{ padding: '26px' }}
              onSubmit={handleFormSubmit}
              noValidate
            >
              <h3>Book a free tour</h3>
              <input
                name="n"
                placeholder="Your name"
                aria-label="Your name"
                required
              />
              <input
                name="e"
                type="email"
                placeholder="Email or phone"
                aria-label="Email or phone"
                required
              />
              <textarea
                name="m"
                placeholder="Message"
                aria-label="Message"
              />
              <button className="btn" type="submit">
                Send request
              </button>
              <div id="fm" role="status">
                {formStatus}
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="wrap">
          <span>
            <b>{site.name}</b> – placeholder tagline.
          </span>
          <span id="soc">
            {site.social.map((socName, idx) => (
              <React.Fragment key={socName}>
                <a href="#">{socName}</a>
                {idx < site.social.length - 1 && ' \u00A0&\u00A0 '}
              </React.Fragment>
            ))}
          </span>
          <span>© 2026 {site.name}. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
};

export default App;

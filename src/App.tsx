import React, { forwardRef, useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import {
  MapPin,
  Users,
  Star,
  ChevronRight,
  ChevronLeft,
  Gift,
  Music,
  Camera,
  QrCode as QrIcon,
  Church,
  Heart
} from 'lucide-react';
// Import Assets for correct resolution in production
import FrontPage from './assets/FrontPage.jpeg';
import BabyGolf from './assets/BabyGolf.png';
import GolfCart from './assets/GolfCart.png';
import GolfBag from './assets/GolfBag.png';
import TeeBall from './assets/Tee-Ball.png';
import Flag from './assets/Flag.png';
import QRBPI from './assets/BPI_QR.png';
import TeddyBear from './assets/TeddyBear.png'
// --- Types ---
interface PageProps {
  children: React.ReactNode;
  number: number;
}

// --- Components ---

const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const isLeftPage = props.number % 2 !== 0; // Page 1, 3, 5 are Left in a spread
  return (
    <div className={`page ${isLeftPage ? 'page-left' : 'page-right'}`} ref={ref} data-density="hard">
      <div className="page-stack" style={{ [isLeftPage ? 'left' : 'right']: 0 }}></div>
      <div className="corner-ornament corner-tl"></div>
      <div className="corner-ornament corner-tr"></div>
      <div className="corner-ornament corner-bl"></div>
      <div className="corner-ornament corner-br"></div>
      <div className="page-border-decorative"></div>
      <motion.div
        className="page-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {props.children}
      </motion.div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '30px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: 'var(--color-navy)',
        opacity: 0.6,
        fontFamily: 'var(--font-title)',
        zIndex: 10
      }}>
        {props.number}
      </div>
    </div>
  );
});
const CoverPage = forwardRef<HTMLDivElement, { babyName: string }>(({ babyName }, ref) => {
  return (
    <div className="page page-cover page-right" ref={ref} data-density="hard">
      <div className="page-stack" style={{ right: 0 }}></div>
      <div className="page-border-decorative"></div>
      <img src={FrontPage} alt={babyName} style={{ width: '100%', height: '100%' }} />
    </div>
  );
});

const App: React.FC = () => {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: 600,
    height: 800
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      let w, h;

      if (isMobile) {
        w = window.innerWidth;
        h = window.innerHeight;
      } else {
        // Desktop: dual page view
        // Occupy 98% of the screen for maximum readability
        const availableHeight = window.innerHeight * 0.99;
        const availableWidth = window.innerWidth * 0.99;

        const targetRatio = 0.75;

        h = availableHeight;
        w = h * targetRatio;

        if (w * 2 > availableWidth) {
          w = availableWidth / 2;
          h = w / targetRatio;
        }
      }

      setDimensions({ width: Math.floor(w), height: Math.floor(h) });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const babyName = "Zaire Jace Chato Capin";

  const onPage = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="pamphlet-container">
      <div className="book-wrapper">
        <HTMLFlipBook
          key={`${dimensions.width}-${dimensions.height}`}
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={100}
          maxWidth={3000}
          minHeight={100}
          maxHeight={3000}
          maxShadowOpacity={0.8}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onPage}
          className="my-book"
          ref={bookRef}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={window.innerWidth <= 768}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={1}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Page 1: Cover */}
          <CoverPage babyName={babyName} />

          {/* Page 2: Welcome & Message */}
          <Page number={1}>
            <h2 style={{ marginBottom: '15px', color: 'var(--color-navy)', borderBottom: '2px solid var(--color-grass-green)', }}>Welcome to the Green</h2>

            <div className="photo-frame">
              <img src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2070&auto=format&fit=crop" alt="Baby Placeholder" />
            </div>

            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-light)', marginTop: '20px' }}>
              We are so grateful to have you join us on this special day as we celebrate the baptism of our beloved **{babyName}**.
            </p>
            <div className="ornament" style={{ width: '100px', margin: '15px auto' }}></div>
            <p style={{ fontSize: '0.9rem' }}>
              Your presence in Zaire's life is a hole-in-one!
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <div className="photo-frame" style={{ transform: 'rotate(2deg)', marginTop: '20px' }}>
                <img src="https://images.unsplash.com/photo-1544126592-807daa215a05?q=80&w=2070&auto=format&fit=crop" alt="Baby Placeholder 2" />
              </div>

              <div className="photo-frame" style={{ transform: 'rotate(-3deg)', marginTop: '20px' }}>
                <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070&auto=format&fit=crop" alt="Baby Placeholder 3" />
              </div>
            </div>
          </Page>

          {/* Page 3: How to get there Details */}
          <Page number={2}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h2 style={{ marginBottom: '15px', color: 'var(--color-navy)', borderBottom: '2px solid var(--color-grass-green)', }}>How to get there</h2>

              <div style={{ marginTop: '30px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d3219.4918393425537!2d123.96756568780667!3d10.310811783871845!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x33a999d8a29e2c03%3A0xd31f12bf54d1b4eb!2sMactan%20Airbase%20Chapel%2C%20Mactan%20Air%20Base%20Sewage%20Gate%2C%20Mustang%20Rd%2C%20Lapu-Lapu%2C%20Cebu!3m2!1d10.313396!2d123.97116589999999!4m5!1s0x33a999de1fa2e117%3A0x61acab410dac392b!2sMactan%20Island%20Golf%20Course%2C%20Opon-Airport-Sangi%20Rd%2C%20Lapu-Lapu%2C%20Cebu!3m2!1d10.308233!2d123.9706698!5e0!3m2!1sen!2sph!4v1777632255839!5m2!1sen!2sph"
                  width="100%"
                  style={{ border: 0, borderRadius: "10px", minHeight: '400px', maxHeight: "500px" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div style={{ marginTop: '30px', display: 'flex', alignItems: 'start', gap: '15px', textAlign: 'left' }}>
                <Church color="var(--color-soft-blue)" size={24} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--color-navy)' }}>Ceremony Venue</strong>
                  <span style={{ fontSize: '0.85rem' }}>Our Lady of Peace and Good Voyage Chapel</span><br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-soft-blue)' }}>Mactan Airbase, Lapu-Lapu City</span>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'start', gap: '15px', textAlign: 'left' }}>
                <MapPin color="var(--color-soft-blue)" size={24} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--color-grass-green)' }}>Reception Venue</strong>
                  <span style={{ fontSize: '0.85rem' }}>Mactan Island Golf Course Clubhouse</span><br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-soft-blue)' }}>Mactan Airbase, Lapu-Lapu City</span>
                </div>
              </div>
              <div style={{ zIndex: '20', marginTop: '60px' }}>
                <img src={GolfCart} alt="Golf Cart" style={{ width: '220px', height: 'auto' }} />
              </div>
            </div>
          </Page>

          {/* Page 7: Safety Reminders */}
          <Page number={3}>
            <h2 style={{ marginBottom: '15px', color: 'var(--color-navy)', borderBottom: '2px solid var(--color-grass-green)', }}><Music size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Safety on the Fairway</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-leaf-green)', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
              (Baby Safety Reminders)
            </p>

            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '20px', lineHeight: '1.5', padding: '0 10px', textAlign: 'center' }}>
              For <strong>Baby Zaire Jace's</strong> safety, as he is still very young with a developing immune system, we kindly ask for your understanding and cooperation:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', padding: '0 10px' }}>
              {[
                { icon: "👶", text: "No holding or direct contact with the baby (parents only)" },
                { icon: "↔️", text: "Please keep a respectful distance at all times" },
                { icon: "🧼", text: "Kindly sanitize hands before entering the baby area" },
                { icon: "🚫💋", text: "No kissing the baby" },
                { icon: "🌡️", text: "If you are feeling unwell, we kindly ask that you rest at home" },
                { icon: "🔇", text: "Help keep the area calm by avoiding crowding and loud noise" },
                { icon: "🧴", text: "Please avoid wearing strong perfumes or scents near the baby" },
                { icon: "📸", text: "Avoid flash photography near the baby" }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '8px 15px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid var(--color-sky-blue)' }}>
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-navy)', lineHeight: '1.2' }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(226, 240, 217, 0.5)', borderRadius: '15px', border: '1px dashed var(--color-leaf-green)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--color-navy)' }}>
                "Thank you for helping us keep our little champion safe and comfortable as he begins his journey of faith."
              </p>
            </div>
          </Page>


          {/* Page 4: Programs */}
          <Page number={4}>
            <h2 style={{ marginBottom: '15px', color: 'var(--color-navy)', borderBottom: '2px solid var(--color-grass-green)', }}><Music size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Event Timeline</h2>
            <div className="sponsor-list">
              <div className="sponsor-item" style={{ borderBottomColor: 'var(--color-sky-blue)' }}>
                <span>Arrival of Guests</span>
                <span style={{ fontWeight: 500 }}>4:00 PM</span>
              </div>
              <div className="sponsor-item" style={{ borderBottomColor: 'var(--color-sky-blue)' }}>
                <span>Baptismal Rite</span>
                <span style={{ fontWeight: 500 }}>4:15 PM</span>
              </div>
              <div className="sponsor-item" style={{ borderBottomColor: 'var(--color-sky-blue)' }}>
                <span>Photo Session</span>
                <span style={{ fontWeight: 500 }}>5:00 PM</span>
              </div>
              <div className="sponsor-item" style={{ borderBottomColor: 'var(--color-sky-blue)' }}>
                <span>Tee-off Reception</span>
                <span style={{ fontWeight: 500 }}>5:30 PM</span>
              </div>
              <div className="sponsor-item" style={{ borderBottomColor: 'var(--color-sky-blue)' }}>
                <span>Dinner & Games</span>
                <span style={{ fontWeight: 500 }}>6:00 PM</span>
              </div>
            </div>


            <div style={{ marginTop: '30px', padding: '15px', background: 'var(--color-sky-blue)', borderRadius: '12px', border: '1px dashed var(--color-soft-blue)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-navy)', fontStyle: 'italic' }}>
                "Join us as we celebrate this special milestone with faith, family, and a little swing of joy!"
              </p>
            </div>

            <img src={BabyGolf} alt="Baby Golf" style={{ width: '200px', marginTop: '20px' }} />
          </Page>

          {/* Page 5: Sponsors / Godparents */}
          <Page number={5}>
            <h2 style={{ marginBottom: '15px', color: 'var(--color-navy)', borderBottom: '2px solid var(--color-grass-green)', }}><Star size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Tee Sponsors of Faith</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%', textAlign: 'left' }}>

              <div style={{ background: 'rgba(146, 208, 80, 0.05)', padding: '15px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--color-leaf-green)', marginBottom: '10px', borderBottom: '1px solid var(--color-sky-blue)' }}>Ninong</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    "Silvano, John Kimmy",
                    "Victor Quijano, Jr.",
                    "Ruel Sabidor",
                    "Jovan Andrew Lasala",
                    "Lyndon Rose Leonor",
                    "Ian Krayben Marabut",
                    "Brig. Gen. Pedro A. Sumayo Jr.",
                    "Castillo, Roy",
                    "Caumeran, Romeo",
                    "Quiton, Jubby",
                    "Sgt. Colcol, Junril",
                    "Valenzuela, Jalilo",
                    "Pananganan, Niño",
                    "Itami Seji",
                    "Tumulak, Julimar"
                  ].map((name, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.6rem', color: 'var(--color-grass-green)', opacity: 0.8 }}><Star size={10} style={{ verticalAlign: 'middle' }} /></span>
                      <span className="script-text" style={{ fontSize: '0.85rem', color: 'var(--color-navy)', borderBottom: '1px solid rgba(157, 195, 230, 0.2)', width: '100%', paddingBottom: '2px' }}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card">
                <h4 style={{ color: 'var(--color-leaf-green)', marginBottom: '15px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', borderBottom: '1px solid var(--color-sky-blue)', paddingBottom: '5px' }}>Ninang</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    "Alexis Margret Aberion",
                    "Roxanne Kathlyn Alivio",
                    "Hannah Barba",
                    "Mary Thaira Elyne Baynosa",
                    "Mary Trixia Elyonne Baynosa",
                    "Erica Jean Booc",
                    "Adelaida Capin",
                    "Alvie Deloria",
                    "Darla Marie Desuasido",
                    "Sarah Mae Galve",
                    "Antoniette Sison Guevarra",
                    "Ma Joy Hera",
                    "Ai Kajiwara",
                    "Princess Mae Labaniego",
                    "Stephanie Zoe Rojo",
                    "Aira Abigail Villar"
                  ].map((name, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.6rem', color: 'var(--color-grass-green)', opacity: 0.8 }}><Heart size={10} style={{ verticalAlign: 'middle' }} /></span>
                      <span className="script-text" style={{ fontSize: '0.85rem', color: 'var(--color-navy)', borderBottom: '1px solid rgba(157, 195, 230, 0.2)', width: '100%', paddingBottom: '2px' }}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
            <>
              <div style={{ marginTop: '4px' }}>
                <div className="ornament" style={{ width: '120px' }}></div>
                <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '10px', marginBottom: '20px' }}>
                  "We are blessed to have our loving Fairway Guides who will walk with Zaire Jace."
                </p>
              </div>
              <div style={{ zIndex: '20', marginTop: '2px', display: 'flex', justifyContent: 'flex-end', alignItems: 'self-end' }}>
                <img src={TeeBall} alt="Tee Ball" style={{ width: '100px', height: 'auto' }} />
              </div>
            </>
          </Page>

          {/* Page 6: Guest List */}
          <Page number={6}>
            <h2 style={{ marginBottom: '15px', color: 'var(--color-navy)', borderBottom: '2px solid var(--color-grass-green)', }}><Users size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Family & Friends</h2>
            <div style={{ width: '100%', padding: '10px' }}>
              <div className="glass-card" style={{ padding: '25px', position: 'relative', overflow: 'hidden', border: '2px solid var(--color-sky-blue)' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.2 }}>
                  <img src={TeddyBear} alt="Teddy Bear" style={{ width: '100px' }} />
                </div>
                <p className="script-text" style={{ fontSize: '1.6rem', marginBottom: '15px', color: 'var(--color-soft-blue)' }}>Our Dearest Guests</p>
                <div style={{ textAlign: 'left', fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: '1.8' }}>
                  <p>To our beloved families,</p>
                  <p style={{ marginTop: '10px' }}>Thank you for joining us at the green as we celebrate Zaire Jace's baptism. Your presence is the best gift we could receive.</p>
                  <p style={{ marginTop: '15px' }}>Let's tee off this spiritual journey together!</p>
                </div>

              </div>

              {/* Moved Candid Moments Section */}
              <div style={{ marginTop: '25px', padding: '15px', background: 'white', borderRadius: '15px', border: '2px dashed var(--color-grass-green)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '8px' }}>
                  <Camera size={20} color="var(--color-soft-blue)" />
                  <strong style={{ color: 'var(--color-navy)', fontSize: '0.9rem' }}>Share Your Memories</strong>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '12px' }}>

                  We would love to see the moments you've captured from this special day!
                  Please scan the QR Code or visit the link below to upload your photos.

                </p>
                <a
                  href="https://drive.google.com/drive/folders/1Vm_pUUB0rcmJnA3HBB0gygVSnvBZi9b_?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: 'var(--color-soft-blue)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    boxShadow: '0 4px 10px rgba(91, 155, 213, 0.2)'
                  }}
                >
                  Upload Photos 📸
                </a>

                <QrIcon size={100} />
              </div>
            </div>
          </Page>


          {/* Page 8: Donations & QR */}
          <Page number={7}>
            <h2 style={{ marginBottom: '15px', color: 'var(--color-navy)', borderBottom: '2px solid var(--color-grass-green)', }}><Gift size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Gift of Love</h2>
            <p style={{ fontSize: '0.9rem', marginBottom: '25px', color: 'var(--color-text-light)' }}>
              Your presence is our greatest score! However, if you wish to contribute to Zaire's future fund, you may scan the code below.
            </p>

            <div className="glass-card" style={{
              padding: '25px',
              display: 'inline-block',
              border: '2px solid var(--color-sky-blue)',
              boxShadow: '0 15px 35px rgba(157, 195, 230, 0.2)'
            }}>
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                {/* <QRCodeSVG
                  value="https://example.com/donations/zaire"
                  size={180}
                  fgColor="var(--color-navy)"
                /> */}
                <img src={QRBPI} alt="QRBPI " style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>

            <p style={{ marginTop: '25px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>

            </p>


            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(91, 155, 213, 0.05)', borderRadius: '12px', border: '1px solid var(--color-sky-blue)', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '0.85rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ color: 'var(--color-text-light)', display: 'block', marginBottom: '5px' }}>GCash / Maya</span>
                  <a
                    href="tel:09568498784"
                    style={{ color: 'var(--color-navy)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', borderBottom: '1px dashed var(--color-soft-blue)' }}
                    onClick={() => {
                      navigator.clipboard.writeText("09568498784");
                      alert("GCash Number Copied!");
                    }}
                  >
                    0956-849-8784
                  </a>
                </div>

              </div>
              <p style={{ fontSize: '0.65rem', color: 'var(--color-soft-blue)', marginTop: '10px', textAlign: 'center' }}>
                (Tap number to copy)
              </p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <img src={Flag} alt="Flag " style={{ width: '80px', height: 'auto' }} />
            </div>
          </Page>

          {/* Page 8: Back Cover */}
          <div className="page page-cover page-left" data-density="hard">
            <div className="page-stack" style={{ left: 0 }}></div>
            <div className="page-content">
              <img src={GolfBag} alt="Golf Bag" style={{ width: '100px', marginBottom: '20px' }} />
              <h3 style={{ marginTop: '20px', color: 'var(--color-navy)' }}>Thank You</h3>
              <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                With love,<br />
                The Family of Zaire Jace
              </p>
              <div className="ornament" style={{ width: '80px', margin: '20px auto' }}></div>
              <div style={{ marginTop: '20px', fontSize: '0.7rem', color: 'var(--color-text-light)' }}>
                &copy; 2026 Zaire's Christening
              </div>
            </div>
          </div>
        </HTMLFlipBook>
      </div>

      {/* Floating Navigation Buttons */}
      <button
        className="nav-arrow left"
        onClick={() => bookRef.current.pageFlip().flipPrev()}
        style={{ position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'var(--color-soft-blue)', border: 'none', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', cursor: 'pointer', zIndex: 1000, color: 'white' }}
      >
        <ChevronLeft size={32} />
      </button>

      <button
        className="nav-arrow right"
        onClick={() => bookRef.current.pageFlip().flipNext()}
        style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'var(--color-soft-blue)', border: 'none', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', cursor: 'pointer', zIndex: 1000, color: 'white' }}
      >
        <ChevronRight size={32} />
      </button>

      {/* Page Indicator */}
      <div className="page-indicator" style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', background: 'var(--glass-bg)', padding: '8px 20px', borderRadius: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '15px', zIndex: 1000 }}>
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-navy)', fontFamily: 'var(--font-title)' }}>{currentPage + 1} / 8</span>
        <div style={{ width: '120px', height: '6px', background: '#eef2f7', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${((currentPage + 1) / 8) * 100}%`, height: '100%', background: 'var(--color-soft-blue)', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>

      {/* Audio Button */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
        <button
          style={{ background: 'white', border: '2px solid var(--color-sky-blue)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', cursor: 'pointer', transition: 'all 0.3s ease' }}
          onClick={() => alert("Playing Golf Ambience & Lullaby...")}
        >
          <Music size={28} color="var(--color-soft-blue)" />
        </button>
      </div>
    </div >
  );
};

export default App;

'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Heart, Film, Clock, MapPin, Camera } from 'lucide-react';

const MovieInvitation: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      title: "¡Felices 3 meses mi vida!",
      content: "Estar junto a ti es la mayor bendición. Eres mi tesoro y soy el más feliz a tu lado. Doy y seguiré dando todo por ti, mi amor. \n\nEmpecemos...",
      background: "",
      icon: null,
      titleColor: "text-rose-500",
      contentColor: "text-neutral-800",
    },
    {
      title: "Nuestra Noche",
      content: "Una invitación especial...",
      background: "",
      icon: <Heart className="w-16 h-16 text-rose-500" />,
      titleColor: "text-neutral-800",
      contentColor: "text-neutral-700",
    },
    {
      title: "Película Juntos",
      content: "8 de diciembre, un día para recordar",
      background: "",
      icon: <Film className="w-16 h-16 text-rose-500" />,
      titleColor: "text-neutral-800",
      contentColor: "text-neutral-600",
    },
    {
      title: "Hora Perfecta",
      content: "A las 7:20 PM",
      background: "",
      icon: <Clock className="w-16 h-16 text-rose-500" />,
      titleColor: "text-neutral-800",
      contentColor: "text-neutral-600",
    },
    {
      title: "Lugar Especial",
      content: "Un lugar que hemos recorrido juntos",
      background: "",
      icon: <MapPin className="w-16 h-16 text-rose-500" />,
      titleColor: "text-neutral-800",
      contentColor: "text-neutral-600",
    },
    {
      title: "Nuestro Momento",
      content: accepted
        ? "Pronto nos vemos princesa. Te amo por y para siempre, amor de todas mis vidas."
        : "Ver 'We Live In Time' juntos el 8 de diciembre del 2024",
      background: "https://res.cloudinary.com/dbcdnlxle/image/upload/v1733676960/weliveintime_xev9vc.jpg",
      icon: <Camera className="w-16 h-16 text-white" />,
      titleColor: "text-white",
      contentColor: "text-white",
      additionalContent: !accepted && (
        <button
          className="mt-6 px-8 py-3 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-700 transition-colors"
          onClick={() => setAccepted(true)}
        >
          ¿Aceptas?
        </button>
      ),
    },
  ];

  const handleWheel = (e: WheelEvent) => {
    if (scrolling) return;
    e.preventDefault();

    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      setScrolling(true);
      setCurrentSection((prev) => prev + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
      setScrolling(true);
      setCurrentSection((prev) => prev - 1);
    }

    setTimeout(() => setScrolling(false), 800);
  };

  // Touch support for mobile
  const handleTouchStart = useRef<number | null>(null);
  
  const handleTouchMove = (e: TouchEvent) => {
    if (handleTouchStart.current === null) return;

    const currentTouch = e.touches[0].clientY;
    const diff = handleTouchStart.current - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      } else if (diff < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }
      handleTouchStart.current = null;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Wheel event for desktop
      container.addEventListener("wheel", handleWheel, { passive: false });
      
      // Touch events for mobile
      container.addEventListener("touchstart", (e) => {
        handleTouchStart.current = e.touches[0].clientY;
      });
      container.addEventListener("touchmove", handleTouchMove, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", () => {});
        container.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [currentSection, scrolling]);

  const sectionVariants: Variants = {
    initial: { opacity: 0, y: "100%" },
    animate: (index: number) => ({
      opacity: index === currentSection ? 1 : 0,
      y: index === currentSection ? "0%" : "100%",
    }),
    exit: { opacity: 0, y: "100%" },
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden touch-none"
      style={{ touchAction: 'none' }}
    >
      <AnimatePresence>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1],
            }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: index === currentSection ? 20 : 10,
              backgroundColor: index < sections.length - 1 ? 'white' : 'transparent'
            }}
          >
            {section.background && index === sections.length - 1 && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{
                  backgroundImage: `url(${section.background})`,
                  backgroundAttachment: "fixed",
                }}
              />
            )}

            <div className="relative z-30 text-center px-4 sm:px-8 w-full max-w-2xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {section.icon && <div className="mb-6">{section.icon}</div>}
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Playfair_Display'] ${section.titleColor}`}
                >
                  {section.title}
                </h2>
                <p
                  className={`text-xl sm:text-2xl font-['Lora'] max-w-prose ${section.contentColor}`}
                >
                  {section.content}
                </p>
                {section.additionalContent && (
                  <div className="mt-6">{section.additionalContent}</div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex space-x-3">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-3 h-3 rounded-full transition-all 
              ${
                index === currentSection
                  ? "bg-rose-500 scale-125"
                  : "bg-neutral-300 hover:bg-neutral-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieInvitation;
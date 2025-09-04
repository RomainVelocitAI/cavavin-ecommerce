import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Wine, Award } from 'lucide-react';

const CavavinStoresSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const options = [
    {
      title: "Notre Histoire",
      description: "Plus de 20 ans d'expertise en vins et spiritueux",
      image: "https://images.unsplash.com/photo-1543418219-44e30b057fea?w=800&q=80",
      icon: <Wine size={24} className="text-white" />,
      details: "Fondé par des passionnés, Cavavin La Réunion s'est imposé comme LA référence pour les amateurs de vins et spiritueux sur l'île. Notre sélection rigoureuse et nos conseils personnalisés font notre réputation."
    },
    {
      title: "Excellence & Qualité",
      description: "250+ références sélectionnées avec passion",
      image: "https://images.unsplash.com/photo-1558346489-19413928158b?w=800&q=80", 
      icon: <Award size={24} className="text-white" />,
      details: "Des grands crus aux découvertes surprenantes, notre cave recèle des trésors pour tous les goûts et tous les budgets. Chaque bouteille est choisie pour sa qualité et son histoire unique."
    },
    {
      title: "Boutique Saint-Denis",
      description: "Au cœur du chef-lieu, votre caviste de proximité",
      image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800&q=80",
      icon: <MapPin size={24} className="text-white" />,
      details: "📍 123 rue Maréchal Leclerc, 97400 Saint-Denis\n📞 0262 20 30 40\n🕐 Lundi-Samedi: 9h-19h, Dimanche: 9h-12h30"
    },
    {
      title: "Boutique Saint-Pierre", 
      description: "Dans le sud, pour vous servir",
      image: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&q=80",
      icon: <MapPin size={24} className="text-white" />,
      details: "📍 45 rue des Bons Enfants, 97410 Saint-Pierre\n📞 0262 25 35 45\n🕐 Lundi-Samedi: 9h-19h, Dimanche: 9h-12h30"
    },
    {
      title: "Services Premium",
      description: "Livraison, conseil, événements privés",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
      icon: <Clock size={24} className="text-white" />,
      details: "Livraison sur toute l'île en 24-48h • Click & Collect en 2h • Conseils personnalisés • Dégustations privées • Organisation d'événements • Cadeaux d'entreprise"
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Découvrez Cavavin La Réunion
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Votre caviste de référence avec deux boutiques sur l&apos;île, 
            plus de 250 références et une équipe passionnée à votre service.
          </p>
        </div>

        {/* Interactive Selector Container */}
        <div className="relative bg-gray-900 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Options Container */}
            <div className="options flex w-full lg:w-2/3 h-[400px] items-stretch overflow-hidden rounded-xl">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`
                    option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer
                    ${activeIndex === index ? 'active' : ''}
                  `}
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%), url('${option.image}')`,
                    backgroundSize: activeIndex === index ? 'cover' : 'cover',
                    backgroundPosition: 'center',
                    opacity: animatedOptions.includes(index) ? 1 : 0,
                    transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                    minWidth: '60px',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: activeIndex === index ? '#9d7c0d' : '#374151',
                    backgroundColor: '#1f2937',
                    boxShadow: activeIndex === index 
                      ? '0 20px 60px rgba(157,124,13,0.3)' 
                      : '0 10px 30px rgba(0,0,0,0.3)',
                    flex: activeIndex === index ? '5 1 0%' : '1 1 0%',
                    zIndex: activeIndex === index ? 10 : 1,
                  }}
                  onClick={() => handleOptionClick(index)}
                >
                  {/* Label with icon and info */}
                  <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none px-4 gap-3 w-full">
                    <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-gradient-to-br from-champagne to-primary backdrop-blur-[10px] shadow-lg border-2 border-champagne/50 flex-shrink-0 flex-grow-0 transition-all duration-200">
                      {option.icon}
                    </div>
                    <div className="info text-white whitespace-pre relative">
                      <div 
                        className="main font-bold text-lg transition-all duration-700 ease-in-out"
                        style={{
                          opacity: activeIndex === index ? 1 : 0,
                          transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                          display: activeIndex === index ? 'block' : 'none'
                        }}
                      >
                        {option.title}
                      </div>
                      <div 
                        className="sub text-sm text-gray-300 transition-all duration-700 ease-in-out"
                        style={{
                          opacity: activeIndex === index ? 1 : 0,
                          transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                          display: activeIndex === index ? 'block' : 'none'
                        }}
                      >
                        {option.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Details Panel */}
            <div className="w-full lg:w-1/3 text-white">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-champagne">
                  {options[activeIndex].title}
                </h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {options[activeIndex].details}
                </p>
                {activeIndex >= 2 && activeIndex <= 3 && (
                  <button className="mt-4 bg-gradient-to-r from-champagne to-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Voir sur Google Maps
                  </button>
                )}
                {activeIndex === 4 && (
                  <button className="mt-4 bg-gradient-to-r from-champagne to-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Découvrir nos services
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">250+</div>
            <div className="text-gray-600">Références</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">2</div>
            <div className="text-gray-600">Boutiques</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">20+</div>
            <div className="text-gray-600">Ans d&apos;expérience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24h</div>
            <div className="text-gray-600">Livraison rapide</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CavavinStoresSelector;
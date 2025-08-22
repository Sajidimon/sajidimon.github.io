// Shared services data for both index.html and service.html
// Attach to window for easy access without modules
(function(){
  const services = [
    {
      id: 1,
      title: "I will create, redesign, clone WordPress website in Elementor pro",
      price: 80,
      delivery: "2-5 days",
      rating: 5.0,
      reviews: 12,
      image: "./image/service1.webp",
      badge: "Popular",
      short: "Modern WordPress sites with Elementor Pro, premium performance and clean design.",
      description: "I build or redesign WordPress websites using Elementor Pro with pixel-perfect responsive design, blazing performance and on‑page SEO. Includes theme setup, essential plugins, security hardening and speed optimization.",
      features: [
        "Custom design matching your brand",
        "Elementor Pro sections & templates",
        "Fast loading & SEO best practices",
        "Mobile-first responsive layout",
        "Security & essential plugins setup"
      ]
    },
    {
      id: 2,
      title: "I will solve your major WordPress issues, errors or bug fix",
      price: 5,
      delivery: "1-2 days",
      rating: 5.0,
      reviews: 12,
      image: "./image/service2.webp",
      badge: "Express",
      short: "Quick troubleshooting for WordPress themes, plugins, PHP errors and more.",
      description: "From white screen of death to plugin conflicts, I diagnose and fix WordPress issues safely on a staging or backup copy. Detailed report provided with steps and recommendations.",
      features: [
        "Fix PHP, JS, CSS, database errors",
        "Recover broken layouts & pages",
        "Resolve plugin/theme conflicts",
        "Security & backup checks",
        "Performance quick wins"
      ]
    },
    {
      id: 3,
      title: "I will design or develop responsive blog or eCommerce website",
      price: 250,
      delivery: "3-7 days",
      rating: 5.0,
      reviews: 8,
      image: "./image/service3.webp",
      badge: "Trending",
      short: "End‑to‑end WordPress eCommerce or blog with payments, shipping and more.",
      description: "Complete store or content site setup: product catalog, checkout, payment gateways, shipping, taxes, blog, and analytics. Conversion‑focused UX and scalable architecture.",
      features: [
        "WooCommerce setup & configuration",
        "Payment, shipping, tax rules",
        "Product pages & variations",
        "Checkout optimization",
        "Analytics & conversion tracking"
      ]
    },
    {
      id: 4,
      title: "I will make sales product landing page for your business",
      price: 20,
      delivery: "1 day",
      rating: 5.0,
      reviews: 3,
      image: "./image/service4.webp",
      badge: "New",
      short: "High‑converting landing pages optimized for speed and mobile.",
      description: "Launch-ready landing pages with persuasive copy layout, hero sections, CTA blocks, testimonials, FAQs, and analytics. Built with best practices for SEO and accessibility.",
      features: [
        "Modern hero and CTA layout",
        "Trust, benefits, social proof sections",
        "Fast, accessible and responsive",
        "Integrations: forms, chat, analytics",
        "A/B test ready structure"
      ]
    }
  ];

  window.Services = { all: services, byId: (id) => services.find(s => String(s.id) === String(id)) };
})();

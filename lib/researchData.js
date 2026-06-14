// ── Category detection ──────────────────────────────────────────────────────

export function detectCategory(text) {
  const t = text.toLowerCase();
  if (/ropa|moda|golf|tenis|fashion|clothing|zapatos|shoes|apparel|camisa|pantalon|vestido|marca de/.test(t)) return 'fashion';
  if (/comida|food|restaurante|restaurant|cocina|coffee|café|cafe|bakery|panadería|taquería|tacos|sushi/.test(t)) return 'food';
  if (/app|software|tech|plataforma|platform|saas|digital|ia\b|ai\b|inteligencia artificial|sistema/.test(t)) return 'tech';
  if (/deporte|sport|fitness|gym|gimnasio|entrenamiento|bastones|pelota|cancha|atletismo|yoga/.test(t)) return 'sports';
  if (/educaci|curso|clases|school|academia|tutoring|enseñar|aprender|capacitación/.test(t)) return 'education';
  if (/servicio|service|consulting|consultoría|agencia|agency|asesoría|limpieza|mantenimiento/.test(t)) return 'service';
  return 'general';
}

// ── Research templates by category ─────────────────────────────────────────

const TEMPLATES = {
  fashion: {
    globalExamples: [
      { company: 'Gymshark (UK)', description: 'Empezó en un garage haciendo serigrafía y llegó a valer $1.3B. Su estrategia fue casi 100% influencer marketing antes de que eso fuera lo normal.', model: 'DTC + influencer' },
      { company: 'Pangaia (Netherlands)', description: 'Marca premium de moda sostenible que convirtió los materiales eco en un argumento de lujo. Cobra 2-3x el precio promedio y la gente lo paga.', model: 'Sustainable premium' },
      { company: 'Lululemon (Canada)', description: 'Construyó lealtad de marca alrededor de un estilo de vida, no solo ropa deportiva. $9B anuales demostrando que owning a niche beats competing on price.', model: 'Community + premium' },
      { company: 'GFORE (USA)', description: 'Rompió la estética aburrida del golf de club de campo. Se posicionó como lujo-meets-sport y ahora está en los principales retailers de golf globales.', model: 'Niche premium' },
      { company: 'Shein (China)', description: '3,000-10,000 nuevos SKUs por día, precios agresivos y social commerce masivo. Domina Gen Z globalmente con un modelo de ultra-fast fashion DTC.', model: 'Fast fashion DTC' },
    ],
    mexicoContext: 'El mercado de apparel en México vale aprox. $18.5B USD (2024) y crece ~5% anual. El e-commerce en moda llegó al 22% en 2023. Lo más importante que encontré: (1) el segmento premium ($800–$2,500 MXN por pieza) está poco servido por marcas mexicanas — casi todo lo bueno es importado; (2) Instagram y TikTok son los canales dominantes de descubrimiento para el rango 18–35; (3) Liverpool, El Palacio de Hierro y MercadoLibre controlan la distribución. Para golf específicamente: México tiene 200+ clubs concentrados en CDMX, Monterrey y Guadalajara — nicho pequeño pero con alto ticket promedio.',
    competitors: [
      { name: 'ZARA Mexico', type: 'Direct', market: 'Nacional', pricing: 'Mid ($$$)', strength: 'Distribución + reconocimiento de marca', gap: 'Sin especialización deportiva' },
      { name: 'Under Armour MX', type: 'Direct', market: 'Nacional', pricing: 'Premium ($$$$)', strength: 'Reputación en performance', gap: 'Sin identidad local' },
      { name: 'Nike Golf', type: 'Direct', market: 'Nacional', pricing: 'Premium ($$$$)', strength: 'Confianza de marca global', gap: 'Caro, poco accesible' },
      { name: 'Peter Millar MX', type: 'Direct', market: 'CDMX/MTY', pricing: 'Luxury ($$$$$)', strength: 'Nicho golf lifestyle', gap: 'Precio fuera del alcance de la mayoría' },
      { name: 'FootJoy', type: 'Direct', market: 'Nacional', pricing: 'Premium ($$$$)', strength: 'Herencia en golf', gap: 'Principalmente calzado, no apparel' },
      { name: 'Liverpool marca propia', type: 'Substitute', market: 'Nacional', pricing: 'Mid ($$$)', strength: 'Presencia en retail', gap: 'Genérico, sin enfoque golf' },
      { name: 'Boutiques locales', type: 'Substitute', market: 'Local', pricing: 'Variable', strength: 'Personalización', gap: 'Sin escala ni tecnología' },
      { name: 'Importaciones Amazon/MeLi', type: 'Substitute', market: 'Nacional', pricing: 'Low-Mid ($$)', strength: 'Precio bajo', gap: 'Sin garantía de calidad ni historia de marca' },
    ],
    risks: [
      { category: 'Mercado', risk: 'Golf es un deporte nicho en México — el mercado total podría ser más pequeño de lo esperado', severity: 'Medium' },
      { category: 'Ejecución', risk: 'Lograr calidad de manufactura a precio medio sin relaciones con proveedores establecidos es difícil', severity: 'High' },
      { category: 'Financiero', risk: 'Moda = inventario inmovilizado. El stock que no se vende es pérdida directa', severity: 'High' },
      { category: 'Competitivo', risk: 'Marcas internacionales pueden bajar precios si creces lo suficiente para llamar su atención', severity: 'Medium' },
      { category: 'Mercado', risk: 'Los ciclos de tendencia en moda son cortos — la estética golf podría pasar en 2-3 temporadas', severity: 'Low' },
    ],
    recommendation: 'Oportunidad de nicho sólida — valida con una cápsula de 20 piezas antes de escalar inventario',
  },

  food: {
    globalExamples: [
      { company: 'Sweetgreen (USA)', description: 'Convirtió las ensaladas en una experiencia fast-casual premium. 200+ locales y $500M+ en ingresos haciendo dueños a los Millennials health-conscious.', model: 'Fast casual premium' },
      { company: 'Noma (Denmark)', description: 'Restaurante que reinventó la cocina nórdica y se volvió referencia mundial. Prueba de que la identidad local + ejecución premium = atención internacional.', model: 'Fine dining local identity' },
      { company: 'Chipotle (USA)', description: '$10B de marca construida sobre un concepto simple: comida fresca y personalizable. Repetibilidad + simplicidad = escala masiva.', model: 'Fast casual scale' },
      { company: 'Deliveroo / Ghost kitchens (UK)', description: 'El modelo de ghost kitchen permite lanzar conceptos de comida sin costo de local físico — pure delivery brand.', model: 'Ghost kitchen DTC' },
      { company: 'Café de Olla (Argentina)', description: 'Cadena regional de café que venció a Starbucks en su propio mercado apostando por la identidad local del café latinoamericano.', model: 'Local identity premium' },
    ],
    mexicoContext: 'La industria de food service en México vale aprox. $40B USD. QSR y delivery crecieron 35% de 2020 a 2024 impulsados por Rappi, Uber Eats y DiDi Food. Lo relevante: (1) el segmento saludable es el de más rápido crecimiento entre consumidores urbanos de 20–35 años; (2) los meal kits premium están sin servir en ciudades fuera de CDMX; (3) los consumidores mexicanos tienen alta lealtad a marcas de alimentos con una historia auténtica. El gran riesgo del sector: márgenes apretados (8–15% neto) y competencia feroz.',
    competitors: [
      { name: 'McDonald\'s Mexico', type: 'Substitute', market: 'Nacional', pricing: 'Low ($$)', strength: 'Ubicuidad + familiaridad', gap: 'Poco saludable, sin historia' },
      { name: 'Toks', type: 'Substitute', market: 'Nacional', pricing: 'Mid ($$$)', strength: 'Marca mexicana + red amplia', gap: 'Menú genérico, sin innovación' },
      { name: 'Chipotle MX', type: 'Direct', market: 'CDMX', pricing: 'Mid ($$$)', strength: 'Reconocimiento de marca', gap: 'Concepto americano, sin identidad local' },
      { name: 'Taquerías locales', type: 'Substitute', market: 'Local', pricing: 'Low ($)', strength: 'Precio + autenticidad', gap: 'Sin escalabilidad ni marca' },
      { name: 'Uber Eats / Rappi brands', type: 'Substitute', market: 'Urbano', pricing: 'Variable', strength: 'Conveniencia', gap: 'Sin experiencia física' },
      { name: 'Sanborns', type: 'Indirect', market: 'Nacional', pricing: 'Mid ($$$)', strength: 'Institución + afluencia', gap: 'Lento, menú desactualizado' },
      { name: 'Ghost kitchen concepts', type: 'Direct', market: 'Urbano', pricing: 'Mid ($$$)', strength: 'Bajo overhead', gap: 'Sin construcción de marca física' },
      { name: 'OXXO comida fresca', type: 'Substitute', market: 'Nacional', pricing: 'Low ($$)', strength: 'Conveniencia + alcance', gap: 'No es una experiencia gastronómica' },
    ],
    risks: [
      { category: 'Ejecución', risk: 'Inocuidad alimentaria y consistencia de producto — un incidente puede destruir una marca', severity: 'High' },
      { category: 'Financiero', risk: 'Márgenes del sector son 8–15% neto — el breakeven requiere volumen, no solo buen producto', severity: 'High' },
      { category: 'Mercado', risk: 'Los gustos del consumidor cambian rápido — un concepto dependiente de tendencias tiene ventana de 18–24 meses', severity: 'Medium' },
      { category: 'Competitivo', risk: 'Barreras de entrada bajas — una buena idea se copia en 6–12 meses', severity: 'High' },
      { category: 'Ejecución', risk: 'El staffing es consistentemente el reto operativo #1 en F&B mexicano', severity: 'Medium' },
    ],
    recommendation: 'Valida con un pop-up o ghost kitchen antes de comprometerte con un local físico',
  },

  tech: {
    globalExamples: [
      { company: 'Notion (USA)', description: 'Desplazó a decenas de herramientas especializadas apostando por simplicidad y flexibilidad. $10B de valuación, crecimiento principalmente orgánico.', model: 'Horizontal SaaS' },
      { company: 'Duolingo (USA)', description: '500M usuarios aprendiendo idiomas con gamificación. Prueba de que free + delightful convierte a escala masiva. $400M en ingresos.', model: 'Freemium consumer' },
      { company: 'Nubank (Brazil)', description: 'Banco digital que crackeó el mercado de LATAM. 90M+ clientes. Prueba de que los mercados de LATAM recompensan a quien digitaliza industrias con mucha fricción.', model: 'Neobank/fintech' },
      { company: 'Kavak (Mexico)', description: 'Startup mexicana que digitalizó la compra-venta de autos usados — valuación de $8.7B. El caso más obvio de que oportunidades enormes viven en mercados fragmentados e informales.', model: 'Marketplace + fintech' },
      { company: 'Linear (Denmark)', description: 'Bootstrappeó hasta $35M ARR construyendo una herramienta genuinamente mejor para un nicho frustrado. Calidad + enfoque > equipo masivo.', model: 'Vertical SaaS' },
    ],
    mexicoContext: 'La economía digital de México llegó a $40B USD en 2024 — la de más rápido crecimiento en LATAM. Datos clave: (1) 100M+ usuarios de internet, 88% mobile-first; (2) el B2B SaaS está significativamente sub-penetrado comparado con Brasil — hay una ventana de oportunidad grande; (3) CDMX y Monterrey son los principales hubs tech con pools de talento crecientes; (4) los SMBs mexicanos tienen bajo gasto en software por empleado vs. US/EU — el costo de educación al cliente es real.',
    competitors: [
      { name: 'Notion', type: 'Substitute', market: 'Global/MX', pricing: 'Freemium', strength: 'Ecosistema + marca', gap: 'No especializado' },
      { name: 'Monday.com', type: 'Substitute', market: 'Global/MX', pricing: 'Premium ($$$$)', strength: 'Ventas enterprise', gap: 'Complejo, caro para SMBs' },
      { name: 'Agencias de dev locales', type: 'Substitute', market: 'Nacional', pricing: 'Variable', strength: 'Personalización', gap: 'Caro, lento' },
      { name: 'ChatGPT / Claude', type: 'Indirect', market: 'Global', pricing: 'Freemium', strength: 'Utilidad de IA general', gap: 'No es una herramienta enfocada' },
      { name: 'Konfío', type: 'Direct', market: 'México', pricing: 'B2B', strength: 'Marca local fuerte + capital', gap: 'Enfocado en finanzas, no general' },
      { name: 'Clip', type: 'Indirect', market: 'México', pricing: 'Transaccional', strength: 'Infraestructura de pagos', gap: 'Solo pagos' },
      { name: 'Airtable', type: 'Substitute', market: 'Global/MX', pricing: 'Mid ($$-$$$)', strength: 'Modelo de datos flexible', gap: 'Curva de aprendizaje alta' },
      { name: 'Excel / Google Sheets', type: 'Substitute', market: 'Global', pricing: 'Free-Low', strength: 'Ubicuidad', gap: 'No escala, sin automatización' },
    ],
    risks: [
      { category: 'Competitivo', risk: 'Las plataformas grandes pueden agregar tu feature en un product update', severity: 'High' },
      { category: 'Ejecución', risk: 'Mantener un producto tech requiere inversión de ingeniería constante', severity: 'Medium' },
      { category: 'Mercado', risk: 'Los SMBs mexicanos tienen baja adopción histórica de software — el costo de educación es alto', severity: 'Medium' },
      { category: 'Financiero', risk: 'Los negocios SaaS tardan 12–18 meses en llegar al breakeven — el capital inicial es esencial', severity: 'High' },
      { category: 'Ejecución', risk: 'El talento técnico en México es cada vez más caro y difícil de contratar', severity: 'Medium' },
    ],
    recommendation: 'Construye un MVP enfocado en un solo workflow específico — las herramientas generalistas pierden con las especializadas en etapa temprana',
  },

  sports: {
    globalExamples: [
      { company: 'Peloton (USA)', description: 'Convirtió el ciclismo en casa en un negocio de suscripción de $4B. Hardware + contenido + comunidad = lock-in premium.', model: 'Hardware + subscription' },
      { company: 'ClassPass (USA)', description: 'Agregador de gimnasios que creó una nueva categoría: la suscripción de fitness que funciona en múltiples estudios. Adquirida por Mindbody en $500M.', model: 'Marketplace subscription' },
      { company: 'Decathlon (France)', description: 'Hizo el equipo deportivo de calidad accesible con integración vertical. $15B en ingresos — estrategia de marca propia en 80+ deportes.', model: 'Vertical integration retail' },
      { company: 'Freeletics (Germany)', description: 'App de coaching fitness con IA y 10M+ usuarios. Prueba de que los programas personalizados a escala son un mercado enorme desatendido.', model: 'AI coaching freemium' },
      { company: 'SidelineSwap (USA)', description: 'Marketplace de equipamiento deportivo de segunda mano — resuelve el problema exacto de que el equipo bueno es caro y la gente lo abandona rápido.', model: 'Resale marketplace' },
    ],
    mexicoContext: 'El mercado de deportes y fitness en México vale $2.3B USD (2024), creciendo al 8% anual. Después del COVID la cultura fitness se aceleró: membresías de gimnasio subieron 40% desde 2021 y los eventos de running se agotan meses antes. Para golf específicamente: México tiene 200+ clubs pero el mercado de reventa de equipo es informal y fragmentado — nadie lo ha digitalizado bien. El perfil principal del consumidor: profesional CDMX de 28–45, estudiante universitario en Monterrey, familia health-conscious en Guadalajara.',
    competitors: [
      { name: 'Decathlon Mexico', type: 'Direct', market: 'Nacional', pricing: 'Low-Mid ($$)', strength: 'Precio + amplitud de catálogo', gap: 'Sin especialización ni premium' },
      { name: 'Golf Galaxy (US)', type: 'Direct', market: 'USA/Online', pricing: 'Premium', strength: 'Especialista en golf', gap: 'Sin presencia en MX' },
      { name: 'Pro Golf Discount', type: 'Direct', market: 'CDMX', pricing: 'Mid-Premium', strength: 'Especialista local en golf', gap: 'Stock limitado, sin marca' },
      { name: 'MercadoLibre golf', type: 'Substitute', market: 'Nacional', pricing: 'Variable', strength: 'Conveniencia + precio', gap: 'Sin curación ni confianza de calidad' },
      { name: 'Amazon.com.mx', type: 'Substitute', market: 'Nacional', pricing: 'Variable', strength: 'Selección + logística', gap: 'Sin comunidad ni historia' },
      { name: 'Tiendas de clubs de golf', type: 'Substitute', market: 'Local', pricing: 'Premium', strength: 'Audiencia cautiva', gap: 'Selección pequeña, margen alto para el club' },
      { name: 'Nike Golf DTC', type: 'Direct', market: 'Nacional', pricing: 'Premium ($$$$)', strength: 'Marca global', gap: 'Caro, genérico' },
      { name: 'Callaway Golf', type: 'Direct', market: 'Nacional', pricing: 'Premium ($$$$)', strength: 'Herencia en equipo', gap: 'Marca de equipo, no lifestyle' },
    ],
    risks: [
      { category: 'Mercado', risk: 'Los mercados de reventa de equipo deportivo son fragmentados y la confianza es difícil de construir sin verificación', severity: 'Medium' },
      { category: 'Ejecución', risk: 'El equipo deportivo requiere inspección física — el modelo puramente digital tiene fricción', severity: 'Medium' },
      { category: 'Competitivo', risk: 'Amazon y MercadoLibre pueden bajar precios en cualquier categoría de producto', severity: 'High' },
      { category: 'Financiero', risk: 'Los modelos basados en inventario requieren capital y tienen riesgo de depreciación', severity: 'High' },
      { category: 'Mercado', risk: 'El nicho de golf crece pero lentamente — puede no soportar múltiples competidores locales', severity: 'Low' },
    ],
    recommendation: 'Prueba con modelo de consignación primero — reduce riesgo de inventario mientras validas el willingness to pay',
  },

  education: {
    globalExamples: [
      { company: 'Duolingo (USA)', description: '500M usuarios. Demostró que free + engaging supera a expensive + complete en educación para el consumidor.', model: 'Freemium gamified' },
      { company: 'Platzi (Colombia)', description: 'La plataforma de educación tech líder en LATAM. Construyó comunidad + credenciales que los empleadores reconocen. 5M+ estudiantes.', model: 'Community-led subscription' },
      { company: 'Coursera (USA)', description: 'Partnerships con universidades a escala — hizo accesibles cursos de Stanford y MIT globalmente por $50/mes. $600M en ingresos.', model: 'Platform B2C/B2B' },
      { company: 'MasterClass (USA)', description: 'Educación premium con instructores celebridad a $180/año. Posicionó el aprendizaje como entretenimiento — completamente diferente al contenido académico.', model: 'Premium entertainment-education' },
      { company: 'Khan Academy (USA)', description: 'Educación K-12 gratuita llegando a 135M usuarios. Demostró que el contenido educativo de alta calidad escala globalmente sin paywall.', model: 'Free non-profit' },
    ],
    mexicoContext: 'El mercado edtech de México llegó a $1.2B en 2024. Datos relevantes: (1) el 60% de la fuerza laboral mexicana carece de habilidades digitales — mercado enorme para upskilling; (2) el training corporativo B2B es el segmento de más rápida monetización — los departamentos de RH tienen presupuesto; (3) Platzi, Crehana y Coursera dominan el segmento universitario — la diferenciación requiere nicho específico. La mejor oportunidad: habilidades vocacionales con resultados de ingreso claros (código, marketing digital, software de contabilidad).',
    competitors: [
      { name: 'Platzi', type: 'Direct', market: 'LATAM', pricing: 'Subscription ($$$)', strength: 'Comunidad + marca', gap: 'Amplio, no especializado' },
      { name: 'Crehana', type: 'Direct', market: 'LATAM', pricing: 'Subscription ($$)', strength: 'Biblioteca de contenido en español', gap: 'Solo habilidades genéricas' },
      { name: 'Coursera', type: 'Indirect', market: 'Global', pricing: 'Freemium', strength: 'Partnerships con universidades', gap: 'English-heavy, certificados caros' },
      { name: 'YouTube + contenido gratis', type: 'Substitute', market: 'Global', pricing: 'Free', strength: 'Contenido infinito', gap: 'Sin estructura ni credenciales' },
      { name: 'UNAM / Tec online', type: 'Substitute', market: 'México', pricing: 'Low-Mid', strength: 'Confianza institucional', gap: 'Lento, no enfocado en carrera' },
      { name: 'LinkedIn Learning', type: 'Indirect', market: 'Global/MX', pricing: 'Subscription', strength: 'Integración con perfil LinkedIn', gap: 'Contenido genérico, US-centric' },
      { name: 'Conalep / CECATI', type: 'Substitute', market: 'México', pricing: 'Free-Low', strength: 'Respaldo gubernamental', gap: 'Presencial, currículo desactualizado' },
      { name: 'Udemy', type: 'Direct', market: 'Global', pricing: 'One-time low cost', strength: 'Precio + selección', gap: 'Calidad inconsistente, sin comunidad' },
    ],
    risks: [
      { category: 'Competitivo', risk: 'Platzi y Crehana tienen 5+ años de ventaja y lealtad de marca fuerte en LATAM', severity: 'High' },
      { category: 'Ejecución', risk: 'Crear contenido es caro y necesita actualizarse constantemente para mantenerse relevante', severity: 'Medium' },
      { category: 'Mercado', risk: 'La monetización es difícil — los usuarios esperan contenido gratis y son resistentes a paywalls', severity: 'High' },
      { category: 'Financiero', risk: 'El costo de adquisición de clientes (CAC) en educación es alto — los ads de Google/Meta son caros', severity: 'Medium' },
      { category: 'Ejecución', risk: 'Las tasas de completación de cursos online son consistentemente menores al 15% — el engagement es difícil', severity: 'Medium' },
    ],
    recommendation: 'Encuentra una habilidad profesional específica sin buen contenido en español — profundiza en un tema antes de expandir',
  },

  service: {
    globalExamples: [
      { company: 'Fiverr (Israel)', description: 'Mercadizó los servicios freelance globalmente — convirtió el trabajo por gig en una plataforma de $300M+. Redujo la fricción casi a cero para los compradores.', model: 'Marketplace two-sided' },
      { company: 'Rappi (Colombia)', description: 'Empezó como app de comida, se convirtió en el super-app de servicios en LATAM. $5.25B de valuación resolviendo last-mile delivery a escala.', model: 'On-demand super-app' },
      { company: 'Toptal (USA)', description: 'Marketplace de talento tech premium — solo el top 3% de freelancers. Precios más altos, calidad más alta, menos fricción para clientes enterprise.', model: 'Curated marketplace' },
      { company: 'TaskRabbit (USA)', description: 'Plataforma de servicios del hogar on-demand. Adquirida por IKEA por ~$500M. Prueba de que los servicios locales escalan con el modelo correcto.', model: 'On-demand local services' },
      { company: 'Better.com (USA)', description: 'Digitalizó las solicitudes de hipoteca — eliminó agentes y fricción. Levantó $1B resolviendo un proceso roto de 30 años.', model: 'Process digitization' },
    ],
    mexicoContext: 'El sector servicios representa el 64% del PIB de México — el segmento económico más grande. Las oportunidades: (1) los servicios B2B están significativamente sin digitalizar — la mayoría de las compras entre SMBs siguen siendo por teléfono o WhatsApp; (2) el mercado de servicios profesionales ($12B+) crece al 7% anual; (3) los servicios del hogar on-demand (limpieza, reparaciones, belleza) crecieron 45% post-COVID. Riesgo clave: los negocios de servicios tienen alto churn si las relaciones con clientes dependen de una persona y no de la marca.',
    competitors: [
      { name: 'Freelancers en Facebook', type: 'Substitute', market: 'Nacional', pricing: 'Low ($)', strength: 'Baja fricción, familiar', gap: 'Cero garantía de calidad' },
      { name: 'Workana', type: 'Direct', market: 'LATAM', pricing: 'Comisión', strength: 'Plataforma establecida', gap: 'Genérico, no especializado' },
      { name: 'Fiverr', type: 'Direct', market: 'Global', pricing: 'Variable', strength: 'Marca + alcance global', gap: 'US-centric, barrera de idioma' },
      { name: 'LinkedIn ProFinder', type: 'Indirect', market: 'Global', pricing: 'Premium', strength: 'Confianza profesional + red', gap: 'No es un marketplace' },
      { name: 'Agencias tradicionales', type: 'Substitute', market: 'Nacional', pricing: 'High ($$$$)', strength: 'Confianza + responsabilidad', gap: 'Lento, caro' },
      { name: 'Rappi Partners', type: 'Indirect', market: 'Urbano MX', pricing: 'Comisión', strength: 'Infraestructura de distribución', gap: 'Solo delivery físico' },
      { name: 'Redes informales de WhatsApp', type: 'Substitute', market: 'Nacional', pricing: 'Variable', strength: 'Confianza personal, cero overhead', gap: 'Sin descubrimiento, sin escala' },
      { name: 'Thumbtack (USA)', type: 'Direct', market: 'USA', pricing: 'Lead-based', strength: 'Enfoque en servicios del hogar', gap: 'Sin presencia en MX' },
    ],
    risks: [
      { category: 'Ejecución', risk: 'El control de calidad es difícil cuando el servicio lo entregan personas, no software', severity: 'High' },
      { category: 'Mercado', risk: 'Los consumidores mexicanos prefieren contactos personales conocidos sobre plataformas para servicios', severity: 'Medium' },
      { category: 'Financiero', risk: 'Los negocios de servicios tienen márgenes bajos a menos que se sistematicen y escalen sin agregar headcount', severity: 'Medium' },
      { category: 'Competitivo', risk: 'La competencia informal (WhatsApp, Facebook) es difícil de vencer en precio', severity: 'Medium' },
      { category: 'Ejecución', risk: 'El churn es alto si la calidad del servicio depende de una persona que puede irse', severity: 'High' },
    ],
    recommendation: 'Sistematiza la entrega del servicio antes de escalar — documenta el playbook para que la calidad no dependa de ti',
  },

  general: {
    globalExamples: [
      { company: 'Airbnb (USA)', description: 'Convirtió habitaciones sin usar en un negocio de hospitalidad de $75B. Su producto principal era la confianza, no el hospedaje.', model: 'Marketplace two-sided' },
      { company: 'Dollar Shave Club (USA)', description: 'Disrumpió el monopolio de rasuradoras de $6B de Gillette con una suscripción de $1 y un video viral en YouTube. Adquirida por Unilever en $1B.', model: 'DTC subscription' },
      { company: 'Warby Parker (USA)', description: 'Digitalizó la óptica — una categoría de $5B controlada por un monopolio. Construida sobre una sola insight clave: los lentes son caros por monopolio, no por calidad.', model: 'DTC challenger brand' },
      { company: 'Rappi (Colombia)', description: 'Empezó como app de delivery de comida en Bogotá, hoy es un super-app de $5B en 9 países de LATAM. Creció resolviendo un dolor real y expandiendo la superficie.', model: 'On-demand LATAM' },
      { company: 'Kavak (Mexico)', description: 'Digitalizó la compra-venta de autos usados en México — uno de los mercados más fragmentados e informales. Valuación de $8.7B. Prueba de que los mercados informales son oportunidades enormes.', model: 'Marketplace + fintech' },
    ],
    mexicoContext: 'México es la segunda economía más grande de LATAM ($1.4T PIB en 2024) con una clase media creciente de 45M+ personas. Insights clave: (1) la penetración de e-commerce llegó al 38% en 2024, aún por debajo del US (75%) — hay una brecha digital comercial grande; (2) el gasto del consumidor está concentrado en CDMX (30% del gasto nacional), Guadalajara y Monterrey; (3) la economía informal representa ~25% del PIB — negocios que formalizan mercados informales tienen ventajas estructurales; (4) muchas transacciones todavía ocurren por WhatsApp y en efectivo — conectar lo digital con lo físico es un unlock real.',
    competitors: [
      { name: 'Incumbentes establecidos', type: 'Direct', market: 'Nacional', pricing: 'Mid-High', strength: 'Distribución + confianza de marca', gap: 'Lentos para innovar, alto overhead' },
      { name: 'Amazon Mexico', type: 'Indirect', market: 'Nacional', pricing: 'Variable', strength: 'Logística + selección', gap: 'Sin especialización ni servicio personal' },
      { name: 'MercadoLibre', type: 'Indirect', market: 'Nacional', pricing: 'Variable', strength: 'Alcance en LATAM + pagos', gap: 'Commoditizado, problemas de confianza' },
      { name: 'Operadores informales locales', type: 'Substitute', market: 'Local', pricing: 'Low', strength: 'Precio + relaciones personales', gap: 'Sin escala, sin consistencia' },
      { name: 'Comercio por WhatsApp', type: 'Substitute', market: 'Nacional', pricing: 'Low', strength: 'Cero fricción', gap: 'Sin descubrimiento, sin infraestructura de confianza' },
      { name: 'Marcas importadas US/EU', type: 'Direct', market: 'Urbano MX', pricing: 'Premium', strength: 'Caché de marca internacional', gap: 'Caro, sin identidad local' },
      { name: 'Rappi/Uber marketplace', type: 'Indirect', market: 'Urbano', pricing: 'Comisión', strength: 'Infraestructura de distribución', gap: 'Sin especialización' },
      { name: 'Retail tradicional', type: 'Substitute', market: 'Nacional', pricing: 'Mid', strength: 'Presencia física + familiaridad', gap: 'Lento, overhead alto, horarios limitados' },
    ],
    risks: [
      { category: 'Mercado', risk: 'El tamaño de mercado puede ser menor al estimado — siempre valida con intención real de compra, no encuestas', severity: 'Medium' },
      { category: 'Ejecución', risk: 'Construir el equipo correcto es consistentemente la parte más difícil de cualquier startup', severity: 'High' },
      { category: 'Financiero', risk: 'Runway: la mayoría de las startups se quedan sin dinero antes de encontrar product-market fit', severity: 'High' },
      { category: 'Competitivo', risk: 'Los incumbentes grandes pueden copiar tu producto una vez que demuestres la demanda', severity: 'Medium' },
      { category: 'Mercado', risk: 'Los consumidores mexicanos son leales a sus marcas — los costos de cambio y la inercia son barreras reales', severity: 'Low' },
    ],
    recommendation: 'Corre un test de 30 días con pago real antes de construir — si consigues que 10 personas paguen, tienes algo real',
  },
};

// ── Main generator function ─────────────────────────────────────────────────

export function generateResearch(ideaText) {
  const category = detectCategory(ideaText);
  const template = TEMPLATES[category] || TEMPLATES.general;

  const confidenceLevels = ['Medium', 'High', 'Medium', 'High', 'Low'];
  const confidence = confidenceLevels[Math.floor(Math.random() * confidenceLevels.length)];

  return {
    category: category.charAt(0).toUpperCase() + category.slice(1),
    globalExamples: template.globalExamples,
    mexicoContext: template.mexicoContext,
    competitors: template.competitors,
    risks: template.risks,
    recommendation: template.recommendation,
    confidence,
  };
}

// Datos maestros del menú Trigu's Bakery
// Precios actualizados con la Lista Oficial de Precios y carta ilustrada

const DEFAULT_CONFIG = {
  restaurantName: "Trigu's Bakery",
  slogan: "¡Date un gusto!",
  whatsappNumber: "584123714136", // +584123714136
  whatsappDisplay: "+58 412-3714136",
  instagram: "@trigusbakery",
  deliveryBasePrice: 2.50,
  currencySymbol: "$",
  bcvRate: 45.20, // Tasa Oficial del día Banco Central de Venezuela
  exchangeRateBs: 45.20,
  bcvLastUpdated: "Hoy",
  colors: {
    primary: "#c81d25",
    primaryHover: "#a5141b",
    secondary: "#e6b800",
    bgDark: "#111115",
    cardBg: "#1a1a20",
    textLight: "#f5f5f7"
  },
  heroSlides: [
    {
      title: "Parrillas Premium & Cortes Selectos",
      subtitle: "Carnes jugosas al grill con contornos tradicionales",
      image: "assets/img/food-parrilla-combo.jpg",
      tag: "Especialidad al Grill",
      categoryTarget: "carnes"
    },
    {
      title: "Hamburguesas Gourmet",
      subtitle: "En pan artesanal de batata y doble proteína con papas fritas",
      image: "assets/img/food-burger.jpg",
      tag: "Favorito de la Casa",
      categoryTarget: "hamburguesas"
    },
    {
      title: "Pizzas Tradicionales & Big Slice",
      subtitle: "Masa crujiente, queso fundido y los mejores ingredientes",
      image: "assets/img/food-pizza.jpg",
      tag: "Recién Horneadas",
      categoryTarget: "pizzas"
    },
    {
      title: "Combos de Pollo Asado",
      subtitle: "Pollo dorado con hallaquitas de chicharrón, guasacaca y refresco",
      image: "assets/img/food-pollo.jpg",
      tag: "Ideal para la Familia",
      categoryTarget: "pollo_asado"
    },
    {
      title: "Cachapas Tradicionales",
      subtitle: "Con abundante queso de mano fresco o crocante pork belly",
      image: "assets/img/food-cachapa.jpg",
      tag: "Sabor Criollo",
      categoryTarget: "cachapas"
    },
    {
      title: "Malteadas & Dulces Tentaciones",
      subtitle: "Oreo, Pirulín, Samba, Brownie y Frappuccinos irresistibles",
      image: "assets/img/food-malteada.jpg",
      tag: "Endulza tu día",
      categoryTarget: "bebidas"
    }
  ]
};

const CATEGORIES = [
  { id: "all", name: "Todos", icon: "✨" },
  { id: "desayunos", name: "Desayunos", icon: "🍳" },
  { id: "snacks", name: "Snacks & Entradas", icon: "🍟" },
  { id: "sandwiches", name: "Paninis & Sandwiches", icon: "🥪" },
  { id: "hamburguesas", name: "Hamburguesas", icon: "🍔" },
  { id: "pastas", name: "Pastas", icon: "🍝" },
  { id: "pizzas", name: "Pizzas", icon: "🍕" },
  { id: "ensaladas", name: "Ensaladas", icon: "🥗" },
  { id: "carnes", name: "Carnes & Parrillas", icon: "🥩" },
  { id: "pollo_asado", name: "Pollo Asado", icon: "🍗" },
  { id: "cachapas", name: "Cachapas", icon: "🌽" },
  { id: "parrilleros_ricci", name: "Cortes Ricci", icon: "🔥" },
  { id: "chicharron", name: "Chicharrón & Pork", icon: "🥓" },
  { id: "bebidas", name: "Bebidas & Cafés", icon: "🥤" },
  { id: "extras", name: "Extras & Acompañantes", icon: "➕" }
];

const INITIAL_PRODUCTS = [
  // --- DESAYUNOS ---
  {
    id: "des-01",
    name: "Desayuno Criollo",
    category: "desayunos",
    description: "Carne mechada, pollo o carne molida, caraotas negras, tajadas, huevo acompañado de arepa y queso blanco rallado.",
    price: 6.00,
    image: "assets/img/food-waffles.jpg",
    badge: "Tradicional",
    available: true,
    options: {
      type: "single",
      title: "Elige tu proteína:",
      choices: ["Carne Mechada", "Pollo", "Carne Molida"]
    }
  },
  {
    id: "des-02",
    name: "Arepas Personalizadas",
    category: "desayunos",
    description: "Arepas con dos contornos de tu preferencia para crear tu combinación ideal.",
    price: 5.00,
    image: "assets/img/food-waffles.jpg",
    available: true
  },
  {
    id: "des-03",
    name: "Set de Arepas",
    category: "desayunos",
    description: "Ración completa de arepas calientitas listas para compartir.",
    price: 7.99,
    image: "assets/img/food-waffles.jpg",
    available: true
  },
  {
    id: "des-04",
    name: "Waffle Americano",
    category: "desayunos",
    description: "Waffle o pan de sandwich tostado, relleno de jamón y queso, acompañado de huevo frito, tocineta y miel o mermelada a elección.",
    price: 6.00,
    image: "assets/img/food-waffles.jpg",
    badge: "Popular",
    available: true
  },
  {
    id: "des-05",
    name: "Panqueques Hot Cakes",
    category: "desayunos",
    description: "Esponjosos hot cakes servidos con sirope y mantequilla.",
    price: 4.00,
    image: "assets/img/food-waffles.jpg",
    available: true
  },
  {
    id: "des-06",
    name: "Omelette Clásico",
    category: "desayunos",
    description: "Jamón y queso fundido, combinación perfecta de sabor y cremosidad.",
    price: 5.00,
    image: "assets/img/food-waffles.jpg",
    available: true
  },
  {
    id: "des-07",
    name: "Omelette Tomate y Cebolla Sofrito",
    category: "desayunos",
    description: "Sofrito casero de tomate y cebolla, toque jugoso y lleno de sabor.",
    price: 5.50,
    image: "assets/img/food-waffles.jpg",
    available: true
  },
  {
    id: "des-08",
    name: "Omelette Crema de Champiñón y Tocineta",
    category: "desayunos",
    description: "Suave crema de champiñones con tocineta crocante, reconfortante.",
    price: 6.00,
    image: "assets/img/food-waffles.jpg",
    available: true
  },
  {
    id: "des-09",
    name: "Omelette Champiñón y Aceitunas",
    category: "desayunos",
    description: "Sofrito con cebolla, pimentón dulce, champiñón fresco y aceitunas.",
    price: 6.00,
    image: "assets/img/food-waffles.jpg",
    available: true
  },

  // --- SNACKS Y ENTRADAS ---
  {
    id: "snk-01",
    name: "Nachos (250 g)",
    category: "snacks",
    description: "250 gramos de crujientes nachos bañados en queso fundido y pico de gallo.",
    price: 8.50,
    image: "assets/img/food-nachos.jpg",
    badge: "Para compartir",
    available: true
  },
  {
    id: "snk-02",
    name: "Patacones Rellenos",
    category: "snacks",
    description: "Canastas de plátano verde rellenas de carne mechada, pollo, queso, pico de gallo y guacamole.",
    price: 7.50,
    image: "assets/img/food-nachos.jpg",
    badge: "Favorito",
    available: true
  },
  {
    id: "snk-03",
    name: "Tenders de Pollo (200 g)",
    category: "snacks",
    description: "200 g de crujientes tiras de pollo empanizadas, acompañadas de papas fritas y dip especial de la casa.",
    price: 7.00,
    image: "assets/img/food-tenders.jpg",
    available: true
  },
  {
    id: "snk-04",
    name: "Ración de Papas Fritas",
    category: "snacks",
    description: "Generosa porción de papas doradas y crujientes con toque de sal marina.",
    price: 5.00,
    image: "assets/img/food-tenders.jpg",
    available: true
  },
  {
    id: "snk-05",
    name: "Mini Bandeja Charcutera",
    category: "snacks",
    description: "Selección especial de embutidos y quesos nacionales e importados de primera.",
    price: 20.00,
    image: "assets/img/food-panini.jpg",
    badge: "Premium",
    available: true
  },
  {
    id: "snk-06",
    name: "Tequeños Tradicionales (8 Und)",
    category: "snacks",
    description: "Ocho unidades rellenas de queso mozzarella suave en una masa dorada especial.",
    price: 5.00,
    image: "assets/img/food-tenders.jpg",
    badge: "Infaltable",
    available: true
  },
  {
    id: "snk-07",
    name: "Dedos de Mozzarella (5 Und)",
    category: "snacks",
    description: "5 unidades de crujientes deditos empanizados rellenos de mozzarella con salsa ranch.",
    price: 6.00,
    image: "assets/img/food-tenders.jpg",
    available: true
  },
  {
    id: "snk-08",
    name: "Ración de Pan de Ajo",
    category: "snacks",
    description: "Pan tostado al horno con mantequilla aromatizada de ajo y perejil.",
    price: 2.00,
    image: "assets/img/food-pasta.jpg",
    available: true
  },

  // --- PANINIS Y SANDWICHES ---
  {
    id: "pan-01",
    name: "Panini Capresa",
    category: "sandwiches",
    description: "Tomates confitados al horno, mozzarella de búfala fresca, salsa pesto y aceite de oliva virgen extra.",
    price: 6.00,
    image: "assets/img/food-panini.jpg",
    available: true
  },
  {
    id: "pan-02",
    name: "Sandwich Cubano",
    category: "sandwiches",
    description: "Lonjas de pernil Trigus, jamón, queso gouda derretido, pepinillos, mostaza y auténtica salsa cubana.",
    price: 7.00,
    image: "assets/img/food-panini.jpg",
    badge: "Recomendado",
    available: true
  },
  {
    id: "pan-03",
    name: "Chicken Crispy Panini",
    category: "sandwiches",
    description: "Pechuga de pollo crujiente empanizada con queso fundido, rodajas de tomate fresco y lechuga.",
    price: 6.00,
    image: "assets/img/food-panini.jpg",
    available: true
  },
  {
    id: "pan-04",
    name: "Croque Francés",
    category: "sandwiches",
    description: "Pan gratinado con mozzarella y salsa bechamel, jamón ahumado, queso holandés y huevos estrellados.",
    price: 6.00,
    image: "assets/img/food-panini.jpg",
    available: true
  },
  {
    id: "pan-05",
    name: "Sandwich Gallego",
    category: "sandwiches",
    description: "Receta tradicional con selectos cortes y condimentos al estilo gallego.",
    price: 7.00,
    image: "assets/img/food-panini.jpg",
    available: true
  },
  {
    id: "pan-06",
    name: "Sandwich Italiano",
    category: "sandwiches",
    description: "Combinación de fiambres italianos, queso fundido y aderezos mediterráneos.",
    price: 6.50,
    image: "assets/img/food-panini.jpg",
    available: true
  },
  {
    id: "pan-07",
    name: "Serranito Verde",
    category: "sandwiches",
    description: "Pan untado con espinaca y ricota, lonjas de jamón serrano curado y un toque de aceite de oliva.",
    price: 6.50,
    image: "assets/img/food-panini.jpg",
    available: true
  },
  {
    id: "pan-08",
    name: "Club House Pequeño",
    category: "sandwiches",
    description: "Porción de pollo o pernil, jamón, queso amarillo, tocineta, huevo, lechuga, tomate, papas naturales y tequeños.",
    price: 9.00,
    image: "assets/img/food-panini.jpg",
    available: true
  },
  {
    id: "pan-09",
    name: "Club House Mediano",
    category: "sandwiches",
    description: "Versión mediana perfecta para dos personas. Con papas fritas y tequeños.",
    price: 16.00,
    image: "assets/img/food-panini.jpg",
    badge: "Para 2",
    available: true
  },
  {
    id: "pan-10",
    name: "Club House Grande",
    category: "sandwiches",
    description: "Super porción para toda la familia o amigos con abundantes papas y tequeños.",
    price: 28.00,
    image: "assets/img/food-panini.jpg",
    badge: "Familiar",
    available: true
  },

  // --- HAMBURGUESAS (En pan de batata con papas fritas) ---
  {
    id: "brg-01",
    name: "Trigu's Sweet & Pepper BBQ",
    category: "hamburguesas",
    description: "Pan de batata artesanal, doble carne jugosa, queso cheddar, tocineta crujiente, cebolla caramelizada, salsa BBQ picantosa y papas fritas.",
    price: 7.00,
    image: "assets/img/food-burger.jpg",
    badge: "Especialidad",
    available: true
  },
  {
    id: "brg-02",
    name: "Trigu's Blue San Diego",
    category: "hamburguesas",
    description: "Pan de batata, doble carne, queso cheddar, tocineta, cebolla caramelizada, crema de queso azul y papas fritas.",
    price: 7.50,
    image: "assets/img/food-burger.jpg",
    badge: "Gourmet",
    available: true
  },
  {
    id: "brg-03",
    name: "Trigu's Mañongo",
    category: "hamburguesas",
    description: "Pan de batata, doble carne, queso cheddar y mozzarella, mermelada de pimiento con queso crema, salsa de tocineta y papas fritas.",
    price: 7.00,
    image: "assets/img/food-burger.jpg",
    available: true
  },
  {
    id: "brg-04",
    name: "Trigu's Bacon Tocuyito",
    category: "hamburguesas",
    description: "Pan de batata, doble carne o pollo a la plancha, queso cheddar, doble tocineta, pepinillo agridulce, crema de tocineta y papas fritas.",
    price: 7.50,
    image: "assets/img/food-burger.jpg",
    badge: "Top Seller",
    available: true,
    options: {
      type: "single",
      title: "Proteína a elegir:",
      choices: ["Doble Carne", "Pollo a la Plancha"]
    }
  },
  {
    id: "brg-05",
    name: "Trigu's Banaven",
    category: "hamburguesas",
    description: "Pan artesanal de batata, jugosa carne de res premium, queso fundido, vegetales y salsa especial de la casa con papas.",
    price: 7.00,
    image: "assets/img/food-burger.jpg",
    available: true
  },
  {
    id: "brg-06",
    name: "Trigu's Aveirense",
    category: "hamburguesas",
    description: "Pan de batata, doble carne o pollo crispy, queso cheddar, tocineta, lechuga fresca, tomate, pepinillo, mayonesa y salsa americana con papas.",
    price: 7.50,
    image: "assets/img/food-burger.jpg",
    available: true,
    options: {
      type: "single",
      title: "Proteína a elegir:",
      choices: ["Doble Carne", "Pollo Crispy"]
    }
  },
  {
    id: "brg-07",
    name: "Trigu's Chicken Pepper Parral",
    category: "hamburguesas",
    description: "Pan de batata, doble pollo (a la plancha o crispy), queso cheddar, lechuga, tomate, pepinillo, salsa mayo-spicy y papas fritas.",
    price: 7.00,
    image: "assets/img/food-burger.jpg",
    available: true,
    options: {
      type: "single",
      title: "Preparación del pollo:",
      choices: ["Pollo Crispy", "Pollo a la Plancha"]
    }
  },
  {
    id: "brg-08",
    name: "Trigu's César Añil",
    category: "hamburguesas",
    description: "Pan de batata, doble carne o pollo, queso fundido, lechuga crujiente, queso parmesano y salsa césar artesanal con papas fritas.",
    price: 7.00,
    image: "assets/img/food-burger.jpg",
    available: true
  },

  // --- PASTAS ---
  {
    id: "pst-01",
    name: "Fetuccinis a la Bologñesa",
    category: "pastas",
    description: "La tradicional salsa bologna italiana de carne cocida a fuego lento, acompañada con queso parmesano rallado.",
    price: 6.00,
    image: "assets/img/food-pasta.jpg",
    available: true
  },
  {
    id: "pst-02",
    name: "Fetuccinis a la Carbonara",
    category: "pastas",
    description: "Salsa a base de tocineta crocante y huevos con queso pecorino italiano y pimienta negra recién molida.",
    price: 6.00,
    image: "assets/img/food-pasta.jpg",
    badge: "Clásico",
    available: true
  },
  {
    id: "pst-03",
    name: "Fetuccinis Funghi",
    category: "pastas",
    description: "Suave salsa blanca cremosa con champiñones salteados y queso parmesano.",
    price: 6.00,
    image: "assets/img/food-pasta.jpg",
    available: true
  },
  {
    id: "pst-04",
    name: "Fetuccinis al Pesto",
    category: "pastas",
    description: "La tradicional receta a base de albahaca fresca, aceite de oliva virgen extra y queso pecorino.",
    price: 6.00,
    image: "assets/img/food-pasta.jpg",
    available: true
  },
  {
    id: "pst-05",
    name: "Pasticho Tradicional",
    category: "pastas",
    description: "Capas de pasta rellenas de carne bologna, bechamel y queso fundido, servido con ensalada césar y pan de ajo tostado.",
    price: 8.00,
    image: "assets/img/food-pasta.jpg",
    badge: "Favorito",
    available: true
  },
  {
    id: "pst-06",
    name: "Fetuccini con Medallones de Lomito",
    category: "pastas",
    description: "Jugosos medallones de carne acompañados de fetuccines en salsa a tu gusto: Champiñones, Pimienta, Carbonara o Pesto.",
    price: 8.00,
    image: "assets/img/food-pasta.jpg",
    badge: "Plato Fuerte",
    available: true,
    options: {
      type: "single",
      title: "Salsa para la pasta:",
      choices: ["Salsa Champiñones", "Salsa Pimienta", "Salsa Carbonara", "Salsa al Pesto"]
    }
  },

  // --- PIZZAS (con selector de tamaño) ---
  {
    id: "piz-01",
    name: "Pizza Margarita",
    category: "pizzas",
    description: "Salsa napolitana de la casa, queso mozzarella derretido y orégano aromático.",
    price: 6.00,
    image: "assets/img/food-pizza.jpg",
    available: true,
    variants: [
      { name: "Big Slice (25 cm)", price: 2.50 },
      { name: "Mediana (30 cm)", price: 6.00 },
      { name: "Grande (40 cm)", price: 8.00 }
    ]
  },
  {
    id: "piz-02",
    name: "Pizza Especial",
    category: "pizzas",
    description: "Salsa de tomate, jamón seleccionado, queso mozzarella, anchoas y orégano.",
    price: 7.00,
    image: "assets/img/food-pizza.jpg",
    available: true,
    variants: [
      { name: "Big Slice (25 cm)", price: 3.00 },
      { name: "Mediana (30 cm)", price: 7.00 },
      { name: "Grande (40 cm)", price: 9.00 }
    ]
  },
  {
    id: "piz-03",
    name: "Pizza Super Especial",
    category: "pizzas",
    description: "Salsa, queso mozzarella, salchichón, jamón, anchoas y orégano.",
    price: 9.00,
    image: "assets/img/food-pizza.jpg",
    available: true,
    variants: [
      { name: "Big Slice (25 cm)", price: 3.50 },
      { name: "Mediana (30 cm)", price: 9.00 },
      { name: "Grande (40 cm)", price: 11.00 }
    ]
  },
  {
    id: "piz-04",
    name: "Pizza Peperonni",
    category: "pizzas",
    description: "Salsa, generoso queso mozzarella, rodajas de pepperoni crocante y orégano.",
    price: 9.00,
    image: "assets/img/food-pizza.jpg",
    badge: "Más Pedida",
    available: true,
    variants: [
      { name: "Big Slice (25 cm)", price: 3.00 },
      { name: "Mediana (30 cm)", price: 9.00 },
      { name: "Grande (40 cm)", price: 12.00 }
    ]
  },
  {
    id: "piz-05",
    name: "Pizza Cuatro Quesos",
    category: "pizzas",
    description: "Mozzarella fundido, queso pecorino, queso emmental suizo y toque de queso azul.",
    price: 9.00,
    image: "assets/img/food-pizza.jpg",
    badge: "Gourmet",
    available: true,
    variants: [
      { name: "Big Slice (25 cm)", price: 3.50 },
      { name: "Mediana (30 cm)", price: 9.00 },
      { name: "Grande (40 cm)", price: 13.00 }
    ]
  },
  {
    id: "piz-06",
    name: "Pizza Valenciana",
    category: "pizzas",
    description: "Salsa, queso mozzarella, salchichón, tiras de pimentón asado y orégano.",
    price: 8.00,
    image: "assets/img/food-pizza.jpg",
    available: true,
    variants: [
      { name: "Big Slice (25 cm)", price: 3.00 },
      { name: "Mediana (30 cm)", price: 8.00 },
      { name: "Grande (40 cm)", price: 11.00 }
    ]
  },
  {
    id: "piz-07",
    name: "Pizza Primavera",
    category: "pizzas",
    description: "Salsa, queso mozzarella, maíz dulce en grano, tocineta crocante, jamón y orégano.",
    price: 8.00,
    image: "assets/img/food-pizza.jpg",
    available: true,
    variants: [
      { name: "Big Slice (25 cm)", price: 3.50 },
      { name: "Mediana (30 cm)", price: 8.00 },
      { name: "Grande (40 cm)", price: 11.00 }
    ]
  },
  {
    id: "piz-08",
    name: "Pizza Capressa",
    category: "pizzas",
    description: "Salsa, queso mozzarella, rodajas de tomate, salsa pesto artesanal y orégano.",
    price: 9.00,
    image: "assets/img/food-pizza.jpg",
    available: true,
    variants: [
      { name: "Big Slice (25 cm)", price: 3.50 },
      { name: "Mediana (30 cm)", price: 9.00 },
      { name: "Grande (40 cm)", price: 12.00 }
    ]
  },
  {
    id: "piz-09",
    name: "Pizza Trigu's Bakery (Especial de la Casa)",
    category: "pizzas",
    description: "Salsa, queso, jamón, maíz dulce, chorizo español, tocineta, aceitunas negras y deliciosos bordes rellenos de queso.",
    price: 10.00,
    image: "assets/img/food-pizza.jpg",
    badge: "Especial Trigu's",
    available: true,
    variants: [
      { name: "Mediana (30 cm)", price: 10.00 },
      { name: "Grande (40 cm)", price: 14.00 }
    ]
  },
  {
    id: "piz-10",
    name: "Pizza Charcutera",
    category: "pizzas",
    description: "Salsa, queso mozzarella, jamón, pepperoni, tocineta, salchichón y chorizo español.",
    price: 11.00,
    image: "assets/img/food-pizza.jpg",
    badge: "Pura Carne",
    available: true,
    variants: [
      { name: "Mediana (30 cm)", price: 11.00 },
      { name: "Grande (40 cm)", price: 16.00 }
    ]
  },
  {
    id: "piz-11",
    name: "Pizza Tornillada",
    category: "pizzas",
    description: "Salsa, queso, jamón, bordes rellenos de jamón y queso, coronada con crujientes papas fritas, salsa cheddar y orégano.",
    price: 11.00,
    image: "assets/img/food-pizza.jpg",
    badge: "Sensación",
    available: true,
    variants: [
      { name: "Mediana (30 cm)", price: 11.00 },
      { name: "Grande (40 cm)", price: 16.00 }
    ]
  },
  {
    id: "piz-12",
    name: "Pizza Vegetariana",
    category: "pizzas",
    description: "Salsa, mozzarella, pimentón, champiñones frescos, aceitunas negras, maíz tierno, cebolla y orégano.",
    price: 7.50,
    image: "assets/img/food-pizza.jpg",
    available: true,
    variants: [
      { name: "Big Slice (25 cm)", price: 3.00 },
      { name: "Mediana (30 cm)", price: 7.50 },
      { name: "Grande (40 cm)", price: 10.50 }
    ]
  },
  {
    id: "piz-13",
    name: "Big Slice Personalizado (25 cm)",
    category: "pizzas",
    description: "Porción individual Big Slice para armar con tus ingredientes favoritos en caja individual.",
    price: 4.50,
    image: "assets/img/food-pizza-box.jpg",
    badge: "Big Slice",
    available: true
  },

  // --- ENSALADAS ---
  {
    id: "ens-01",
    name: "Ensalada Caprese",
    category: "ensaladas",
    description: "Rodajas de mozzarella de búfala fresca, tomate jugoso, salsa pesto y fino toque de aceite de oliva virgen.",
    price: 5.00,
    image: "assets/img/food-salad.jpg",
    available: true
  },
  {
    id: "ens-02",
    name: "Ensalada César Clásica",
    category: "ensaladas",
    description: "Lechuga romana crujiente, tocineta tostada, crotones dorados al horno, queso parmesano y aderezo césar tradicional.",
    price: 5.00,
    image: "assets/img/food-salad.jpg",
    available: true
  },
  {
    id: "ens-03",
    name: "Ensalada César con Pollo",
    category: "ensaladas",
    description: "Nuestra ensalada césar tradicional con pechuga de pollo a la plancha tierna y jugosa.",
    price: 6.00,
    image: "assets/img/food-salad.jpg",
    badge: "Popular",
    available: true
  },
  {
    id: "ens-04",
    name: "Ensalada César con Camarón",
    category: "ensaladas",
    description: "Ensalada césar coronada con deliciosos camarones salteados al ajillo.",
    price: 7.00,
    image: "assets/img/food-salad.jpg",
    badge: "Del Mar",
    available: true
  },
  {
    id: "ens-05",
    name: "Ensalada César Mixta",
    category: "ensaladas",
    description: "La experiencia completa: con pollo a la plancha y camarones salteados.",
    price: 8.00,
    image: "assets/img/food-salad.jpg",
    available: true
  },

  // --- CARNES & PARRILLAS ---
  {
    id: "car-01",
    name: "Churrasco de Carne (330 g)",
    category: "carnes",
    description: "Jugoso corte de res al grill, servido con ensalada césar o pico de gallo, papas fritas o puré y chimichurri casero.",
    price: 13.00,
    image: "assets/img/food-grill.jpg",
    badge: "330 g",
    available: true,
    options: {
      type: "single",
      title: "Elige tus acompañantes:",
      choices: ["Papas Fritas + Ensalada César", "Papas Fritas + Pico de Gallo", "Puré + Ensalada César", "Puré + Pico de Gallo"]
    }
  },
  {
    id: "car-02",
    name: "Milanesa de Pollo al Grill",
    category: "carnes",
    description: "250 g de pechuga de pollo asada con chimichurri, acompañada de ensalada césar o pico de gallo y papas o puré.",
    price: 8.00,
    image: "assets/img/food-grill.jpg",
    available: true
  },
  {
    id: "car-03",
    name: "Churrasco de Cerdo",
    category: "carnes",
    description: "250 g de tierno corte de cerdo a la parrilla, con ensalada césar o pico de gallo, papas fritas o puré y chimichurri.",
    price: 8.00,
    image: "assets/img/food-grill.jpg",
    available: true
  },
  {
    id: "car-04",
    name: "Medallón de Lomito",
    category: "carnes",
    description: "250 g de lomito en salsa de su preferencia (champiñones o pimienta), con ensalada césar y papas fritas o puré.",
    price: 10.00,
    image: "assets/img/food-grill.jpg",
    badge: "Lomito",
    available: true,
    options: {
      type: "single",
      title: "Salsa a elección:",
      choices: ["Salsa de Champiñones", "Salsa de Pimienta"]
    }
  },
  {
    id: "car-05",
    name: "Tomahawk / T-Bone / Chuletón Cerdo Ricci",
    category: "carnes",
    description: "Corte selecto de cerdo Ricci con 1 ensalada, 1 contorno y chimichurri.",
    price: 14.00,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true
  },
  {
    id: "car-06",
    name: "Tomahawk de Carne de Res",
    category: "carnes",
    description: "Imponente corte Tomahawk de res asado al punto perfecto con ensalada, contorno y chimichurri.",
    price: 20.00,
    image: "assets/img/food-parrilla-combo.jpg",
    badge: "Corte Premium",
    available: true
  },
  {
    id: "car-07",
    name: "T-Bone de Carne de Res",
    category: "carnes",
    description: "Clásico T-Bone con lomito y solomo, incluye 1 ensalada, 1 contorno y chimichurri.",
    price: 20.00,
    image: "assets/img/food-parrilla-combo.jpg",
    badge: "Corte Premium",
    available: true
  },
  {
    id: "car-08",
    name: "Parrilla Mixta",
    category: "carnes",
    description: "Churrasco de carne de res, milanesa de pollo, chorizo parrillero, papas fritas, pico de gallo y chimichurri.",
    price: 18.00,
    image: "assets/img/food-grill.jpg",
    badge: "Más Vendida",
    available: true
  },
  {
    id: "car-09",
    name: "Parrilla Proteica",
    category: "carnes",
    description: "Churrasco de carne, pollo y cerdo, con chorizo, huevo frito, aguacate fresco en rodajas y queso a la plancha.",
    price: 25.00,
    image: "assets/img/food-proteica.jpg",
    badge: "Super Proteína",
    available: true
  },
  {
    id: "car-10",
    name: "Parrilla Premium (2 Personas)",
    category: "carnes",
    description: "Corte Ricci 300g (Punta trasera, lomo o copa de cerdo), 1 Chistorra o salchicha, 1 Chorizo o morcilla, 1 Churrasco de carne, 1 Milanesa de pollo, 1 Ensalada y 1 Contorno.",
    price: 30.00,
    image: "assets/img/food-parrilla-combo.jpg",
    badge: "Para 2 Personas",
    available: true
  },
  {
    id: "car-11",
    name: "Parrilla Premium (4 Personas)",
    category: "carnes",
    description: "Corte Ricci 600g, 2 Chistorras o salchichas, 2 Chorizos o morcillas, 2 Churrascos de carne, 2 Milanesas de pollo, 1 Ensalada y 2 Contornos.",
    price: 47.00,
    image: "assets/img/food-parrilla-combo.jpg",
    badge: "Banquete 4 Personas",
    available: true
  },

  // --- COMBOS DE POLLO ASADO ---
  {
    id: "pol-01",
    name: "Combo Familiar 1",
    category: "pollo_asado",
    description: "1 Pollo Asado entero y jugoso, 1 Ración de yuca sancochada, 1 Guasacaca y 1 Refresco de 2 Litros.",
    price: 18.00,
    image: "assets/img/food-pollo.jpg",
    badge: "Combo Familiar",
    available: true
  },
  {
    id: "pol-02",
    name: "Combo Familiar 2",
    category: "pollo_asado",
    description: "1 Pollo Asado entero, 6 Hallaquitas de chicharrón crocantes, 1 Guasacaca y 1 Refresco de 2 Litros.",
    price: 19.00,
    image: "assets/img/food-pollo.jpg",
    badge: "Con Hallaquitas",
    available: true
  },
  {
    id: "pol-03",
    name: "Combo Individual 3",
    category: "pollo_asado",
    description: "1/2 Pollo Asado, 1 Ración de yuca sancochada, 1 Guasacaca y 1 Refresco de 1 Litro.",
    price: 13.00,
    image: "assets/img/food-pollo.jpg",
    badge: "Individual",
    available: true
  },
  {
    id: "pol-04",
    name: "Combo Individual 4",
    category: "pollo_asado",
    description: "1/2 Pollo Asado, 3 Hallaquitas de chicharrón, 1 Guasacaca y 1 Refresco de 1 Litro.",
    price: 14.00,
    image: "assets/img/food-pollo.jpg",
    badge: "Individual",
    available: true
  },
  {
    id: "pol-05",
    name: "Combo Super de Pollo Asado 5",
    category: "pollo_asado",
    description: "2 Pollos Asados enteros, 12 Hallaquitas de chicharrón, 2 Guasacacas y 2 Refrescos de 2 Litros.",
    price: 35.00,
    image: "assets/img/food-pollo.jpg",
    badge: "Mega Combo",
    available: true
  },
  {
    id: "pol-06",
    name: "Combo Preferencial 1 (Pollo Entero)",
    category: "pollo_asado",
    description: "1 Pollo Asado entero, 1 Ensalada a elección, 1 Contorno a elección y 1 Salsa especial.",
    price: 20.00,
    image: "assets/img/food-pollo.jpg",
    available: true
  },
  {
    id: "pol-07",
    name: "Combo Preferencial 2 (Medio Pollo)",
    category: "pollo_asado",
    description: "1/2 Pollo Asado, 1 Ensalada, 1 Contorno y 1 Salsa.",
    price: 13.00,
    image: "assets/img/food-pollo.jpg",
    available: true
  },

  // --- CACHAPAS ---
  {
    id: "cac-01",
    name: "Cachapa con Queso de Mano",
    category: "cachapas",
    description: "Tradicional masa dulce de maíz tierno rellena con generoso queso de mano fresco y mantequilla.",
    price: 6.00,
    image: "assets/img/food-cachapa.jpg",
    badge: "Tradicional",
    available: true
  },
  {
    id: "cac-02",
    name: "Cachapa Sandwich",
    category: "cachapas",
    description: "Doble cachapa rellena como sandwich con queso de mano y jamón ahumado.",
    price: 10.00,
    image: "assets/img/food-cachapa.jpg",
    available: true
  },
  {
    id: "cac-03",
    name: "Cachapa con Queso + Pork Belly",
    category: "cachapas",
    description: "La combinación reina: cachapa con queso de mano tierno y trozos crujientes de pork belly dorado.",
    price: 12.00,
    image: "assets/img/food-cachapa.jpg",
    badge: "Plato Estrella",
    available: true
  },

  // --- CORTES PARRILLEROS RICCI ---
  {
    id: "rcc-01",
    name: "Costilla Saint Louis Ricci (2 Personas)",
    category: "parrilleros_ricci",
    description: "Tiernas costillas de cerdo Saint Louis con glaseado y ahumado especial.",
    price: 9.00,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true,
    variants: [
      { name: "Solo corte", price: 9.00 },
      { name: "+ 2 Contornos por persona", price: 15.00 }
    ]
  },
  {
    id: "rcc-02",
    name: "Asado de Tira Ricci (2 Personas)",
    category: "parrilleros_ricci",
    description: "Corte transversal con hueso, jugoso y de intenso sabor parrillero.",
    price: 12.00,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true,
    variants: [
      { name: "Solo corte", price: 12.00 },
      { name: "+ 2 Contornos por persona", price: 18.00 }
    ]
  },
  {
    id: "rcc-03",
    name: "Punta Trasera Ricci (1 Persona)",
    category: "parrilleros_ricci",
    description: "Corte con su capa justa de grasa crocante, asado al término deseado.",
    price: 13.00,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true,
    variants: [
      { name: "Solo corte", price: 13.00 },
      { name: "+ 2 Contornos", price: 16.00 }
    ]
  },
  {
    id: "rcc-04",
    name: "Lomo de Cerdo Ricci (1 Persona)",
    category: "parrilleros_ricci",
    description: "Lomo magro tierno y bien condimentado al grill.",
    price: 13.00,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true,
    variants: [
      { name: "Solo corte", price: 13.00 },
      { name: "+ 2 Contornos", price: 16.00 }
    ]
  },
  {
    id: "rcc-05",
    name: "Pork Belly Ricci (2 Personas)",
    category: "parrilleros_ricci",
    description: "Panceta de cerdo con piel ultra crujiente y carne sumamente suave.",
    price: 15.00,
    image: "assets/img/food-parrilla-combo.jpg",
    badge: "Crocante",
    available: true,
    variants: [
      { name: "Solo corte", price: 15.00 },
      { name: "+ 2 Contornos por persona", price: 21.00 }
    ]
  },
  {
    id: "rcc-06",
    name: "Costilla China Ricci (1 Persona)",
    category: "parrilleros_ricci",
    description: "Costillas con sazón y toque oriental caramelizado.",
    price: 16.50,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true,
    variants: [
      { name: "Solo corte", price: 16.50 },
      { name: "+ 2 Contornos", price: 19.50 }
    ]
  },
  {
    id: "rcc-07",
    name: "Tomahawk Ricci (4 Personas)",
    category: "parrilleros_ricci",
    description: "Gran Tomahawk de presentación para cuatro comensales.",
    price: 23.00,
    image: "assets/img/food-parrilla-combo.jpg",
    badge: "Para 4 Personas",
    available: true,
    variants: [
      { name: "Solo corte", price: 23.00 },
      { name: "+ 2 Contornos por persona", price: 35.00 }
    ]
  },
  {
    id: "rcc-08",
    name: "T-Bone Ricci (4 Personas)",
    category: "parrilleros_ricci",
    description: "Impresionante T-bone asado al estilo Ricci para 4 personas.",
    price: 23.00,
    image: "assets/img/food-parrilla-combo.jpg",
    badge: "Para 4 Personas",
    available: true,
    variants: [
      { name: "Solo corte", price: 23.00 },
      { name: "+ 2 Contornos por persona", price: 35.00 }
    ]
  },

  // --- PORK BELLY & CHICHARRÓN POR KILO ---
  {
    id: "prk-01",
    name: "Pork Belly x Kilo",
    category: "chicharron",
    description: "Kilo de Pork belly crujiente horneado con técnica especial.",
    price: 28.00,
    image: "assets/img/food-cachapa.jpg",
    badge: "1 Kg",
    available: true
  },
  {
    id: "prk-02",
    name: "Surtido x Kilo",
    category: "chicharron",
    description: "Kilo variado con los mejores cortes de chicharrón y carne de cerdo.",
    price: 20.00,
    image: "assets/img/food-cachapa.jpg",
    badge: "1 Kg",
    available: true
  },
  {
    id: "prk-03",
    name: "Chicharrón Crocante x Kilo",
    category: "chicharron",
    description: "Kilo de chicharrón tostado y dorado 100% crujiente.",
    price: 16.00,
    image: "assets/img/food-cachapa.jpg",
    available: true
  },
  {
    id: "prk-04",
    name: "Chicharrón con Carne x Kilo",
    category: "chicharron",
    description: "Kilo de chicharrón carnudo tradicional venezolano.",
    price: 20.00,
    image: "assets/img/food-cachapa.jpg",
    available: true
  },
  {
    id: "prk-05",
    name: "Combo Pork",
    category: "chicharron",
    description: "Porción de pork belly con contornos tradicionales.",
    price: 13.50,
    image: "assets/img/food-cachapa.jpg",
    available: true
  },
  {
    id: "prk-06",
    name: "Combo Surtido",
    category: "chicharron",
    description: "Porción de surtido de cerdo con contornos.",
    price: 13.50,
    image: "assets/img/food-cachapa.jpg",
    available: true
  },

  // --- BEBIDAS & CAFETERÍA ---
  // Cafetería
  {
    id: "beb-caf-01",
    name: "Café Expreso",
    category: "bebidas",
    description: "Extracción pura e intensa de café recién tostado.",
    price: 2.00,
    image: "assets/img/food-cafe.jpg",
    available: true
  },
  {
    id: "beb-caf-02",
    name: "Café Americano",
    category: "bebidas",
    description: "Expreso alargado con agua caliente.",
    price: 2.00,
    image: "assets/img/food-cafe.jpg",
    available: true
  },
  {
    id: "beb-caf-03",
    name: "Capuccino Tradicional",
    category: "bebidas",
    description: "Café expreso, leche vaporizada y abundante espuma cremosa.",
    price: 2.00,
    image: "assets/img/food-cafe.jpg",
    available: true
  },
  {
    id: "beb-caf-04",
    name: "Doppio Capuccino",
    category: "bebidas",
    description: "Doble carga de café expreso con cremosa leche.",
    price: 3.00,
    image: "assets/img/food-cafe.jpg",
    available: true
  },
  {
    id: "beb-caf-05",
    name: "Café Latte",
    category: "bebidas",
    description: "Café suave con mayor proporción de leche caliente espumada.",
    price: 2.00,
    image: "assets/img/food-cafe.jpg",
    available: true
  },
  {
    id: "beb-caf-06",
    name: "Mocca",
    category: "bebidas",
    description: "Combinación de expreso, leche espumada y chocolate oscuro.",
    price: 3.00,
    image: "assets/img/food-cafe.jpg",
    available: true
  },
  {
    id: "beb-caf-07",
    name: "Latte Vainilla",
    category: "bebidas",
    description: "Latte aromatizado con jarabe dulce de vainilla.",
    price: 2.50,
    image: "assets/img/food-cafe.jpg",
    available: true
  },
  {
    id: "beb-caf-08",
    name: "Café Bombón",
    category: "bebidas",
    description: "Café expreso servido sobre una base de dulce leche condensada.",
    price: 2.50,
    image: "assets/img/food-cafe.jpg",
    available: true
  },
  {
    id: "beb-caf-09",
    name: "Affogato",
    category: "bebidas",
    description: "Bola de helado de vainilla ahogada con un shot de café expreso caliente.",
    price: 4.50,
    image: "assets/img/food-cafe.jpg",
    badge: "Delicia",
    available: true
  },

  // Malteadas
  {
    id: "beb-mlt-01",
    name: "Malteada Especial ($5 c/u)",
    category: "bebidas",
    description: "Cremosa malteada artesanal decorada con crema chantilly y sirope. Elige tu sabor favorito:",
    price: 5.00,
    image: "assets/img/food-malteada.jpg",
    badge: "Top Dulce",
    available: true,
    options: {
      type: "single",
      title: "Elige el sabor de tu malteada:",
      choices: ["Oreo", "Brownie", "Fresa", "Bienmesabe", "Chips Ahoy", "Cocosette", "Galak", "Samba", "Pirulin"]
    }
  },

  // Frappuccinos
  {
    id: "beb-frp-01",
    name: "Frappuccino Helado ($3.5 c/u)",
    category: "bebidas",
    description: "Bebida helada de café batido con hielo y coronado de crema chantilly.",
    price: 3.50,
    image: "assets/img/food-smoothie.jpg",
    available: true,
    options: {
      type: "single",
      title: "Elige tu frappuccino:",
      choices: ["Caramelo", "Chocolate", "Nutella", "Dulce de Leche"]
    }
  },

  // Smoothies
  {
    id: "beb-smt-01",
    name: "Smoothie Refrescante ($3.5 c/u)",
    category: "bebidas",
    description: "Batido espeso de fruta natural con hielo triturado.",
    price: 3.50,
    image: "assets/img/food-smoothie.jpg",
    available: true,
    options: {
      type: "single",
      title: "Sabor del smoothie:",
      choices: ["Durazno", "Fresa", "Parchita", "Mora", "Piña", "Pie de Parchita", "Pie de Limón"]
    }
  },

  // Jugos Naturales
  {
    id: "beb-jug-01",
    name: "Jugo Natural de Frutas ($2.5 c/u)",
    category: "bebidas",
    description: "100% pulpa natural fresca preparada al instante en agua.",
    price: 2.50,
    image: "assets/img/food-jugos.jpg",
    available: true,
    options: {
      type: "single",
      title: "Fruta a elección:",
      choices: ["Lechosa", "Melón", "Fresa", "Mora", "Guanábana", "Parchita", "Durazno", "Piña", "Patilla", "Limonada Hierba Buena"]
    }
  },

  // Infusiones
  {
    id: "beb-inf-01",
    name: "Infusión o Té Natural",
    category: "bebidas",
    description: "Infusión aromática relajante servida fría o caliente a tu preferencia.",
    price: 3.00,
    image: "assets/img/food-cafe.jpg",
    available: true,
    variants: [
      { name: "Fría (Con hielo)", price: 3.00 },
      { name: "Caliente", price: 2.00 }
    ],
    options: {
      type: "single",
      title: "Variedad de infusión:",
      choices: ["Flor de Jamaica", "Frutos Rojos", "Jengibre (Limón-Naranja)", "Té Negro (Limón-Naranja)", "Manzanilla"]
    }
  },
  {
    id: "beb-inf-02",
    name: "Té Matcha Especial",
    category: "bebidas",
    description: "Té verde matcha concentrado, energizante y antioxidante.",
    price: 3.00,
    image: "assets/img/food-cafe.jpg",
    available: true,
    variants: [
      { name: "Frío", price: 3.00 },
      { name: "Caliente", price: 2.00 },
      { name: "Con Leche (Matcha Latte)", price: 3.00 }
    ]
  },

  // --- EXTRAS Y ACOMPAÑANTES ---
  {
    id: "ext-01",
    name: "Ración de Chimichurri Casero",
    category: "extras",
    description: "Salsa tradicional de hierbas, ajo y aceite para carnes.",
    price: 1.00,
    image: "assets/img/food-grill.jpg",
    available: true
  },
  {
    id: "ext-02",
    name: "Queso a la Plancha (Adicional)",
    category: "extras",
    description: "Ración de queso asado a la plancha.",
    price: 1.50,
    image: "assets/img/food-proteica.jpg",
    available: true
  },
  {
    id: "ext-03",
    name: "Chorizo Parrillero (Unidad extra)",
    category: "extras",
    description: "Chorizo parrillero asado al carbón.",
    price: 2.00,
    image: "assets/img/food-grill.jpg",
    available: true
  },
  {
    id: "ext-04",
    name: "Adicional de Churrasco (Carne, Pollo o Cerdo)",
    category: "extras",
    description: "Ración extra de proteína a la plancha.",
    price: 4.00,
    image: "assets/img/food-grill.jpg",
    available: true,
    options: {
      type: "single",
      title: "Proteína extra:",
      choices: ["Carne de Res", "Pechuga de Pollo", "Churrasco de Cerdo"]
    }
  },
  {
    id: "ext-05",
    name: "6 Unidades de Chistorra Ricci",
    category: "extras",
    description: "Ración de 6 chistorras españolas a la parrilla.",
    price: 6.00,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true
  },
  {
    id: "ext-06",
    name: "5 Unidades de Chorizo Carupanero Ricci",
    category: "extras",
    description: "Chorizo carupanero oriental de sabor intenso y ahumado.",
    price: 4.00,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true
  },
  {
    id: "ext-07",
    name: "5 Unidades de Chorizo (Ahumado, Ajo o Picante)",
    category: "extras",
    description: "Cinco chorizos a la brasa con sazón a elección.",
    price: 3.00,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true,
    options: {
      type: "single",
      title: "Variedad:",
      choices: ["Ahumado", "De Ajo", "Picante"]
    }
  },
  {
    id: "ext-08",
    name: "4 Unidades de Morcilla Ricci",
    category: "extras",
    description: "Morcilla tradicional venezolana parrillera.",
    price: 2.50,
    image: "assets/img/food-parrilla-combo.jpg",
    available: true,
    options: {
      type: "single",
      title: "Tipo de morcilla:",
      choices: ["Morcilla Carupanera ($2.5)", "Morcilla con Cebolla ($2.5)", "Morcilla Arroz / Cebolla ($2.0)"]
    }
  }
];

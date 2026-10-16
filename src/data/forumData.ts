export interface ForumLevel {
  level: number;
  english: string;
  spanish: string;
  highlightAddition?: string;
  grammarFocus?: string;
}

export interface ModuleExample {
  id: 1 | 2 | 3;
  exampleNumber: number;
  titleEn: string;
  titleEs: string;
  coreIdea: string;
  levels: ForumLevel[];
}

export interface GrammarTopic {
  title: string;
  ruleFormula: string;
  explanationEs: string;
  examples: Array<{
    en: string;
    es: string;
  }>;
}

export interface VocabularyItem {
  english: string;
  spanish: string;
  category: string;
  example: string;
}

export interface ReplyCategoryItem {
  english: string;
  spanish: string;
}

export interface ReplyCategory {
  id: string;
  number: number;
  titleEn: string;
  titleEs: string;
  descriptionEs: string;
  items: ReplyCategoryItem[];
}

export interface BuildReplyScenario {
  id: number;
  classmateComment: string;
  classmateCommentEs: string;
  suggestedReply: string;
  suggestedReplyEs: string;
  longerReply: string;
  longerReplyEs: string;
  focusPoint: string;
}

export interface QuestionModule {
  id: 1 | 2 | 3 | 4;
  number: number;
  shortTitle: string;
  badgeTitle: string;
  questionEn: string;
  questionEs: string;
  description: string;
  examples: ModuleExample[];
  grammarTopics: GrammarTopic[];
  keyVocabulary: VocabularyItem[];
  tipsForStudents: string[];
}

export const REPLY_CATEGORIES: ReplyCategory[] = [
  {
    id: "agreeing",
    number: 1,
    titleEn: "Agreeing",
    titleEs: "Expresar acuerdo",
    descriptionEs: "Frases para validar y respaldar positivamente la propuesta de tu compañero.",
    items: [
      { english: "I agree with you.", spanish: "Estoy de acuerdo contigo." },
      { english: "You are right.", spanish: "Tienes razón." },
      { english: "I think so too.", spanish: "Yo también pienso eso." },
      { english: "I agree because it is important.", spanish: "Estoy de acuerdo porque es importante." }
    ]
  },
  {
    id: "adding",
    number: 2,
    titleEn: "Adding an idea",
    titleEs: "Añadir una idea",
    descriptionEs: "Estructuras para complementar el comentario aportando una acción adicional.",
    items: [
      { english: "I also think so.", spanish: "También pienso eso." },
      { english: "We can also recycle paper.", spanish: "También podemos reciclar papel." },
      { english: "I would like to add one idea.", spanish: "Me gustaría añadir una idea." },
      { english: "We should also save energy.", spanish: "También deberíamos ahorrar energía." }
    ]
  },
  {
    id: "different",
    number: 3,
    titleEn: "Giving a different opinion",
    titleEs: "Expresar una opinión diferente",
    descriptionEs: "Maneras respetuosas y corteses de plantear una perspectiva alternativa sin confrontación.",
    items: [
      { english: "I understand your point.", spanish: "Entiendo tu punto de vista." },
      { english: "I respect your opinion.", spanish: "Respeto tu opinión." },
      { english: "I have a different idea.", spanish: "Tengo una idea diferente." },
      { english: "I think public transportation is better.", spanish: "Pienso que el transporte público es mejor." }
    ]
  },
  {
    id: "asking",
    number: 4,
    titleEn: "Asking a question",
    titleEs: "Hacer una pregunta",
    descriptionEs: "Preguntas para fomentar la interacción dialógica y el debate reflexivo en el foro.",
    items: [
      { english: "What do you think?", spanish: "¿Qué piensas?" },
      { english: "Why do you think so?", spanish: "¿Por qué piensas eso?" },
      { english: "What else can we do?", spanish: "¿Qué más podemos hacer?" },
      { english: "How can we save more energy?", spanish: "¿Cómo podemos ahorrar más energía?" }
    ]
  },
  {
    id: "suggesting",
    number: 5,
    titleEn: "Giving a suggestion",
    titleEs: "Dar una sugerencia",
    descriptionEs: "Recomendaciones constructivas usando verbos modales de propuesta (should, can, could).",
    items: [
      { english: "We should recycle more.", spanish: "Deberíamos reciclar más." },
      { english: "We can plant more trees.", spanish: "Podemos plantar más árboles." },
      { english: "Companies could organize green activities.", spanish: "Las empresas podrían organizar actividades ecológicas." },
      { english: "Employees can work together to protect nature.", spanish: "Los empleados pueden trabajar juntos para proteger la naturaleza." }
    ]
  }
];

export const BUILD_REPLY_SCENARIOS: BuildReplyScenario[] = [
  {
    id: 1,
    classmateComment: "I recycle paper at work.",
    classmateCommentEs: "Reciclo papel en el trabajo.",
    suggestedReply: "Good idea! I agree with you.",
    suggestedReplyEs: "¡Buena idea! Estoy de acuerdo contigo.",
    longerReply: "Good idea! I agree with you because recycling helps the environment.",
    longerReplyEs: "¡Buena idea! Estoy de acuerdo contigo porque reciclar ayuda al medio ambiente.",
    focusPoint: "Agrega 'because + cláusula explicativa' para fundamentar tu acuerdo con la causa ambiental."
  },
  {
    id: 2,
    classmateComment: "Companies should save electricity.",
    classmateCommentEs: "Las empresas deberían ahorrar electricidad.",
    suggestedReply: "I agree. Saving energy is important.",
    suggestedReplyEs: "Estoy de acuerdo. Ahorrar energía es importante.",
    longerReply: "I agree. Saving energy is important, and companies should turn off unnecessary lights.",
    longerReplyEs: "Estoy de acuerdo. Ahorrar energía es importante y las empresas deberían apagar las luces innecesarias.",
    focusPoint: "Conecta la razón con la conjunción 'and' para proponer una acción práctica concreta."
  },
  {
    id: 3,
    classmateComment: "Employees can plant trees.",
    classmateCommentEs: "Los empleados pueden plantar árboles.",
    suggestedReply: "That is a good idea!",
    suggestedReplyEs: "¡Esa es una buena idea!",
    longerReply: "That is a good idea! Employees can plant trees together and protect nature.",
    longerReplyEs: "¡Esa es una buena idea! Los empleados pueden plantar árboles juntos y proteger la naturaleza.",
    focusPoint: "Refuerza la idea con el adverbio colaborativo 'together' y el propósito general 'protect nature'."
  }
];

export const QUESTION_MODULES: QuestionModule[] = [
  {
    id: 1,
    number: 1,
    shortTitle: "Environmentally Friendly at Work",
    badgeTitle: "MODULE 1",
    questionEn: "How can you be environmentally friendly at work?",
    questionEs: "¿Cómo puedes ser amigable con el medio ambiente en el trabajo?",
    description: "Aprende 3 estrategias diferentes: ahorro de agua y energía, reciclaje y reducción de residuos, y transporte sostenible.",
    examples: [
      {
        id: 1,
        exampleNumber: 1,
        titleEn: "Saving Water and Electricity",
        titleEs: "Ahorro de agua y electricidad",
        coreIdea: "Acciones individuales cotidianas de conservación de recursos en la oficina.",
        levels: [
          { level: 1, english: "I save water.", spanish: "Ahorro agua.", grammarFocus: "Sujeto + Verbo en Presente Simple + Objeto." },
          { level: 2, english: "I save water at work.", spanish: "Ahorro agua en el trabajo.", grammarFocus: "Complemento de lugar con 'at work'." },
          { level: 3, english: "I save water at work every day.", spanish: "Ahorro agua en el trabajo todos los días.", grammarFocus: "Expresión de frecuencia 'every day' al final." },
          { level: 4, english: "I save water and electricity at work.", spanish: "Ahorro agua y electricidad en el trabajo.", grammarFocus: "Conjunción copulativa 'and' uniendo dos sustantivos." },
          { level: 5, english: "I save water and electricity at work every day.", spanish: "Ahorro agua y electricidad en el trabajo todos los días.", grammarFocus: "Combinación de dos recursos + lugar + frecuencia." },
          { level: 6, english: "I save water and electricity by turning off lights.", spanish: "Ahorro agua y electricidad apagando las luces.", grammarFocus: "Estructura de método 'by + verb-ing'." },
          { level: 7, english: "I save water and electricity by turning off unnecessary lights.", spanish: "Ahorro agua y electricidad apagando las luces innecesarias.", grammarFocus: "Adjetivo calificativo antes del sustantivo: 'unnecessary lights'." },
          { level: 8, english: "I save water and electricity, and I recycle paper at work.", spanish: "Ahorro agua y electricidad, y reciclo papel en el trabajo.", grammarFocus: "Oración compuesta con dos cláusulas independientes y coma." },
          { level: 9, english: "I save water, turn off unnecessary lights, and recycle paper every day.", spanish: "Ahorro agua, apago las luces innecesarias y reciclo papel todos los días.", grammarFocus: "Serie de tres acciones paralelas en presente simple." },
          { level: 10, english: "I help protect the environment by saving water, turning off unnecessary lights, and recycling paper every day.", spanish: "Ayudo a proteger el medio ambiente ahorrando agua, apagando las luces innecesarias y reciclando papel todos los días.", grammarFocus: "Verbo de propósito 'help protect' + cláusula múltiple con 'by + ing'." }
        ]
      },
      {
        id: 2,
        exampleNumber: 2,
        titleEn: "Recycling and Reducing Waste",
        titleEs: "Reciclaje y reducción de residuos",
        coreIdea: "Manejo responsable de materiales de oficina, papel y artículos reutilizables.",
        levels: [
          { level: 1, english: "I recycle paper.", spanish: "Reciclo papel.", grammarFocus: "Presente simple: sujeto 'I' + acción directa." },
          { level: 2, english: "I recycle paper and plastic.", spanish: "Reciclo papel y plástico.", grammarFocus: "Coordinación de dos materiales con 'and'." },
          { level: 3, english: "I recycle paper and plastic at the office.", spanish: "Reciclo papel y plástico en la oficina.", grammarFocus: "Complemento circunstancial de lugar: 'at the office'." },
          { level: 4, english: "I recycle paper and plastic, and I reduce waste.", spanish: "Reciclo papel y plástico, y reduzco los residuos.", grammarFocus: "Adición de segunda acción ecológica con 'reduce waste'." },
          { level: 5, english: "I recycle paper and plastic, and I reduce waste every day.", spanish: "Reciclo papel y plástico, y reduzco los residuos todos los días.", grammarFocus: "Adverbio temporal de rutina 'every day'." },
          { level: 6, english: "I reduce waste by using a reusable water bottle.", spanish: "Reduzco los residuos usando una botella de agua reutilizable.", grammarFocus: "Estructura de instrumento: 'by using + noun'." },
          { level: 7, english: "I reduce waste at work by using a reusable bottle and real coffee mugs.", spanish: "Reduzco los residuos en el trabajo usando una botella reutilizable y tazas de café reales.", grammarFocus: "Especificación de alternativas sostenibles para evitar desechables." },
          { level: 8, english: "I recycle materials and reduce waste by printing only necessary documents.", spanish: "Reciclo materiales y reduzco los residuos imprimiendo únicamente los documentos necesarios.", grammarFocus: "Adverbio restrictivo 'only' + sustantivo plural." },
          { level: 9, english: "I recycle paper and plastic, reduce office waste, and avoid single-use plastics every day.", spanish: "Reciclo papel y plástico, reduzco los residuos de la oficina y evito los plásticos de un solo uso todos los días.", grammarFocus: "Tríada verbal: 'recycle', 'reduce', 'avoid single-use plastics'." },
          { level: 10, english: "I can be environmentally friendly at work by recycling paper, reducing waste, and using reusable items every day.", spanish: "Puedo ser amigable con el medio ambiente en el trabajo reciclando papel, reduciendo residuos y usando artículos reutilizables todos los días.", grammarFocus: "Estructura modal 'I can be...' respondiendo directamente a la pregunta orientadora." }
        ]
      },
      {
        id: 3,
        exampleNumber: 3,
        titleEn: "Using Sustainable Transportation",
        titleEs: "Uso de transporte sostenible",
        coreIdea: "Opciones de movilidad ecológica para reducir la huella de carbono laboral.",
        levels: [
          { level: 1, english: "I ride a bicycle.", spanish: "Monto en bicicleta.", grammarFocus: "Verbo de transporte en presente simple: 'ride'." },
          { level: 2, english: "I ride a bicycle to work.", spanish: "Voy en bicicleta al trabajo.", grammarFocus: "Direccional con preposición 'to work'." },
          { level: 3, english: "I ride a bicycle to work twice a week.", spanish: "Voy en bicicleta al trabajo dos veces por semana.", grammarFocus: "Expresión de frecuencia periódica: 'twice a week'." },
          { level: 4, english: "I ride a bicycle and take public transportation to work.", spanish: "Voy en bicicleta y tomo el transporte público hacia el trabajo.", grammarFocus: "Combinación de dos medios de transporte sostenibles." },
          { level: 5, english: "I use public transportation to reduce carbon emissions.", spanish: "Uso el transporte público para reducir las emisiones de carbono.", grammarFocus: "Infinitivo de propósito: 'to reduce carbon emissions'." },
          { level: 6, english: "I use public transportation or walk to work whenever possible.", spanish: "Uso el transporte público o camino al trabajo siempre que sea posible.", grammarFocus: "Conector disyuntivo 'or' + cláusula condicional de cortesía." },
          { level: 7, english: "I save fuel and reduce air pollution by carpooling with colleagues.", spanish: "Ahorro combustible y reduzco la contaminación del aire compartiendo el carro con colegas.", grammarFocus: "Término clave 'carpooling' precedido por 'by'." },
          { level: 8, english: "I help the environment by riding my bicycle to work and sharing rides with coworkers.", spanish: "Ayudo al medio ambiente yendo en bicicleta al trabajo y compartiendo viajes con compañeros de trabajo.", grammarFocus: "Gerundios paralelos coordinados: 'by riding... and sharing...'." },
          { level: 9, english: "I choose eco-friendly transportation, such as walking, cycling, and using the bus every week.", spanish: "Elijo transporte ecológico, como caminar, andar en bicicleta y usar el autobús todas las semanas.", grammarFocus: "Ejemplificación formal con 'such as' seguida de sustantivos verbales." },
          { level: 10, english: "I protect the environment by using sustainable transportation like cycling and carpooling to work every day.", spanish: "Protejo el medio ambiente usando transporte sostenible como andar en bicicleta y compartir auto para ir al trabajo todos los días.", grammarFocus: "Respuesta integral con causa, método y hábito continuo." }
        ]
      }
    ],
    grammarTopics: [
      {
        title: "Subject + Verb + Complement (Presente Simple)",
        ruleFormula: "Subject + Verb (base) + Complement",
        explanationEs: "En inglés siempre se debe explicitar el sujeto (I, you, we, they). En primera persona singular 'I', el verbo va en forma base.",
        examples: [
          { en: "I save water.", es: "Ahorro agua." },
          { en: "I recycle paper.", es: "Reciclo papel." },
          { en: "I ride a bicycle to work.", es: "Voy en bicicleta al trabajo." }
        ]
      },
      {
        title: "By + Verb-ING: Expresar cómo logramos la acción",
        ruleFormula: "Action + by + [Verb-ing] + Complement",
        explanationEs: "Después de la preposición 'by', el verbo siguiente siempre debe llevar la terminación '-ing'. En español se traduce como gerundio (-ando, -endo).",
        examples: [
          { en: "I save energy by turning off lights.", es: "Ahorro energía apagando las luces." },
          { en: "I reduce waste by using a reusable mug.", es: "Reduzco residuos usando una taza reutilizable." }
        ]
      },
      {
        title: "Frequency & Purpose: 'every day' y 'to + verb'",
        ruleFormula: "Sentence + every day / to + [base verb]",
        explanationEs: "Usa 'every day' para indicar constancia y 'to + verbo base' para expresar el propósito de tus acciones ecológicas.",
        examples: [
          { en: "I recycle paper every day.", es: "Reciclo papel todos los días." },
          { en: "I walk to reduce carbon emissions.", es: "Camino para reducir las emisiones de carbono." }
        ]
      }
    ],
    keyVocabulary: [
      { english: "save water & electricity", spanish: "ahorrar agua y electricidad", category: "Recursos", example: "I save water and electricity at work." },
      { english: "reusable bottle", spanish: "botella reutilizable", category: "Artículos verdes", example: "Bring a reusable bottle to the office." },
      { english: "carpooling", spanish: "compartir el viaje en auto", category: "Transporte", example: "Carpooling with coworkers saves fuel." },
      { english: "reduce waste", spanish: "reducir residuos", category: "Metas ecológicas", example: "We reduce office waste every week." },
      { english: "single-use plastics", spanish: "plásticos de un solo uso", category: "Materiales", example: "Avoid single-use plastic cups." }
    ],
    tipsForStudents: [
      "Elige el ejemplo que mejor se adapte a tu trabajo real (ahorro de energía, reciclaje o transporte).",
      "Usa la fórmula: 'I protect the environment by [verbo con -ing]'.",
      "Menciona al menos dos acciones prácticas unidas por la conjunción 'and'."
    ]
  },
  {
    id: 2,
    number: 2,
    shortTitle: "Incentives for Employees",
    badgeTitle: "MODULE 2",
    questionEn: "What kind of incentives could a green company offer to its employees?",
    questionEs: "¿Qué tipo de incentivos podría ofrecer una empresa ecológica a sus empleados?",
    description: "Aprende 3 tipos de estímulos: recompensas y bonificaciones, alimentación saludable y tiempo libre, y subsidios de transporte sostenible.",
    examples: [
      {
        id: 1,
        exampleNumber: 1,
        titleEn: "Offering Rewards and Bonuses",
        titleEs: "Recompensas y bonificaciones",
        coreIdea: "Estímulos económicos, reconocimientos laborales y premios por reciclaje.",
        levels: [
          { level: 1, english: "Free lunch.", spanish: "Almuerzo gratis.", grammarFocus: "Sintagma nominal simple (Adjetivo + Sustantivo)." },
          { level: 2, english: "Free lunch for employees.", spanish: "Almuerzo gratis para los empleados.", grammarFocus: "Preposición 'for' para indicar beneficiarios." },
          { level: 3, english: "Free lunch for employees every Friday.", spanish: "Almuerzo gratis para los empleados todos los viernes.", grammarFocus: "Día de la semana con mayúscula inicial + 'every'." },
          { level: 4, english: "A green company can offer free lunch.", spanish: "Una empresa ecológica puede ofrecer almuerzo gratis.", grammarFocus: "Sujeto singular + modal 'can' + verbo base 'offer'." },
          { level: 5, english: "A green company can offer free lunch and rewards.", spanish: "Una empresa ecológica puede ofrecer almuerzo gratis y recompensas.", grammarFocus: "Sustantivos compuestos unidos por 'and'." },
          { level: 6, english: "A green company can offer free lunch and green rewards.", spanish: "Una empresa ecológica puede ofrecer almuerzo gratis y recompensas ecológicas.", grammarFocus: "Adjetivo temático 'green' antes de sustantivo plural." },
          { level: 7, english: "A green company can offer rewards for recycling.", spanish: "Una empresa ecológica puede ofrecer recompensas por reciclar.", grammarFocus: "Preposición 'for' seguida del gerundio '-ing'." },
          { level: 8, english: "A green company can offer rewards for recycling and saving energy.", spanish: "Una empresa ecológica puede ofrecer recompensas por reciclar y ahorrar energía.", grammarFocus: "Estructuras paralelas con '-ing': recycling and saving energy." },
          { level: 9, english: "A green company can offer rewards for recycling and using public transportation.", spanish: "Una empresa ecológica puede ofrecer recompensas por reciclar y usar el transporte público.", grammarFocus: "Frase nominal ampliada: 'using public transportation'." },
          { level: 10, english: "A green company can offer rewards, extra free time, and other benefits to employees who protect the environment.", spanish: "Una empresa ecológica puede ofrecer recompensas, tiempo libre adicional y otros beneficios a los empleados que protegen el medio ambiente.", grammarFocus: "Enumeración con coma serial + cláusula relativa con 'who'." }
        ]
      },
      {
        id: 2,
        exampleNumber: 2,
        titleEn: "Free Meals and Extra Time Off",
        titleEs: "Alimentación saludable y tiempo libre adicional",
        coreIdea: "Bienestar, jornadas laborales flexibles y descansos remunerados como premio ecológico.",
        levels: [
          { level: 1, english: "Extra free time.", spanish: "Tiempo libre adicional.", grammarFocus: "Sintagma nominal adjetivo + sustantivo." },
          { level: 2, english: "Extra free time for workers.", spanish: "Tiempo libre adicional para los trabajadores.", grammarFocus: "Preposición 'for' con sustantivo plural." },
          { level: 3, english: "Extra free time on Friday afternoon.", spanish: "Tiempo libre adicional el viernes por la tarde.", grammarFocus: "Preposición 'on' con días específicos de la semana." },
          { level: 4, english: "Companies could offer extra free time.", spanish: "Las empresas podrían ofrecer tiempo libre adicional.", grammarFocus: "Verbo modal 'could' para sugerencias amables." },
          { level: 5, english: "Companies could offer paid time off and healthy meals.", spanish: "Las empresas podrían ofrecer tiempo libre remunerado y comidas saludables.", grammarFocus: "Expresión laboral clave: 'paid time off' (tiempo remunerado)." },
          { level: 6, english: "A green company can give free vegetarian meals to employees.", spanish: "Una empresa ecológica puede dar comidas vegetarianas gratis a los empleados.", grammarFocus: "Verbo 'give [something] to [someone]'." },
          { level: 7, english: "A sustainable company can offer free healthy lunches and extra vacation days.", spanish: "Una empresa sostenible puede ofrecer almuerzos saludables gratis y días de vacaciones adicionales.", grammarFocus: "Adjetivo 'sustainable' + beneficios de bienestar." },
          { level: 8, english: "A green company can provide free organic meals and half-day Fridays to eco-friendly teams.", spanish: "Una empresa ecológica puede brindar comidas orgánicas gratis y viernes de media jornada a los equipos ecológicos.", grammarFocus: "Beneficio laboral popular: 'half-day Fridays'." },
          { level: 9, english: "A green company could motivate staff by offering free nutritious food, wellness workshops, and extra paid time off.", spanish: "Una empresa ecológica podría motivar al personal ofreciendo comida nutritiva gratis, talleres de bienestar y tiempo libre remunerado adicional.", grammarFocus: "Estructura 'motivate staff by offering...'." },
          { level: 10, english: "A sustainable business could offer free healthy meals, flexible schedules, and extra time off to workers who adopt green habits.", spanish: "Un negocio sostenible podría ofrecer comidas saludables gratis, horarios flexibles y tiempo libre adicional a los trabajadores que adopten hábitos ecológicos.", grammarFocus: "Propuesta completa con tres incentivos y cláusula relativa 'who adopt green habits'." }
        ]
      },
      {
        id: 3,
        exampleNumber: 3,
        titleEn: "Supporting Public Transit and Commuting",
        titleEs: "Apoyo al transporte público y movilidad sostenible",
        coreIdea: "Subsidios de transporte, pases de autobús y facilidades para bicicletas.",
        levels: [
          { level: 1, english: "Bus passes.", spanish: "Pases de autobús.", grammarFocus: "Sustantivo compuesto plural." },
          { level: 2, english: "Free bus passes for employees.", spanish: "Pases de autobús gratuitos para los empleados.", grammarFocus: "Adjetivo calificador 'free' + beneficiarios." },
          { level: 3, english: "Free bus cards and bicycle discounts.", spanish: "Tarjetas de autobús gratis y descuentos en bicicletas.", grammarFocus: "Coordinación de dos incentivos de transporte." },
          { level: 4, english: "A green company can subsidize public transportation.", spanish: "Una empresa ecológica puede subsidiar el transporte público.", grammarFocus: "Verbo formal de beneficio: 'subsidize'." },
          { level: 5, english: "A green company can pay for monthly transit tickets.", spanish: "Una empresa ecológica puede pagar boletos mensuales de tránsito.", grammarFocus: "Phrasal verb 'pay for' + adjetivo temporal 'monthly'." },
          { level: 6, english: "Companies could offer discounts on electric bikes and scooters.", spanish: "Las empresas podrían ofrecer descuentos en bicicletas eléctricas y patinetas.", grammarFocus: "Preposición 'on' para indicar descuentos específicos." },
          { level: 7, english: "A green company can provide free public transport passes to workers who commute sustainably.", spanish: "Una empresa ecológica puede proporcionar pases de transporte público gratuitos a los trabajadores que viajan de forma sostenible.", grammarFocus: "Verbo de movilidad cotidiana: 'commute sustainably'." },
          { level: 8, english: "A green business can offer bicycle maintenance services and transit subsidies to all employees.", spanish: "Un negocio ecológico puede ofrecer servicios de mantenimiento de bicicletas y subsidios de tránsito a todos los empleados.", grammarFocus: "Determinador cuantificador universal: 'to all employees'." },
          { level: 9, english: "A sustainable company could reward employees with free transit cards, parking spots for bicycles, and cash bonuses for carpooling.", spanish: "Una empresa sostenible podría premiar a los empleados con tarjetas de tránsito gratis, puestos de estacionamiento para bicicletas y bonos en efectivo por compartir vehículo.", grammarFocus: "Estructura 'reward someone with [something]'." },
          { level: 10, english: "A green company can offer transportation vouchers, bicycle repair support, and financial incentives to workers who leave their cars at home.", spanish: "Una empresa ecológica puede ofrecer vales de transporte, apoyo para reparar bicicletas e incentivos económicos a los trabajadores que dejan sus automóviles en casa.", grammarFocus: "Construcción avanzada A2 con resultado ecológico explícito." }
        ]
      }
    ],
    grammarTopics: [
      {
        title: "Subject + CAN / COULD + Base Verb",
        ruleFormula: "A green company + can / could + offer + [incentives]",
        explanationEs: "Usa 'can' para posibilidades concretas y 'could' para plantear sugerencias amables e hipotéticas.",
        examples: [
          { en: "Companies can offer rewards.", es: "Las empresas pueden ofrecer recompensas." },
          { en: "A company could give extra free time.", es: "Una empresa podría dar tiempo libre adicional." }
        ]
      },
      {
        title: "Preposition 'FOR' + Verb-ING",
        ruleFormula: "rewards / bonuses + for + [Verb-ing]",
        explanationEs: "El motivo del incentivo siempre se introduce con 'for' seguido de un verbo en '-ing'.",
        examples: [
          { en: "Rewards for recycling.", es: "Recompensas por reciclar." },
          { en: "Bonuses for saving energy.", es: "Bonificaciones por ahorrar energía." }
        ]
      }
    ],
    keyVocabulary: [
      { english: "incentives & rewards", spanish: "incentivos y recompensas", category: "Beneficios", example: "Green incentives motivate staff." },
      { english: "paid time off", spanish: "tiempo libre remunerado", category: "Condiciones laborales", example: "Companies could offer paid time off." },
      { english: "transit subsidies", spanish: "subsidios de transporte", category: "Transporte", example: "Monthly transit subsidies for workers." },
      { english: "commute sustainably", spanish: "desplazarse de forma sostenible", category: "Movilidad", example: "Workers who commute sustainably." }
    ],
    tipsForStudents: [
      "Inicia tu respuesta con 'A green company can offer...' o 'Companies could provide...'.",
      "Combina al menos dos incentivos atractivos (ej: tiempo libre y bonos de transporte).",
      "Usa la cláusula 'to employees who...' para especificar quiénes reciben los premios."
    ]
  },
  {
    id: 3,
    number: 3,
    shortTitle: "Employees & Environmental Issues",
    badgeTitle: "MODULE 3",
    questionEn: "In what other ways could businesses involve their employees in environmental issues?",
    questionEs: "¿De qué otras maneras podrían las empresas involucrar a sus empleados en asuntos ambientales?",
    description: "Aprende 3 formas de involucramiento: jornadas de reciclaje, siembra de árboles y limpieza, y campañas colaborativas en equipo.",
    examples: [
      {
        id: 1,
        exampleNumber: 1,
        titleEn: "Organizing Recycling Activities",
        titleEs: "Organización de actividades de reciclaje",
        coreIdea: "Concursos internos, separación de residuos y estaciones de reciclaje en la empresa.",
        levels: [
          { level: 1, english: "Organize recycling.", spanish: "Organizar el reciclaje.", grammarFocus: "Infinitivo / imperativo base directo." },
          { level: 2, english: "Organize recycling at work.", spanish: "Organizar el reciclaje en el trabajo.", grammarFocus: "Complemento de contexto laboral: 'at work'." },
          { level: 3, english: "Businesses can organize recycling activities.", spanish: "Las empresas pueden organizar actividades de reciclaje.", grammarFocus: "Sujeto corporativo 'Businesses' + modal 'can'." },
          { level: 4, english: "Businesses can organize recycling activities every month.", spanish: "Las empresas pueden organizar actividades de reciclaje todos los meses.", grammarFocus: "Expresión temporal de periodicidad: 'every month'." },
          { level: 5, english: "Companies can create recycling competitions between departments.", spanish: "Las empresas pueden crear competencias de reciclaje entre departamentos.", grammarFocus: "Preposición 'between' indicando dinámicas interdepartamentales." },
          { level: 6, english: "Businesses can involve workers by setting up clear recycling stations.", spanish: "Las empresas pueden involucrar a los trabajadores instalando estaciones de reciclaje claras.", grammarFocus: "Estructura 'involve [people] by [verb-ing]'." },
          { level: 7, english: "Companies can train employees to separate organic waste and electronic devices.", spanish: "Las empresas pueden capacitar a los empleados para separar residuos orgánicos y dispositivos electrónicos.", grammarFocus: "Estructura 'train someone to + infinitive'." },
          { level: 8, english: "Businesses can organize paper recycling drives and reward the team that recycles the most.", spanish: "Las empresas pueden organizar jornadas de reciclaje de papel y premiar al equipo que más recicle.", grammarFocus: "Superlativo relativo: 'the team that recycles the most'." },
          { level: 9, english: "Companies can involve employees in waste reduction workshops and monthly recycling challenges.", spanish: "Las empresas pueden involucrar a los empleados en talleres de reducción de residuos y desafíos mensuales de reciclaje.", grammarFocus: "Sustantivos compuestos: 'waste reduction workshops'." },
          { level: 10, english: "Businesses can actively involve staff by organizing recycling contests, practical eco-workshops, and zero-waste office challenges.", spanish: "Las empresas pueden involucrar activamente al personal organizando concursos de reciclaje, talleres ecológicos prácticos y desafíos de oficina sin residuos.", grammarFocus: "Adverbio modificador 'actively involve' + tríada de iniciativas institucionales." }
        ]
      },
      {
        id: 2,
        exampleNumber: 2,
        titleEn: "Planting Trees and Cleaning Spaces",
        titleEs: "Siembra de árboles y jornadas de limpieza",
        coreIdea: "Actividades de campo, reforestación comunitaria y voluntariado ambiental.",
        levels: [
          { level: 1, english: "Plant trees.", spanish: "Plantar árboles.", grammarFocus: "Forma base verbal directa." },
          { level: 2, english: "Employees can plant trees.", spanish: "Los empleados pueden plantar árboles.", grammarFocus: "Sujeto plural + modal 'can' + verbo base." },
          { level: 3, english: "Employees can plant trees together.", spanish: "Los empleados pueden plantar árboles juntos.", grammarFocus: "Adverbio de cooperación 'together'." },
          { level: 4, english: "Businesses can organize activities.", spanish: "Las empresas pueden organizar actividades.", grammarFocus: "Sujeto institucional plural + 'organize activities'." },
          { level: 5, english: "Businesses can organize activities to plant trees.", spanish: "Las empresas pueden organizar actividades para plantar árboles.", grammarFocus: "Infinitivo de propósito 'to plant trees'." },
          { level: 6, english: "Businesses can organize activities to plant trees and recycle.", spanish: "Las empresas pueden organizar actividades para plantar árboles y reciclar.", grammarFocus: "Infinitivos coordinados compartiendo 'to'." },
          { level: 7, english: "Businesses can organize activities to plant trees and recycle paper.", spanish: "Las empresas pueden organizar actividades para plantar árboles y reciclar papel.", grammarFocus: "Especificación de objeto directo para mayor claridad." },
          { level: 8, english: "Businesses can organize activities to plant trees, recycle paper, and save energy.", spanish: "Las empresas pueden organizar actividades para plantar árboles, reciclar papel y ahorrar energía.", grammarFocus: "Tríada paralela de infinitivos con coma serial." },
          { level: 9, english: "Businesses can organize environmental activities and encourage employees to work together.", spanish: "Las empresas pueden organizar actividades ambientales y motivar a los empleados a trabajar juntos.", grammarFocus: "Estructura 'encourage employees to work together'." },
          { level: 10, english: "Businesses can involve employees in environmental projects, such as planting trees, recycling paper, and reducing waste at work.", spanish: "Las empresas pueden involucrar a los empleados en proyectos ambientales, como plantar árboles, reciclar papel y reducir los residuos en el trabajo.", grammarFocus: "Uso de 'such as' seguido de gerundios coordinados." }
        ]
      },
      {
        id: 3,
        exampleNumber: 3,
        titleEn: "Green Campaigns and Teamwork",
        titleEs: "Campañas ambientales y trabajo en equipo",
        coreIdea: "Comités ecológicos internos, celebraciones temáticas y proyectos comunitarios.",
        levels: [
          { level: 1, english: "Green campaigns.", spanish: "Campañas ecológicas.", grammarFocus: "Sintagma nominal simple." },
          { level: 2, english: "Create green campaigns.", spanish: "Crear campañas ecológicas.", grammarFocus: "Acción verbal infinitiva." },
          { level: 3, english: "Businesses can create green campaigns.", spanish: "Las empresas pueden crear campañas ecológicas.", grammarFocus: "Sujeto corporativo + 'can create'." },
          { level: 4, english: "Businesses can create environmental campaigns for employees.", spanish: "Las empresas pueden crear campañas ambientales para los empleados.", grammarFocus: "Población objetivo con preposición 'for'." },
          { level: 5, english: "Companies can launch awareness campaigns to protect local nature.", spanish: "Las empresas pueden lanzar campañas de concientización para proteger la naturaleza local.", grammarFocus: "Expresión 'awareness campaigns' (campañas de concientización)." },
          { level: 6, english: "Businesses can establish green committees led by enthusiastic workers.", spanish: "Las empresas pueden establecer comités ambientales liderados por trabajadores entusiastas.", grammarFocus: "Participio de pasado con valor adjetivo: 'led by enthusiastic workers'." },
          { level: 7, english: "Companies can invite workers to share their own eco-friendly ideas in regular meetings.", spanish: "Las empresas pueden invitar a los trabajadores a compartir sus propias ideas ecológicas en reuniones periódicas.", grammarFocus: "Estructura 'invite someone to share their ideas'." },
          { level: 8, english: "Businesses can organize environmental volunteer days and celebrate Earth Day together.", spanish: "Las empresas pueden organizar días de voluntariado ambiental y celebrar juntos el Día de la Tierra.", grammarFocus: "Fechas ecológicas mundiales: 'celebrate Earth Day together'." },
          { level: 9, english: "Companies can create green teams that plan quarterly ecological projects and promote sustainability at work.", spanish: "Las empresas pueden crear equipos ecológicos que planifiquen proyectos trimestrales y promuevan la sostenibilidad en el trabajo.", grammarFocus: "Cláusula relativa de sujeto con 'that plan... and promote...'." },
          { level: 10, english: "Businesses can involve employees by forming green committees, hosting sustainability seminars, and organizing collaborative community projects.", spanish: "Las empresas pueden involucrar a los empleados formando comités ecológicos, realizando seminarios de sostenibilidad y organizando proyectos comunitarios colaborativos.", grammarFocus: "Construcción compuesta de alto nivel A2 con 'by + ing' múltiple." }
        ]
      }
    ],
    grammarTopics: [
      {
        title: "Infinitive of Purpose: 'TO + Base Verb'",
        ruleFormula: "organize activities + to + [plant / clean / protect]",
        explanationEs: "Para explicar la finalidad de un evento corporativo, usa 'to' seguido del verbo en infinitivo.",
        examples: [
          { en: "They organize days to plant trees.", es: "Organizan jornadas para plantar árboles." },
          { en: "We meet to clean public spaces.", es: "Nos reunimos para limpiar espacios públicos." }
        ]
      },
      {
        title: "Giving Examples with 'SUCH AS'",
        ruleFormula: "projects + such as + [planting, recycling, and cleaning]",
        explanationEs: "Después de 'such as' ('tales como'), los verbos de acción van obligatoriamente con terminación '-ing'.",
        examples: [
          { en: "Green activities, such as recycling paper.", es: "Actividades ecológicas, tales como reciclar papel." },
          { en: "Initiatives, such as saving energy and planting trees.", es: "Iniciativas, tales como ahorrar energía y plantar árboles." }
        ]
      }
    ],
    keyVocabulary: [
      { english: "clean-up activities", spanish: "actividades de limpieza", category: "Iniciativas", example: "Participate in local clean-up activities." },
      { english: "green committee", spanish: "comité ambiental / ecológico", category: "Organización", example: "Join the workplace green committee." },
      { english: "raise awareness", spanish: "crear concientización", category: "Objetivos", example: "Campaigns to raise environmental awareness." },
      { english: "work together", spanish: "trabajar juntos", category: "Colaboración", example: "Employees can work together for nature." }
    ],
    tipsForStudents: [
      "Menciona iniciativas que involucren al equipo de trabajo (ej: voluntariados o comités verdes).",
      "Usa la expresión 'such as' para dar ejemplos claros de proyectos ambientales.",
      "Destaca la cooperación entre la gerencia y los empleados."
    ]
  },
  {
    id: 4,
    number: 4,
    shortTitle: "Replying to a Classmate",
    badgeTitle: "MODULE 4",
    questionEn: "How can you respond to a classmate’s opinion about the environment at work?",
    questionEs: "¿Cómo puedes responder a la opinión de un compañero sobre el medio ambiente en el trabajo?",
    description: "Aprende 3 formas de responder a un compañero: expresar acuerdo, añadir una nueva idea, o expresar una opinión diferente y formular una pregunta.",
    examples: [
      {
        id: 1,
        exampleNumber: 1,
        titleEn: "Agreeing with a Classmate's Opinion",
        titleEs: "Expresar acuerdo con un compañero",
        coreIdea: "Validar, respaldar y justificar el acuerdo con la propuesta ecológica de un compañero.",
        levels: [
          { level: 1, english: "Good idea!", spanish: "¡Buena idea!", grammarFocus: "Frase exclamativa de validación positiva." },
          { level: 2, english: "Good idea! I agree.", spanish: "¡Buena idea! Estoy de acuerdo.", grammarFocus: "Uso del verbo 'agree' en primera persona. (Nunca 'I am agree')." },
          { level: 3, english: "Good idea! I agree with you.", spanish: "¡Buena idea! Estoy de acuerdo contigo.", grammarFocus: "Preposición 'with' + pronombre objeto 'you'." },
          { level: 4, english: "Good idea! I agree with you because it helps the environment.", spanish: "¡Buena idea! Estoy de acuerdo contigo porque ayuda al medio ambiente.", grammarFocus: "Conjunción causal 'because' + verbo en tercera persona 'helps'." },
          { level: 5, english: "I agree with your opinion.", spanish: "Estoy de acuerdo con tu opinión.", grammarFocus: "Posesivo 'your' + sustantivo 'opinion'." },
          { level: 6, english: "I agree with your opinion because recycling is important.", spanish: "Estoy de acuerdo con tu opinión porque reciclar es importante.", grammarFocus: "Gerundio '-ing' como sujeto: 'recycling is important'." },
          { level: 7, english: "I also think we should save water at work.", spanish: "También pienso que debemos ahorrar agua en el trabajo.", grammarFocus: "Adverbio aditivo 'also' + modal de sugerencia moral 'should'." },
          { level: 8, english: "That is a good point. We can also save electricity.", spanish: "Ese es un buen punto. También podemos ahorrar electricidad.", grammarFocus: "Expresión cortés 'That is a good point' + modal 'can'." },
          { level: 9, english: "I agree with you. Companies should encourage employees to recycle.", spanish: "Estoy de acuerdo contigo. Las empresas deberían motivar a los empleados a reciclar.", grammarFocus: "Estructura institucional: 'Companies should encourage [people] to [verb]'." },
          { level: 10, english: "I agree with your opinion because small actions can help protect the environment. What other actions can we take at work?", spanish: "Estoy de acuerdo con tu opinión porque las pequeñas acciones pueden ayudar a proteger el medio ambiente. ¿Qué otras acciones podemos realizar en el trabajo?", grammarFocus: "Respuesta dialógica completa: acuerdo justificado + pregunta abierta de reflexión." }
        ]
      },
      {
        id: 2,
        exampleNumber: 2,
        titleEn: "Adding a New Idea to a Comment",
        titleEs: "Añadir una idea nueva al comentario",
        coreIdea: "Complementar la propuesta del compañero aportando una acción adicional que enriquezca el debate.",
        levels: [
          { level: 1, english: "I also think so.", spanish: "También pienso eso.", grammarFocus: "Frase de concordancia aditiva con 'also'." },
          { level: 2, english: "I also think so. You are right.", spanish: "También pienso eso. Tienes razón.", grammarFocus: "Validación personal: 'You are right'." },
          { level: 3, english: "I agree with your idea, and I want to add one point.", spanish: "Estoy de acuerdo con tu idea y quiero añadir un punto.", grammarFocus: "Verbo de intención comunicativa: 'want to add one point'." },
          { level: 4, english: "That is a great suggestion. We can also save paper.", spanish: "Esa es una excelente sugerencia. También podemos ahorrar papel.", grammarFocus: "Adjetivo enfático 'great' + modal 'can also'." },
          { level: 5, english: "I agree with your post. We should also avoid plastic cups.", spanish: "Estoy de acuerdo con tu publicación. También deberíamos evitar los vasos de plástico.", grammarFocus: "Verbo 'avoid' (evitar) con sustantivo plural." },
          { level: 6, english: "You make a good point, and we could also create a green committee.", spanish: "Mencionas un buen punto y también podríamos crear un comité ecológico.", grammarFocus: "Expresión idiomática 'You make a good point' + modal 'could'." },
          { level: 7, english: "I agree with your idea because saving water is essential, and we can also turn off monitors at night.", spanish: "Estoy de acuerdo con tu idea porque ahorrar agua es esencial, y también podemos apagar los monitores por la noche.", grammarFocus: "Causa con 'because' + adición práctica con 'and we can also'." },
          { level: 8, english: "That is very true. In addition to recycling paper, employees could share rides to reduce pollution.", spanish: "Eso es muy cierto. Además de reciclar papel, los empleados podrían compartir viajes para reducir la contaminación.", grammarFocus: "Conector formal de adición: 'In addition to [verb-ing]'." },
          { level: 9, english: "I support your opinion, and I would like to add that companies should provide recycling bins in every office.", spanish: "Apoyo tu opinión y me gustaría agregar que las empresas deberían proporcionar contenedores de reciclaje en cada oficina.", grammarFocus: "Frase de cortesía académica: 'I would like to add that...'." },
          { level: 10, english: "I agree with your proposal because collaboration is key. We can also organize clean-up days, and what do you think about offering bicycle incentives?", spanish: "Estoy de acuerdo con tu propuesta porque la colaboración es clave. También podemos organizar jornadas de limpieza, ¿y qué opinas sobre ofrecer incentivos para bicicletas?", grammarFocus: "Réplica formativa completa: acuerdo + argumento + idea adicional + pregunta dialógica." }
        ]
      },
      {
        id: 3,
        exampleNumber: 3,
        titleEn: "Expressing a Different Opinion and Asking a Question",
        titleEs: "Expresar una opinión diferente y hacer una pregunta",
        coreIdea: "Presentar alternativas de manera cortés y fomentar el pensamiento crítico mediante preguntas abiertas.",
        levels: [
          { level: 1, english: "I understand your point.", spanish: "Entiendo tu punto de vista.", grammarFocus: "Frase de cortesía empática: 'I understand your point'." },
          { level: 2, english: "I understand your point, but I have another idea.", spanish: "Entiendo tu punto de vista, pero tengo otra idea.", grammarFocus: "Conector adversativo moderado 'but' + nueva propuesta." },
          { level: 3, english: "I respect your opinion. However, I think transportation is also important.", spanish: "Respeto tu opinión. Sin embargo, pienso que el transporte también es importante.", grammarFocus: "Conector formal de contraste 'However,' (con coma)." },
          { level: 4, english: "That is an interesting idea. Do you think bonuses are effective?", spanish: "Esa es una idea interesante. ¿Crees que las bonificaciones son efectivas?", grammarFocus: "Pregunta indirecta en presente simple: 'Do you think...?'." },
          { level: 5, english: "I understand your perspective. I think non-monetary incentives are better for motivation.", spanish: "Entiendo tu perspectiva. Pienso que los incentivos no monetarios son mejores para la motivación.", grammarFocus: "Comparativo de superioridad: 'better for motivation'." },
          { level: 6, english: "I respect your comment, but why do you think companies hesitate to invest in green projects?", spanish: "Respeto tu comentario, pero ¿por qué crees que las empresas dudan en invertir en proyectos ecológicos?", grammarFocus: "Pregunta de causa crítica con 'Why do you think...?'." },
          { level: 7, english: "I see your point about recycling. What other practical steps can workers take during lunch breaks?", spanish: "Veo tu punto sobre el reciclaje. ¿Qué otras medidas prácticas pueden tomar los trabajadores durante los descansos de almuerzo?", grammarFocus: "Pregunta abierta con 'What other practical steps can [people] take...?'." },
          { level: 8, english: "I understand your point, but training employees is equally important. How can managers encourage daily participation?", spanish: "Entiendo tu punto, pero capacitar a los empleados es igualmente importante. ¿Cómo pueden los gerentes incentivar la participación diaria?", grammarFocus: "Uso de 'How can [subject] encourage...?' para profundizar el análisis." },
          { level: 9, english: "I value your perspective on saving energy. Have you considered that remote work also reduces carbon emissions?", spanish: "Valoro tu perspectiva sobre el ahorro de energía. ¿Has considerado que el trabajo remoto también reduce las emisiones de carbono?", grammarFocus: "Pregunta cortés en Present Perfect: 'Have you considered that...?'." },
          { level: 10, english: "I respect your opinion, though I think providing public transit passes has a greater environmental impact. What do you think about combining both strategies?", spanish: "Respeto tu opinión, aunque pienso que proporcionar pases de transporte público tiene un mayor impacto ambiental. ¿Qué piensas acerca de combinar ambas estrategias?", grammarFocus: "Intervención de alto nivel A2: respeto + contraste argumentado + propuesta integradora con pregunta." }
        ]
      }
    ],
    grammarTopics: [
      {
        title: "Expressing Agreement: 'I agree with you'",
        ruleFormula: "I agree with + [you / your opinion / that idea]",
        explanationEs: "En inglés nunca se dice 'I am agree'; siempre se usa el verbo directo 'I agree'.",
        examples: [
          { en: "I agree with you.", es: "Estoy de acuerdo contigo." },
          { en: "I agree with your proposal.", es: "Estoy de acuerdo con tu propuesta." }
        ]
      },
      {
        title: "Respectful Contrast: 'However' & 'Though'",
        ruleFormula: "I respect your opinion. However, / though I think...",
        explanationEs: "Para debatir constructivamente en un foro educativo, valida primero al compañero y luego introduce tu perspectiva con cortesía.",
        examples: [
          { en: "I understand your point. However, I have another idea.", es: "Entiendo tu punto. Sin embargo, tengo otra idea." },
          { en: "I respect your opinion, though transport is vital.", es: "Respeto tu opinión, aunque el transporte es vital." }
        ]
      },
      {
        title: "Follow-up Questions: 'What do you think about...?'",
        ruleFormula: "What do you think about + [Verb-ing / Noun]?",
        explanationEs: "Cierra siempre con una pregunta abierta para generar conversación dialógica con tus compañeros del SENA.",
        examples: [
          { en: "What other actions can we take?", es: "¿Qué otras acciones podemos tomar?" },
          { en: "What do you think about offering bicycle incentives?", es: "¿Qué opinas sobre ofrecer incentivos para bicicletas?" }
        ]
      }
    ],
    keyVocabulary: [
      { english: "I agree with you", spanish: "estoy de acuerdo contigo", category: "Acuerdo", example: "I agree with you, saving water is crucial." },
      { english: "I also think so", spanish: "yo también pienso eso", category: "Adición", example: "I also think so, we can save paper." },
      { english: "I understand your point", spanish: "entiendo tu punto de vista", category: "Cortesía", example: "I understand your point, but let us discuss incentives." },
      { english: "What do you think about...?", spanish: "¿qué opinas / qué piensas acerca de...?", category: "Interacción", example: "What do you think about public transit?" }
    ],
    tipsForStudents: [
      "Saluda cordialmente al compañero: 'Hello compañero, good idea!' o 'I agree with you'.",
      "Justifica tu opinión con 'because...' para no limitarte a un simple 'I agree'.",
      "Añade una idea nueva o haz una pregunta al final para que tu réplica sea calificada con excelencia.",
      "Regla formativa: RESPECT · AGREE · ADD AN IDEA · ASK A QUESTION."
    ]
  }
];

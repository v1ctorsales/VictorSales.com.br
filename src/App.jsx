import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Link,
  Icon,
  SimpleGrid,
  Card,
  Image,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaExternalLinkAlt,
  FaEnvelope,
  FaCopy,
} from "react-icons/fa";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaUserFriends } from "react-icons/fa";

/* =========================
   Typing title (cargo)
========================= */
function TypingTitle({
  texts = ["Software Engineer", "Machine Learning Engineer"],
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseAfterType = 1200,
}) {
  const [idx, setIdx] = React.useState(0);
  const [sub, setSub] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);
  const [showCursor, setShowCursor] = React.useState(true);

  const longest = React.useMemo(
    () => texts.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [texts]
  );

  React.useEffect(() => {
    const full = texts[idx];
    if (!deleting && sub.length < full.length) {
      const t = setTimeout(
        () => setSub(full.slice(0, sub.length + 1)),
        typingSpeed
      );
      return () => clearTimeout(t);
    }
    if (!deleting && sub.length === full.length) {
      const t = setTimeout(() => setDeleting(true), pauseAfterType);
      return () => clearTimeout(t);
    }
    if (deleting && sub.length > 0) {
      const t = setTimeout(
        () => setSub(full.slice(0, sub.length - 1)),
        deletingSpeed
      );
      return () => clearTimeout(t);
    }
    if (deleting && sub.length === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setIdx((idx + 1) % texts.length);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [sub, deleting, idx, texts, typingSpeed, deletingSpeed, pauseAfterType]);

  React.useEffect(() => {
    const t = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <Box position="relative" display="inline-block">
      <Text
        color="transparent"
        userSelect="none"
        whiteSpace="nowrap"
        fontSize="2xl"
        fontWeight="medium"
        aria-hidden
      >
        {longest}
      </Text>

      <HStack
        spacing={1}
        position="absolute"
        inset={0}
        align="center"
        pointerEvents="none"
      >
        <Text
          color="dracula.cyan"
          fontSize="2xl"
          fontWeight="medium"
          whiteSpace="nowrap"
        >
          {sub}
        </Text>
        <Box as="span" color="dracula.cyan" opacity={showCursor ? 1 : 0}>
          |
        </Box>
      </HStack>
    </Box>
  );
}

/* =========================
   Flags + Lang Toggle
========================= */
function FlagBR(props) {
  return (
    <Box as="svg" viewBox="0 0 640 480" boxSize="18px" {...props}>
      <path fill="#229e45" d="M0 0h640v480H0z" />
      <path fill="#f8e509" d="m320 72 236.9 168L320 408 83.1 240z" />
      <circle cx="320" cy="240" r="80" fill="#012169" />
      <path fill="#fff" d="M250 240c60-40 180-40 220 0a130 130 0 0 0-220 0z" />
    </Box>
  );
}
function FlagUK(props) {
  return (
    <Box as="svg" viewBox="0 0 60 30" boxSize="18px" {...props}>
      <path fill="#012169" d="M0 0h60v30H0z" />
      <path stroke="#fff" strokeWidth="6" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#C8102E" strokeWidth="4" d="M0 0l60 30M60 0L0 30" />
      <path fill="#fff" d="M25 0h10v30H25zM0 10v10h60V10z" />
      <path fill="#C8102E" d="M27 0h6v30h-6zM0 12h60v6H0z" />
    </Box>
  );
}

/* =========================
   i18n (EN/PT) + helper t()
========================= */
const I18N = {
  en: {
    hero: {
      btn: "Download CV",
      blurb_1: "I build scalable backend systems and train LLMs efficiently.",
      blurb_2: "I integrate AI into modern software engineering workflows.",
      typing: ["Software Engineer", "Machine Learning Engineer"],
    },
    sections: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      togglePersonal: "Personal",
      toggleContributor: "Contributor",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
      production: "Production",
      github: "GitHub",
      copyright: "© 2025 Victor Sales",
    },
    skills: [
      "Java",
      "TypeScript",
      "Python",
      "SQL",
      "Backend",
      "Machine Learning",
      "Data Science",
      "Artificial Intelligence",
    ],
    projects: [
      {
        title: "iSendit",
        desc: "A script creation system for cybersecurity companies, automating the creation of firewall rules and objects.",
        image: "/images/isendit.png",
        github: "https://github.com/v1ctorsales/iSendit",
        demo: "https://isendit.com.br",
        tags: ["JavaScript", "React", "Node", "SQL"],
      },
      {
        title: "myterminal",
        desc: "A terminal with utilities to download music and videos from various platforms, shorten URLs, create QR codes, and much more.",
        image: "/images/terminal.png",
        github: "https://github.com/v1ctorsales/Terminal",
        demo: "https://app.victorsales.com.br",
        tags: ["JavaScript", "Node", "APIs"],
      },
      {
        title: "Starvation Map",
        desc: "A visual data-driven platform to map global hunger spots, trends and raise awareness.",
        image: "/images/worldmap.jpg",
        github: "",
        demo: "",
        tags: ["Python", "AI / ML", "Javascript", "React"],
        hidden: true,
      },
    ],
    contributions: [
      {
        title: "Hydra Launcher",
        desc: "Game launcher that allows you to download, play, and manage your games.",
        image: "/images/Hydra.avif",
        github: "https://github.com/hydralauncher/hydra",
        demo: "https://hydralauncher.gg",
        tags: ["TypeScript", "React", "Python"],
      },
      {
        title: "Stremio Web",
        desc: "Video streaming platform. Discover, watch and organize video content from easy to install addons.",
        image:
          "https://raw.githubusercontent.com/Stremio/stremio-web/development/screenshots/board.png",
        github: "https://github.com/Stremio/stremio-web",
        demo: "https://web.stremio.com",
        tags: ["Javascript", "Typescript", "React"],
      },
    ],
    experience: [
      {
        title: "Software Engineer — TAGNA Tecnologia",
        period: "📅 Apr 2024 – Aug 2025 · 1 year and 4 months",
        location: "🚩 TAGNA Tecnologia - Belo Horizonte, Brazil",
        desc: "Built web solutions with Java, Spring, Node.js, and React; integrated industrial machines to the internet (Industry 4.0). Developed components, data flows to endpoints, and API routing (controllers/services).",
        notes: "⭐ Recommendation by Diego Magalhães",
      },
      {
        title: "Software Engineer — Group Software",
        period: "📅 Apr 2023 – Apr 2024 · 1 year",
        location: "🚩 Group Software - Belo Horizonte, Brazil",
        desc: "Worked with C#, JavaScript, and SQL on a large property management system (desktop & web). Fixed JS bugs, adjusted controllers/models, and optimized SQL Server queries.",
      },
      {
        title: "Cybersecurity Analyst — Logicnet",
        period: "📅 Mar 2022 – Apr 2023 · 1 year and 1 month",
        location: "🚩 Logicnet - Belo Horizonte, Brazil",
        desc: "Automated security processes with VBScript and Python; log analysis on Windows/Linux. Configured/monitored 400+ firewalls (incl. Prosecutor’s Office), enforcing security policies.",
      },
    ],
    education: [
      {
        titleClosed:
          "M.Sc. — Artificial Intelligence for Sustainable Societies",
        titleOpen: "Master of Science in Sustainable Information Technologies",
        period: "📅 Aug 2025 – Aug 2027 · 2 years",
        location:
          "🚩 Tallinn University (EE) • Universidade Lusófona (PT) • Tampere University (FI)",
        notes: [
          "⭐ Erasmus Mundus Scholarship for Academic Excellence — European Union funded",
        ],
      },
      //{
      //  titleClosed: "M.SS. — Sustainable Information Technologies ",
      //  titleOpen: "Master of Social Science — Sustainable Information Technologies ",
      //  period: "📅 Aug 2025 – Aug 2027 · 2 years",
      //  location: "🚩 Tampere University (FI)",
      // notes: [
      //   "⭐ Erasmus Mundus Scholarship for Academic Excellence — European Union funded"
      // ],
      // },

      {
        titleClosed: "B.Sc. R. — Artificial Intelligence",
        titleOpen:
          "Bachelor of Science Research — Artificial Intelligence Usage in Agriculture",
        period: "📅 Sep 2024 – Dec 2024 · 4 months",
        location: "🚩 University of South Bohemia — České Budějovice, Czechia",
        notes: [
          "📰 Research on AI in Agriculture",
          "⭐ Recommendation by M.Sc. & M.Eng. Tomáš Zoubek",
        ],
      },
      {
        titleClosed: "B.Sc. — Information Systems",
        titleOpen: "Bachelor of Science — Information Systems",
        period: "📅 Jan 2022 – Jul 2025 · 3 years and 6 months",
        location: "🚩 Faculdade Pitágoras — Contagem, Brazil",
        notes: [
          "📰 Thesis on IoT, AI, and Software Engineering for Sustainability",
          "⭐ GPA 3.91 / 4",
        ],
      },
    ],
    contact: {
      lead: "Let's talk about opportunities or projects.",
      emailCopied: "Copied!",
      linkedinLabel: "/v1ctorsales",
      githubLabel: "/v1ctorsales",
    },
  },
  pt: {
    hero: {
      btn: "Baixar Currículo",
      blurb_1: "Construo backends escaláveis e treino LLMs com eficiência.",
      blurb_2: "Integro IA a fluxos modernos de engenharia de software.",
      typing: ["Engenheiro de Software", "Engenheiro de Machine Learning"],
    },
    sections: {
      about: "Sobre",
      skills: "Competências",
      projects: "Projetos",
      experience: "Experiência",
      togglePersonal: "Pessoal",
      toggleContributor: "Contribuidor",
      education: "Educação",
      contact: "Contato",
      production: "Produção",
      github: "GitHub",
      copyright: "© 2025 Victor Sales",
    },
    skills: [
      "Java",
      "TypeScript",
      "Python",
      "SQL",
      "Backend",
      "Aprendizado de Máquina",
      "Ciência de Dados",
      "Inteligência Artificial",
    ],
    projects: [
      {
        title: "iSendit",
        desc: "Sistema de automação para empresas de cibersegurança, gerando scripts e regras de firewall de forma inteligente.",
        image: "/images/isendit.png",
        github: "https://github.com/v1ctorsales/iSendit",
        demo: "https://isendit.com.br",
        tags: ["JavaScript", "React", "Node", "SQL"],
      },
      {
        title: "myterminal",
        desc: "Terminal com utilitários para baixar vídeos/músicas, encurtar links, gerar QR Codes e muito mais.",
        image: "/images/terminal.png",
        github: "https://github.com/v1ctorsales/Terminal",
        demo: "https://app.victorsales.com.br",
        tags: ["JavaScript", "Node", "APIs"],
      },
      {
        title: "Starvation Map",
        desc: "Plataforma visual baseada em dados para mapear focos de fome ao redor do mundo e gerar consciência global.",
        image: "/images/worldmap.jpg",
        github: "",
        demo: "",
        tags: ["Python", "IA / ML", "Javascript", "React"],
        hidden: true,
      },
    ],
    contributions: [
      {
        title: "Hydra Launcher",
        desc: "Launcher de jogos que permite baixar, gerenciar e acompanhar estatísticas da sua biblioteca.",
        image: "/images/Hydra.avif",
        github: "https://github.com/hydralauncher/hydra",
        demo: "https://hydralauncher.gg",
        tags: ["TypeScript", "React", "Python"],
      },
      {
        title: "Stremio Web",
        desc: "Plataforma de streaming modular para descobrir, assistir e organizar conteúdo com extensões.",
        image:
          "https://raw.githubusercontent.com/Stremio/stremio-web/development/screenshots/board.png",
        github: "https://github.com/Stremio/stremio-web",
        demo: "https://web.stremio.com",
        tags: ["Javascript", "Typescript", "React"],
      },
    ],

    experience: [
      {
        title: "Engenheiro de Software — TAGNA Tecnologia",
        period: "📅 Abr 2024 – Ago 2025 · 1 ano e 4 meses",
        location: "🚩 TAGNA Tecnologia - Belo Horizonte, Brasil",
        desc: "Desenvolvi soluções web com Java, Spring, Node.js e React; integrei máquinas industriais à internet (Indústria 4.0). Criei componentes, fluxos de dados para endpoints e roteamento de APIs (controllers/services).",
      },
      {
        title: "Engenheiro de Software — Group Software",
        period: "📅 Abr 2023 – Abr 2024 · 1 ano",
        location: "🚩 Group Software - Belo Horizonte, Brasil",
        desc: "Trabalhei com C#, JavaScript e SQL em um grande sistema de gestão imobiliária (desktop & web). Corrigi bugs em JS, ajustei controllers/models e otimizei consultas no SQL Server.",
      },
      {
        title: "Analista de Cibersegurança — Logicnet",
        period: "📅 Mar 2022 – Abr 2023 · 1 ano e 1 mês",
        location: "🚩 Logicnet - Belo Horizonte, Brasil",
        desc: "Automatizei processos de segurança com VBScript e Python; análise de logs em Windows/Linux. Configurei/monitorei mais de 400 firewalls (incluindo o Ministério Público), aplicando políticas de segurança.",
      },
    ],
    education: [
      {
        titleClosed:
          "M.Sc. — Inteligência Artificial para Sociedades Sustentáveis",
        titleOpen:
          "Mestrado — Inteligência Artificial para Sociedades Sustentáveis",
        period: "📅 Ago 2025 – Ago 2027 · 2 anos",
        location:
          "🚩 Tallinn University (EE) • Universidade Lusófona (PT) • Tampere University (FI)",
        notes: [
          "⭐ Bolsa Erasmus Mundus de Excelência Acadêmica — Financiada pela União Europeia",
        ],
      },
      {
        titleClosed: "B.Sc. R. — Inteligência Artificial",
        titleOpen:
          "Pesquisa de Bacharelado — Uso de Inteligência Artificial na Agricultura",
        period: "📅 Set 2024 – Dez 2024 · 4 meses",
        location: "🚩 University of South Bohemia — České Budějovice, Tchéquia",
        notes: [
          "📰 Pesquisa em Inteligência Artificial na Agricultura",
          "⭐ Recomendação do M.Sc. & M.Eng. Tomáš Zoubek",
        ],
      },
      {
        titleClosed: "B.Sc. — Sistemas de Informação",
        titleOpen: "Bacharelado — Sistemas de Informação",
        period: "📅 Jan 2022 – Jul 2025 · 3 anos e 6 meses",
        location: "🚩 Faculdade Pitágoras — Contagem, Brasil",
        notes: [
          "📰 Tese sobre IoT, IA e Engenharia de Software para Sustentabilidade",
          "⭐ CR 3.91 / 4",
        ],
      },
    ],
    contact: {
      lead: "Vamos conversar sobre oportunidades ou projetos.",
      emailCopied: "Copiado!",
      linkedinLabel: "/v1ctorsales",
      githubLabel: "/v1ctorsales",
    },
  },
};

const t = (lang, path) =>
  path.split(".").reduce((acc, k) => acc?.[k], I18N[lang]);

/* =========================
   TinyLangToggle
========================= */
function TinyLangToggle({ value, onChange }) {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const next = value === "en" ? "pt" : "en";
  const label = next === "en" ? "Switch to English" : "Mudar para Português";

  return (
    <Box
      position="fixed"
      top="12px"
      right="16px"
      zIndex="docked"
      transition="opacity 200ms ease, transform 200ms ease"
      opacity={visible ? 1 : 0}
      transform={visible ? "translateY(0)" : "translateY(-8px)"}
      pointerEvents={visible ? "auto" : "none"}
    >
      <Button
        aria-label={label}
        onClick={() => onChange(next)}
        rounded="full"
        minW="36px"
        h="36px"
        p="0"
        bg="dracula.bg"
        color="dracula.fg"
        border="1px solid"
        borderColor="dracula.selection"
        _hover={{ bg: "dracula.selection" }}
      >
        {next === "en" ? <FlagUK /> : <FlagBR />}
      </Button>
    </Box>
  );
}

/* =========================
   Constantes
========================= */
const sections = {
  home: "home",
  about: "about",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  education: "education",
  contact: "contact",
};

const projects = [
  {
    title: "iSendit",
    desc: "A script creation system for cybersecurity companies, automating the creation of firewall rules and objects.",
    image: "/images/isendit.png",
    github: "https://github.com/v1ctorsales/iSendit",
    demo: "https://isendit.com.br",
    tags: ["Javascript", "React", "Node", "SQL"],
  },
  {
    title: "myterminal",
    desc: "A terminal with utilities to download music and videos from various platforms, shorten URLs, create QR codes, and much more.",
    image: "/images/terminal.png",
    github: "https://github.com/v1ctorsales/Terminal",
    demo: "https://app.victorsales.com.br",
    tags: ["Javascript", "Node", "APIs"],
  },
  {
    title: "Hydra Launcher",
    desc: "Hydra is a game launcher that allows you to download, play, track your stats and manage your games all in one place.",
    image: "/images/Hydra.avif",
    github: "https://github.com/hydralauncher/hydra",
    demo: "https://hydralauncher.gg",
    tags: ["Typescript", "React", "Python"],
  },
];

const cardProps = {
  bg: "dracula.panel",
  border: "1px solid",
  borderColor: "dracula.selection",
  rounded: "2xl",
  p: 6,
};

/* =========================
   Seções
========================= */
function Hero({ lang = "en" }) {
  return (
    <Box id={sections.home} bg="dracula.bg">
      <Container maxW="container" px={4} py={{ base: 16, md: 24 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          gap={12}
        >
          {/* Foto */}
          <Box flexShrink={0}>
            <Image
              src="/images/profilepic.jpg"
              alt="Victor Sales"
              boxSize={{ base: "180px", md: "240px" }}
              borderRadius="full"
              border="4px solid"
              borderColor="dracula.line"
              boxShadow="0 0 20px #6272A4"
            />
          </Box>

          {/* Texto */}
          <VStack
            spacing={6}
            textAlign={{ base: "center", md: "left" }}
            align={{ base: "center", md: "start" }}
          >
            {/* Nome + Cargo */}
            <HStack spacing={6} wrap="wrap">
              <Heading size="2xl" color="dracula.fg">
                Victor Sales
              </Heading>
              <TypingTitle
                texts={t(lang, "hero.typing")}
                typingSpeed={60}
                deletingSpeed={40}
                pauseAfterType={1200}
              />
            </HStack>

            {/* Descrição bilíngue */}
            <Text color="dracula.line" fontSize="lg" maxW="600px" mt={3}>
              {t(lang, "hero.blurb_1")}
              <br />
              {t(lang, "hero.blurb_2")}
            </Text>

            {/* Botões e links sociais */}
            <HStack spacing={4} mt={5}>
              <Button
                as="a"
                href="/images/Victor Sales (ENG).pdf"
                download
                bg="dracula.fg"
                color="dracula.bg"
                rounded="2xl"
                px={6}
                py={6}
                _hover={{ filter: "brightness(1.1)" }}
                rightIcon={<FaArrowRight />}
              >
                {t(lang, "hero.btn")}
              </Button>

              <HStack spacing={3}>
                <Link
                  href="https://github.com/v1ctorsales"
                  isExternal
                  color="dracula.fg"
                  _hover={{ color: "dracula.cyan" }}
                >
                  <Icon as={FaGithub} boxSize={6} />
                </Link>
                <Link
                  href="https://linkedin.com/in/v1ctorsales"
                  isExternal
                  color="dracula.fg"
                  _hover={{ color: "dracula.cyan" }}
                >
                  <Icon as={FaLinkedin} boxSize={6} />
                </Link>
              </HStack>
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}

function About({ lang = "en" }) {
  return (
    <Box id={sections.about} bg="dracula.bg">
      <Container maxW="container" px={4} py={20}>
        <VStack spacing={6} align="start">
          <Heading color="dracula.fg">{t(lang, "sections.about")}</Heading>
          <Text color="dracula.line">
            {lang === "en"
              ? "I have over 3 years of experience in programming, mainly as a backend developer. I have worked with Java, Typescript, Python, Databases and much more. I'm currently pursuing my Masters in Artificial Intelligence for Sustainable Societies in Tallinn, Estonia."
              : "Tenho mais de 3 anos de experiência em programação, principalmente como desenvolvedor backend. Já trabalhei com Java, Typescript, Python, bancos de dados e muito mais. Atualmente mestrando em Inteligência Artificial para Sociedades Sustentáveis em Tallinn, Estônia."}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}

function Experience({ lang = "en" }) {
  const items = I18N[lang].experience;

  return (
    <Box id={sections.experience} bg="dracula.bg">
      <Container maxW="container" px={4} py={20}>
        <VStack spacing={6} align="start" w="full">
          <Heading color="dracula.fg">{t(lang, "sections.experience")}</Heading>

          <VStack spacing={2} w="full">
            {items.map((it) => (
              <ExpandableBullet
                key={it.title}
                title={it.title}
                details={
                  <VStack align="start" spacing={1.5}>
                    <Text color="dracula.line">{it.period}</Text>
                    <Text>{it.location}</Text>
                    <Text>{it.desc}</Text>
                  </VStack>
                }
              />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

/* Expandable (retrocompat: title OR titleClosed/titleOpen) */
function ExpandableBullet({ title, titleClosed, titleOpen, details }) {
  const [open, setOpen] = React.useState(false);

  const closed = titleClosed ?? title ?? "";
  const openTitle = titleOpen ?? closed;
  const isOpen = open;
  const displayKey = isOpen ? "open" : "closed";

  const MotionHStack = motion(HStack);
  const MotionText = motion(Text);
  const MotionBox = motion(Box);
  const MotionIcon = motion(Icon);

  return (
    <Box w="full">
      {/* Linha clicável */}
      <MotionHStack
        as="button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        w="full"
        spacing={3}
        align="center"
        cursor="pointer"
        color="dracula.fg"
        _hover={{ color: "dracula.cyan" }}
        layout
        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.6 }}
      >
        {/* bullet visual */}
        <Box w="8px" h="8px" rounded="full" bg="dracula.fg" opacity={0.9} />

        {/* Título com animação de troca (cresce/encolhe) */}
        <HStack spacing={2}>
          <AnimatePresence mode="wait" initial={false}>
            <MotionText
              key={displayKey}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              whiteSpace="normal"
            >
              {isOpen ? openTitle : closed}
            </MotionText>
          </AnimatePresence>

          <MotionIcon
            as={FiPlus}
            color="dracula.selection"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "tween", duration: 0.18 }}
          />
        </HStack>
      </MotionHStack>

      {/* Conteúdo colapsável com animate height + fade */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <MotionBox
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
            overflow="hidden"
            ml={7}
          >
            <Box
              borderLeft="2px solid"
              borderColor="dracula.selection"
              pl={4}
              py={2}
              color="dracula.fg"
            >
              {/* também dá um pequeno fade/slide no bloco interno */}
              <MotionBox
                initial={{ y: -4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {details}
              </MotionBox>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

const noteLinks = {
  // === English ===
  "Thesis on IoT, AI, and Software Engineering for Sustainability":
    "/images/victorsales-usb.pdf",
  "Research on AI in Agriculture": "/images/research-ai-on-agriculture.pdf",
  "Recommendation by M.Sc. & M.Eng. Tomáš Zoubek": "/images/letter-zoubek.pdf",

  // === Português ===
  "Tese sobre IoT, IA e Engenharia de Software para Sustentabilidade":
    "/images/victorsales-usb.pdf",
  "Pesquisa em Inteligência Artificial na Agricultura":
    "/images/research-ai-on-agriculture.pdf",
  "Recomendação do M.Sc. & M.Eng. Tomáš Zoubek": "/images/letter-zoubek.pdf",
};

function Education({ lang = "en" }) {
  const items = I18N[lang].education;

  return (
    <Box id="education" bg="dracula.bg">
      <Container maxW="container" px={4} py={20}>
        <VStack spacing={6} align="start" w="full">
          <Heading color="dracula.fg">{t(lang, "sections.education")}</Heading>
          <VStack spacing={2} w="full">
            {items.map((it) => (
              <ExpandableBullet
                key={it.titleClosed}
                titleClosed={it.titleClosed}
                titleOpen={it.titleOpen}
                details={
                  <VStack align="start" spacing={1.5}>
                    <Text color="dracula.line">{it.period}</Text>
                    <Text>{it.location}</Text>

                    {it.notes.map((note, idx) => {
                      // remove emojis e espaços extras antes de comparar
                      const cleaned = note.replace(/^[^\w]+/, "").trim();
                      const file = noteLinks[cleaned];

                      return (
                        <HStack key={idx} spacing={2} align="center">
                          <Text>{note}</Text>
                          {file && (
                            <Link
                              href={file}
                              target="_blank"
                              rel="noopener noreferrer"
                              color="dracula.line"
                              _hover={{ color: "dracula.fg" }}
                            >
                              <Icon as={FaExternalLinkAlt} boxSize={3.5} />
                            </Link>
                          )}
                        </HStack>
                      );
                    })}
                  </VStack>
                }
              />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

function Skills({ lang = "en" }) {
  const chip = {
    bg: "dracula.selection",
    color: "dracula.fg",
    px: 3,
    py: 1.5,
    rounded: "xl",
    border: "1px solid",
    borderColor: "dracula.line",
    _hover: { bg: "dracula.line" },
  };

  return (
    <Box id={sections.skills} bg="dracula.bg">
      <Container maxW="container" px={4} py={20}>
        <VStack spacing={8} align="start">
          <Heading color="dracula.fg">{t(lang, "sections.skills")}</Heading>
          <HStack wrap="wrap" gap={3}>
            {I18N[lang].skills.map((label) => (
              <Box key={label} {...chip}>
                {label}
              </Box>
            ))}
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}

function ProjectCard({ p, lang = "en" }) {
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // até 12 graus de inclinação
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetTransform = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      cardRef.current.style.transition = "transform 0.3s ease";
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = "";
      }, 300);
    }
  };

  return (
    <Card.Root
      as={motion.div}
      ref={cardRef}
      bg="dracula.selection"
      border="1px solid"
      borderColor="dracula.line"
      rounded="2xl"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      h={"30rem"}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
    >
      {/* imagem clicável */}
      <Box position="relative" w="full" overflow="hidden">
        <Box w="full" pt="56.25%" />
        <Link
          href={p.demo}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", position: "absolute", inset: 0 }}
        >
          <Image
            src={p.image}
            alt={p.title}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Link>
      </Box>

      <Card.Body p={4} display="flex" flexDirection="column" gap={3} flex="1">
        <Heading size="md" color="dracula.fg">
          {p.title}
        </Heading>
        <Text color="dracula.fg" opacity={0.9}>
          {p.desc}
        </Text>

        <HStack wrap="wrap" gap={2}>
          {p.tags.map((tag) => (
            <Box
              key={tag}
              bg="dracula.line"
              color="dracula.fg"
              px={2.5}
              py={1}
              rounded="xl"
              fontSize="sm"
            >
              {tag}
            </Box>
          ))}
        </HStack>

        <Box mt="auto" />

        <HStack>
          <Link
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            color="dracula.fg"
          >
            <HStack gap={2}>
              <Icon as={FaGithub} />
              <Text>{t(lang, "sections.github")}</Text>
            </HStack>
          </Link>

          <Link
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            color="dracula.fg"
          >
            <HStack gap={2}>
              <Icon as={FaExternalLinkAlt} />
              <Text>{t(lang, "sections.production")}</Text>
            </HStack>
          </Link>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}

function Projects({ lang = "en" }) {
  const [view, setView] = React.useState("personal");

  const personalProjects = I18N[lang].projects;
  const contributedProjects = I18N[lang].contributions || [];
  const list = (
    view === "personal" ? personalProjects : contributedProjects
  ).filter((p) => !p.hidden);

  return (
    <Box id={sections.projects} bg="dracula.bg">
      <Container maxW="container" px={4} py={20}>
        <VStack spacing={8} align="start">
          {/* Heading + Toggle */}
          <HStack justify="space-between" w="full">
            <Heading color="dracula.fg">{I18N[lang].sections.projects}</Heading>

            <HStack
              position="relative"
              w="10rem"
              h="2.5rem"
              bg="dracula.bg"
              color="dracula.fg"
              rounded="2xl"
              cursor="pointer"
              overflow="hidden"
              onClick={() =>
                setView(view === "personal" ? "contributor" : "personal")
              }
              align="center"
              justify="center"
              border="2px solid"
              borderColor="dracula.selection"
              _hover={{ filter: "brightness(1.1)" }}
              transition="0.2s"
            >
              {/* Fundo do lado ativo */}
              <motion.div
                key={view}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                  position: "absolute",
                  width: "50%",
                  height: "100%",
                  left: view === "personal" ? 0 : "50%",
                  background: "var(--chakra-colors-dracula-selection)",
                  borderRadius: "inherit",
                  zIndex: 1,
                }}
              />

              {/* Texto + ícone animado */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    position: "absolute", // Agora apenas o texto fica posicionado, mas centralizado naturalmente
                    inset: 0,
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <Icon
                    as={view === "personal" ? FaUser : FaUserFriends}
                    boxSize={view === "personal" ? 3.5 : 5}
                    color="dracula.fg"
                  />
                  <Text fontSize="sm" fontWeight="medium" color="dracula.fg">
                    {view === "personal"
                      ? t(lang, "sections.togglePersonal")
                      : t(lang, "sections.toggleContributor")}
                  </Text>
                </motion.div>
              </AnimatePresence>
            </HStack>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            <AnimatePresence mode="popLayout">
              {list.map((p, index) => (
                <motion.div
                  key={p.title + view}
                  style={{ display: "block", width: "100%" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: index * 0.08,
                      duration: 0.22,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { delay: index * 0.08, duration: 0.18 },
                  }}
                >
                  <ProjectCard p={p} lang={lang} />
                </motion.div>
              ))}
            </AnimatePresence>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

function Contact({ lang = "en" }) {
  const email = "victor.alves.sales@hotmail.com";
  const [copied, setCopied] = React.useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box id={sections.contact} bg="dracula.bg">
      <Container maxW="container" px={4} pt={20} pb={2}>
        <VStack spacing={6} align="start">
          <Heading color="dracula.fg">{t(lang, "sections.contact")}</Heading>

          <VStack spacing={3} align="start">
            {/* Email (copia para clipboard) */}
            <HStack
              as="button"
              type="button"
              onClick={copyEmail}
              spacing={3}
              align="center"
              cursor="pointer"
              color="dracula.fg"
              _hover={{ color: "dracula.cyan" }}
            >
              <Icon as={FaEnvelope} />
              <Text>{email}</Text>
              {/* Ícone de copiar */}
              <Icon as={FaCopy} color="dracula.line" boxSize={3.5} />
              {/* "Copied!" com animação */}
              <Box
                minW="64px"
                textAlign="left"
                color="dracula.cyan"
                opacity={copied ? 1 : 0}
                transform={copied ? "translateY(0)" : "translateY(-6px)"}
                transition="opacity 300ms ease, transform 300ms ease"
                pointerEvents="none"
              >
                {t(lang, "contact.emailCopied")}
              </Box>
            </HStack>

            {/* LinkedIn */}
            <HStack
              as="a"
              href="https://www.linkedin.com/in/v1ctorsales"
              target="_blank"
              rel="noopener noreferrer"
              spacing={3}
              align="center"
              color="dracula.fg"
              _hover={{ color: "dracula.cyan" }}
            >
              <Icon as={FaLinkedin} />
              <HStack spacing={2}>
                <Text>{t(lang, "contact.linkedinLabel")}</Text>
                <Icon
                  as={FaExternalLinkAlt}
                  color="dracula.line"
                  boxSize={3.5}
                />
              </HStack>
            </HStack>

            {/* GitHub */}
            <HStack
              as="a"
              href="https://github.com/v1ctorsales"
              target="_blank"
              rel="noopener noreferrer"
              spacing={3}
              align="center"
              color="dracula.fg"
              _hover={{ color: "dracula.cyan" }}
            >
              <Icon as={FaGithub} />
              <HStack spacing={2}>
                <Text>{t(lang, "contact.githubLabel")}</Text>
                <Icon
                  as={FaExternalLinkAlt}
                  color="dracula.line"
                  boxSize={3.5}
                />
              </HStack>
            </HStack>
          </VStack>
        </VStack>

        {/* Copyright simples, alinhado à direita */}
        <Flex justify="flex-end" mt={12}>
          <Text color="dracula.line" fontSize="sm">
            {t(lang, "sections.copyright")}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

/* =========================
   App
========================= */
export default function App() {
  const [lang, setLang] = React.useState("en");

  return (
    <Box bg="dracula.bg" color="dracula.fg" minH="100vh">
      <TinyLangToggle value={lang} onChange={setLang} />
      {/* <Navbar />  // removido */}
      <Hero lang={lang} />
      <About lang={lang} />
      <Skills lang={lang} />
      <Projects lang={lang} />
      <Experience lang={lang} />
      <Education lang={lang} />
      <Contact lang={lang} />
    </Box>
  );
}

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Drawer,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import BookCardSection from "./BookCardSection";
import CategoryChipSection from "./CategoryChipSection";
import ColourScalesSection from "./ColourScalesSection";
import GoverningPrincipleSection from "./GoverningPrincipleSection";
import RadiusTokensSection from "./RadiusTokensSection";
import SemanticTokensSection from "./SemanticTokensSection";
import SpacingTokensSection from "./SpacingTokensSection";
import StatusChipSection from "./StatusChipSection";
import TypographySection from "./TypographySection";
import TypeTokensSection from "./TypeTokensSection";

const DRAWER_WIDTH = 220;

type NavItem = {
  id: string;
  labelKey: string;
  color: string;
};

type NavSection = {
  labelKey: string;
  items: NavItem[];
};

export const designSystemNavSections: NavSection[] = [
  {
    labelKey: "designSystem.nav.foundations",
    items: [
      { id: "governing", labelKey: "designSystem.nav.governing", color: "var(--color-brand-primary)" },
      { id: "colours", labelKey: "designSystem.nav.colours", color: "var(--color-brand-primary)" },
      { id: "tokens", labelKey: "designSystem.nav.tokens", color: "var(--color-text-muted)" },
      { id: "typography", labelKey: "designSystem.nav.typography", color: "var(--color-text-primary)" },
      { id: "type-tokens", labelKey: "designSystem.nav.typeTokens", color: "var(--color-text-primary)" },
      { id: "radius-tokens", labelKey: "designSystem.nav.radiusTokens", color: "var(--color-text-primary)" },
      { id: "spacing-tokens", labelKey: "designSystem.nav.spacingTokens", color: "var(--color-brand-accent)" },
    ],
  },
  {
    labelKey: "designSystem.nav.components",
    items: [
      { id: "status-chip", labelKey: "designSystem.nav.statusChip", color: "var(--color-special)" },
      { id: "category-chip", labelKey: "designSystem.nav.categoryChip", color: "var(--color-text-body)" },
      { id: "book-card", labelKey: "designSystem.nav.bookCard", color: "var(--color-text-primary)" },
    ],
  },
];

const navItems: NavItem[] = designSystemNavSections.flatMap((section) => section.items);

export default function DesignSystemPage() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [progress, setProgress] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <Box className="design-system-page" sx={{ display: "flex" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          position: "fixed",
          top: 0,
          left: { md: `${DRAWER_WIDTH}px` },
          right: 0,
          height: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "transparent",
          "& .MuiLinearProgress-bar": { bgcolor: "var(--color-brand-primary-hover)" },
        }}
      />

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "var(--color-bg-subtle)",
            borderRight: "1px solid var(--color-border-subtle)",
          },
        }}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            px: 2.5,
            pt: 3,
            pb: 2.5,
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-family-display)",
              fontSize: "15px",
              lineHeight: 1.2,
              fontWeight: 700,
              color: "var(--color-text-primary)",
              mb: 0.5,
            }}
          >
            BookGuide
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "12px",
              lineHeight: 1.5,
              color: "var(--color-text-muted)",
              whiteSpace: "pre-line",
            }}
          >
            {t("designSystem.tagline")}
          </Typography>
          <Box
            component="span"
            sx={{
              mt: 1,
              px: 0.875,
              py: 0.25,
              borderRadius: "20px",
              bgcolor: "var(--color-bg-canvas)",
              color: "var(--color-text-link)",
              fontFamily: "var(--font-family-mono)",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {t("designSystem.version")}
          </Box>
        </Toolbar>

        <List dense sx={{ px: 0, py: 1.5 }}>
          {designSystemNavSections.map((section) => (
            <Box key={section.labelKey} sx={{ mb: 1.5 }}>
              <ListItem sx={{ px: 2.5, py: 0.5 }}>
                <Typography
                  sx={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "12px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  {t(section.labelKey)}
                </Typography>
              </ListItem>
              {section.items.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    selected={activeId === item.id}
                    onClick={() => scrollTo(item.id)}
                    sx={{
                      py: 0.875,
                      px: 2.5,
                      borderLeft: 2,
                      borderColor: activeId === item.id ? "var(--color-text-link)" : "transparent",
                      bgcolor: activeId === item.id ? "var(--color-bg-subtle)" : "transparent",
                      color: activeId === item.id ? "var(--color-text-link)" : "var(--color-text-body)",
                      "&:hover": {
                        bgcolor: "var(--color-bg-curator)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: item.id === "radius-tokens" || item.id === "spacing-tokens" ? "2px" : "50%",
                          bgcolor: item.color,
                          border: item.id === "type-tokens" || item.id === "book-card" ? "1px solid var(--color-border-default)" : "none",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={t(item.labelKey)}
                      primaryTypographyProps={{
                        fontSize: "12px",
                        fontWeight: activeId === item.id ? 500 : 400,
                        color: activeId === item.id ? "var(--color-text-link)" : "var(--color-text-secondary)",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </Box>
          ))}
        </List>
      </Drawer>

      <Box
        ref={mainRef}
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${DRAWER_WIDTH}px` },
          minHeight: "100vh",
          bgcolor: "var(--color-bg-canvas)",
        }}
      >
        <Box
          sx={{
            px: { xs: 3, sm: 6, md: 7 },
            pt: { xs: 4.5, sm: 6 },
            pb: { xs: 4, sm: 5 },
            bgcolor: "var(--color-bg-subtle)",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              display: "block",
              mb: 1.5,
              fontFamily: "var(--font-family-mono)",
              fontSize: "12px",
              color: "var(--color-brand-primary-hover)",
              letterSpacing: "0.18em",
            }}
          >
            {t("designSystem.eyebrow")}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-family-display)",
              fontSize: { xs: "30px", sm: "38px" },
              letterSpacing: "-0.01em",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
              mb: 0.75,
            }}
          >
            BookGuide{" "}
            <Box component="em" sx={{ color: "var(--color-text-link)", fontStyle: "normal" }}>
              Sydney
            </Box>
          </Typography>
          <Typography sx={{ fontFamily: "var(--font-family-mono)", fontSize: "12px", letterSpacing: "0.06em", color: "var(--color-text-muted)" }}>
            {t("designSystem.tagline")}
          </Typography>
        </Box>

        <Box sx={{ px: { xs: 3, sm: 6, md: 7 }, pb: 10 }}>
          <GoverningPrincipleSection first />
          <ColourScalesSection />
          <SemanticTokensSection />
          <TypographySection />
          <TypeTokensSection />
          <RadiusTokensSection />
          <SpacingTokensSection />
          <StatusChipSection />
          <CategoryChipSection />
          <BookCardSection />
        </Box>
      </Box>
    </Box>
  );
}

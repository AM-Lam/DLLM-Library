import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  List,
  CircularProgress,
  Grid,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router";
import { alpha } from "@mui/material/styles";
import {
  useNewsRecentPostsQuery,
  NewsRecentPostsQueryVariables,
  NewsStatus,
} from "../generated/graphql";
import NewsSummary from "./NewsSummary";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ItemPreview from "./ItemPreview";
import { PageLoader } from "./LoadingState";
import { semanticTokens } from "../styles/semanticTokens";

interface RecentNewsBannerProps {
  newsStatus: NewsStatus;
  isFrontPage?: boolean; // Whether this banner is on the front page (affects styling)
}

const RecentNewsBanner: React.FC<RecentNewsBannerProps> = ({
  newsStatus,
  isFrontPage,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [cardsPerView, setCardsPerView] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Media queries for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const { data, loading, error, refetch } = useNewsRecentPostsQuery({
    variables: {
      tags: [],
      limit: isFrontPage ? 1 : 2,
      offset: 0,
      newsStatus,
    } as NewsRecentPostsQueryVariables,
  });

  const handleItemClick = (itemId: string) => {
    navigate(`/item/${itemId}`);
  };

  // Calculate responsive dimensions and cards per view
  useEffect(() => {
    const calculateLayout = () => {
      let cards = 4;

      if (isMobile) {
        if (isPortrait) {
          cards = window.innerWidth < 400 ? 2 : 3; // 2-3 cards for mobile portrait
        } else {
          cards = Math.min(4, Math.floor(window.innerWidth / 200)); // At least 3 for landscape
          cards = Math.max(3, cards);
        }
      } else {
        // Desktop/tablet landscape
        cards = Math.floor(window.innerWidth / 250);
        cards = Math.max(3, Math.min(6, cards));
      }

      const maxCards = data?.newsRecentPosts.length || 10;
      setCardsPerView(Math.max(1, Math.min(cards, maxCards)));
    };

    calculateLayout();
    window.addEventListener("resize", calculateLayout);

    return () => window.removeEventListener("resize", calculateLayout);
  }, [data?.newsRecentPosts.length, isMobile, isPortrait, isLandscape]);

  const handleNewsItemClick = (newsId: string) => {
    navigate(`/news/${newsId}`);
  };

  if (loading) return <PageLoader size={32} minHeight={180} message={t("common.loading", "Loading...")} />;
  if (error) return <Typography>Error: {error.message}</Typography>;
  let title = t("news.trending");
  if (newsStatus === NewsStatus.Draft) {
    title = t("news.draft");
  }
  if (newsStatus === NewsStatus.CoEditing) {
    title = t("news.coedit");
  }

  return (
    <>
      <Box sx={{ mb: 4, width: "100%" }}>
        {/* Header Section */}
        {isFrontPage ? (
          data && (
            <Box
              sx={{
                border: `1px solid ${alpha(semanticTokens.color.brandPrimary, 0.18)}`,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(semanticTokens.color.bgSubtle, 0.06)} 0%, ${semanticTokens.color.bgCanvas} 46%, ${alpha(semanticTokens.color.bgSubtle, 0.03)} 100%)`,
                boxShadow: `0 10px 24px ${alpha(semanticTokens.color.bgSubtle, 0.06)}`,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  px: { xs: 2, md: 2.5 },
                  py: 1.5,
                  borderBottom: `1px solid ${alpha(semanticTokens.color.brandPrimary, 0.12)}`,
                  background: alpha(semanticTokens.color.bgSubtle, 0.8),
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      px: 1,
                      py: 0.35,
                      borderRadius: 999,
                      backgroundColor: alpha(semanticTokens.color.bgSubtle, 0.08),
                      color: semanticTokens.color.brandPrimary,
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Highlighted
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-family-display)",
                      fontSize: { xs: "1.15rem", md: "1.5rem" },
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      lineHeight: 1.2,
                    }}
                  >
                    {t("news.trending", "Latest stories")}
                  </Typography>
                </Box>
              </Box>

              <List sx={{ px: 2, pt: 1.5, pb: 2 }}>
                {data.newsRecentPosts.map((news) => (
                  <React.Fragment key={news.id}>
                    <NewsSummary
                      news={news}
                      onClick={handleNewsItemClick}
                    />
                    <Grid
                      container
                      spacing={{ xs: 1, sm: 2 }}
                      sx={{
                        width: "100%",
                        mt: 0.5,
                        mb: 1,
                      }}
                    >
                      {news.relatedItems?.map((item) => (
                        <Grid
                          key={item.id}
                          size={{
                            xs: 4,
                            sm: 4,
                            md: 2,
                          }}
                        >
                          <ItemPreview item={item} onClick={handleItemClick} />
                        </Grid>
                      ))}
                    </Grid>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
                px: 1,
              }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                {title || t("news.trending")}
              </Typography>
            </Box>

            {data && (
              <List>
                {data.newsRecentPosts.map((news) => (
                  <NewsSummary
                    key={news.id}
                    news={news}
                    onClick={handleNewsItemClick}
                  />
                ))}
              </List>
            )}

            {/* See All Link */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography
                variant="body2"
                component={Link}
                to={`/news/all?status=${newsStatus}`}
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: "medium",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {t("news.viewAll")} ↓
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default RecentNewsBanner;

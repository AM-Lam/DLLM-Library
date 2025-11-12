import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Container,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import { ArrowBack, Clear as ClearIcon } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  RecentAddedItemsQuery,
  RecentAddedItemsQueryVariables,
  User,
} from "../generated/graphql";
import ItemPreview2 from "../components/ItemPreview2";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import PaginationControls from "../components/PaginationControls";

interface OutletContext {
  user?: User;
}

const ALL_RECENT_ITEMS_QUERY = gql`
  query RecentAddedItems($limit: Int, $offset: Int, $category: [String!]) {
    recentAddedItems(limit: $limit, offset: $offset, category: $category) {
      id
      name
      description
      condition
      category
      status
      images
      publishedYear
      language
      createdAt
    }
  }
`;

const HotCategoriesQuery = gql`
  query HotCategories($limit: Int!) {
    hotCategories(limit: $limit)
  }
`;

const DefaultCategoriesQuery = gql`
  query DefaultCategories {
    defaultCategories
  }
`;

const ITEMS_PER_PAGE = 12; // Changed to 12 for better grid layout (3 columns x 4 rows)

const ItemRecentPage: React.FC = () => {
  const { user } = useOutletContext<OutletContext>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get category from URL parameters
  const categoryFromUrl = searchParams.get("category") || "";

  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromUrl);
  const [page, setPage] = useState<number>(1);

  // Query for hot categories
  const { data: hotCategoriesData, loading: categoriesLoading } = useQuery<{
    hotCategories: string[];
  }>(HotCategoriesQuery, {
    variables: { limit: 15 },
  });

  // Query for default categories as fallback
  const { data: defaultCategoriesData } = useQuery<{
    defaultCategories: string[];
  }>(DefaultCategoriesQuery);

  // Combine categories from both queries
  const availableCategories = [
    ...(hotCategoriesData?.hotCategories || []),
    ...(defaultCategoriesData?.defaultCategories || []),
  ].filter((category, index, self) => self.indexOf(category) === index); // Remove duplicates

  const { data, loading, error, refetch } = useQuery<
    RecentAddedItemsQuery,
    RecentAddedItemsQueryVariables
  >(ALL_RECENT_ITEMS_QUERY, {
    variables: {
      category: selectedCategory ? [selectedCategory] : [],
      limit: ITEMS_PER_PAGE,
      offset: (page - 1) * ITEMS_PER_PAGE,
    },
  });

  const handleItemClick = (itemId: string) => {
    navigate(`/item/${itemId}`);
  };
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const newCategory = event.target.value as string;
    setSelectedCategory(newCategory);
    setPage(1); // Reset to page 1 when category changes

    // Update URL parameters
    if (newCategory) {
      searchParams.set("category", newCategory);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  };

  const handleClearCategory = () => {
    setSelectedCategory("");
    setPage(1);
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
      setPage(1);
    }
  }, [categoryFromUrl]);

  // Refetch when category, page, or status changes
  useEffect(() => {
    refetch({
      category: selectedCategory ? [selectedCategory] : [],
      limit: ITEMS_PER_PAGE,
      offset: (page - 1) * ITEMS_PER_PAGE,
    });
  }, [selectedCategory, page, refetch]);

  const filteredItems =
    data?.recentAddedItems.filter((item) =>
      statusFilter ? item.status === statusFilter : true
    ) || [];

  // Generate page title based on category
  const getPageTitle = () => {
    if (selectedCategory) {
      return t("item.recentInCategory", "Recent {{category}}", {
        category: selectedCategory,
      });
    }
    return t("item.recentItems", "Recent Items");
  };

  const getPageDescription = () => {
    if (selectedCategory) {
      return t(
        "item.recentCategoryDescription",
        "Recently added items in {{category}}",
        { category: selectedCategory }
      );
    }
    return t("item.recentDescription", "Recently added items");
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          mb: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <IconButton onClick={() => navigate("/")} sx={{ mr: 1 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                {getPageTitle()}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 6, mb: selectedCategory ? 1 : 0 }}
            >
              {getPageDescription()}
            </Typography>

            {/* Category Badge */}
            {selectedCategory && (
              <Box sx={{ ml: 6 }}>
                <Chip
                  label={selectedCategory}
                  onDelete={handleClearCategory}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: "medium" }}
                />
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Filters */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Category Filter */}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>{t("item.category", "Category")}</InputLabel>
            <Select
              value={selectedCategory}
              label={t("item.category", "Category")}
              onChange={handleCategoryChange}
              disabled={categoriesLoading}
            >
              <MenuItem value="">
                <em>{t("item.allCategories", "All Categories")}</em>
              </MenuItem>
              {availableCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Status Filter */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{t("item.status")}</InputLabel>
            <Select
              value={statusFilter}
              label={t("item.status")}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">{t("common.all", "All")}</MenuItem>
              <MenuItem value="AVAILABLE">{t("item.available")}</MenuItem>
              <MenuItem value="EXCHANGEABLE">{t("item.exchangeable")}</MenuItem>
              <MenuItem value="GIFT">{t("item.gift")}</MenuItem>
              <MenuItem value="RESERVED">{t("item.reserved")}</MenuItem>
            </Select>
          </FormControl>

          {/* Clear Filters Button (if any filter is active) */}
          {(selectedCategory || statusFilter) && (
            <IconButton
              size="small"
              onClick={() => {
                handleClearCategory();
                setStatusFilter("");
              }}
              sx={{ ml: 1 }}
              title={t("common.clearFilters", "Clear filters")}
            >
              <ClearIcon />
            </IconButton>
          )}

          {/* Results count */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: "auto" }}
          >
            {loading
              ? t("common.loading", "Loading...")
              : t("item.itemsFound", "{{count}} items found", {
                  count: filteredItems.length,
                })}
          </Typography>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography color="error">
              {t("common.error", "Error")}: {error.message}
            </Typography>
          </Box>
        )}

        {/* Items Grid - 3 columns on mobile, 4 on tablet, 6 on desktop */}
        {!loading && filteredItems.length > 0 && (
          <>
            <Grid
              container
              spacing={{ xs: 1, sm: 2 }}
              sx={{
                mb: 3,
              }}
            >
              {filteredItems.map((item) => (
                <Grid key={item.id} size={{ xs: 4, sm: 3, md: 2 }}>
                  <ItemPreview2 item={item} onClick={handleItemClick} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination Controls */}
            <Box sx={{ mt: 4 }}>
              <PaginationControls
                currentPage={page}
                onPageChange={handlePageChange}
                hasNextPage={filteredItems.length === ITEMS_PER_PAGE}
                hasPrevPage={page > 1}
                isLoading={loading}
                itemsPerPage={ITEMS_PER_PAGE}
                showPageInfo={true}
              />
            </Box>
          </>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <Box
            sx={{
              py: 8,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {selectedCategory
                ? t(
                    "item.noItemsInCategory",
                    "No items found in {{category}}",
                    {
                      category: selectedCategory,
                    }
                  )
                : t("item.noItemsFound", "No items found")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {statusFilter || selectedCategory
                ? t("item.tryDifferentFilters", "Try adjusting your filters")
                : t("item.noItemsYet", "No items available yet")}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ItemRecentPage;

import { useTranslation } from "react-i18next";
import { semanticColorTokens } from "../../styles/designSystemTokens";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemTokenTable from "./DesignSystemTokenTable";

export default function SemanticTokensSection() {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="tokens"
      eyebrow={`${t("designSystem.foundations")} — 03`}
      title={t("designSystem.tokens.title")}
      description={t("designSystem.tokens.description")}
    >
      <DesignSystemTokenTable
        rows={semanticColorTokens}
        tokenLabel={t("designSystem.tokens.token")}
        valueLabel={t("designSystem.tokens.value")}
        useLabel={t("designSystem.tokens.use")}
        showColorChip
      />
    </DesignSystemSection>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS,
  CARD_STYLES,
  BUTTON_STYLES,
  TEXT_STYLES,
} from "../../constants/theme";
import { MORAL_VALUES } from "../../constants/data";
import { MoralValue } from "../../constants/types";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "MoralValueSelection"
>;

type RouteProps = RouteProp<RootStackParamList, "MoralValueSelection">;

const { width } = Dimensions.get("window");
// Tam olarak 2 sütun için kart genişliğini ayarlıyoruz
const CARD_WIDTH = (width - SIZES.padding.medium * 3) / 2; // 3 boşluk (sol, orta, sağ)
const CARD_HEIGHT = 160; // Sabit yükseklik

// Moral değerlere karşılık gelen emoji ve renkler
const MORAL_VALUE_STYLES: { [key: string]: { emoji: string; color: string } } =
  {
    Cesaret: { emoji: "🦁", color: "#FF9800" },
    İyilik: { emoji: "💖", color: "#FF9800" },
    Sorumluluk: { emoji: "💼", color: "#FF9800" },
    Azim: { emoji: "🔥", color: "#FF9800" },
    Affetme: { emoji: "💕", color: "#FF9800" },
    Saygı: { emoji: ":star:", color: "#FF9800" },
    Arkadaşlık: { emoji: "🤝", color: "#FF9800" },
    Dürüstlük: { emoji: "✅", color: "#4CAF50" },
    Paylaşma: { emoji: "🎁", color: "#9C27B0" },
    Empati: { emoji: "💖", color: "#9C27B0" },
    Minnettarlık: { emoji: "🙏🏻", color: "#9C27B0" },
    Yardımlaşma: { emoji: "🤲", color: "#03A9F4" },
    Sabır: { emoji: "⏳", color: "#607D8B" },
    Yaratıcılık: { emoji: "🎨", color: "#607D8B" },
    "Doğa Sevgisi": { emoji: "🌿", color: "#8BC34A" },
  };

// Adım bilgileri
const STEPS = [
  { id: "character", label: "Karakter" },
  { id: "theme", label: "Tema" },
  { id: "moral", label: "Ders" },
  { id: "options", label: "Detaylar" },
];
const CURRENT_STEP_INDEX = 2; // Ahlaki Değer adımı için index 2

const MoralValueSelectionScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { mainCharacter, theme } = route.params;

  const [selectedValues, setSelectedValues] = useState<MoralValue[]>([]);

  const toggleMoralValue = (value: MoralValue) => {
    if (selectedValues.some((v) => v.id === value.id)) {
      setSelectedValues(selectedValues.filter((v) => v.id !== value.id));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handlePreviousStep = () => {
    navigation.goBack();
  };

  const handleNextStep = () => {
    if (selectedValues.length === 0) return;

    navigation.navigate("StoryOptions", {
      mainCharacter,
      theme,
      moralValues: selectedValues,
    });
  };

  // Ahlaki derse göre stil belirle
  const getMoralValueStyle = (value: MoralValue) => {
    return (
      MORAL_VALUE_STYLES[value.title] || {
        emoji: "💫",
        color: COLORS.kidsPrimary,
      }
    );
  };

  // İlerleme adımlarını gösterme
  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicator}>
        {STEPS.map((step, index) => (
          <View
            key={step.id}
            style={[
              styles.stepDot,
              index === CURRENT_STEP_INDEX && styles.stepDotActive,
            ]}
          >
            {index < CURRENT_STEP_INDEX && (
              <View style={styles.stepDotCompleted}>
                <Text style={styles.stepDotCompletedText}>✓</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Ahlaki Ders Seçimi</Text>
          <Text style={styles.subtitle}>
            Hikayede vurgulanacak ahlaki dersleri seçin (En az 1)
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardsContainer}>
            {MORAL_VALUES.map((value) => {
              const isSelected = selectedValues.some((v) => v.id === value.id);
              const valueStyle = getMoralValueStyle(value);

              return (
                <TouchableOpacity
                  key={value.id}
                  style={[styles.card, isSelected && styles.selectedCard]}
                  onPress={() => toggleMoralValue(value)}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardContent}>
                    <View
                      style={[
                        styles.emojiContainer,
                        { backgroundColor: valueStyle.color + "15" },
                      ]}
                    >
                      <Text style={styles.emojiText}>{valueStyle.emoji}</Text>
                    </View>
                    <Text style={styles.cardTitle}>{value.title}</Text>
                    <Text style={styles.cardDescription} numberOfLines={2}>
                      {value.description}
                    </Text>
                  </View>

                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Sticky Navigation Bar */}
      <View style={styles.navbarContainer}>
        <View style={styles.navbar}>
          {renderStepIndicator()}
          <View style={styles.navbarButtons}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePreviousStep}
              activeOpacity={0.7}
            >
              <Text style={styles.navButtonText}>Geri</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                styles.navButtonPrimary,
                selectedValues.length === 0 && styles.navButtonDisabled,
              ]}
              onPress={handleNextStep}
              disabled={selectedValues.length === 0}
              activeOpacity={0.7}
            >
              <Text style={styles.navButtonTextPrimary}>İleri</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.kidsBackground,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Navbar için yer bırak
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: SIZES.padding.medium,
  },
  title: {
    ...TEXT_STYLES.title,
    marginBottom: SIZES.base,
  },
  subtitle: {
    ...TEXT_STYLES.subtitle,
    marginBottom: SIZES.medium,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: SIZES.medium,
  },
  infoItem: {
    ...CARD_STYLES.default,
    margin: SIZES.base,
    minWidth: width * 0.4,
    alignItems: "center",
    paddingVertical: SIZES.padding.medium,
  },
  infoLabel: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  infoValue: {
    ...FONTS.bold,
    color: COLORS.kidsPrimary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding.medium,
    paddingTop: SIZES.padding.medium,
  },
  card: {
    ...CARD_STYLES.default,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginBottom: SIZES.padding.medium,
    padding: SIZES.padding.medium,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: COLORS.kidsPrimary,
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emojiContainer: {
    width: CARD_WIDTH * 0.4,
    height: CARD_WIDTH * 0.4,
    borderRadius: CARD_WIDTH * 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  emojiText: {
    fontSize: 30,
    textAlign: "center" as const,
  },
  cardTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.kidsPrimary,
    marginBottom: SIZES.base,
    textAlign: "center" as const,
  },
  cardDescription: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.textLight,
    textAlign: "center" as const,
  },
  selectedBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.kidsPrimary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  selectedBadgeText: {
    color: COLORS.white,
    ...FONTS.bold,
    fontSize: SIZES.medium,
  },
  // Navbar stilleri
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "transparent",
  },
  navbar: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    height: "100%",
    flexDirection: "column",
    paddingHorizontal: SIZES.padding.medium,
    paddingTop: SIZES.padding.small,
    paddingBottom:
      Platform.OS === "ios" ? SIZES.padding.medium : SIZES.padding.small,
    ...SHADOWS.large,
  },
  navbarButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.small,
  },
  navButton: {
    paddingVertical: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.medium,
    borderRadius: SIZES.radius,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonPrimary: {
    backgroundColor: COLORS.kidsPrimary,
    ...SHADOWS.small,
  },
  navButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  navButtonText: {
    ...FONTS.medium,
    color: COLORS.textLight,
    fontSize: SIZES.medium,
  },
  navButtonTextPrimary: {
    ...FONTS.bold,
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.small,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.disabled,
    marginHorizontal: 8,
  },
  stepDotActive: {
    backgroundColor: COLORS.kidsPrimary,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  stepDotCompleted: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
    backgroundColor: COLORS.kidsSuccess,
    justifyContent: "center",
    alignItems: "center",
  },
  stepDotCompletedText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "bold",
  },
});

export default MoralValueSelectionScreen;

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
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
import { THEMES } from "../../constants/data";
import { StoryTheme } from "../../constants/types";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "ThemeSelection"
>;

type RouteProps = RouteProp<RootStackParamList, "ThemeSelection">;

const { width, height } = Dimensions.get("window");
const ITEM_WIDTH = Math.min(width * 0.6, 300);
const ITEM_HEIGHT = Math.min(ITEM_WIDTH * 1.2, 360);
const SPACING = 2;

// Tema başlıklarına karşılık gelen emoji ve renkler
const THEME_STYLES: {
  [key: string]: { emoji: string; color: string; gradient: string[] };
} = {
  Macera: {
    emoji: "🏔️",
    color: COLORS.kidsAccent1,
    gradient: ["#FFB74080", "#FFDF8A80"], // Sarı/turuncu
  },
  "Uzay ve Gezegenler": {
    emoji: "🚀",
    color: COLORS.kidsSecondary,
    gradient: ["#6B48FF80", "#9173FF80"], // Mor
  },
  "Deniz Altı": {
    emoji: "🐙",
    color: COLORS.kidsAccent3,
    gradient: ["#78C9FF80", "#A4DFFF80"], // Mavi
  },
  "Orman ve Hayvanlar": {
    emoji: "🦁",
    color: COLORS.kidsAccent2,
    gradient: ["#44D8BE80", "#7BFFEB80"], // Turkuaz/yeşil
  },
  "Sihirli Dünya": {
    emoji: "✨",
    color: COLORS.kidsPrimary,
    gradient: ["#FF6B7A80", "#FF8E9E80"], // Pembe
  },
};

// Adım bilgileri
const STEPS = [
  { id: "character", label: "Karakter" },
  { id: "theme", label: "Tema" },
  { id: "moral", label: "Ders" },
  { id: "options", label: "Detaylar" },
];
const CURRENT_STEP_INDEX = 1; // Tema adımı için index 1

const ThemeSelectionScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const mainCharacter = route.params?.mainCharacter;

  const [selectedTheme, setSelectedTheme] = useState<StoryTheme | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleSelectTheme = (theme: StoryTheme) => {
    setSelectedTheme(theme);
  };

  const handlePreviousStep = () => {
    navigation.goBack();
  };

  const handleNextStep = () => {
    if (!selectedTheme) return;

    navigation.navigate("MoralValueSelection", {
      mainCharacter,
      theme: selectedTheme,
    });
  };

  const renderThemeCard = ({
    item,
    index,
  }: {
    item: StoryTheme;
    index: number;
  }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SPACING * 2),
      index * (ITEM_WIDTH + SPACING * 2),
      (index + 1) * (ITEM_WIDTH + SPACING * 2),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: "clamp",
    });

    const themeStyle = THEME_STYLES[item.title] || {
      emoji: "📚",
      color: COLORS.kidsPrimary,
      gradient: COLORS.gradientPrimary,
    };

    const isSelected = selectedTheme?.id === item.id;

    return (
      <TouchableOpacity
        onPress={() => handleSelectTheme(item)}
        activeOpacity={0.9}
        style={styles.cardWrapper}
      >
        <Animated.View
          style={[
            styles.themeCard,
            {
              transform: [{ scale }],
              opacity,
              borderColor: isSelected ? COLORS.kidsPrimary : "transparent",
              borderWidth: isSelected ? 3 : 0,
            },
          ]}
        >
          <View
            style={[
              styles.themeImagePlaceholder,
              {
                backgroundColor: themeStyle.color + "15", // 15% opacity
              },
            ]}
          >
            <Text style={styles.themeEmoji}>{themeStyle.emoji}</Text>
          </View>
          <View style={styles.themeTextContainer}>
            <Text style={styles.themeTitle}>{item.title}</Text>
            <Text style={styles.themeDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          {isSelected && (
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedBadgeText}>✓</Text>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
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
          <Text style={styles.title}>Tema Seçimi</Text>
          <Text style={styles.subtitle}>Hikayenin geçeceği temayı seçiniz</Text>
        </View>

        <View style={styles.carouselContainer}>
          <Animated.FlatList
            data={THEMES}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            snapToInterval={ITEM_WIDTH + SPACING * 2}
            decelerationRate={Platform.OS === "ios" ? 0.8 : 0.9}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={renderThemeCard}
            snapToAlignment="center"
            pagingEnabled={true}
          />
        </View>
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
                !selectedTheme && styles.navButtonDisabled,
              ]}
              onPress={handleNextStep}
              disabled={!selectedTheme}
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
    padding: SIZES.padding.medium,
    paddingBottom: 80, // Navbar için boşluk bırak
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
  characterInfo: {
    ...CARD_STYLES.default,
    marginTop: SIZES.medium,
    width: "80%",
    alignItems: "center",
    paddingVertical: SIZES.padding.medium,
  },
  characterText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  characterName: {
    ...FONTS.bold,
    color: COLORS.kidsPrimary,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    alignItems: "center",
    paddingVertical: SIZES.padding.large,
    paddingHorizontal: width * 0.1,
  },
  cardWrapper: {
    width: ITEM_WIDTH,
    paddingHorizontal: SPACING,
    alignItems: "center",
  },
  themeCard: {
    ...CARD_STYLES.default,
    width: ITEM_WIDTH - SPACING * 2,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    padding: 0,
    borderRadius: SIZES.radiusMedium,
  },
  themeImagePlaceholder: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: SIZES.radiusMedium,
    borderTopRightRadius: SIZES.radiusMedium,
  },
  themeEmoji: {
    fontSize: 80,
    textAlign: "center" as const,
  },
  themeTextContainer: {
    padding: SIZES.padding.medium,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  themeTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.kidsPrimary,
    marginBottom: SIZES.base,
    textAlign: "center" as const,
  },
  themeDescription: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
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

export default ThemeSelectionScreen;

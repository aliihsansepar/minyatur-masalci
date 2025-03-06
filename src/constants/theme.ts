export const COLORS = {
  // Ana renkler
  primary: "#6B48FF",
  primaryDark: "#5035CC",
  secondary: "#FF6B7A",
  secondaryDark: "#CC4F5C",
  accent1: "#FFB740",
  accent2: "#44D8BE",

  // Temel renkler
  background: "#FFFFFF",
  surface: "#FFFFFF",
  error: "#FF4D4D",
  success: "#4CAF50",
  warning: "#FFC107",
  info: "#2196F3",

  // Metin renkleri
  text: "#333333",
  textLight: "#757575",
  textDark: "#212121",
  disabled: "#BDBDBD",
  placeholder: "#BDBDBD",
  backdrop: "rgba(0, 0, 0, 0.5)",
  white: "#FFFFFF",

  // Çocuklara özel renkler
  kidsPrimary: "#4898e8", // Canlı mavi
  kidsSecondary: "#6B48FF", // Mor
  kidsAccent1: "#FFB740", // Turuncu/sarı
  kidsAccent2: "#44D8BE", // Turkuaz
  kidsAccent3: "#78C9FF", // Açık mavi
  kidsBackground: "#F5F7FA", // Hafif gri-mavi
  kidsCardBackground: "#FFFFFF",
  kidsSuccess: "#7ED8A3", // Pastel yeşil
  kidsWarning: "#FFD166", // Pastel sarı

  // Gradyan renkler
  gradientPrimary: ["#FF6B7A", "#FF8E9E"],
  gradientSecondary: ["#6B48FF", "#9173FF"],
  gradientSuccess: ["#7ED8A3", "#A0EBBC"],
  gradientWarning: ["#FFD166", "#FFDF8A"],
};

export const SIZES = {
  // Temel boyutlar
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  xxl: 32,
  xxxl: 40,

  // Kenar yuvarlamaları
  radius: 10,
  radiusSmall: 5,
  radiusMedium: 15,
  radiusLarge: 20,
  radiusRound: 100, // Tam yuvarlak için

  // Kenar boşlukları
  padding: {
    small: 8,
    medium: 16,
    large: 24,
  },

  // Özel boyutlar
  buttonHeight: 56,
  inputHeight: 56,
  iconSize: 24,
};

export const FONTS = {
  // Yazı stilleri
  regular: {
    fontFamily: "System",
    fontWeight: "normal" as const,
  },
  medium: {
    fontFamily: "System",
    fontWeight: "500" as const,
  },
  bold: {
    fontFamily: "System",
    fontWeight: "bold" as const,
  },
  light: {
    fontFamily: "System",
    fontWeight: "300" as const,
  },

  // Hazır metin stilleri
  largeTitle: {
    fontFamily: "System",
    fontWeight: "bold" as const,
    fontSize: 34,
  },
  h1: {
    fontFamily: "System",
    fontWeight: "bold" as const,
    fontSize: 30,
  },
  h2: {
    fontFamily: "System",
    fontWeight: "bold" as const,
    fontSize: 26,
  },
  h3: {
    fontFamily: "System",
    fontWeight: "bold" as const,
    fontSize: 22,
  },
  h4: {
    fontFamily: "System",
    fontWeight: "bold" as const,
    fontSize: 20,
  },
  h5: {
    fontFamily: "System",
    fontWeight: "bold" as const,
    fontSize: 18,
  },
  body1: {
    fontFamily: "System",
    fontWeight: "normal" as const,
    fontSize: 18,
  },
  body2: {
    fontFamily: "System",
    fontWeight: "normal" as const,
    fontSize: 14,
  },
  body3: {
    fontFamily: "System",
    fontWeight: "normal" as const,
    fontSize: 14,
  },
  body4: {
    fontFamily: "System",
    fontWeight: "normal" as const,
    fontSize: 12,
  },
};

export const SHADOWS = {
  // Gölgeler
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.84,
    elevation: 5,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 9,
  },

  // Özel gölgeler
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
};

// Stil yardımcıları
export const CARD_STYLES = {
  default: {
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.padding.medium,
    ...SHADOWS.card,
  },
  interactive: {
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.padding.medium,
    ...SHADOWS.card,
  },
  selected: {
    borderWidth: 2,
    borderColor: COLORS.kidsPrimary,
  },
};

export const BUTTON_STYLES = {
  primary: {
    backgroundColor: COLORS.kidsPrimary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.large,
    height: SIZES.buttonHeight,
    ...SHADOWS.button,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.kidsPrimary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.large,
    height: SIZES.buttonHeight,
  },
  small: {
    height: 40,
    paddingVertical: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.medium,
    borderRadius: SIZES.radiusSmall,
  },
};

export const TEXT_STYLES = {
  title: {
    ...FONTS.h2,
    color: COLORS.kidsPrimary,
    textAlign: "center" as const,
  },
  subtitle: {
    ...FONTS.body2,
    color: COLORS.textLight,
    textAlign: "center" as const,
  },
  primaryButton: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  secondaryButton: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.kidsPrimary,
  },
};

export default {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS,
  CARD_STYLES,
  BUTTON_STYLES,
  TEXT_STYLES,
};

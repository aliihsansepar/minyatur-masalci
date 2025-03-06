import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StatusBar,
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
import { MoralValue, Character, CustomItem } from "../../constants/types";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "StoryPreview"
>;

type RouteProps = RouteProp<RootStackParamList, "StoryPreview">;

const { width, height } = Dimensions.get("window");

// Adım bilgileri
const STEPS = [
  { id: "character", label: "Karakter" },
  { id: "theme", label: "Tema" },
  { id: "moral", label: "Ders" },
  { id: "options", label: "Detaylar" },
  { id: "preview", label: "Önizleme" },
];
const CURRENT_STEP_INDEX = 4; // Önizleme adımı için index 4

// StoryConfig tipi
interface StoryConfig {
  mainCharacter?: {
    name: string;
    id: string;
    type: string;
    description?: string;
  };
  theme?: {
    id: string;
    title: string;
    description: string;
  };
  moralValues?: MoralValue[];
  storyLength?: "short" | "medium" | "long";
  supportingCharacters?: Character[];
  customItems?: CustomItem[];
  enableSoundEffects?: boolean;
  enableTTS?: boolean;
}

const StoryPreviewScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { storyConfig } = route.params;

  const [isGenerating, setIsGenerating] = useState(false);
  const [storyGenerated, setStoryGenerated] = useState(false);
  const [storyContent, setStoryContent] = useState("");

  const handlePreviousStep = () => {
    navigation.goBack();
  };

  const handleHomeNavigation = () => {
    navigation.navigate("Home");
  };

  const generateStory = () => {
    setIsGenerating(true);

    // Hikaye oluşturma simulasyonu
    setTimeout(() => {
      // Hikaye oluşturma
      const generatedStory = createStory(storyConfig);
      setStoryContent(generatedStory);
      setStoryGenerated(true);
      setIsGenerating(false);
    }, 2000);
  };

  // Hikaye oluşturma fonksiyonu
  const createStory = (config: StoryConfig) => {
    // Ana karakter adı
    const mainCharName = config.mainCharacter?.name || "Çocuk";

    // Tema
    const themeName = config.theme?.title || "Macera";

    // Seçilen ahlaki değerler
    const moralValueNames = config.moralValues?.map((value) => value.title) || [
      "Arkadaşlık",
    ];
    const mainMoralValue = moralValueNames[0];

    // Yardımcı karakterler
    const supportingCharacterNames =
      config.supportingCharacters?.map((char) => ({
        name: char.name,
        role: char.description || "arkadaş",
      })) || [];

    // Özel öğeler
    const customItemNames = config.customItems?.map((item) => item.name) || [];

    // Hikaye uzunluğu
    const storyLengthFactor =
      config.storyLength === "short"
        ? 1
        : config.storyLength === "medium"
        ? 2
        : 3;

    // Özel öğe seçimi
    const specialItem =
      customItemNames.length > 0
        ? customItemNames[Math.floor(Math.random() * customItemNames.length)]
        : "sihirli kalem";

    // Yardımcı karakter seçimi
    const friend =
      supportingCharacterNames.length > 0
        ? supportingCharacterNames[0]
        : { name: "Zeynep", role: "en iyi arkadaş" };

    // Örnek hikaye şablonu
    let story = `# ${mainCharName} ve ${mainMoralValue} Macerası\n\n`;

    // Seçilen temaya göre hikayeyi oluştur
    if (themeName === "Macera") {
      story += `${mainCharName} iki yaşındaydı ve her gün yeni şeyler keşfetmeyi çok seviyordu. Bir sabah ${mainCharName}, en sevdiği oyuncak ayısıyla oynamaya karar verdi. "Ayıcık, hadi bahçede oynayalım!" dedi.\n\n`;

      story += `Bahçede ${mainCharName}'nin en iyi arkadaşı ${friend.name}, çiçekleri suluyordu. ${mainCharName} ${friend.name}'e el salladı, "${friend.name}, benimle oynamak ister misin?" ${friend.name} gülümsedi, "Evet, ${mainCharName}! Hangi oyunu oynayalım?"\n\n`;

      story += `${mainCharName} heyecanla, "Kovalamaca!" dedi. ${friend.name}, "Tamam! Ama önce bahçedeki çiçeklere dikkat edelim!" ${mainCharName}, "Tamam!" diyerek koşmaya başladı.\n\n`;

      story += `Koşarken ${mainCharName}, birden yere düştü. "Ayy!" diye bağırdı. ${friend.name} hemen yanına geldi, "${mainCharName}, iyi misin?" ${mainCharName} gülerek, "Evet! Ama biraz canım acıdı." ${friend.name}, "Yavaş oynamamız gerekiyor, hadi birlikte kalkalım!" dedi.\n\n`;

      story += `${mainCharName} ${friend.name}'in elini tuttu ve birlikte ayakta durdular. ${friend.name}, "Hadi, yavaşça oynayalım!" dedi. ${mainCharName}, "Evet, ${friend.name}!" diyerek kabul etti.\n\n`;

      if (storyLengthFactor > 1) {
        story += `Sonra ${mainCharName} ve ${friend.name} el ele tutuşarak bahçede dans etmeye başladılar. O sırada Fatma teyze, bahçenin yanından geçiyordu. Gülerek, "Ne güzel dans ediyorsunuz!" dedi. ${mainCharName}, "Teşekkür ederiz, Fatma teyze!" dedi.\n\n`;

        story += `O gün ${mainCharName}, en önemli dersi öğrendi: Oynamak çok eğlenceli ama dikkatli olmalıyız! ${friend.name} ile birlikte yavaşça oynayarak hem eğlendi hem de güvenli bir şekilde bahçede vakit geçirdi. ${mainCharName}, "${friend.name}, birlikte oynamak çok güzel!" dedi. ${friend.name}, "Evet, ${mainCharName}! Birlikte eğlenmek için dikkatli olmalıyız!"\n\n`;
      }

      if (storyLengthFactor > 2) {
        story += `Akşam olduğunda, ${mainCharName}'nin annesi onları eve çağırdı. "Çocuklar, yemek hazır!" ${mainCharName} ve ${friend.name} koşarak eve gittiler. ${mainCharName}'nin annesi, "Bugün ne yaptınız?" diye sordu.\n\n`;

        story += `${mainCharName} heyecanla anlatmaya başladı: "Anne, biz ${friend.name} ile bahçede oynadık. Önce düştüm ama sonra ${friend.name} bana yardım etti. Sonra dans ettik ve Fatma teyze bizi gördü!"\n\n`;

        story += `Annesi gülümsedi ve "Harika! ${friend.name} çok iyi bir arkadaş. Birbirinize yardım etmeniz çok güzel," dedi. ${mainCharName} ve ${friend.name} birbirlerine bakıp gülümsediler.\n\n`;

        story += `Yemekten sonra, ${mainCharName} ve ${friend.name} ${specialItem} ile oynamaya başladılar. ${specialItem} sayesinde hayal ettikleri her şeyi gerçekleştirebiliyorlardı. ${mainCharName}, "${friend.name}, bu ${specialItem} ile neler yapabileceğimizi hayal et!" dedi.\n\n`;

        story += `Ve böylece ${mainCharName} ve ${friend.name} yeni maceralarına ${specialItem} ile devam ettiler. Her zaman birbirlerine yardım ederek ve dikkatli olarak oynamayı unutmadılar.\n\n`;
      }
    } else if (themeName === "Uzay ve Gezegenler") {
      story += `${mainCharName} yıldızları ve gezegenleri çok seviyordu. Her gece yatmadan önce pencereden gökyüzüne bakardı. Bir gece, parlak bir yıldız ${mainCharName}'nin dikkatini çekti.\n\n`;

      story += `"Anne, bak ne kadar parlak bir yıldız!" diye seslendi ${mainCharName}. Annesi yanına geldi ve "Evet, çok güzel. Belki de bir gün uzaya gidebilirsin" dedi gülümseyerek.\n\n`;

      story += `Ertesi gün ${mainCharName} ve arkadaşı ${friend.name} bahçede buluştular. ${mainCharName}, "Dün gece çok parlak bir yıldız gördüm, ${friend.name}. Bir gün uzaya gitmek istiyorum" dedi heyecanla.\n\n`;

      story += `${friend.name} da heyecanlandı, "Ben de gelmek isterim! Bir uzay gemisi yapalım!". Böylece ${mainCharName} ve ${friend.name} kartonları, kutuları ve ${specialItem}'ı kullanarak kendi uzay gemilerini yaptılar.\n\n`;

      story += `Uzay gemilerini tamamladıklarında, ${mainCharName} ve ${friend.name} içine oturdular ve hayal etmeye başladılar. "Üç, iki, bir, kalkış!" diye bağırdılar birlikte.\n\n`;

      if (storyLengthFactor > 1) {
        story += `Hayallerinde, uzay gemileri yerden yükseldi ve gökyüzüne doğru uçmaya başladı. Yıldızların arasından geçerken ${mainCharName} ve ${friend.name} şaşkınlıkla etraflarına bakıyorlardı.\n\n`;

        story += `İlk durakları Ay oldu. ${mainCharName}, "Bak, ${friend.name}, Ay'dayız!" dedi sevinçle. Ay'ın yüzeyinde zıplayarak eğlendiler. ${friend.name}, "Burada çok hafifiz!" diye güldü.\n\n`;

        story += `Sonra Mars'a gittiler. Kırmızı gezegen çok etkileyiciydi. ${mainCharName}, "Mars toprağı kırmızı, tıpkı kitaplarda gördüğüm gibi!" dedi hayranlıkla.\n\n`;
      }

      if (storyLengthFactor > 2) {
        story += `Uzak bir gezegende, mavi renkli, sevimli uzaylılarla karşılaştılar. Uzaylılar onları nazikçe karşıladı ve gezegenlerini gezdirdi. ${mainCharName}, "Evimizden ne kadar farklı!" dedi şaşkınlıkla.\n\n`;

        story += `Uzaylılar ${mainCharName} ve ${friend.name}'e gezegendeki problemlerini anlattılar: su kaynakları azalıyordu ve yardıma ihtiyaçları vardı. ${mainCharName} düşündü, "Belki ${specialItem} ile yardım edebiliriz!"\n\n`;

        story += `${specialItem}'ı kullanarak, ${mainCharName} ve ${friend.name} uzaylılara su bulmalarına yardım ettiler. Uzaylılar çok mutlu oldular ve minnettarlıklarını göstermek için ${mainCharName} ve ${friend.name}'e parlayan mavi kristaller hediye ettiler.\n\n`;

        story += `Eve dönme vakti geldiğinde, ${mainCharName} ve ${friend.name} yeni arkadaşlarına veda ettiler. "Tekrar geleceğiz!" diye söz verdiler.\n\n`;

        story += `Eve döndüklerinde, ${mainCharName}'nin annesi onları çağırdı: "Çocuklar, yemek hazır!". ${mainCharName} ve ${friend.name} koşarak eve girdiler, ama yaşadıkları büyük macera hakkında kimseye bir şey söylemediler. Bu, sadece onların bildiği özel bir sırdı.\n\n`;

        story += `O gece, ${mainCharName} yatağına uzandığında, penceresinden gökyüzüne baktı ve uzaktaki yıldızları düşündü. Bir gün gerçekten uzaya gideceğini biliyordu. Ama şimdilik, hayal kurmak ve ${friend.name} ile paylaşmak da çok güzeldi.\n\n`;
      }
    } else {
      // Varsayılan hikaye
      story += `${mainCharName} bir gün ${friend.name} ile birlikte ${themeName} hakkında bir maceraya atıldı. Yanlarında ${specialItem} vardı ve bu onlara çok yardımcı oldu.\n\n`;

      story += `Macera sırasında ${mainCharName} ve ${friend.name} ${mainMoralValue}'nin ne kadar önemli olduğunu öğrendiler. ${mainCharName}, "${friend.name}, ${mainMoralValue} değerini anladım artık" dedi.\n\n`;

      story += `${friend.name}, "Evet ${mainCharName}, ${mainMoralValue} hayatta en önemli şeylerden biri!" diye cevap verdi.\n\n`;

      if (storyLengthFactor > 1) {
        story += `Bu macerada ${mainCharName} ve ${friend.name} birçok zorlukla karşılaştılar ama birlikte çalışarak hepsinin üstesinden geldiler.\n\n`;

        story += `Eve döndüklerinde, ${mainCharName}'nin ailesi onun nasıl büyüdüğünü ve ${mainMoralValue} değerini nasıl öğrendiğini görmekten çok mutlu oldu.\n\n`;
      }

      if (storyLengthFactor > 2) {
        story += `Bu macera ${mainCharName}'nin hayatındaki en önemli deneyimlerden biriydi ve onu hayatı boyunca etkileyecekti.\n\n`;

        story += `${mainCharName} ve ${friend.name} sonraki günlerde de buluşmaya ve yeni maceralar yaşamaya devam ettiler, her seferinde yeni değerler öğrenerek ve dostluklarını güçlendirerek.\n\n`;
      }
    }

    // Hikayenin sonucu
    story += `# SON`;

    return story;
  };

  // Hikaye metnini paragraflara ayırma
  const renderStoryParagraphs = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      // Başlık kontrolü
      if (paragraph.startsWith("# ")) {
        return (
          <Text key={index} style={styles.storyTitle}>
            {paragraph.substring(2)}
          </Text>
        );
      }

      return (
        <Text key={index} style={styles.storyParagraph}>
          {paragraph}
        </Text>
      );
    });
  };

  const renderSummarySection = (title: string, content: string | string[]) => {
    return (
      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>{title}</Text>

        {typeof content === "string" ? (
          <Text style={styles.summaryContent}>{content}</Text>
        ) : (
          content.map((item, index) => (
            <Text key={index} style={styles.summaryListItem}>
              • {item}
            </Text>
          ))
        )}
      </View>
    );
  };

  // Temaya uygun arka plan seçimi
  const getBackgroundColor = () => {
    const theme = storyConfig.theme?.title || "";

    if (theme === "Macera") return COLORS.kidsAccent1 + "15"; // Turuncu/Sarı
    if (theme === "Uzay ve Gezegenler") return COLORS.kidsSecondary + "15"; // Mor
    if (theme === "Deniz Altı") return COLORS.kidsAccent3 + "15"; // Mavi
    if (theme === "Orman ve Hayvanlar") return COLORS.kidsAccent2 + "15"; // Yeşil
    if (theme === "Sihirli Dünya") return COLORS.kidsPrimary + "15"; // Pembe

    return COLORS.kidsBackground;
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
      {isGenerating ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.kidsPrimary} />
          <Text style={styles.loadingText}>Hikaye Oluşturuluyor...</Text>
          <Text style={styles.loadingSubtext}>
            Bu işlem bir kaç dakika sürebilir
          </Text>
        </View>
      ) : storyGenerated ? (
        // Hikaye görüntüleme ekranı
        <View
          style={[
            styles.storyContainer,
            { backgroundColor: getBackgroundColor() },
          ]}
        >
          <StatusBar backgroundColor={COLORS.kidsPrimary} />
          <ScrollView
            contentContainerStyle={styles.storyContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.storyCard}>
              {renderStoryParagraphs(storyContent)}
            </View>
          </ScrollView>

          {/* Hikaye görüntüleme ekranında navbar */}
          <View style={styles.navbarContainer}>
            <View style={styles.navbar}>
              <TouchableOpacity
                style={[styles.navButton, styles.navButtonWide]}
                onPress={handleHomeNavigation}
                activeOpacity={0.7}
              >
                <Text style={styles.navButtonText}>Ana Sayfaya Dön</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Hikaye Önizleme</Text>
            <Text style={styles.subtitle}>Ayarlarınızı gözden geçiriniz</Text>

            <View style={styles.previewCard}>
              {renderSummarySection(
                "Ana Karakter:",
                storyConfig.mainCharacter?.name || "Belirsiz"
              )}

              {renderSummarySection(
                "Tema:",
                storyConfig.theme?.title || "Belirsiz"
              )}

              {renderSummarySection(
                "Ahlaki Dersler:",
                storyConfig.moralValues?.map(
                  (value: MoralValue) => value.title
                ) || ["Belirsiz"]
              )}

              {renderSummarySection(
                "Hikaye Uzunluğu:",
                storyConfig.storyLength === "short"
                  ? "Kısa (5 dakika)"
                  : storyConfig.storyLength === "medium"
                  ? "Orta (10 dakika)"
                  : "Uzun (15 dakika)"
              )}

              {storyConfig.supportingCharacters?.length > 0 &&
                renderSummarySection(
                  "Yardımcı Karakterler:",
                  storyConfig.supportingCharacters.map(
                    (char: Character) =>
                      `${char.name}${
                        char.description ? ` (${char.description})` : ""
                      }`
                  )
                )}

              {storyConfig.customItems?.length > 0 &&
                renderSummarySection(
                  "Özel Öğeler:",
                  storyConfig.customItems.map((item: CustomItem) => item.name)
                )}

              {renderSummarySection("Ek Özellikler:", [
                ...(storyConfig.enableSoundEffects ? ["Ses Efektleri"] : []),
                ...(storyConfig.enableTTS ? ["Sesli Okuma"] : []),
              ])}
            </View>
          </ScrollView>

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
                  style={[styles.navButton, styles.navButtonPrimary]}
                  onPress={generateStory}
                  activeOpacity={0.7}
                >
                  <Text style={styles.navButtonTextPrimary}>
                    Hikayeyi Oluştur
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
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
  },
  scrollContent: {
    flexGrow: 1,
    padding: SIZES.padding.medium,
    paddingBottom: 100, // navbar için alan
  },
  title: {
    ...TEXT_STYLES.title,
    marginBottom: SIZES.base,
  },
  subtitle: {
    ...TEXT_STYLES.subtitle,
    marginBottom: SIZES.extraLarge,
  },
  previewCard: {
    ...CARD_STYLES.default,
    marginBottom: SIZES.extraLarge,
    padding: SIZES.padding.large,
  },
  summarySection: {
    marginBottom: SIZES.large,
  },
  summaryTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.kidsPrimary,
    marginBottom: SIZES.small,
  },
  summaryContent: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  summaryListItem: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SIZES.small,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.extraLarge,
  },
  loadingText: {
    ...FONTS.h3,
    color: COLORS.kidsPrimary,
    marginTop: SIZES.large,
    textAlign: "center",
  },
  loadingSubtext: {
    ...FONTS.body2,
    color: COLORS.textLight,
    marginTop: SIZES.medium,
    textAlign: "center",
  },
  storyContainer: {
    flex: 1,
    paddingBottom: 80, // navbar için yer bırak
  },
  storyContent: {
    padding: SIZES.padding.large,
  },
  storyCard: {
    ...CARD_STYLES.default,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.large,
    paddingVertical: SIZES.padding.large,
  },
  storyTitle: {
    ...FONTS.h2,
    color: COLORS.kidsPrimary,
    marginBottom: SIZES.large,
    textAlign: "center" as const,
  },
  storyParagraph: {
    ...FONTS.body1,
    color: COLORS.text,
    marginBottom: SIZES.medium,
    lineHeight: SIZES.xxl,
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
  navButtonWide: {
    backgroundColor: COLORS.kidsSecondary,
    ...SHADOWS.small,
    width: "100%",
  },
  navButtonPrimary: {
    backgroundColor: COLORS.kidsPrimary,
    ...SHADOWS.small,
    minWidth: 160,
  },
  navButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  navButtonText: {
    ...FONTS.medium,
    color: COLORS.white,
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

export default StoryPreviewScreen;

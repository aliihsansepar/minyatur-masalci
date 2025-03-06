import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  FlatList,
  TextInput,
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
import { CUSTOM_ITEMS, SAMPLE_CHARACTERS } from "../../constants/data";
import { Character, CustomItem } from "../../constants/types";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "StoryOptions"
>;

type RouteProps = RouteProp<RootStackParamList, "StoryOptions">;

const { width } = Dimensions.get("window");

type StoryLength = "short" | "medium" | "long";
type CharacterRole =
  | "Arkadaş"
  | "En iyi arkadaş"
  | "Anne"
  | "Baba"
  | "Erkek Kardeş"
  | "Kız Kardeş"
  | "Büyük anne"
  | "Büyük baba"
  | "Öğretmen"
  | "Evcil Hayvan"
  | "Mentor"
  | "Komşu";

// Tab tipleri
type TabType = "length" | "characters" | "items" | "features";

// Karakter rolleri
const CHARACTER_ROLES: CharacterRole[] = [
  "Arkadaş",
  "En iyi arkadaş",
  "Anne",
  "Baba",
  "Erkek Kardeş",
  "Kız Kardeş",
  "Büyük anne",
  "Büyük baba",
  "Öğretmen",
  "Evcil Hayvan",
  "Mentor",
  "Komşu",
];

// Adım bilgileri
const STEPS = [
  { id: "character", label: "Karakter" },
  { id: "theme", label: "Tema" },
  { id: "moral", label: "Ders" },
  { id: "options", label: "Detaylar" },
];
const CURRENT_STEP_INDEX = 3; // Options adımı için index 3

// Sonraki sayfalarda da kullanabileceğimiz stilin temel bir parçası
const textStyles = {
  title: {
    ...FONTS.bold,
    fontSize: SIZES.xxl,
    color: COLORS.kidsPrimary,
  },
  subtitle: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.textLight,
  },
  buttonText: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
};

const StoryOptionsScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { mainCharacter, theme, moralValues } = route.params;

  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>("length");

  const [storyLength, setStoryLength] = useState<StoryLength>("medium");
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [selectedItems, setSelectedItems] = useState<CustomItem[]>([]);
  const [customItemsText, setCustomItemsText] = useState("");
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [enableSoundEffects, setEnableSoundEffects] = useState(false);
  const [enableTTS, setEnableTTS] = useState(false);

  // Yardımcı karakter ekleme için
  const [newCharacterName, setNewCharacterName] = useState("");
  const [selectedRole, setSelectedRole] = useState<CharacterRole>("Arkadaş");
  const [characterRolePickerVisible, setCharacterRolePickerVisible] =
    useState(false);

  const storyLengthOptions: { value: StoryLength; label: string }[] = [
    { value: "short", label: "Kısa (5 dakika)" },
    { value: "medium", label: "Orta (10 dakika)" },
    { value: "long", label: "Uzun (15 dakika)" },
  ];

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "length", label: "Uzunluk", icon: "📏" },
    { id: "characters", label: "Karakterler", icon: "👨‍👩‍👧‍👦" },
    { id: "items", label: "Öğeler", icon: "🎁" },
    { id: "features", label: "Özellikler", icon: "⚙️" },
  ];

  const toggleCharacter = (character: Character) => {
    if (selectedCharacters.some((c) => c.id === character.id)) {
      setSelectedCharacters(
        selectedCharacters.filter((c) => c.id !== character.id)
      );
    } else {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  const addNewCharacter = () => {
    if (newCharacterName.trim() === "") return;

    const newCharacter: Character = {
      id: Date.now().toString(),
      name: newCharacterName,
      type: "supporting",
      description: selectedRole,
    };

    setSelectedCharacters([...selectedCharacters, newCharacter]);
    setNewCharacterName("");
  };

  const toggleItem = (item: CustomItem) => {
    if (selectedItems.some((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleCustomItemsChange = (text: string) => {
    setCustomItemsText(text);
  };

  const processCustomItems = () => {
    const items = customItemsText
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const newCustomItems: CustomItem[] = items.map((item) => ({
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: item,
      description: "Özel olarak eklenmiş öğe",
    }));

    return [...selectedItems, ...newCustomItems];
  };

  const handleNextStep = () => {
    // Özel öğeleri işle
    const processedCustomItems = processCustomItems();

    // Hikaye yapılandırmasını oluştur
    const storyConfig = {
      mainCharacter,
      theme,
      moralValues,
      storyLength,
      supportingCharacters: selectedCharacters,
      customItems: processedCustomItems,
      enableSoundEffects,
      enableTTS,
    };

    navigation.navigate("StoryPreview", { storyConfig });
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

  // Tab başlıklarını render et
  const renderTabHeaders = () => {
    return (
      <View style={styles.tabHeaderContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabHeader,
              activeTab === tab.id && styles.activeTabHeader,
            ]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Hikaye uzunluğu tabı içeriği
  const renderLengthTab = () => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Hikaye Uzunluğu</Text>
        <Text style={styles.sectionSubtitle}>
          Hikayenizin kaç dakika süreceğini seçin
        </Text>

        <View style={styles.radioButtonsContainer}>
          {storyLengthOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.radioButtonRow}
              onPress={() => setStoryLength(option.value)}
            >
              <View
                style={[
                  styles.radioButton,
                  storyLength === option.value && styles.radioButtonSelected,
                ]}
              >
                {storyLength === option.value && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text
                style={[
                  styles.radioButtonLabel,
                  storyLength === option.value &&
                    styles.radioButtonLabelSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Karakterler tab içeriği
  const renderCharactersTab = () => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Yardımcı Karakterler</Text>
        <Text style={styles.sectionSubtitle}>
          Hikayeye eklemek istediğiniz diğer karakterleri seçin
        </Text>

        {/* Karakter ekleme alanı */}
        <View style={styles.addCharacterContainer}>
          <TextInput
            style={styles.characterInput}
            placeholder="Karakter Adı"
            value={newCharacterName}
            onChangeText={setNewCharacterName}
          />

          <TouchableOpacity
            style={styles.rolePicker}
            onPress={() => setCharacterRolePickerVisible(true)}
          >
            <Text style={styles.rolePickerText}>{selectedRole}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.addButton,
              newCharacterName.trim() === "" && styles.disabledButton,
            ]}
            onPress={addNewCharacter}
            disabled={newCharacterName.trim() === ""}
          >
            <Text style={styles.addButtonText}>Ekle</Text>
          </TouchableOpacity>
        </View>

        {/* Seçilen karakterler listesi */}
        {selectedCharacters.length > 0 && (
          <View style={styles.selectedCharactersContainer}>
            <Text style={styles.subSectionTitle}>Seçilen Karakterler:</Text>
            {selectedCharacters.map((character) => (
              <View key={character.id} style={styles.selectedCharacterItem}>
                <Text style={styles.selectedCharacterName}>
                  {character.name}
                  {character.description ? ` (${character.description})` : ""}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleCharacter(character)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Örnek yardımcı karakterler */}
        <Text style={styles.subSectionTitle}>Örnek Karakterler:</Text>
        <View style={styles.optionsGrid}>
          {SAMPLE_CHARACTERS.filter((c) => c.type === "supporting").map(
            (character) => {
              const isSelected = selectedCharacters.some(
                (c) => c.id === character.id
              );
              return (
                <TouchableOpacity
                  key={character.id}
                  style={[
                    styles.optionCard,
                    isSelected && styles.selectedOptionCard,
                  ]}
                  onPress={() => toggleCharacter(character)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionTitle}>{character.name}</Text>
                  <Text style={styles.optionDescription}>
                    {character.description}
                  </Text>

                  {isSelected && (
                    <View style={styles.checkmarkBadge}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }
          )}
        </View>
      </View>
    );
  };

  // Öğeler tab içeriği
  const renderItemsTab = () => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Özel Öğeler</Text>
        <Text style={styles.sectionSubtitle}>
          Hikayede vurgulamak istediğiniz eşyaları ekleyin
        </Text>

        {/* Özel öğeler giriş alanı */}
        <TextInput
          style={styles.customItemsInput}
          placeholder="Özel öğeler ekleyin (virgülle ayırarak birden fazla ekleyebilirsiniz)"
          value={customItemsText}
          onChangeText={handleCustomItemsChange}
          multiline={true}
          numberOfLines={3}
        />

        {/* Mevcut özel öğeler */}
        <Text style={styles.subSectionTitle}>Örnek Öğeler:</Text>
        <View style={styles.optionsGrid}>
          {CUSTOM_ITEMS.map((item) => {
            const isSelected = selectedItems.some((i) => i.id === item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedOptionCard,
                ]}
                onPress={() => toggleItem(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionTitle}>{item.name}</Text>
                <Text style={styles.optionDescription}>{item.description}</Text>

                {isSelected && (
                  <View style={styles.checkmarkBadge}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  // Özellikler tab içeriği
  const renderFeaturesTab = () => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Ek Özellikler</Text>
        <Text style={styles.sectionSubtitle}>
          Hikaye deneyimini zenginleştirecek seçenekler
        </Text>

        <View style={styles.featuresContainer}>
          <TouchableOpacity
            style={[
              styles.featureToggle,
              enableSoundEffects && styles.featureToggleActive,
            ]}
            onPress={() => setEnableSoundEffects(!enableSoundEffects)}
            activeOpacity={0.7}
          >
            <Text style={styles.featureTitle}>Ses Efektleri</Text>
            <View
              style={[
                styles.toggleButton,
                enableSoundEffects && styles.toggleButtonActive,
              ]}
            >
              <View
                style={[
                  styles.toggleCircle,
                  enableSoundEffects && styles.toggleCircleActive,
                ]}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.featureToggle,
              enableTTS && styles.featureToggleActive,
            ]}
            onPress={() => setEnableTTS(!enableTTS)}
            activeOpacity={0.7}
          >
            <Text style={styles.featureTitle}>Sesli Okuma</Text>
            <View
              style={[
                styles.toggleButton,
                enableTTS && styles.toggleButtonActive,
              ]}
            >
              <View
                style={[
                  styles.toggleCircle,
                  enableTTS && styles.toggleCircleActive,
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Aktif taba göre içerik render et
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "length":
        return renderLengthTab();
      case "characters":
        return renderCharactersTab();
      case "items":
        return renderItemsTab();
      case "features":
        return renderFeaturesTab();
      default:
        return renderLengthTab();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Hikaye Seçenekleri</Text>
          <Text style={styles.subtitle}>
            Hikayenizin detaylarını özelleştirin
          </Text>
        </View>

        {/* Tab Başlıkları */}
        {renderTabHeaders()}

        {/* Tab İçeriği */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderActiveTabContent()}
        </ScrollView>
      </View>

      {/* Sticky Navigation Bar */}
      <View style={styles.navbarContainer}>
        <View style={styles.navbar}>
          {renderStepIndicator()}
          <View style={styles.navbarButtons}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.navButtonText}>Geri</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButtonPrimary}
              onPress={handleNextStep}
              activeOpacity={0.7}
            >
              <Text style={styles.navButtonTextPrimary}>Önizleme</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Karakter Rol Seçimi Modal */}
      <Modal
        visible={characterRolePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCharacterRolePickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Karakter Rolü Seç</Text>

            <FlatList
              data={CHARACTER_ROLES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    selectedRole === item && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedRole(item);
                    setCharacterRolePickerVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedRole === item && styles.modalItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setCharacterRolePickerVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: SIZES.padding.medium,
  },
  title: {
    ...TEXT_STYLES.title,
    marginBottom: SIZES.base,
    textAlign: "center",
  },
  subtitle: {
    ...TEXT_STYLES.subtitle,
    textAlign: "center",
    marginBottom: SIZES.medium,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SIZES.padding.large,
  },
  // Tab Stilleri
  tabHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding.medium,
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding.small,
    ...SHADOWS.small,
  },
  tabHeader: {
    flex: 1,
    alignItems: "center",
    paddingVertical: SIZES.padding.small,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTabHeader: {
    borderBottomColor: COLORS.kidsPrimary,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: SIZES.base,
  },
  tabLabel: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  activeTabLabel: {
    color: COLORS.kidsPrimary,
    ...FONTS.bold,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: SIZES.padding.medium,
    paddingTop: SIZES.padding.medium,
  },
  // Hikaye Uzunluğu Radio Butonları
  radioButtonsContainer: {
    marginTop: SIZES.medium,
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.padding.medium,
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.textLight,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: COLORS.kidsPrimary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.kidsPrimary,
  },
  radioButtonLabel: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginLeft: SIZES.medium,
  },
  radioButtonLabelSelected: {
    color: COLORS.kidsPrimary,
    ...FONTS.bold,
  },
  // Genel Bölüm Stilleri
  section: {
    marginBottom: SIZES.extraLarge,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.textLight,
    marginBottom: SIZES.small,
  },
  sectionSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SIZES.medium,
  },
  subSectionTitle: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginTop: SIZES.medium,
    marginBottom: SIZES.small,
  },
  // Option Cards
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionCard: {
    width: width * 0.43,
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    minHeight: 120,
    ...SHADOWS.small,
    position: "relative",
  },
  selectedOptionCard: {
    borderWidth: 2,
    borderColor: COLORS.kidsPrimary,
  },
  optionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.kidsPrimary,
    marginBottom: SIZES.small,
  },
  optionDescription: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  checkmarkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: COLORS.kidsPrimary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: COLORS.white,
    ...FONTS.bold,
  },
  // Karakter Ekleme
  addCharacterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  characterInput: {
    flex: 2,
    height: 60,
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.medium,
    ...FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.text,
    ...SHADOWS.small,
    marginRight: SIZES.small,
  },
  rolePicker: {
    flex: 2,
    height: 60,
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...SHADOWS.small,
    marginRight: SIZES.small,
  },
  rolePickerText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  dropdownIcon: {
    fontSize: SIZES.large,
    color: COLORS.kidsPrimary,
  },
  addButton: {
    flex: 1,
    height: 60,
    backgroundColor: COLORS.kidsPrimary,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  disabledButton: {
    backgroundColor: COLORS.disabled,
  },
  addButtonText: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  // Seçilen Karakterler
  selectedCharactersContainer: {
    backgroundColor: COLORS.kidsCardBackground,
    padding: SIZES.medium,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
  },
  selectedCharacterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.disabled,
  },
  selectedCharacterName: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    flex: 1,
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.error,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  // Özellikler
  featuresContainer: {
    marginTop: SIZES.small,
  },
  featureToggle: {
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.medium,
    height: 60,
    ...SHADOWS.small,
  },
  featureToggleActive: {
    borderWidth: 2,
    borderColor: COLORS.kidsSecondary,
  },
  featureTitle: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.text,
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.disabled,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.kidsSecondary,
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.white,
  },
  toggleCircleActive: {
    alignSelf: "flex-end",
  },
  // Modal Stilleri
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.kidsBackground,
    borderTopLeftRadius: SIZES.large,
    borderTopRightRadius: SIZES.large,
    padding: SIZES.large,
    minHeight: "40%",
    maxHeight: "70%",
  },
  modalTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.kidsPrimary,
    marginBottom: SIZES.large,
    textAlign: "center",
  },
  modalItem: {
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.disabled,
    height: 60,
    justifyContent: "center",
  },
  modalItemSelected: {
    backgroundColor: COLORS.kidsPrimary + "20", // 20% opacity
  },
  modalItemText: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.text,
  },
  modalItemTextSelected: {
    color: COLORS.kidsPrimary,
    ...FONTS.bold,
  },
  modalCloseButton: {
    backgroundColor: COLORS.kidsPrimary,
    borderRadius: SIZES.radius,
    padding: SIZES.medium,
    marginTop: SIZES.large,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  modalCloseButtonText: {
    ...textStyles.buttonText,
  },
  // Özel Öğeler
  customItemsInput: {
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.medium,
    ...FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.text,
    ...SHADOWS.small,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: SIZES.medium,
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
    paddingVertical: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.medium,
    borderRadius: SIZES.radius,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.small,
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

export default StoryOptionsScreen;

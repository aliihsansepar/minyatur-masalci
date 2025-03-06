import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { COLORS, SIZES, FONTS, SHADOWS } from "../../constants/theme";
import { Character } from "../../constants/types";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "CharacterSelection"
>;

const CharacterSelectionScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [characterName, setCharacterName] = useState("");
  const [error, setError] = useState("");

  const handleNextStep = () => {
    if (characterName.trim() === "") {
      setError("Lütfen bir karakter adı giriniz");
      return;
    }

    const mainCharacter: Character = {
      id: Date.now().toString(),
      name: characterName,
      type: "main",
      description: "Ana karakter",
    };

    // Bir sonraki ekrana geç ve karakter bilgisini aktar
    navigation.navigate("ThemeSelection", { mainCharacter });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidContainer}
      >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Ana Karakter</Text>
            <Text style={styles.subtitle}>
              Hikayenin ana karakterinin adını giriniz
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Karakter Adı"
              value={characterName}
              onChangeText={(text) => {
                setCharacterName(text);
                setError("");
              }}
              placeholderTextColor={COLORS.grayLight}
              autoFocus
              maxLength={20}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNextStep}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>İleri</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.kidsBackground,
  },
  keyboardAvoidContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SIZES.large,
    justifyContent: "space-between",
  },
  titleContainer: {
    marginTop: SIZES.extraLarge,
    alignItems: "center",
  },
  title: {
    ...FONTS.h1,
    color: COLORS.kidsPrimary,
    marginBottom: SIZES.base,
    textAlign: "center",
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SIZES.large,
  },
  inputContainer: {
    marginVertical: SIZES.extraLarge,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.font,
    height: 60,
    ...FONTS.body2,
    ...SHADOWS.light,
    width: "100%",
    color: COLORS.textPrimary,
    marginBottom: SIZES.base,
  },
  errorText: {
    color: COLORS.error,
    ...FONTS.body4,
    marginTop: SIZES.base,
  },
  buttonContainer: {
    marginTop: SIZES.extraLarge,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.kidsPrimary,
    borderRadius: SIZES.radius,
    padding: SIZES.font,
    minWidth: width * 0.7,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  buttonText: {
    color: COLORS.white,
    ...FONTS.h3,
    textAlign: "center",
  },
});

export default CharacterSelectionScreen;

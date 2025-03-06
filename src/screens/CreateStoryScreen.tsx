import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants/theme";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "CreateStory"
>;

const { width } = Dimensions.get("window");

const CreateStoryScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const navigateToStoryCreation = () => {
    navigation.navigate("CharacterSelection");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Hikaye Oluşturma</Text>
          <Text style={styles.subtitle}>Kendi hikayeni oluşturmaya başla!</Text>
        </View>

        <View style={styles.stepsContainer}>
          <View style={styles.stepIndicator}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <Text style={styles.stepText}>Karakterini Oluştur</Text>
          </View>

          <View style={styles.stepConnector} />

          <View style={styles.stepIndicator}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <Text style={styles.stepText}>Temayı Seç</Text>
          </View>

          <View style={styles.stepConnector} />

          <View style={styles.stepIndicator}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <Text style={styles.stepText}>Ahlaki Ders</Text>
          </View>

          <View style={styles.stepConnector} />

          <View style={styles.stepIndicator}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>4</Text>
            </View>
            <Text style={styles.stepText}>Detayları Belirle</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={navigateToStoryCreation}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Başla</Text>
        </TouchableOpacity>
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
    padding: SIZES.large,
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: SIZES.extraLarge,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.xxxl,
    color: COLORS.kidsPrimary,
    marginBottom: SIZES.base,
    textAlign: "center",
  },
  subtitle: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.textLight,
    textAlign: "center",
  },
  stepsContainer: {
    marginTop: SIZES.extraLarge,
    paddingHorizontal: SIZES.medium,
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.kidsPrimary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  stepNumber: {
    ...FONTS.bold,
    color: COLORS.white,
    fontSize: SIZES.large,
  },
  stepText: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.textLight,
    marginLeft: SIZES.medium,
  },
  stepConnector: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.kidsPrimary,
    marginLeft: 20,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.large,
  },
  illustrationPlaceholder: {
    width: width * 0.8,
    height: width * 0.6,
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.kidsPrimary,
  },
  illustrationText: {
    fontSize: 36,
    marginBottom: SIZES.medium,
  },
  illustrationSubtext: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.kidsPrimary,
  },
  button: {
    backgroundColor: COLORS.kidsPrimary,
    borderRadius: SIZES.radius,
    padding: SIZES.medium,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  buttonText: {
    ...FONTS.bold,
    fontSize: SIZES.extraLarge,
    color: COLORS.white,
  },
});

export default CreateStoryScreen;

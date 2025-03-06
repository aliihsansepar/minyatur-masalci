import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants/theme";
import Button from "../components/Button";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Hikaye Dünyası</Text>
          <Text style={styles.subtitle}>Hayal gücünü keşfet!</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/adaptive-icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Yeni Hikaye Oluştur"
            onPress={() => navigation.navigate("CreateStory")}
            containerStyle={styles.button}
          />

          <Button
            title="Hikayelerim"
            onPress={() => navigation.navigate("MyStories")}
            containerStyle={styles.button}
            secondary
          />

          <Button
            title="Bilgi"
            onPress={() => navigation.navigate("About")}
            containerStyle={styles.button}
            outline
          />
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Neler Yapabilirsin?</Text>

          <View style={styles.featureItem}>
            <Text style={styles.featureNumber}>1</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Kendi Karakterini Oluştur</Text>
              <Text style={styles.featureDescription}>
                Ana ve yardımcı karakterleri belirle
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureNumber}>2</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Hikaye Ayarlarını Seç</Text>
              <Text style={styles.featureDescription}>
                Hikayenin temasını ve ahlaki değerlerini belirle
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureNumber}>3</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Özel Öğeler Ekle</Text>
              <Text style={styles.featureDescription}>
                Hikayeye sihirli veya ilginç öğeler ekle
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.kidsBackground,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SIZES.extraLarge,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: SIZES.extraLarge,
    marginBottom: SIZES.large,
  },
  title: {
    fontSize: SIZES.xxl,
    color: COLORS.kidsPrimary,
    ...FONTS.bold,
    textAlign: "center",
  },
  subtitle: {
    fontSize: SIZES.large,
    color: COLORS.textLight,
    ...FONTS.medium,
    marginTop: SIZES.base,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: SIZES.large,
  },
  image: {
    width: "80%",
    height: 200,
  },
  buttonContainer: {
    marginHorizontal: SIZES.extraLarge,
    marginTop: SIZES.medium,
  },
  button: {
    marginBottom: SIZES.medium,
  },
  featuresContainer: {
    marginHorizontal: SIZES.extraLarge,
    marginTop: SIZES.extraLarge,
  },
  featuresTitle: {
    fontSize: SIZES.large,
    color: COLORS.text,
    ...FONTS.bold,
    marginBottom: SIZES.medium,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SIZES.small,
    padding: SIZES.medium,
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.base,
    ...SHADOWS.small,
  },
  featureNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.kidsPrimary,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.background,
    ...FONTS.bold,
    fontSize: SIZES.medium,
  },
  featureTextContainer: {
    flex: 1,
    marginLeft: SIZES.medium,
  },
  featureTitle: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    ...FONTS.medium,
  },
  featureDescription: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    ...FONTS.regular,
    marginTop: 2,
  },
});

export default HomeScreen;

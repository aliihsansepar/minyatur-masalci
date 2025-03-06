import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants/theme";
import Button from "../components/Button";

interface AboutScreenProps {
  navigation: any;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Hikaye Dünyası Hakkında</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Uygulama Hakkında</Text>
          <Text style={styles.sectionText}>
            Hikaye Dünyası, çocuklar için özel hikayeler oluşturmak amacıyla
            tasarlanmış interaktif bir uygulamadır. Bu uygulama ile çocuğunuzun
            yaşına, ilgi alanlarına ve değerlerine uygun hikayeler
            oluşturabilirsiniz.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Nasıl Kullanılır?</Text>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>1</Text>
            <Text style={styles.instructionText}>
              Ana karakterinizi oluşturun
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>2</Text>
            <Text style={styles.instructionText}>
              Çocuğunuzun yaşını belirtin
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>3</Text>
            <Text style={styles.instructionText}>
              Hikaye teması ve ahlaki değerleri seçin
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>4</Text>
            <Text style={styles.instructionText}>
              İsterseniz yardımcı karakterler ekleyin
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>5</Text>
            <Text style={styles.instructionText}>
              Hikaye uzunluğunu belirleyin
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>6</Text>
            <Text style={styles.instructionText}>
              Özel öğeler ekleyerek hikayeyi zenginleştirin
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Hikaye İçerikleri</Text>
          <Text style={styles.sectionText}>
            Oluşturulan tüm hikayeler çocuklar için güvenli içerikler barındırır
            ve seçtiğiniz ahlaki değerleri vurgular. Her hikaye çocuğunuzun
            yaşına uygun bir dil ve anlatımla hazırlanır.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Ana Sayfaya Dön"
            onPress={() => navigation.navigate("Home")}
          />
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
  sectionContainer: {
    marginHorizontal: SIZES.extraLarge,
    marginTop: SIZES.large,
    padding: SIZES.large,
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.base,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    color: COLORS.kidsPrimary,
    ...FONTS.bold,
    marginBottom: SIZES.medium,
  },
  sectionText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    ...FONTS.regular,
    lineHeight: SIZES.large * 1.2,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: SIZES.small,
    alignItems: "center",
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.kidsPrimary,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.kidsCardBackground,
    ...FONTS.bold,
    fontSize: SIZES.small,
    marginRight: SIZES.small,
  },
  instructionText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    ...FONTS.regular,
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: SIZES.extraLarge,
    marginTop: SIZES.extraLarge,
  },
});

export default AboutScreen;

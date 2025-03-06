import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants/theme";
import Button from "../components/Button";

interface StoryDetailScreenProps {
  navigation: any;
  route: {
    params: {
      storyId: string;
    };
  };
}

const StoryDetailScreen: React.FC<StoryDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { storyId } = route.params;
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Gerçek bir uygulamada burada API'den hikaye verileri çekilebilir
    // Bu örnekte sahte bir hikaye verisi oluşturuyoruz
    setTimeout(() => {
      const mockStory = {
        id: storyId,
        title: "Cesur Aslanın Macerası",
        createdAt: new Date(),
        config: {
          mainCharacter: { id: "1", name: "Cesur Aslan", type: "main" },
          childAge: 6,
          settings: {
            theme: {
              id: "1",
              title: "Macera",
              description: "Heyecan dolu maceralar içeren hikayeler",
            },
            moralValues: [
              {
                id: "1",
                title: "Arkadaşlık",
                description: "Arkadaşlığın önemini vurgulayan değerler",
              },
              {
                id: "4",
                title: "Yardımlaşma",
                description:
                  "Başkalarına yardım etmenin önemini vurgulayan değerler",
              },
            ],
          },
          supportingCharacters: [
            { id: "2", name: "Bilge Baykuş", type: "supporting" },
          ],
          storyLength: "medium",
          customItems: [{ id: "3", name: "Uçan Halı" }],
        },
        pages: [
          {
            id: "1",
            content:
              "Bir varmış bir yokmuş, uzak bir ormanda cesur bir aslan yaşarmış. Bu aslanın adı Leo'ymuş. Leo, arkadaşlarına yardım etmeyi seven, cesur bir aslanmış.",
          },
          {
            id: "2",
            content:
              "Bir gün, ormanda dolaşırken, ağaçların arasından gelen bir yardım çığlığı duymuş. Hemen sesin geldiği yöne koşmuş.",
          },
          {
            id: "3",
            content:
              'Bir çukura düşmüş olan Bilge Baykuş\'u görmüş. "Endişelenme dostum, seni kurtaracağım" demiş Leo.',
          },
          {
            id: "4",
            content:
              "Leo, çukurun kenarındaki bir ağaç dalını kullanarak Bilge Baykuş'un çukurdan çıkmasına yardım etmiş.",
          },
          {
            id: "5",
            content:
              'Bilge Baykuş çok teşekkür etmiş. "Senin cesaretin ve yardımseverliğin bana ilham veriyor" demiş.',
          },
          {
            id: "6",
            content:
              'Bilge Baykuş, Leo\'ya teşekkür etmek için ona sihirli bir uçan halı hediye etmiş. "Bu halı seni istediğin yere götürebilir" demiş.',
          },
          {
            id: "7",
            content:
              "Leo ve Bilge Baykuş, uçan halıyla gökyüzünde seyahat ederek yeni yerler keşfetmişler ve yeni arkadaşlar edinmişler.",
          },
          {
            id: "8",
            content:
              "Bu hikayeden öğrendiğimiz gibi, yardımseverlik ve arkadaşlık hayatımıza renk katar ve bize yeni kapılar açar.",
          },
        ],
      };

      setStory(mockStory);
      setLoading(false);
    }, 1500);
  }, [storyId]);

  const nextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.kidsPrimary} />
        <Text style={styles.loadingText}>Hikaye yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{story.title}</Text>
          <View style={styles.pageIndicator}>
            <Text style={styles.pageIndicatorText}>
              Sayfa {currentPage + 1}/{story.pages.length}
            </Text>
          </View>
        </View>

        <View style={styles.storyContainer}>
          <Text style={styles.storyText}>
            {story.pages[currentPage].content}
          </Text>
        </View>

        <View style={styles.navigationContainer}>
          <Button
            title="Önceki"
            onPress={prevPage}
            containerStyle={styles.navButton}
            disabled={currentPage === 0}
            outline
          />

          <Button
            title="Sonraki"
            onPress={nextPage}
            containerStyle={styles.navButton}
            disabled={currentPage === story.pages.length - 1}
          />
        </View>

        {currentPage === story.pages.length - 1 && (
          <View style={styles.completionContainer}>
            <Text style={styles.completionText}>
              Hikaye tamamlandı! Ne öğrendin?
            </Text>

            <Button
              title="Hikayeyi Baştan Oku"
              onPress={() => setCurrentPage(0)}
              containerStyle={styles.actionButton}
              secondary
            />

            <Button
              title="Ana Sayfaya Dön"
              onPress={() => navigation.navigate("Home")}
              containerStyle={styles.actionButton}
              outline
            />
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Hikaye Bilgileri:</Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ana Karakter:</Text>
            <Text style={styles.infoValue}>
              {story.config.mainCharacter.name}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Yaş Grubu:</Text>
            <Text style={styles.infoValue}>{story.config.childAge} yaş</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tema:</Text>
            <Text style={styles.infoValue}>
              {story.config.settings.theme.title}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Değerler:</Text>
            <Text style={styles.infoValue}>
              {story.config.settings.moralValues.map((v) => v.title).join(", ")}
            </Text>
          </View>

          {story.config.supportingCharacters &&
            story.config.supportingCharacters.length > 0 && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Yardımcı Karakterler:</Text>
                <Text style={styles.infoValue}>
                  {story.config.supportingCharacters
                    .map((c) => c.name)
                    .join(", ")}
                </Text>
              </View>
            )}

          {story.config.customItems && story.config.customItems.length > 0 && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Özel Öğeler:</Text>
              <Text style={styles.infoValue}>
                {story.config.customItems.map((i) => i.name).join(", ")}
              </Text>
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.kidsBackground,
  },
  loadingText: {
    marginTop: SIZES.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    ...FONTS.medium,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SIZES.extraLarge,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: SIZES.extraLarge,
    marginHorizontal: SIZES.extraLarge,
  },
  title: {
    fontSize: SIZES.xxl,
    color: COLORS.kidsPrimary,
    ...FONTS.bold,
    textAlign: "center",
  },
  pageIndicator: {
    marginTop: SIZES.small,
    backgroundColor: COLORS.kidsCardBackground,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.base,
    ...SHADOWS.small,
  },
  pageIndicatorText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    ...FONTS.medium,
  },
  storyContainer: {
    marginTop: SIZES.extraLarge,
    marginHorizontal: SIZES.extraLarge,
    padding: SIZES.large,
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.base,
    minHeight: 200,
    ...SHADOWS.medium,
  },
  storyText: {
    fontSize: SIZES.large,
    color: COLORS.text,
    ...FONTS.regular,
    lineHeight: SIZES.extraLarge,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.large,
    marginHorizontal: SIZES.extraLarge,
  },
  navButton: {
    flex: 0.48,
  },
  completionContainer: {
    marginTop: SIZES.extraLarge,
    marginHorizontal: SIZES.extraLarge,
    padding: SIZES.large,
    backgroundColor: `${COLORS.kidsSecondary}20`, // 20% opacity
    borderRadius: SIZES.base,
    alignItems: "center",
  },
  completionText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    ...FONTS.bold,
    marginBottom: SIZES.medium,
    textAlign: "center",
  },
  actionButton: {
    width: "100%",
    marginTop: SIZES.small,
  },
  infoContainer: {
    marginTop: SIZES.extraLarge,
    marginHorizontal: SIZES.extraLarge,
    padding: SIZES.large,
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.base,
    ...SHADOWS.small,
  },
  infoTitle: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    ...FONTS.bold,
    marginBottom: SIZES.medium,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: SIZES.small,
  },
  infoLabel: {
    flex: 0.4,
    fontSize: SIZES.small,
    color: COLORS.textLight,
    ...FONTS.medium,
  },
  infoValue: {
    flex: 0.6,
    fontSize: SIZES.small,
    color: COLORS.text,
    ...FONTS.regular,
  },
});

export default StoryDetailScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants/theme";
import Button from "../components/Button";

interface MyStoriesScreenProps {
  navigation: any;
}

interface StoryItem {
  id: string;
  title: string;
  createdAt: Date;
  previewText: string;
  theme: string;
}

const MyStoriesScreen: React.FC<MyStoriesScreenProps> = ({ navigation }) => {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gerçek bir uygulamada burada API'den hikaye verileri çekilebilir
    // Bu örnekte sahte veriler oluşturuyoruz
    setTimeout(() => {
      const mockStories: StoryItem[] = [
        {
          id: "1",
          title: "Cesur Aslanın Macerası",
          createdAt: new Date(2024, 2, 5),
          previewText:
            "Bir varmış bir yokmuş, uzak bir ormanda cesur bir aslan yaşarmış...",
          theme: "Macera",
        },
        {
          id: "2",
          title: "Bilge Baykuşun Öğütleri",
          createdAt: new Date(2024, 2, 4),
          previewText:
            "Ormanın en yaşlı ağacının üzerinde bilge bir baykuş yaşarmış...",
          theme: "Bilgelik",
        },
        {
          id: "3",
          title: "Uzay Yolculuğu",
          createdAt: new Date(2024, 2, 3),
          previewText:
            "Küçük Ayşe o gece yatağına yattığında penceresinden gördüğü yıldızları hayal ediyordu...",
          theme: "Uzay ve Gezegenler",
        },
      ];

      setStories(mockStories);
      setLoading(false);
    }, 1000);
  }, []);

  const renderStoryItem = ({ item }: { item: StoryItem }) => {
    return (
      <TouchableOpacity
        style={styles.storyCard}
        onPress={() => navigation.navigate("StoryDetail", { storyId: item.id })}
      >
        <View style={styles.storyCardHeader}>
          <Text style={styles.storyTitle}>{item.title}</Text>
          <Text style={styles.storyDate}>
            {item.createdAt.toLocaleDateString("tr-TR")}
          </Text>
        </View>

        <Text style={styles.storyPreview}>{item.previewText}</Text>

        <View style={styles.storyFooter}>
          <View style={styles.themeTag}>
            <Text style={styles.themeText}>{item.theme}</Text>
          </View>

          <TouchableOpacity
            style={styles.readButton}
            onPress={() =>
              navigation.navigate("StoryDetail", { storyId: item.id })
            }
          >
            <Text style={styles.readButtonText}>Oku</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Hikayelerim</Text>
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Hikayeler yükleniyor...</Text>
        </View>
      ) : stories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz hiç hikayen yok.</Text>
          <Button
            title="Yeni Hikaye Oluştur"
            onPress={() => navigation.navigate("CreateStory")}
            containerStyle={styles.createButton}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={stories}
            keyExtractor={(item) => item.id}
            renderItem={renderStoryItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Yeni Hikaye Oluştur"
              onPress={() => navigation.navigate("CreateStory")}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.kidsBackground,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.extraLarge,
  },
  emptyText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    ...FONTS.medium,
    textAlign: "center",
    marginBottom: SIZES.large,
  },
  createButton: {
    width: "80%",
  },
  listContainer: {
    paddingHorizontal: SIZES.extraLarge,
    paddingBottom: 100, // Extra space for the button at the bottom
  },
  storyCard: {
    backgroundColor: COLORS.kidsCardBackground,
    borderRadius: SIZES.base,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
  },
  storyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
  },
  storyTitle: {
    fontSize: SIZES.large,
    color: COLORS.text,
    ...FONTS.bold,
    flex: 1,
  },
  storyDate: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    ...FONTS.regular,
  },
  storyPreview: {
    fontSize: SIZES.font,
    color: COLORS.text,
    ...FONTS.regular,
    marginBottom: SIZES.medium,
    lineHeight: SIZES.large,
  },
  storyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeTag: {
    backgroundColor: `${COLORS.kidsSecondary}30`, // 30% opacity
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.base,
  },
  themeText: {
    fontSize: SIZES.small,
    color: COLORS.kidsSecondary,
    ...FONTS.medium,
  },
  readButton: {
    backgroundColor: COLORS.kidsPrimary,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.base,
  },
  readButtonText: {
    fontSize: SIZES.small,
    color: COLORS.kidsCardBackground,
    ...FONTS.bold,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.kidsBackground,
    paddingHorizontal: SIZES.extraLarge,
    paddingVertical: SIZES.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.disabled,
  },
});

export default MyStoriesScreen;

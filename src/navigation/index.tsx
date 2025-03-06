import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../constants/theme";

// Ekranlar
import HomeScreen from "../screens/HomeScreen";
import CreateStoryScreen from "../screens/CreateStoryScreen";
import StoryDetailScreen from "../screens/StoryDetailScreen";
import MyStoriesScreen from "../screens/MyStoriesScreen";
import AboutScreen from "../screens/AboutScreen";

// Hikaye Oluşturma Adımları için Ekranlar
import CharacterSelectionScreen from "../screens/story-steps/CharacterSelectionScreen";
import ThemeSelectionScreen from "../screens/story-steps/ThemeSelectionScreen";
import MoralValueSelectionScreen from "../screens/story-steps/MoralValueSelectionScreen";
import StoryOptionsScreen from "../screens/story-steps/StoryOptionsScreen";
import StoryPreviewScreen from "../screens/story-steps/StoryPreviewScreen";

// Rota parametreleri
export type RootStackParamList = {
  Home: undefined;
  CreateStory: undefined;
  CharacterSelection: undefined;
  ThemeSelection: { mainCharacter?: any };
  MoralValueSelection: { mainCharacter?: any; theme?: any };
  StoryOptions: { mainCharacter?: any; theme?: any; moralValues?: any[] };
  StoryPreview: { storyConfig: any };
  StoryDetail: { storyId: string };
  MyStories: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.kidsPrimary,
          },
          headerTintColor: COLORS.kidsCardBackground,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          animation: "slide_from_right",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          contentStyle: {
            backgroundColor: COLORS.kidsBackground,
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Hikaye Dünyası", headerShown: false }}
        />
        <Stack.Screen
          name="CreateStory"
          component={CreateStoryScreen}
          options={{ title: "Hikaye Oluştur" }}
        />
        <Stack.Screen
          name="CharacterSelection"
          component={CharacterSelectionScreen}
          options={{ title: "Karakteri Seç" }}
        />
        <Stack.Screen
          name="ThemeSelection"
          component={ThemeSelectionScreen}
          options={{ title: "Temayı Seç" }}
        />
        <Stack.Screen
          name="MoralValueSelection"
          component={MoralValueSelectionScreen}
          options={{ title: "Ahlaki Dersi Seç" }}
        />
        <Stack.Screen
          name="StoryOptions"
          component={StoryOptionsScreen}
          options={{ title: "Hikaye Seçenekleri" }}
        />
        <Stack.Screen
          name="StoryPreview"
          component={StoryPreviewScreen}
          options={{ title: "Hikaye Önizleme" }}
        />
        <Stack.Screen
          name="StoryDetail"
          component={StoryDetailScreen}
          options={{ title: "Hikaye" }}
        />
        <Stack.Screen
          name="MyStories"
          component={MyStoriesScreen}
          options={{ title: "Hikayelerim" }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "Hakkında" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

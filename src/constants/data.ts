import { Character, StoryTheme, MoralValue, CustomItem } from "./types";

export const THEMES: StoryTheme[] = [
  {
    id: "1",
    title: "Macera",
    description: "Heyecan dolu maceralar içeren hikayeler",
  },
  {
    id: "2",
    title: "Uzay ve Gezegenler",
    description: "Uzayda ve diğer gezegenlerde geçen hikayeler",
  },
  {
    id: "3",
    title: "Deniz Altı",
    description: "Denizlerin derinliklerinde geçen hikayeler",
  },
  {
    id: "4",
    title: "Orman ve Hayvanlar",
    description: "Orman ve hayvan dünyasında geçen hikayeler",
  },
  {
    id: "5",
    title: "Sihirli Dünya",
    description: "Sihir ve büyü dolu fantastik hikayeler",
  },
];

export const MORAL_VALUES: MoralValue[] = [
  {
    id: "1",
    title: "Arkadaşlık",
    description: "Arkadaşlığın önemini vurgulayan değerler",
  },
  {
    id: "2",
    title: "Dürüstlük",
    description: "Dürüstlüğün önemini vurgulayan değerler",
  },
  {
    id: "3",
    title: "Paylaşma",
    description: "Paylaşmanın güzelliğini vurgulayan değerler",
  },
  {
    id: "4",
    title: "Yardımlaşma",
    description: "Başkalarına yardım etmenin önemini vurgulayan değerler",
  },
  {
    id: "5",
    title: "Sabır",
    description: "Sabırlı olmanın önemini vurgulayan değerler",
  },
  {
    id: "6",
    title: "Doğa Sevgisi",
    description: "Doğayı ve çevreyi koruma bilincini aşılayan değerler",
  },
];

export const SAMPLE_CHARACTERS: Character[] = [
  {
    id: "1",
    name: "Cesur Aslan",
    type: "main",
    description: "Cesur ve lider ruhlu bir aslan",
  },
  {
    id: "2",
    name: "Bilge Baykuş",
    type: "supporting",
    description: "Bilge ve her soruya cevabı olan bir baykuş",
  },
  {
    id: "3",
    name: "Neşeli Tavşan",
    type: "supporting",
    description: "Neşeli ve hızlı bir tavşan",
  },
  {
    id: "4",
    name: "Cesur Prenses",
    type: "main",
    description: "Cesur ve akıllı bir prenses",
  },
  {
    id: "5",
    name: "Meraklı Çocuk",
    type: "main",
    description: "Her şeyi merak eden bir çocuk",
  },
];

export const CUSTOM_ITEMS: CustomItem[] = [
  {
    id: "1",
    name: "Sihirli Kalem",
    description: "Her çizdiğini gerçeğe dönüştüren sihirli bir kalem",
  },
  {
    id: "2",
    name: "Görünmezlik Pelerini",
    description: "Giyen kişiyi görünmez yapan sihirli bir pelerin",
  },
  {
    id: "3",
    name: "Uçan Halı",
    description: "İstenilen her yere gidebilen sihirli bir halı",
  },
  {
    id: "4",
    name: "Konuşan Kitap",
    description: "Hikayeler anlatan ve sorulara cevap veren konuşan bir kitap",
  },
];

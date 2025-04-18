import { Image, StyleSheet, Platform, SafeAreaView, View, Text, Pressable } from 'react-native';
import computer from "../../assets/images/computer.png"
import CollectionList from '@/components/CollectionList';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext, useState } from 'react';
import AddCollectionModal from '@/components/Modal/AddCollectionModal';
import AskToAddShortcut from '@/components/Modal/AskToAddShortcut';
export default function HomeScreen() {

  const [openAddModal, setOpenAddModal] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.introduction}>
        <Image style={styles.computerIcon} source={computer}></Image>
        <View style={styles.leftIntroduction}>
          <Text style={styles.subTitle}>HỌC CÙNG</Text>
          <Text style={styles.subTitle}>FLASH CARD BG</Text>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 8, paddingBottom: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Danh sách học phần</Text>
          <Pressable onPress={() => setOpenAddModal(true)} style={{ borderRadius: "50%", backgroundColor: "#1dd14a", padding: 3 }}>
            <AntDesign name="plus" size={24} color="white" />
          </Pressable>
        </View>
        <CollectionList />
      </View>
      <AddCollectionModal modalVisible={openAddModal} setModalVisible={setOpenAddModal} />
      <AskToAddShortcut />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingBottom: 210
  },
  introduction: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    gap: 64,
    paddingTop: 64,
  },
  leftIntroduction: {
    flexDirection: "column",
    gap: 2,
    alignContent: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: 600
  },
  subTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 500
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  computerIcon: {
    height: 96,
    width: 96
  }
});

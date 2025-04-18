import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useRef, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItem, setItem } from "@/helper/storage";
import { COLLECTIONS_KEY } from "@/constants/storageKeys";
import { useCollectionContext } from "@/contexts/CollectionContext";

interface AddCollectionModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const AddCollectionModal: React.FC<AddCollectionModalProps> = ({ modalVisible, setModalVisible }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [flashCards, setFlashCards] = useState([{ keyword: "", definition: "" }])
    const scrollFlashCardsRef = useRef<ScrollView>(null)
    const { collections, updateCollections } = useCollectionContext()

    const handleUpdateFlashCards = (action: string, index: number, attribute: any, value: string | null) => {
        setFlashCards(prev => {
            const updated = [...prev];
            switch (action) {
                case "ADD":
                    updated.push({ keyword: "", definition: "" });
                    setTimeout(() => {
                        scrollFlashCardsRef.current?.scrollToEnd({ animated: true });
                    }, 100); // delay to ensure UI updates
                    break;
                case "UPDATE":
                    if (updated[index]) {
                        updated[index] = {
                            ...updated[index],
                            [attribute]: value,
                        };
                    }
                    break;
                case "DELETE":
                    if (updated[index]) {
                        updated.splice(index, 1);
                    }
                    break;
                default:
                    break;
            }
            return updated;
        });
    };

    const handleCreateCollection = () => {
        if (!title.trim()) return;

        const newCollections = [
            ...collections,
            {
                id: Date.now(),
                title: title.trim(),
                description: description.trim(),
                flashCards: flashCards.filter(card => card.keyword.trim() || card.definition.trim()),
            }
        ];
        updateCollections(newCollections);
        Alert.alert("Lưu thành công", "Bộ Flash mới đã được thêm vào danh sách")
        setTitle("");
        setDescription("");
        setFlashCards([{ keyword: "", definition: "" }]);
        setModalVisible(false);
    };

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <SafeAreaView style={[styles.container]} >
                <View style={styles.header}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, textAlign: "center", color: "#fff", fontWeight: 500 }}>Tạo học phần mới</Text>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <Pressable onPress={() => setModalVisible(false)} style={[styles.button, { backgroundColor: "gray" }]}>
                                <Text style={styles.buttonTitle}>Hủy</Text>
                            </Pressable>
                            <Pressable onPress={() => handleCreateCollection()} style={[styles.button, { backgroundColor: "green" }]}>
                                <Text style={styles.buttonTitle}>Lưu</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Tên học phần</Text>
                        <TextInput style={styles.inputText} value={title} onChangeText={setTitle} />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Mô tả</Text>
                        <TextInput multiline={true}
                            style={[styles.inputText]}
                            value={description} onChangeText={setDescription}
                        />
                    </View>
                </View>
                <View style={{ paddingVertical: 16 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 8 }}>
                        <Text style={[styles.inputLabel, { textAlign: "center", fontWeight: 500, fontSize: 16 }]}>Flash Cards</Text>
                        <Pressable onPress={() => handleUpdateFlashCards("ADD", -1, null, "")} style={{ borderRadius: "50%", backgroundColor: "#1dd14a", padding: 3 }}>
                            <AntDesign name="plus" size={20} color="white" />
                        </Pressable>
                    </View>
                    <ScrollView
                        ref={scrollFlashCardsRef}
                        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 220 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {flashCards?.length > 0 &&
                            flashCards.map((item, index) => (
                                <View
                                    style={[
                                        styles.flashCard,
                                        { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff" },
                                    ]}
                                    key={index}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                        <TextInput
                                            onChangeText={(text) =>
                                                handleUpdateFlashCards("UPDATE", index, "keyword", text)
                                            }
                                            value={item.keyword}
                                            multiline={true}
                                            style={[styles.inputText, { width: "60%" }]}
                                            placeholder="Từ khóa"
                                        />
                                        <Pressable
                                            onPress={() => handleUpdateFlashCards("DELETE", index, null, null)}
                                            style={{
                                                borderRadius: 999,
                                                backgroundColor: "#f20505",
                                                padding: 3,
                                            }}
                                        >
                                            <AntDesign name="minus" size={20} color="white" />
                                        </Pressable>
                                    </View>
                                    <TextInput
                                        onChangeText={(text) =>
                                            handleUpdateFlashCards("UPDATE", index, "definition", text)
                                        }
                                        value={item.definition}
                                        multiline={true}
                                        style={[styles.inputText]}
                                        placeholder="Định nghĩa"
                                    />
                                </View>
                            ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal >
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#FFF",
    },
    header: {
        padding: 8,
        backgroundColor: "#0384fc",
    },
    input: {
        padding: 8
    },
    inputLabel: {
        fontSize: 16
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 8
    },
    flashCard: {
        flexDirection: "column",
        padding: 8,
        marginTop: 8,
        gap: 8,
        borderBottomWidth: 1,
        borderStyle: "dashed"
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonTitle: {
        color: "white"
    }
});

export default AddCollectionModal
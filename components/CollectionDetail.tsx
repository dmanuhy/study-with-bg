import { Collection as CollectionType } from "@/constants/types";
import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CollectionDetailProps {
    collection: CollectionType | null,
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    setEditVisible: (visible: boolean) => void;
}

const CollectionDetail: React.FC<CollectionDetailProps> = ({ collection, modalVisible, setModalVisible, setEditVisible }) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    const handleNext = () => {
        if (collection) {
            const nextIndex = (currentIndex + 1) % collection.flashCards.length;
            setCurrentIndex(nextIndex);
            setIsFlipped(false);
        }
    };

    const handleBack = () => {
        if (collection) {
            const prevIndex =
                (currentIndex - 1 + collection.flashCards.length) %
                collection.flashCards.length;
            setCurrentIndex(prevIndex);
            setIsFlipped(false);
        }
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
                        <View>
                            <Text style={{ fontSize: 20, textAlign: "center", color: "#fff", fontWeight: 500 }}>Flash Cards</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <Pressable onPress={() => { setModalVisible(false); setIsFlipped(false) }} style={[styles.button, { backgroundColor: "#979998" }]}>
                                <Text style={styles.buttonTitle}>Trở về</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                setIsFlipped(false)
                                setEditVisible(true);
                                setModalVisible(false)
                            }} style={[styles.button, { backgroundColor: "#09b03b" }]}>
                                <Text style={styles.buttonTitle}>Chỉnh sửa</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={{ flexDirection: "column", alignItems: "center", gap: 8, paddingHorizontal: 24 }}>
                        <Text style={styles.title}>{collection?.title}</Text>
                        <Text style={{ fontSize: 18, textAlign: "center" }}>{collection?.description}</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>{currentIndex + 1}/{collection?.flashCards.length}</Text>
                    {collection && collection?.flashCards?.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => setIsFlipped(!isFlipped)}
                            style={styles.card}
                        >
                            <Text style={{ position: "absolute", top: 12, fontSize: 16 }}>{isFlipped ? "Định nghĩa" : "Từ khóa"}</Text>
                            <Text style={[styles.cardText, { fontSize: isFlipped ? 16 : 20 }]}>
                                {isFlipped ? collection?.flashCards[currentIndex]?.definition : collection?.flashCards[currentIndex]?.keyword}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Text>Không có flash card nào.</Text>
                    )}
                    <View style={{ flexDirection: "row", gap: 60 }}>
                        <Pressable onPress={handleBack} style={styles.action}>
                            <AntDesign name="caretleft" size={48} color="white" />
                        </Pressable>
                        <Pressable onPress={handleNext} style={styles.action}>
                            <AntDesign name="caretright" size={48} color="white" />
                        </Pressable>
                    </View>
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
        padding: 16,
        backgroundColor: "#0384fc",
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    buttonTitle: {
        color: "white",
        fontSize: 16
    },
    body: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
        gap: 48
    },
    title: {
        fontSize: 24
    },
    card: {
        width: "80%",
        minHeight: 200,
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fefefe",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginBottom: 24,
    },
    cardText: {
        fontWeight: "600",
        textAlign: "center",
        padding: 16
    },
    cardControls: {
        flexDirection: "row",
        gap: 16,
    },
    action: {
        backgroundColor: "#0394fc",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12
    }
});

export default CollectionDetail
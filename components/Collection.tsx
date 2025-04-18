import { Pressable, StyleSheet, Text, View } from "react-native";
import { Collection as CollectionType } from "@/constants/types";

type CollectionProps = {
    collection: CollectionType,
    onPress: () => void
}

const Collection = ({ collection, onPress }: CollectionProps) => {
    return (
        <Pressable style={styles.item} onPress={onPress}>
            <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{collection.title}</Text>
                <Text style={styles.itemDesc}>{collection.description}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        width: "50%",
        padding: 8
    },
    itemContent: {
        borderColor: "#586675",
        borderWidth: 1,
        borderRadius: 12,
        aspectRatio: 1,
        padding: 16
    },
    itemTitle: {
        fontWeight: 500,
        fontSize: 16
    },
    itemDesc: {

    }
});

export default Collection
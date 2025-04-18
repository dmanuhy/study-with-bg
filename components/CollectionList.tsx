import { FlatList } from "react-native";
import Collection from "./Collection";
import { useContext, useState } from "react";
import { useCollectionContext } from "@/contexts/CollectionContext";
import CollectionDetail from "./CollectionDetail";
import { Collection as CollectionType } from "@/constants/types";
import EditCollectionModal from "./Modal/UpdateCollectionModal";
const CollectionList = () => {

    const { collections } = useCollectionContext()
    const [detailVisible, setDetailVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [selectedCollection, setSelectedCollection] = useState<CollectionType | null>(null)
    const handleOpenDetail = (collection: CollectionType) => {
        setSelectedCollection(collection);
        setDetailVisible(true);
    };
    return (
        <>
            <FlatList
                numColumns={2}
                data={collections}
                renderItem={({ item }) => <Collection collection={item} onPress={() => handleOpenDetail(item)} />}
                showsHorizontalScrollIndicator={false}
            />
            <CollectionDetail collection={selectedCollection} modalVisible={detailVisible} setModalVisible={setDetailVisible} setEditVisible={setEditVisible} />
            <EditCollectionModal collection={selectedCollection} modalVisible={editVisible} setModalVisible={setEditVisible} />
        </>
    );
}

export default CollectionList
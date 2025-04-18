import { Collection } from "@/constants/types";
import { useEffect, useState, createContext, PropsWithChildren, useContext } from "react";
import { setItem, getItem } from "../helper/storage";

type CollectionContextType = {
    collections: Collection[]
    updateCollections: (newData: Collection[]) => void;
};

const CollectionContext = createContext<CollectionContextType>({
    collections: [],
    updateCollections: () => { },
});

const COLLECTIONS_KEY = 'collections';

export const CollectionProvider = ({ children }: PropsWithChildren) => {

    const [collections, setCollections] = useState<Collection[]>([])

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const result = await getItem<Collection[]>(COLLECTIONS_KEY);
        console.log(result)
        if (result) {
            setCollections(result)
        }
    }

    const updateCollections = (newData: Collection[]) => {
        setItem(COLLECTIONS_KEY, newData);
        fetchData();
    };

    return (
        <CollectionContext.Provider value={{ collections, updateCollections }}>
            {children}
        </CollectionContext.Provider>
    )
}

export const useCollectionContext = () => useContext(CollectionContext)
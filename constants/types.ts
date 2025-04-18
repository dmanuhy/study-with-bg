export type Collection = {
    id: number | string;
    title: string;
    description: string;
    flashCards: {
        keyword: string;
        definition: string;
    }[];
};

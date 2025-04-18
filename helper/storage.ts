// storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save any data to storage.
 * @param key string key name
 * @param value anything JSON-serializable
 */
export const setItem = async <T>(key: string, value: T): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(`Error saving data for key "${key}":`, e);
    }
};

/**
 * Get any data from storage.
 * @param key string key name
 * @returns parsed value or null
 */
export const getItem = async <T>(key: string): Promise<T | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) as T : null;
    } catch (e) {
        console.error(`Error reading data for key "${key}":`, e);
        return null;
    }
};

/**
 * Remove a key from storage
 */
export const removeItem = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error(`Error removing key "${key}":`, e);
    }
};

/**
 * Clear all data
 */
export const clearAll = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error('Error clearing storage:', e);
    }
};

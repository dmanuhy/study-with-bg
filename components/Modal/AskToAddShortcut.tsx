import React, { useEffect, useState } from 'react';
import { Platform, View, Text, Button } from 'react-native';

const AskToAddShortcut = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const isInStandaloneMode = () =>
            'standalone' in window.navigator && window.navigator.standalone;

        const alreadyPrompted = localStorage.getItem('addToHomePrompted');

        if (Platform.OS === 'ios') {
            // iOS-specific logic
            if (
                !isInStandaloneMode() &&
                !alreadyPrompted &&
                /iPhone|iPad|iPod/.test(navigator.userAgent)
            ) {
                setShowBanner(true);
            }
        } else if (Platform.OS === 'android') {
            // Android-specific logic
            if (!alreadyPrompted) {
                setShowBanner(true);
            }
        }
    }, []);

    const handleClose = () => {
        setShowBanner(false);
        localStorage.setItem('addToHomePrompted', 'true');
    };

    if (!showBanner) return null;

    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#fffbe5',
                padding: 12,
                borderTopWidth: 1,
                borderColor: '#ccc',
                zIndex: 1000,
            }}
        >
            <Text style={{ textAlign: 'center' }}>
                {Platform.OS === 'ios'
                    ? 'Nhấn nút chia sẻ → rồi chọn “Thêm vào MH chính” để cài đặt ứng dụng.'
                    : 'Nhấn nút menu → rồi chọn “Thêm vào MH chính” để cài đặt ứng dụng.'}
            </Text>
            <Button title="Đã hiểu" onPress={handleClose} />
        </View>
    );
};

export default AskToAddShortcut;
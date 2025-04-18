import React, { useEffect, useState } from 'react';
import { Platform, View, Text, Button } from 'react-native';
import { isBrowser } from 'react-device-detect'; // Optional, helps filter

const AskToAddShortcut = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const isInStandaloneMode = () =>
            'standalone' in window.navigator && window.navigator.standalone;

        const alreadyPrompted = localStorage.getItem('addToHomePrompted');

        if (
            isBrowser &&
            !isInStandaloneMode() &&
            !alreadyPrompted &&
            /iPhone|iPad|iPod/.test(navigator.userAgent)
        ) {
            setShowBanner(true);
        }
    }, []);

    const handleClose = () => {
        setShowBanner(false);
        localStorage.setItem('addToHomePrompted', 'true');
    };

    if (!showBanner) return null;

    return (
        <View style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fffbe5',
            padding: 12,
            borderTopWidth: 1,
            borderColor: "#ccc",
            zIndex: 1000
        }}>
            <Text style={{ textAlign: "center" }}>Nhấn nút chia sẻ → rồi chọn “Thêm vào MH chính” để cài đặt ứng dụng.</Text>
            <Button title="Đã hiểu" onPress={handleClose} />
        </View>
    );
};

export default AskToAddShortcut;

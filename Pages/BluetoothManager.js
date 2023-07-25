import React, { useState, useEffect } from 'react';
import { BleManager, Device } from 'react-native-ble-plx';

const manager = new BleManager();

const BluetoothManager = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        return () => {
            stopScan();
            manager.destroy();
        };
    }, []);

    const startScan = () => {
        if (!isScanning) {
            setIsScanning(true);
            setDevices([]);

            manager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    console.log('Scan error:', error);
                    return;
                }

                if (!devices.some((d) => d.id === device.id)) {
                    setDevices((prevDevices) => [...prevDevices, device]);
                }
            });

            // Stop scanning after 10 seconds (adjust as needed)
            setTimeout(() => stopScan(), 10000);
        }
    };

    const stopScan = () => {
        manager.stopDeviceScan();
        setIsScanning(false);
    };

    return {
        isScanning,
        devices,
        startScan,
        stopScan,
    };
};

export default BluetoothManager;

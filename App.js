import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const App = () => {
  const [bluetoothDevices, setBluetoothDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isBluetoothPoweredOn, setIsBluetoothPoweredOn] = useState(false);

  useEffect(() => {
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log('Bluetooth initialized');
        setIsBluetoothPoweredOn(true);
      })
      .catch(error => {
        console.error('Bluetooth initialization error:', error);
        setIsBluetoothPoweredOn(false);
      });
  }, []);

  const startScan = () => {
    if (!isScanning && isBluetoothPoweredOn) {
      BleManager.scan([], 10, false)
        .then(results => {
          console.log('Scanning...');
          setIsScanning(true);
          const discoveredDevices = results.map(result => ({
            id: result.id,
            name: result.name || 'Unknown Device',
          }));
          setBluetoothDevices(discoveredDevices);
          console.log(results, 'resultsssssssss');
        })
        .catch(err => {
          console.error(err);
          setIsScanning(false);
        });
    } else {
      console.log('Bluetooth is not powered on.');
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome to the Bluetooth Chat App</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={startScan}
          >
            <Text style={styles.buttonTextStyle}>
              {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* list of scanned bluetooth devices */}
        <View>
          {bluetoothDevices.map(device => (
            <View key={device.id} style={styles.deviceContainer}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceId}>ID: {device.id}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#0082FC',
    paddingTop: '30%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Baloo2-Bold',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 50,
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 45,
    marginRight: 45,
    marginTop: 25,
  },
  buttonTextStyle: {
    color: '#0082FC',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Baloo2-medium',
  },
  deviceContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: '#0082FC',
  },
  deviceId: {
    fontSize: 14,
    color: '#0082FC',
  },
});

export default App;

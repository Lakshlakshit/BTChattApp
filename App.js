import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet, Text, View, NativeEventEmitter,
  PermissionsAndroid, Platform, NativeModules,
} from 'react-native';
import { Landing } from './Pages/Landing';
import BleManager from 'react-native-ble-manager';


export default function App() {
  useEffect(() => {
    // turn on bluetooth if it is not on
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });
    // start bluetooth manager
    BleManager.start({ showAlert: false }).then(() => {
      console.log('BLE Manager initialized');
    });
    let stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('Scan is stopped');
        handleGetConnectedDevices();
      },
    );
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
    const startScan = () => {
      if (!isScanning) {
        BleManager.scan([], 5, true)
          .then(() => {
            setIsScanning(true);
          })
          .catch(error => {
            console.error(error);
          });
      }
    };
    const handleGetConnectedDevices = () => {
      BleManager.getConnectedPeripherals([]).then(results => {
        if (results.length == 0) {
          console.log('No connected bluetooth devices');
        } else {
          for (let i = 0; i < results.length; i++) {
            let peripheral = results[i];
            peripheral.connected = true;
            peripherals.set(peripheral.id, peripheral);
            setConnected(true);
            setBluetoothDevices(Array.from(peripherals.values()));
          }
        }
      });
    };
    const connectToPeripheral = peripheral => {
      if (peripheral.connected) {
        BleManager.disconnect(peripheral.id).then(() => {
          peripheral.connected = false;
          setConnected(false);
          alert(`Disconnected from ${peripheral.name}`);
        });
      } else {
        BleManager.connect(peripheral.id)
          .then(() => {
            let peripheralResponse = peripherals.get(peripheral.id);
            if (peripheralResponse) {
              peripheralResponse.connected = true;
              peripherals.set(peripheral.id, peripheralResponse);
              setConnected(true);
              setBluetoothDevices(Array.from(peripherals.values()));
            }
            alert('Connected to ' + peripheral.name);
          })
          .catch(error => console.log(error));
        /* Read current RSSI value */
        setTimeout(() => {
          BleManager.retrieveServices(peripheral.id).then(peripheralData => {
            console.log('Peripheral services:', peripheralData);
          });
        }, 900);
      }
    };
  
    return () => {
      stopListener.remove();
    };
  }, []);
  return (
    <Landing />

  );



  
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  const BleManagerModule = NativeModules.BleManager;
  const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
}
  export default function App()
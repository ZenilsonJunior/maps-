import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, PermissionsAndroid, Dimensions } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('screen');

export default function App() {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

useEffect(() => {
  getMyLocation()
}, [])

function getMyLocation(){
  Geolocation.getCurrentPosition(info => {
    console.log("LAT ", info.coords.latitude)
    console.log("LONG ", info.coords.longitude)

    setRegion({
      latitude: info.coords.latitude,
      longitude: info.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })

  },
  () => { console.log("DEU ALGUM ERRO")}, { 
    enableHighAccuracy: true,
    timeout: 2000,
  })
}

function newMarker(e){
  //console.log(e.nativeEvent.coordinate.latitude);

  let dados = {
    key: markers.length,
    coords:{
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    },
    pincolor: '#FF0000'
  }

    setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })

    setMarkers(oldArray => [...oldArray, dados])
}

return (
 <View style={StyleSheet.container}>
   <MapView 
     onMapReady={() => {
       Platform.OS === 'android' ?
       PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.ACESS_FINE_LOCATION)
         .then(() => {
            console.log("USUARIO ACEITOU")
         })
       : ''
     }}

      style={{width: width, height: height}}
      region={region}
      zoomEnable={true}
      miniZoomLevel={17}
      showsUserLocation={true}
      loadingEnable={true}
      onPress={(e) => newMarker() }
  >
    {markers.map(marker => {
      return(
        <Marker key={marker.key} coordinate={marker.coords} pincolor={marker.pincolor} />
      )
    })}
     </MapView>  
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center'
  },
})
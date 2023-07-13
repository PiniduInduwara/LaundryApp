import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev)=> curr + prev,0);
    const navigation = useNavigation();
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("we are loading your location");
    // console.log(cart);
    const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    });
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert('Location services not enabled', 'Please enable the location services', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
                { cancelable: false }
            );
        } else {
            setlocationServicesEnabled(enabled)
        }
    }
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert('Permission Denied', 'Allow the app to use location services', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
                { cancelable: false }
            );
        };

        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords)
        if (coords) {
            const { latitude, longitude } = coords;

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            // console.log(response)

            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setdisplayCurrentAddress(address)
            }
        }

    }

    const product = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(product.length > 0) return;

        const fetchProducts = () => {
            services.map((service) => dispatch(getProducts(service)));
        };
        fetchProducts();
    }, [])
    const services = [
        {
          id: "0",
          image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
          name: "shirt",
          quantity: 0,
          price: 10,
        },
        {
          id: "11",
          image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
          name: "T-shirt",
          quantity: 0,
          price: 10,
        },
        {
          id: "12",
          image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
          name: "dresses",
          quantity: 0,
          price: 10,
        },
        {
          id: "13",
          image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
          name: "jeans",
          quantity: 0,
          price: 10,
        },
        {
          id: "14",
          image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
          name: "Sweater",
          quantity: 0,
          price: 10,
        },
        {
          id: "15",
          image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
          name: "shorts",
          quantity: 0,
          price: 10,
        },
        {
          id: "16",
          image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
          name: "Sleeveless",
          quantity: 0,
          price: 10,
        },
      ];

    return (

        <>
        <ScrollView style={{backgroundColor: "#F0F0F0", flex: 1, marginTop: 50}}>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Ionicons name="location" size={30} color="#D2122E" />
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
                    <Text>{displayCurrentAddress}</Text>
                </View>

                <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
                    <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: "https://lh3.googleusercontent.com/ogw/AGvuzYbTcEcOLY-pQ1ns-gYIrsOg_bP-jgANqi2R1EC7nA=s32-c-mo" }} />
                </Pressable>

            </View>

            {/*search bar*/}
            <View style={{ padding: 10, margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth:0.8, borderColor: "#D2122E", borderRadius:7 }}>
                <TextInput placeholder='Search for items or More' />
                <FontAwesome name="search" size={24} color="#D2122E" />
            </View>

             {/*Image Carousel*/}
             <Carousel/>

             {/*Services*/}
             <Services/>

             {/*Render all the products*/}
             {product.map((item, index) =>(
                <DressItem item={item} key={index}/>
             ))}
        </ScrollView>

           {total === 0 ? (
              null
           ) : (
            <Pressable
            style={{
               backgroundColor: "#088F8F",
               padding: 10,
               marginBottom: 40,
               margin: 15,
               borderRadius: 7,
               flexDirection: "row",
               alignItems: "center",
               justifyContent:"space-between",
             }}>
               <View>
                   <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items | $ {total}</Text>
                   <Text style={{fontSize:14,fontWeight:"400",color:"white",marginVertical:6}}>Extra charges might apply</Text>
               </View>
   
               <Pressable onPress={()=>navigation.navigate("PickUp")}>
                   <Text style={{fontSize:15,fontWeight:"600",color:"white"}}>Proceed to Pick up</Text>
               </Pressable>
           </Pressable>

           )}

        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
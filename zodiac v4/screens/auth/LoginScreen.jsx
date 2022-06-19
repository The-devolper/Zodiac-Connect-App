import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../../fragments/AppText';
import AppButton from '../../paper/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { login, sliceActionConnectGoogle } from '../../redux/slices/authSlice';

import * as Google from 'expo-auth-session/providers/google';
// import * as Google from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator } from 'react-native-paper';
import { Image } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '402573166777-i7hvgn2ppb1gou461lb38iuh4f6s5uq9.apps.googleusercontent.com',
    iosClientId:
      '402573166777-6pr80gh305s081tm4riovdtal6c42108.apps.googleusercontent.com',
    expoClientId:
      '402573166777-ubaiac57qkvj265lhgu9hdiugtdmv36g.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'openid'],
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      getUserData();
    }
  }, [accessToken]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    userInfoResponse.json().then(userInfo => {
      setUserInfo(userInfo);
      dispatch(sliceActionConnectGoogle(userInfo));
    });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/icon.png')} />
      <AppText style={styles.title}>Zodiac Connect</AppText>
      {!!accessToken && !userInfo && (
        <AppButton
          onPress={() => {
            getUserData();
          }}
        >
          Continue
        </AppButton>
      )}
      {!!accessToken && !userInfo && (
        <ActivityIndicator size={'large'}></ActivityIndicator>
      )}
      {!accessToken && (
        <AppButton
          onPress={() => {
            promptAsync({ showInRecents: true });
          }}
          uppercase={false}
          icon='google'
          mode='outlined'
        >
          Continue With Google
        </AppButton>
      )}
      <View style={styles.action}>
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <AppText style={styles.link}>Terms</AppText>
        </TouchableOpacity>
        <AppText> . </AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <AppText style={styles.link}>Privacy Policy</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: Dimensions.get('window').height * 0.5,
    color: '#ef895f',
  },
  link: {
    color: '#ef895f',
  },
  action: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height * 0.05,
  },
});

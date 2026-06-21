import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { appConfig } from '@/config/app';
import { AuthScreenProps } from '@/navigation/types';
import { Text } from '@/shared/ui';
import { colors } from '@/theme/colors';

export function WelcomeScreen({
  navigation,
}: AuthScreenProps<'Welcome'>) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={require('../../../../assets/tehtrak.jpg')}
          resizeMode="contain"
          style={styles.logo}
        />

        <Text style={styles.title}>
          {appConfig.name}
        </Text>

        <Text style={styles.subtitle}>
          Your operational notebook
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.buttonText,
                pressed && styles.buttonTextPressed,
              ]}
            >
              Sign in
            </Text>
          )}
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('Register')}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.buttonText,
                pressed && styles.buttonTextPressed,
              ]}
            >
              Create account
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 64,
  },

  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 32,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1,
    marginBottom: 12,
  },

  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
  },

  actions: {
    gap: 16,
  },

  button: {
    height: 58,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonPressed: {
    backgroundColor: '#FFFFFF',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  buttonTextPressed: {
    color: colors.primary,
  },
});
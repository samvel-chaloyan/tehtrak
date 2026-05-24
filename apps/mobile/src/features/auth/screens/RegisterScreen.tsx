import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AuthScreenProps } from '@/navigation/types';
import { useAppStore } from '@/store';
import { useTheme } from '@/theme';
import { Button, Input, Screen, Stack, Text } from '@/shared/ui';

export function RegisterScreen({ navigation }: AuthScreenProps<'Register'>) {
  const { spacing } = useTheme();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen scroll>
      <Stack gap="lg" style={{ paddingTop: spacing.lg }}>
        <Stack gap="xs">
          <Text variant="titleLarge">Create your space</Text>
          <Text variant="body" color="secondary">
            Start with a calm notebook for the work you already track by hand.
          </Text>
        </Stack>

        <Stack gap="md">
          <Input label="Your name" value={name} onChangeText={setName} placeholder="Sam" />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="At least 8 characters"
          />
        </Stack>

        <Button label="Create account" fullWidth onPress={() => setAuthenticated(true)} />

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text variant="bodySmall" color="secondary" style={styles.centered}>
            Already have an account?{' '}
            <Text variant="bodySmall" color="accent">
              Sign in
            </Text>
          </Text>
        </Pressable>
      </Stack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
  },
});

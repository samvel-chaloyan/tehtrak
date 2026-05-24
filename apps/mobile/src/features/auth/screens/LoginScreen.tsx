import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AuthScreenProps } from '@/navigation/types';
import { useAppStore } from '@/store';
import { useTheme } from '@/theme';
import { Button, Input, Screen, Stack, Text } from '@/shared/ui';

export function LoginScreen({ navigation }: AuthScreenProps<'Login'>) {
  const { spacing } = useTheme();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <Screen scroll>
      <Stack gap="lg" style={{ paddingTop: spacing.lg }}>
        <Stack gap="xs">
          <Text variant="titleLarge">Welcome back</Text>
          <Text variant="body" color="secondary">
            Sign in to open your operational notebooks.
          </Text>
        </Stack>

        <Stack gap="md">
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
            placeholder="Your password"
          />
        </Stack>

        <Button label="Sign in" fullWidth onPress={handleLogin} />

        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text variant="bodySmall" color="secondary" style={styles.centered}>
            New here?{' '}
            <Text variant="bodySmall" color="accent">
              Create an account
            </Text>
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()}>
          <Text variant="bodySmall" color="tertiary" style={styles.centered}>
            Back
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

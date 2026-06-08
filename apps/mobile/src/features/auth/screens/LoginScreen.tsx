import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { AuthScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { getScreenErrorMessage } from '@/utils';
import { Button, Input, Screen, ScreenHeader, Stack, Text } from '@/shared/ui';

export function LoginScreen({ navigation }: AuthScreenProps<'Login'>) {
  const { spacing } = useTheme();
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      await login.mutateAsync({ email: email.trim(), password });
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not sign in. Try again.'));
    }
  };

  return (
    <Screen scroll>
      <Stack gap="lg" style={{ paddingTop: spacing.lg }}>
        <ScreenHeader
          title="Welcome back"
          subtitle="Sign in to open your operational notebooks."
        />

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

        {error ? (
          <Text variant="bodySmall" color="danger">
            {error}
          </Text>
        ) : null}

        <Button
          label={login.isPending ? 'Signing in…' : 'Sign in'}
          fullWidth
          onPress={handleLogin}
          disabled={login.isPending}
        />

        <Pressable onPress={() => navigation.navigate('Register')} hitSlop={12}>
          <Text variant="bodySmall" color="secondary" style={styles.centered}>
            New here?{' '}
            <Text variant="bodySmall" color="accent">
              Create an account
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

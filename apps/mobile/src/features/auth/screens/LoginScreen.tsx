import { useState } from 'react';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { AuthScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { getScreenErrorMessage } from '@/utils';
import { Button, Input, PageHeader, Screen, Stack, Text, TextLink } from '@/shared/ui';

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
      <Stack gap="lg">
        <PageHeader
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

        <Stack gap="xs" align="center" style={{ paddingTop: spacing.sm }}>
          <Text variant="bodySmall" color="secondary">
            New here?
          </Text>
          <TextLink label="Create an account" emphasis={false} onPress={() => navigation.navigate('Register')} />
        </Stack>
      </Stack>
    </Screen>
  );
}

import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { AuthScreenProps } from '@/navigation/types';
import { safeGoBack } from '@/navigation/safeGoBack';
import { Input, Stack, Text } from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';

export function LoginScreen({ navigation }: AuthScreenProps<'Login'>) {
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
    <AuthScreenLayout
      headerTitle="Sign in"
      subtitle="Welcome back — open the notebook you already trust."
      onBack={() => safeGoBack(navigation, () => navigation.navigate('Welcome'))}
      scroll
      footer={{
        mode: 'single',
        action: {
          label: login.isPending ? 'Signing in…' : 'Sign in',
          onPress: handleLogin,
          disabled: login.isPending,
        },
      }}
    >
      <Stack gap="md" style={styles.fields}>
        <Input
          label="Email"
          labelColor="secondary"
          valueColor="primary"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          autoComplete="email"
          textContentType="emailAddress"
        />
        <Input
          label="Password"
          labelColor="secondary"
          valueColor="primary"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          revealable
          autoComplete="password"
          textContentType="password"
        />

        {error ? (
          <Text variant="bodySmall" color="danger" style={styles.error}>
            {error}
          </Text>
        ) : null}
      </Stack>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  fields: {
    width: '100%',
  },
  error: {
    textAlign: 'center',
  },
});

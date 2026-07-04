import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { AuthScreenProps } from '@/navigation/types';
import { Input, Stack, Text } from '@/shared/ui';
import { useTheme } from '@/theme';
import { getScreenErrorMessage } from '@/utils';

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
    <AuthScreenLayout
      headerTitle="Sign in"
      onBack={() => navigation.goBack()}
      scroll
      footer={{
        mode: 'single',
        action: {
          label: login.isPending ? 'Signing in…' : 'Next',
          onPress: handleLogin,
          disabled: login.isPending,
        },
      }}
    >
      <Stack gap="md" style={[styles.fields, { paddingTop: spacing.sm }]}>
        <Input
          label="Email"
          labelColor="secondary"
          valueColor="secondary"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          labelColor="secondary"
          valueColor="secondary"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Your password"
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

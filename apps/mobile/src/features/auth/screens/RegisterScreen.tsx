import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout';
import { useRegister } from '@/features/auth/hooks/useAuth';
import { AuthScreenProps } from '@/navigation/types';
import { Input, Stack, Text } from '@/shared/ui';
import { useTheme } from '@/theme';
import { getScreenErrorMessage } from '@/utils';

export function RegisterScreen({ navigation }: AuthScreenProps<'Register'>) {
  const { spacing } = useTheme();
  const register = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    try {
      await register.mutateAsync({
        email: email.trim(),
        password,
        displayName: name.trim(),
      });
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not create account. Try again.'));
    }
  };

  return (
    <AuthScreenLayout
      headerTitle="Create account"
      onBack={() => navigation.goBack()}
      scroll
      footer={{
        mode: 'single',
        action: {
          label: register.isPending ? 'Creating…' : 'Next',
          onPress: handleRegister,
          disabled: register.isPending,
        },
      }}
    >
      <Stack gap="lg" style={[styles.content, { paddingTop: spacing.sm }]}>
        <Text variant="bodySmall" color="secondary" style={styles.subtitle}>
          Start with a calm notebook for the work you already track by hand.
        </Text>

        <Stack gap="md" style={styles.fields}>
          <Input
            label="Your name"
            labelColor="secondary"
            valueColor="secondary"
            value={name}
            onChangeText={setName}
            placeholder="Sam"
          />
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
            placeholder="At least 8 characters"
          />

          {error ? (
            <Text variant="bodySmall" color="danger" style={styles.error}>
              {error}
            </Text>
          ) : null}
        </Stack>
      </Stack>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
  subtitle: {
    maxWidth: 320,
  },
  fields: {
    width: '100%',
  },
  error: {
    textAlign: 'center',
  },
});

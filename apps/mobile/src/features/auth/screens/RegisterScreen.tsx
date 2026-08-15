import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AuthScreenLayout } from '@/features/auth/components/AuthScreenLayout';
import { useRegister } from '@/features/auth/hooks/useAuth';
import { AuthScreenProps } from '@/navigation/types';
import { Input, Stack, Text } from '@/shared/ui';
import { getScreenErrorMessage } from '@/utils';

export function RegisterScreen({ navigation }: AuthScreenProps<'Register'>) {
  const register = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);

    const displayName = name.trim();
    const trimmedEmail = email.trim();
    if (!displayName) {
      setError('Enter your name to continue.');
      return;
    }
    if (!trimmedEmail) {
      setError('Enter your email to continue.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      await register.mutateAsync({
        email: trimmedEmail,
        password,
        displayName,
      });
    } catch (e) {
      setError(getScreenErrorMessage(e, 'Could not create account. Try again.'));
    }
  };

  return (
    <AuthScreenLayout
      headerTitle="Create account"
      subtitle="Start with a calm notebook for the work you already track by hand."
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
      <Stack gap="md" style={styles.fields}>
        <Input
          label="Your name"
          labelColor="secondary"
          valueColor="primary"
          value={name}
          onChangeText={setName}
          placeholder="Sam"
          autoComplete="name"
          textContentType="name"
        />
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
          placeholder="At least 8 characters"
          autoComplete="new-password"
          textContentType="newPassword"
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

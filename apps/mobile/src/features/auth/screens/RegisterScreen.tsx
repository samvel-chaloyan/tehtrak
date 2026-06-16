import { useState } from 'react';
import { useRegister } from '@/features/auth/hooks/useAuth';
import { AuthScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { getScreenErrorMessage } from '@/utils';
import { Button, Input, PageHeader, Screen, Stack, Text, TextLink } from '@/shared/ui';

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
    <Screen scroll>
      <Stack gap="lg">
        <PageHeader
          title="Create your space"
          subtitle="Start with a calm notebook for the work you already track by hand."
        />

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

        {error ? (
          <Text variant="bodySmall" color="danger">
            {error}
          </Text>
        ) : null}

        <Button
          label={register.isPending ? 'Creating…' : 'Create account'}
          fullWidth
          onPress={handleRegister}
          disabled={register.isPending}
        />

        <Stack gap="xs" align="center" style={{ paddingTop: spacing.sm }}>
          <Text variant="bodySmall" color="secondary">
            Already have an account?
          </Text>
          <TextLink label="Sign in" emphasis={false} onPress={() => navigation.navigate('Login')} />
        </Stack>
      </Stack>
    </Screen>
  );
}

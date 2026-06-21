import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { AuthScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme';
import { getScreenErrorMessage } from '@/utils';
import { Input, Text, ThreeLines } from '@/shared/ui';

export function LoginScreen({ navigation }: AuthScreenProps<'Login'>) {
  const { colors, radius, spacing } = useTheme();
  const insets = useSafeAreaInsets();
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
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl }]}>
      <View style={styles.scroll}>
        <View style={styles.centerWrapper}>
          {/* Brand */}
          <View style={styles.brand}>
            <ThreeLines size="lg" align="center" />
            <View style={styles.brandText}>
              <Text variant="titleLarge" style={styles.title}>
                Tehtrak
              </Text>
              <Text
                style={[
                  styles.tagline,
                  { color: colors.textSecondary },
                ]}
              >
                Your operational notebook.
              </Text>
            </View>
          </View>

          {/* Form Card */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderRadius: radius.xl,
                padding: spacing.lg + spacing.sm,
              },
            ]}
          >
            <View style={styles.fields}>
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
            </View>

            {error ? (
              <Text
                variant="bodySmall"
                color="danger"
                style={styles.error}
              >
                {error}
              </Text>
            ) : null}

            {/* Sign In button — white bg, blue border, inverts on press */}
            <Pressable
              onPress={handleLogin}
              disabled={login.isPending}
              style={({ pressed }) => [
                styles.signInButton,
                {
                  backgroundColor: pressed ? colors.primary : colors.surface,
                  borderColor: colors.primary,
                  borderRadius: radius.button,
                  opacity: login.isPending ? 0.5 : 1,
                },
              ]}
            >
              <Text
                variant="subtitle"
                style={{
                  color: colors.primary,
                  textAlign: 'center',
                }}
              >
                {login.isPending ? 'Signing in…' : 'Sign in'}
              </Text>
            </Pressable>
          </View>

          {/* Create account link */}
          <View style={styles.secondaryAction}>
            <Pressable
              onPress={() => navigation.navigate('Register')}
              hitSlop={8}
              style={({ pressed }) => [
                styles.createAccountLink,
              ]}
            >
              <Text
                variant="body"
                style={{
                  color: colors.textSecondary,
                  textAlign: 'center',
                }}
              >
                Create account
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  brand: {
    alignItems: 'center',
    marginBottom: 40,
    gap: 16,
  },
  brandText: {
    alignItems: 'center',
    gap: 6,
  },
  title: {
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
    maxWidth: 280,
  },
  card: {
    width: '100%',
    gap: 16,
  },
  fields: {
    gap: 12,
  },
  error: {
    marginBottom: 4,
  },
  signInButton: {
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryAction: {
    alignItems: 'center',
    marginTop: 24,
  },
  createAccountLink: {
    paddingVertical: 8,
  },
});
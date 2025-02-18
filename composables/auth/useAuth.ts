import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { use_auth_social_signup } from '@/composables/auth/socialSignup';

export function useAuth() {
  const user = ref(null) as any
  const error = ref<string | null>(null);
  const loading = ref(false);
  const initialized = ref(false);
  const { social_signup, setAuthObj } = use_auth_social_signup();
  const { $auth } = useNuxtApp();

  const initializeAuthState = () => {
    loading.value = true;
    onAuthStateChanged($auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
      } else {
        user.value = null;
      }
      initialized.value = true;
      loading.value = false;
    });
  };

  onMounted(() => {
    initializeAuthState();
  });

  const extractNameParts = (displayName: string | null | undefined) => {
    if (!displayName) {
      return { firstName: '', lastName: '' };
    }
    const nameParts = displayName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ');
    return { firstName, lastName };
  };

  const generatePassword = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  };

  const signIn = async (provider: GoogleAuthProvider | OAuthProvider, providerName: string) => {
    try {
      loading.value = true;

      // Sign out any previously signed-in users before proceeding
      await signOut($auth);

      const result = await signInWithPopup($auth, provider);
      const userObj = result.user;
      const token = await userObj.getIdToken();
      const { firstName, lastName } = extractNameParts(userObj?.displayName);
      const password = generatePassword();
      const authObj = {
        idToken: token,
        provider: providerName,
        app: 'CLIENT',
        email: userObj.email,
        firstName,
        lastName,
        password,
      };

      setAuthObj(authObj);
      await social_signup();
      user.value = userObj;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // Request explicit consent for permissions (OAuth Consent Screen)
    provider.setCustomParameters({ prompt: 'consent' });

    await signIn(provider, 'google');
  };

  const signInWithApple = async () => {
    const provider = new OAuthProvider('apple.com');
    await signIn(provider, 'apple');
  };

  return {
    user,
    error,
    loading,
    initialized,
    signInWithGoogle,
    signInWithApple,
  };
}

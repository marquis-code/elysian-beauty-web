import { useUser } from "~/composables/auth/useUser";
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast'

const { showToast } = useCustomToast();

export const useLogin = () => {
    const router = useRouter();
    const loading = ref(false);
    const credential = ref({ email: '', password: '' });

    const isFormDisabled = computed(() => !credential.value.email || !credential.value.password || loading.value);

    const login = async () => {
        loading.value = true;
        const res = await auth_api.$_login(credential.value) as any
        loading.value = false;

        if ([200, 201].includes(res.status)) {
            const userData = res.data.data;
            
            // Create user with the full data structure including serviceProvider
            useUser().createUser({
                token: userData.token,
                email: userData.email,
                userId: userData.userId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                serviceProvider: userData.serviceProvider,
            });
            
            showToast({ title: 'Success', message: 'Login was successful.', toastType: 'success', duration: 3000 });
            
            // Navigate based on whether user is a service provider or client
            if (userData.serviceProvider) {
                navigateTo('/dashboard');
            } else {
                navigateTo('/explore');
            }
        } else {
            showToast({ title: 'Error', message: res?.data?.message || 'Something went wrong', toastType: 'error', duration: 3000 });
        }
    };
    
    return { credential, login, loading, isFormDisabled };
};
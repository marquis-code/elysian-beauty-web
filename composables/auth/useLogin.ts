import { useUser } from "~/composables/auth/useUser";
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast'

const { showToast } = useCustomToast();

export const useLogin = () => {
    const router = useRouter();
    const loading = ref(false);
    const credential = ref({ email: '', password: '' });

    const isFormDisabled = computed(() => !credential.value.email || !credential.value.password || loading.value);

    // Helper function to decode JWT token
    const decodeToken = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    };

    const login = async () => {
        loading.value = true;
        const res = await auth_api.$_login(credential.value) as any
        loading.value = false;

        if ([200, 201].includes(res.status)) {
            // Extract token from response
            const token = res.data.data.token;
            
            if (token) {
                // Decode the token to extract payload
                const tokenPayload = decodeToken(token);
                console.log(tokenPayload, 'token paylaod here')
                if (tokenPayload) {
                    // Merge token payload with response data
                    const mergedUserData = {
                        ...res.data.data,
                        ...tokenPayload,
                    };

                    if(tokenPayload.role === 'CLIENT'){
                        navigateTo('/explore')
                    } else{
                        navigateTo('/dashboard')
                    }
                    
                    // Pass the merged data to createUser
                    useUser().createUser(mergedUserData);
                } else {
                    // Fallback to response data if token decoding fails
                    useUser().createUser(res.data.data);
                }
            } else {
                // If no token, use the data from response
                useUser().createUser(res.data.data);
            }
            
            showToast({ title: 'Success', message: 'Login was successful.', toastType: 'success', duration: 3000 });
            // router.push('/dashboard');
        } else {
            showToast({ title: 'Error', message: res?.data?.message || 'Something went wrong', toastType: 'error', duration: 3000 });
        }
    };
    
    return { credential, login, loading, isFormDisabled };
};
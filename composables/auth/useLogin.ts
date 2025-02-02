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

        if (res.type !== 'ERROR') {
            useUser().createUser(res.data);
            showToast({ title: 'Success', message: 'Login was successful.', toastType: 'success', duration: 3000 });
            router.push('/dashboard');
        } else {
            showToast({ title: 'Error', message: res?.data?.error || 'Something went wrong', toastType: 'error', duration: 3000 });
        }
    };
    return { credential, login, loading, isFormDisabled };
};

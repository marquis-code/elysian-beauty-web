import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { auth_api } from '@/api_factory/modules/auth';
import { useUser } from '~/composables/auth/useUser';
import { useCustomToast } from '@/composables/core/useCustomToast';
const { showToast } = useCustomToast();

export const useRegister = () => {
    const router = useRouter();
    const loading = ref(false);
    const credential = ref({ firstname: '', lastname: '', email: '', password: '' });

    const isFormDisabled = computed(() => !credential.value.email || !credential.value.password || loading.value);

    const register = async () => {
        loading.value = true;
        const res = await auth_api.$_register(credential.value) as any
        loading.value = false;

        if (res.type !== 'ERROR') {
            showToast({ title: 'Success', message: 'Registration successful. Please check your email.', toastType: 'success', duration: 3000 });
        } else {
            showToast({ title: 'Error', message: res?.data?.error || 'Something went wrong', toastType: 'error', duration: 3000 });
        }
    };
    return { credential, register, loading, isFormDisabled };
};
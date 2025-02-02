import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { auth_api } from '@/api_factory/modules/auth';
import { useUser } from '~/composables/auth/useUser';
import { useCustomToast } from '@/composables/core/useCustomToast';

const { showToast } = useCustomToast();

export const use_auth_change_password = () => {
    const router = useRouter();
    const loading = ref(false);
    const credential = ref({ currentPassword: '', newPassword: '' });

    const changePassword = async () => {
        loading.value = true;
        const res = await auth_api.$_change_password(credential.value) as any
        loading.value = false;

        if (res.type !== 'ERROR') {
            showToast({ title: 'Success', message: 'Password changed successfully.', toastType: 'success', duration: 3000 });
            router.push('/profile');
        } else {
            showToast({ title: 'Error', message: res?.data?.error || 'Something went wrong', toastType: 'error', duration: 3000 });
        }
    };
    return { credential, changePassword, loading };
};

import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { auth_api } from '@/api_factory/modules/auth';
import { useUser } from '~/composables/auth/useUser';
import { useCustomToast } from '@/composables/core/useCustomToast';

const { showToast } = useCustomToast();


export const use_auth_verify_identity = () => {
    const loading = ref(false);
    const credential = ref({ token: '' });

    const verifyIdentity = async () => {
        loading.value = true;
        const res = await auth_api.$_verify_identity(credential.value) as any
        loading.value = false;

        if (res.type !== 'ERROR') {
            showToast({ title: 'Success', message: 'Identity verification successful.', toastType: 'success', duration: 3000 });
        } else {
            showToast({ title: 'Error', message: res?.data?.error || 'Something went wrong', toastType: 'error', duration: 3000 });
        }
    };
    return { credential, verifyIdentity, loading };
};
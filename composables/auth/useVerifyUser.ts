import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { auth_api } from '@/api_factory/modules/auth';
import { useUser } from '~/composables/auth/useUser';
import { useCustomToast } from '@/composables/core/useCustomToast';

const { showToast } = useCustomToast();
// const route = useRoute()

export const use_auth_verify_user = () => {
    const loading = ref(false);
    const route = useRoute()
    const router = useRouter()
    const { createUser } = useUser()
    const credential = ref({
        email: "",
        otp: ""
    });

    const verifyUser = async () => {
        loading.value = true;
        const res = await auth_api.$_verify_user(credential.value) as any
        console.log(res, 'res here')
        loading.value = false;

        if ([200, 201].includes(res.status)) {
            // createUser(res?.data?.data)
            router.push('/account-success')
            localStorage.removeItem('client_signup_form')
            showToast({ title: 'Success', message: res?.data?.message, toastType: 'success', duration: 3000 });
            return res
        } else {
            showToast({ title: 'Error', message: res?.data?.message || 'Something went wrong', toastType: 'error', duration: 3000 });
            return res
        }
    };

    const setPayload = (data: any) => {
        credential.value.email = route.query.email || data.email,
        credential.value.otp = data.otp
    }
    return { credential, verifyUser, loading, setPayload };
};

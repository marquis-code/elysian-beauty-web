import { useUser } from "@/composables/auth/user";
import { auth_api } from "@/api_factory/modules/auth";
import { useRouter, useNuxtApp } from "#imports";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

const credential = {
    firstname: ref(""),
    lastname: ref(""),
    email: ref(""),
    password: ref(""),
};

export const use_auth_register = () => {
    const loading = ref(false);
    const router = useRouter();

    const register = async () => {
        loading.value = true;
        const payload = {
            firstName: credential.firstname.value,
            lastName: credential.lastname.value,
            email: credential.email.value,
            password: credential.password.value,
        }

        try {
            const res = await auth_api.$_register(payload) as any;

            loading.value = false;

            if (res.type !== "ERROR") {
                router.push('/login');
            } else {
                showToast({
                    title: "Error",
                    message: res.data.error,
                    toastType: "error",
                    duration: 3000
                });
            }
        } catch (error) {
            loading.value = false;
            showToast({
                title: "Error",
                message: "Registration failed. Please try again.",
                toastType: "error",
                duration: 3000
            });
        }
    };

    // Computed properties for validation
    const passwordMismatch = computed(() => {
        return credential.password.value !== credential.confirmPassword.value;
    });

    const populateObj = (data: any) => {
        credential.firstname.value = data.firstname
        credential.lastname.value = data.lastname
        credential.email.value = data.email
        credential.password.value = data.password
    }

    const isFormDisabled = computed(() => {
        return (
            loading.value ||
            !credential.firstname.value ||
            !credential.lastname.value ||
            !credential.password.value ||
            credential.password.value.length <= 6 ||  // Password length must be greater than 6 characters
            passwordMismatch.value
        );
    });


    return { credential, register, loading, isFormDisabled, passwordMismatch, populateObj };
};

import { GATEWAY_ENDPOINT } from '../axios.config'
import { useUser } from '~/composables/auth/useUser'

const { user } = useUser()

export const auth_api = {
    $_register: (credential: any) => {
        const url = '/auth/signup'
        return GATEWAY_ENDPOINT.post(url, credential)
    },
    $_login: (credential: any) => {
        const url = '/auth/login'
        return GATEWAY_ENDPOINT.post(url, credential)
    },
    $_verify_user: (credential: any) => {
        const url = '/auth/verify'
        return GATEWAY_ENDPOINT.post(url, credential)
    },
    $_resend_verify_email: (credential: any) => {
        const url = '/auth/resend'
        return GATEWAY_ENDPOINT.post(url, credential)
    },
    $_verify_identity: (credential: any) => {
        const url = '/auth/verify-identity'
        return GATEWAY_ENDPOINT.post(url, credential)
    },
    $_forgot_password: (credential: any) => {
        const url = '/auth/reset-password-request'
        return GATEWAY_ENDPOINT.post(url, credential)
    },
    $_reset_password: (credential: any) => {
        const url = '/auth/reset-password'
        return GATEWAY_ENDPOINT.patch(url, credential)
    },
    $_change_password: (credential: any) => {
        const url = '/auth/change-password'
        return GATEWAY_ENDPOINT.patch(url, credential)
    },
    $_social_signin: (credential: any) => {
		const url = '/auth/social-signin'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_social_signup: (credential: any) => {
		const url = '/auth/signup'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
}

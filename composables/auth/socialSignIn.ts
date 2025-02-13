import { auth_api } from '@/api_factory/modules/auth'
import { useUser } from "@/composables/auth/useUser";
export const use_auth_social_signin = () => {
	const Router = useRouter()
	const credential = {
		idToken: ref(''),
        provider: ref(''),
        app: ref('')
	}

	const loading = ref(false)

	const social_signin = async () => {
		loading.value = true
		const res = (await auth_api.$_social_signin({
			idToken: credential.idToken.value,
            provider: credential.provider.value,
            app: credential.app.value
		})) as any

		loading.value = false
		if (res.type !== 'ERROR') {
			useUser().createUser(res.data);
			Router.push('/dashboard')
		}
	}

	const setAuthObject = (data: any) => {
      credential.app.value = data.app
	  credential.provider.value = data.provider
	  credential.idToken.value = data.idToken
	}

	return { credential, social_signin, loading, setAuthObject  }
}

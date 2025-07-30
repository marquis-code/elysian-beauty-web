import { transactions_api } from "@/api_factory/modules/transactions";
import { ref } from "vue";

export const useInitializeTransaction = () => {
	const loading = ref(false);

	const initializeTransaction = async (payload: {
		email: string;
		amount: string;
		subaccount: string;
	}) => {
		loading.value = true;
		try {
			const res = await transactions_api.$_initalize_transactions(payload) as any;
			return res;
		} finally {
			loading.value = false;
		}
	};

	return { initializeTransaction, loading };
};

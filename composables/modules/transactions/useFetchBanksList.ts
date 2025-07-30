import { transactions_api } from "@/api_factory/modules/transactions";
import { ref } from "vue";

export const useFetchBanksList = () => {
	const loading = ref(false);
	const banks = ref([]);

	const fetchBanksList = async () => {
		loading.value = true;
		try {
			const res = await transactions_api.$_fetch_banks_list() as any;
			banks.value = res?.data || [];
			return res;
		} finally {
			loading.value = false;
		}
	};

    onMounted(() => {
        fetchBanksList()
    })

	return { fetchBanksList, banks, loading };
};

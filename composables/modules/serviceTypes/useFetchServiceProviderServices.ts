import { serviceType_api } from "@/api_factory/modules/service-types";
import { ref } from "vue";

export const useFetchServiceProviderServices = () => {
    const loading = ref(false);
    const services = ref([]);
    const route = useRoute()

    const fetchServiceProviderServices = async () => {
        loading.value = true;
        const res = await serviceType_api.$_fetch_serviceProvider_services(route?.params?.id) as any;
        console.log(res?.data.data, 'services  heres')

        if (res.type !== "ERROR") {
            services.value = res?.data?.data?.serviceTypes;
        }

        loading.value = false;
    };

    onMounted(() => {
        fetchServiceProviderServices()
    })

    return { fetchServiceProviderServices, services, loading };
};

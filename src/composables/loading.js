//
import { ref } from "vue";
const isLoading = ref(false);

const useLoading = () => {
    const changeLoading = (status = false) => {
        if (status) isLoading.value = true;
        else isLoading.value = false;
    };

    return {
        isLoading,
        changeLoading,
    };
};

export default useLoading;

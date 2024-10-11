import { ref } from "vue";

let isError = ref(false);
let errorMessage = ref("");

const useHandleError = () => {
    const setError = (errorMessag = null, status = true) => {
        if (errorMessag && status) {
            isError.value = true;
            errorMessage.value = errorMessag;
            return;
        }

        isError.value = false;
    };

    return {
        isError,
        setError,
        errorMessage,
    };
};

export default useHandleError;

import {computed} from 'vue';

export default function useElementById(id) {
    return computed(() => document.getElementById(id));
}

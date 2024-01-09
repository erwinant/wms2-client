<template>
    <q-page padding>
        <Breadcrumb title="Variant List">
            <template #right>
                <div>
                    <q-btn color="primary" icon="add" label="Add Category" @click="add" />
                </div>
            </template>
        </Breadcrumb>

        <Filterbox :fields="initialFilter" @find="findFilter" />
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Variant Type',
        align: 'left',
        field: 'name',
        sortable: true,
    },
    {
        name: 'option',
        align: 'left',
        label: 'description',
        field: 'description',
    },
    {
        name: 'action',
        label: 'Action',
        field: 'action',
    },
];

const filterBox = [{ name: 'name', type: 'text', label: 'Name' }];

export default defineComponent({
    name: 'VariantPage',
    components: {
        Breadcrumb,
        Filterbox,
    },
    setup() {
        const mode = ref('add');
        const variants = ref([]);
        const variant = ref({});
        const variantOptions = ref([]);
        const addModal = ref(false);
        const initialFilter = reactive(filterBox);

        function add() {
            mode.value = 'add';
            addModal.value = true;
        }

        function findFilter() {
            //
        }

        return {
            mode,
            variants,
            variant,
            variantOptions,
            initialFilter,
            add,
            addModal,
            findFilter,
        };
    },
});
</script>

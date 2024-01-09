<template>
    <q-page padding>
        <Breadcrumb title="Batchs"> </Breadcrumb>

        <Filterbox :fields="initialFilter" @find="findFilter" />

        <q-table
            flat
            bordered
            class="rounded-md"
            table-header-class="text-subtitle1"
            :rows="rows"
            :columns="columns"
            :pagination="pagination"
            :loading="loading"
            @request="onRequest"
        />
    </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { date } from 'quasar';
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';
import ProductApi from 'src/api/product';

const columns = [
    {
        name: 'sku',
        required: true,
        label: 'SKU',
        align: 'left',
        field: 'sku',
        sortable: true,
    },
    {
        name: 'ean_no',
        required: true,
        label: 'EAN',
        align: 'left',
        field: 'ean',
        sortable: true,
    },
    {
        name: 'name',
        align: 'left',
        label: 'Name',
        field: 'name',
    },
    {
        name: 'brand',
        align: 'left',
        label: 'Brand',
        field: 'brand',
    },
    {
        name: 'expired_date',
        align: 'left',
        label: 'Expired Date',
        field: 'expired_date',
    },
    {
        name: 'location',
        align: 'left',
        label: 'Location',
        field: 'location',
    },
    {
        name: 'quantity',
        align: 'right',
        label: 'Quantity',
        field: 'quantity',
    },
];

const filterBox = [
    { name: 'sku', type: 'text', label: 'SKU', operator: 'equal' },
    { name: 'ean_no', type: 'text', label: 'EAN', operator: 'equal' },
    { name: 'location', type: 'text', label: 'Location', operator: 'equal' },
    {
        name: 'expired_date',
        type: 'daterange',
        label: 'Expired Date',
    },
];

export default defineComponent({
    name: 'StockLog',
    components: {
        Breadcrumb,
        Filterbox,
    },
    setup() {
        const rows = ref([]);
        const loading = ref(false);
        const pagination = ref({
            filter: {},
            sortBy: 'created_at',
            page: 1,
            rowsPerPage: 10,
            rowsNumber: 10,
        });
        const initialFilter = reactive(filterBox);

        function onRequest(props) {
            const { page, rowsPerPage, sortBy, descending } = props.pagination;
            getData(page, rowsPerPage, sortBy);
        }

        const findFilter = (e) => {
            pagination.value.filter = e;
            getData(1, pagination.value.rowsPerPage, 'created_at');
        };

        const getData = async (page, pageSize, sort) => {
            const filter = { ...pagination.value.filter };
            loading.value = true;
            const result = await Promise.all([
                ProductApi.getProducts({
                    params: {
                        filter: filter,
                        // sort: sort,
                        skip: (page - 1) * pageSize,
                        limit: pageSize,
                        dummy: Math.random(),
                    },
                }),
                ProductApi.countProducts({
                    params: { filter: filter },
                }),
            ]);
            loading.value = false;

            rows.value = result[0].data;
            pagination.value.rowsNumber = result[1].data;
            pagination.value.page = page;
            pagination.value.rowsPerPage = pageSize;
            pagination.value.sortBy = sort.replace('-', '');
            pagination.value.descending = sort.indexOf('-') > -1 ? true : false;
        };

        onMounted(() => {
            getData(1, 20, pagination.value.sortBy);
        });

        return {
            rows,
            columns,
            pagination,
            initialFilter,
            findFilter,
            loading,
            onRequest,
        };
    },
});
</script>

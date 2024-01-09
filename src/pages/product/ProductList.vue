<template>
    <q-page padding>
        <Breadcrumb title="Product List">
            <template #right>
                <div>
                    <q-btn
                        color="primary"
                        icon="add"
                        label="Add Product"
                        @click="$router.push({ name: 'new-product' })"
                    />
                </div>
            </template>
        </Breadcrumb>

        <Filterbox :fields="initialFilter" @find="findFilter" />

        <q-table
            flat
            bordered
            class="rounded-md"
            table-header-class="text-subtitle1"
            :rows="rows"
            :columns="columns"
            row-key="name"
            :pagination="pagination"
            :loading="loading"
            @request="onRequest"
        >
            <template v-slot:body-cell-action="props">
                <q-td :props="props">
                    <div class="row inline no-wrap q-gutter-xs">
                        <q-btn
                            flat
                            round
                            dense
                            color="secondary"
                            icon="edit"
                            @click="
                                $router.push({
                                    name: 'edit-product',
                                    params: { id: props.row._id },
                                })
                            "
                        />
                        <q-btn flat round dense color="negative" icon="delete" />
                    </div>
                </q-td>
            </template>
        </q-table>
    </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue';
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';
import ProductApi from 'src/api/product';

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Product Name',
        align: 'left',
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
    },
    { name: 'sku', align: 'left', label: 'SKU', field: 'sku', sortable: true },
    {
        name: 'ean_no',
        align: 'left',
        label: 'Ean',
        field: 'ean_no',
        sortable: true,
    },
    {
        name: 'brand',
        label: 'Brand',
        field: (row) => row.brand?.name,
        sortable: true,
    },
    { name: 'category', label: 'Category', field: 'category', sortable: true },
    {
        name: 'classification',
        label: 'Classification',
        field: 'classification',
        sortable: true,
    },
    {
        name: 'purchase_type',
        label: 'Purchase Type',
        field: 'purchase_type',
        sortable: true,
    },
    {
        name: 'action',
        label: 'Action',
        field: 'action',
    },
];

const filterBox = [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'sku', type: 'text', label: 'Sku', operator: 'equal' },
    { name: 'ean_no', type: 'text', label: 'Ean', operator: 'equal' },
    { name: 'brand.name', type: 'text', label: 'Brand' },
];

export default defineComponent({
    name: 'ProductList',
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
            columns,
            rows,
            pagination,
            initialFilter,
            findFilter,
            loading,
            onRequest,
        };
    },
});
</script>

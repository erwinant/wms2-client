<template>
    <q-page padding class="q-gutter-lg">
        <Breadcrumb title="Create Inbound Document"></Breadcrumb>

        <q-card class="my-card">
            <q-card-section class="text-h6"> Information </q-card-section>
            <q-card-section>
                <div class="row items-center q-gutter-md">
                    <div class="col">
                        <div class="q-gutter-md">
                            <q-input v-model="text" type="text" label="Tenant" outlined dense />
                            <q-input v-model="text" type="text" label="Suplier Name" outlined dense />
                            <q-input v-model="text" type="text" label="Origin" outlined dense />
                            <q-input v-model="text" type="text" label="Label" outlined dense />
                        </div>
                    </div>
                    <div class="col">
                        <div class="q-gutter-md">
                            <q-input v-model="text" type="text" label="Schedule Date" outlined dense />
                            <q-input v-model="text" type="text" label="Arrival Date" outlined dense />
                            <q-input v-model="text" type="text" label="Label" outlined dense />
                            <q-input v-model="text" type="text" label="Label" outlined dense />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-table title="Products" :rows="products" :columns="columns" row-key="product">
            <template v-slot:body-cell-action="props">
                <q-td :props="props">
                    <q-btn flat rounded color="negative" icon="cancel" @click="removeProduct(props.row._id)" />
                </q-td>
            </template>
        </q-table>

        <div class="row items-center justify-end">
            <q-btn color="primary" label="save" class="btn-fixed-width" @click="saveInbound" />
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import Breadcrumb from 'components/Breadcrumb.vue';

const columns = [
    {
        name: 'product',
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
        name: 'variant',
        align: 'left',
        label: 'Variant',
        field: 'variant',
    },
    {
        name: 'quantity',
        align: 'left',
        label: 'Quantity',
        field: 'qty_demand',
    },
    {
        name: 'quantity',
        align: 'right',
        label: 'Quantity',
        field: 'quantity',
    },
];

export default defineComponent({
    name: 'CreateEditInbound',
    components: {
        Breadcrumb,
    },
    setupp() {
        const products = ref([{ _id: 'asd' }]);

        /**
         * remove product from product list
         * @param {string} id
         */
        function removeProduct(id) {}

        /**
         * save inbound document
         */
        function saveInbound() {}

        return {
            products,
            columns,
            removeProduct,
            saveInbound,
        };
    },
});
</script>

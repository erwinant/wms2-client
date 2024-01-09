<template>
    <q-page padding>
        <Breadcrumb title="Brand List">
            <template #right>
                <div>
                    <q-btn color="primary" icon="add" label="Add Brand" @click="addBrand" />
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
            row-key="_id"
            :pagination="pagination"
            :loading="loading"
            @request="onRequest"
        >
            <template v-slot:body-cell-name="props">
                <q-td :props="props">
                    <div class="row inline items-center q-gutter-md">
                        <q-avatar rounded size="md">
                            <img :src="props.row.logo" />
                        </q-avatar>
                        <div>{{ props.row.name }}</div>
                    </div>
                </q-td>
            </template>
            <template v-slot:body-cell-action="props">
                <q-td :props="props">
                    <div class="row inline no-wrap q-gutter-xs">
                        <q-btn flat round dense color="secondary" icon="edit" @click="edit(props.row)" />
                        <q-btn flat round dense color="negative" icon="delete" />
                    </div>
                </q-td>
            </template>
        </q-table>

        <q-dialog v-model="addModal" persistent>
            <q-card style="width: 400px">
                <q-card-section class="row items-center">
                    <div class="text-subtitle1 text-uppercase text-weight-bold">Add Brand</div>
                    <q-space />
                    <q-btn flat round size="sm" color="secondary" icon="close" v-close-popup />
                </q-card-section>
                <q-separator />
                <form @submit.prevent="onSave" @reset.prevent="onReset">
                    <q-card-section>
                        <div class="q-gutter-md">
                            <div>
                                <q-input
                                    v-model="brand.name"
                                    ref="nameRef"
                                    type="text"
                                    label="Name"
                                    filled
                                    dense
                                    :rules="[(val) => !!val || 'Field is required']"
                                />
                            </div>
                            <div>
                                <q-file v-model="brand.logo" filled dense label="Logo">
                                    <template v-slot:prepend>
                                        <q-icon name="cloud_upload" />
                                    </template>
                                </q-file>
                            </div>
                            <div>
                                <q-input v-model="brand.description" type="textarea" label="Description" filled />
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn type="reset" flat label="Cancel" color="secondary" />
                        <q-btn type="submit" flat label="Save" color="primary" />
                    </q-card-actions>
                </form>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';
import ProductApi from 'src/api/product';

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Brand Name',
        align: 'left',
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
    },
    {
        name: 'description',
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
    name: 'BrandList',
    components: {
        Breadcrumb,
        Filterbox,
    },
    setup() {
        const $q = useQuasar();
        const mode = ref('add');
        const rows = ref([]);
        const loading = ref(false);
        const addModal = ref(false);
        const initialFilter = reactive(filterBox);
        const filter = ref({});
        const pagination = ref({
            sortBy: 'desc',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: 10,
        });

        const brand = ref({
            name: null,
            logo: null,
            description: null,
            address: 'test',
        });
        const nameRef = ref(null);

        function onRequest(props) {
            const { page, rowsPerPage, sortBy, descending } = props.pagination;
            getData(page, rowsPerPage, sortBy);
        }

        const findFilter = (e) => {
            filter.value = e;
            getData(1, pagination.value.rowsPerPage, 'created_at');
        };

        const getData = async (page, pageSize, sort) => {
            loading.value = true;
            const result = await Promise.all([
                ProductApi.getBrands({
                    params: {
                        filter: { ...filter.value },
                        // sort: sort,
                        skip: (page - 1) * pageSize,
                        limit: pageSize,
                        dummy: Math.random(),
                    },
                }),
                ProductApi.countBrands({
                    params: { filter: filter.value },
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
            getData(1, pagination.value.rowsPerPage, pagination.value.sortBy);
        });

        function addBrand() {
            mode.value = 'add';
            brand.value = {
                name: null,
                logo: null,
                description: null,
                address: 'test',
            };
            addModal.value = true;
        }

        function onReset() {
            brand.value = {
                name: null,
                logo: null,
                description: null,
                address: 'test',
            };
            nameRef.value.resetValidation();
            addModal.value = false;
        }

        async function onSave() {
            nameRef.value.validate();

            if (nameRef.value.hasError) {
                return $q.dialog({
                    title: 'Warning',
                    message: 'Something wrong on your form',
                });
            }

            const result = await ProductApi.createBrand({
                ...brand.value,
                logo: 'https://images.tokopedia.net/img/cache/215-square/GAnVPX/2021/3/13/825ad58b-a4d8-4823-a693-5dfb6df38767.png',
            });
            getData(1, pagination.value.rowsPerPage, 'created_at');
            addModal.value = false;
        }

        function edit(item) {
            mode.value = 'edit';
            brand.value = item;
            addModal.value = true;
        }

        return {
            columns,
            rows,
            pagination,
            filter,
            initialFilter,
            findFilter,
            loading,
            addModal,
            onRequest,
            addBrand,
            brand,
            nameRef,
            onSave,
            onReset,
            edit,
        };
    },
});
</script>

<template>
    <q-page padding>
        <Breadcrumb title="Category List">
            <template #right>
                <div>
                    <q-btn color="primary" icon="add" label="Add Category" @click="addCategory" />
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
                    <div class="text-subtitle1 text-uppercase text-weight-bold">
                        {{ mode === 'edit' ? 'edit' : 'add' }} Category
                    </div>
                    <q-space />
                    <q-btn flat round size="sm" color="secondary" icon="close" v-close-popup />
                </q-card-section>
                <q-separator />
                <form @submit.prevent="onSave" @reset.prevent="onReset">
                    <q-card-section>
                        <div class="q-gutter-md">
                            <div>
                                <q-input
                                    v-model="category.name"
                                    ref="nameRef"
                                    type="text"
                                    label="Name"
                                    filled
                                    dense
                                    :rules="[(val) => !!val || 'Field is required']"
                                />
                            </div>
                            <div>
                                <q-input v-model="category.description" type="textarea" label="Description" filled />
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
        label: 'Category',
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
    name: 'CategoryList',
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

        const category = ref({
            name: null,
            description: null,
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
                ProductApi.getCategories({
                    params: {
                        filter: { ...filter.value },
                        // sort: sort,
                        skip: (page - 1) * pageSize,
                        limit: pageSize,
                        dummy: Math.random(),
                    },
                }),
                ProductApi.countCategories({
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

        function addCategory() {
            mode.value = 'add';
            category.value = {
                name: null,
                description: null,
            };
            addModal.value = true;
        }

        function onReset() {
            category.value = {
                name: null,
                description: null,
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

            if (mode.value === 'edit') {
                await ProductApi.updateCategory(category.value._id, category.value);
            }
            if (mode.value === 'add') {
                const result = await ProductApi.createCategory({
                    ...category.value,
                });
            }
            getData(1, pagination.value.rowsPerPage, 'created_at');
            addModal.value = false;
        }

        function edit(item) {
            mode.value = 'edit';
            category.value = item;
            addModal.value = true;
        }

        return {
            mode,
            columns,
            rows,
            pagination,
            filter,
            initialFilter,
            findFilter,
            loading,
            category,
            addModal,
            onRequest,
            addCategory,
            nameRef,
            onSave,
            onReset,
            edit,
        };
    },
});
</script>

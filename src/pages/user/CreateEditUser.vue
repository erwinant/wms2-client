<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <q-page padding>
        <!-- content -->
        <q-card class="my-card">
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">General Information</div>
            </q-card-section>
            <q-separator />
            <GenericForm :fields="fields" @fire="fire" />
        </q-card>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';
import GenericForm from 'src/components/GenericForm.vue';

const fields = ref([
    {
        label: 'Username',
        name: 'username',
        type: 'text',
        mandatory: true,
    },
    {
        label: 'First Name',
        name: 'first_name',
        type: 'text',
        mandatory: true,
    },
    {
        label: 'Last Name',
        name: 'last_name',
        type: 'text',
        mandatory: true,
    },
    {
        label: 'Email',
        name: 'email',
        type: 'text',
        mandatory: true,
    },
    {
        label: 'Phone',
        name: 'phone',
        type: 'text',
        mandatory: true,
    },
    {
        label: 'Gender',
        name: 'gender',
        type: 'text',
        mandatory: true,
    },
    {
        label: 'Role',
        name: 'roles',
        type: 'text',
        mandatory: true,
    },
    {
        label: 'Warehouse Delegate',
        name: 'warehouse_delegate',
        type: 'text',
        mandatory: true,
    },
]);

const fire = () => {
    alert('a');
};
</script>
=

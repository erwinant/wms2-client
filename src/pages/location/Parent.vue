<template>
    <q-page padding>
        <Breadcrumb title="Parent Location">
            <template #right>
                <div>
                    <q-btn color="primary" icon="add" label="Add Warehouse" />
                </div>
            </template>
        </Breadcrumb>

        <q-card>
            <q-tabs class="text-grey" active-color="primary" indicator-color="primary" align="left" inline-label>
                <q-route-tab
                    name="zone"
                    label="Zones"
                    :to="{
                        name: 'zone-list',
                        params: { id: '64abb52c0703e959bc6881b3' },
                    }"
                    exact
                />
                <q-route-tab
                    name="aisle"
                    label="Aisles"
                    :to="{
                        name: 'aisle-list',
                        params: { id: '64abb52c0703e959bc6881b3' },
                    }"
                    exact
                />
                <q-route-tab
                    name="rack"
                    label="Racks"
                    :to="{
                        name: 'rack-list',
                        params: { id: '64abb52c0703e959bc6881b3' },
                    }"
                    exact
                />
                <q-route-tab
                    name="shelf"
                    label="Shelves"
                    :to="{
                        name: 'shelf-list',
                        params: { id: '64abb52c0703e959bc6881b3' },
                    }"
                    exact
                />
            </q-tabs>
            <q-separator />
            <router-view></router-view>
        </q-card>
    </q-page>
</template>

<script lang="ts">
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';
import LocationApi from 'src/api/location';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ParentLocation',
    components: {
        Breadcrumb,
        // Filterbox,
    },
    data() {
        return {
            selectedTab: 'zones',
        };
    },
});
</script>

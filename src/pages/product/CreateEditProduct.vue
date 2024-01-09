<template>
    <q-page padding class="q-gutter-lg">
        <div class="row items-center">
            <div class="text-h5 text-weight-medium q-mb-xs">Create Product</div>
            <q-space />
            <q-btn color="primary" class="col-2" label="Save" @click="save" />
        </div>

        <q-card class="my-card">
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">General Information</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="row items-start q-col-gutter-md">
                    <div class="col-6">
                        <div class="q-gutter-md">
                            <div>
                                <q-input v-model="text" type="text" label="Name" filled dense />
                            </div>
                            <div>
                                <q-select v-model="model" :options="options" label="Category" filled dense />
                            </div>
                            <div>
                                <q-select v-model="model" :options="options" label="Brand" filled dense />
                            </div>
                            <div>
                                <q-input v-model="text" type="textarea" label="Description" filled dense />
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="q-gutter-md">
                            <div>
                                <q-select v-model="model" :options="options" label="Product Type" filled dense />
                            </div>
                            <div>
                                <q-select v-model="model" :options="options" label="Purchase Type" filled dense />
                            </div>
                            <div>
                                <q-select v-model="model" :options="options" label="Classification" filled dense />
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card class="my-card">
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Detail & Size</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="row items-start q-col-gutter-md">
                    <div class="col-6">
                        <div class="q-gutter-md">
                            <div>
                                <q-select v-model="model" :options="options" label="Unit Measurement" filled dense />
                            </div>
                            <div>
                                <q-select v-model="model" :options="options" label="Rules" filled dense />
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="q-gutter-md">
                            <div>
                                <q-input v-model="text" type="text" label="Weight" suffix="gram" filled dense />
                            </div>
                            <div class="">
                                <div class="row items-center q-col-gutter-md">
                                    <div class="col-4">
                                        <q-input v-model="text" type="text" label="Length" suffix="cm" filled dense />
                                    </div>
                                    <div class="col-4">
                                        <q-input v-model="text" type="text" label="Widht" suffix="cm" filled dense />
                                    </div>
                                    <div class="col-4">
                                        <q-input v-model="text" type="text" label="Height" suffix="cm" filled dense />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-card class="my-card">
            <q-card-section>
                <div class="row items-center">
                    <div class="text-subtitle1 text-weight-bold">Variants</div>
                    <q-space />
                    <q-btn size="sm" unelevated="" color="primary" label="add" icon="add" @click="addVariant" />
                </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <q-card
                    v-for="(variant, i) in variants"
                    flat
                    bordered
                    :class="['my-card', { 'q-mb-md': i !== variants.length - 1 }]"
                    :key="i"
                >
                    <q-card-section>
                        <div>
                            <div class="row items-center">
                                <div class="text-grey-7 text-weight-bold q-mb-md">Information</div>
                                <q-space />
                                <q-btn flat round dense color="negative" icon="delete" @click="removeVariant(i)" />
                            </div>
                            <div class="row items-center q-col-gutter-md">
                                <div class="col-3">
                                    <q-input v-model="text" type="text" label="SKU" filled dense />
                                </div>
                                <div class="col-3">
                                    <q-input v-model="text" type="text" label="EAN" filled dense />
                                </div>
                                <div class="col-3">
                                    <q-input v-model="text" type="text" label="Best Price" filled dense />
                                </div>
                                <div class="col-3">
                                    <q-input v-model="text" type="text" label="Selling Price" filled dense />
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <div>
                            <div class="q-mb-md">
                                <div class="text-grey-7 text-weight-bold q-mb-sm">Images</div>
                                <div class="text-caption">
                                    Image format .jpg .jpeg .png and a scale size of 1:1 (For optimal images use at
                                    least size of 700x700 px).
                                </div>
                            </div>
                            <q-file filled bottom-slots v-model="model" label="Label" counter dense>
                                <template v-slot:prepend>
                                    <q-icon name="cloud_upload" @click.stop.prevent />
                                </template>
                                <template v-slot:append>
                                    <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                                </template>

                                <template v-slot:hint> Field hint </template>
                            </q-file>
                        </div>
                    </q-card-section>
                </q-card>
            </q-card-section>
        </q-card>

        <q-card class="my-card">
            <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Product Configuration</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div>
                    <q-toggle v-model="value" label="Batch no / Lot" />
                </div>
                <div>
                    <q-toggle v-model="value" label="Serial Number" />
                </div>
                <div>
                    <q-toggle v-model="value" label="Expired Date" />
                </div>
                <div>
                    <q-toggle v-model="value" label="Batch no / Lot" />
                </div>
            </q-card-section>
        </q-card>

        <q-card class="my-card" flat>
            <q-card-section>
                <div class="row items-center q-gutter-md justify-end">
                    <q-btn color="secondary" class="col-2" label="reset" @click="onClick" />
                    <q-btn color="primary" class="col-2" label="Save" @click="save" />
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: 'CreateEditProduct',

    setup() {
        const variants = ref([
            {
                sku: '',
                ean_no: '',
                best_price: '',
                selling_price: '',
            },
        ]);

        function addVariant() {
            variants.value.push({
                sku: '',
                ean_no: '',
                best_price: '',
                selling_price: '',
            });
        }

        function removeVariant(index) {
            variants.value.splice(index, 1);
        }

        function save() {
            //
        }

        return { variants, addVariant, removeVariant, save };
    },
});
</script>

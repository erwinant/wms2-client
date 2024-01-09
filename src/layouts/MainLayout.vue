<template>
    <q-layout view="lHh LpR lFf">
        <q-header bordered class="bg-white text-dark">
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

                <!-- <q-toolbar-title> My Warehouse </q-toolbar-title> -->
                <!-- <q-btn flat round icon="search" /> -->
                <q-space />
                <div class="q-gutter-md">
                    <q-btn round flat color="primary" icon="notifications_active">
                        <q-menu
                            :offset="[0, 10]"
                            max-height="350px"
                            transition-show="jump-down"
                            transition-hide="jump-up"
                        >
                            <q-list style="width: 200px">
                                <q-item v-for="i in 5" :key="i" clickable v-close-popup>
                                    <q-item-section>Notification {{ i }}</q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item clickable v-close-popup>
                                    <q-item-section>New incognito tab</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                    <q-btn round>
                        <q-avatar size="42px">
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                        </q-avatar>
                        <q-menu
                            class="rounded-lg"
                            style="width: 350px"
                            :offset="[0, 10]"
                            transition-show="jump-down"
                            transition-hide="jump-up"
                        >
                            <div class="column q-px-lg q-py-md">
                                <div class="text-h6 q-mb-md text-weight-medium">User Profile</div>
                                <div class="row items-center">
                                    <q-avatar size="72px" class="q-mr-md">
                                        <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                                    </q-avatar>
                                    <div class="col">
                                        <div class="text-subtitle1 text-weight-bold">
                                            {{ user.fullname }}
                                        </div>
                                        <div class="row items-center text-grey-8">
                                            <q-icon name="o_email" class="q-mr-sm" />
                                            <span>{{ user.email }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <q-list>
                                <q-item clickable v-ripple class="row items-center q-py-md q-px-lg">
                                    <div class="q-mr-md">
                                        <q-icon size="lg" color="primary" name="o_person" />
                                    </div>
                                    <div>
                                        <div class="text-subtitle1 text-weight-bold">My Profile</div>
                                        <div class="text-subtitle2 text-grey-8">Account Settings</div>
                                    </div>
                                </q-item>
                                <q-item clickable v-ripple class="row items-center q-py-md q-px-lg">
                                    <div class="q-mr-md">
                                        <q-icon size="lg" color="primary" name="o_dashboard" />
                                    </div>
                                    <div>
                                        <div class="text-subtitle1 text-weight-bold">My Tasks</div>
                                        <div class="text-subtitle2 text-grey-8">Account Settings</div>
                                    </div>
                                </q-item>
                            </q-list>

                            <div class="q-px-lg q-py-md">
                                <q-btn class="full-width" color="primary" label="Logout" @click="logout" />
                            </div>
                        </q-menu>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            side="left"
            bordered
            :mini="miniState"
            @click.capture="drawerClick"
            :width="299"
            :breakpoint="600"
        >
            <div :class="['q-px-lg q-py-sm']">
                <div
                    :class="[
                        'row items-center cursor-pointer',
                        { 'justify-between': !miniState },
                        { 'justify-center': miniState },
                    ]"
                >
                    <div v-if="!miniState" class="text-bold text-h6">WMS</div>
                    <q-btn
                        v-if="$q.screen.gt.xs"
                        flat
                        round
                        color="primary"
                        icon="double_arrow"
                        :class="{ 'rotate-180': !miniState }"
                        @click="miniState = !miniState"
                    />
                </div>
            </div>
            <q-list :class="[{ 'q-px-lg': !miniState }]">
                <MenuTree v-for="link in myMenu" :key="link.group_title" v-bind="link" />
            </q-list>

            <div v-if="!miniState" class="absolute-bottom q-pa-lg">
                <div class="flex items-center rounded-lg q-pa-md bg-deep-purple-11">
                    <div class="col flex items-center">
                        <q-avatar size="40px" class="q-mr-md">
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                        </q-avatar>

                        <div>
                            <div class="text-subtitle1 text-bold text-white">
                                {{ user.fullname }}
                            </div>
                        </div>
                    </div>

                    <q-btn flat round color="white" icon="power_settings_new" @click="logout" />
                </div>
            </div>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted } from 'vue';
import MenuTree from 'src/components/MenuTree.vue';
import { useAuthStore } from 'stores/auth';
import menus from 'src/config/menus.js';
import { useQuasar } from 'quasar';
export default defineComponent({
    name: 'MainLayout',

    components: {
        MenuTree,
    },

    setup() {
        const $q = useQuasar();
        const authStore = useAuthStore();

        const leftDrawerOpen = ref(false);
        const user = computed(() => authStore.user);
        const myMenu = reactive(menus);
        const miniState = ref(false);

        const logout = () => {
            authStore.logout();
        };

        return {
            myMenu,
            user,
            miniState,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            drawerClick(e) {
                if (miniState.value) {
                    miniState.value = false;
                    e.stopPropagation();
                }
            },
            logout,
        };
    },
});
</script>

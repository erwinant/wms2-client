<template>
    <q-page
        padding
        class="flex flex-center"
        style="
            background: rgb(96, 73, 232);
            background: linear-gradient(45deg, rgba(96, 73, 232, 1) 0%, rgba(227, 76, 243, 1) 100%);
        "
    >
        <q-card
            class="my-card"
            style="width: 1000px; max-width: 90vw; border-radius: 10px"
            :style="!$q.screen.lt.sm ? 'height: 600px' : ''"
        >
            <div class="full-height row items-center">
                <div
                    v-if="!$q.screen.lt.sm"
                    class="full-height col-6 flex flex-center"
                    style="
                        background: url('images/4002758.jpg');
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center;
                        border-radius: 10px;
                    "
                >
                    <div class="text-center text-h4 text-white">Meet My WMS</div>
                </div>
                <div class="col col-md-6 q-pa-xl">
                    <div class="text-subtitle1 text-grey-9">Hello!</div>
                    <div class="text-subtitle1 text-weight-bold text-deep-purple">Good Morning</div>

                    <div class="text-center text-grey-9 text-weight-bold text-subtitle1 q-py-lg">
                        Login Your Account
                    </div>

                    <q-form @submit.prevent="login" class="q-gutter-md">
                        <div>
                            <q-input
                                :disable="isProcessing"
                                v-model="username"
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                        <div>
                            <q-input
                                :disable="isProcessing"
                                v-model="password"
                                color="deep-purple"
                                type="text"
                                placeholder="Password"
                            />
                        </div>
                        <div class="flex justify-end">
                            <router-link to="#" class="text-grey text-bold" style="text-decoration: none"
                                >Forgot Password?</router-link
                            >
                        </div>
                        <div>
                            <q-btn
                                :disable="isProcessing"
                                label="Login"
                                class="full-width"
                                type="submit"
                                color="primary"
                            />
                        </div>
                    </q-form>
                </div>
            </div>
        </q-card>
    </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

export default {
    name: 'LoginPage',
    setup() {
        const username = ref('tony_stark');
        const password = ref('Sunter123');
        const isProcessing = ref(false);

        const authStore = useAuthStore();
        const router = useRouter();

        const login = async () => {
            try {
                isProcessing.value = true;
                const result = await authStore.login({
                    username: username.value,
                    password: password.value,
                });
                router.push({ name: 'home' });

                Notify.create({
                    position: 'top',
                    type: 'positive',
                    message: 'Successfully logged in',
                });
                isProcessing.value = false;
            } catch (error) {
                isProcessing.value = false;
                Notify.create({
                    position: 'top',
                    type: 'negative',
                    message: error,
                });
            }

            return;
        };

        onMounted(() => {
            console.log(process.env.NODE_ENV, process.env.WMS_API_URL, process.env.TIKTOK_AUTH_URL);
        });

        return { username, password, login, isProcessing };
    },
};
</script>

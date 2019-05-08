<template>
    <div class="home">
        <img @click="openDialog" alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <p @click="changeUserInfo(233)">
            vuex示例：
            {{getUserInfo}}
        </p>
        <p @click="handleUrl">
            iconfont:
            <i class="iconfont icon-weibo"></i>
        </p>
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut">
            <div v-if="show">
                <p>
                    vue过滤器：<br/>
                    时间戳：{{1544179366 | timeFilter}}<br/>
                    手机格式化：{{15311959057 | formatPhone}}<br/>
                    银行卡格式化：{{123123123123132 | formatBank}}<br/>
                    千分位分隔符：{{5000039 | toThousands}}
                </p>
                <p>
                    反向代理：
                    {{rank.ok?'成功':'失败'}}
                </p>
            </div>
        </transition>
        <div>
            补间动画：{{num | formatFloat}}
        </div>
        <p>
            浮点数运算：
            0.1+0.2={{number | formatFloat(2)}}
        </p>
        <p @click="handleToast">
            Toast插件
        </p>
        <Dialog :isVisible="isVisible" :showMask="true" @close="closeDialog">
            <div>
                123
            </div>
        </Dialog>
    </div>
</template>

<script>
    import HelloWorld from "@/components/HelloWorld";
    import Dialog from "@/components/Dialog";
    import {mapState, mapMutations, mapActions, mapGetters} from "vuex";
    import env from "@/config/env";
    import {getUserInfo} from "@/api/common";
    import NP from 'number-precision'

    export default {
        name: "home",
        components: {
            HelloWorld,
            Dialog
        },
        data() {
            return {
                showDialog: false,
                show: false,
                num: 0,
                isVisible: false,
                counting: false
            }
        },
        computed: {
            ...mapState("user", ["userInfo", "rank"]),
            ...mapGetters("user", ["getUserInfo"]),
            number() {
                return NP.plus(0.1, 0.2)
            }
        },
        mounted() {
            this.getRank();
            setTimeout(() => {
                this.show = true;
            }, 1000)
        },
        methods: {
            ...mapActions("user", ["changeUserInfo", "getRank"]),
            openDialog() {
                this.isVisible = true;
            },
            closeDialog() {
                this.isVisible = false;
            },
            handleToast() {
                this.$toast('Hello Vue Plugin', 'success')
            },
            // 用于清空hash路由中间卡着的不必要的信息，如：/?sdfdsf#/
            handleUrl() {
                history.pushState({}, null, location.href.replace(/\/\?(.*?)\#\//, '/#/'));
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/iconfont/iconfont.css";

    .home {
        display: flex;
        flex-flow: column;
        align-items: center;
        text-align: center;
        line-height: 1.2;
    }

    .dialog-content {
        width: 300px;
        height: 180px;
        background-color: #fff;
    }
</style>

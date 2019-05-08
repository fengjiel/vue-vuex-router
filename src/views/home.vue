<template>
    <div class="home">
        <p @click="changeUserInfo(233)">
            vuex示例：
            {{getUserInfo}}
        </p>
        <p @click="openDialog">
            iconfont:
            <i class="iconfont icon-weibo"></i>
        </p>
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut">
            <div v-if="show">
                <p>

                </p>
                <p>
                    反向代理：
                    {{rank.ok?'成功':'失败'}}
                </p>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions, mapGetters} from "vuex";
    import env from "@/config/env";
    import {getUserInfo} from "@/api/common";
    import animate from 'animate.css';
    import NP from 'number-precision'

    export default {
        name: "home",
        components: { },
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
            // vue结合animate.css实现动画示例
            setTimeout(() => {
                this.show = true;
            }, 1000)
        },
        methods: {
            ...mapActions("user", ["changeUserInfo", "getRank"]),
            handleLang() {
                this.$i18n.locale = this.$i18n.locale === 'zh-CN' ? 'en-US' : 'zh-CN';
            },
            handleDialog() {
				this.showDialog = true;
			},
			handleI18n() {
				this.$i18n.locale = this.$i18n.locale === "en-US" ? "zh-CN" : "en-US";
			},
            openDialog() {
                this.isVisible = true;
            },
            closeDialog() {
                this.isVisible = false;
            },
            startCountdown: function () {
                this.counting = true;
            },
            handleCountdownEnd: function () {
                this.counting = false;
            },
            // 用于清空hash路由中间卡着的不必要的信息，如：/?sdfdsf#/
            handleUrl() {
                history.pushState({}, null, location.href.replace(/\/\?(.*?)\#\//, '/#/'));
            }
        }
    };
</script>

<style lang="scss" scoped>
    .home {
        display: flex;
        flex-flow: column;
        justify-content: center;
        font-size: 14px;
        text-align: center;
        line-height: 1.2;
		p {
			margin: 20px auto;
		}
		.swiper {
			width: 100%;
			height: 200px; /*no*/
			.swiper-item {
				height: 200px; /*no*/
				line-height: 200px; /*no*/
			}
		}
		.border {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100px;
			height: 200px;
			margin: 20px auto;
			position: relative;
			@include border();
		}
	}
    .dialog-content {
        width: 300px;
        height: 180px;
        background-color: #fff;
    }
</style>

<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="aside-container" :default-active="$route.path" router
        text-color="#fff" :collapse="isCollapse" :collapse-transition="false">
        <p class="logo">{{ isCollapse ? 'W' : 'W陪诊' }}</p>
        <menu-tree :menuData="menuData" :isCollapse="isCollapse" />
    </el-menu>
</template>

<script  setup>
import MenuTree from './MenuTree.vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useMenuStore } from '@/stores'

const router = useRouter()
const menuData = router.options.routes[0].children
const menuStore = useMenuStore()
const isCollapse = computed(() => menuStore.menuIsCollapse)
</script>

<style lang="scss" scoped>
.aside-container {
    height: 100vh;
    width: 200px;
    transition: width 1s; // 添加平滑过渡效果
    &.el-menu--collapse {
        width: 64px; // 收起时宽度
    }
    .logo {
        font-size: 24px;
        color: #fff;
        text-align: center;
        height: 60px;
        line-height: 60px;
    }
}
</style>
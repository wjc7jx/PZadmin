<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="auto">
                <!-- 通过设置auto清除默认样式，使得宽度为Aside组件的宽度 -->
                <Aside />
            </el-aside>
            <el-container>
                <el-header ><Header /></el-header>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Aside from '@/components/layout/Aside.vue'
import Header from '@/components/layout/Header.vue'

</script>
<style lang="scss" scoped>
.common-layout{
    height: 100%;
}</style>
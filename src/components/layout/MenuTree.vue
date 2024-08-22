<template>
    <div>
        <!-- 遍历菜单数据，构建菜单结构 -->
        <template v-for="(item, index) in props.menuData" :key="index">
            <!-- 对于没有子菜单的菜单项，使用菜单项组件展示 -->
            <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.meta.path"
                @click="handleClickMenu(item)">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <!-- 根据侧边栏收缩状态决定是否显示菜单文字 -->
                <span>{{ isCollapse ? '' : item.meta.name }}</span>
            </el-menu-item>
            <!-- 对于有子菜单的菜单项，使用子菜单组件展示 -->
            <el-sub-menu v-else :index="item.path">
                <template #title>
                    <el-icon size="20">
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <!-- 根据侧边栏收缩状态决定是否显示菜单文字 -->
                    <span>{{ isCollapse ? '' : item.meta.name }}</span>
                </template>
                <!-- 递归渲染子菜单 -->
                <menu-tree :menuData="item.children" :isCollapse="isCollapse" />
            </el-sub-menu>
        </template>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores'

// 定义组件属性，接收菜单数据和侧边栏收缩状态
const props = defineProps(['menuData', 'isCollapse'])

// 使用vue-router的useRouter钩子获取路由器实例
const router = useRouter()
// 使用pinia的useMenuStore钩子获取菜单状态管理实例
const MenuStore = useMenuStore()

/**
 * 处理菜单点击事件
 * @param {Object} item - 被点击的菜单项数据
 */
const handleClickMenu = (item) => {
    // 触发设置标签列表动作，传递菜单元数据
    MenuStore.setTagList(item.meta)
}
</script>
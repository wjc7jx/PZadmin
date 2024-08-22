<template>
    <div>
        <template v-for="(item, index) in props.menuData" :key="index">
            <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.meta.path"
                @click="handleClickMenu(item)">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ isCollapse ? '' : item.meta.name }}</span>
            </el-menu-item>
            <el-sub-menu v-else :index="item.path">
                <template #title>
                    <el-icon size="20">
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ isCollapse ? '' : item.meta.name }}</span>
                </template>
                <menu-tree :menuData="item.children" :isCollapse="isCollapse" />
            </el-sub-menu>
        </template>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores'

const props = defineProps(['menuData', 'isCollapse'])

const router = useRouter()
const MenuStore = useMenuStore()

const handleClickMenu = (item) => {
    MenuStore.setTagList(item.meta)
}
</script>

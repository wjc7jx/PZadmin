import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu',
    () => {
        // 菜单是否折叠
        const menuIsCollapse = ref(false)
        // 设置菜单是否折叠
        const setMenuIsCollapse = (newMenuIsCollapse) => {
            menuIsCollapse.value = newMenuIsCollapse
        }
        // tag
        const tagList = ref([])
        const setTagList = (newTagList) => {
            // 检测newTagList是否已经在tagList中
            if(!tagList.value.some(item => item.path === newTagList.path)){
                tagList.value.push(newTagList)
            }
        }
        const closeTag = (tag) => {
            tagList.value = tagList.value.filter(item => item.path !== tag.path)
        }
        return { menuIsCollapse, setMenuIsCollapse, tagList, setTagList,closeTag, }
    },
    { persist: true }
)

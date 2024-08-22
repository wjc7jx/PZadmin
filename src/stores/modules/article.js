import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getArticleChannelListService, deleteArticleService, getArticleListService} from '@/api/article'

export const useArticleStore = defineStore('article',() => {
    // 下面是文章分类的内容
    const articleChannelList = ref([])
    const getArticleChannelList = async () => {
        const res = await getArticleChannelListService()
        articleChannelList.value = res.data.data
    }
    const deleteArticleChannel = async (id) => {await deleteArticleService(id)}
// 下面是文章内容
    const articleList = ref([])
    const total= ref(0)
    const getArticleList = async (params) => {
        const res = await getArticleListService(params)
        articleList.value = res.data.data
        total.value = res.data.total
    }
    return { articleChannelList, getArticleChannelList, deleteArticleChannel,articleList,total,getArticleList}
},
{ persist: true }
)
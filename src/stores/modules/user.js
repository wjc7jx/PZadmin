import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoService } from '@/api/user'

export const useUserStore = defineStore('big-user',
    () => {
        const token = ref('')
        const setToken = (newToken) => {
            token.value = newToken
        }
        const clearToken = () => {
            token.value = ''
        }
        // 用户的基本信息
        const user = ref({
            id: '',
            username: '',
            nickname: '',
            email: '',
            user_pic: ''
        })
        const getUser = async () => {
            const res = await getUserInfoService() // 请求获取数据
            user.value = res.data.data
        }
        const clearUser = () => {
            user.value = {}
        }

        return { token, setToken, clearToken, getUser, clearUser, user, }
    },
    { persist: true }
)
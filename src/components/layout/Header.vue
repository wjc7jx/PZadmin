<template>
    <div class="header-container">
        <div class="header-left">
            <!-- 菜单折叠按钮 -->
            <el-icon class="icon-menu" size="25" @click="handleMenu">
                <Fold />
            </el-icon>
            <!-- 标签页 -->
            <ul class="tags">
                <li v-for="tag in menuStore.tagList" :key="tag.path" class="tag"
                    :class="{ 'is-active': tag.path === route.path }" @click="handleClick(tag)"
                >
                    <el-icon>
                        <component :is="tag.icon"></component>
                    </el-icon>
                    <span>{{ tag.name }}</span>
                    <span class="close-icon" @click.stop="closeTab(tag,index)">×</span>
                </li>
            </ul>
        </div>
        <div class="header-right">
            <!-- 下拉框 -->
            <el-dropdown trigger="click">
                <div class="el-dropdown-link">
                    <el-avatar class="avatar" :size="40" src="path-to-user-avatar.jpg"></el-avatar>
                    <p class="user-name">admin</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { useMenuStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
// 菜单折叠
const handleMenu = () => {
    menuStore.setMenuIsCollapse(!menuStore.menuIsCollapse)
}
// 点击tag
const handleClick = (item) => {
        router.push(item.path)
}
// 关闭tag
const closeTab = (tag, index) => {
    const tagIndex = menuStore.tagList.findIndex(item => item.path === tag.path);    // 获取tag在tagList中的索引
    console.log(tagIndex);
    // 删除tag
    menuStore.closeTag(tag);
    // 判断tag是否是当前页面的标签
    if (route.path !== tag.path) {
        // 如果不是当前页面的标签，则不进行跳转
        return;
    }
    // 判断tagList中标签的数量
    if (menuStore.tagList.length === 0) {
        // 如果只有一个标签，则跳转到根目录
        router.push('/dashboard');
    } else {
        // 如果标签数量大于一个，则根据tag在tagList中的位置决定跳转
        if (tagIndex === menuStore.tagList.length ) {
            // 如果tag是列表中的最后一个，则跳转到前一个
            router.push({
                path: menuStore.tagList[tagIndex - 1].path
            });
        } else {
            // 如果tag不是列表中的最后一个，则跳转到下一个
            router.push({
                path: menuStore.tagList[tagIndex].path
            });
        }
    }
};

</script>

<style lang="scss" scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #fff; // 使用央视常用的白色背景
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 添加轻微的阴影效果

    .header-left {
        display: flex;
        align-items: center;

        .icon-menu {
            height: 100%;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;

            &:hover {
                background-color: #e6e6e6;
                color: #c81623;
            }
        }

        .tags {
            margin-left: 10px;
            list-style: none; // 移除默认的列表样式
            padding: 0; // 移除默认的内边距
            display: flex;
            flex-wrap: wrap;

            .tag {
                margin: 0 5px 5px 0;
                padding: 0 10px;
                height: 32px; // 设置 tag 的高度
                line-height: 32px; // 设置行高以垂直居中文字
                display: flex;
                align-items: center;
                cursor: pointer;
                background-color: #f4f4f5; // 设置背景颜色
                border: 1px solid #dcdfe6; // 设置边框
                border-radius: 4px; // 设置圆角

                .el-icon {
                    margin-right: 5px;
                    font-size: 16px;
                }

                span {
                    font-size: 14px;
                }

                .close-icon {
                    margin-left: 5px;
                    cursor: pointer;
                }

                &:hover {
                    opacity: 0.8;
                }

                &.is-active {
                    background-color: #409eff;
                    color: #fff;
                    border-color: #409eff;
                }
            }

        }
    }

    .header-right {
        .el-dropdown-link {
            display: flex;
            align-items: center;
            padding: 0 20px;
            cursor: pointer;

            .avatar {
                margin-right: 10px; // 头像右侧外边距
            }

            .user-name {
                color: #333; // 用户名字体颜色
                margin: 0; // 重置段落边距
            }
        }

        .el-dropdown-menu {
            background-color: #fff; // 下拉菜单背景颜色
            border: 1px solid #dcdfe6; // 下拉菜单边框
        }

        .el-dropdown-item {
            color: #606266; // 下拉菜单项字体颜色

            &:hover {
                background-color: #ecf5ff; // 鼠标悬停时下拉菜单项背景颜色
                color: #409eff; // 鼠标悬停时下拉菜单项字体颜色
            }
        }
    }
}
</style>

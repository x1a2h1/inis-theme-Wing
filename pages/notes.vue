<script setup lang="ts">

import {reactive} from "vue";

const state = reactive({
  articles:[
    {
      "abstract": "",
      "audit": 1,
      "content": "<p>我花了比你多无数倍的时间，每天学到吐，你们却说是天赋。</p>\n<p>我在学习，你在追剧，我在学习，你在玩游戏。</p>\n<p>你又凭什么觉得我和你是同一类人？我很喜欢哈利波特里面的这句台词。</p>\n<p>让我们成为哪种人的不是我们的能力，而是我们的选择。</p>\n<p>你不甘于此的话，一定要狠下心来努力，变成一个很厉害的人，厉害到有一天可以随时离开那些让你不舒服的圈子和人。</p>\n<p>基础不好，就从头开始拼命学；时间不够，就去挤时间早起加熬夜；效率不高，就放下手机放下干扰你的东西。</p>\n<p>哪有什么天赋异禀，谁还不是边哭边熬，熬得住就出众，熬不住就出局，只有咬牙死犟才能乘风破浪。</p>",
      "covers": "",
      "create_time": 1697013714,
      "delete_time": 0,
      "editor": "tinymce",
      "group": "",
      "id": 4,
      "json": {
        "comment": {
          "allow": 0,
          "show": 0
        }
      },
      "last_update": 0,
      "remark": "",
      "result": {
        "author": {
          "avatar": "https://q1.qlogo.cn/g?b=qq&nk=97783391&s=100",
          "description": "这个人很懒，什么都没有留下！",
          "id": 2,
          "nickname": "兔子",
          "result": {
            "auth": {
              "all": true,
              "group": {
                "ids": [
                  1
                ],
                "list": [
                  {
                    "id": 1,
                    "key": "admin",
                    "name": "超级管理员",
                    "pages": "all",
                    "root": 1,
                    "rules": "all"
                  }
                ]
              },
              "pages": {
                "hash": [
                  "all"
                ]
              },
              "rules": {
                "hash": [
                  "all"
                ]
              }
            },
            "level": {
              "current": {
                "description": "在某个领域拥有一定学习经验和专业知识的人",
                "exp": 6000,
                "json": null,
                "name": "专家",
                "text": null,
                "value": 3
              },
              "next": {
                "description": "对某个领域拥有广泛学识和深度见解的人",
                "exp": 10000,
                "json": null,
                "name": "领袖",
                "text": null,
                "value": 4
              }
            }
          },
          "title": "专属"
        },
        "collect": [],
        "comment": {
          "allow": 1,
          "count": 0,
          "show": 1
        },
        "group": null,
        "like": [],
        "share": [],
        "tags": null
      },
      "tags": "",
      "text": "",
      "title": "天赋异禀？",
      "top": 0,
      "uid": 2,
      "update_time": 1697013714,
      "views": 153
    },
  ]
})
</script>

<template>
  <div class="article-list">
    <article v-if="state.articles.length != 0" class="article-item" itemscope="itemscope" itemtype="http://schema.org/Article">
      <a href="#" class="article-mask" title="标题">
        <div class="article-thumbnail" style="background-image: url('https://storage.unti.cn/inis/2023-10/25/1698234862862.jpg');"></div>
        <div class="article-thumbnail">
          <main class="article-body">
            <p class="text-tiny text-gray" itemprop="about">
              <span class="d-block text-center mt-2" style="font-size: 3rem;">
                <i class="dashicons dashicons-privacy d-block"></i>
              </span>
            </p>
          </main>
        </div>
        <header class="article-header">
          <h2 class="article-title h5 text-dark text-ellipsis" itemprop="headline">
          </h2>
          <div class="article-subtitle text-gray">
            <ul class="d-flex text-tiny text-gray reset-ul">
              <li class="time">
                <i class="czs-time"></i>
                <time datetime="" itemprop="datePublished"
                      pubdate>时间</time>
              </li>
              <li class="comments">
                <i class="czs-comment"></i>
              </li>
              <li class="likes">
                <i class="czs-heart"></i>
              </li>
            </ul>
          </div>
        </header>
      </a>
      <meta itemprop="author" content="显示名字">
      <meta itemprop="publisher" content="夏至">
      <meta itemprop="datePublished" content="123123123">
      <meta itemprop="dateModified" content="rter">
      <meta itemprop="image" content="12312">
    </article>

    <article v-if="state.articles.length != 0" class="meta flex-center w-100" style="padding: 20% 0;flex-direction: column;">
      <h1>404</h1>
      <p>该页面没有您要查找的内容。</p>
    </article>
  </div>
</template>

<style scoped>

</style>
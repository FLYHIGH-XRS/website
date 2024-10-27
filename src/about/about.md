---
title: 关于我们
---

# 关于我们

FLYHIGH XRS建立于2023年1月，专注于为玩家提供更好的游玩新体验。  

## 成员

<VPTeamMembers size="small" :members="members" />

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

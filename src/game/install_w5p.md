---
title: 游戏安装 [W5P]
---

# 游戏安装 [W5P]

::: danger 警告
本安装教程仅提供给内测用户使用。  
若您不是内测用户，您就算安装了游戏，也无法进行开卡等操作。  
甚至，您无法联网。因为必要的文件将不会在本教程中出现。  
:::

## 1. 本体 & 设置包下载

::: info 下载链接
- 游戏本体：[下载站](https://files.kksk03.fun/Xenon/Game%20Archive/W5P/W5P10JPN05.7z)  
- 解压软件：[Bandizip](https://www.bandisoft.com/bandizip/) <== 可下可不下，教程使用Bandizip进行解压  
- 设置包：请前往 ==> **测试QQ群** ==> 群文件 ==> W5P游戏设置包 中下载  
    （文件夹内只有一个压缩文件，下载即可）
:::

## 2. 解压游戏本体与设置包

::: tip 首先要做的事情
在您认为合适的地方，新建一个 `W5P` 名称的文件夹（**建议直接在盘的根目录下新建**，如果要在其他地方新建，那么**请保证整个路径不会有中文**）  
:::

#### 2.1 解压游戏本体

1. 打开从已经下载好的游戏本体（压缩包，名为 `W5P10JPN05.7z` ）  
2. 打开该压缩包，将 `W5P10JPN05` 文件夹拖放至 `W5P` 文件夹内  
    （有可能一打开压缩包是直接进入到了里面的文件夹，请点击最顶上的三个点的选项，回到上一级即可看到 `W5P10JPN05` 文件夹）  

![2.1-1](https://pics-a1c.pages.dev/ng_web/game/install_w5p/2.1-1.png)  

![2.1-2](https://pics-a1c.pages.dev/ng_web/game/install_w5p/2.1-2.png)  

3. 等待解压完毕即可进行下一步操作  

#### 2.2 解压设置包

1. 打开从QQ群内已经下载好的设置包（通常名为 `[这里是日期] W5P-Setup.7z` ）  
2. 打开该压缩包，将里面的文件与文件夹全部拖放到 `W5P` 文件夹内即可  

![2.2-1](https://pics-a1c.pages.dev/ng_web/game/install_w5p/2.2-1.png)  

3. 等待解压完毕即可进行下一步操作  

## 3. 配置游戏运行环境

::: tip 前提
在进行本步骤之前，请确保您已按照**解压游戏本体与设置包**步骤教程所示执行  
然后，请您打开 `W5P` 文件夹。您应当看到如图所示的文件和目录（示例）  

![3.1-1](https://pics-a1c.pages.dev/ng_web/game/install_w5p/3.1-1.png)  

然后，请您打开里面的 `运行库` 文件夹，并进行下一步操作  
:::

#### 3.1 修复基础环境

1. 打开 `DirectX_Repair(Enhanced_Edition)` 文件夹，并打开 `DirectX Repair.exe` 程序  
    （**此处若需要授予管理员权限，请授予**）  
2. 点击 `检测并修复` ，等待进程跑完即可  

#### 3.2 安装Runtime

1. 打开 `Runtime` 文件夹，将里面的 `Windows` 文件夹 & `REG.bat` 文件复制到**C盘（系统盘）根目录**  
    （若提示是否覆盖，请选择是）  
2. 前往C盘根目录，**使用管理员方式**打开 `REG.bat` 文件，打开后将闪过几个CMD窗口，则为安装完毕  

#### 3.3 安装Node.js

::: tip 提示
如果您已经安装过Node.js了（比如，您是程序员的话，那安装过这个是理所应当的）  
那这一步则可以跳过  
:::

1. 在 `运行库` 文件夹中，您可以找到有两个安装程序： `node-v13.14.0-x64.msi` 和 `node-v16.16.0-x64.msi`  
2. 请根据您的系统版本进行选择：  
    - Windows 7 ==> `node-v13.14.0-x64.msi`  
    - Windows 8/8.1/10/11 ==> `node-v16.16.0-x64.msi`  
3. 打开对应的安装程序，*一路点击Next安装即可*  
> 提示：不建议您在安装过程中进行更改路径等操作。除非，您非常熟悉Node.js  
4. 安装完毕即可进入下一步操作  

## 4. 配置虚拟终端机

在 `W5p` 文件夹内，找到 `[MaxiTerminal] 启动终端机模拟器`  
双击启动即可。启动后应与本图基本一致（大概相似即可）  

![4.1-1](https://pics-a1c.pages.dev/ng_web/game/install_w5p/4.1-1.png)  

## 5. 配置鹦鹉模拟器

1. 在 `W5P` 文件夹内，找到 `[TPUI] 启动鹦鹉模拟器` ，双击打开  
2. 点击游戏设置  

![5.1-1](https://pics-a1c.pages.dev/ng_web/game/install_w5p/5.1-1.png)  

3. 对照下图，填写您的游戏信息  
::: tip 提示
如果您不知道您的网卡的IPv4地址，请在群文件的 `工具` 文件夹里面，下载 `获取当前网络地址.exe`  
双击打开就可以知道您当前的网卡的IPv4地址了  

![6.1-2](https://pics-a1c.pages.dev/ng_web/game/install/6.1-2.png)  

如果这个方法不行，那建议您参考以下文献：[CSDN](https://blog.csdn.net/m0_73514785/article/details/136064059)  
:::

![5.1-3](https://pics-a1c.pages.dev/ng_web/game/install_w5p/5.1-3.png)  

4. 点击控制设置  

![5.1-4](https://pics-a1c.pages.dev/ng_web/game/install_w5p/5.1-4.png)  

5. 对照以下提供表格解释，**自行输入您想要的按键**即可  

| **在软件内的显示**               | **功能说明**                         | **是否必须设置？**    |
|:-------------------------:|:--------------------------------:|:--------------:|
| Test                      | 机修菜单按钮                           | 是              |
| Service                   | 服务按钮                             | 否              |
| Coin                      | 投币按钮                             | 是              |
| Wheel Axis                | 转向（任一方向均可）<br>如果您打开了键盘转向，则这一项不存在 | 是              |
| Wheel Axis Left           | 转向（左）<br>仅限键盘转向时使用               | 是              |
| Wheel Axis Right          | 转向（右）<br>仅限键盘转向时使用               | 是              |
| Gas                       | 油门                               | 是              |
| Brake                     | 刹车                               | 是              |
| Test Menu Up              | 机修菜单 向上移动选项                      | 是              |
| Test Menu Down            | 机修菜单 向下移动选项                      | 是              |
| Enter Switch              | 机修菜单 选择进入键<br>（用于进入机修选项使用）       | 是              |
| Gear Shift 1              | 档位1                              | 否              |
| Gear Shift 2              | 档位2                              | 否              |
| Gear Shift 3              | 档位3<br>（需要用到这个档位进行名字输入上下移动）      | 否<br>（建议设置）    |
| Gear Shift 4              | 档位4<br>（需要用到这个档位进行名字输入上下移动）      | 否<br>（建议设置）    |
| Gear Shift 5              | 档位5                              | 否              |
| Gear Shift 6              | 档位6                              | 否              |
| Gear Shift Up             | 升档                               | 是<br>（除非你不玩手动） |
| Gear Shift Down           | 降档                               | 是<br>（除非你不玩手动） |
| Perspective Switch Button | 视角切换按钮                           | 是              |
| Interuption Switch Button | 闯入切换按钮                           | 是              |

填写完成后，**保存即可**  

## 6. 启动游戏

每次启动游戏都需要走以下步骤：  
1. 启动虚拟终端机  

![6.1-1](https://pics-a1c.pages.dev/ng_web/game/install_w5p/6.1-1.png)  

2. 使用TPUI模拟器启动游戏  

![6.1-2](https://pics-a1c.pages.dev/ng_web/game/install_w5p/6.1-2.png)  

![6.1-3](https://pics-a1c.pages.dev/ng_web/game/install_w5p/6.1-3.png)  

## 7. 新卡发行

::: danger 警告
非内测玩家是无法申请新卡的。  
:::

请直接寻找服主进行该方面的咨询。  
---
title: V2.4.1
published_at: 2025-10-10 08:00:00
---

## 2.4.1

# 新功能

知识库
您现在可以通过选择一个目录一次性导入多个文件。

助手工具
引入了内置的查询知识库工具，使助手在完成任务时可以搜索相关知识库。

控制中心小组件（iOS 18 及以上）
新增了 ControlWidget，允许您将按钮和切换控件添加到控制中心，并分配脚本来处理其逻辑。

自定义键盘
新增 CustomKeyboard API，用于创建和展示自定义键盘界面、处理输入事件，并以编程方式插入文本。

蓝牙 API
引入了 BluetoothCentralManager 和 BluetoothPeripheralManager API。可构建完整的蓝牙交互体验，包括扫描、连接、读写 GATT 特征、订阅通知、广播以及提供自定义服务/特征。

新增 layoutPriority 视图修饰符
新增对 layoutPriority 视图修饰符的支持，使开发者能够在布局受限时控制兄弟视图之间的空间分配方式。该行为与 SwiftUI 的 layoutPriority(\_:) 保持一致。

引入 modifiers 属性和 ViewModifiers 系统
新增了 modifiers 属性、ViewModifiers 类和 modifiers() 辅助函数，支持流畅、链式地应用视图修饰符。
该系统支持多次应用同类型的修饰符（例如重复调用 padding() 或 background()），并确保修饰符严格按照链式顺序生效，贴近 SwiftUI 的行为。

SVG 渲染
新增 SVG 渲染组件，可无缝显示矢量图形。

自定义字体
现在支持使用系统或第三方应用安装的字体。

---

# 改进

请求 API
RequestInit / Request 新增 allowInsecureRequest 字段，用于控制是否允许不安全的请求。

定位 API
Location.requestCurrent 现在默认返回缓存的位置数据（如果可用）。
新增可选参数 options.forceRequest，用于始终获取最新位置。

开发者服务器
开发者服务器现在会记住并记录上次连接的地址，以加快重新连接速度。

存储增强
set、get、contains、remove、setData 和 getData 现在支持可选参数 options.shared，用于跨脚本访问共享存储，方便实现跨脚本功能。

---

# 修复

助手工具调用
修复了助手在调用工具时可能错误解析参数的问题，提高了工具执行的可靠性。

照片 API
修复了通过下滑手势关闭 Photos.pickPhotos 窗口时不会正确结束 promise 的问题。

健康数据权限
修复了请求 Health 权限时未弹出授权对话框的问题。

脚本高级设置
修复了在“高级设置”页面重命名脚本时出现的错误，该错误可能导致保存后刷新失败。

---

# 变更

API 提供方
移除了 Pollinations.AI API 提供方。

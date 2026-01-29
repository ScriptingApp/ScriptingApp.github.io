# 匹配过渡源（matchedTransitionSource）

`matchedTransitionSource` 用于 **标记某个视图作为“导航转场动画的几何源视图”**，使该视图在页面跳转时可以作为：

- 缩放动画的起点
- 位置过渡的起点
- 共享几何动画的起始帧

该能力对应 SwiftUI 中的 `matchedTransitionSource`，主要用于：

- 页面级导航动画
- Zoom（缩放）转场
- Hero 动画（共享元素转场）

它 **只用于导航转场**，不用于组件级几何联动（组件级联动应使用 `matchedGeometryEffect`）。

***

## 一、API 定义

```ts
/**
 * Identifies this view as the source of a navigation transition, such as a zoom transition.
 * @available iOS 18.0+
 */
matchedTransitionSource?: {
  id: string | number
  namespace: NamespaceID
}
```

***

## 二、核心作用

`matchedTransitionSource` 的核心作用是：

> 在一次导航跳转中，指定“从哪个视图开始做几何过渡动画”。

它解决的问题是：

- 页面跳转时视图“瞬间消失 + 新页面突然出现”的割裂感
- 图片、卡片、头像等元素在跳转时缺乏空间连续性
- 无法实现从“点击的那个元素”缩放进入目标页面的效果

通过 `matchedTransitionSource`，可以实现典型的：

- 图片 → 图片详情页的缩放动画
- 卡片 → 详情页的 Hero 动画
- 头像 → 个人主页的放大过渡

***

## 三、参数详解

### 1. id（转场源唯一标识）

```ts
id: string | number
```

含义：

- 标识“这是哪一个转场源视图”
- 必须与目标页面中 `navigationTransition.sourceID` 完全一致

规则：

- 同一个 `namespace` 内：

  - `id` 必须唯一
- 一次导航转场中：

  - 只能有一个 `matchedTransitionSource` 与 `sourceID` 对应

***

### 2. namespace（转场命名空间）

```ts
namespace: NamespaceID
```

含义：

- 用于把“源视图”和“目标页面”放入同一个转场作用域
- 由 `NamespaceReader` 创建并注入

规则：

1. 源视图与目标页面 **必须使用同一个 namespace**
2. 不同 namespace 之间 **绝对不会发生转场匹配**
3. 即使 `id` 相同，只要 namespace 不同，也不会触发动画

***

## 四、matchedTransitionSource 的工作机制

一次完整的导航缩放转场，必须同时满足以下四个条件：

1. **源视图定义了 `matchedTransitionSource`**
2. **目标页面定义了 `navigationTransition`**
3. **`sourceID === matchedTransitionSource.id`**
4. **两者使用的是同一个 `namespace`**

只有在这四个条件全部满足时，系统才会：

- 读取源视图的：

  - 真实 Frame
  - 屏幕位置
  - 缩放比例
- 读取目标页面的最终布局 Frame
- 自动计算：

  - 初始缩放比例
  - 平移路径
  - 最终尺寸
- 并生成完整的缩放过渡动画

***

## 五、最小可用示例：图片缩放进入详情页

```tsx
<NamespaceReader>
  {namespace => (
    <NavigationLink
      destination={
        <DetailPage
          navigationTransition={{
            type: "zoom",
            namespace,
            sourceID: "cover"
          }}
        />
      }
    >
      <Image
        source="cover"
        frame={{
          width: 120,
          height: 160
        }}
        matchedTransitionSource={{
          id: "cover",
          namespace
        }}
      />
    </NavigationLink>
  )}
</NamespaceReader>
```

### 该示例实现的效果

1. 用户点击封面图片
2. 页面开始跳转到 `DetailPage`
3. 新页面并不是“直接出现”
4. 而是：

   - 从点击的那张图片位置开始
   - 按比例放大
   - 平滑过渡到详情页的最终布局

***

## 六、卡片 → 详情页 Hero 动画示例

```tsx
<NamespaceReader>
  {namespace => (
    <NavigationLink
      destination={
        <DetailPage
          navigationTransition={{
            type: "zoom",
            namespace,
            sourceID: "card-1"
          }}
        />
      }
    >
      <VStack
        frame={{
          width: 280,
          height: 180
        }}
        background="systemGray6"
        matchedTransitionSource={{
          id: "card-1",
          namespace
        }}
      >
        <Text>Card Title</Text>
      </VStack>
    </NavigationLink>
  )}
</NamespaceReader>
```

该示例实现：

- 整个卡片作为转场起点
- 跳转后卡片“变形为”详情页容器
- 具备典型的 Hero 动画特征

***

## 七、matchedTransitionSource 与 matchedGeometryEffect 的本质区别

| 对比项             | matchedTransitionSource | matchedGeometryEffect |
| --------------- | ----------------------- | --------------------- |
| 使用场景            | 页面级导航转场                 | 组件级几何联动               |
| 是否依赖 Navigation | 是                       | 否                     |
| 是否支持多个元素同步      | 否                       | 是                     |
| 是否需要 sourceID   | 是                       | 否                     |
| 是否控制 properties | 否                       | 是                     |
| 是否支持布局内动画       | 否                       | 是                     |

一句话总结：

- `matchedTransitionSource`：**只负责“从哪儿开始跳页面”**
- `matchedGeometryEffect`：**负责“布局内部怎么动”**

***

## 八、常见错误与排查要点

### 1. 动画完全不生效

请检查：

- `sourceID` 是否与 `matchedTransitionSource.id` 完全一致
- 是否使用了同一个 `namespace`
- 是否真的发生了 `NavigationLink` 跳转

***

### 2. 动画方向异常或缩放错位

常见原因：

- 源视图有 `scaleEffect`、`offset` 等变换
- 源视图所在的容器使用了：

  - `clipShape`
  - `mask`
  - `containerShape`

这些变换会影响系统获取“真实几何 Frame”。

***

### 3. 同时存在多个 source

错误示例：

- 同一个页面中：

  - 多个视图都使用了相同 `id`
  - 且都设置了 `matchedTransitionSource`

后果：

- 系统无法判定哪个才是转场源
- 动画结果不可预测

***

## 九、使用限制说明

1. `matchedTransitionSource` 仅适用于：

   - `NavigationLink`
   - 基于 Navigation 的页面跳转
2. 在以下环境中不支持或行为受限：

   - Widget
   - Live Activity
3. 不适用于：

   - 组件内部状态切换
   - tab 切换
   - 展开折叠菜单

这些场景应使用 `matchedGeometryEffect`。

***

## 十、适用场景总结

非常适合使用 `matchedTransitionSource` 的场景：

- 图片点击 → 图片详情页
- 文章封面 → 阅读页
- 商品卡片 → 商品详情页
- 用户头像 → 个人主页
- 卡片列表 → 大卡详情页

不适合使用的场景：

- 高频切换的 UI 状态
- 大量小组件同时动画
- 实时刷新型界面

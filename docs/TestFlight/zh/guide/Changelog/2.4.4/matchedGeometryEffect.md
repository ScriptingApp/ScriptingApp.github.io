---
title: 匹配几何效果（matchedGeometryEffect）
description: 该视图修饰符允许你在不同的布局，不同的容器，不同的条件渲染状态，不同的尺寸和位置配置之间进行平滑的过渡动画。

---

`matchedGeometryEffect` 用于在 **不同视图之间建立几何关联关系**，使视图在：

* 位置变化
* 尺寸变化
* 布局层级变化
* 条件渲染切换

这些场景中，仍然保持 **连续、平滑、空间一致的动画过渡效果**。

该能力对应 SwiftUI 中的 `matchedGeometryEffect`，属于 **组件级几何联动动画系统**，不依赖导航系统。

---

## 一、API 定义

```ts
matchedGeometryEffect?: {
  id: string | number
  namespace: NamespaceID
  properties?: MatchedGeometryProperties
  anchor?: Point | KeywordPoint
  isSource?: boolean
}
```

```ts
type MatchedGeometryProperties = "frame" | "position" | "size"
```

---

## 二、核心作用

`matchedGeometryEffect` 的核心作用是：

> 让两个“逻辑上是同一个元素”的视图，在 **不同布局结构中共享几何信息**，从而产生连续的过渡动画。

它解决的问题包括：

* 视图从一个容器移动到另一个容器时的“跳变”
* 视图尺寸变化时的“突变”
* 列表项展开为详情页时的“断层感”
* Tab 切换指示器的“瞬移感”

---

## 三、参数详解

### 1. id（几何匹配唯一标识）

```ts
id: string | number
```

* 用于标识这是 **哪一个几何元素**
* 在同一个 `namespace` 下：

  * **id 相同的视图才会参与几何匹配**
* 通常来自：

  * 数据模型 ID
  * 索引值
  * 业务唯一标识

规则：

* id 必须稳定
* 动画期间不能频繁变化
* 同一时刻：

  * 一个 id 只能有一个 `isSource = true`

---

### 2. namespace（几何命名空间）

```ts
namespace: NamespaceID
```

* 用于将多个匹配动画分组隔离
* 不同 namespace 之间：

  * 即使 id 相同，也不会产生动画
* 必须由 `NamespaceReader` 创建并注入

规则：

* source 与 target 必须使用 **同一个 namespace**
* 不允许跨 namespace 匹配

---

### 3. properties（参与匹配的几何属性）

```ts
properties?: "frame" | "position" | "size"
```

默认值：

```ts
properties = "frame"
```

含义说明：

| 值            | 含义          |
| ------------ | ----------- |
| `"frame"`    | 同时匹配位置 + 尺寸 |
| `"position"` | 仅匹配中心点位置    |
| `"size"`     | 仅匹配尺寸，不匹配位置 |

选择原则：

* `"frame"`：最完整、最自然的动画
* `"position"`：指示器、滑块、选中背景
* `"size"`：放大缩小、展开收起

---

### 4. anchor（锚点）

```ts
anchor?: Point | KeywordPoint
```

默认值：

```ts
anchor = "center"
```

作用：

* 决定动画进行时：

  * 元素是从哪个相对位置进行对齐和计算的

常见取值：

* `"center"`
* `"topLeading"`
* `"topTrailing"`
* `"bottomLeading"`
* `"bottomTrailing"`

使用场景：

* 卡片从左上角展开
* 头像从右上角放大
* 底部元素向上弹出

---

### 5. isSource（是否作为几何数据的“源”）

```ts
isSource?: boolean
```

默认值：

```ts
isSource = true
```

含义说明：

| 值       | 行为             |
| ------- | -------------- |
| `true`  | 当前视图向外“提供”几何数据 |
| `false` | 当前视图“接收”几何动画结果 |

标准使用模式：

* 原始视图：`isSource = true`
* 目标视图：`isSource = false`

如果省略：

* 第一个出现的视图默认作为 source
* 其余作为接收方

---

## 四、最小可用示例（位置 + 尺寸联动）

该示例演示：
一个圆形在两个区域之间切换位置与尺寸，并保持连续动画。

```tsx
const expanded = useObservable(false)

return <NamespaceReader>
  {namespace => (
    <VStack spacing={40}>
      <Button
        title="Toggle"
        action={() => {
          expanded.setValue( !expanded.value)
        }}
      />

      <ZStack
        frame={{ width: 300, height: 200 }}
        background="systemGray6"
      >
        {!expanded.value && (
          <Circle
            fill="systemOrange"
            frame={{ width: 60, height: 60 }}
            matchedGeometryEffect={{
              id: "circle",
              namespace
            }}
          />
        )}
      </ZStack>

      <ZStack
        frame={{ width: 300, height: 300 }}
        background="systemGray4"
      >
        {expanded.value && (
          <Circle
            fill="systemOrange"
            frame={{ width: 150, height: 150 }}
            matchedGeometryEffect={{
              id: "circle",
              namespace,
              isSource: false
            }}
          />
        )}
      </ZStack>
    </VStack>
  )}
</NamespaceReader>
```

该示例实现的动画效果：

* 同一个圆：

  * 从上方小尺寸区域
  * 平滑移动并放大到下方大区域
* 无跳变、无突变、无瞬移

---

## 五、仅同步“位置”的示例（指示器动画）

```tsx
const selected = useObservable(0)

return <NamespaceReader>
  {namespace => (
    <HStack spacing={24}>
      <Text
        onTapGesture={() => selected.setValue(0)}
        matchedGeometryEffect={{
          id: "indicator",
          namespace,
          properties: "position",
          isSource: selected.value === 0
        }}
      >
        Tab 1
      </Text>

      <Text
        onTapGesture={() => selected.setValue(1)}
        matchedGeometryEffect={{
          id: "indicator",
          namespace,
          properties: "position",
          isSource: selected.value === 1
        }}
      >
        Tab 2
      </Text>
    </HStack>
  )}
</NamespaceReader>
```

适用于：

* Tab 选中动画
* 滑块指示器
* 选中背景平移

---

## 六、仅同步“尺寸”的示例（放大缩小）

```tsx
const expanded = useObservable(false)

return <NamespaceReader>
  {namespace => (
    <ZStack>
      <Circle
        fill="systemBlue"
        frame={{
          width: expanded.value ? 200 : 80,
          height: expanded.value ? 200 : 80
        }}
        matchedGeometryEffect={{
          id: "avatar",
          namespace,
          properties: "size"
        }}
        onTapGesture={() => {
          expanded.setValue(!expanded.value)
        }}
      />
    </ZStack>
  )}
</NamespaceReader>
```

适用于：

* 头像放大
* 卡片展开
* 按钮按压动画

---

## 七、多元素联动示例（卡片 → 详情）

```tsx
<NamespaceReader>
  {namespace => (
    <ZStack>
      {!showDetail.value && (
        <VStack spacing={16}>
          <Image
            source="cover"
            matchedGeometryEffect={{
              id: "card.image",
              namespace
            }}
          />
          <Text
            matchedGeometryEffect={{
              id: "card.title",
              namespace
            }}
          >
            Card Title
          </Text>
        </VStack>
      )}

      {showDetail.value && (
        <VStack spacing={24}>
          <Image
            source="cover"
            frame={{ width: 300, height: 200 }}
            matchedGeometryEffect={{
              id: "card.image",
              namespace,
              isSource: false
            }}
          />
          <Text
            font="largeTitle"
            matchedGeometryEffect={{
              id: "card.title",
              namespace,
              isSource: false
            }}
          >
            Card Title
          </Text>
        </VStack>
      )}
    </ZStack>
  )}
</NamespaceReader>
```

效果说明：

* 图片与标题同时参与几何匹配
* 从卡片形态平滑过渡为详情页布局
* 无需使用导航动画

---

## 八、关键使用规则总结

1. **namespace 必须完全相同**
2. **id 必须完全一致**
3. 同一时刻：

   * 一个 id 只能有一个 `isSource = true`
4. 默认行为：

   ```ts
   properties = "frame"
   anchor = "center"
   isSource = true
   ```
5. source 与 target 必须：

   * 同一渲染周期内完成切换
6. 如果 source 和 target：

   * 同时存在，且都为 `isSource = true`
     → 动画不确定，可能失效
7. Widget 与 Live Activity 环境不支持完整 matchedGeometry 动画能力

---

## 九、适用场景总结

适合使用 `matchedGeometryEffect` 的场景：

* Tab 指示器动画
* 卡片 → 详情展开
* 图片放大预览
* 列表项选中动画
* 分栏布局中的选中项切换

不适合使用的场景：

* 高频数据刷新列表
* 大量同时进行几何动画的复杂视图树
* 帧率敏感的实时图表

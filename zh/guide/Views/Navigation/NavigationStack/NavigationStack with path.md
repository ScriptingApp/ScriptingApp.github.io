# NavigationStack 配合 path

`NavigationStack.path` 用于为 `NavigationStack` 提供**可观察的导航路径控制能力**，用于实现：

- 编程式导航（Programmatic Navigation）
- 多级页面堆栈控制
- 页面回退到指定层级或根视图
- 与 `NavigationDestination` 的动态页面映射联动

***

## 一、API 定义

```ts
type NavigationStackProps = {
  path?: Observable<string[]>
  ...
}

declare const NavigationStack: FunctionComponent<NavigationStackProps>
```

***

## 二、path 的类型与含义

```ts
path?: Observable<string[]>
```

`path` 是一个字符串数组的可观察对象，用于表示当前导航栈中的**页面路径序列**。

其语义规则如下：

- 每一个 `string` 表示一个页面标识
- 数组顺序表示页面入栈顺序
- 数组末尾元素表示当前显示的页面
- 数组为空表示回到根页面（Root）

示例说明：

```ts
[]
```

表示当前在根视图

```ts
["a"]
```

表示已导航到页面 `a`

```ts
["a", "b"]
```

表示先进入页面 `a`，再进入页面 `b`

***

## 三、基础使用示例

```tsx
function Page() {
  const path = useObservable<string[]>(["a"])

  return <NavigationStack
    path={path}
  >
    <VStack
      navigationTitle="Navigation Demo"
      navigationDestination={
        <NavigationDestination>
          {(page) =>
            <VStack>
              <Text>
                Current page:
                {page}
              </Text>
              {path.value.length > 1
                && <Button
                  title="Go to Root"
                  action={() => {
                    path.setValue([])
                  }}
                />}
            </VStack>
          }
        </NavigationDestination>
      }
    >
      <Button
        title="Show page a"
        action={() => {
          path.setValue(["a"])
        }}
      />
      <Button
        title="Show page b"
        action={() => {
          path.setValue(["b"])
        }}
      />
      <Button
        title="Show page a then b"
        action={() => {
          path.setValue(["a", "b"])
        }}
      />
    </VStack>
  </NavigationStack>
}
```

***

## 四、path 的工作机制说明

### 1. path 作为导航状态的唯一数据源

当 `NavigationStack` 绑定了 `path` 后：

- 当前页面层级将完全由 `path.value` 决定
- UI 导航状态将与 `path` 保持双向同步
- 不再依赖隐式的 Push / Pop 状态管理

***

### 2. 页面入栈规则

当执行：

```ts
path.setValue(["a"])
```

系统行为：

- 根页面入栈
- 跳转至页面 `a`

当执行：

```ts
path.setValue(["a", "b"])
```

系统行为：

- 先进入页面 `a`
- 再进入页面 `b`
- 当前显示页面为 `b`

***

### 3. 页面出栈与回到根页面

当执行：

```ts
path.setValue([])
```

系统行为：

- 清空整个导航路径
- 立即回到根页面

***

## 五、NavigationDestination 与 path 的关系

`NavigationDestination` 用于根据 `path` 中的当前值动态构建目标页面。

```tsx
<NavigationDestination>
  {(page) => ...}
</NavigationDestination>
```

其中：

- `page` 参数来自 `path.value` 的当前末尾元素
- 当 `path` 发生变化时：

  - `page` 会自动更新
  - 对应的页面内容会重新渲染

示例逻辑：

```ts
["a"]  -> page === "a"
["a","b"] -> page === "b"
```

***

## 六、通过按钮控制 path 进行导航

跳转到页面 `a`：

```ts
path.setValue(["a"])
```

跳转到页面 `b`：

```ts
path.setValue(["b"])
```

连续跳转两个页面：

```ts
path.setValue(["a", "b"])
```

返回根页面：

```ts
path.setValue([])
```

***

## 七、path 与手势返回的同步关系

当用户通过系统返回手势或导航栏返回按钮返回时：

- `path.value` 会自动同步更新
- 显示页面与 `path` 始终保持一致
- 不需要额外监听返回事件进行手动同步

***

## 八、path 的典型使用场景

`NavigationStack.path` 适用于以下场景：

- 深层页面跳转
- 跨页面编程式导航控制
- 统一的路由状态管理
- 脚本控制页面跳转
- 恢复上次浏览路径
- 多步骤流程（向导式界面）

***

## 九、常见错误说明

### 1. path 未初始化为空数组

错误：

```ts
const path = useObservable<string[]>(null)
```

正确：

```ts
const path = useObservable<string[]>([])
```

***

### 2. path 中的值类型错误

错误：

```ts
path.setValue([1, 2])
```

正确：

```ts
path.setValue(["1", "2"])
```

当前 `path` 仅支持 `string[]` 作为路径类型。

***

## 十、与不使用 path 的 NavigationStack 的区别

| 功能      | 不使用 path | 使用 path |
| ------- | -------- | ------- |
| 手动 Push | 支持       | 不建议     |
| 编程式跳转   | 不支持      | 支持      |
| 多层跳转    | 受限       | 完全支持    |
| 状态恢复    | 困难       | 简单      |
| 路由统一管理  | 不可控      | 完全可控    |

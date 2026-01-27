---
title: 实时活动（灵动岛）
---

`LiveActivity` API 允许你的脚本在 iOS 的锁屏界面以及支持的设备上的动态岛中展示实时数据。通过该 API，你可以创建、更新并结束 Live Activity，同时监听其生命周期状态和系统支持情况。

本文件详细介绍 Scripting app 中的 **LiveActivity API**，包括：

- Live Activity 的生命周期与核心概念
- 如何注册 Live Activity UI
- 如何在脚本中启动、更新、结束 Live Activity
- 如何构建 Live Activity UI（包括 Dynamic Island 多种布局）
- 所有类型参数说明
- 完整示例代码与最佳实践

本 API 基于 Apple ActivityKit 能力，并以 TypeScript/TSX 的方式封装，允许开发者使用 React 风格构建 Lock Screen 与 Dynamic Island 界面。

---

## 1. Live Activity 概念理解

Live Activity 展示在以下区域：

- **锁屏界面**
- **iPhone 14 Pro+ 的 Dynamic Island**
- **其他设备的悬浮样式（Banner）**

它能随着应用或脚本运行实时更新内容，如：

- 计时器
- 外卖进度
- 健身、运动状态
- 倒计时、打卡、提醒

**在 Scripting app 中，一个 Live Activity 由两部分组成：**

1. **内容状态（contentState）**
   一个 JSON 可序列化的对象，会随时间改变。
2. **UI Builder**
   通过 TSX 描述不同区域的展示方式。

---

## 2. Live Activity 状态类型

```ts
type LiveActivityState = "active" | "dismissed" | "ended" | "stale";
```

| 状态      | 描述                                              |
| --------- | ------------------------------------------------- |
| active    | 正在显示，可以更新内容                            |
| stale     | 已过期，需要更新 staleDate 后才能恢复 active      |
| ended     | 活动已结束但仍在锁屏显示（最长 4 小时或自定时间） |
| dismissed | 已被系统或用户移除，不再可见                      |

---

## 3. LiveActivityDetail 类型

```ts
type LiveActivityDetail = {
  id: string;
  state: LiveActivityState;
};
```

用于描述当前正在运行的所有 Live Activity 信息。

---

## 4. LiveActivity UI 构建类型

## 4.1 LiveActivityUIProps

```ts
type LiveActivityUIProps = {
  content: VirtualNode;
  compactLeading: VirtualNode;
  compactTrailing: VirtualNode;
  minimal: VirtualNode;
  children: VirtualNode | VirtualNode[];
};
```

这些字段对应 Dynamic Island：

- **content**：锁屏和普通设备顶部 Banner 显示
- **compactLeading / compactTrailing**：Dynamic Island 收缩状态左右区域
- **minimal**：最小化的单点显示
- **children**：展开后的多个区域（使用 `LiveActivityUIExpanded*` 包裹）

---

## 5. 注册 Live Activity UI

Live Activity 必须放在单独的文件中，例如 `live_activity.tsx`：

```tsx
import { LiveActivity, LiveActivityUI, LiveActivityUIBuilder } from "scripting";

export type State = {
  mins: number;
};

function ContentView(state: State) {
  return (
    <HStack activityBackgroundTint={{ light: "clear", dark: "clear" }}>
      <Image systemName="waterbottle" foregroundStyle="systemBlue" />
      <Text>{state.mins}分钟后补水</Text>
    </HStack>
  );
}

const builder: LiveActivityUIBuilder<State> = (state) => {
  return (
    <LiveActivityUI
      content={<ContentView {...state} />}
      compactLeading={
        <HStack>
          <Image systemName="clock" />
          <Text>{state.mins}m</Text>
        </HStack>
      }
      compactTrailing={<Image systemName="waterbottle" foregroundStyle="systemBlue" />}
      minimal={<Image systemName="clock" />}>
      <LiveActivityUIExpandedCenter>
        <ContentView {...state} />
      </LiveActivityUIExpandedCenter>
    </LiveActivityUI>
  );
};

export const MyLiveActivity = LiveActivity.register("MyLiveActivity", builder);
```

---

## 6. 在脚本中使用 Live Activity

下面展示如何启动、更新、监听状态并结束 Live Activity。

```tsx
import {
  Button,
  Text,
  VStack,
  Navigation,
  NavigationStack,
  useMemo,
  useState,
  LiveActivityState,
  BackgroundKeeper,
} from "scripting";
import { MyLiveActivity } from "./live_activity";

function Example() {
  const dismiss = Navigation.useDismiss();
  const [state, setState] = useState<LiveActivityState>();

  const activity = useMemo(() => {
    const instance = MyLiveActivity();

    instance.addUpdateListener((s) => {
      setState(s);
      if (s === "dismissed") {
        BackgroundKeeper.stop();
      }
    });

    return instance;
  }, []);

  return (
    <NavigationStack>
      <VStack
        navigationTitle="LiveActivity 示例"
        navigationBarTitleDisplayMode="inline"
        toolbar={{
          cancellationAction: <Button title="完成" action={dismiss} />,
        }}>
        <Text>当前状态：{state ?? "-"}</Text>

        <Button
          title="启动 Live Activity"
          disabled={state != null}
          action={() => {
            let count = 5;
            BackgroundKeeper.keepAlive();

            activity.start({ mins: count });

            function tick() {
              setTimeout(() => {
                count -= 1;

                if (count === 0) {
                  activity.end({ mins: 0 });
                  BackgroundKeeper.stop();
                } else {
                  activity.update({ mins: count });
                  tick();
                }
              }, 60000);
            }
            tick();
          }}
        />
      </VStack>
    </NavigationStack>
  );
}

async function run() {
  await Navigation.present(<Example />);
  Script.exit();
}

run();
```

---

## 7. LiveActivity 类 API 说明

## 7.1 start(contentState, options?)

```ts
start(contentState: T, options?: LiveActivityOptions): Promise<boolean>
```

- 请求系统启动 Live Activity
- contentState 必须可以 JSON 序列化

### LiveActivityOptions

```ts
type LiveActivityOptions = {
  staleDate?: number | Date;
  relevanceScore?: number;
};
```

- staleDate：到期变为 stale 的时间戳（ms） 或 Date 对象
- relevanceScore：控制 Dynamic Island 的优先级

---

## 7.2 update(contentState, options?)

```ts
update(contentState: T, options?: LiveActivityUpdateOptions)
```

### LiveActivityUpdateOptions

```ts
type LiveActivityUpdateOptions = {
  staleDate?: number | Date;
  relevanceScore?: number;
  alert?: {
    title: string;
    body: string;
  };
};
```

可带 Apple Watch 的更新提示。

---

## 7.3 end(contentState, options?)

```ts
end(contentState: T, options?: LiveActivityEndOptions)
```

### LiveActivityEndOptions

```ts
type LiveActivityEndOptions = {
  staleDate?: number | Date;
  relevanceScore?: number;
  dismissTimeInterval?: number;
};
```

dismissTimeInterval（单位秒）:

- 未提供：系统默认最长保留 4 小时
- \<= 0：立即移除
- \> 0：指定多久后移除

---

## 7.4 获取活动状态

```ts
getActivityState(): Promise<LiveActivityState | null>
```

---

## 7.5 监听状态更新

```ts
addUpdateListener(listener);
removeUpdateListener(listener);
```

当 Live Activity 状态变更时回调，例如：

- active → stale
- active → ended
- ended → dismissed

---

## 7.6 静态方法

```ts
static areActivitiesEnabled(): Promise<boolean>
static getAllActivities(): Promise<LiveActivityDetail[]>
static getAllActivitiesIds(): Promise<string[]>
static getActivityState(activityId: string)
static from(activityId, name)
static endAllActivities(options?)
```

---

## 8. Live Activity UI 组件

| 组件                           | 描述               |
| ------------------------------ | ------------------ |
| LiveActivityUI                 | 注册 UI 的根结构   |
| LiveActivityUIExpandedCenter   | 展开状态的中间区域 |
| LiveActivityUIExpandedLeading  | 左侧区域           |
| LiveActivityUIExpandedTrailing | 右侧区域           |
| LiveActivityUIExpandedBottom   | 底部区域           |

用于构建 Dynamic Island 展开布局。

---

## 9. 注意事项与最佳实践

## 9.1 必须 JSON 可序列化

contentState 中不能包含：

- 函数
- Date 对象（需转 timestamp）
- class 实例
- 非可序列化对象

## 9.2 Live Activity 必须放在独立文件

例如：

```
live_activity.tsx
```

这与系统对 UI 构建的要求有关。

## 9.3 Scripting 的 Live Activity 与脚本生命周期隔离

即使脚本结束，Live Activity 会继续保持。

若你希望脚本保持运行，可使用：

```ts
BackgroundKeeper.keepAlive();
```

---

## 10. 完整示例（简化版）

```tsx
const activity = MyLiveActivity();

await activity.start({ mins: 10 });

await activity.update({ mins: 5 });

await activity.end({ mins: 0 }, { dismissTimeInterval: 0 });
```

## 11. 注意事项

- Live Activity 的启动是异步的，需要等到 `start` 返回 `true` 时才能调用 `update` 和 `end`
- Live Activity 不能访问 Documents 和 iCloud 目录，只能访问 app group 目录，如果你想要访问文件或者渲染图片，必须把文件或图片保存到 `FileManager.appGroupDocumentsDirectory` 目录中。 比如渲染图片，你保存到 `FileManager.appGroupDocumentsDirectory` 中， 再通过 `<Image filePath={Path.join(FileManager.appGroupDocumentsDirectory, 'example.png')} />` 渲染
- Live Activity 可以访问与 App 共享的 Storage 数据

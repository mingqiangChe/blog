---
title: 'Vue3'
date: '2025-07-16'
description: 'Vue3常用'
tags: ['vue3']
author: 'Thomas che'
cover: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_2/vue3.png'
---

</br>

# vue3

## 一、响应式核心方法（响应式数据）

### 1. ref()

作用： 定义基本类型/对象的响应式数据（可用于模板渲染）

```ts
const count = ref(0); // 自动变成响应式
count.value++; // 修改方式：.value
```

### 2. reactive()

作用：定义一个对象的响应式状态（引用类型推荐用这个）

```ts
const user = reactive({
  name: '车车',
  age: 18,
});
user.age++;
```

### 3. readonly()

作用：把一个对象变成只读响应式，防止被修改（常用于 props 深层保护）

```ts
const state = reactive({ count: 1 });
const readonlyState = readonly(state);

// readonlyState.count = 10 ❌ 报错
```

### 4. toRefs()

作用：把 reactive 对象中的属性解构成 ref，用于解构时保留响应性

```ts
const state = reactive({ name: '车车', age: 20 });
const { name, age } = toRefs(state);

name.value = '小车'; // ✅ 响应性保留
```

## 二、生命周期钩子（组合式 API 中）

| 钩子            | 含义       |
| --------------- | ---------- |
| `onMounted`     | 组件挂载后 |
| `onUpdated`     | 组件更新后 |
| `onUnmounted`   | 组件卸载前 |
| `onBeforeMount` | 挂载前     |

## 三、监听器

### 1. watch()

监听指定变量变化，执行副作用逻辑（比如网络请求）

```ts
watch(count, (newVal, oldVal) => {
  console.log('count 变了：', newVal);
});
```

### 2. watchEffect()

自动追踪依赖的响应式变量，立即执行一次

```ts
watchEffect(() => {
  console.log(`count 是：${count.value}`);
});
```

## 四、模板引用与 DOM 操作

ref + onMounted 获取 DOM：

```ts
<template>
  <input ref="inputRef" />
</template>

<script setup lang="ts">
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputRef.value?.focus(); // 获取 DOM 节点
});
</script>

```

## 五、计算属性 computed()

```ts
const count = ref(2);
const double = computed(() => count.value * 2);
```

会自动缓存和依赖追踪

只在依赖变更时重新计算

## 六、异步逻辑控制（组合）

用 async + onMounted：

```ts
onMounted(async () => {
  const res = await fetch('/api/user');
  const data = await res.json();
});
```

## 七、defineProps / defineEmits（组件通信专用）

```ts
const props = defineProps<{ name: string }>();

const emit = defineEmits<{
  (e: 'change', payload: string): void;
}>();
```

## 八、provide / inject（跨组件共享）

```ts
// 父组件
provide('theme', ref('dark'));

// 子组件
const theme = inject<Ref<string>>('theme');
```

## 🧠 推荐组合使用思维

| 场景                | 推荐组合                        |
| ------------------- | ------------------------------- |
| 数据响应式          | `ref` / `reactive` / `computed` |
| 生命周期逻辑        | `onMounted` / `onUnmounted`     |
| 表单与 DOM 交互     | `ref` + `onMounted`             |
| 组件通信            | `defineProps` + `emit`          |
| 父子状态共享        | `provide` / `inject`            |
| 本地状态 + API 联动 | `watchEffect` / `watch`         |

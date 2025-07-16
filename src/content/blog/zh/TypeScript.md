---
title: 'TypeScript常用约束'
date: '2025-07-16'
description: 'TypeScript常用约束使用'
tags: ['react']
author: 'Thomas che'
cover: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_2/typescript.jpeg'
---

</br>

## 1. 基础类型（number、string、boolean）

```ts
const age: number = 28;
const name: string = '车车';
const isDone: boolean = true;
```

## 2. 对象类型（接口 Interface）

```ts
interface User {
  id: number;
  name: string;
  email?: string; // 可选属性
}

const user: User = { id: 1, name: 'Che' };
```

## 3. 联合类型（多个值中的一个）

```ts
type Status = 'success' | 'error' | 'loading';

let state: Status = 'success'; // ✅ 只能是这几种值
```

## 4. 数组类型

```ts
const numbers: number[] = [1, 2, 3];
const users: User[] = [{ id: 1, name: 'A' }];
或泛型写法;
const titles: Array<string> = ['Vue', 'React'];
```

## 5. 函数类型

```ts
function add(a: number, b: number): number {
  return a + b;
}

const handleClick: (id: number) => void = (id) => {
  console.log(id);
};
```

## 6. 泛型（Generic）

```ts
function getFirstItem<T>(arr: T[]): T {
  return arr[0];
}

const first = getFirstItem<string>(['a', 'b', 'c']);
```

## 7. 类型别名（type）

```ts
type Point = { x: number; y: number };

const pos: Point = { x: 10, y: 20 };
```

## 8. 枚举（Enum）

```ts
enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

const role: Role = Role.Admin;
```

## 9. React Props 类型（函数式组件）

```ts
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);
```

## 10. Record / Partial / Pick 等工具类型

```ts
// Record：构造一个键值对对象
const permissions: Record<string, boolean> = {
  read: true,
  write: false,
};

// Partial：将所有属性变为可选
type UserPartial = Partial<User>;

// Pick：只保留部分属性
type UserBase = Pick<User, 'id' | 'name'>;
```

## 11. 类型断言（不推荐滥用）

```ts
const input = document.getElementById('input') as HTMLInputElement;
input.value = 'test';
```

## 12. 接口继承

```ts
interface Base {
  id: number;
}
interface User extends Base {
  name: string;
}
```

## 附加：常用约束类型汇总表

| 类型约束             | 用途                   |       |
| -------------------- | ---------------------- | ----- |
| `string`             | 字符串                 |       |
| `number`             | 数字                   |       |
| `boolean`            | 布尔值                 |       |
| `any`                | 任意类型（⚠️ 不推荐）  |       |
| `unknown`            | 任意但更安全，需先断言 |       |
| `void`               | 无返回值               |       |
| `never`              | 永不返回（如死循环）   |       |
| `T[]` / `Array<T>`   | 数组类型               |       |
| `{ key: string }`    | 对象类型               |       |
| `enum`               | 枚举                   |       |
| `union` / `literal`  | 限定多个值，如 \`'a'   | 'b'\` |
| `interface` / `type` | 定义结构体             |       |

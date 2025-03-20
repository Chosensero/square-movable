# Square Movable

`Square Movable` — это интерактивное приложение, созданное с использованием Vue 3 и Vite. Оно позволяет пользователю изменять размер и перемещать квадрат на экране с помощью мыши, а также анимированно возвращать его в исходное состояние. Проект демонстрирует использование композаблов Vue для управления состоянием и анимациями с помощью GSAP.

## Описание

Приложение предоставляет:

- **Перетаскивание сторон квадрата**: Изменяйте ширину и высоту квадрата, захватывая его края.
- **Анимация сброса**: Кнопка для возвращения квадрата в центр с исходными размерами с плавной анимацией.
- **Анимация появления**: Квадрат появляется на экране с эффектом увеличения и прозрачности.
- **Типобезопасность**: Полная поддержка TypeScript для надежного кода.

## Рекомендуемая настройка IDE

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (отключите Vetur, если он установлен).

## Поддержка типов для импортов `.vue` в TypeScript

TypeScript по умолчанию не обрабатывает типы для импортов `.vue`. Вместо `tsc` используется `vue-tsc` для проверки типов. В редакторах необходимо установить [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar), чтобы служба языка TypeScript распознавала типы `.vue`.

## Настройка конфигурации

См. [Справочник по конфигурации Vite](https://vite.dev/config/).

## Project installation

````sh
npm install

```sh
npm install
````

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

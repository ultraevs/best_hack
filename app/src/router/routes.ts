// interface IRoute {
//     url: string
//     title: string
// }

export const routes = {
  main: { url: '/', title: 'Главная' },
  login: { url: '/login', title: 'Логин' },
  register: { url: '/register', title: 'Регистрация' },
  profile: { url: '/profile', title: 'Личный кабинет' },
  admin: { url: '/admin', title: 'Админка' },
  lot: { url: '/lot', title: 'Лот' },
}

export type routesName = keyof typeof routes

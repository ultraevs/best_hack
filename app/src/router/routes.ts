// interface IRoute {
//     url: string
//     title: string
// }

export const routes = {
  main: { url: '/', title: 'Главная страница' },
  login: { url: '/login', title: 'Логин'},
  register: { url: '/register', title: 'Регистрация'},
  profile: { url: '/profile', title: 'Профиль' },
}

export type routesName = keyof typeof routes

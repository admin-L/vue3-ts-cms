import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): Array<RouteRecordRaw> {
  const routes: Array<RouteRecordRaw> = []

  const allRoutes: Array<RouteRecordRaw> = []
  const routeFile = require.context('../router/main', true, /\.ts/)
  routeFile.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log(allRoutes)

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

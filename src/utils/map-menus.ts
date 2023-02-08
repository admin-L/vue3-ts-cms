import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'


let firstMenu: any = null

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
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

//获取面包屑菜单
export function pathMapToBreadcrumb(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

//获取当前菜单
export function pathMapToMenu(userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // breadcrumbs?.push({name: menu.name, path: menu.url})
        // breadcrumbs?.push({name: findMenu.name, path: findMenu.url})
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermission(userMenus: any[]) {
  const permission: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for(const menu of menus) {
      if(menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if(menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permission
}

export { firstMenu }
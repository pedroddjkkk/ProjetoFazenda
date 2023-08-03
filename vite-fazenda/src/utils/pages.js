export function newPage(path, element, icon, name, navigable){
    return {
        navigable: navigable,
        name: name,
        path: path,
        element: element,
        icon: icon,
    }
}
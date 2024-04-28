import { lazy } from 'react'

export const lazyLoad = (path, namedExport) => {
    return lazy(() => {
        const promise = import(path)

        if (namedExport === null) {
            return promise
        }

        return promise.then((module) => {
            return { default: module[namedExport] }
        })
    })
}

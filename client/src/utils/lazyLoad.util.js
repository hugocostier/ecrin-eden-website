import { lazy } from 'react'

export const lazyLoad = (path, namedExport) => {
    return lazy(async () => {
        const promise = import(/* @vite-ignore */ path)

        if (namedExport === null) {
            return promise
        }

        return promise.then((module) => {
            return { default: module[namedExport] }
        })
    })
}

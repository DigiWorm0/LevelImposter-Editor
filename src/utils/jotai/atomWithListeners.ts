// File modified from...
// https://jotai.org/docs/recipes/atom-with-listeners

import { useEffect } from 'react'
import { atom, Getter, SetStateAction, Setter, useSetAtom } from 'jotai'

export type Callback<Value> = (
    get: Getter,
    set: Setter,
    newVal: Value,
    prevVal: Value,
) => void

export default function atomWithListeners<Value>(initialValue: Value) {
    const baseAtom = atom(initialValue)
    const listenersAtom = atom<Callback<Value>[]>([])
    const anAtom = atom(
        (get) => get(baseAtom),
        (get, set, arg: SetStateAction<Value>) => {
            const prevVal = get(baseAtom)
            set(baseAtom, arg)
            const newVal = get(baseAtom)
            get(listenersAtom).forEach((callback) => {
                callback(get, set, newVal, prevVal)
            })
        },
    )
    const useListener = (callback: Callback<Value>) => {
        const setListeners = useSetAtom(listenersAtom)
        useEffect(() => {
            setListeners((prev) => [...prev, callback])
            return () =>
                setListeners((prev) => {
                    const index = prev.indexOf(callback)
                    return [...prev.slice(0, index), ...prev.slice(index + 1)]
                })
        }, [setListeners, callback])
    }
    return [anAtom, useListener] as const
}
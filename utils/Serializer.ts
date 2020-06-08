export function toInstanceFlat<T>(obj: T, jsonObj: { [key: string]: any }): T {
    for (const propName in obj) {
        if (jsonObj.hasOwnProperty(propName)) {
            const type = typeof obj[propName]
            const key: string = propName
            if (type !== 'object') {
                if (type === typeof jsonObj[key]) {
                    obj[propName] = jsonObj[key]
                }
            }
        }
    }
    return obj
}

export function toInstance<T>(obj: T, jsonObj: { [key: string]: any }): T {
    for (const propName in obj) {
        if (jsonObj.hasOwnProperty(propName)) {
            const type = typeof obj[propName]
            const key: string = propName
            if (type === typeof jsonObj[key]) {
                obj[propName] = jsonObj[key]
            }
        }
    }
    return obj
}

export function toInstanceForce<T>(obj: T, jsonObj: { [key: string]: any }): T {
    for (const propName in obj) {
        if (jsonObj.hasOwnProperty(propName)) {
            obj[propName] = jsonObj[propName]
        }
    }
    return obj
}

export function toInstanceForceArray<T extends object>(obj: T, jsonArray: { [key: string]: any }[]): T[] {
    return jsonArray.map((item)=> {
        return toInstanceForce(Object.assign(Object.create(obj)), item)
    })
}

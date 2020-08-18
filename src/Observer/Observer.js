export default class Observer {
    constructor() {
        this.listeners = []
        this.data = null
    }
    subscribe(fn) {
        if (!fn || typeof fn !== 'function') return
        this.listeners.push(fn)
    }
    unSubscribe(fn) {
        if (!fn || typeof fn !== 'function') return
        this.listeners = this.listeners.filter(listener => listener !== fn)
    }
    setData(data) {
        this.data = data
    }
    emit(event) {
        this.listeners.forEach(listener => listener(event, this.data))
    }
}
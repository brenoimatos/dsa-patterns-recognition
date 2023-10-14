type Subscriber<T> = (value: T) => void

class Observable<T> {
  private subscribers = new Set<Subscriber<T>>()

  constructor(private value: T) {}

  get(): T {
    return this.value
  }

  set(newValue: T): void {
    if (this.value === newValue) return
    this.value = newValue
    this.subscribers.forEach((listener) => listener(this.value))
  }

  subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.add(subscriber)
    return () => this.unsubscribe(subscriber)
  }

  unsubscribe(subscriber: Subscriber<T>): void {
    this.subscribers.delete(subscriber)
  }
}

export type { Subscriber }
export { Observable }

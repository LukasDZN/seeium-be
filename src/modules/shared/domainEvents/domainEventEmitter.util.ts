import EventEmitter from 'events'

type EventMap = {
  // [domainEventTypes.someDomainEvent]: SomeDomainEventHandlerInput
}

const eventEmitterInstance = new EventEmitter()

export const domainEventEmitter = () => {
  const emit = <T extends keyof EventMap>({
    eventType,
    payload,
  }: {
    eventType: T
    payload: EventMap[T]
  }) => {
    // console.log(`Event emitted. eventType: '${eventType}'`)

    eventEmitterInstance.emit(eventType, payload)
  }

  const register = <T extends keyof EventMap>({
    eventType,
    listener,
  }: {
    eventType: T
    listener: (payload: EventMap[T]) => void
  }) => {
    eventEmitterInstance.on(eventType, listener)
  }

  return {
    emit,
    register,
  } as const
}

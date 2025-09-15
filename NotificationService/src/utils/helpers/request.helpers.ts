// we cannot add correlation id manually to the request object everytime and also we need to attach correlation id to background jobs
// This will automatically attach correlation id to all new logs created during the request lifecycle
import { AsyncLocalStorage } from "async_hooks";

type AsyncLocalStorageType = {
  correlationId: string;
};
export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>();

export const getCorrelationId = () => {
  const asyncStore = asyncLocalStorage.getStore();
  return asyncStore? asyncStore.correlationId: "unknow-error-while-creating-correlation-id";
};

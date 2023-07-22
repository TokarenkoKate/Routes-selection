import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./root-reducer"
import { rootSaga } from "./root-sagas"
import createSagaMiddleware from "redux-saga"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

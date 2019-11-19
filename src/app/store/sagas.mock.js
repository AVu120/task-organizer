import { take, put, select } from "redux-saga/effects";

import * as mutations from "./mutations";

// Library that generate random strings.
import uuid from "uuid";

// Create a saga to create this task.
export function* taskCreationSaga() {
  while (true) {
    // When it gets to take, it will stop until the specified action is dispatched.
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = `U1`;
    const taskID = uuid();
    // put means w/e action we pass to it, send that action out into the store.
    yield put(mutations.createTask(taskID, groupID, ownerID));
    console.log("Got group ID", groupID);
  }
}

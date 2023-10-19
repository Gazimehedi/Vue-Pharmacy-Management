import { eventBus } from "./eventBus";

export const showErrorMessage = (msg) => {
    eventBus.emit("toast", {
        type: 'Error',
        message: msg,
      });
}
export const showSuccessMessage = (msg) => {
    eventBus.emit("toast", {
        type: 'Success',
        message: msg,
      });
}
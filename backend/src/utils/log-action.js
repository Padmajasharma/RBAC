import Log from "../models/log-model.js";

async function logAction(action, entity, entityId, actor, details) {
  try {
    const log = new Log({
      action,
      entity,
      entityId,
      actor,
      details,
    });
    await log.save();
  } catch (error) {
    console.error(error);
  }
}

export { logAction };

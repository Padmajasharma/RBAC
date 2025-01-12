import Log from "../models/log-model.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .populate("actor", "name email")
      .sort({ createdAt: -1 });
    res.status(200).send(logs);
  } catch (error) {
    res.status;
  }
};

export const getLog = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) {
      return res.status(404).send();
    }
    res.status(200).send(log);
  } catch (error) {
    res.status;
  }
};

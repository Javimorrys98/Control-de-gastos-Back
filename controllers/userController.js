import Hojas from "../models/Hojas.js";

const getUserSheets = async (req, res) => {
  const { user } = req.params;

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const query = { user };
    const bookings = await Hojas.find(query).sort({ date: "asc" });

    res.json(bookings);
  } catch (error) {
    console.log(error);
  }
};

export { getUserSheets };

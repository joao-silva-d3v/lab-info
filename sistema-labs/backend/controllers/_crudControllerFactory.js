const createCrudController = (Model) => {
  return {
    create: async (req, res) => {
      try {
        const item = new Model(req.body);
        await item.save();
        res.status(201).json(item);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    getAll: async (req, res) => {
      try {
        const items = await Model.find();
        res.json(items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    getById: async (req, res) => {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    update: async (req, res) => {
      try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    delete: async (req, res) => {
      try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
};

module.exports = { createCrudController };
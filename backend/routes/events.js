const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const { Op } = require('sequelize');
const Event = require('../models/Event');
const upload = require('../middleware/upload'); // ✅ import Multer middleware

// Create event with validation and image upload
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { title, date, time, category, description, venue, city, price } = req.body;

    // Basic validation
    if (!title || !date || !time) {
      return res.status(400).json({ error: 'Title, date, and time are required' });
    }

    // Build event data
    const eventData = {
      title,
      category: category || 'General',
      description: description || '',
      date,
      time,
      venue: venue || '',
      city: city || '',
      price: parseFloat(price) || 0,
      ...(req.session.userId && { userId: req.session.userId })
    };

    // Add image URL if uploaded
    if (req.file) {
      eventData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const event = await Event.create(eventData);
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    console.error('Event creation error:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get all events with pagination, search, and filters
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('search').optional().trim(),
    query('category').optional().trim(),
    query('minPrice').optional().isFloat({ min: 0 }),
    query('maxPrice').optional().isFloat({ min: 0 }),
    query('sortBy').optional().isIn(['date', 'price', 'title']),
    query('sortOrder').optional().isIn(['ASC', 'DESC'])
  ],
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const offset = (page - 1) * limit;

      // Build where clause
      const where = {};

      if (req.query.search) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${req.query.search}%` } },
          { city: { [Op.iLike]: `%${req.query.search}%` } },
          { venue: { [Op.iLike]: `%${req.query.search}%` } },
          { category: { [Op.iLike]: `%${req.query.search}%` } }
        ];
      }

      if (req.query.category) {
        where.category = { [Op.iLike]: `%${req.query.category}%` };
      }

      if (req.query.minPrice !== undefined || req.query.maxPrice !== undefined) {
        where.price = {};
        if (req.query.minPrice !== undefined) {
          where.price[Op.gte] = parseFloat(req.query.minPrice);
        }
        if (req.query.maxPrice !== undefined) {
          where.price[Op.lte] = parseFloat(req.query.maxPrice);
        }
      }

      // Build order clause
      const sortBy = req.query.sortBy || 'date';
      const sortOrder = req.query.sortOrder || 'ASC';
      const order = [[sortBy, sortOrder]];

      // Get events with pagination
      const { count, rows: events } = await Event.findAndCountAll({
        where,
        order,
        limit,
        offset
      });

      res.json({
        events,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        }
      });
    } catch (err) {
      console.error('Get events error:', err);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  }
);

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error('Get event by ID error:', err);



























    
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

module.exports = router;

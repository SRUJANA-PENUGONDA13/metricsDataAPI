// routes/expressions.js
const express = require('express')
const router = express.Router()
const { db } = require('../models/db')

// GET all metric expressions
router.get('/getMetricExpressions', async (req, res) => {
  try {
    const queryResult = await db.query(
      'SELECT id, metricName, metricExpression FROM public.metricsdetails',
    )
    const metricsDetails = queryResult.rows
    res.json({ metricsDetails, statusCode: 200 })
  } catch (error) {
    console.error('Error fetching metric expressions:', error)
    res
      .status(500)
      .json({ statusCode: 500, errorMessage: 'Internal Server Error' })
  }
})

// PUT update metric expression by ID
router.put('/updateMetricExpression/:id', async (req, res) => {
  const { id } = req.params
  const { metricExpression } = req.body

  try {
    const queryResult = await db.query(
      'UPDATE public.metricsdetails SET metricExpression = $1 WHERE id = $2 RETURNING id, metricExpression',
      [metricExpression, id],
    )
    const updatedMetricDetails = queryResult.rows[0]

    if (updatedMetricDetails) {
      res.json({ metricsDetails: updatedMetricDetails, statusCode: 200 })
    } else {
      res
        .status(400)
        .json({ statusCode: 400, errorMessage: 'Metric not found' })
    }
  } catch (error) {
    console.error('Error updating metric expression:', error)
    res
      .status(500)
      .json({ statusCode: 500, errorMessage: 'Internal Server Error' })
  }
})

// POST create new metric expression --- (not required right now)
// router.post('/createMetricExpression', async (req, res) => {
//   const { metricName, metricExpression } = req.body;

//   try {
//     const queryResult = await db.query('INSERT INTO metricsExpressions (metricName, metricExpression) VALUES ($1, $2) RETURNING id, metricName, metricExpression', [metricName, metricExpression]);
//     const createdMetricDetails = queryResult.rows[0];

//     res.status(201).json({ metricsDetails: createdMetricDetails, statusCode: 201 });
//   } catch (error) {
//     console.error('Error creating new metric expression:', error);
//     res.status(500).json({ statusCode: 500, errorMessage: 'Internal Server Error' });
//   }
// });

module.exports = router

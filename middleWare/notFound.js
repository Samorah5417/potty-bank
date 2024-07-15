module.exports = routeNotFound = (req, res) => res.status(404).json({error: 'route not found'})

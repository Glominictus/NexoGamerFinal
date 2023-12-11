function isAdmin(req, res, next) {
    if (req.user && req.user.rol === 'admin') {
      next(); // El usuario es admin, puede proceder
    } else {
      res.status(403).json({ message: 'Acceso denegado: se requieren privilegios de administrador.' });
    }
  }
  
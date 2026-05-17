export function roleMiddleware(allowedRoles: ('Student' | 'Admin')[]) {
  return (req: any, res: any, next: any) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
  };
}

const checkRole = (rolesRequired) => {
    return (_, {}, context) => {
      const { user } = context;
      if (!user) {
        throw new Error('Authentication required');
      }
      if (!rolesRequired.some(roles => roles == user.role)) {
        throw new ForbiddenError('Insufficient permissions to access this resource.');
      }
      return true;
    };
  };
  
  module.exports = checkRole;
  
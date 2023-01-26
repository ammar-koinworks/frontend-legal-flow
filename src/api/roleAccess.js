export const roleAccess = {
  'staff': {
    'document': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': false,
    }
  },
  'admin': {
    'document': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': true,
    }
  },
  'superadmin': {
    'document': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': true,
    }
  },
}
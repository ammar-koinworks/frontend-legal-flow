export const roleAccess = {
  'member': {
    'dashboard': {
      'read': true,
    },
    'document': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': false,
    }
  },
  'admin': {
    'dashboard': {
      'read': true,
    },
    'document': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': true,
    }
  },
  'superadmin': {
    'dashboard': {
      'read': true,
    },
    'document': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': true,
    }
  },
}
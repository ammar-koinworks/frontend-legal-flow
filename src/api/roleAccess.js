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
    },
    'request': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': false,
    },
    'opinion': {
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
    },
    'request': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': true,
    },
    'opinion': {
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
    },
    'request': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': true,
    },
    'opinion': {
      'create': true,
      'read': true,
      'update': true,
      'delete': true,
      'finish': false,
    }
  },
}

/** admin indexes **/
db.getCollection("admin").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** admin_group indexes **/
db.getCollection("admin_group").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** design_action indexes **/
db.getCollection("design_action").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** design_layout indexes **/
db.getCollection("design_layout").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** admin records **/
db.getCollection("admin").insert({
  "_id": ObjectId("51645b48471dee5c0a000002"),
  "username": "admin",
  "password": "23407f81c149fa56ca12e69d54917b6c0f455135",
  "group": {
    "$ref": "admin_group",
    "$id": ObjectId("515f0c69471dee8c1f000000"),
    "$db": "yesocl"
  },
  "status": false
});

/** admin_group records **/
db.getCollection("admin_group").insert({
  "_id": ObjectId("515f0c69471dee8c1f000000"),
  "name": "Supper Admin",
  "permissions": [
    {
      "_id": ObjectId("515f0faf471dee841f000024"),
      "layout": {
        "$ref": "design_layout",
        "$id": ObjectId("515f03ef471deeac1f000000"),
        "$db": "yesocl"
      },
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    },
    {
      "_id": ObjectId("515f0faf471dee841f000025"),
      "layout": {
        "$ref": "design_layout",
        "$id": ObjectId("515f03ff471deeac1f000001"),
        "$db": "yesocl"
      },
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    },
    {
      "_id": ObjectId("515f0faf471dee841f000026"),
      "layout": {
        "$ref": "design_layout",
        "$id": ObjectId("515f04d5471deeac1f000004"),
        "$db": "yesocl"
      },
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    },
    {
      "_id": ObjectId("515f0faf471dee841f000027"),
      "layout": {
        "$ref": "design_layout",
        "$id": ObjectId("515f0568471deeac1f000005"),
        "$db": "yesocl"
      },
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    },
    {
      "_id": ObjectId("515f0faf471dee841f000028"),
      "layout": {
        "$ref": "design_layout",
        "$id": ObjectId("515f0416471deeac1f000002"),
        "$db": "yesocl"
      },
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    },
    {
      "_id": ObjectId("515f0faf471dee841f000029"),
      "layout": {
        "$ref": "design_layout",
        "$id": ObjectId("515f042b471deeac1f000003"),
        "$db": "yesocl"
      },
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae43471deed805000004"),
          "$db": "yesocl"
        }
      ]
    }
  ]
});

/** design_action records **/
db.getCollection("design_action").insert({
  "_id": ObjectId("515bad7e471deee40e000000"),
  "code": "view",
  "name": "View",
  "order": NumberInt(1)
});
db.getCollection("design_action").insert({
  "_id": ObjectId("515bae15471deed805000001"),
  "code": "edit",
  "name": "Edit",
  "order": NumberInt(3)
});
db.getCollection("design_action").insert({
  "_id": ObjectId("515bae1f471deed805000002"),
  "code": "insert",
  "name": "Insert",
  "order": NumberInt(2)
});
db.getCollection("design_action").insert({
  "_id": ObjectId("515bae2c471deed805000003"),
  "code": "delete",
  "name": "Delete",
  "order": NumberInt(4)
});
db.getCollection("design_action").insert({
  "_id": ObjectId("515bae43471deed805000004"),
  "code": "change-password",
  "name": "Change Password",
  "order": NumberInt(5)
});

/** design_layout records **/
db.getCollection("design_layout").insert({
  "_id": ObjectId("515f03ff471deeac1f000001"),
  "actions": [
    {
      "$ref": "design_action",
      "$id": ObjectId("515bad7e471deee40e000000"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae15471deed805000001"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae1f471deed805000002"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae2c471deed805000003"),
      "$db": "yesocl"
    }
  ],
  "name": "Admin Group",
  "path": "admin\/group"
});
db.getCollection("design_layout").insert({
  "_id": ObjectId("515f0416471deeac1f000002"),
  "actions": [
    {
      "$ref": "design_action",
      "$id": ObjectId("515bad7e471deee40e000000"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae15471deed805000001"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae1f471deed805000002"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae2c471deed805000003"),
      "$db": "yesocl"
    }
  ],
  "name": "User Group",
  "path": "user\/group"
});
db.getCollection("design_layout").insert({
  "_id": ObjectId("515f042b471deeac1f000003"),
  "actions": [
    {
      "$ref": "design_action",
      "$id": ObjectId("515bad7e471deee40e000000"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae15471deed805000001"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae1f471deed805000002"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae2c471deed805000003"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae43471deed805000004"),
      "$db": "yesocl"
    }
  ],
  "name": "User Manage",
  "path": "user\/user"
});
db.getCollection("design_layout").insert({
  "_id": ObjectId("515f03ef471deeac1f000000"),
  "actions": [
    {
      "$ref": "design_action",
      "$id": ObjectId("515bad7e471deee40e000000"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae15471deed805000001"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae1f471deed805000002"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae2c471deed805000003"),
      "$db": "yesocl"
    }
  ],
  "name": "Admin Manage",
  "path": "admin\/admin"
});
db.getCollection("design_layout").insert({
  "_id": ObjectId("515f04d5471deeac1f000004"),
  "actions": [
    {
      "$ref": "design_action",
      "$id": ObjectId("515bad7e471deee40e000000"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae15471deed805000001"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae1f471deed805000002"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae2c471deed805000003"),
      "$db": "yesocl"
    }
  ],
  "name": "Action Manage",
  "path": "design\/action"
});
db.getCollection("design_layout").insert({
  "_id": ObjectId("515f0568471deeac1f000005"),
  "actions": [
    {
      "$ref": "design_action",
      "$id": ObjectId("515bad7e471deee40e000000"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae15471deed805000001"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae1f471deed805000002"),
      "$db": "yesocl"
    },
    {
      "$ref": "design_action",
      "$id": ObjectId("515bae2c471deed805000003"),
      "$db": "yesocl"
    }
  ],
  "name": "Layout Manage",
  "path": "design\/layout"
});

/** system.indexes records **/
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "yesocl.admin_group",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "yesocl.design_action",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "yesocl.design_layout",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "yesocl.admin",
  "name": "_id_"
});

/** system.profile records **/
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:55:21.183Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "system.profile",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(32),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:55:21.183Z"),
  "op": "query",
  "ns": "yesocl.system.profile",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "ts": NumberInt(-1)
    }
  },
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(137),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(344),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:55:27.17Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f387c471dee8c0b000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(69),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(7),
      "w": NumberLong(4)
    }
  },
  "responseLength": NumberInt(168),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:55:27.33Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "admin_group",
    "query": {
      "permissions.layout._id": ObjectId("515f387c471dee8c0b000000")
    }
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(144),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:55:30.325Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "system.profile",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(43),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(4)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:55:30.325Z"),
  "op": "query",
  "ns": "yesocl.system.profile",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "ts": NumberInt(-1)
    }
  },
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(5),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(198),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(2)
    }
  },
  "nreturned": NumberInt(5),
  "responseLength": NumberInt(1727),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:55:33.991Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(149),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(2),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:56:34.4Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(71),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:57:34.17Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(69),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:58:34.31Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(68),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(2)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:34.44Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(71),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:39.925Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f387c471dee8c0b000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(109),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(168),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:39.925Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "admin_group",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(110),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.256Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f387c471dee8c0b000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(64),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(168),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.271Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": [
    
  ],
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(2),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(100),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(2),
  "responseLength": NumberInt(2595),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.287Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f387c471dee8c0b000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(54),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(7),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(168),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.287Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f03ef471deeac1f000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(34),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(361),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.287Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f03ff471deeac1f000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(25),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(2)
    }
  },
  "responseLength": NumberInt(360),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.287Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f04d5471deeac1f000004")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(24),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(2)
    }
  },
  "responseLength": NumberInt(364),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.287Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f0568471deeac1f000005")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(24),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(2)
    }
  },
  "responseLength": NumberInt(364),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.302Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f0416471deeac1f000002")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(25),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(358),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.302Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f042b471deeac1f000003")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(27),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(2)
    }
  },
  "responseLength": NumberInt(423),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.302Z"),
  "op": "update",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "updateobj": {
    "$unset": {
      "permissions.0": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(169)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(7)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.302Z"),
  "op": "update",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "updateobj": {
    "$pull": {
      "permissions": null
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(81)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(5)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:48.302Z"),
  "op": "remove",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f387c471dee8c0b000000")
  },
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(101)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(5)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:49.535Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "design_layout",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(144),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T20:59:49.550Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(7),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(171),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(7),
  "responseLength": NumberInt(2276),
  "millis": NumberInt(15),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:00.455Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(54),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(79),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:15.743Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(76),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(79),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:15.758Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(7),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(190),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(7),
  "responseLength": NumberInt(2276),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:15.821Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bad7e471deee40e000000"),
          ObjectId("515bae15471deed805000001"),
          ObjectId("515bae1f471deed805000002"),
          ObjectId("515bae2c471deed805000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(4),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(268),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(4)
    }
  },
  "nreturned": NumberInt(4),
  "responseLength": NumberInt(280),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:15.836Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515f37ac471dee940b000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(219),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(4)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(81),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:15.836Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bae43471deed805000004")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(133),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(105),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:21.16Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(7),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(332),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(7),
  "responseLength": NumberInt(2276),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:21.31Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": [
      
    ],
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(6),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(98),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(6),
  "responseLength": NumberInt(426),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:29.564Z"),
  "op": "insert",
  "ns": "yesocl.design_layout",
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(613)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(11)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:30.781Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "design_layout",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(29),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:30.781Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(8),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(146),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(8),
  "responseLength": NumberInt(2347),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:31.998Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(81),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(4)
    }
  },
  "responseLength": NumberInt(79),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:32.29Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(8),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(198),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(8),
  "responseLength": NumberInt(2347),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:32.29Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bad7e471deee40e000000"),
          ObjectId("515bae15471deed805000001"),
          ObjectId("515bae1f471deed805000002"),
          ObjectId("515bae2c471deed805000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(4),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(206),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(4),
  "responseLength": NumberInt(280),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:32.45Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515f37ac471dee940b000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(172),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(81),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:32.45Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bae43471deed805000004")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(129),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(2),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(105),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:34.57Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(105),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(4)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:37.786Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f3b6d471dee940b000004")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(78),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(7),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(91),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:37.801Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(8),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(188),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(8),
  "responseLength": NumberInt(2347),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:37.801Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": [
      
    ],
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(6),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(129),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(2)
    }
  },
  "nreturned": NumberInt(6),
  "responseLength": NumberInt(426),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:43.573Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f3b6d471dee940b000004")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(79),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(4)
    }
  },
  "responseLength": NumberInt(91),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:43.573Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "_id": ObjectId("515bae43471deed805000004")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(76),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(105),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:43.589Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "_id": ObjectId("515f37ac471dee940b000003")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(34),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(81),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:43.589Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f3b6d471dee940b000004")
  },
  "updateobj": {
    "$unset": {
      "actions": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(43)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:43.589Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f3b6d471dee940b000004")
  },
  "updateobj": {
    "$pushAll": {
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae43471deed805000004"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515f37ac471dee940b000003"),
          "$db": "yesocl"
        }
      ]
    }
  },
  "idhack": true,
  "moved": true,
  "nmoved": NumberInt(1),
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(99)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(2)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:44.821Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "design_layout",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(34),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:44.821Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(8),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(188),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(2),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(8),
  "responseLength": NumberInt(2491),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:46.709Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(72),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(79),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:46.724Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(8),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(191),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(8),
  "responseLength": NumberInt(2491),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:46.740Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bad7e471deee40e000000"),
          ObjectId("515bae15471deed805000001"),
          ObjectId("515bae1f471deed805000002"),
          ObjectId("515bae2c471deed805000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(4),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(208),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(4),
  "responseLength": NumberInt(280),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:46.802Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515f37ac471dee940b000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(224),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(4)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(81),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:46.802Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bae43471deed805000004")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(130),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(105),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:55.86Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(91),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(4)
    }
  },
  "responseLength": NumberInt(79),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:55.102Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f37c6471dee980b000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(151),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(166),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:55.102Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "_id": ObjectId("515f37ac471dee940b000003")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(114),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(81),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:55.117Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f3b6d471dee940b000004")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(45),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(235),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:55.133Z"),
  "op": "update",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "updateobj": {
    "$unset": {
      "permissions": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(101)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(6)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:55.133Z"),
  "op": "update",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "updateobj": {
    "$pushAll": {
      "permissions": [
        {
          "_id": ObjectId("515f3b87471dee840b000002"),
          "layout": {
            "$ref": "design_layout",
            "$id": ObjectId("515f37c6471dee980b000000"),
            "$db": "yesocl"
          },
          "actions": [
            {
              "$ref": "design_action",
              "$id": ObjectId("515f37ac471dee940b000003"),
              "$db": "yesocl"
            }
          ]
        },
        {
          "_id": ObjectId("515f3b87471dee840b000003"),
          "layout": {
            "$ref": "design_layout",
            "$id": ObjectId("515f3b6d471dee940b000004"),
            "$db": "yesocl"
          },
          "actions": [
            {
              "$ref": "design_action",
              "$id": ObjectId("515f37ac471dee940b000003"),
              "$db": "yesocl"
            }
          ]
        }
      ]
    }
  },
  "idhack": true,
  "moved": true,
  "nmoved": NumberInt(1),
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(139)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(5)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:56.365Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "admin_group",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(38),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(4)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:00:56.365Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": [
    
  ],
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(2),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(84),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(2),
      "w": NumberLong(2)
    }
  },
  "nreturned": NumberInt(2),
  "responseLength": NumberInt(2769),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.449Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f3b6d471dee940b000004")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(65),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(235),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.465Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": [
    
  ],
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(2),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(76),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(2),
  "responseLength": NumberInt(2769),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.480Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f37c6471dee980b000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(40),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(166),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.527Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f3b6d471dee940b000004")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(37),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(235),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.527Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f03ef471deeac1f000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(13),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "responseLength": NumberInt(361),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.527Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f03ff471deeac1f000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(12),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "responseLength": NumberInt(360),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.527Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f04d5471deeac1f000004")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(11),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "responseLength": NumberInt(364),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.527Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f0568471deeac1f000005")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(11),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "responseLength": NumberInt(364),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.527Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f0416471deeac1f000002")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(11),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(0)
    }
  },
  "responseLength": NumberInt(358),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.527Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f042b471deeac1f000003")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(13),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "responseLength": NumberInt(423),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.543Z"),
  "op": "update",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "updateobj": {
    "$unset": {
      "permissions.1": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(184)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(8)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.543Z"),
  "op": "update",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "updateobj": {
    "$pull": {
      "permissions": null
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(42)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:02.543Z"),
  "op": "remove",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f3b6d471dee940b000004")
  },
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(65)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:03.775Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "design_layout",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(49),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(5)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:03.775Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(7),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(197),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(2),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(7),
  "responseLength": NumberInt(2276),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:06.536Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(135),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(7),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(253),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:06.552Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(7),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(195),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(7),
  "responseLength": NumberInt(2276),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:06.568Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f37c6471dee980b000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(46),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(166),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:06.583Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bad7e471deee40e000000"),
          ObjectId("515bae15471deed805000001"),
          ObjectId("515bae1f471deed805000002"),
          ObjectId("515bae2c471deed805000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(4),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(210),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(4)
    }
  },
  "nreturned": NumberInt(4),
  "responseLength": NumberInt(280),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:06.583Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515f37ac471dee940b000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(166),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(81),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:06.583Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515f37ac471dee940b000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(131),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(81),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:06.583Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bae43471deed805000004")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(132),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(105),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:11.934Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "admin_group",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(34),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:11.934Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": [
    
  ],
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(2),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(49),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(0)
    }
  },
  "nreturned": NumberInt(2),
  "responseLength": NumberInt(2595),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:17.862Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "design_action",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(38),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:17.862Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "order": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(6),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(142),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(6),
  "responseLength": NumberInt(426),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.345Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "_id": ObjectId("515f37ac471dee940b000003")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(109),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(81),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.361Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "action.id": null
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(7),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(167),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(7),
  "responseLength": NumberInt(2276),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.361Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bad7e471deee40e000000"),
          ObjectId("515bae15471deed805000001"),
          ObjectId("515bae1f471deed805000002"),
          ObjectId("515bae2c471deed805000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(4),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(192),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(4)
    }
  },
  "nreturned": NumberInt(4),
  "responseLength": NumberInt(280),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.361Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bae43471deed805000004")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(72),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(1),
  "responseLength": NumberInt(105),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f03ff471deeac1f000001")
  },
  "updateobj": {
    "$unset": {
      "actions": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(105)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(5)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f0416471deeac1f000002")
  },
  "updateobj": {
    "$unset": {
      "actions": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(38)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(4)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f042b471deeac1f000003")
  },
  "updateobj": {
    "$unset": {
      "actions": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(42)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f03ef471deeac1f000000")
  },
  "updateobj": {
    "$unset": {
      "actions": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(38)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(2)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f04d5471deeac1f000004")
  },
  "updateobj": {
    "$unset": {
      "actions": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(43)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f0568471deeac1f000005")
  },
  "updateobj": {
    "$unset": {
      "actions": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(36)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f37c6471dee980b000000")
  },
  "updateobj": {
    "$unset": {
      "actions": true
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(36)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(2)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f03ff471deeac1f000001")
  },
  "updateobj": {
    "$pushAll": {
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(39)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f0416471deeac1f000002")
  },
  "updateobj": {
    "$pushAll": {
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(37)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f042b471deeac1f000003")
  },
  "updateobj": {
    "$pushAll": {
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae43471deed805000004"),
          "$db": "yesocl"
        }
      ]
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(36)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(2)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f03ef471deeac1f000000")
  },
  "updateobj": {
    "$pushAll": {
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(39)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(2)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f04d5471deeac1f000004")
  },
  "updateobj": {
    "$pushAll": {
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(37)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(1)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "update",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f0568471deeac1f000005")
  },
  "updateobj": {
    "$pushAll": {
      "actions": [
        {
          "$ref": "design_action",
          "$id": ObjectId("515bad7e471deee40e000000"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae15471deed805000001"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae1f471deed805000002"),
          "$db": "yesocl"
        },
        {
          "$ref": "design_action",
          "$id": ObjectId("515bae2c471deed805000003"),
          "$db": "yesocl"
        }
      ]
    }
  },
  "idhack": true,
  "nupdated": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(37)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.377Z"),
  "op": "remove",
  "ns": "yesocl.design_action",
  "query": {
    "_id": ObjectId("515f37ac471dee940b000003")
  },
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(64)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(3)
    }
  },
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:28.392Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": {
      "actions.$id": ObjectId("515f37ac471dee940b000003")
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(7),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(126),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(2)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:29.609Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "design_action",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(28),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:29.609Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "order": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(5),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(129),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(5),
  "responseLength": NumberInt(365),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:33.88Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(76),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(4)
    }
  },
  "responseLength": NumberInt(253),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:33.103Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(7),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(185),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(7),
  "responseLength": NumberInt(2197),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:33.135Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "_id": ObjectId("515f37c6471dee980b000000")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(59),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(4)
    }
  },
  "responseLength": NumberInt(87),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:33.135Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515bad7e471deee40e000000"),
          ObjectId("515bae15471deed805000001"),
          ObjectId("515bae1f471deed805000002"),
          ObjectId("515bae2c471deed805000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(4),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(205),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(5),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(4),
  "responseLength": NumberInt(280),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:33.150Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": {
      "_id": {
        "$in": [
          ObjectId("515f37ac471dee940b000003")
        ]
      }
    },
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(0),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(162),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:33.150Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "_id": ObjectId("515f37ac471dee940b000003")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(27),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(3),
      "w": NumberLong(2)
    }
  },
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:01:34.71Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(63),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(2)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:02:34.84Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(76),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:03:34.97Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(76),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:04:34.110Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(68),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:05:34.124Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(72),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:06:34.137Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(67),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:07:34.151Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(72),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(2)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:08:34.165Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(128),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:09:34.178Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(79),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(2),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:10:34.191Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(71),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:11:34.205Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(125),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(2)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:12:34.218Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(135),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:13:34.231Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(70),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:14:34.244Z"),
  "op": "query",
  "ns": "yesocl.system.indexes",
  "query": {
    "expireAfterSeconds": {
      "$exists": true
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(3),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(68),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(1),
      "w": NumberLong(3)
    }
  },
  "nreturned": NumberInt(0),
  "responseLength": NumberInt(20),
  "millis": NumberInt(0),
  "client": "0.0.0.0",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:14:54.915Z"),
  "op": "command",
  "ns": "yesocl.$cmd",
  "command": {
    "count": "admin_group",
    "query": [
      
    ]
  },
  "ntoreturn": NumberInt(1),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(76),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(3)
    }
  },
  "responseLength": NumberInt(48),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:14:54.915Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": [
    
  ],
  "ntoreturn": NumberInt(10),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(2),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(85),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(2),
      "w": NumberLong(1)
    }
  },
  "nreturned": NumberInt(2),
  "responseLength": NumberInt(2595),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:15:01.841Z"),
  "op": "query",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "ntoreturn": NumberInt(1),
  "idhack": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(65),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(4),
      "w": NumberLong(4)
    }
  },
  "responseLength": NumberInt(253),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:15:01.903Z"),
  "op": "remove",
  "ns": "yesocl.admin_group",
  "query": {
    "_id": ObjectId("515f3887471dee8c0b000001")
  },
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(0),
      "w": NumberLong(119)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(0),
      "w": NumberLong(15)
    }
  },
  "millis": NumberInt(46),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:15:19.63Z"),
  "op": "query",
  "ns": "yesocl.design_layout",
  "query": {
    "$query": [
      
    ],
    "$orderby": {
      "path": NumberInt(0)
    }
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(7),
  "scanAndOrder": true,
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(333),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(7),
      "w": NumberLong(7)
    }
  },
  "nreturned": NumberInt(7),
  "responseLength": NumberInt(2197),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});
db.getCollection("system.profile").insert({
  "ts": ISODate("2013-04-05T21:15:19.110Z"),
  "op": "query",
  "ns": "yesocl.design_action",
  "query": {
    "$query": [
      
    ],
    "$orderby": [
      
    ]
  },
  "ntoreturn": NumberInt(0),
  "ntoskip": NumberInt(0),
  "nscanned": NumberInt(5),
  "keyUpdates": NumberInt(0),
  "numYield": NumberInt(0),
  "lockStats": {
    "timeLockedMicros": {
      "r": NumberLong(109),
      "w": NumberLong(0)
    },
    "timeAcquiringMicros": {
      "r": NumberLong(6),
      "w": NumberLong(5)
    }
  },
  "nreturned": NumberInt(5),
  "responseLength": NumberInt(365),
  "millis": NumberInt(0),
  "client": "127.0.0.1",
  "user": ""
});

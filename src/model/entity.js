import {getTable} from "@/model/utils";
import ta from "element-ui/src/locale/lang/ta";

function Table(arr, name, jsType, indexStart) {
  this.arr = arr
  this.name = name
  this.jsType = jsType
  if (!indexStart) {
    this.indexStart = 100
  } else {
    this.indexStart = indexStart
  }

  for (const oneRow of this.arr) {
    Object.setPrototypeOf(oneRow, jsType)
  }
}

Table.prototype = {
  constructor: Table,
  store() {
    if (this.beforeStore()) {
      localStorage.setItem(this.name, JSON.stringify(this))
    }
  },
  beforeStore() {
    if (this.arr == undefined || this.name == undefined || this.indexStart == undefined) {
      return false
    }
    return true
  },
  tableExists(tableName) {
    const table = localStorage.getItem(tableName)
    if (table) {
      return true
    }
    return false
  },
  // const table = new Table().getTable(tableName, jsType)
  getTable(tableName, jsType) {
    if (this.tableExists(tableName)) {
      const tableStr = localStorage.getItem(tableName)
      const userTable = JSON.parse(tableStr)
      const table = new Table(userTable.arr, tableName, jsType, userTable.indexStart)
      return table
    } else {
      return undefined
    }
  },
  rowCount() {
    return this.arr.length
  },
  getAllTableRows() {
    return this.arr
  },
  getRowById(id) {
    for (const row of this.arr) {
      if (row.id == id) {
        return row
      }
    }
    return undefined
  },
  deleteById(id) {
    const index = this.arr.findIndex((item, index) => {
      return item.id == id
    })
    if (index) {
      this.arr.splice(index, 1)
      localStorage.setItem(this.name, JSON.stringify(this))
    }
  },
  insertOne(item) {
    if (this.beforeUpdate(item)) {
      this.indexStart++
      item.id = this.indexStart
      this.arr.push(item)
      localStorage.setItem(this.name, JSON.stringify(this))
    }
  },
  updateOneById(item) {
    if (this.beforeUpdate(item)) {
      const index = this.arr.findIndex((row, index) => {
        return row.id == item.id
      })

      const row = this.arr[index]
      const id = row.id
      Object.assign(row, item)
      row.id = id
    }
  },
  beforeUpdate(item) {
    if (this.jsType == Object.getPrototypeOf(item)) {
      return true
    }
    return false
  }
}

function User(id, name, phone, jobId, password) {
  this.id = id
  this.name = name
  this.phone = phone
  this.jobId = jobId
  this.password = password
}

User.prototype = {
  constructor: User
}


function Pro(id, name, startDate, endDate, description, uid) {
  this.id = id
  this.name = name
  this.startDate = startDate
  this.endDate = endDate
  this.description = description
  this.uid = uid
}

Pro.prototype = {
  constructor: Pro
}


function Task(id, name, startDate, endDate, description, importance, progress) {
  this.id = id
  this.name = name
  this.startDate = startDate
  this.endDate = endDate
  this.description = description
  this.importance = importance
  this.progress = progress
}

Task.prototype = {
  constructor: Task
}


function U_T(id, uid, tid, joinDate) {
  this.id = id
  this.uid = uid
  this.tid = tid
  this.joinDate = joinDate
}

U_T.prototype = {
  constructor: U_T
}

function Message(id, sid, rid, content, createDate) {
  this.id = id
  this.sid = sid
  this.rid = rid
  this.content = content
  this.createDate = createDate
}

Message.prototype = {
  constructor: Message
}


export {
  User,
  Pro,
  U_T,
  Task,
  Message,
  Table
}

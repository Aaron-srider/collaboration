import {Message, Pro, Task, U_T, User} from "@/model/entity";
import {Table} from "@/model/entity";
import * as daoUtils from "@/model/utils";
import {getTable} from "@/model/utils";
import {parseDate, use} from "element-ui";
import user from "@/store/modules/user";
import {parseTimeComplex} from "@/utils";

function UserDao() {
}

UserDao.prototype = {
  constructor: UserDao,
  persist() {
    const user1 = new User(1, '文超', '1598374234', '2019012617', '111111')
    const user2 = new User(2, '吴明', '1598374234', '2019012618', '111111')
    const user3 = new User(3, '张三', '1598374234', '2019012619', '111111')
    const user4 = new User(4, '李四', '1598374234', '2019012620', '111111')
    const user5 = new User(5, '王五', '1598374234', '2019012621', '111111')
    daoUtils.persist('user', [user1, user2, user3, user4, user5])
  },
  queryUserByJobIdAndPassword(jobId, password) {

    const userTable = getTable('user')

    const user = userTable.find((item) => {
      return item.jobId == jobId && item.password == password
    })

    return user
  },
  queryUsersByUidList(uidList) {
    const userTable = getTable('user')
    const list = []
    for (const uid of uidList) {
      const row = userTable.getRowById(uid)
      if (row) {
        list.push()
      }
    }
    return list
  },
  queryUserByUid(uid) {
    const userTable = getTable('user')
    return userTable.getRowById(uid)
  }
}

function U_TDao() {

}

U_TDao.prototype = {
  constructor: U_TDao,
  persist() {
    const u_t1 = new U_T(1, 1, 1, '2021-02-01')
    const u_t2 = new U_T(2, 2, 1, '2021-02-01')
    const u_t3 = new U_T(3, 3, 1, '2021-02-01')
    const u_t4 = new U_T(4, 4, 1, '2021-02-01')
    const u_t5 = new U_T(5, 5, 1, '2021-02-01')
    daoUtils.persist('u_t', [u_t1, u_t2, u_t3, u_t4, u_t5])
  },
  deleteByTid(tid) {
    const u_tTable = new Table().getTable('u_t', U_T)
    u_tTable.deleteById(tid)
  },
  countMemberByTid(tid) {
    let count = 0
    const u_tTable = new Table().getTable('u_t', U_T)
    for (const item of u_tTable.getAllTableRows()) {
      if (item.tid == tid) {
        count++
      }
    }
    return count
  },
  countMembersByTidList(tidList) {
    let count = 0
    for (const tid of tidList) {
      count += this.countMemberByTid(tid)
    }
    return count
  },
  getUidListByTid(tid) {
    const u_tTable = new Table().getTable('u_t', U_T)
    const uidList = []
    for (const item of u_tTable.getAllTableRows()) {
      if (item.tid == tid) {
        uidList.push(item.uid)
      }
    }
    return uidList
  },
  join(tid, uid) {
    const u_tTable = new Table().getTable('u_t', U_T)
    const u_t = new U_T(undefined, uid, tid, parseTimeComplex(new Date()))
    u_tTable.insertOne(u_t)
  },
  deleteByTidAndUidList(tid, uidList) {
    const u_tTable = new Table().getTable('u_t', U_T)
    const idList = []
    for (const item of u_tTable.getAllTableRows()) {
      let flag = false
      for (const uid of uidList) {
        if (item.uid == uid) {
          flag = true
        }
      }
      if (item.tid == tid && flag) {
        idList.push(item.id)
      }
    }
    for (const id of idList) {
      u_tTable.deleteById(id)
    }
  }
}

function ProDao() {

}

ProDao.prototype = {
  constructor: ProDao,
  persist() {
    const pro1 = new Pro(1, '项目1', '2021-02-01', '2021-02-01', '项目1', 1)
    const pro2 = new Pro(2, '项目2', '2021-02-01', '2021-02-01', '项目2', 1)
    const pro3 = new Pro(3, '项目3', '2021-02-01', '2021-02-01', '项目3', 1)
    const pro4 = new Pro(4, '项目4', '2021-02-01', '2021-02-01', '项目4', 1)
    const pro5 = new Pro(5, '项目5', '2021-02-01', '2021-02-01', '项目5', 1)

    daoUtils.persist('pro', [pro1, pro2, pro3, pro4, pro5])
  },
  create(pro) {
    const proTable = new Table().getTable('pro', Pro)
    proTable.insertOne(pro)
  },
  deleteByPid(pid) {
    const proTable = new Table().getTable('pro', Pro)
    proTable.deleteById(pid)
  },
  getCreatedProsByUid(uid) {
    const proTable = new Table().getTable('pro', Pro)
    const pros = []
    for (const row in proTable.getAllTableRows()) {
      if (row.uid == uid) {
        pros.push(row)
      }
    }
    return pros
  },
  getOneProByPid(pid) {
    const proTable = new Table().getTable('pro', Pro)
    return proTable.getRowById(pid)
  }
}


function TaskDao() {

}

TaskDao.prototype = {
  constructor: TaskDao,
  persist() {
    const task1 = new Task(1, '任务1', '2021-02-01', '2021-02-01', '任务1', 60, 0)
    const task2 = new Task(2, '任务2', '2021-02-01', '2021-02-01', '任务2', 60, 0)
    const task3 = new Task(3, '任务3', '2021-02-01', '2021-02-01', '任务3', 60, 0)
    const task4 = new Task(4, '任务4', '2021-02-01', '2021-02-01', '任务4', 60, 0)
    const task5 = new Task(5, '任务5', '2021-02-01', '2021-02-01', '任务5', 60, 0)

    daoUtils.persist('task', [task1, task2, task3, task4, task5])
  },

  getAllTasksByPid(pid) {
    const taskTable = new Table().getTable('task', Task)

    const tasks = []
    taskTable.getAllTableRows().forEach((task) => {
      if (task.pid == pid) {
        tasks.push(task)
      }
    })
    return tasks
  },

  createOneTask(taskInfo) {
    const taskTable = new Table().getTable('task', Task)
    taskTable.insertOne(taskInfo)
  },
  updateOneTask(taskInfo) {
    const taskTable = new Table().getTable('task', Task)
    taskTable.updateOneById(taskInfo)
  }
  ,
  deleteOneTask(tid) {
    const taskTable = new Table().getTable('task', Task)
    taskTable.deleteById(tid)
  },
  getOneByTid(tid) {
    const taskTable = new Table().getTable('task', Task)
    return taskTable.getRowById(tid)
  }
  ,
  changeProgress(tid, step) {
    const taskTable = new Table().getTable('task', Task)

    const task = taskTable.getRowById(tid)
    task.progress += step
    taskTable.store()
  },
  getPidByTid(tid) {
    const taskTable = new Table().getTable('task', Task)
    const task = taskTable.getRowById(tid)
    return task.pid
  }

}

function MsgDao() {

}

MsgDao.prototype = {
  constructor: MsgDao,
  persist() {
    const message1 = new Message(1, 1, 2, '你好', '2021-02-01 23:33:33')
    const message2 = new Message(2, 1, 2, '你好', '2021-02-01 23:33:33')
    const message3 = new Message(3, 1, 3, '你好', '2021-02-01 23:33:33')
    const message4 = new Message(4, 1, 4, '你好', '2021-02-01 23:33:33')
    const message5 = new Message(5, 1, 5, '你好', '2021-02-01 23:33:33')

    daoUtils.persist('msg', [message1, message2, message3, message4, message5])
  },
  getMsgListByUid(uid) {
    const msgTable = new Table().getTable('msg', Message)
    const msgList = []
    msgTable.getAllTableRows().forEach((msg) => {
      if (msg.rid == uid) {
        msgList.push(msg)
      }
    })
    return msgList
  },
  createOneMsg(msgInfo) {
    const msgTable = new Table().getTable('msg', Message)
    msgTable.insertOne(msgInfo)
  }
}


export {
  UserDao,
  U_TDao,
  ProDao,
  TaskDao,
  MsgDao
}

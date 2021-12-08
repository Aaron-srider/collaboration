import {UserDao, MsgDao, ProDao, TaskDao, U_TDao} from './userDao'

function UserService() {

}

UserService.prototype = {
  constructor: UserService,
  getAllUsersByTid(tid) {
    const uidList = new U_TDao().getUidListByTid(tid)

    const joinTimeList = new U_TDao().getJoinTimeListByTid(tid)

    const result = new UserDao().queryUsersByUidList(uidList)

    result.forEach((item, index) => item.joinDate = joinTimeList[index])

    return result
  },
  join(jobId, tid) {
    const user = new UserDao().queryUserByJobId(jobId)

    const users = new UserService().getAllUsersByTid(tid)

    if (user) {
      let flag = false
      users.forEach((u) => {
        if (u.id == user.id) {
          flag = true
        }
      })
      if (flag) {
        throw 1
      }
      new U_TDao().join(tid, user.id)
    } else {
      throw 0
    }
  }
}

function ProService() {

}

ProService.prototype = {
  constructor: ProService,

  deleteOneProByPid(pid) {
    const allTaskList = new TaskDao().getAllTasksByPid(pid)
    const tidList = allTaskList.map((item) => {
      return item.id
    })
    new TaskService().deleteByTidList(tidList)
    new ProDao().deleteByPid(pid)
  }

}

function TaskService() {

}

TaskService.prototype = {
  constructor: TaskService,

  deleteByTid(tid) {
    new U_TDao().deleteByTid(tid)
    new TaskDao().deleteOneTask(tid)
  },
  deleteByTidList(tidList) {
    for (const tid of tidList) {
      this.deleteByTid(tid)
    }
  },
  getProByTid(tid) {
    const pid = new TaskDao().getPidByTid(tid)
    const pro = new ProDao().getOneProByPid(pid)
    return pro
  }
}


function MsgService() {

}

MsgService.prototype = {
  constructor: MsgService,

  getMsgListByUid(uid) {
    const msgList = new MsgDao().getMsgListByUid(uid)

    const sidList = msgList.map((msg) => msg.sid)
    const senderList = new UserDao().queryUsersByUidList(sidList)

    msgList.forEach((msg, index) => {
      msg.sender = senderList[index]
    })

    return msgList
  }
}

export {
  UserService,
  ProService,
  TaskService,
  MsgService
}

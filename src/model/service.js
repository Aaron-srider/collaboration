import {UserDao, MsgDao, ProDao, TaskDao, U_TDao} from './userDao'

function Service() {

}

Service.prototype = {
  constructor: Service,
  getAllUsersByTid(tid) {
    const uidList = new U_TDao().getUidListByTid(tid)
    return new UserDao().queryUsersByUidList(uidList)
  },
  join(uid, tid) {
    const user = new UserDao().queryUserByUid(uid)
    if (user) {
      new U_TDao().join(uid, tid)
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
